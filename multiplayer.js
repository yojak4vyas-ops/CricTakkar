// ===== CRICTAKKAR MULTIPLAYER — BATTLE FRIENDS =====
//
// ARCHITECTURE (see CLAUDE.md "PHASE 3 MULTIPLAYER ARCHITECTURE"):
// There is no game server. The HOST's browser is the authority — it owns
// every phase transition and is the only client that reads the answers
// subcollection. Everyone else is a pure renderer listening to one single
// match document. That is what keeps a big match inside Firebase's free
// daily quota; a design where every player watches every other player's
// document would cost ~50x more reads and blow the free tier in one match.
//
// Single source of truth: the match doc's `status` + `phase` fields.
// Clients never decide when to advance — they only draw what the doc says.

// ===== CONFIG =====
var QUESTIONS_PER_MATCH = 10;
var SECONDS_PER_QUESTION = 15;
var REVEAL_MS = 4000;      // how long the correct answer stays up
var STANDINGS_MS = 4000;   // how long the between-question table stays up
var POINTS_PER_CORRECT = 10;
var MAX_PLAYERS = 10;
var CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no O/0, I/1/L lookalikes

// ===== STATE =====
var me = null;              // { uid, name }
var matchId = null;
var matchUnsub = null;      // detaches the match listener
var localTimer = null;      // visual countdown interval
var hostTimeouts = [];      // host-only phase timers, cleared on teardown
var lastRenderedQuestion = -1;
var lastRenderedPhase = '';
var hasAnsweredThisQuestion = false;
var questionShownAt = 0;    // for Speed Mode later — time taken per answer
var isLeaving = false;      // suppresses the host-left handler during a clean exit

// =====================================================================
// BOOT
// =====================================================================
auth.onAuthStateChanged(function(user) {
  if (!user) {
    showScreen('loginGateScreen');
    return;
  }

  // Grab the display name once so every write can carry it — that way
  // rendering a lobby or leaderboard never needs to fetch other users.
  db.collection('users').doc(user.uid).get().then(function(doc) {
    var data = doc.exists ? doc.data() : {};
    me = {
      uid: user.uid,
      name: data.username || data.name || 'Player'
    };
    showScreen('entryScreen');
  }).catch(function(err) {
    console.error('Could not load profile:', err);
    // Still playable without a profile doc — just falls back to a generic name.
    me = { uid: user.uid, name: 'Player' };
    showScreen('entryScreen');
  });
});

// =====================================================================
// SCREENS
// =====================================================================
var ALL_SCREENS = [
  'loadingScreen', 'loginGateScreen', 'entryScreen', 'joinScreen',
  'lobbyScreen', 'questionScreen', 'standingsScreen', 'finalScreen',
  'abortScreen'
];

function showScreen(id) {
  ALL_SCREENS.forEach(function(s) {
    var el = document.getElementById(s);
    if (el) el.style.display = (s === id) ? 'flex' : 'none';
  });
}

function showEntryScreen() { showScreen('entryScreen'); }

function showJoinScreen() {
  document.getElementById('joinError').textContent = '';
  document.getElementById('joinCodeInput').value = '';
  showScreen('joinScreen');
  document.getElementById('joinCodeInput').focus();
}

// =====================================================================
// CREATING A ROOM
// =====================================================================
function generateRoomCode() {
  var code = '';
  for (var i = 0; i < 6; i++) {
    code += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
  }
  return code;
}

// Picks the questions once, at creation, and stores their INDEXES.
// Storing indexes rather than whole question objects keeps the match doc
// small, and question-bank.js is a static file so every client resolves
// the same index to the same question.
function pickQuestionIndexes() {
  var all = [];
  for (var i = 0; i < questionBank.length; i++) all.push(i);

  // Fisher-Yates — an unbiased shuffle, unlike sort(() => Math.random() - 0.5)
  for (var j = all.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = all[j]; all[j] = all[k]; all[k] = tmp;
  }
  return all.slice(0, QUESTIONS_PER_MATCH);
}

