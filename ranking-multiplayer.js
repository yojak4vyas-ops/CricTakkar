// ===== CRICTAKKAR MULTIPLAYER RANKING CHALLENGE (Day 56) =====
//
// ARCHITECTURE: its own dedicated collection, rankingMatches/{roomCode},
// same reasoning as wordle-multiplayer.js — a separate file/collection
// rather than folding it into the quiz-battle engine, to keep zero
// regression risk on the already-working quiz/tournament code.
//
// UNLIKE Wordle, this file does NOT load ranking.js directly: ranking.js
// registers a DOMContentLoaded listener that immediately starts a real
// single-player session and a real 10-second countdown against DOM
// elements this page doesn't have — that would silently run a phantom
// round in the background and could even self-write real XP if the
// player happens to be logged in. So the small set of pure functions
// this file actually needs (challenge generation, scoring, shuffling)
// are duplicated below instead, clearly marked as duplicated-not-shared.
// ranking-challenges.js (pure data + pure generator functions, no DOM
// side effects at all) IS loaded directly — same file the single-player
// game uses, so both draw from the exact same verified challenge pool.
//
// ROUND FLOW mirrors multiplayer.js's quiz battles almost exactly:
// 'answering' (10s, anchored on phaseAt) -> 'standings' (4s, shows the
// correct order + running leaderboard) -> next challenge, or 'finished'
// after all 4. Unlike Wordle, there's no meaningful secret to protect
// here — ranking-challenges.js's leaders lists are already public and
// already sorted, so the "correct order" for any challenge is trivially
// derivable by anyone who wanted to look. Answers still go through a
// private-until-reveal subcollection anyway, purely to stop a player
// copying another live player's SUBMITTED guess mid-round.

var RM_SESSION_SIZE = 4;
var RM_WINDOW_SIZE = 5;
var RM_MAX_RANK_GAP = 3;
var RM_ANSWER_MS = 10000;
var RM_STANDINGS_MS = 4000;
var RM_CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
var RM_PRESENCE_INTERVAL_MS = 20000;
var RESUME_KEY = 'ct_activeRankingMatch';

// =====================================================================
// DUPLICATED PURE FUNCTIONS (from ranking.js) — see note above for why.
// =====================================================================
function rmBuildSessionPool() {
  var generated = RANKING_PARAMETERS.map(function(p) { return rmGenerateChallenge(p); }).filter(Boolean);
  return generated.concat(FIXED_CHALLENGES);
}

function rmGenerateChallenge(param) {
  var leaders = param.leaders;
  if (!leaders || leaders.length < RM_WINDOW_SIZE) return null;

  var indices = rmPickWindowIndices(leaders.length, RM_WINDOW_SIZE, RM_MAX_RANK_GAP);
  if (!indices) return null;

  var players = indices.map(function(i) { return { name: leaders[i].name, flag: leaders[i].flag, value: leaders[i].value }; });

  var tiedGroups = [];
  for (var k = 0; k < indices.length - 1; k++) {
    if (leaders[indices[k]].tiedWithNext && indices[k + 1] === indices[k] + 1) tiedGroups.push([k, k + 1]);
  }

  return {
    id: param.id + '-' + indices.join('_'),
    question: param.question,
    hint: param.hint,
    players: players,
    correctOrder: [0, 1, 2, 3, 4].slice(0, RM_WINDOW_SIZE),
    tiedGroups: tiedGroups.length ? tiedGroups : undefined
  };
}

function rmPickWindowIndices(n, size, maxGap) {
  var gapsNeeded = size - 1;
  var minSpan = gapsNeeded;
  var maxSpan = Math.min(gapsNeeded * maxGap, n - 1);
  if (maxSpan < minSpan) return null;

  var span = minSpan + Math.floor(Math.random() * (maxSpan - minSpan + 1));
  var gaps = rmDistributeGaps(span, gapsNeeded, maxGap);

  var maxStart = n - 1 - span;
  var start = Math.floor(Math.random() * (maxStart + 1));

  var indices = [start];
  var current = start;
  gaps.forEach(function(g) { current += g; indices.push(current); });
  return indices;
}

function rmDistributeGaps(span, count, maxGap) {
  var gaps = new Array(count).fill(1);
  var remaining = span - count;
  while (remaining > 0) {
    var idx = Math.floor(Math.random() * count);
    if (gaps[idx] < maxGap) { gaps[idx]++; remaining--; }
  }
  return gaps;
}

