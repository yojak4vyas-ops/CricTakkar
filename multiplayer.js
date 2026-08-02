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
var SECONDS_PER_QUESTION = 10;
var SPEED_SECONDS_PER_QUESTION = 5;  // Speed Mode's shorter clock
var SPEED_MIN_POINTS = 5;            // a correct answer at the buzzer still scores this
var SPEED_MAX_POINTS = 20;           // an instant correct answer scores this
var ELIMINATION_MIN_PLAYERS = 3;     // fewer than this and there's no one to eliminate
var REVEAL_MS = 4000;      // how long the correct answer stays up
var STANDINGS_MS = 4000;   // how long the between-question table stays up
var POINTS_PER_CORRECT = 10;
// HOST MIGRATION (see CLAUDE.md "HOST MIGRATION & GRACEFUL LEAVING"). Every
// player checks in this often while a match is in progress; if the current
// host goes quiet for longer than this, another present player's browser
// takes over running the clock automatically. Tuned as a compromise: often
// enough that a real crash recovers in well under a minute, rare enough
// that it stays a small fraction of a match's existing per-question write
// cost (a 3-minute duel adds ~9 heartbeat writes per player at this rate,
// against ~30-40 the host already makes running the clock).
var PRESENCE_INTERVAL_MS = 20000;
var PRESENCE_STALE_MS = 45000;
var MAX_PLAYERS = 10;       // private rooms + public matchmaking
var DUEL_MAX_PLAYERS = 2;   // 1v1 duel rooms
var CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no O/0, I/1/L lookalikes
var CREATE_BTN_LABELS = {
  createRoomBtn: 'Create a Room',
  duelBtn: '⚔️ 1v1 Duel a Friend',
  speedModeBtn: '⚡ Speed Mode',
  eliminationModeBtn: '💀 Last One Standing'
};

// ===== STATE =====
var me = null;              // { uid, name }
var matchId = null;
var matchUnsub = null;      // detaches the match listener
var localTimer = null;      // visual countdown interval
var hostTimeouts = [];      // host-only phase timers, cleared on teardown
var lastRenderedQuestion = -1;
var lastRenderedPhase = '';
var hasAnsweredThisQuestion = false;
var questionShownAt = 0;    // Speed Mode's per-answer scoring reads this via timeTaken
var isLeaving = false;      // suppresses the beforeunload handler during a clean exit
var duelAutoStartFired = false; // stops a duel's 2nd-player-joins auto-start firing twice
var activeMatchMode = 'classic'; // refreshed from every snapshot — 'classic' | 'speed' | 'elimination'
var presenceTimer = null;   // heartbeat interval, running only while status === 'playing'
var isDrivingHost = false;  // am I (this browser) currently the one running the phase clock?
var hostDrivingKey = '';    // qIndex:phase we last scheduled for — stops re-scheduling on every snapshot

// ===== BATTLE PICKER (Day 56) =====
// Set by the new "what do you want to play?" screen before entryScreen —
// createRoom()/findPublicMatch() read these instead of every caller having
// to thread them through. null category = the whole mixed bank (unchanged
// default behaviour); 'general' is treated the same, since question-bank.js
// already uses that tag for format-agnostic trivia with no category-quiz
// tab of its own.
var chosenCategory = null;  // null | 'ipl' | 'test' | 'odi' | 't20'
var chosenMode = 'classic'; // 'classic' | 'speed' | 'elimination'

// Both modes' clocks read this instead of the flat SECONDS_PER_QUESTION.
function secondsForMode() {
  return (activeMatchMode === 'speed') ? SPEED_SECONDS_PER_QUESTION : SECONDS_PER_QUESTION;
}

// =====================================================================
// HOST MIGRATION — presence, and "who should be running this match?"
// PURE (no Firestore/DOM), same reasoning as computeLeaderboard: it's the
// one piece of real logic here, so it should be testable without a
// database, and every client evaluates it independently off the same
// document to reach the same answer with no separate "election" write.
// See CLAUDE.md "HOST MIGRATION & GRACEFUL LEAVING" for the full design.
// =====================================================================
function isPresenceFresh(presence, uid, nowMs) {
  if (!presence || !presence[uid]) return false;
  var ts = presence[uid];
  var tsMs = (ts && typeof ts.toMillis === 'function') ? ts.toMillis() : null;
  if (tsMs === null) return false;
  return (nowMs - tsMs) < PRESENCE_STALE_MS;
}

