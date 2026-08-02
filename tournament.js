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
// decided. If that browser's tab closes or crashes mid-tournament, another
// present player's browser automatically takes over — see "HOST MIGRATION
// & WALKOVERS" below and CLAUDE.md "HOST MIGRATION & GRACEFUL LEAVING" for
// the full design (added Day 48; this used to just abort the whole
// tournament for everyone, which is no longer what happens).

// ===== CONFIG =====
var QUESTIONS_PER_MATCH = 10;
var BRACKET_SIZES = [4, 8, 16];
var TCODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no O/0, I/1/L lookalikes

// ===== LEAGUE + KNOCKOUT PLAYOFFS CONFIG =====
// A second tournament type ("league"), alongside the knockout bracket above.
// 20 players split into 2 groups of 10, each group plays a full round-robin
// (every player faces every other player in their group once), then the
// top 4 from each group (8 total) feed into the EXACT SAME knockout bracket
// engine already built above — buildInitialBracket/nextRoundPairings/
// isRoundComplete/hostWatchCurrentRound/maybeAdvanceRound are all reused
// completely unchanged once the 8 qualifiers are known. This file only adds
// what's genuinely new: the round-robin schedule, live standings, and the
// group-stage screen that lets a player work through their own 9 matches.
var LEAGUE_TOTAL_PLAYERS = 20;
var LEAGUE_GROUP_SIZE = 10;
var LEAGUE_QUALIFIERS_PER_GROUP = 4;
var POINTS_WIN = 3;
var POINTS_DRAW = 1;
var POINTS_LOSS = 0;

// ===== SCHEDULED TOURNAMENTS CONFIG (Day 47) =====
// The host-less daily 8pm Knockout / 10pm League — see CLAUDE.md
// "HOST-LESS SCHEDULED TOURNAMENTS" for the full design. Sign-up is a
// separate /scheduledSignups doc (open all day, no player cap); a GitHub
// Actions bot locks it at start time, builds a bye-aware bracket or an
// uneven-split league via tournament-logic.js, and creates the real
// /tournaments doc that the code below already knows how to render and
// play through unchanged.
var SCHED_MIN_KNOCKOUT = 4;
var SCHED_MIN_LEAGUE = 10;

// ===== HOST MIGRATION CONFIG (Day 48) =====
// How often THIS browser checks in while a tournament is actually in
// progress. PRESENCE_STALE_MS/WALKOVER_WAIT_MS themselves live in
// tournament-logic.js (already loaded as globals by the time this file
// runs) since the scheduled bot needs those exact same numbers too — this
// one is purely a local write-cadence choice, not shared bracket math.
var PRESENCE_INTERVAL_MS = 20000;
var SCHED_UI = {
  knockout: { statusId: 'schedKnockoutStatus', btnId: 'schedKnockoutBtn', startsAtIst: '20:00', label: '8:00 PM', min: SCHED_MIN_KNOCKOUT },
  league:   { statusId: 'schedLeagueStatus',   btnId: 'schedLeagueBtn',   startsAtIst: '22:00', label: '10:00 PM', min: SCHED_MIN_LEAGUE }
};
var schedUnsubs = { knockout: null, league: null };

// ===== STATE =====
var me = null;
var tournamentId = null;         // = tournamentCode = the doc ID
var tournamentUnsub = null;
var isLeaving = false;
var lastT = null;                // most recent snapshot data, so UI callbacks (tab switches) can re-render without a fresh read
var watchersForRound = -1;       // which round attachRoundWatchers() last ran for
var matchWatchUnsubs = [];       // this round's per-pairing match listeners
var advancedPastRound = -1;      // guards against writing the same round-advance twice
var tournamentPresenceTimer = null; // heartbeat interval, running only while status is playing/knockout/group
var myPendingWaitUnsub = null;   // joiner-side "wait for opponent to create the match" listener
var myCurrentPairingInfo = null; // { matchId, opponentUid, opponentName, amCreator } for the knockout Play button

// League-only state
var viewingGroup = null;            // 'A' | 'B' — which group's standings the player is currently looking at
var groupWatchersAttached = false;  // host-only: have the (up to 90) group-match listeners been attached yet
var groupMatchWatchUnsubs = [];
var knockoutTransitionAttempted = false; // guards against writing the group->knockout transition twice

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
  startScheduledListeners(); // independent of which screen we land on below

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
// SCHEDULED SIGN-UP (Day 47) — the entry screen's two cards live-update
// from /scheduledSignups the whole time this page is open, regardless of
// which screen is actually showing, so they're already current the moment
// a player navigates back to the entry screen.
// =====================================================================
function istTodayStr() {
  var ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000); // same IST-shift technique as automation/send-notifications.js
  return ist.getUTCFullYear() + '-' +
    String(ist.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(ist.getUTCDate()).padStart(2, '0');
}

function scheduledEventId(type) {
  return istTodayStr() + '-' + type;
}

function startScheduledListeners() {
  ['knockout', 'league'].forEach(function(type) {
    if (schedUnsubs[type]) schedUnsubs[type]();
    schedUnsubs[type] = db.collection('scheduledSignups').doc(scheduledEventId(type))
      .onSnapshot(function(doc) {
        renderScheduledCard(type, doc.exists ? doc.data() : null);
      }, function(err) {
        console.error('Scheduled signup listener error (' + type + '):', err);
      });
  });
}