function rmPickRandomChallenges(pool, count) {
  var indices = rmShuffleArray(pool.map(function(_, i) { return i; }));
  return indices.slice(0, count).map(function(i) { return pool[i]; });
}

function rmShuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function rmFindTiedGroup(challenge, position) {
  var groups = challenge.tiedGroups || [];
  return groups.find(function(g) { return g.indexOf(position) !== -1; });
}

function rmIsPositionCorrect(challenge, userOrder, position) {
  var group = rmFindTiedGroup(challenge, position);
  if (group) {
    var tiedSet = group.map(function(p) { return challenge.correctOrder[p]; });
    var userSet = group.map(function(p) { return userOrder[p]; });
    return tiedSet.length === userSet.length && tiedSet.every(function(v) { return userSet.indexOf(v) !== -1; });
  }
  return challenge.correctOrder[position] === userOrder[position];
}

function rmScoreChallenge(challenge, userOrder) {
  var correct = 0;
  var countedGroups = {};
  userOrder.forEach(function(playerIndex, position) {
    var group = rmFindTiedGroup(challenge, position);
    if (group) {
      var key = group.join(',');
      if (countedGroups[key]) return;
      countedGroups[key] = true;
      if (rmIsPositionCorrect(challenge, userOrder, position)) correct += group.length;
    } else {
      if (challenge.correctOrder[position] === playerIndex) correct++;
    }
  });
  return correct;
}

// =====================================================================
// STATE
// =====================================================================
var me = null;
var matchId = null;
var matchUnsub = null;
var lastMatch = null;
var currentUserOrder = [];
var dragSrcIndex = null;
var roundAnswered = false;
var xpSaved = false;
var countdownTimer = null;
var countdownAnchorKey = null;
var presenceTimer = null;
var isDrivingHost = false;
var hostTickTimeout = null;
var hostDrivingKey = '';
var isLeaving = false;

window.onload = function() {}; // no single-player script loaded, but harmless to pin

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
  'lobbyScreen', 'playingScreen', 'standingsScreen', 'finalScreen', 'abortScreen'
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
// CREATE / JOIN
// =====================================================================
function generateRoomCode() {
  var code = '';
  for (var i = 0; i < 6; i++) code += RM_CODE_CHARS.charAt(Math.floor(Math.random() * RM_CODE_CHARS.length));
  return code;
}

function createRoom(attempt) {
  if (!me) return;
  attempt = attempt || 1;

  var btn = document.getElementById('createRoomBtn');
  if (attempt === 1 && btn) { btn.disabled = true; btn.textContent = 'Creating…'; }

  var code = generateRoomCode();
  var ref = db.collection('rankingMatches').doc(code);

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
      challenges: [],
      currentChallenge: 0,
      phase: 'answering',
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
    console.error('Create Ranking room failed:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Create a Room'; }
    alert(explainFirebaseError(err));
  });
}