// Turns a raw Firebase error into something a player can actually act on.
// The generic "check your connection" message this replaces was actively
// misleading — the most common real cause is that the security rules were
// never published to the Firebase console, which has nothing to do with
// the player's connection.
function explainFirebaseError(err) {
  var code = (err && err.code) || '';

  if (code === 'permission-denied') {
    return "The server rejected this request. The app's Firestore security " +
           "rules probably haven't been published yet — multiplayer can't " +
           "work until they are.";
  }
  if (code === 'failed-precondition') {
    return "This query needs a database index that doesn't exist yet. " +
           "Open the browser console — Firebase puts a one-click link there " +
           "to create it.";
  }
  if (code === 'unavailable') {
    return "Couldn't reach the server. Check your internet connection and try again.";
  }
  if (code === 'unauthenticated') {
    return "You've been signed out. Please log in again.";
  }
  return "Something went wrong: " + (err && err.message ? err.message : 'unknown error');
}

// The room code IS the document ID.
//
// The earlier version stored the code as a field and looked rooms up with
// a two-filter query. That was worse in three ways: it needed a composite
// index in Firestore, joining cost a query instead of a single document
// read, and the security rules had to reason about queries. Using the code
// as the ID makes every lookup a direct get() and every rule trivial.
function createRoom(attempt) {
  if (!me) return;
  attempt = attempt || 1;

  var btn = document.getElementById('createRoomBtn');
  btn.disabled = true;
  btn.textContent = 'Creating…';

  var code = generateRoomCode();
  var ref = db.collection('matches').doc(code);

  ref.get()
    .then(function(existing) {
      if (existing.exists) {
        // 31^6 is about 887 million codes, so this is vanishingly rare —
        // but old finished rooms keep their ID, so it isn't impossible.
        if (attempt >= 5) {
          throw new Error('Could not find a free room code. Please try again.');
        }
        createRoom(attempt + 1);
        return null;
      }

      var players = {};
      players[me.uid] = { name: me.name, joinedAt: Date.now() };

      return ref.set({
        roomCode: code,
        hostUid: me.uid,
        mode: 'classic',
        status: 'lobby',
        phase: 'waiting',
        questionIds: pickQuestionIndexes(),
        currentQuestion: -1,
        players: players,
        leaderboard: [],
        isPublic: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(function(written) {
      if (written === null) return; // a retry is already in flight
      matchId = code;
      listenToMatch();
    })
    .catch(function(err) {
      console.error('Create room failed:', err);
      btn.disabled = false;
      btn.textContent = 'Create a Room';
      alert(explainFirebaseError(err));
    });
}

// =====================================================================
// JOINING A ROOM
// =====================================================================
function joinRoom() {
  if (!me) return;

  var input = document.getElementById('joinCodeInput');
  var errorEl = document.getElementById('joinError');
  var code = (input.value || '').trim().toUpperCase();

  if (code.length !== 6) {
    errorEl.textContent = 'A room code is 6 characters.';
    return;
  }

  var btn = document.getElementById('joinRoomBtn');
  btn.disabled = true;
  btn.textContent = 'Joining…';
  errorEl.textContent = '';

  // The code is the document ID, so this is one direct read — no query,
  // and no composite index needed.
  var ref = db.collection('matches').doc(code);

  ref.get()
    .then(function(docSnap) {
      if (!docSnap.exists) {
        throw new Error('NOT_FOUND');
      }

      var data = docSnap.data();

      if (data.status !== 'lobby') {
        throw new Error(data.status === 'playing' ? 'STARTED' : 'CLOSED');
      }

      var players = data.players || {};

      // Rejoining your own room is always allowed, even if it's full.
      if (!players[me.uid] && Object.keys(players).length >= MAX_PLAYERS) {
        throw new Error('FULL');
      }

      matchId = code;

      // Dot-path update writes ONLY this player's key, so two people
      // joining at the same moment can't overwrite each other.
      var update = {};
      update['players.' + me.uid] = { name: me.name, joinedAt: Date.now() };
      return ref.update(update);
    })
    .then(function() {
      listenToMatch();
    })
    .catch(function(err) {
      btn.disabled = false;
      btn.textContent = 'Join Room';

      if (err.message === 'NOT_FOUND') {
        errorEl.textContent = 'No room with that code. Double-check the 6 characters.';
      } else if (err.message === 'STARTED') {
        errorEl.textContent = 'That match has already started. Ask the host for a new room.';
      } else if (err.message === 'CLOSED') {
        errorEl.textContent = 'That room is already finished.';
      } else if (err.message === 'FULL') {
        errorEl.textContent = 'That room is full (' + MAX_PLAYERS + ' players max).';
      } else {
        console.error('Join failed:', err);
        errorEl.textContent = explainFirebaseError(err);
      }
    });
}

// Enter key submits the join code
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var joinVisible = document.getElementById('joinScreen').style.display === 'flex';
  if (joinVisible) joinRoom();
});

// =====================================================================
// THE ONE LISTENER THAT DRIVES EVERYTHING
// =====================================================================
function listenToMatch() {
  if (matchUnsub) matchUnsub();

  matchUnsub = db.collection('matches').doc(matchId)
    .onSnapshot(function(doc) {
      if (!doc.exists) {
        endWithMessage('This room no longer exists.');
        return;
      }
      render(doc.data());
    }, function(err) {
      console.error('Match listener error:', err);
      endWithMessage('Lost connection to the room.');
    });
}

function render(match) {
  // A player who was removed (or whose host ended the room) gets told why.
  if (match.status === 'aborted') {
    endWithMessage(match.abortReason || 'The host ended the match.');
    return;
  }

  if (match.status === 'lobby') {
    renderLobby(match);
    return;
  }

  if (match.status === 'playing') {
    renderPlaying(match);
    return;
  }

  if (match.status === 'finished') {
    renderFinal(match);
    return;
  }
}

// =====================================================================
// LOBBY
// =====================================================================
function renderLobby(match) {
  showScreen('lobbyScreen');

  document.getElementById('roomCodeDisplay').textContent = match.roomCode;

  var players = match.players || {};
  var uids = Object.keys(players);

  // Stable order — whoever joined first sits at the top, so the list
  // doesn't jump around as people arrive.
  uids.sort(function(a, b) {
    return (players[a].joinedAt || 0) - (players[b].joinedAt || 0);
  });

  document.getElementById('playerCount').textContent =
    '(' + uids.length + '/' + MAX_PLAYERS + ')';

  var listEl = document.getElementById('playerList');
  listEl.innerHTML = '';

  uids.forEach(function(uid) {
    var p = players[uid];
    var row = document.createElement('div');
    row.className = 'mp-player-row';

    var avatar = document.createElement('div');
    avatar.className = 'mp-player-avatar';
    avatar.textContent = (p.name || '?').charAt(0).toUpperCase();

    var name = document.createElement('div');
    name.className = 'mp-player-name';
    // textContent, not innerHTML — usernames are user-supplied.
    name.textContent = p.name || 'Player';

    row.appendChild(avatar);
    row.appendChild(name);

    if (uid === me.uid) {
      var you = document.createElement('span');
      you.className = 'mp-you-badge';
      you.textContent = 'you';
      row.appendChild(you);
    }

    if (uid === match.hostUid) {
      var host = document.createElement('span');
      host.className = 'mp-host-badge';
      host.textContent = 'HOST';
      row.appendChild(host);
    }

    listEl.appendChild(row);
  });

  // Only the host gets a Start button, and only with enough players.
  var isHost = (match.hostUid === me.uid);
  var startBtn = document.getElementById('startMatchBtn');
  var note = document.getElementById('waitingNote');

  if (isHost) {
    startBtn.style.display = 'block';
    if (uids.length < 2) {
      startBtn.disabled = true;
      startBtn.textContent = 'Waiting for players…';
      note.textContent = 'Share the code above — you need at least 2 players.';
    } else {
      startBtn.disabled = false;
      startBtn.textContent = 'Start Match (' + uids.length + ' players)';
      note.textContent = 'Everyone in? Start when ready.';
    }
  } else {
    startBtn.style.display = 'none';
    note.textContent = 'Waiting for the host to start…';
  }
}

function shareRoomCode() {
  var code = document.getElementById('roomCodeDisplay').textContent;
  var text = "Aao CricTakkar karte hain! 🏏\n\nJoin my cricket quiz battle — room code: " +
             code + "\n\n" + window.location.origin + "/multiplayer.html";
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function copyRoomCode() {
  var code = document.getElementById('roomCodeDisplay').textContent;
  var btn = document.getElementById('copyCodeBtn');

  navigator.clipboard.writeText(code).then(function() {
    btn.textContent = '✅ Copied!';
    setTimeout(function() { btn.textContent = '📋 Copy Code'; }, 1800);
  }).catch(function() {
    alert('Room code: ' + code);
  });
}

function leaveRoom() {
  if (!matchId) {
    showScreen('entryScreen');
    return;
  }

  isLeaving = true;
  var ref = db.collection('matches').doc(matchId);

  db.collection('matches').doc(matchId).get().then(function(doc) {
    if (!doc.exists) return null;

    // The host leaving ends the room for everyone — there is no server to
    // keep it alive, and no host migration yet (see CLAUDE.md limitations).
    if (doc.data().hostUid === me.uid) {
      return ref.update({
        status: 'aborted',
        abortReason: 'The host left the room.'
      });
    }

    var update = {};
    update['players.' + me.uid] = firebase.firestore.FieldValue.delete();
    return ref.update(update);
  }).catch(function(err) {
    console.error('Leave failed:', err);
  }).then(function() {
    teardown();
    showScreen('entryScreen');
    matchId = null;
    isLeaving = false;
  });
}

// =====================================================================
// STARTING THE MATCH (host only)
// =====================================================================
function startMatch() {
  var btn = document.getElementById('startMatchBtn');
  btn.disabled = true;
  btn.textContent = 'Starting…';

  db.collection('matches').doc(matchId).update({
    status: 'playing',
    phase: 'answering',
    currentQuestion: 0,
    leaderboard: []
  }).then(function() {
    scheduleHostPhases(0);
  }).catch(function(err) {
    console.error('Start failed:', err);
    btn.disabled = false;
    btn.textContent = 'Start Match';
  });
}

// The host's clock. Each question runs: answer → reveal → standings → next.
// Only the host runs this; everyone else just renders whatever it writes.
function scheduleHostPhases(qIndex) {
  clearHostTimeouts();

  // 1. After the answering window closes, score it and reveal.
  hostTimeouts.push(setTimeout(function() {
    aggregateAndReveal(qIndex);
  }, SECONDS_PER_QUESTION * 1000));

  // 2. Then show the standings table.
  hostTimeouts.push(setTimeout(function() {
    db.collection('matches').doc(matchId)
      .update({ phase: 'standings' })
      .catch(function(e) { console.error('Standings write failed:', e); });
  }, SECONDS_PER_QUESTION * 1000 + REVEAL_MS));

  // 3. Then either the next question, or the end of the match.
  hostTimeouts.push(setTimeout(function() {
    var next = qIndex + 1;
    if (next >= QUESTIONS_PER_MATCH) {
      db.collection('matches').doc(matchId)
        .update({ status: 'finished', phase: 'done' })
        .catch(function(e) { console.error('Finish write failed:', e); });
    } else {
      db.collection('matches').doc(matchId)
        .update({ currentQuestion: next, phase: 'answering' })
        .then(function() { scheduleHostPhases(next); })
        .catch(function(e) { console.error('Next question write failed:', e); });
    }
  }, SECONDS_PER_QUESTION * 1000 + REVEAL_MS + STANDINGS_MS));
}

// PURE scoring. No Firestore, no DOM — just (previous standings + this
// question's answers) -> (new standings). Kept separate on purpose:
//   - it is the one piece of real game logic here, so it should be
//     testable without a database
//   - under Option B (see CLAUDE.md) this is precisely the function that
//     moves onto the server, so the seam is already cut
// `answers` is a plain array of { uid, isCorrect }.
function computeLeaderboard(match, answers) {
  var players = match.players || {};

  // Carry forward existing scores, so scoring question 5 doesn't wipe
  // out what happened in questions 1-4.
  var scoreByUid = {};
  (match.leaderboard || []).forEach(function(entry) {
    scoreByUid[entry.uid] = { score: entry.score, correct: entry.correct };
  });

  answers.forEach(function(a) {
    if (!scoreByUid[a.uid]) scoreByUid[a.uid] = { score: 0, correct: 0 };
    if (a.isCorrect) {
      scoreByUid[a.uid].score += POINTS_PER_CORRECT;
      scoreByUid[a.uid].correct += 1;
    }
  });

  // Everyone still in the room appears, even if they never answered —
  // otherwise a player who misses a question vanishes from the table.
  var leaderboard = Object.keys(players).map(function(uid) {
    var s = scoreByUid[uid] || { score: 0, correct: 0 };
    return {
      uid: uid,
      name: players[uid].name || 'Player',
      score: s.score,
      correct: s.correct
    };
  });

  leaderboard.sort(function(a, b) { return b.score - a.score; });
  return leaderboard;
}

// Host-only: read this question's answers, score them, and write the
// result back as ONE aggregated field. This is the read-cost trick the
// whole design rests on — only the host pays to read the answers, and
// every other player learns the standings from a single document.
function aggregateAndReveal(qIndex) {
  var matchRef = db.collection('matches').doc(matchId);

  Promise.all([
    matchRef.get(),
    matchRef.collection('answers').where('questionIndex', '==', qIndex).get()
  ]).then(function(results) {
    var match = results[0].data();
    if (!match) return;

    var answers = [];
    results[1].forEach(function(ansDoc) { answers.push(ansDoc.data()); });

    return matchRef.update({
      phase: 'reveal',
      leaderboard: computeLeaderboard(match, answers),
      answeredCount: answers.length
    });
  }).catch(function(err) {
    console.error('Aggregation failed:', err);
  });
}

function clearHostTimeouts() {
  hostTimeouts.forEach(clearTimeout);
  hostTimeouts = [];
}

// =====================================================================
// PLAYING — rendering questions
// =====================================================================
function renderPlaying(match) {
  var qIndex = match.currentQuestion;
  var phase = match.phase;

  if (phase === 'standings') {
    renderStandings(match);
    lastRenderedPhase = phase;
    return;
  }

  showScreen('questionScreen');

  var questionChanged = (qIndex !== lastRenderedQuestion);
  var phaseChanged = (phase !== lastRenderedPhase);

  if (questionChanged) {
    startQuestion(match, qIndex);
  }

  if (phase === 'reveal' && (phaseChanged || questionChanged)) {
    revealAnswer(match, qIndex);
  }

  lastRenderedQuestion = qIndex;
  lastRenderedPhase = phase;
}

function startQuestion(match, qIndex) {
  hasAnsweredThisQuestion = false;
  questionShownAt = Date.now();

  var q = questionBank[match.questionIds[qIndex]];

  document.getElementById('progressBar').style.width =
    ((qIndex / QUESTIONS_PER_MATCH) * 100) + '%';
  document.getElementById('questionCounter').textContent =
    'Question ' + (qIndex + 1) + ' of ' + QUESTIONS_PER_MATCH;
  document.getElementById('questionText').textContent = q.question;

  for (var i = 0; i < 4; i++) {
    var btn = document.getElementById('opt' + i);
    btn.textContent = q.options[i];
    btn.className = 'option-btn';
    btn.disabled = false;
  }

  document.getElementById('factBox').style.display = 'none';
  document.getElementById('answeredCount').textContent = '';

  startLocalCountdown();
}

// Purely visual. The host's write is what actually ends the question —
// this just shows the player how long they have left.
function startLocalCountdown() {
  clearInterval(localTimer);

  var timeLeft = SECONDS_PER_QUESTION;
  var numEl = document.getElementById('timerNumber');
  var circleEl = document.getElementById('timerCircle');

  numEl.textContent = timeLeft;
  circleEl.classList.remove('danger');

  localTimer = setInterval(function() {
    timeLeft--;
    if (timeLeft < 0) timeLeft = 0;

    numEl.textContent = timeLeft;
    if (timeLeft <= 5) circleEl.classList.add('danger');

    if (timeLeft <= 0) {
      clearInterval(localTimer);
      disableOptions();
    }
  }, 1000);
}

function disableOptions() {
  for (var i = 0; i < 4; i++) {
    document.getElementById('opt' + i).disabled = true;
  }
}

function submitAnswer(optionIndex) {
  if (hasAnsweredThisQuestion || !matchId) return;
  hasAnsweredThisQuestion = true;

  disableOptions();
  document.getElementById('opt' + optionIndex).classList.add('selected');
  document.getElementById('answeredCount').textContent = '✅ Answer locked in — waiting for everyone else…';

  db.collection('matches').doc(matchId).get().then(function(doc) {
    if (!doc.exists) return;
    var match = doc.data();
    var qIndex = match.currentQuestion;
    var q = questionBank[match.questionIds[qIndex]];

    // Deterministic doc ID means a player physically cannot have two
    // answers for the same question, no matter how fast they tap.
    var answerId = me.uid + '_' + qIndex;

    return db.collection('matches').doc(matchId)
      .collection('answers').doc(answerId).set({
        uid: me.uid,
        name: me.name,
        questionIndex: qIndex,
        selectedOption: optionIndex,
        isCorrect: (optionIndex === q.correct),
        timeTaken: (Date.now() - questionShownAt) / 1000,
        answeredAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  }).catch(function(err) {
    console.error('Answer submit failed:', err);
    document.getElementById('answeredCount').textContent =
      '⚠️ Could not send your answer — check your connection.';
  });
}

function revealAnswer(match, qIndex) {
  clearInterval(localTimer);
  disableOptions();

  var q = questionBank[match.questionIds[qIndex]];

  document.getElementById('opt' + q.correct).classList.add('correct');

  // Mark the player's own wrong pick, so they can see what they chose.
  for (var i = 0; i < 4; i++) {
    var btn = document.getElementById('opt' + i);
    if (btn.classList.contains('selected') && i !== q.correct) {
      btn.classList.add('wrong');
    }
  }

  document.getElementById('factText').textContent = q.fact;
  document.getElementById('factBox').style.display = 'block';

  var total = Object.keys(match.players || {}).length;
  var answered = match.answeredCount || 0;
  document.getElementById('answeredCount').textContent =
    answered + ' of ' + total + ' answered in time';
}

// =====================================================================
// STANDINGS + FINAL
// =====================================================================
function renderStandings(match) {
  showScreen('standingsScreen');
  document.getElementById('standingsSub').textContent =
    'After question ' + (match.currentQuestion + 1) + ' of ' + QUESTIONS_PER_MATCH;

  drawLeaderboard('standingsList', match.leaderboard || []);

  var isLast = (match.currentQuestion + 1) >= QUESTIONS_PER_MATCH;
  document.getElementById('nextQuestionNote').textContent =
    isLast ? 'Final results coming up…' : 'Next question coming up…';
}

function renderFinal(match) {
  clearInterval(localTimer);
  clearHostTimeouts();
  showScreen('finalScreen');

  var board = match.leaderboard || [];
  drawLeaderboard('finalList', board);

  var myEntry = null;
  var myRank = 0;
  for (var i = 0; i < board.length; i++) {
    if (board[i].uid === me.uid) { myEntry = board[i]; myRank = i + 1; }
  }

  var emojiEl = document.getElementById('finalEmoji');
  var titleEl = document.getElementById('finalTitle');
  var subEl = document.getElementById('finalSub');

  if (!myEntry) {
    emojiEl.textContent = '🏏';
    titleEl.textContent = 'Match Over';
    subEl.textContent = '';
  } else if (myRank === 1) {
    emojiEl.textContent = '🏆';
    titleEl.textContent = 'You won!';
    subEl.textContent = myEntry.correct + ' of ' + QUESTIONS_PER_MATCH +
      ' correct · ' + myEntry.score + ' points';
  } else {
    emojiEl.textContent = myRank === 2 ? '🥈' : (myRank === 3 ? '🥉' : '🏏');
    titleEl.textContent = 'You finished #' + myRank;
    subEl.textContent = myEntry.correct + ' of ' + QUESTIONS_PER_MATCH +
      ' correct · ' + myEntry.score + ' points';
  }

  saveMatchResult(myEntry, myRank, board.length);
  teardownListenerOnly();
}

function drawLeaderboard(elementId, board) {
  var el = document.getElementById(elementId);
  el.innerHTML = '';

  board.forEach(function(entry, i) {
    var row = document.createElement('div');
    row.className = 'mp-lb-row' + (entry.uid === me.uid ? ' mp-is-me' : '');

    var rank = document.createElement('div');
    rank.className = 'mp-lb-rank';
    rank.textContent = '#' + (i + 1);

    var name = document.createElement('div');
    name.className = 'mp-lb-name';
    name.textContent = entry.name || 'Player'; // textContent — user-supplied

    var score = document.createElement('div');
    score.className = 'mp-lb-score';
    score.textContent = entry.score;

    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(score);
    el.appendChild(row);
  });
}

// =====================================================================
// SAVING THE RESULT (XP, streak, history — same shape as the solo games)
// =====================================================================
function saveMatchResult(myEntry, myRank, totalPlayers) {
  if (!myEntry) return;

  var user = auth.currentUser;
  if (!user) return;

  // Winning is worth a bonus on top of the per-correct XP.
  var xpEarned = myEntry.correct * 10 + (myRank === 1 ? 50 : 0);
  var userRef = db.collection('users').doc(user.uid);

  userRef.get().then(function(doc) {
    if (!doc.exists) return;
    var data = doc.data();

    var today = new Date();
    var todayStr = today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0');

    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayStr = yesterday.getFullYear() + '-' +
      String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
      String(yesterday.getDate()).padStart(2, '0');

    var lastPlayed = data.lastPlayedDate || '';
    var currentStreak = data.currentStreak || 0;
    var bestStreak = data.bestStreak || 0;

    if (lastPlayed === todayStr) {
      // already counted today
    } else if (lastPlayed === yesterdayStr) {
      currentStreak = currentStreak + 1;
    } else {
      currentStreak = 1;
    }
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    var history = data.quizHistory || [];
    history.push({
      category: 'multiplayer',
      score: myEntry.correct,
      total: QUESTIONS_PER_MATCH,
      rank: myRank,
      players: totalPlayers,
      date: todayStr
    });

    return userRef.update({
      xp: (data.xp || 0) + xpEarned,
      currentStreak: currentStreak,
      bestStreak: bestStreak,
      lastPlayedDate: todayStr,
      quizHistory: history,
      multiplayerPlayed: (data.multiplayerPlayed || 0) + 1,
      multiplayerWins: (data.multiplayerWins || 0) + (myRank === 1 ? 1 : 0)
    });
  }).catch(function(err) {
    console.error('Could not save match result:', err);
  });
}

// =====================================================================
// TEARDOWN
// =====================================================================
function teardown() {
  teardownListenerOnly();
  clearInterval(localTimer);
  clearHostTimeouts();
  lastRenderedQuestion = -1;
  lastRenderedPhase = '';
}

function teardownListenerOnly() {
  if (matchUnsub) {
    matchUnsub();
    matchUnsub = null;
  }
}

function endWithMessage(msg) {
  teardown();
  document.getElementById('abortReason').textContent = msg;
  showScreen('abortScreen');
  matchId = null;
}

// Best-effort: if the host closes the tab mid-match, try to tell everyone
// rather than leaving them staring at a frozen question. This is not
// guaranteed to land (browsers cut network on unload), which is exactly
// why host migration is listed as a known limitation in CLAUDE.md.
window.addEventListener('beforeunload', function() {
  if (!matchId || !me || isLeaving) return;
  db.collection('matches').doc(matchId).get().then(function(doc) {
    if (doc.exists && doc.data().hostUid === me.uid && doc.data().status !== 'finished') {
      db.collection('matches').doc(matchId).update({
        status: 'aborted',
        abortReason: 'The host left the room.'
      });
    }
  });
});