function effectiveHostUid(match, nowMs) {
  var players = match.players || {};
  var leftPlayers = match.leftPlayers || {};
  var presence = match.presence || {};

  // No heartbeats have landed at all yet (a brand-new match) — defer to
  // the recorded host rather than racing the very first snapshot.
  if (Object.keys(presence).length === 0) return match.hostUid;

  var candidates = Object.keys(players).filter(function(uid) {
    if (Object.prototype.hasOwnProperty.call(leftPlayers, uid)) return false;
    return isPresenceFresh(presence, uid, nowMs);
  });

  if (candidates.length === 0) return null; // nobody present right now
  if (candidates.indexOf(match.hostUid) !== -1) return match.hostUid;

  candidates.sort();
  return candidates[0];
}

function startPresenceHeartbeat() {
  if (presenceTimer || !matchId || !me) return;
  var write = function() {
    var update = {};
    update['presence.' + me.uid] = firebase.firestore.FieldValue.serverTimestamp();
    db.collection('matches').doc(matchId).update(update)
      .catch(function(e) { console.error('Presence heartbeat failed:', e); });
  };
  write(); // don't wait a full interval for the first check-in
  presenceTimer = setInterval(write, PRESENCE_INTERVAL_MS);
}

function stopPresenceHeartbeat() {
  if (presenceTimer) { clearInterval(presenceTimer); presenceTimer = null; }
}

// A player about to act as host but not currently recorded as hostUid
// claims the role first — a narrowly-scoped write the security rules
// allow any current player to make (see firestore.rules' onlyClaimedHost),
// so their SUBSEQUENT host-only writes (phase/leaderboard/etc, still gated
// on actually holding hostUid) go through cleanly.
function claimHostIfNeeded(match) {
  if (match.hostUid === me.uid) return Promise.resolve();
  return db.collection('matches').doc(matchId).update({ hostUid: me.uid });
}

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
    enterAfterLogin();
  }).catch(function(err) {
    console.error('Could not load profile:', err);
    // Still playable without a profile doc — just falls back to a generic name.
    me = { uid: user.uid, name: 'Player' };
    enterAfterLogin();
  });
});

// A ?matchId= in the URL means we were sent here by something that already
// knows which match to play (currently: Tournament pairings, see
// tournament.js). It skips the entry/join screens entirely. If we're not
// already a player in that match and it's still in its lobby, we join it
// automatically — this one branch covers both the tournament pairing's
// "creator" (already a player, just resuming) and its "joiner" (not yet a
// player) without needing a separate flag for which one we are.
function enterAfterLogin() {
  var deepLinkMatchId = new URLSearchParams(window.location.search).get('matchId');
  if (!deepLinkMatchId) {
    showScreen('pickerScreen');
    return;
  }

  db.collection('matches').doc(deepLinkMatchId).get().then(function(doc) {
    if (!doc.exists) {
      matchId = deepLinkMatchId;
      listenToMatch(); // lets render() show the normal "no longer exists" message
      return;
    }

    var data = doc.data();
    var alreadyIn = data.players && data.players[me.uid];

    if (!alreadyIn && data.status === 'lobby') {
      joinRoomByCode(deepLinkMatchId)
        .then(function() { listenToMatch(); })
        .catch(function(err) {
          console.error('Auto-join via deep link failed:', err);
          matchId = deepLinkMatchId;
          listenToMatch(); // let render() surface whatever's actually wrong
        });
    } else {
      matchId = deepLinkMatchId;
      listenToMatch();
    }
  }).catch(function(err) {
    console.error('Deep-link match lookup failed:', err);
    showScreen('entryScreen');
  });
}

// =====================================================================
// SCREENS
// =====================================================================
var ALL_SCREENS = [
  'loadingScreen', 'loginGateScreen', 'pickerScreen', 'entryScreen', 'joinScreen',
  'lobbyScreen', 'questionScreen', 'standingsScreen', 'finalScreen',
  'abortScreen', 'eliminatedScreen'
];

// ===== BATTLE PICKER — "what do you want to play?" =====
// Wordle/Ranking are entirely different games with their own dedicated
// engines (see wordle-multiplayer.js / ranking-multiplayer.js) — picking
// either just leaves this page. Everything else stays a quiz battle here,
// with chosenCategory/chosenMode read by createRoom()/findPublicMatch().
function pickBattleType(category, mode, label) {
  chosenCategory = category;
  chosenMode = mode;
  var labelEl = document.getElementById('battlePickedLabel');
  if (labelEl) labelEl.textContent = label;
  showScreen('entryScreen');
}

