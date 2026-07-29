// ===== CRICTAKKAR TOURNAMENTS — KNOCKOUT BRACKETS =====
//
// ARCHITECTURE: no new game engine. Every bracket pairing is just a normal
// 1v1 duel in the EXISTING /matches collection (see multiplayer.js) — this
// file only manages the bracket shape (who plays whom, who advances) and
// hands the actual quiz-playing off to multiplayer.html.
//
// The trick that keeps this simple: each pairing's match ID is DETERMINISTIC
// — "{tournamentCode}-R{round}-S{slot}" — so both paired players (and the
// tournament host) can independently compute it. Nobody ever has to
// generate a random code and write it somewhere for the other player to
// read. Whichever of the two players has the lexicographically smaller uid
// creates that match (so its `hostUid` always equals its actual creator,
// satisfying the existing matches security rule unchanged); the other
// player just joins it, exactly like a manual duel.
//
// The TOURNAMENT HOST's browser is the bracket's authority, same role a
// match host plays for a single match: it watches the current round's
// pairing matches for a winner, writes results into the tournament doc,
// and advances to the next round once every pairing in the round is
// decided. This means the host needs to keep this tab open for the whole
// tournament — same accepted limitation as a match host leaving mid-match.

// ===== CONFIG =====
var QUESTIONS_PER_MATCH = 10;
var BRACKET_SIZES = [4, 8, 16];
var TCODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no O/0, I/1/L lookalikes

// ===== STATE =====
var me = null;
var tournamentId = null;         // = tournamentCode = the doc ID
var tournamentUnsub = null;
var isLeaving = false;
var watchersForRound = -1;       // which round attachRoundWatchers() last ran for
var matchWatchUnsubs = [];       // this round's per-pairing match listeners
var advancedPastRound = -1;      // guards against writing the same round-advance twice
var myPendingWaitUnsub = null;   // joiner-side "wait for opponent to create the match" listener
var myCurrentPairingInfo = null; // { matchId, opponentUid, opponentName, amCreator } for the Play button

// =====================================================================
// BOOT
// =====================================================================
var RESUME_KEY = 'ct_activeTournament';

auth.onAuthStateChanged(function(user) {
  if (!user) {
    showScreen('loginGateScreen');
    return;
  }

  db.collection('users').doc(user.uid).get().then(function(doc) {
    var data = doc.exists ? doc.data() : {};
    me = { uid: user.uid, name: data.username || data.name || 'Player' };
    enterAfterLogin();
  }).catch(function(err) {
    console.error('Could not load profile:', err);
    me = { uid: user.uid, name: 'Player' };
    enterAfterLogin();
  });
});

// A tournament runs across multiple page visits — the player leaves this
// page to actually play each bracket match, then comes back. Remembering
// the last tournament we were in means a refresh (or the return trip from
// multiplayer.html) drops them straight back into the live bracket instead
// of a dead end at the entry screen.
function enterAfterLogin() {
  var saved = localStorage.getItem(RESUME_KEY);
  if (!saved) {
    showScreen('entryScreen');
    return;
  }

  joinTournamentByCode(saved)
    .then(function() { listenToTournament(); })
    .catch(function() {
      localStorage.removeItem(RESUME_KEY);
      showScreen('entryScreen');
    });
}