function renderScheduledCard(type, data) {
  var ui = SCHED_UI[type];
  var statusEl = document.getElementById(ui.statusId);
  var btn = document.getElementById(ui.btnId);
  if (!statusEl || !btn) return; // page not on the entry screen's DOM yet

  statusEl.className = 'tn-scheduled-card-status';

  if (!data || data.status === 'open') {
    var players = data ? (data.players || {}) : {};
    var count = Object.keys(players).length;
    var amIn = !!(me && players[me.uid]);
    statusEl.textContent = count + ' signed up so far — needs ' + ui.min + ' to run tonight at ' + ui.label + '.';
    btn.disabled = false;
    btn.textContent = amIn ? "You're in — Leave" : 'Join';
    btn.onclick = function() { scheduledJoinToggle(type); };
    return;
  }

  if (data.status === 'started') {
    var amPlaying = !!(me && (data.players || {})[me.uid]);
    statusEl.textContent = '🔴 Live now!';
    statusEl.classList.add('tn-scheduled-live');
    if (amPlaying) {
      btn.disabled = false;
      btn.textContent = 'Enter Live Tournament →';
      btn.onclick = function() { enterScheduledTournament(type); };
    } else {
      btn.disabled = true;
      btn.textContent = 'Already started';
      btn.onclick = null;
    }
    return;
  }

  if (data.status === 'cancelled') {
    statusEl.textContent = 'Cancelled tonight — only ' + Object.keys(data.players || {}).length +
      ' signed up, needed ' + ui.min + '.';
    statusEl.classList.add('tn-scheduled-cancelled');
    btn.disabled = true;
    btn.textContent = 'Cancelled';
    btn.onclick = null;
  }
}

