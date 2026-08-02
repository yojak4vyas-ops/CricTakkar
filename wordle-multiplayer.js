// ===== CRICTAKKAR MULTIPLAYER WORDLE (Day 56) =====
//
// Reuses comparePlayer()/displayValue()/fillRow()/buildGuessRows() from
// wordle.js UNCHANGED (loaded before this file on wordle-multiplayer.html)
// — the guessing/scoring logic itself needs no changes, only WHO the
// mystery player is (shared across the whole room instead of per-device)
// and how it's turned into a competitive score.
//
// ARCHITECTURE: its own dedicated collection, wordleMatches/{roomCode},
// separate from the quiz-battle /matches collection. A Wordle round
// doesn't fit the quiz engine's "10 fixed questions, one instant pick per
// round" phase model — here every player submits up to 6 guesses over one
// shared 120-second clock — so retrofitting it into that engine risked
// destabilizing the already-working quiz/tournament code. Lobby, presence
// and host-migration are copy-adapted from multiplayer.js's proven
// pattern (own collection, own rules) rather than sharing code with it.
// effectiveHostUid()/isPresenceFresh()/PRESENCE_STALE_MS are reused
// directly from tournament-logic.js though, since that file's whole
// design is a shared, doc-shape-agnostic pure-function module.
//
// GUESS PRIVACY: each player's guesses live in their own subcollection
// doc (wordleMatches/{code}/guesses/{uid}), readable only by themselves
// and the host — this is what stops a player from seeing how far along
// anyone else is before the reveal.
//
// KNOWN LIMITATION (same tradeoff already accepted for quiz questions —
// see CLAUDE.md's PHASE 3 ARCHITECTURE doc): mysteryPlayerIndex is
// delivered to every client's JS the moment the match starts (it has to
// be, so each client can score its own guesses), so a player who opens
// the browser console can read it early. Accepted for the same reason:
// no money at stake, casual free play.

var WORDLE_SECONDS = 120;
var WORDLE_MAX_GUESSES = 6;
var WORDLE_POINTS = [100, 80, 60, 45, 30, 20]; // indexed by guessCount-1
var WM_CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no O/0, I/1/L lookalikes
var WM_PRESENCE_INTERVAL_MS = 20000;
var RESUME_KEY = 'ct_activeWordleMatch';

var me = null;
var matchId = null;
var matchUnsub = null;
var lastMatch = null;
var mysteryPlayer = null;
var myGuesses = [];          // [{name, correct}]
var myGuessesLoaded = false;
var gameOver = false;
var xpSaved = false;
var countdownTimer = null;
var countdownAnchorKey = null;
var presenceTimer = null;
var isDrivingHost = false;
var hostTickTimeout = null;
var hostDrivingKey = '';
var isLeaving = false;

// wordle.js (loaded just before this file, for its comparePlayer()/
// fillRow()/buildGuessRows() functions) sets its own window.onload to run
// pickNewPlayer() — the single-player shuffle-bag setup. Overwriting it
// here stops that from firing and quietly consuming an entry from the
// SAME localStorage shuffle bag the single-player game uses every time
// this page loads.
window.onload = function() {};

// =====================================================================
// BOOT
// =====================================================================
auth.onAuthStateChanged(function(user) {
  if (!user) { showScreen('loginGateScreen'); return; }

  db.collection('users').doc(user.uid).get().then(function(doc) {
    var data = doc.exists ? doc.data() : {};
    me = { uid: user.uid, name: data.username || data.name || 'Player' };
    enterAfterLogin();
  }).catch(function() {
    me = { uid: user.uid, name: 'Player' };
    enterAfterLogin();
  });
});

function enterAfterLogin() {
  var saved = localStorage.getItem(RESUME_KEY);
  if (!saved) { showScreen('entryScreen'); return; }

  joinRoomByCode(saved).then(function() {
    listenToMatch();
  }).catch(function() {
    localStorage.removeItem(RESUME_KEY);
    showScreen('entryScreen');
  });
}