function joinRoomByCode(code) {
  var ref = db.collection('rankingMatches').doc(code);

  return ref.get().then(function(docSnap) {
    if (!docSnap.exists) throw new Error('NOT_FOUND');
    var data = docSnap.data();
    var players = data.players || {};

    matchId = code;
    if (players[me.uid]) return null;

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
  var text = "Aao CricTakkar karte hain! 🏏\n\nJoin my Ranking Challenge battle — room code: " +
             code + "\n\n" + window.location.origin + "/ranking-multiplayer.html";
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
  matchUnsub = db.collection('rankingMatches').doc(matchId).onSnapshot(function(doc) {
    if (!doc.exists) { endWithMessage('This room no longer exists.'); return; }
    render(doc.data());
  }, function(err) {
    console.error('Match listener error:', err);
  });
}

function render(t) {
  var previousChallenge = lastMatch ? lastMatch.currentChallenge : -1;
  lastMatch = t;

  if (t.status === 'playing') {
    startPresenceHeartbeat();
    maybeActAsHost(t);
  } else {
    stopPresenceHeartbeat();
    if (isDrivingHost) { clearTimeout(hostTickTimeout); isDrivingHost = false; hostDrivingKey = ''; }
  }

  if (t.status === 'aborted') { endWithMessage(t.abortReason || 'The host ended the room.'); return; }
  if (t.status === 'lobby') { renderLobby(t); return; }

  if (t.status === 'playing') {
    if (t.currentChallenge !== previousChallenge) roundAnswered = false; // new round — reset local guard
    if (t.phase === 'answering') { renderAnswering(t); return; }
    if (t.phase === 'standings') { renderStandings(t); return; }
  }

  if (t.status === 'finished') { renderFinal(t); return; }
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

  var challenges = rmPickRandomChallenges(rmBuildSessionPool(), RM_SESSION_SIZE);

  var btn = document.getElementById('startMatchBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Starting…'; }

  db.collection('rankingMatches').doc(matchId).update({
    status: 'playing',
    challenges: challenges,
    currentChallenge: 0,
    phase: 'answering',
    phaseAt: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(err) {
    console.error('Starting Ranking match failed:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Start Match'; }
    alert(explainFirebaseError(err));
  });
}

// =====================================================================
// ANSWERING
// =====================================================================
function renderAnswering(t) {
  showScreen('playingScreen');
  startCountdownDisplay(t, RM_ANSWER_MS, 'wmTimer');

  if (roundAnswered) {
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').textContent = 'Submitted — waiting…';
    return;
  }

  var challenge = t.challenges[t.currentChallenge];
  document.getElementById('progressText').textContent = 'Challenge ' + (t.currentChallenge + 1) + ' of ' + t.challenges.length;
  document.getElementById('progressFill').style.width = (t.currentChallenge / t.challenges.length * 100) + '%';
  document.getElementById('challengeNumber').textContent = 'Challenge ' + (t.currentChallenge + 1);
  document.getElementById('challengeQuestion').textContent = challenge.question;
  document.getElementById('challengeHint').textContent = challenge.hint;
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').textContent = 'Submit My Ranking ✅';

  currentUserOrder = rmShuffleArray(challenge.players.map(function(_, i) { return i; }));
  renderDragList(challenge);
}

function renderDragList(challenge) {
  var list = document.getElementById('dragList');
  list.innerHTML = '';

  currentUserOrder.forEach(function(playerIndex, position) {
    var player = challenge.players[playerIndex];

    var item = document.createElement('div');
    item.className = 'drag-item';
    item.setAttribute('data-position', position);
    item.setAttribute('draggable', 'true');

    var handle = document.createElement('div');
    handle.className = 'drag-handle';
    handle.textContent = '⠿';
    var rank = document.createElement('div');
    rank.className = 'drag-rank';
    rank.textContent = position + 1;
    var name = document.createElement('div');
    name.className = 'drag-name';
    name.textContent = player.name; // textContent — safe even though player data is our own file
    var flag = document.createElement('div');
    flag.className = 'drag-flag';
    flag.textContent = player.flag;

    item.appendChild(handle); item.appendChild(rank); item.appendChild(name); item.appendChild(flag);

    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('drop', onDrop);
    item.addEventListener('dragend', onDragEnd);
    item.addEventListener('touchstart', onTouchStart, { passive: false });
    item.addEventListener('touchmove', onTouchMove, { passive: false });
    item.addEventListener('touchend', onTouchEnd);

    list.appendChild(item);
  });
}

function onDragStart(e) {
  dragSrcIndex = parseInt(this.getAttribute('data-position'));
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.drag-item').forEach(function(el) { el.classList.remove('drag-over'); });
  this.classList.add('drag-over');
}
function onDrop(e) {
  e.preventDefault();
  var dropIndex = parseInt(this.getAttribute('data-position'));
  if (dragSrcIndex !== null && dragSrcIndex !== dropIndex) movePosition(dragSrcIndex, dropIndex);
}
function onDragEnd() {
  document.querySelectorAll('.drag-item').forEach(function(el) { el.classList.remove('dragging', 'drag-over'); });
  dragSrcIndex = null;
}

var touchDragIndex = null;
var touchGhost = null;
var touchOffsetX = 0;
var touchOffsetY = 0;

function onTouchStart(e) {
  e.preventDefault();
  touchDragIndex = parseInt(this.getAttribute('data-position'));
  var touch = e.touches[0];
  var rect = this.getBoundingClientRect();
  touchOffsetX = touch.clientX - rect.left;
  touchOffsetY = touch.clientY - rect.top;

  touchGhost = this.cloneNode(true);
  touchGhost.className = 'drag-item drag-ghost';
  touchGhost.style.width = rect.width + 'px';
  touchGhost.style.left = (touch.clientX - touchOffsetX) + 'px';
  touchGhost.style.top = (touch.clientY - touchOffsetY) + 'px';
  document.body.appendChild(touchGhost);
  this.classList.add('dragging');
}
function onTouchMove(e) {
  e.preventDefault();
  if (!touchGhost) return;
  var touch = e.touches[0];
  touchGhost.style.left = (touch.clientX - touchOffsetX) + 'px';
  touchGhost.style.top = (touch.clientY - touchOffsetY) + 'px';

  touchGhost.style.display = 'none';
  var el = document.elementFromPoint(touch.clientX, touch.clientY);
  touchGhost.style.display = '';

  document.querySelectorAll('.drag-item').forEach(function(i) { i.classList.remove('drag-over'); });
  var dragItem = el ? el.closest('.drag-item') : null;
  if (dragItem && !dragItem.classList.contains('drag-ghost')) dragItem.classList.add('drag-over');
}
function onTouchEnd(e) {
  if (touchGhost) { touchGhost.remove(); touchGhost = null; }
  var touch = e.changedTouches[0];
  document.querySelectorAll('.drag-item').forEach(function(i) { i.classList.remove('drag-over', 'dragging'); });

  var el = document.elementFromPoint(touch.clientX, touch.clientY);
  var dragItem = el ? el.closest('.drag-item') : null;
  if (dragItem) {
    var dropIndex = parseInt(dragItem.getAttribute('data-position'));
    if (touchDragIndex !== null && touchDragIndex !== dropIndex) movePosition(touchDragIndex, dropIndex);
  }
  touchDragIndex = null;
}

function movePosition(from, to) {
  var moved = currentUserOrder.splice(from, 1)[0];
  currentUserOrder.splice(to, 0, moved);
  renderDragList(lastMatch.challenges[lastMatch.currentChallenge]);
}

function submitAnswer() {
  if (roundAnswered || !lastMatch) return;
  roundAnswered = true;

  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').textContent = 'Submitted — waiting…';

  var challenge = lastMatch.challenges[lastMatch.currentChallenge];
  var myScore = rmScoreChallenge(challenge, currentUserOrder); // local feedback only, host recomputes for scoring

  document.querySelectorAll('.drag-item').forEach(function(item, position) {
    var correct = rmIsPositionCorrect(challenge, currentUserOrder, position);
    item.classList.add(correct ? 'correct' : 'wrong');
    item.setAttribute('draggable', 'false');
  });

  var answerId = me.uid + '_' + lastMatch.currentChallenge;
  db.collection('rankingMatches').doc(matchId).collection('answers').doc(answerId).set({
    uid: me.uid,
    challengeIndex: lastMatch.currentChallenge,
    order: currentUserOrder,
    clientScore: myScore,
    submittedAt: Date.now()
  }).catch(function(err) { console.error('Saving ranking answer failed:', err); });
}

// =====================================================================
// STANDINGS (between rounds)
// =====================================================================
function renderStandings(t) {
  showScreen('standingsScreen');
  startCountdownDisplay(t, RM_STANDINGS_MS, 'wmStandingsTimer');

  var challenge = t.challenges[t.currentChallenge];
  document.getElementById('rmCorrectOrderTitle').textContent = '✅ Correct order for: ' + challenge.question;

  var orderEl = document.getElementById('correctOrderList');
  orderEl.innerHTML = '';
  challenge.correctOrder.forEach(function(playerIndex, rank) {
    var player = challenge.players[playerIndex];
    var item = document.createElement('div');
    item.className = 'correct-order-item';
    var num = document.createElement('div');
    num.className = 'correct-order-num';
    num.textContent = rank + 1;
    var name = document.createElement('div');
    name.className = 'correct-order-name';
    name.textContent = player.flag + ' ' + player.name;
    var value = document.createElement('div');
    value.className = 'correct-order-value';
    value.textContent = player.value;
    item.appendChild(num); item.appendChild(name); item.appendChild(value);
    orderEl.appendChild(item);
  });

  var board = t.leaderboard || [];
  var listEl = document.getElementById('rmStandingsList');
  listEl.innerHTML = '';
  board.forEach(function(entry, i) {
    var row = document.createElement('div');
    row.className = 'mp-player-row';
    var rank = document.createElement('div');
    rank.className = 'mp-player-avatar';
    rank.textContent = '#' + (i + 1);
    var name = document.createElement('div');
    name.className = 'mp-player-name';
    name.textContent = entry.name || 'Player';
    var pts = document.createElement('span');
    pts.className = 'mp-you-badge';
    pts.textContent = entry.totalCorrect + '/' + ((t.currentChallenge + 1) * RM_WINDOW_SIZE);
    row.appendChild(rank); row.appendChild(name); row.appendChild(pts);
    if (entry.uid === me.uid) {
      var you = document.createElement('span'); you.className = 'mp-you-badge'; you.textContent = 'you'; row.appendChild(you);
    }
    listEl.appendChild(row);
  });
}

// =====================================================================
// COUNTDOWN — anchored on phaseAt, same pattern as quiz battles/
// tournaments/Wordle battle so a migrated host resumes correctly.
// =====================================================================
function startCountdownDisplay(t, durationMs, elId) {
  var key = matchId + '_' + t.phase + '_' + t.currentChallenge + '_' + ((t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : '0');
  if (countdownTimer && countdownAnchorKey === key) return;
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  countdownAnchorKey = key;

  var phaseAtMs = (t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : Date.now();
  var tick = function() {
    var remainingMs = Math.max(0, durationMs - (Date.now() - phaseAtMs));
    var el = document.getElementById(elId);
    if (el) el.textContent = Math.ceil(remainingMs / 1000);
    var circle = el ? el.closest('.timer-circle') : null;
    if (circle) circle.classList.toggle('danger', remainingMs <= 5000);
    if (remainingMs <= 0 && countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  };
  tick();
  countdownTimer = setInterval(tick, 250);
}

// =====================================================================
// HOST MIGRATION & DRIVING THE ROUND CLOCK
// =====================================================================
function startPresenceHeartbeat() {
  if (presenceTimer || !matchId || !me) return;
  var write = function() {
    var update = {};
    update['presence.' + me.uid] = firebase.firestore.FieldValue.serverTimestamp();
    db.collection('rankingMatches').doc(matchId).update(update)
      .catch(function(e) { console.error('Presence heartbeat failed:', e); });
  };
  write();
  presenceTimer = setInterval(write, RM_PRESENCE_INTERVAL_MS);
}

function stopPresenceHeartbeat() {
  if (presenceTimer) { clearInterval(presenceTimer); presenceTimer = null; }
}

function claimHostIfNeeded(t) {
  if (t.hostUid === me.uid) return Promise.resolve();
  return db.collection('rankingMatches').doc(matchId).update({ hostUid: me.uid });
}

function maybeActAsHost(t) {
  if (!me || !matchId) return;
  if (effectiveHostUid(t, Date.now(), PRESENCE_STALE_MS) !== me.uid) {
    if (isDrivingHost) { clearTimeout(hostTickTimeout); isDrivingHost = false; hostDrivingKey = ''; }
    return;
  }
  claimHostIfNeeded(t).then(function() {
    driveHostPhase(t);
  }).catch(function(err) { console.error('Claiming Ranking host failed:', err); });
}

function driveHostPhase(t) {
  var key = matchId + '_' + t.phase + '_' + t.currentChallenge + '_' + ((t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : '0');
  if (isDrivingHost && hostDrivingKey === key) return;

  clearTimeout(hostTickTimeout);
  isDrivingHost = true;
  hostDrivingKey = key;

  var durationMs = (t.phase === 'answering') ? RM_ANSWER_MS : RM_STANDINGS_MS;
  var phaseAtMs = (t.phaseAt && t.phaseAt.toMillis) ? t.phaseAt.toMillis() : Date.now();
  var remaining = Math.max(0, durationMs - (Date.now() - phaseAtMs));

  hostTickTimeout = setTimeout(function() {
    if (t.phase === 'answering') aggregateAndAdvanceToStandings();
    else advancePastStandings();
  }, remaining);
}

// The driving host reads every player's answer for the round just ended,
// recomputes their score itself (rather than trusting a client-reported
// value) via the same rmScoreChallenge() every client already ran, and
// folds it into the running cumulative leaderboard.
function aggregateAndAdvanceToStandings() {
  var ref = db.collection('rankingMatches').doc(matchId);

  ref.get().then(function(doc) {
    if (!doc.exists) return;
    var t = doc.data();
    if (t.status !== 'playing' || t.phase !== 'answering') return;

    var challenge = t.challenges[t.currentChallenge];
    var players = t.players || {};
    var uids = Object.keys(players);

    var reads = uids.map(function(uid) {
      return ref.collection('answers').doc(uid + '_' + t.currentChallenge).get().then(function(aDoc) {
        var score = aDoc.exists ? rmScoreChallenge(challenge, aDoc.data().order || []) : 0;
        return { uid: uid, score: score };
      });
    });

    return Promise.all(reads).then(function(results) {
      var prevBoard = t.leaderboard || [];
      var prevByUid = {};
      prevBoard.forEach(function(e) { prevByUid[e.uid] = e; });

      var newBoard = uids.map(function(uid) {
        var prior = prevByUid[uid] || { totalCorrect: 0 };
        var thisRound = results.find(function(r) { return r.uid === uid; }).score;
        return { uid: uid, name: (players[uid] || {}).name || 'Player', totalCorrect: prior.totalCorrect + thisRound };
      });
      newBoard.sort(function(a, b) { return b.totalCorrect - a.totalCorrect; });

      return ref.update({
        phase: 'standings',
        phaseAt: firebase.firestore.FieldValue.serverTimestamp(),
        leaderboard: newBoard
      });
    });
  }).catch(function(err) { console.error('Aggregating ranking round failed:', err); });
}

function advancePastStandings() {
  var ref = db.collection('rankingMatches').doc(matchId);

  ref.get().then(function(doc) {
    if (!doc.exists) return;
    var t = doc.data();
    if (t.status !== 'playing' || t.phase !== 'standings') return;

    if (t.currentChallenge + 1 >= t.challenges.length) {
      return ref.update({ status: 'finished', finishedAt: firebase.firestore.FieldValue.serverTimestamp() });
    }

    return ref.update({
      currentChallenge: t.currentChallenge + 1,
      phase: 'answering',
      phaseAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).catch(function(err) { console.error('Advancing ranking round failed:', err); });
}

// =====================================================================
// FINAL
// =====================================================================
function renderFinal(t) {
  showScreen('finalScreen');
  if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  stopPresenceHeartbeat();

  var board = t.leaderboard || [];
  var maxScore = (t.challenges || []).length * RM_WINDOW_SIZE;
  var listEl = document.getElementById('rmFinalList');
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
    pts.textContent = entry.totalCorrect + '/' + maxScore;
    row.appendChild(rank); row.appendChild(name); row.appendChild(pts);
    if (entry.uid === me.uid) {
      var you = document.createElement('span'); you.className = 'mp-you-badge'; you.textContent = 'you'; row.appendChild(you);
    }
    listEl.appendChild(row);
  });

  saveMyXP(board, maxScore);
  localStorage.removeItem(RESUME_KEY);
}

function rmGetLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}

// Every player self-writes their own XP/streak — same trust model and
// streak block used by every other game in this app. 20 XP per correct
// position, matching single-player ranking.js's own rate.
function saveMyXP(board, maxScore) {
  if (xpSaved || !me) return;
  xpSaved = true;

  var mine = board.find(function(e) { return e.uid === me.uid; });
  if (!mine) return;
  var xpEarned = mine.totalCorrect * 20;

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

    var badges = data.badges || {};
    if (mine.totalCorrect >= maxScore) badges.rankingMaster = true; // perfect session

    userRef.update({
      xp: newXP,
      level: rmGetLevel(newXP),
      rankingPlayed: (data.rankingPlayed || 0) + 1,
      badges: badges,
      currentStreak: currentStreak,
      bestStreak: bestStreak,
      lastPlayedDate: todayStr
    }).catch(function(err) { console.error('Saving Ranking battle XP failed:', err); });
  });
}

// =====================================================================
// LEAVE / TEARDOWN
// =====================================================================
function leaveRoom() {
  if (!matchId) { showScreen('entryScreen'); return; }

  isLeaving = true;
  var ref = db.collection('rankingMatches').doc(matchId);

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
  currentUserOrder = [];
  roundAnswered = false;
  xpSaved = false;
  localStorage.removeItem(RESUME_KEY);
}

window.addEventListener('beforeunload', function() {
  if (!matchId || !me || isLeaving) return;
  if (!lastMatch || lastMatch.status !== 'playing') return;
  var update = {};
  update['leftPlayers.' + me.uid] = true;
  db.collection('rankingMatches').doc(matchId).update(update);
});

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var joinVisible = document.getElementById('joinScreen').style.display === 'flex';
  if (joinVisible && document.activeElement && document.activeElement.id === 'joinCodeInput') {
    joinRoom();
  }
});