function scheduledJoinToggle(type) {
  if (!me) return;
  var ui = SCHED_UI[type];
  var btn = document.getElementById(ui.btnId);
  if (btn) btn.disabled = true;

  var ref = db.collection('scheduledSignups').doc(scheduledEventId(type));

  ref.get().then(function(doc) {
    if (!doc.exists) {
      var players = {};
      players[me.uid] = { name: me.name, joinedAt: Date.now() };
      return ref.set({
        eventId: scheduledEventId(type),
        type: type,
        eventDate: istTodayStr(),
        startsAtIst: ui.startsAtIst,
        status: 'open',
        minPlayers: ui.min,
        players: players,
        tournamentCode: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    var data = doc.data();
    if (data.status !== 'open') return null; // locked/started/cancelled — nothing to toggle

    var already = !!(data.players || {})[me.uid];
    var update = {};
    if (already) {
      update['players.' + me.uid] = firebase.firestore.FieldValue.delete();
    } else {
      update['players.' + me.uid] = { name: me.name, joinedAt: Date.now() };
    }
    return ref.update(update);
  }).catch(function(err) {
    console.error('Scheduled signup toggle failed (' + type + '):', err);
    alert(explainFirebaseError(err));
  }).then(function() {
    if (btn) btn.disabled = false;
  });
}

// The bot already added this uid to the real tournament's players map when
// it built the bracket — this is a pure resume, same joinTournamentByCode
// "already in" branch a page-refresh mid-tournament goes through.
function enterScheduledTournament(type) {
  db.collection('scheduledSignups').doc(scheduledEventId(type)).get().then(function(doc) {
    if (!doc.exists || !doc.data().tournamentCode) return;
    var code = doc.data().tournamentCode;
    return joinTournamentByCode(code).then(function() {
      ['knockout', 'league'].forEach(function(t) {
        if (schedUnsubs[t]) { schedUnsubs[t](); schedUnsubs[t] = null; }
      });
      listenToTournament();
    });
  }).catch(function(err) {
    console.error('Could not enter scheduled tournament:', err);
    alert(explainFirebaseError(err));
  });
}

// =====================================================================
// SCREENS
// =====================================================================
var ALL_SCREENS = [
  'loadingScreen', 'loginGateScreen', 'entryScreen', 'joinScreen',
  'lobbyScreen', 'groupStageScreen', 'bracketScreen', 'finalScreen', 'abortScreen'
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
// HOST MIGRATION & WALKOVERS (Day 48) — see CLAUDE.md "HOST MIGRATION &
// GRACEFUL LEAVING". Same mechanism as multiplayer.js's matches: every
// player checks in while a tournament is actively in progress (playing,
// knockout, or group), and effectiveHostUid() — from tournament-logic.js,
// shared with the scheduled bot — decides who should currently be running
// it. Unlike a match's phase clock, hostWatchCurrentRound/
// hostWatchAllGroupMatches are already event-driven (onSnapshot listeners,
// not a client-local timeout chain), so a migrated host doesn't need to
// reconstruct any elapsed time — it just needs to attach the same
// listeners a moment later than the original host would have, which their
// own existing idempotency guards (watchersForRound/groupWatchersAttached)
// already make safe to call on every snapshot.
// =====================================================================
function startTournamentPresenceHeartbeat() {
  if (tournamentPresenceTimer || !tournamentId || !me) return;
  var write = function() {
    var update = {};
    update['presence.' + me.uid] = firebase.firestore.FieldValue.serverTimestamp();
    db.collection('tournaments').doc(tournamentId).update(update)
      .catch(function(e) { console.error('Tournament presence heartbeat failed:', e); });
  };
  write();
  tournamentPresenceTimer = setInterval(write, PRESENCE_INTERVAL_MS);
}

function stopTournamentPresenceHeartbeat() {
  if (tournamentPresenceTimer) { clearInterval(tournamentPresenceTimer); tournamentPresenceTimer = null; }
}

// Narrow, unconditional "I'm taking over" write — see firestore.rules'
// onlyClaimedTournamentHost for the matching permission.
function claimTournamentHostIfNeeded(t) {
  if (t.hostUid === me.uid) return Promise.resolve();
  return db.collection('tournaments').doc(tournamentId).update({ hostUid: me.uid });
}

// Called from render() on every snapshot while the tournament is active.
function maybeActAsTournamentHost(t) {
  if (!me || !tournamentId) return;
  if (effectiveHostUid(t, Date.now(), PRESENCE_STALE_MS) !== me.uid) return;

  claimTournamentHostIfNeeded(t).then(function() {
    if (t.status === 'group') {
      hostWatchAllGroupMatches(t);
    } else {
      hostWatchCurrentRound(t);
      maybeApplyWalkovers(t);
    }
  }).catch(function(err) {
    console.error('Claiming tournament host failed:', err);
  });
}

// Only applies to round-gated stages — a standalone Knockout, or a
// League's own knockout playoffs once qualifiers are decided (status
// 'knockout' shares the exact same round machinery as 'playing'). League's
// GROUP stage is deliberately excluded: it's designed to let 20 players
// work through up to 9 matches each at their own pace over hours or days
// (see the group-stage host-watching comment above), so a 4-minute clock
// since the stage began doesn't mean the same thing there it does for a
// live round everyone's expected to be actively playing right now.
// computeWalkovers() only ever returns still-undecided slots, so calling
// this on every snapshot is safe — nothing to double-write once a slot
// has a winner.
function maybeApplyWalkovers(t) {
  if (t.status !== 'playing' && t.status !== 'knockout') return;

  var roundStartedAtMs = (t.roundStartedAt && t.roundStartedAt.toMillis) ? t.roundStartedAt.toMillis() : null;
  var slots = numSlotsInRound(t.bracketSize, t.currentRound);
  var winners = computeWalkovers(
    t.bracket, t.currentRound, slots, t.presence || {}, t.leftPlayers || {},
    Date.now(), PRESENCE_STALE_MS, roundStartedAtMs
  );

  var keys = Object.keys(winners);
  if (keys.length === 0) return;

  var updates = {};
  keys.forEach(function(key) {
    updates['bracket.' + key + '.winnerUid'] = winners[key];
    updates['bracket.' + key + '.walkover'] = true;
  });

  db.collection('tournaments').doc(tournamentId).update(updates)
    .then(function() { return db.collection('tournaments').doc(tournamentId).get(); })
    .then(function(doc) { maybeAdvanceRound(doc.data()); })
    .catch(function(err) { console.error('Applying walkover failed:', err); });
}

// =====================================================================
// PURE BRACKET HELPERS — moved to tournament-logic.js on Day 47 so the
// host-less scheduled-tournament bot (Node) can use the EXACT SAME
// bracket/round-robin/bye math as this browser code, from one source
// instead of two copies that could drift apart. That file is loaded via
// <script> before this one in tournament.html, so matchIdForSlot,
// pickCreatorUid, roundLabel, numSlotsInRound, buildInitialBracket,
// nextRoundPairings, isRoundComplete, buildInitialBracketWithByes,
// generateRoundRobinSchedule, matchIdForGroupPairing, groupTotalPairings,
// isGroupStageComplete, computeGroupStandings, seedKnockoutBracket, and
// splitIntoTwoGroups are all already global by the time this file runs.
// =====================================================================

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
// LEAGUE — generateRoundRobinSchedule, matchIdForGroupPairing,
// groupTotalPairings, isGroupStageComplete, computeGroupStandings, and
// seedKnockoutBracket all moved to tournament-logic.js on Day 47 (see the
// note above) — buildMyGroupPairings below is the one that stayed, since
// it needs `me` and the browser-only playerName() helper.
// =====================================================================

// Every pairing in my own group, in schedule order — the "Your Matches"
// list. Always exactly 9 entries (one per round) since a round-robin
// schedule guarantees each player appears in exactly one pairing per round.
function buildMyGroupPairings(t, myGroup) {
  var schedule = t.groupSchedule[myGroup];
  var results = t.groupResults || {};
  var list = [];

  schedule.forEach(function(round, r) {
    round.forEach(function(pair, p) {
      if (pair.indexOf(me.uid) === -1) return;
      var opponentUid = (pair[0] === me.uid) ? pair[1] : pair[0];
      var key = myGroup + '_r' + r + '_p' + p;
      list.push({
        matchId: matchIdForGroupPairing(t.tournamentCode, myGroup, r, p),
        opponentUid: opponentUid,
        opponentName: playerName(t, opponentUid),
        result: results[key] || null
      });
    });
  });

  return list;
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

// isPublicRoom (Day 56): when true, this creates an AUTO-MATCH tournament
// instead of a private "Invite Friends" one — same doc shape, just
// isPublic:true and the button state lives on the amSizeBtn* buttons
// instead of sizeBtn*. See findPublicTournament() below for the matching
// half of this (join an existing public one instead of always creating).
function createTournament(bracketSize, attempt, isPublicRoom) {
  if (!me) return;
  attempt = attempt || 1;
  isPublicRoom = !!isPublicRoom;
  var prefix = isPublicRoom ? 'am' : '';

  var btn = document.getElementById(prefix + 'sizeBtn' + bracketSize);
  if (attempt === 1) {
    BRACKET_SIZES.forEach(function(size) {
      var b = document.getElementById(prefix + 'sizeBtn' + size);
      if (b) b.disabled = true;
    });
    if (btn) btn.textContent = '…';
  }

  var code = generateTournamentCode();
  var ref = db.collection('tournaments').doc(code);

  ref.get().then(function(existing) {
    if (existing.exists) {
      if (attempt >= 5) throw new Error('Could not find a free tournament code. Please try again.');
      createTournament(bracketSize, attempt + 1, isPublicRoom);
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
      isPublic: isPublicRoom,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).then(function(written) {
    if (written === null) return;
    tournamentId = code;
    listenToTournament();
  }).catch(function(err) {
    console.error('Create tournament failed:', err);
    BRACKET_SIZES.forEach(function(size) {
      var b = document.getElementById(prefix + 'sizeBtn' + size);
      if (b) { b.disabled = false; b.innerHTML = size + '<br/><span>players</span>'; }
    });
    alert(explainFirebaseError(err));
  });
}

var ROUND_ROBIN_BTN_HTML = 'Round Robin Tournament<br/><span>20 players — 2 groups of 10 → knockout</span>';

// isPublicRoom (Day 56): same idea as createTournament() above — true makes
// this an AUTO-MATCH round robin (isPublic:true, amLeagueBtn) instead of a
// private "Invite Friends" one (sizeBtnLeague).
function createLeagueTournament(attempt, isPublicRoom) {
  if (!me) return;
  attempt = attempt || 1;
  isPublicRoom = !!isPublicRoom;
  var leagueBtn = document.getElementById(isPublicRoom ? 'amLeagueBtn' : 'sizeBtnLeague');

  if (attempt === 1 && leagueBtn) { leagueBtn.disabled = true; leagueBtn.innerHTML = '…'; }

  var code = generateTournamentCode();
  var ref = db.collection('tournaments').doc(code);

  ref.get().then(function(existing) {
    if (existing.exists) {
      if (attempt >= 5) throw new Error('Could not find a free tournament code. Please try again.');
      createLeagueTournament(attempt + 1, isPublicRoom);
      return null;
    }

    var players = {};
    players[me.uid] = { name: me.name, joinedAt: Date.now() };

    return ref.set({
      tournamentCode: code,
      hostUid: me.uid,
      type: 'league',
      status: 'lobby',
      totalPlayers: LEAGUE_TOTAL_PLAYERS,
      players: players,
      groups: null,
      groupSchedule: null,
      groupResults: {},
      bracket: {},
      bracketSize: null,
      totalRounds: null,
      currentRound: 0,
      championUid: null,
      isPublic: isPublicRoom,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).then(function(written) {
    if (written === null) return;
    tournamentId = code;
    listenToTournament();
  }).catch(function(err) {
    console.error('Create league tournament failed:', err);
    if (leagueBtn) { leagueBtn.disabled = false; leagueBtn.innerHTML = ROUND_ROBIN_BTN_HTML; }
    alert(explainFirebaseError(err));
  });
}

// =====================================================================
// AUTO-MATCH (Day 56) — mirrors multiplayer.js's findPublicMatch()/
// createRoom('public'), applied to tournaments. Looks for an open public
// tournament of the matching type (and, for knockout, the matching bracket
// size) with a spot free; if none exists, becomes the host of a new public
// tournament and waits for the next person auto-matching to find it the
// same way. Both filters below are plain equality, so — same reasoning as
// findPublicMatch() — this needs no composite index.
// =====================================================================
function autoMatchKnockout(bracketSize) {
  findPublicTournament('knockout', bracketSize);
}

function autoMatchLeague() {
  findPublicTournament('league', null);
}

function findPublicTournament(type, bracketSize) {
  if (!me) return;

  var btn = document.getElementById(type === 'knockout' ? ('amSizeBtn' + bracketSize) : 'amLeagueBtn');
  if (btn) btn.textContent = 'Searching…';
  if (type === 'knockout') {
    BRACKET_SIZES.forEach(function(size) {
      var b = document.getElementById('amSizeBtn' + size);
      if (b) b.disabled = true;
    });
  } else if (btn) {
    btn.disabled = true;
  }

  db.collection('tournaments')
    .where('isPublic', '==', true)
    .where('status', '==', 'lobby')
    .where('type', '==', type)
    .get()
    .then(function(snap) {
      var candidates = [];
      snap.forEach(function(doc) {
        var data = doc.data();
        if (data.hostUid === me.uid) return;
        if (type === 'knockout' && data.bracketSize !== bracketSize) return;

        var players = data.players || {};
        if (players[me.uid]) return;

        var cap = (type === 'league') ? data.totalPlayers : data.bracketSize;
        if (Object.keys(players).length >= cap) return;

        candidates.push({
          code: doc.id,
          createdAtMs: (data.createdAt && data.createdAt.toMillis) ? data.createdAt.toMillis() : 0
        });
      });

      if (candidates.length === 0) {
        if (type === 'knockout') createTournament(bracketSize, 1, true);
        else createLeagueTournament(1, true);
        return;
      }

      candidates.sort(function(a, b) { return a.createdAtMs - b.createdAtMs; });

      joinTournamentByCode(candidates[0].code).then(function() {
        listenToTournament();
      }).catch(function(err) {
        console.error('Join public tournament failed, creating one instead:', err);
        if (type === 'knockout') createTournament(bracketSize, 1, true);
        else createLeagueTournament(1, true);
      });
    })
    .catch(function(err) {
      console.error('Find public tournament failed:', err);
      restoreAutoMatchButtons(type);
      alert(explainFirebaseError(err));
    });
}

function restoreAutoMatchButtons(type) {
  if (type === 'knockout') {
    BRACKET_SIZES.forEach(function(size) {
      var b = document.getElementById('amSizeBtn' + size);
      if (b) { b.disabled = false; b.innerHTML = size + '<br/><span>players</span>'; }
    });
  } else {
    var b = document.getElementById('amLeagueBtn');
    if (b) { b.disabled = false; b.innerHTML = ROUND_ROBIN_BTN_HTML; }
  }
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
    var requiredCount = (data.type === 'league') ? data.totalPlayers : data.bracketSize;
    if (Object.keys(players).length >= requiredCount) {
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

var TOURNAMENT_ACTIVE_STATUSES = ['playing', 'knockout', 'group'];

function render(t) {
  lastT = t;

  // Presence + host migration/walkovers only matter while something is
  // actually in progress — a lobby has no host-driven process running yet,
  // and a finished tournament has nothing left to drive.
  if (TOURNAMENT_ACTIVE_STATUSES.indexOf(t.status) !== -1) {
    startTournamentPresenceHeartbeat();
    maybeActAsTournamentHost(t);
  } else {
    stopTournamentPresenceHeartbeat();
  }

  if (t.status === 'aborted') {
    endWithMessage(t.abortReason || 'The organiser ended the tournament.');
    return;
  }

  if (t.status === 'lobby') {
    renderLobby(t);
    return;
  }
  // League tournaments have a group stage before the bracket even exists.
  if (t.status === 'group') {
    renderGroupStage(t);
    return;
  }
  // 'playing' = a pure knockout tournament's only in-progress state.
  // 'knockout' = a league tournament's playoff stage, once qualifiers are
  // decided — from here on it's the exact same bracket engine as knockout.
  if (t.status === 'playing' || t.status === 'knockout') {
    clearGroupMatchWatchers(); // group stage (if any) is done — stop watching its 90 matches
    renderBracket(t);
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

  var isLeague = (t.type === 'league');
  var requiredCount = isLeague ? t.totalPlayers : t.bracketSize;

  var badge = document.getElementById('tnSizeBadge');
  badge.textContent = isLeague
    ? '🏏 20-player Round Robin — 2 groups of 10, top 4 each advance to knockout'
    : '🏆 ' + t.bracketSize + '-player Knockout bracket';
  badge.style.display = 'block';

  var players = t.players || {};
  var uids = Object.keys(players);

  uids.sort(function(a, b) { return (players[a].joinedAt || 0) - (players[b].joinedAt || 0); });

  document.getElementById('tnPlayerCount').textContent = '(' + uids.length + '/' + requiredCount + ')';

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
    if (uids.length < requiredCount) {
      startBtn.disabled = true;
      startBtn.textContent = 'Waiting for players…';
      note.textContent = 'Share the code above — needs exactly ' + requiredCount + ' players to start.';
    } else {
      startBtn.disabled = false;
      startBtn.textContent = 'Start Tournament (' + uids.length + '/' + requiredCount + ')';
      note.textContent = isLeague
        ? 'All 20 are in — starting will randomly split everyone into 2 groups of 10.'
        : 'Bracket is full — start whenever ready.';
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

    if (t.status === 'lobby') {
      if (t.hostUid === me.uid) return ref.delete(); // nothing worth preserving before it's started
      var update = {};
      update['players.' + me.uid] = firebase.firestore.FieldValue.delete();
      return ref.update(update);
    }

    // Mid-tournament: mark yourself left instead of ending the whole event
    // for everyone else. If that was the organiser, another present
    // player's browser takes over automatically (see HOST MIGRATION
    // above); if you were mid-pairing, your opponent's match still runs
    // to completion on schedule the same way it already does for a
    // non-host leaving a regular match, and any FUTURE pairing you were
    // supposed to play instead resolves by walkover once it's been live
    // long enough (see maybeApplyWalkovers).
    var liveUpdate = {};
    liveUpdate['leftPlayers.' + me.uid] = true;
    liveUpdate['presence.' + me.uid] = firebase.firestore.FieldValue.delete();
    return ref.update(liveUpdate);
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
// One button in the lobby HTML calls this regardless of type — dispatches
// to whichever start flow matches the tournament actually in lastT.
function startTournament() {
  if (!lastT) return;
  if (lastT.type === 'league') startLeagueTournament();
  else startKnockoutTournament();
}

function startKnockoutTournament() {
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
      bracket: bracket,
      roundStartedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }).catch(function(err) {
    console.error('Start tournament failed:', err);
    btn.disabled = false;
    btn.textContent = 'Start Tournament';
    alert(explainFirebaseError(err));
  });
}

// Splits the 20 lobby players into 2 random groups of 10 and generates each
// group's full round-robin schedule. Doesn't touch the bracket at all yet —
// that only gets built once the group stage actually finishes (see
// maybeTransitionToKnockout below).
function startLeagueTournament() {
  var btn = document.getElementById('startTournamentBtn');
  btn.disabled = true;
  btn.textContent = 'Starting…';

  db.collection('tournaments').doc(tournamentId).get().then(function(doc) {
    var t = doc.data();
    var uids = Object.keys(t.players || {});

    var shuffled = uids.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }

    var groups = {
      A: shuffled.slice(0, LEAGUE_GROUP_SIZE),
      B: shuffled.slice(LEAGUE_GROUP_SIZE)
    };
    var groupSchedule = {
      A: generateRoundRobinSchedule(groups.A),
      B: generateRoundRobinSchedule(groups.B)
    };

    return db.collection('tournaments').doc(tournamentId).update({
      status: 'group',
      groups: groups,
      groupSchedule: groupSchedule,
      groupResults: {}
    });
  }).catch(function(err) {
    console.error('Start league failed:', err);
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

  document.getElementById('bracketTitle').textContent = (t.type === 'league')
    ? 'Knockout Playoffs'
    : t.bracketSize + '-Player Knockout';
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
      } else if (entry.player2Uid === 'BYE') {
        // Only ever produced by the scheduled bot's buildInitialBracketWithByes
        // (see tournament-logic.js) — the manual create-a-bracket flow always
        // fills the bracket exactly, so this never appears there.
        var byeName = escapeHtml(playerName(t, entry.player1Uid));
        html += '<span class="tn-pairing-player tn-winner">' + byeName + '</span>';
        html += '<span class="tn-pairing-vs">bye — advances automatically</span>';
      } else {
        var n1 = escapeHtml(playerName(t, entry.player1Uid));
        var n2 = escapeHtml(playerName(t, entry.player2Uid));
        var c1 = 'tn-pairing-player';
        var c2 = 'tn-pairing-player';
        if (entry.winnerUid === entry.player1Uid) { c1 += ' tn-winner'; c2 += ' tn-loser'; }
        else if (entry.winnerUid === entry.player2Uid) { c2 += ' tn-winner'; c1 += ' tn-loser'; }
        html += '<span class="' + c1 + '">' + n1 + '</span>';
        html += '<span class="tn-pairing-vs">' + (entry.walkover ? 'walkover' : 'vs') + '</span>';
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
// GROUP STAGE (league only)
// =====================================================================
function renderGroupStage(t) {
  showScreen('groupStageScreen');
  document.getElementById('groupCodeDisplay').textContent = t.tournamentCode;

  var myGroup = (t.groups.A.indexOf(me.uid) !== -1) ? 'A' : 'B';
  if (viewingGroup !== 'A' && viewingGroup !== 'B') viewingGroup = myGroup;

  document.getElementById('groupTabA').classList.toggle('tn-tab-active', viewingGroup === 'A');
  document.getElementById('groupTabB').classList.toggle('tn-tab-active', viewingGroup === 'B');

  var standings = computeGroupStandings(t.players, t.groups[viewingGroup], viewingGroup, t.groupResults, POINTS_WIN, POINTS_DRAW, POINTS_LOSS);
  var standingsContainer = document.getElementById('groupStandingsContainer');
  standingsContainer.innerHTML = '';
  standingsContainer.appendChild(buildStandingsTable(standings, LEAGUE_QUALIFIERS_PER_GROUP));

  var myMatchesContainer = document.getElementById('groupMyMatchesContainer');
  myMatchesContainer.innerHTML = '';
  if (viewingGroup === myGroup) {
    var heading = document.createElement('div');
    heading.className = 'mp-players-heading';
    heading.textContent = 'Your Matches';
    myMatchesContainer.appendChild(heading);
    myMatchesContainer.appendChild(buildMyMatchesListElement(t, myGroup));
  }

  var total = groupTotalPairings(t.groupSchedule);
  var recorded = Object.keys(t.groupResults || {}).length;
  document.getElementById('groupProgressNote').textContent =
    recorded + ' of ' + total + ' group matches played across both groups — ' +
    'top ' + LEAGUE_QUALIFIERS_PER_GROUP + ' from each group advance to the knockout playoffs.';

  // Host-watching is now driven centrally from render() -> maybeActAsTournamentHost()
  // so it works the same way whether this is the original organiser or a
  // migrated one, see HOST MIGRATION above.
}

function switchGroupTab(g) {
  viewingGroup = g;
  if (lastT) renderGroupStage(lastT);
}

// Builds a plain HTML table via DOM APIs (not innerHTML) since player names
// are user-supplied — same textContent-based safety already used by
// renderLobby's player rows.
function buildStandingsTable(standings, qualifyCount) {
  var table = document.createElement('table');
  table.className = 'tn-standings-table';

  var thead = document.createElement('thead');
  var headRow = document.createElement('tr');
  ['#', 'Player', 'P', 'W', 'D', 'L', 'Pts'].forEach(function(label) {
    var th = document.createElement('th');
    th.textContent = label;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  var tbody = document.createElement('tbody');
  standings.forEach(function(s, i) {
    var tr = document.createElement('tr');
    if (i < qualifyCount) tr.className = 'tn-qualifying-row';
    if (s.uid === me.uid) tr.classList.add('tn-my-row');

    var cells = [String(i + 1), s.name, String(s.played), String(s.won), String(s.drawn), String(s.lost), String(s.points)];
    cells.forEach(function(text) {
      var td = document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

// The "Your Matches" list — one row per group opponent, a Play button for
// unplayed pairings, a result line for finished ones.
function buildMyMatchesListElement(t, myGroup) {
  var wrap = document.createElement('div');
  wrap.className = 'tn-my-matches-list';

  buildMyGroupPairings(t, myGroup).forEach(function(p) {
    var row = document.createElement('div');
    row.className = 'tn-match-row';

    var nameEl = document.createElement('span');
    nameEl.className = 'tn-match-opponent';
    nameEl.textContent = 'vs ' + (p.opponentName || 'Player');
    row.appendChild(nameEl);

    if (!p.result) {
      var btn = document.createElement('button');
      btn.className = 'btn-primary tn-match-play-btn';
      btn.textContent = '▶️ Play';
      btn.onclick = function() { playLeagueMatch(p.matchId, p.opponentUid, p.opponentName, btn); };
      row.appendChild(btn);
    } else {
      var myScore = (p.result.player1Uid === me.uid) ? p.result.score1 : p.result.score2;
      var theirScore = (p.result.player1Uid === me.uid) ? p.result.score2 : p.result.score1;

      var statusEl = document.createElement('span');
      statusEl.className = 'tn-match-status';
      if (p.result.winnerUid === null) {
        statusEl.textContent = 'Draw ' + myScore + '-' + theirScore;
        statusEl.classList.add('tn-status-draw');
      } else if (p.result.winnerUid === me.uid) {
        statusEl.textContent = 'Won ' + myScore + '-' + theirScore;
        statusEl.classList.add('tn-status-won');
      } else {
        statusEl.textContent = 'Lost ' + myScore + '-' + theirScore;
        statusEl.classList.add('tn-status-lost');
      }
      row.appendChild(statusEl);
    }

    wrap.appendChild(row);
  });

  return wrap;
}

// =====================================================================
// HOST: WATCHING GROUP MATCHES, RECORDING RESULTS, TRANSITIONING TO
// KNOCKOUT (league only)
// =====================================================================
// Unlike the knockout bracket's round-gated hostWatchCurrentRound, a league
// group stage has no rounds to gate on — all 90 pairings can be played in
// any order the moment the group stage starts, so every pairing's match is
// watched from the start in one pass. This does mean the host's tab needs
// to be reopened occasionally until the whole group stage wraps up (it can
// realistically take longer than one sitting with 20 real players) — but
// NOT continuously: Firestore's onSnapshot delivers the current state the
// moment a listener attaches, so reopening the tab after being away
// catches up on everything that finished while it was closed.
function hostWatchAllGroupMatches(t) {
  if (groupWatchersAttached) return;
  groupWatchersAttached = true;

  ['A', 'B'].forEach(function(g) {
    t.groupSchedule[g].forEach(function(round, r) {
      round.forEach(function(pair, p) {
        var key = g + '_r' + r + '_p' + p;
        if ((t.groupResults || {})[key]) return; // already recorded

        var matchId = matchIdForGroupPairing(t.tournamentCode, g, r, p);
        var unsub = db.collection('matches').doc(matchId).onSnapshot(function(matchDoc) {
          if (!matchDoc.exists) return;
          var match = matchDoc.data();
          if (match.status !== 'finished') return;

          var board = match.leaderboard || [];
          if (board.length < 2) return;

          recordGroupResult(g, r, p, pair, board);
        }, function(err) {
          console.error('Group match watcher error:', err);
        });

        groupMatchWatchUnsubs.push(unsub);
      });
    });
  });
}

function clearGroupMatchWatchers() {
  groupMatchWatchUnsubs.forEach(function(u) { u(); });
  groupMatchWatchUnsubs = [];
  groupWatchersAttached = false;
}

function recordGroupResult(g, r, p, pair, leaderboard) {
  var uidX = pair[0], uidY = pair[1];
  var scoreOf = {};
  leaderboard.forEach(function(row) { scoreOf[row.uid] = row.score; });
  var scoreX = scoreOf[uidX] || 0;
  var scoreY = scoreOf[uidY] || 0;
  var winnerUid = (scoreX === scoreY) ? null : (scoreX > scoreY ? uidX : uidY);

  var key = 'groupResults.' + g + '_r' + r + '_p' + p;
  var update = {};
  update[key] = { player1Uid: uidX, player2Uid: uidY, winnerUid: winnerUid, score1: scoreX, score2: scoreY };

  db.collection('tournaments').doc(tournamentId).update(update)
    .then(function() {
      return db.collection('tournaments').doc(tournamentId).get();
    })
    .then(function(doc) {
      maybeTransitionToKnockout(doc.data());
    })
    .catch(function(err) {
      console.error('Recording group result failed:', err);
    });
}

// Once every one of the 90 group pairings has a result, compute final
// standings, take the top 4 from each group, seed them into a fresh
// knockout bracket (reusing buildInitialBracket completely unchanged) and
// switch the tournament into its playoff stage.
function maybeTransitionToKnockout(t) {
  if (t.status !== 'group') return;
  if (knockoutTransitionAttempted) return;
  if (!isGroupStageComplete(t.groupSchedule, t.groupResults)) return;

  knockoutTransitionAttempted = true;

  var standingsA = computeGroupStandings(t.players, t.groups.A, 'A', t.groupResults, POINTS_WIN, POINTS_DRAW, POINTS_LOSS);
  var standingsB = computeGroupStandings(t.players, t.groups.B, 'B', t.groupResults, POINTS_WIN, POINTS_DRAW, POINTS_LOSS);
  var seeds = seedKnockoutBracket(standingsA, standingsB, LEAGUE_QUALIFIERS_PER_GROUP);
  var bracketSize = seeds.length; // 8
  var totalRounds = Math.log2(bracketSize);
  var bracket = buildInitialBracket(seeds, bracketSize, totalRounds);

  db.collection('tournaments').doc(tournamentId).update({
    status: 'knockout',
    bracketSize: bracketSize,
    totalRounds: totalRounds,
    currentRound: 0,
    bracket: bracket,
    qualifiers: seeds,
    roundStartedAt: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(function(err) {
    console.error('Transitioning to knockout failed:', err);
    knockoutTransitionAttempted = false; // let a later snapshot retry
  });
}

// =====================================================================
// PLAYING MY MATCH
// =====================================================================
function playMyMatch() {
  if (!myCurrentPairingInfo) return;
  goPlayMatch(myCurrentPairingInfo, document.getElementById('playMatchBtn'));
}

// League equivalent of playMyMatch — the group stage has up to 9 concurrent
// playable opponents (not one "current" pairing like a knockout round), so
// each row in the "Your Matches" list builds its own info object and passes
// its own button in, rather than going through the single shared
// myCurrentPairingInfo/playMatchBtn pair the knockout bracket view uses.
function playLeagueMatch(matchId, opponentUid, opponentName, btnEl) {
  var amCreator = (pickCreatorUid(me.uid, opponentUid) === me.uid);
  goPlayMatch({
    matchId: matchId,
    opponentUid: opponentUid,
    opponentName: opponentName,
    amCreator: amCreator
  }, btnEl);
}

// Shared by playMyMatch (knockout) and playLeagueMatch (league group stage):
// creates the duel match if I'm the deterministic creator, or waits for my
// opponent to create it if I'm the joiner, then redirects into the actual
// quiz. btnEl is whichever Play button triggered this — updated in place
// while waiting so its own row doesn't need its own polling logic.
function goPlayMatch(info, btnEl) {
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

    if (btnEl) {
      btnEl.disabled = true;
      btnEl.textContent = 'Waiting for ' + info.opponentName + '…';
    }

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
  updates.roundStartedAt = firebase.firestore.FieldValue.serverTimestamp();

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
  clearGroupMatchWatchers();

  var isChampion = (t.championUid === me.uid);
  var championName = playerName(t, t.championUid);

  document.getElementById('finalEmoji').textContent = isChampion ? '🏆' : '🏏';
  document.getElementById('finalTitle').textContent = isChampion
    ? 'You won the tournament!'
    : championName + ' won the tournament';
  document.getElementById('finalSub').textContent = (t.type === 'league')
    ? '20-player Round Robin (2 groups of 10) → top ' + LEAGUE_QUALIFIERS_PER_GROUP +
      ' each → 8-player knockout playoffs. Champion decided!'
    : t.bracketSize + '-player Knockout — every round decided.';

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
  clearGroupMatchWatchers();
  stopTournamentPresenceHeartbeat();
  if (myPendingWaitUnsub) { myPendingWaitUnsub(); myPendingWaitUnsub = null; }
  watchersForRound = -1;
  advancedPastRound = -1;
  myCurrentPairingInfo = null;
  viewingGroup = null;
  knockoutTransitionAttempted = false;
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

// Best-effort: not guaranteed to fire (browsers cut network on unload) —
// but when it does, it's now a graceful "mark yourself left" for ANY
// in-progress tournament (playing/knockout/group), not just an organiser
// tab-close, and it no longer ends the tournament for everyone else. If
// this never fires at all (a genuine crash), the presence heartbeat's own
// staleness timeout is the real safety net (see HOST MIGRATION above) —
// this handler is purely a faster path for the common case of an actual
// clean tab close. Leaving a still-in-lobby tournament as the organiser is
// unchanged — nothing's running yet to hand off.
window.addEventListener('beforeunload', function() {
  if (!tournamentId || !me || isLeaving) return;
  db.collection('tournaments').doc(tournamentId).get().then(function(doc) {
    if (!doc.exists) return;
    var t = doc.data();

    if (TOURNAMENT_ACTIVE_STATUSES.indexOf(t.status) !== -1) {
      var update = {};
      update['leftPlayers.' + me.uid] = true;
      update['presence.' + me.uid] = firebase.firestore.FieldValue.delete();
      db.collection('tournaments').doc(tournamentId).update(update);
      return;
    }

    if (t.hostUid === me.uid && t.status === 'lobby') {
      db.collection('tournaments').doc(tournamentId).update({
        status: 'aborted',
        abortReason: 'The organiser left the tournament.'
      });
    }
  });
});