function showPickerScreen() { showScreen('pickerScreen'); }

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
// category: null/'general'/omitted = whole mixed bank (unchanged default).
// Any other value filters to just that category's questions first — falls
// back to the whole bank if that category somehow doesn't have enough
// questions to fill a match, rather than erroring.
function pickQuestionIndexes(category) {
  var all = [];
  if (category && category !== 'general') {
    for (var i = 0; i < questionBank.length; i++) {
      if (questionBank[i].category === category) all.push(i);
    }
    if (all.length < QUESTIONS_PER_MATCH) all = [];
  }
  if (all.length === 0) {
    for (var i2 = 0; i2 < questionBank.length; i2++) all.push(i2);
  }

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
// roomType controls how the room behaves, layered on top of the same
// lobby/question/scoring engine every room type shares:
//   'private' — Battle Friends. 10 max, manual host start. (default)
//   'duel'    — 1v1. 2 max, starts itself the instant the 2nd player joins.
//   'public'  — matchmaking. 10 max, isPublic so findPublicMatch() can find
//               it; manual host start (there's no guarantee a 2nd stranger
//               shows up immediately, so it waits like a private room).
function createRoom(roomType, mode, attempt) {
  if (!me) return;
  roomType = roomType || 'private';
  mode = mode || chosenMode || 'classic';
  attempt = attempt || 1;

  // 'public' rooms are usually created as a fallback from inside
  // findPublicMatch(), which already owns the findMatchBtn's state — so
  // only 'private'/'duel'/'speed'/'elimination' touch a button here.
  var btn = null;
  if (roomType === 'duel') btn = document.getElementById('duelBtn');
  else if (mode === 'speed') btn = document.getElementById('speedModeBtn');
  else if (mode === 'elimination') btn = document.getElementById('eliminationModeBtn');
  else if (roomType === 'private') btn = document.getElementById('createRoomBtn');

  if (attempt === 1 && btn) {
    btn.disabled = true;
    btn.textContent = 'Creating…';
  }

  var code = generateRoomCode();
  var ref = db.collection('matches').doc(code);
  var maxPlayers = (roomType === 'duel') ? DUEL_MAX_PLAYERS : MAX_PLAYERS;

  ref.get()
    .then(function(existing) {
      if (existing.exists) {
        // 31^6 is about 887 million codes, so this is vanishingly rare —
        // but old finished rooms keep their ID, so it isn't impossible.
        if (attempt >= 5) {
          throw new Error('Could not find a free room code. Please try again.');
        }
        createRoom(roomType, mode, attempt + 1);
        return null;
      }

      var players = {};
      players[me.uid] = { name: me.name, joinedAt: Date.now() };

      return ref.set({
        roomCode: code,
        hostUid: me.uid,
        mode: mode,
        roomType: roomType,
        category: chosenCategory || null,
        status: 'lobby',
        phase: 'waiting',
        questionIds: pickQuestionIndexes(chosenCategory),
        currentQuestion: -1,
        players: players,
        leaderboard: [],
        eliminated: {},
        isPublic: (roomType === 'public'),
        maxPlayers: maxPlayers,
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
      if (btn) {
        btn.disabled = false;
        btn.textContent = CREATE_BTN_LABELS[btn.id] || 'Create a Room';
      }
      if (roomType === 'public') {
        var findBtn = document.getElementById('findMatchBtn');
        if (findBtn) {
          findBtn.disabled = false;
          findBtn.textContent = '🎲 Find a Random Match';
        }
      }
      alert(explainFirebaseError(err));
    });
}

// =====================================================================
// JOINING A ROOM
// =====================================================================
// The shared join logic — used by both the manual "enter a code" screen
// and public matchmaking. Returns a Promise. On failure it rejects with
// an Error whose .message is one of NOT_FOUND / STARTED / CLOSED / FULL,
// or a raw Firebase error for anything else (permission-denied etc.) so
// callers can still route it through explainFirebaseError().
function joinRoomByCode(code) {
  // The code is the document ID, so this is one direct read — no query,
  // and no composite index needed.
  var ref = db.collection('matches').doc(code);

  return ref.get().then(function(docSnap) {
    if (!docSnap.exists) {
      throw new Error('NOT_FOUND');
    }

    var data = docSnap.data();

    if (data.status !== 'lobby') {
      throw new Error(data.status === 'playing' ? 'STARTED' : 'CLOSED');
    }

    var players = data.players || {};
    var cap = data.maxPlayers || MAX_PLAYERS;

    // Rejoining your own room is always allowed, even if it's full.
    if (!players[me.uid] && Object.keys(players).length >= cap) {
      throw new Error('FULL');
    }

    matchId = code;

    // Dot-path update writes ONLY this player's key, so two people
    // joining at the same moment can't overwrite each other.
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

// =====================================================================
// PUBLIC MATCHMAKING
// =====================================================================
// Looks for an open public lobby (isPublic, still in 'lobby', not full,
// not our own). If one exists, joins it. If not, becomes the host of a
// new public lobby and waits — the next person to hit "Find a Random
// Match" discovers it the same way.
//
// Both filters below are plain equality (==), so this needs no composite
// index — Firestore serves multi-equality queries off the automatic
// per-field indexes. Sorting by createdAt happens client-side instead of
// via orderBy, since combining orderBy with equality filters on other
// fields WOULD need a manual composite index (a real ask for a
// non-technical solo builder to set up in the Firebase console).
function findPublicMatch() {
  if (!me) return;

  var btn = document.getElementById('findMatchBtn');
  btn.disabled = true;
  btn.textContent = 'Searching…';

  db.collection('matches')
    .where('isPublic', '==', true)
    .where('status', '==', 'lobby')
    .get()
    .then(function(snap) {
      var candidates = [];

      snap.forEach(function(doc) {
        var data = doc.data();
        if (data.hostUid === me.uid) return;

        // Match on the same content, not just any open public lobby —
        // client-side filter (not a query .where()) so this stays a plain
        // 2-filter query needing no composite index, same reasoning as
        // the existing isPublic/status filters above.
        if ((data.mode || 'classic') !== chosenMode) return;
        if ((data.category || null) !== (chosenCategory || null)) return;

        var players = data.players || {};
        if (players[me.uid]) return;

        var cap = data.maxPlayers || MAX_PLAYERS;
        if (Object.keys(players).length >= cap) return;

        candidates.push({
          code: doc.id,
          createdAtMs: (data.createdAt && data.createdAt.toMillis) ? data.createdAt.toMillis() : 0
        });
      });

      if (candidates.length === 0) {
        // Nobody waiting right now — start a public lobby of our own.
        createRoom('public');
        return;
      }

      candidates.sort(function(a, b) { return a.createdAtMs - b.createdAtMs; });

      return joinRoomByCode(candidates[0].code)
        .then(function() {
          listenToMatch();
        })
        .catch(function(err) {
          // Someone else joined that exact lobby a moment before us (or the
          // host just left it) — don't show an error for a normal race,
          // just fall back to starting our own lobby instead.
          var lostRace = (err.message === 'FULL' || err.message === 'STARTED' ||
                          err.message === 'CLOSED' || err.message === 'NOT_FOUND');
          if (lostRace) {
            createRoom('public');
            return;
          }
          throw err;
        });
    })
    .catch(function(err) {
      console.error('Matchmaking search failed:', err);
      btn.disabled = false;
      btn.textContent = '🎲 Find a Random Match';
      alert(explainFirebaseError(err));
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
  duelAutoStartFired = false; // this is a freshly entered room, not the last one

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
  activeMatchMode = match.mode || 'classic';

  // Presence + host migration only matter once a match is actually in
  // progress — a lobby has no clock running to hand off, and a finished
  // match has nothing left to drive.
  if (match.status === 'playing') {
    startPresenceHeartbeat();
    maybeActAsHost(match);
  } else {
    stopPresenceHeartbeat();
    if (isDrivingHost) { clearHostTimeouts(); isDrivingHost = false; hostDrivingKey = ''; }
  }

  // A player who was removed (or whose host ended the room WHILE STILL IN
  // THE LOBBY — an in-progress match no longer does this, see leaveRoom())
  // gets told why.
  if (match.status === 'aborted') {
    endWithMessage(match.abortReason || 'The host ended the match.');
    return;
  }

  if (match.status === 'lobby') {
    renderLobby(match);
    return;
  }

  if (match.status === 'playing') {
    // Last One Standing: once you're out, you stop seeing questions — you
    // just watch the player count shrink until the match ends.
    if (isEliminated(match, me.uid)) {
      renderEliminatedWaiting(match);
      return;
    }
    renderPlaying(match);
    return;
  }

  if (match.status === 'finished') {
    renderFinal(match);
    return;
  }
}

function isEliminated(match, uid) {
  return !!(match.mode === 'elimination' && match.eliminated &&
    Object.prototype.hasOwnProperty.call(match.eliminated, uid));
}

function renderEliminatedWaiting(match) {
  showScreen('eliminatedScreen');
  clearInterval(localTimer);

  var total = Object.keys(match.players || {}).length;
  var stillIn = total - Object.keys(match.eliminated || {}).length;
  var outAtQ = match.eliminated[me.uid];

  document.getElementById('eliminatedRoundNote').textContent =
    'Out after Question ' + (outAtQ + 1) + '.';
  document.getElementById('eliminatedRemaining').textContent =
    stillIn + ' of ' + total + ' player' + (total === 1 ? '' : 's') + ' still battling…';
}

// =====================================================================
// LOBBY
// =====================================================================
function renderLobby(match) {
  showScreen('lobbyScreen');

  document.getElementById('roomCodeDisplay').textContent = match.roomCode;

  var modeBadge = document.getElementById('modeBadge');
  if (match.mode === 'speed') {
    modeBadge.textContent = '⚡ Speed Mode — 5 seconds per question, faster = more points';
    modeBadge.style.display = 'block';
  } else if (match.mode === 'elimination') {
    modeBadge.textContent = '💀 Last One Standing — lowest score is out after every question';
    modeBadge.style.display = 'block';
  } else {
    modeBadge.style.display = 'none';
  }

  var players = match.players || {};
  var uids = Object.keys(players);
  var cap = match.maxPlayers || MAX_PLAYERS;

  // Stable order — whoever joined first sits at the top, so the list
  // doesn't jump around as people arrive.
  uids.sort(function(a, b) {
    return (players[a].joinedAt || 0) - (players[b].joinedAt || 0);
  });

  document.getElementById('playerCount').textContent =
    '(' + uids.length + '/' + cap + ')';

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
  var isDuel = (match.roomType === 'duel');
  var isPublicLobby = (match.roomType === 'public');
  var minPlayers = (match.mode === 'elimination') ? ELIMINATION_MIN_PLAYERS : 2;

  // Duels start themselves the instant the 2nd player joins — there's
  // nothing to wait on beyond that, so there's no Start button at all.
  if (isDuel && isHost && uids.length >= cap && !duelAutoStartFired) {
    duelAutoStartFired = true;
    startBtn.style.display = 'none';
    note.textContent = 'Opponent joined — starting the duel…';
    startMatch();
    return;
  }

  if (isHost) {
    if (isDuel) {
      startBtn.style.display = 'none';
      note.textContent = 'Waiting for an opponent to join with the code…';
    } else if (uids.length < minPlayers) {
      startBtn.style.display = 'block';
      startBtn.disabled = true;
      startBtn.textContent = 'Waiting for players…';
      note.textContent = isPublicLobby
        ? 'Waiting for opponents to join — anyone can find this match.'
        : ('Share the code above — you need at least ' + minPlayers + ' players.');
    } else {
      startBtn.style.display = 'block';
      startBtn.disabled = false;
      startBtn.textContent = 'Start Match (' + uids.length + ' players)';
      note.textContent = 'Everyone in? Start when ready.';
    }
  } else {
    startBtn.style.display = 'none';
    note.textContent = isDuel ? 'Waiting for the duel to start…' : 'Waiting for the host to start…';
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
    var match = doc.data();

    // A live match keeps going without you: you're marked left (which also
    // hands hosting duties to someone else if that was you — see
    // effectiveHostUid/HOST MIGRATION above), everyone else's game is
    // untouched. Leaving a still-in-lobby room is unchanged — there's
    // nothing running yet to hand off, so the host leaving pre-start still
    // just ends the room.
    if (match.status === 'playing') {
      var liveUpdate = {};
      liveUpdate['leftPlayers.' + me.uid] = true;
      liveUpdate['presence.' + me.uid] = firebase.firestore.FieldValue.delete();
      return ref.update(liveUpdate);
    }

    if (match.hostUid === me.uid) {
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
    phaseAt: firebase.firestore.FieldValue.serverTimestamp(),
    currentQuestion: 0,
    leaderboard: []
  }).catch(function(err) {
    console.error('Start failed:', err);
    btn.disabled = false;
    btn.textContent = 'Start Match';
  });
  // No direct scheduling call here — the snapshot this write triggers
  // flows through render() -> maybeActAsHost() -> driveHostPhase() just
  // like every later phase transition does, including ones driven by a
  // host who took over mid-match. One mechanism for both "starting" and
  // "migrating," not two.
}

// Called on every snapshot. Decides whether THIS browser should currently
// be running the phase clock, and (re)schedules the ONE next transition if
// so — never all three at once like the old design, because a migrated
// host needs to pick up wherever the match actually is, not restart from
// the top. Each transition write's own resulting snapshot re-triggers this
// and schedules the next one, so the whole match self-heals continuously
// rather than depending on one client's timeout chain surviving start to
// finish.
function maybeActAsHost(match) {
  if (!me || !matchId) return;

  var iAmEffectiveHost = (effectiveHostUid(match, Date.now()) === me.uid);

  if (!iAmEffectiveHost || match.status !== 'playing') {
    if (isDrivingHost) { clearHostTimeouts(); isDrivingHost = false; hostDrivingKey = ''; }
    return;
  }

  var key = match.currentQuestion + ':' + match.phase;
  if (isDrivingHost && hostDrivingKey === key) return; // already scheduled for this exact state

  clearHostTimeouts();
  isDrivingHost = true;
  hostDrivingKey = key;

  claimHostIfNeeded(match).then(function() {
    driveHostPhase(match);
  }).catch(function(err) {
    console.error('Claiming host failed:', err);
    isDrivingHost = false;
    hostDrivingKey = '';
  });
}

// Schedules exactly the next transition, timed off `phaseAt` rather than
// "however long it's been since I personally last ran" — this is what
// makes it safe for a newly-promoted host to pick up mid-phase instead of
// unfairly giving players a fresh full countdown.
function driveHostPhase(match) {
  var phaseAtMs = (match.phaseAt && match.phaseAt.toMillis) ? match.phaseAt.toMillis() : Date.now();
  var elapsed = Math.max(0, Date.now() - phaseAtMs);
  var qIndex = match.currentQuestion;

  if (match.phase === 'answering') {
    var remaining = Math.max(0, secondsForMode() * 1000 - elapsed);
    hostTimeouts.push(setTimeout(function() { aggregateAndReveal(qIndex); }, remaining));
  } else if (match.phase === 'reveal') {
    var remaining2 = Math.max(0, REVEAL_MS - elapsed);
    hostTimeouts.push(setTimeout(function() {
      db.collection('matches').doc(matchId).update({
        phase: 'standings',
        phaseAt: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function(e) { console.error('Standings write failed:', e); });
    }, remaining2));
  } else if (match.phase === 'standings') {
    var remaining3 = Math.max(0, STANDINGS_MS - elapsed);
    hostTimeouts.push(setTimeout(function() { advanceAfterStandings(qIndex); }, remaining3));
  }
}

// Either the next question, or the end of the match. Last One Standing can
// end early — the moment only one player is still standing, there's no
// point asking the remaining questions.
function advanceAfterStandings(qIndex) {
  var next = qIndex + 1;
  var matchRef = db.collection('matches').doc(matchId);

  matchRef.get().then(function(doc) {
    var match = doc.data();
    if (!match) return;

    var outOfQuestions = (next >= QUESTIONS_PER_MATCH);
    var oneStandingLeft = (match.mode === 'elimination' && countActivePlayers(match) <= 1);

    if (outOfQuestions || oneStandingLeft) {
      return matchRef.update({ status: 'finished', phase: 'done' });
    }
    return matchRef.update({
      currentQuestion: next,
      phase: 'answering',
      phaseAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).catch(function(e) { console.error('Next-phase write failed:', e); });
}

// A "left" player counts the same as an eliminated one for "how many are
// still standing" — otherwise Last One Standing could sit waiting forever
// on someone who's already gone.
function countActivePlayers(match) {
  var total = Object.keys(match.players || {}).length;
  var eliminated = match.eliminated || {};
  var leftPlayers = match.leftPlayers || {};
  var goneUids = {};
  Object.keys(eliminated).forEach(function(uid) { goneUids[uid] = true; });
  Object.keys(leftPlayers).forEach(function(uid) { goneUids[uid] = true; });
  return total - Object.keys(goneUids).length;
}

// PURE scoring. No Firestore, no DOM — just (previous standings + this
// question's answers) -> (new standings). Kept separate on purpose:
//   - it is the one piece of real game logic here, so it should be
//     testable without a database
//   - under Option B (see CLAUDE.md) this is precisely the function that
//     moves onto the server, so the seam is already cut
// Classic Mode scores every correct answer flat. Speed Mode scores it on a
// sliding scale using the `timeTaken` field every answer already carries
// (captured for every mode, used only by this one) — instant answers score
// SPEED_MAX_POINTS, an answer at the very last moment still scores the
// SPEED_MIN_POINTS floor, so slower players are never shut out entirely.
function pointsForAnswer(match, answer) {
  if (!answer.isCorrect) return 0;
  if (match.mode !== 'speed') return POINTS_PER_CORRECT;

  var seconds = SPEED_SECONDS_PER_QUESTION;
  var taken = Math.min(Math.max(answer.timeTaken || 0, 0), seconds);
  var speedFraction = 1 - (taken / seconds); // 1 = instant, 0 = used the whole clock
  return Math.round(SPEED_MIN_POINTS + (SPEED_MAX_POINTS - SPEED_MIN_POINTS) * speedFraction);
}

// `answers` is a plain array of { uid, isCorrect, timeTaken }.
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
      scoreByUid[a.uid].score += pointsForAnswer(match, a);
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

// PURE, same reasoning as computeLeaderboard above — no Firestore/DOM.
// Last One Standing's rule: anyone still active who got this question wrong
// (or never answered) is "at risk." Among the at-risk, the one with the
// lowest cumulative score goes home — exactly one elimination per question,
// and never down to zero players (a round where everyone gets it right
// eliminates nobody). `leaderboard` is already this question's freshly
// scored, score-descending list, so the last at-risk entry in that order
// is always the lowest-scoring one.
function computeEliminations(match, leaderboard, answers, qIndex) {
  var eliminated = Object.assign({}, match.eliminated || {});

  // A player who explicitly left (or whose presence went stale) is folded
  // into `eliminated` here too, so every downstream consumer of that one
  // field (countActivePlayers, the "still standing" count, the final
  // board's ordering) already handles them uniformly with no separate
  // leftPlayers check needed anywhere else in Last One Standing.
  var leftPlayers = match.leftPlayers || {};
  Object.keys(leftPlayers).forEach(function(uid) {
    if (!Object.prototype.hasOwnProperty.call(eliminated, uid)) eliminated[uid] = qIndex;
  });

  var active = leaderboard.filter(function(e) {
    return !Object.prototype.hasOwnProperty.call(eliminated, e.uid);
  });
  if (active.length <= 1) return eliminated; // already down to a winner

  var correctUids = {};
  answers.forEach(function(a) { if (a.isCorrect) correctUids[a.uid] = true; });

  var atRisk = active.filter(function(e) {
    return !Object.prototype.hasOwnProperty.call(correctUids, e.uid);
  });
  if (atRisk.length === 0) return eliminated; // everyone active survived this round

  var goingHome = atRisk[atRisk.length - 1];
  eliminated[goingHome.uid] = qIndex;
  return eliminated;
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

    var leaderboard = computeLeaderboard(match, answers);
    var update = {
      phase: 'reveal',
      phaseAt: firebase.firestore.FieldValue.serverTimestamp(),
      leaderboard: leaderboard,
      answeredCount: answers.length
    };

    if (match.mode === 'elimination') {
      update.eliminated = computeEliminations(match, leaderboard, answers, qIndex);
    }

    return matchRef.update(update);
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

  var modeTagEl = document.getElementById('modeTag');
  if (match.mode === 'speed') {
    modeTagEl.textContent = '⚡ Speed';
    modeTagEl.style.display = 'inline-block';
  } else if (match.mode === 'elimination') {
    modeTagEl.textContent = '💀 Last One Standing';
    modeTagEl.style.display = 'inline-block';
  } else {
    modeTagEl.style.display = 'none';
  }

  startLocalCountdown();
}

// Purely visual. The host's write is what actually ends the question —
// this just shows the player how long they have left. Mode-aware, since
// Speed Mode runs a shorter clock than Classic/Last One Standing.
function startLocalCountdown() {
  clearInterval(localTimer);

  var timeLeft = secondsForMode();
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

  drawLeaderboard('standingsList', match.leaderboard || [], match.leftPlayers || {});

  var isLast = ((match.currentQuestion + 1) >= QUESTIONS_PER_MATCH) ||
    (match.mode === 'elimination' && countActivePlayers(match) <= 1);
  document.getElementById('nextQuestionNote').textContent =
    isLast ? 'Final results coming up…' : 'Next question coming up…';
}

// Last One Standing's own board order: still-active players always rank
// above eliminated ones (there's normally exactly one active player left —
// the winner — by the time the match ends), and among the eliminated, the
// one knocked out last ranks higher than one knocked out earlier.
function eliminationOrderedBoard(match) {
  var board = (match.leaderboard || []).slice();
  var eliminated = match.eliminated || {};

  board.sort(function(a, b) {
    var aOut = Object.prototype.hasOwnProperty.call(eliminated, a.uid);
    var bOut = Object.prototype.hasOwnProperty.call(eliminated, b.uid);
    if (aOut !== bOut) return aOut ? 1 : -1;
    if (!aOut) return b.score - a.score;
    return eliminated[b.uid] - eliminated[a.uid];
  });

  return board;
}

function renderFinal(match) {
  clearInterval(localTimer);
  clearHostTimeouts();
  showScreen('finalScreen');

  var isElimination = (match.mode === 'elimination');
  var board = isElimination ? eliminationOrderedBoard(match) : (match.leaderboard || []);
  drawLeaderboard('finalList', board, match.leftPlayers || {});

  var myEntry = null;
  var myRank = 0;
  for (var i = 0; i < board.length; i++) {
    if (board[i].uid === me.uid) { myEntry = board[i]; myRank = i + 1; }
  }

  var emojiEl = document.getElementById('finalEmoji');
  var titleEl = document.getElementById('finalTitle');
  var subEl = document.getElementById('finalSub');

  // Duels get head-to-head framing ("You beat X!") instead of a rank
  // number, since #1/#2 reads oddly when there are only ever 2 players.
  var isDuel = (match.roomType === 'duel' && board.length === 2);
  var opponent = isDuel ? board.filter(function(e) { return e.uid !== me.uid; })[0] : null;

  if (isDuel && myEntry && opponent) {
    var scoreLine = myEntry.correct + ' of ' + QUESTIONS_PER_MATCH +
      ' correct · ' + myEntry.score + ' points';

    if (myEntry.score > opponent.score) {
      emojiEl.textContent = '🏆';
      titleEl.textContent = 'You beat ' + opponent.name + '!';
      subEl.textContent = scoreLine;
    } else if (myEntry.score < opponent.score) {
      emojiEl.textContent = '🏏';
      titleEl.textContent = opponent.name + ' won this one';
      subEl.textContent = scoreLine;
    } else {
      emojiEl.textContent = '🤝';
      titleEl.textContent = "It's a tie!";
      subEl.textContent = scoreLine;
    }
  } else if (!myEntry) {
    emojiEl.textContent = '🏏';
    titleEl.textContent = 'Match Over';
    subEl.textContent = '';
  } else if (myRank === 1) {
    emojiEl.textContent = '🏆';
    titleEl.textContent = isElimination ? 'You survived — you won!' : 'You won!';
    subEl.textContent = myEntry.correct + ' of ' + QUESTIONS_PER_MATCH +
      ' correct · ' + myEntry.score + ' points';
  } else {
    var eliminatedAtQ = (isElimination && match.eliminated) ? match.eliminated[me.uid] : undefined;
    emojiEl.textContent = isElimination ? '💀' : (myRank === 2 ? '🥈' : (myRank === 3 ? '🥉' : '🏏'));
    titleEl.textContent = isElimination ? 'Eliminated — finished #' + myRank : 'You finished #' + myRank;
    subEl.textContent = myEntry.correct + ' of ' + QUESTIONS_PER_MATCH +
      ' correct · ' + myEntry.score + ' points' +
      (eliminatedAtQ !== undefined ? ' · out after Q' + (eliminatedAtQ + 1) : '');
  }

  // A tournament pairing carries the tournament's own code so the loser
  // and winner both have a real way back to the bracket — tournament.js's
  // own "resume my tournament" localStorage check handles getting them
  // straight back into the live view rather than the entry screen.
  document.getElementById('backToTournamentBtn').style.display = match.tournamentId ? 'block' : 'none';

  saveMatchResult(myEntry, myRank, board.length);
  teardownListenerOnly();
}

function drawLeaderboard(elementId, board, leftPlayers) {
  var el = document.getElementById(elementId);
  el.innerHTML = '';
  leftPlayers = leftPlayers || {};

  board.forEach(function(entry, i) {
    var row = document.createElement('div');
    row.className = 'mp-lb-row' + (entry.uid === me.uid ? ' mp-is-me' : '');

    var rank = document.createElement('div');
    rank.className = 'mp-lb-rank';
    rank.textContent = '#' + (i + 1);

    var name = document.createElement('div');
    name.className = 'mp-lb-name';
    name.textContent = entry.name || 'Player'; // textContent — user-supplied

    if (Object.prototype.hasOwnProperty.call(leftPlayers, entry.uid)) {
      var leftTag = document.createElement('span');
      leftTag.className = 'mp-left-badge';
      leftTag.textContent = 'left';
      name.appendChild(leftTag);
    }

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
  stopPresenceHeartbeat();
  isDrivingHost = false;
  hostDrivingKey = '';
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

// Best-effort: not guaranteed to land (browsers cut network on unload) —
// but when it does, it's now a graceful "mark yourself left" rather than
// the old "kill the whole match" behavior. If a genuine crash means this
// never fires at all, the presence heartbeat's staleness timeout is the
// real safety net (see HOST MIGRATION above) — this handler is purely a
// faster path for the common case of an actual clean tab close.
window.addEventListener('beforeunload', function() {
  if (!matchId || !me || isLeaving) return;
  db.collection('matches').doc(matchId).get().then(function(doc) {
    if (!doc.exists) return;
    var match = doc.data();

    if (match.status === 'playing') {
      var update = {};
      update['leftPlayers.' + me.uid] = true;
      update['presence.' + me.uid] = firebase.firestore.FieldValue.delete();
      db.collection('matches').doc(matchId).update(update);
      return;
    }

    if (match.hostUid === me.uid && match.status !== 'finished') {
      db.collection('matches').doc(matchId).update({
        status: 'aborted',
        abortReason: 'The host left the room.'
      });
    }
  });
});