// =====================================================================
// SCREENS
// =====================================================================
var ALL_SCREENS = [
  'loadingScreen', 'loginGateScreen', 'entryScreen', 'joinScreen',
  'lobbyScreen', 'playingScreen', 'waitingScreen', 'resultScreen', 'abortScreen'
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

function explainFirebaseError(err) {
  var code = (err && err.code) || '';
  if (code === 'permission-denied') {
    return "The server rejected this request. The app's Firestore security " +
           "rules probably haven't been published yet.";
  }
  if (code === 'unavailable') {
    return "Couldn't reach the server. Check your internet connection and try again.";
  }
  if (code === 'unauthenticated') {
    return "You've been signed out. Please log in again.";
  }
  return "Something went wrong: " + (err && err.message ? err.message : 'unknown error');
}

// =====================================================================
// MYSTERY PLAYER POOL — same eligibility filter as single-player wordle.js
// =====================================================================
function eligibleWordlePlayers() {
  var verified = wordlePlayers.filter(function(p) { return typeof p.bowlingStyle !== 'undefined'; });
  return verified.length > 0 ? verified : wordlePlayers;
}

// =====================================================================
// CREATE / JOIN
// =====================================================================
function generateRoomCode() {
  var code = '';
  for (var i = 0; i < 6; i++) code += WM_CODE_CHARS.charAt(Math.floor(Math.random() * WM_CODE_CHARS.length));
  return code;
}

function createRoom(attempt) {
  if (!me) return;
  attempt = attempt || 1;

  var btn = document.getElementById('createRoomBtn');
  if (attempt === 1 && btn) { btn.disabled = true; btn.textContent = 'Creating…'; }

  var code = generateRoomCode();
  var ref = db.collection('wordleMatches').doc(code);

  ref.get().then(function(existing) {
    if (existing.exists) {
      if (attempt >= 5) throw new Error('Could not find a free room code. Please try again.');
      createRoom(attempt + 1);
      return null;
    }

    var players = {};
    players[me.uid] = { name: me.name, joinedAt: Date.now() };

    return ref.set({
      roomCode: code,
      hostUid: me.uid,
      status: 'lobby',
      mysteryPlayerIndex: null,
      phaseAt: null,
      players: players,
      leaderboard: [],
      presence: {},
      leftPlayers: {},
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).then(function(written) {
    if (written === null) return;
    matchId = code;
    localStorage.setItem(RESUME_KEY, matchId);
    listenToMatch();
  }).catch(function(err) {
    console.error('Create Wordle room failed:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Create a Room'; }
    alert(explainFirebaseError(err));
  });
}

// Also doubles as "resume my room" — a player already in it is let
// straight back in with no write at all, same pattern as tournament.js's
// joinTournamentByCode.
function joinRoomByCode(code) {
  var ref = db.collection('wordleMatches').doc(code);

  return ref.get().then(function(docSnap) {
    if (!docSnap.exists) throw new Error('NOT_FOUND');
    var data = docSnap.data();
    var players = data.players || {};

    matchId = code;
    if (players[me.uid]) return null; // already in — just resuming

    if (data.status !== 'lobby') {
      throw new Error(data.status === 'playing' ? 'STARTED' : 'CLOSED');
    }
    if (Object.keys(players).length >= 10) throw new Error('FULL');

    var update = {};
    update['players.' + me.uid] = { name: me.name, joinedAt: Date.now() };
    return ref.update(update);
  });
}

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

  joinRoomByCode(code)
    .then(function() {
      localStorage.setItem(RESUME_KEY, matchId);
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
        errorEl.textContent = 'That room is full.';
      } else {
        console.error('Join failed:', err);
        errorEl.textContent = explainFirebaseError(err);
      }
    });
}

function shareRoomCode() {
  var code = document.getElementById('roomCodeDisplay').textContent;
  var text = "Aao CricTakkar karte hain! 🏏\n\nJoin my Cricket Wordle battle — room code: " +
             code + "\n\n" + window.location.origin + "/wordle-multiplayer.html";
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

// =====================================================================
// LISTEN / RENDER
// =====================================================================
function listenToMatch() {
  if (matchUnsub) matchUnsub();
  matchUnsub = db.collection('wordleMatches').doc(matchId).onSnapshot(function(doc) {
    if (!doc.exists) { endWithMessage('This room no longer exists.'); return; }
    render(doc.data());
  }, function(err) {
    console.error('Match listener error:', err);
  });
}

function render(t) {
  lastMatch = t;

  if (t.status === 'playing') {
    startPresenceHeartbeat();
    maybeActAsHost(t);
  } else {
    stopPresenceHeartbeat();
    if (isDrivingHost) { clearTimeout(hostTickTimeout); isDrivingHost = false; hostDrivingKey = ''; }
  }

  if (t.status === 'aborted') {
    endWithMessage(t.abortReason || 'The host ended the room.');
    return;
  }

  if (t.status === 'lobby') { renderLobby(t); return; }

  if (t.status === 'playing') {
    startCountdownDisplay(t);
    renderPlaying(t);
    return;
  }

  if (t.status === 'finished') { renderResult(t); return; }
}

// =====================================================================
// LOBBY
// =====================================================================
function renderLobby(t) {
  showScreen('lobbyScreen');
  document.getElementById('roomCodeDisplay').textContent = t.roomCode;

  var players = t.players || {};
  var uids = Object.keys(players);
  uids.sort(function(a, b) { return (players[a].joinedAt || 0) - (players[b].joinedAt || 0); });

  document.getElementById('playerCount').textContent = '(' + uids.length + ')';

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
    name.textContent = p.name || 'Player'; // textContent — user-supplied

    row.appendChild(avatar);
    row.appendChild(name);

    if (uid === me.uid) {
      var you = document.createElement('span');
      you.className = 'mp-you-badge';
      you.textContent = 'you';
      row.appendChild(you);
    }
    if (uid === t.hostUid) {
      var host = document.createElement('span');
      host.className = 'mp-host-badge';
      host.textContent = 'HOST';
      row.appendChild(host);
    }

    listEl.appendChild(row);
  });

  var isHost = (t.hostUid === me.uid);
  var startBtn = document.getElementById('startMatchBtn');
  var note = document.getElementById('waitingNote');

  if (isHost) {
    startBtn.style.display = 'block';
    if (uids.length < 2) {
      startBtn.disabled = true;
      startBtn.textContent = 'Need at least 2 players';
      note.textContent = 'Share the code above — need at least 2 players to start.';
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

function startMatch() {
  if (!lastMatch || lastMatch.hostUid !== me.uid) return;

  var eligible = eligibleWordlePlayers();
  var chosen = eligible[Math.floor(Math.random() * eligible.length)];
  var globalIndex = wordlePlayers.indexOf(chosen);

  var btn = document.getElementById('startMatchBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Starting…'; }

  db.collection('wordleMatches').doc(matchId).update({
    status: 'playing',
    mysteryPlayerIndex: globalIndex,
    phaseAt: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(err) {
    console.error('Starting Wordle match failed:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Start Match'; }
    alert(explainFirebaseError(err));
  });
}

// =====================================================================
// PLAYING
// =====================================================================
function renderPlaying(t) {
  if (!mysteryPlayer) mysteryPlayer = wordlePlayers[t.mysteryPlayerIndex];

  if (!myGuessesLoaded) {
    myGuessesLoaded = true; // set immediately — guards against a second snapshot racing this fetch
    db.collection('wordleMatches').doc(matchId).collection('guesses').doc(me.uid).get().then(function(gDoc) {
      myGuesses = gDoc.exists ? (gDoc.data().guessList || []) : [];
      gameOver = myGuesses.some(function(g) { return g.correct; }) || myGuesses.length >= WORDLE_MAX_GUESSES;

      buildGuessRows();
      myGuesses.forEach(function(g, i) {
        var p = wordlePlayers.find(function(pl) { return pl.name === g.name; });
        if (p) fillRow(i, p, comparePlayer(p, mysteryPlayer));
      });

      var remaining = WORDLE_MAX_GUESSES - myGuesses.length;
      var attemptsEl = document.getElementById('attemptsLeft');
      if (attemptsEl) attemptsEl.textContent = remaining + ' attempt' + (remaining === 1 ? '' : 's') + ' remaining';

      showPlayingOrWaiting();
    });
    return;
  }

  showPlayingOrWaiting();
}

function showPlayingOrWaiting() {
  if (gameOver) {
    showScreen('waitingScreen');
    renderWaitingScreen();
  } else {
    showScreen('playingScreen');
  }
}

function renderWaitingScreen() {
  var solved = myGuesses.some(function(g) { return g.correct; });
  var titleEl = document.getElementById('waitingTitle');
  var subEl = document.getElementById('waitingSub');
  if (titleEl) titleEl.textContent = solved ? '🏆 You solved it!' : '😬 Out of guesses';
  if (subEl) subEl.textContent = solved
    ? 'You got it in ' + myGuesses.length + ' guess' + (myGuesses.length === 1 ? '' : 'es') + '. Waiting for the timer…'
    : "You used all 6 guesses. Waiting for the timer…";
}

function submitGuess() {
  if (gameOver) return;

  var inputEl = document.getElementById('playerInput');
  var guessName = inputEl.value.trim();
  if (!guessName) { alert('Please type a player name first!'); return; }

  var guessedPlayer = wordlePlayers.find(function(p) { return p.name.toLowerCase() === guessName.toLowerCase(); });
  if (!guessedPlayer) { alert('Player not found in our list. Please pick from the suggestions.'); return; }

  var already = myGuesses.find(function(g) { return g.name.toLowerCase() === guessedPlayer.name.toLowerCase(); });
  if (already) { alert('You already guessed ' + guessedPlayer.name + '!'); return; }

  var result = comparePlayer(guessedPlayer, mysteryPlayer);
  var allGreen = result.every(function(r) { return r === 'green'; });

  myGuesses.push({ name: guessedPlayer.name, correct: allGreen });
  fillRow(myGuesses.length - 1, guessedPlayer, result);

  inputEl.value = '';
  document.getElementById('autocompleteList').style.display = 'none';

  var remaining = WORDLE_MAX_GUESSES - myGuesses.length;
  var attemptsEl = document.getElementById('attemptsLeft');
  if (attemptsEl) attemptsEl.textContent = remaining + ' attempt' + (remaining === 1 ? '' : 's') + ' remaining';

  db.collection('wordleMatches').doc(matchId).collection('guesses').doc(me.uid)
    .set({ uid: me.uid, guessList: myGuesses })
    .catch(function(err) { console.error('Saving guess failed:', err); });

  if (allGreen || myGuesses.length >= WORDLE_MAX_GUESSES) {
    gameOver = true;
    setTimeout(function() { showScreen('waitingScreen'); renderWaitingScreen(); }, 500);
  }
}

// ===== AUTOCOMPLETE (identical to wordle.js's single-player version) =====
function showSuggestions() {
  var input = document.getElementById('playerInput').value.toLowerCase().trim();
  var list = document.getElementById('autocompleteList');
  if (input.length < 2) { list.style.display = 'none'; return; }
  var matches = wordlePlayers.filter(function(p) { return p.name.toLowerCase().includes(input); });
  if (matches.length === 0) { list.style.display = 'none'; return; }
  list.innerHTML = '';
  matches.slice(0, 6).forEach(function(p) {
    var item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.textContent = p.name;
    item.onclick = function() {
      document.getElementById('playerInput').value = p.name;
      list.style.display = 'none';
    };
    list.appendChild(item);
  });
  list.style.display = 'block';
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    document.getElementById('autocompleteList').style.display = 'none';
    submitGuess();
  }
}

// =====================================================================
// COUNTDOWN — anchored on phaseAt, same pattern as the quiz battles' and
// tournaments' phase clocks, so a migrated host (or a client that just
// reconnected) computes the correct remaining time instead of guessing.
// =====================================================================
function startCountdownDisplay(t) {
  var key = matchId + '_' + ((t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : '0');
  if (countdownTimer && countdownAnchorKey === key) return;
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  countdownAnchorKey = key;

  var phaseAtMs = (t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : Date.now();
  var tick = function() {
    var remaining = Math.max(0, WORDLE_SECONDS - Math.floor((Date.now() - phaseAtMs) / 1000));
    ['wmTimer', 'wmTimerWaiting'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.textContent = remaining + 's';
    });
    if (remaining <= 0 && countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  };
  tick();
  countdownTimer = setInterval(tick, 500);
}

// =====================================================================
// HOST MIGRATION & DRIVING THE CLOCK — see CLAUDE.md "HOST MIGRATION &
// GRACEFUL LEAVING". effectiveHostUid()/isPresenceFresh()/
// PRESENCE_STALE_MS come straight from tournament-logic.js.
// =====================================================================
function startPresenceHeartbeat() {
  if (presenceTimer || !matchId || !me) return;
  var write = function() {
    var update = {};
    update['presence.' + me.uid] = firebase.firestore.FieldValue.serverTimestamp();
    db.collection('wordleMatches').doc(matchId).update(update)
      .catch(function(e) { console.error('Presence heartbeat failed:', e); });
  };
  write();
  presenceTimer = setInterval(write, WM_PRESENCE_INTERVAL_MS);
}

function stopPresenceHeartbeat() {
  if (presenceTimer) { clearInterval(presenceTimer); presenceTimer = null; }
}

function claimHostIfNeeded(t) {
  if (t.hostUid === me.uid) return Promise.resolve();
  return db.collection('wordleMatches').doc(matchId).update({ hostUid: me.uid });
}

function maybeActAsHost(t) {
  if (!me || !matchId) return;
  if (effectiveHostUid(t, Date.now(), PRESENCE_STALE_MS) !== me.uid) {
    if (isDrivingHost) { clearTimeout(hostTickTimeout); isDrivingHost = false; hostDrivingKey = ''; }
    return;
  }
  claimHostIfNeeded(t).then(function() {
    driveHostClock(t);
  }).catch(function(err) { console.error('Claiming Wordle host failed:', err); });
}

function driveHostClock(t) {
  var key = matchId + '_' + ((t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : '0');
  if (isDrivingHost && hostDrivingKey === key) return; // already scheduled for this exact round

  clearTimeout(hostTickTimeout);
  isDrivingHost = true;
  hostDrivingKey = key;

  var phaseAtMs = (t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : Date.now();
  var remaining = Math.max(0, WORDLE_SECONDS * 1000 - (Date.now() - phaseAtMs));

  hostTickTimeout = setTimeout(finishMatch, remaining);
}

// The driving host reads every player's private guess doc (host-only read,
// per firestore.rules), works out how many guesses each took to solve it
// (or null if they never did), turns that into points, and reveals.
function finishMatch() {
  var ref = db.collection('wordleMatches').doc(matchId);

  ref.get().then(function(doc) {
    if (!doc.exists) return;
    var t = doc.data();
    if (t.status !== 'playing') return; // already finished

    var players = t.players || {};
    var uids = Object.keys(players);

    var reads = uids.map(function(uid) {
      return ref.collection('guesses').doc(uid).get().then(function(gDoc) {
        var list = gDoc.exists ? (gDoc.data().guessList || []) : [];
        var solvedIndex = -1;
        for (var i = 0; i < list.length; i++) {
          if (list[i].correct) { solvedIndex = i; break; }
        }
        var guessCount = solvedIndex === -1 ? null : (solvedIndex + 1);
        var points = guessCount ? (WORDLE_POINTS[guessCount - 1] || 10) : 0;
        return { uid: uid, name: (players[uid] || {}).name || 'Player', guessCount: guessCount, points: points };
      });
    });

    return Promise.all(reads).then(function(entries) {
      entries.sort(function(a, b) { return b.points - a.points; });
      return ref.update({
        status: 'finished',
        leaderboard: entries,
        finishedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }).catch(function(err) {
    console.error('Finishing Wordle match failed:', err);
  });
}

// =====================================================================
// RESULT
// =====================================================================
function renderResult(t) {
  showScreen('resultScreen');
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  stopPresenceHeartbeat();

  var mp = wordlePlayers[t.mysteryPlayerIndex];
  document.getElementById('wmMysteryName').textContent = mp ? mp.name : '?';
  document.getElementById('wmMysteryCountry').textContent = mp ? mp.country : '';

  var board = t.leaderboard || [];
  var listEl = document.getElementById('wmLeaderboardList');
  listEl.innerHTML = '';

  board.forEach(function(entry, i) {
    var row = document.createElement('div');
    row.className = 'mp-player-row';

    var rank = document.createElement('div');
    rank.className = 'mp-player-avatar';
    rank.textContent = '#' + (i + 1);

    var name = document.createElement('div');
    name.className = 'mp-player-name';
    name.textContent = entry.name || 'Player'; // textContent — user-supplied

    var pts = document.createElement('span');
    pts.className = 'mp-you-badge';
    pts.textContent = entry.guessCount ? (entry.points + ' pts · ' + entry.guessCount + '/6') : '0 pts';

    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(pts);

    if (entry.uid === me.uid) {
      var you = document.createElement('span');
      you.className = 'mp-you-badge';
      you.textContent = 'you';
      row.appendChild(you);
    }

    listEl.appendChild(row);
  });

  saveMyXP(board);
  localStorage.removeItem(RESUME_KEY);
}

function wmGetLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}

// Every player self-writes their own XP/streak — same self-writable-XP
// trust model already accepted app-wide (Scale & Safety Audit S3), and
// the same streak-maintenance block used by every other game (Day 29:
// playing ANY game keeps the daily streak alive).
function saveMyXP(board) {
  if (xpSaved || !me) return;
  xpSaved = true;

  var mine = board.find(function(e) { return e.uid === me.uid; });
  if (!mine) return;
  var xpEarned = mine.points;

  var userRef = db.collection('users').doc(me.uid);
  userRef.get().then(function(doc) {
    if (!doc.exists) return;
    var data = doc.data();
    var newXP = (data.xp || 0) + xpEarned;

    var today = new Date();
    var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    var lastPlayed = data.lastPlayedDate || '';
    var currentStreak = data.currentStreak || 0;
    var bestStreak = data.bestStreak || 0;

    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    var yesterdayStr = yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0');

    if (lastPlayed === todayStr) {
      // already played something today — streak unchanged
    } else if (lastPlayed === yesterdayStr) {
      currentStreak = currentStreak + 1;
    } else {
      currentStreak = 1;
    }
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    userRef.update({
      xp: newXP,
      level: wmGetLevel(newXP),
      currentStreak: currentStreak,
      bestStreak: bestStreak,
      lastPlayedDate: todayStr
    }).catch(function(err) { console.error('Saving Wordle battle XP failed:', err); });
  });
}

// =====================================================================
// LEAVE / TEARDOWN
// =====================================================================
function leaveRoom() {
  if (!matchId) { showScreen('entryScreen'); return; }

  isLeaving = true;
  var ref = db.collection('wordleMatches').doc(matchId);

  ref.get().then(function(doc) {
    if (!doc.exists) return null;
    var t = doc.data();

    if (t.status === 'playing') {
      var liveUpdate = {};
      liveUpdate['leftPlayers.' + me.uid] = true;
      liveUpdate['presence.' + me.uid] = firebase.firestore.FieldValue.delete();
      return ref.update(liveUpdate);
    }

    if (t.hostUid === me.uid) {
      return ref.update({ status: 'aborted', abortReason: 'The host left the room.' });
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

function endWithMessage(msg) {
  teardown();
  document.getElementById('abortReason').textContent = msg;
  showScreen('abortScreen');
  matchId = null;
}

function teardown() {
  if (matchUnsub) { matchUnsub(); matchUnsub = null; }
  stopPresenceHeartbeat();
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  countdownAnchorKey = null;
  clearTimeout(hostTickTimeout);
  isDrivingHost = false;
  hostDrivingKey = '';
  myGuesses = [];
  myGuessesLoaded = false;
  gameOver = false;
  xpSaved = false;
  mysteryPlayer = null;
  localStorage.removeItem(RESUME_KEY);
}

// Best-effort: if a player closes the tab mid-match, mark them left so
// they don't sit there falsely "present" until the 45s staleness timeout.
window.addEventListener('beforeunload', function() {
  if (!matchId || !me || isLeaving) return;
  if (!lastMatch || lastMatch.status !== 'playing') return;
  var update = {};
  update['leftPlayers.' + me.uid] = true;
  db.collection('wordleMatches').doc(matchId).update(update);
});

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var joinVisible = document.getElementById('joinScreen').style.display === 'flex';
  if (joinVisible && document.activeElement && document.activeElement.id === 'joinCodeInput') {
    joinRoom();
  }
});