// =====================================================================
// SCREENS
// =====================================================================
var ALL_SCREENS = [
  'loadingScreen', 'loginGateScreen', 'entryScreen', 'joinScreen',
  'lobbyScreen', 'bracketScreen', 'finalScreen', 'abortScreen'
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
// PURE HELPERS (no Firestore/DOM — the same reasoning as multiplayer.js's
// computeLeaderboard: this is bracket logic, testable on its own)
// =====================================================================
function matchIdForSlot(tournamentCode, round, slot) {
  return tournamentCode + '-R' + round + '-S' + slot;
}

// Deterministic so both paired players agree on who creates the match
// without any coordination — whoever's uid sorts first.
function pickCreatorUid(uidA, uidB) {
  return (uidA < uidB) ? uidA : uidB;
}

function roundLabel(totalRounds, round, numSlots) {
  var fromEnd = totalRounds - 1 - round;
  if (fromEnd === 0) return 'Final';
  if (fromEnd === 1) return 'Semifinal';
  if (fromEnd === 2) return 'Quarterfinal';
  return 'Round of ' + (numSlots * 2);
}

function numSlotsInRound(bracketSize, round) {
  return bracketSize / Math.pow(2, round + 1);
}

// Builds the full bracket shape up front — every round's slots, not just
// round 0 — so the bracket view can show the whole shape from the start
// ("Quarterfinal → Semifinal → Final") with TBD slots filling in as rounds
// resolve, rather than only revealing one round at a time.
function buildInitialBracket(seeds, bracketSize, totalRounds) {
  var bracket = {};

  for (var slot = 0; slot < bracketSize / 2; slot++) {
    bracket['r0_s' + slot] = {
      player1Uid: seeds[slot * 2],
      player2Uid: seeds[slot * 2 + 1],
      winnerUid: null
    };
  }

  for (var round = 1; round < totalRounds; round++) {
    var slots = numSlotsInRound(bracketSize, round);
    for (var s = 0; s < slots; s++) {
      bracket['r' + round + '_s' + s] = { player1Uid: null, player2Uid: null, winnerUid: null };
    }
  }

  return bracket;
}

// Given a fully-resolved round, computes the next round's pairings —
// winner of slot 2i plays winner of slot 2i+1. Pure: returns the update
// object to write, doesn't touch Firestore itself.
function nextRoundPairings(bracket, round, numSlotsThisRound) {
  var updates = {};
  var nextRound = round + 1;

  for (var i = 0; i < numSlotsThisRound / 2; i++) {
    var a = bracket['r' + round + '_s' + (i * 2)];
    var b = bracket['r' + round + '_s' + (i * 2 + 1)];
    updates['bracket.r' + nextRound + '_s' + i + '.player1Uid'] = a.winnerUid;
    updates['bracket.r' + nextRound + '_s' + i + '.player2Uid'] = b.winnerUid;
  }

  return updates;
}

function isRoundComplete(bracket, round, numSlotsThisRound) {
  for (var i = 0; i < numSlotsThisRound; i++) {
    var entry = bracket['r' + round + '_s' + i];
    if (!entry || !entry.winnerUid) return false;
  }
  return true;
}

function pickQuestionIndexes() {
  var all = [];
  for (var i = 0; i < questionBank.length; i++) all.push(i);
  for (var j = all.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = all[j]; all[j] = all[k]; all[k] = tmp;
  }
  return all.slice(0, QUESTIONS_PER_MATCH);
}

// =====================================================================
// CREATING / JOINING A TOURNAMENT
// =====================================================================
function generateTournamentCode() {
  var code = '';
  for (var i = 0; i < 6; i++) {
    code += TCODE_CHARS.charAt(Math.floor(Math.random() * TCODE_CHARS.length));
  }
  return code;
}

function createTournament(bracketSize, attempt) {
  if (!me) return;
  attempt = attempt || 1;

  var btn = document.getElementById('sizeBtn' + bracketSize);
  if (attempt === 1) {
    BRACKET_SIZES.forEach(function(size) {
      var b = document.getElementById('sizeBtn' + size);
      if (b) b.disabled = true;
    });
    if (btn) btn.textContent = '…';
  }

  var code = generateTournamentCode();
  var ref = db.collection('tournaments').doc(code);

  ref.get().then(function(existing) {
    if (existing.exists) {
      if (attempt >= 5) throw new Error('Could not find a free tournament code. Please try again.');
      createTournament(bracketSize, attempt + 1);
      return null;
    }

    var players = {};
    players[me.uid] = { name: me.name, joinedAt: Date.now() };

    return ref.set({
      tournamentCode: code,
      hostUid: me.uid,
      type: 'knockout',
      status: 'lobby',
      bracketSize: bracketSize,
      totalRounds: Math.log2(bracketSize),
      players: players,
      bracket: {},
      currentRound: 0,
      championUid: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).then(function(written) {
    if (written === null) return;
    tournamentId = code;
    listenToTournament();
  }).catch(function(err) {
    console.error('Create tournament failed:', err);
    BRACKET_SIZES.forEach(function(size) {
      var b = document.getElementById('sizeBtn' + size);
      if (b) { b.disabled = false; b.innerHTML = size + '<br/><span>players</span>'; }
    });
    alert(explainFirebaseError(err));
  });
}

// Also doubles as "resume my tournament" — a player already in this
// tournament (rejoining after a refresh, or after finishing a bracket
// match and coming back) is let straight in with no write at all, even
// if the tournament has already started or finished.
function joinTournamentByCode(code) {
  var ref = db.collection('tournaments').doc(code);

  return ref.get().then(function(docSnap) {
    if (!docSnap.exists) throw new Error('NOT_FOUND');
    var data = docSnap.data();
    var players = data.players || {};

    tournamentId = code;
    if (players[me.uid]) return null; // already in — just resuming

    if (data.status !== 'lobby') {
      throw new Error(data.status === 'playing' ? 'STARTED' : 'CLOSED');
    }
    if (Object.keys(players).length >= data.bracketSize) {
      throw new Error('FULL');
    }

    var update = {};
    update['players.' + me.uid] = { name: me.name, joinedAt: Date.now() };
    return ref.update(update);
  });
}

function joinTournament() {
  if (!me) return;

  var input = document.getElementById('joinCodeInput');
  var errorEl = document.getElementById('joinError');
  var code = (input.value || '').trim().toUpperCase();

  if (code.length !== 6) {
    errorEl.textContent = 'A tournament code is 6 characters.';
    return;
  }

  var btn = document.getElementById('joinTournamentBtn');
  btn.disabled = true;
  btn.textContent = 'Joining…';
  errorEl.textContent = '';

  joinTournamentByCode(code)
    .then(function() { listenToTournament(); })
    .catch(function(err) {
      btn.disabled = false;
      btn.textContent = 'Join Tournament';

      if (err.message === 'NOT_FOUND') {
        errorEl.textContent = 'No tournament with that code. Double-check the 6 characters.';
      } else if (err.message === 'STARTED') {
        errorEl.textContent = 'That tournament has already started.';
      } else if (err.message === 'CLOSED') {
        errorEl.textContent = 'That tournament is already finished.';
      } else if (err.message === 'FULL') {
        errorEl.textContent = 'That bracket is already full.';
      } else {
        console.error('Join failed:', err);
        errorEl.textContent = explainFirebaseError(err);
      }
    });
}

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var joinVisible = document.getElementById('joinScreen').style.display === 'flex';
  if (joinVisible) joinTournament();
});

// =====================================================================
// THE LISTENER THAT DRIVES EVERYTHING
// =====================================================================
function listenToTournament() {
  if (tournamentUnsub) tournamentUnsub();
  localStorage.setItem(RESUME_KEY, tournamentId);

  tournamentUnsub = db.collection('tournaments').doc(tournamentId)
    .onSnapshot(function(doc) {
      if (!doc.exists) {
        endWithMessage('This tournament no longer exists.');
        return;
      }
      var t = doc.data();
      t.tournamentCode = doc.id;
      render(t);
    }, function(err) {
      console.error('Tournament listener error:', err);
      endWithMessage('Lost connection to the tournament.');
    });
}

function render(t) {
  if (t.status === 'aborted') {
    endWithMessage(t.abortReason || 'The organiser ended the tournament.');
    return;
  }

  if (t.status === 'lobby') {
    renderLobby(t);
    return;
  }
  if (t.status === 'playing') {
    renderBracket(t);
    if (t.hostUid === me.uid) hostWatchCurrentRound(t);
    return;
  }
  if (t.status === 'finished') {
    renderFinal(t);
    return;
  }
}

// =====================================================================
// LOBBY
// =====================================================================
function renderLobby(t) {
  showScreen('lobbyScreen');
  document.getElementById('tournamentCodeDisplay').textContent = t.tournamentCode;

  var badge = document.getElementById('tnSizeBadge');
  badge.textContent = '🏆 ' + t.bracketSize + '-player knockout bracket';
  badge.style.display = 'block';

  var players = t.players || {};
  var uids = Object.keys(players);

  uids.sort(function(a, b) { return (players[a].joinedAt || 0) - (players[b].joinedAt || 0); });

  document.getElementById('tnPlayerCount').textContent = '(' + uids.length + '/' + t.bracketSize + ')';

  var listEl = document.getElementById('tnPlayerList');
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
  var startBtn = document.getElementById('startTournamentBtn');
  var note = document.getElementById('tnWaitingNote');

  if (isHost) {
    startBtn.style.display = 'block';
    if (uids.length < t.bracketSize) {
      startBtn.disabled = true;
      startBtn.textContent = 'Waiting for players…';
      note.textContent = 'Share the code above — needs exactly ' + t.bracketSize + ' players to start.';
    } else {
      startBtn.disabled = false;
      startBtn.textContent = 'Start Tournament (' + uids.length + '/' + t.bracketSize + ')';
      note.textContent = 'Bracket is full — start whenever ready.';
    }
  } else {
    startBtn.style.display = 'none';
    note.textContent = 'Waiting for the organiser to start…';
  }
}

function shareTournamentCode() {
  var code = document.getElementById('tournamentCodeDisplay').textContent;
  var text = "Aao CricTakkar karte hain! 🏏🏆\n\nJoin my cricket quiz tournament — code: " +
             code + "\n\n" + window.location.origin + "/tournament.html";
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

function copyTournamentCode() {
  var code = document.getElementById('tournamentCodeDisplay').textContent;
  var btn = document.getElementById('copyTnCodeBtn');
  navigator.clipboard.writeText(code).then(function() {
    btn.textContent = '✅ Copied!';
    setTimeout(function() { btn.textContent = '📋 Copy Code'; }, 1800);
  }).catch(function() {
    alert('Tournament code: ' + code);
  });
}

function leaveTournament() {
  if (!tournamentId) { showScreen('entryScreen'); return; }

  isLeaving = true;
  var ref = db.collection('tournaments').doc(tournamentId);

  ref.get().then(function(doc) {
    if (!doc.exists) return null;
    var t = doc.data();

    if (t.hostUid === me.uid) {
      if (t.status === 'lobby') {
        return ref.delete(); // nothing worth preserving before it's started
      }
      return ref.update({ status: 'aborted', abortReason: 'The organiser left the tournament.' });
    }

    if (t.status === 'lobby') {
      var update = {};
      update['players.' + me.uid] = firebase.firestore.FieldValue.delete();
      return ref.update(update);
    }
    return null; // mid-tournament: just leave locally, see the header comment on this file
  }).catch(function(err) {
    console.error('Leave failed:', err);
  }).then(function() {
    teardown();
    localStorage.removeItem(RESUME_KEY);
    showScreen('entryScreen');
    tournamentId = null;
    isLeaving = false;
  });
}

// =====================================================================
// STARTING THE TOURNAMENT (host only)
// =====================================================================
function startTournament() {
  var btn = document.getElementById('startTournamentBtn');
  btn.disabled = true;
  btn.textContent = 'Starting…';

  db.collection('tournaments').doc(tournamentId).get().then(function(doc) {
    var t = doc.data();
    var uids = Object.keys(t.players || {});

    // Fisher-Yates — an unbiased shuffle for the seeding order.
    var seeds = uids.slice();
    for (var i = seeds.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = seeds[i]; seeds[i] = seeds[j]; seeds[j] = tmp;
    }

    var totalRounds = Math.log2(t.bracketSize);
    var bracket = buildInitialBracket(seeds, t.bracketSize, totalRounds);

    return db.collection('tournaments').doc(tournamentId).update({
      status: 'playing',
      currentRound: 0,
      bracket: bracket
    });
  }).catch(function(err) {
    console.error('Start tournament failed:', err);
    btn.disabled = false;
    btn.textContent = 'Start Tournament';
    alert(explainFirebaseError(err));
  });
}

// =====================================================================
// LIVE BRACKET VIEW
// =====================================================================
function playerName(t, uid) {
  if (!uid) return null;
  var p = (t.players || {})[uid];
  return p ? p.name : 'Player';
}

function renderBracket(t) {
  showScreen('bracketScreen');

  document.getElementById('bracketTitle').textContent = t.bracketSize + '-Player Knockout';
  document.getElementById('bracketSub').textContent =
    roundLabel(t.totalRounds, t.currentRound, numSlotsInRound(t.bracketSize, t.currentRound)) + ' underway';

  document.getElementById('tnRoundsContainer').innerHTML = buildBracketHTML(t);
  renderMyMatchBox(t);
}

// Shared between the live bracket view and the champion recap.
function buildBracketHTML(t) {
  var html = '';

  for (var round = 0; round < t.totalRounds; round++) {
    var slots = numSlotsInRound(t.bracketSize, round);
    html += '<div class="tn-round-block">';
    html += '<div class="tn-round-heading">' + roundLabel(t.totalRounds, round, slots) + '</div>';

    for (var s = 0; s < slots; s++) {
      var entry = (t.bracket || {})['r' + round + '_s' + s] || {};
      html += '<div class="tn-pairing">';

      if (!entry.player1Uid || !entry.player2Uid) {
        html += '<span class="tn-pairing-tbd">To be decided</span>';
      } else {
        var n1 = escapeHtml(playerName(t, entry.player1Uid));
        var n2 = escapeHtml(playerName(t, entry.player2Uid));
        var c1 = 'tn-pairing-player';
        var c2 = 'tn-pairing-player';
        if (entry.winnerUid === entry.player1Uid) { c1 += ' tn-winner'; c2 += ' tn-loser'; }
        else if (entry.winnerUid === entry.player2Uid) { c2 += ' tn-winner'; c1 += ' tn-loser'; }
        html += '<span class="' + c1 + '">' + n1 + '</span>';
        html += '<span class="tn-pairing-vs">vs</span>';
        html += '<span class="' + c2 + '">' + n2 + '</span>';
      }

      html += '</div>';
    }
    html += '</div>';
  }

  return html;
}

// User-supplied names go through here before ever touching innerHTML.
function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

// Finds whether I'm in an unresolved pairing in the CURRENT round, and if
// so shows the Play button. Hidden once my slot already has a winner
// (either I already played, or I'm not in this round at all).
function renderMyMatchBox(t) {
  var box = document.getElementById('tnMyMatch');
  var slots = numSlotsInRound(t.bracketSize, t.currentRound);

  for (var s = 0; s < slots; s++) {
    var key = 'r' + t.currentRound + '_s' + s;
    var entry = (t.bracket || {})[key];
    if (!entry || entry.winnerUid) continue;
    if (entry.player1Uid !== me.uid && entry.player2Uid !== me.uid) continue;

    var opponentUid = (entry.player1Uid === me.uid) ? entry.player2Uid : entry.player1Uid;
    if (!opponentUid) continue; // waiting on an earlier round to decide my opponent

    var matchId = matchIdForSlot(t.tournamentCode, t.currentRound, s);
    var amCreator = (pickCreatorUid(me.uid, opponentUid) === me.uid);

    myCurrentPairingInfo = {
      matchId: matchId,
      opponentUid: opponentUid,
      opponentName: playerName(t, opponentUid),
      amCreator: amCreator
    };

    document.getElementById('tnMyMatchText').textContent =
      'Your match: you vs ' + myCurrentPairingInfo.opponentName;
    box.style.display = 'block';

    var playBtn = document.getElementById('playMatchBtn');
    playBtn.disabled = false;
    playBtn.textContent = '▶️ Play Your Match';
    return;
  }

  // Not in an active pairing this round — hide the box, and cancel any
  // stale "waiting for my opponent to create the match" listener.
  box.style.display = 'none';
  myCurrentPairingInfo = null;
  if (myPendingWaitUnsub) { myPendingWaitUnsub(); myPendingWaitUnsub = null; }
}

// =====================================================================
// PLAYING MY MATCH
// =====================================================================
function playMyMatch() {
  if (!myCurrentPairingInfo) return;
  var info = myCurrentPairingInfo;
  var playBtn = document.getElementById('playMatchBtn');
  var ref = db.collection('matches').doc(info.matchId);

  if (info.amCreator) {
    ref.get().then(function(doc) {
      if (doc.exists) {
        window.location.href = 'multiplayer.html?matchId=' + info.matchId;
        return;
      }
      var players = {};
      players[me.uid] = { name: me.name, joinedAt: Date.now() };

      return ref.set({
        roomCode: info.matchId,
        hostUid: me.uid,
        mode: 'classic',
        roomType: 'duel',
        status: 'lobby',
        phase: 'waiting',
        questionIds: pickQuestionIndexes(),
        currentQuestion: -1,
        players: players,
        leaderboard: [],
        eliminated: {},
        isPublic: false,
        maxPlayers: 2,
        tournamentId: tournamentId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function() {
        window.location.href = 'multiplayer.html?matchId=' + info.matchId;
      });
    }).catch(function(err) {
      console.error('Could not set up your match:', err);
      alert(explainFirebaseError(err));
    });
    return;
  }

  // Joiner side: the match might not exist yet if I got here before my
  // opponent did — wait for it to appear rather than guessing.
  ref.get().then(function(doc) {
    if (doc.exists) {
      window.location.href = 'multiplayer.html?matchId=' + info.matchId;
      return;
    }

    playBtn.disabled = true;
    playBtn.textContent = 'Waiting for ' + info.opponentName + ' to open the match…';

    if (myPendingWaitUnsub) myPendingWaitUnsub();
    myPendingWaitUnsub = ref.onSnapshot(function(waitDoc) {
      if (waitDoc.exists) {
        if (myPendingWaitUnsub) { myPendingWaitUnsub(); myPendingWaitUnsub = null; }
        window.location.href = 'multiplayer.html?matchId=' + info.matchId;
      }
    });
  }).catch(function(err) {
    console.error('Could not check on your match:', err);
    alert(explainFirebaseError(err));
  });
}

// =====================================================================
// HOST: WATCHING THE CURRENT ROUND, WRITING RESULTS, ADVANCING
// =====================================================================
function hostWatchCurrentRound(t) {
  if (watchersForRound === t.currentRound) return; // already watching this round
  clearMatchWatchers();
  watchersForRound = t.currentRound;

  var slots = numSlotsInRound(t.bracketSize, t.currentRound);

  for (var s = 0; s < slots; s++) {
    (function(slotIndex) {
      var entry = (t.bracket || {})['r' + t.currentRound + '_s' + slotIndex];
      if (!entry || !entry.player1Uid || !entry.player2Uid || entry.winnerUid) return; // nothing to watch

      var matchId = matchIdForSlot(t.tournamentCode, t.currentRound, slotIndex);
      var unsub = db.collection('matches').doc(matchId).onSnapshot(function(matchDoc) {
        if (!matchDoc.exists) return;
        var match = matchDoc.data();
        if (match.status !== 'finished') return;

        var board = match.leaderboard || [];
        if (board.length < 2) return; // not both players' results are in yet

        // A tied score can't produce two winners — break it deterministically
        // by the same creator-picking rule used to set up the match, rather
        // than leaving the bracket stuck.
        var winnerUid = (board[0].score !== board[1].score)
          ? board[0].uid
          : pickCreatorUid(board[0].uid, board[1].uid);

        recordSlotWinner(t.currentRound, slotIndex, winnerUid);
      }, function(err) {
        console.error('Match watcher error:', err);
      });

      matchWatchUnsubs.push(unsub);
    })(s);
  }
}

function clearMatchWatchers() {
  matchWatchUnsubs.forEach(function(u) { u(); });
  matchWatchUnsubs = [];
}

function recordSlotWinner(round, slot, winnerUid) {
  var key = 'bracket.r' + round + '_s' + slot + '.winnerUid';
  var update = {};
  update[key] = winnerUid;

  db.collection('tournaments').doc(tournamentId).update(update)
    .then(function() {
      return db.collection('tournaments').doc(tournamentId).get();
    })
    .then(function(doc) {
      maybeAdvanceRound(doc.data());
    })
    .catch(function(err) {
      console.error('Recording slot winner failed:', err);
    });
}

// If every pairing in the current round now has a winner, either crown the
// champion (this was the final) or compute and write the next round's
// pairings. Guarded so a burst of near-simultaneous match completions
// can't trigger this twice for the same round.
function maybeAdvanceRound(t) {
  if (advancedPastRound >= t.currentRound) return;

  var slots = numSlotsInRound(t.bracketSize, t.currentRound);
  if (!isRoundComplete(t.bracket, t.currentRound, slots)) return;

  advancedPastRound = t.currentRound; // claim it before the async write lands

  var isFinalRound = (t.currentRound === t.totalRounds - 1);
  var ref = db.collection('tournaments').doc(tournamentId);

  if (isFinalRound) {
    var championUid = t.bracket['r' + t.currentRound + '_s0'].winnerUid;
    ref.update({ status: 'finished', championUid: championUid }).catch(function(err) {
      console.error('Finishing tournament failed:', err);
      advancedPastRound = t.currentRound - 1; // let a later snapshot retry
    });
    return;
  }

  var updates = nextRoundPairings(t.bracket, t.currentRound, slots);
  updates.currentRound = t.currentRound + 1;

  ref.update(updates).catch(function(err) {
    console.error('Advancing round failed:', err);
    advancedPastRound = t.currentRound - 1; // let a later snapshot retry
  });
}

// =====================================================================
// CHAMPION / FINAL
// =====================================================================
function renderFinal(t) {
  showScreen('finalScreen');
  clearMatchWatchers();

  var isChampion = (t.championUid === me.uid);
  var championName = playerName(t, t.championUid);

  document.getElementById('finalEmoji').textContent = isChampion ? '🏆' : '🏏';
  document.getElementById('finalTitle').textContent = isChampion
    ? 'You won the tournament!'
    : championName + ' won the tournament';
  document.getElementById('finalSub').textContent =
    t.bracketSize + '-player knockout — every round decided.';

  document.getElementById('tnFinalBracket').innerHTML = buildBracketHTML(t);

  localStorage.removeItem(RESUME_KEY);
  teardownListenerOnly();
}

// =====================================================================
// TEARDOWN
// =====================================================================
function teardown() {
  teardownListenerOnly();
  clearMatchWatchers();
  if (myPendingWaitUnsub) { myPendingWaitUnsub(); myPendingWaitUnsub = null; }
  watchersForRound = -1;
  advancedPastRound = -1;
  myCurrentPairingInfo = null;
}

function teardownListenerOnly() {
  if (tournamentUnsub) { tournamentUnsub(); tournamentUnsub = null; }
}

function endWithMessage(msg) {
  teardown();
  localStorage.removeItem(RESUME_KEY);
  document.getElementById('abortReason').textContent = msg;
  showScreen('abortScreen');
  tournamentId = null;
}

// Best-effort: if the organiser closes the tab mid-tournament, try to tell
// everyone rather than leaving the bracket frozen forever. Same accepted
// limitation as multiplayer.js's matches — not guaranteed to fire.
window.addEventListener('beforeunload', function() {
  if (!tournamentId || !me || isLeaving) return;
  db.collection('tournaments').doc(tournamentId).get().then(function(doc) {
    if (doc.exists && doc.data().hostUid === me.uid && doc.data().status === 'playing') {
      db.collection('tournaments').doc(tournamentId).update({
        status: 'aborted',
        abortReason: 'The organiser left the tournament.'
      });
    }
  });
});
