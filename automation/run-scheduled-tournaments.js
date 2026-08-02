// ===== CRICTAKKAR — HOST-LESS SCHEDULED TOURNAMENT BOT =====
// Run by GitHub Actions every few minutes through the evening (see
// .github/workflows/run-scheduled-tournaments.yml). Not part of the
// deployed website — this only runs in GitHub's cloud, never in a user's
// browser, because it needs the private Firebase service-account key.
//
// WHAT THIS REPLACES: every other Phase 3 tournament (manual Knockout,
// manual League + Playoffs) is driven by a HUMAN host's open browser tab —
// see tournament.js's hostWatchCurrentRound/maybeAdvanceRound and
// hostWatchAllGroupMatches/maybeTransitionToKnockout. The daily 8pm
// Knockout and 10pm League have no human host, so this script plays that
// exact role instead, using plain .get()/.update() reads-and-writes on a
// polling cadence rather than a persistent onSnapshot listener — a
// one-shot cron invocation can't hold a listener open, so it just checks
// "did anything finish since last time?" on every run instead.
//
// Uses the EXACT SAME bracket/round-robin/bye math the browser code uses,
// from tournament-logic.js at the repo root (see that file's header for
// why it was split out) — never a hand-copied second version.
//
// See CLAUDE.md "HOST-LESS SCHEDULED TOURNAMENTS" for the full design
// (sign-up window, bye rules, minimums, why polling instead of listeners).

const admin = require('firebase-admin');
const path = require('path');
const logic = require(path.join(__dirname, '..', 'tournament-logic.js'));

const BOT_HOST_UID = 'SCHEDULED_BOT';
const SCHED = {
  knockout: { min: 4, startsAtIst: '20:00' },
  league:   { min: 10, startsAtIst: '22:00' }
};
const POINTS_WIN = 3, POINTS_DRAW = 1, POINTS_LOSS = 0;
const LEAGUE_QUALIFIERS_PER_GROUP = 4;

// ===== FIREBASE ADMIN SETUP (same pattern as send-notifications.js) =====
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const messaging = admin.messaging();

// Cancellation is event-driven (only known at the moment THIS run decides
// to cancel tonight's event), unlike send-notifications.js's fixed daily
// schedule — so it's sent from here directly rather than adding a type
// there. Only reaches the small list of people who actually signed up for
// tonight, and only those with notifications enabled; same dead-token
// clearing as send-notifications.js's sendToUsers, kept local since this
// is the only place in this file that sends anything.
async function notifySignedUpUids(uids, title, body) {
  if (uids.length === 0) return;
  const userDocs = await Promise.all(uids.map(function (uid) { return db.collection('users').doc(uid).get(); }));
  const optedIn = uids.filter(function (uid, i) { return userDocs[i].exists && userDocs[i].data().notificationsEnabled; });
  if (optedIn.length === 0) return;

  const privateDocs = await Promise.all(optedIn.map(function (uid) {
    return db.collection('users').doc(uid).collection('private').doc('data').get();
  }));

  let sent = 0, failed = 0;
  for (let i = 0; i < optedIn.length; i++) {
    const uid = optedIn[i];
    const fcmToken = privateDocs[i].exists ? privateDocs[i].data().fcmToken : null;
    if (!fcmToken) continue;
    try {
      await messaging.send({
        token: fcmToken,
        notification: { title: title, body: body },
        webpush: { fcmOptions: { link: 'https://cric-takkar.vercel.app/tournament.html' } }
      });
      sent++;
    } catch (err) {
      failed++;
      const code = err && err.code;
      if (code === 'messaging/registration-token-not-registered' || code === 'messaging/invalid-registration-token') {
        await db.collection('users').doc(uid).update({ notificationsEnabled: false });
        await db.collection('users').doc(uid).collection('private').doc('data').update({ fcmToken: FieldValue.delete() });
      } else {
        console.error('Cancellation notify failed for ' + uid + ':', code || err.message);
      }
    }
  }
  console.log('Cancellation notice: ' + sent + ' sent, ' + failed + ' failed, out of ' + optedIn.length + ' opted-in signups.');
}

// ===== IST TIME HELPERS (same technique as send-notifications.js / tournament.js's istTodayStr) =====
function istNow() {
  return new Date(Date.now() + 5.5 * 60 * 60 * 1000);
}
function istDateStr(d) {
  return d.getUTCFullYear() + '-' +
    String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(d.getUTCDate()).padStart(2, '0');
}
function istTimeStr(d) {
  return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0');
}

function scheduledTournamentCode(type, dateStr) {
  var prefix = (type === 'knockout') ? 'SKO' : 'SLG';
  return prefix + dateStr.replace(/-/g, '');
}

// =====================================================================
// STEP 1 — lock today's sign-ups once their start time has passed
// =====================================================================
async function maybeLockAndStart(type, dateStr, nowTimeStr) {
  const cfg = SCHED[type];
  const eventId = dateStr + '-' + type;
  const ref = db.collection('scheduledSignups').doc(eventId);
  const doc = await ref.get();

  if (!doc.exists) return; // nobody has signed up yet today — nothing to lock
  const data = doc.data();
  if (data.status !== 'open') return; // already locked (started/cancelled) — idempotent no-op
  if (nowTimeStr < cfg.startsAtIst) return; // not time yet

  const uids = Object.keys(data.players || {});

  if (uids.length < cfg.min) {
    await ref.update({ status: 'cancelled' });
    console.log(type + ' (' + eventId + '): cancelled — only ' + uids.length + ' signed up, needed ' + cfg.min + '.');
    const label = (type === 'knockout') ? 'Knockout Tournament' : 'Round Robin Tournament';
    await notifySignedUpUids(
      uids,
      "😕 Tonight's " + label + " is cancelled",
      'Only ' + uids.length + ' of the ' + cfg.min + ' needed signed up in time — try again tomorrow!'
    );
    return;
  }

  const code = scheduledTournamentCode(type, dateStr);
  const tournamentRef = db.collection('tournaments').doc(code);
  const players = data.players;

  if (type === 'knockout') {
    const built = logic.buildInitialBracketWithByes(uids);
    await tournamentRef.set({
      tournamentCode: code,
      hostUid: BOT_HOST_UID,
      type: 'knockout',
      status: 'playing',
      bracketSize: built.bracketSize,
      totalRounds: built.totalRounds,
      players: players,
      bracket: built.bracket,
      currentRound: 0,
      championUid: null,
      roundStartedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp()
    });
  } else {
    const groups = logic.splitIntoTwoGroups(uids);
    const groupSchedule = {
      A: logic.generateRoundRobinSchedule(groups.A),
      B: logic.generateRoundRobinSchedule(groups.B)
    };
    await tournamentRef.set({
      tournamentCode: code,
      hostUid: BOT_HOST_UID,
      type: 'league',
      status: 'group',
      totalPlayers: uids.length,
      players: players,
      groups: groups,
      groupSchedule: groupSchedule,
      groupResults: {},
      bracket: {},
      bracketSize: null,
      totalRounds: null,
      currentRound: 0,
      championUid: null,
      createdAt: FieldValue.serverTimestamp()
    });
  }

  await ref.update({ status: 'started', tournamentCode: code });
  console.log(type + ' (' + eventId + '): locked and started as ' + code + ' with ' + uids.length + ' players.');
}

// =====================================================================
// STEP 2 — advance every bot-hosted tournament currently in progress
// =====================================================================
async function advanceKnockoutTournament(doc) {
  const t = doc.data();
  const code = t.tournamentCode;
  const slots = logic.numSlotsInRound(t.bracketSize, t.currentRound);
  const bracket = t.bracket;
  const updates = {};
  let anyChanged = false;

  for (let s = 0; s < slots; s++) {
    const entry = bracket['r' + t.currentRound + '_s' + s];
    if (!entry || !entry.player1Uid || !entry.player2Uid || entry.winnerUid) continue; // TBD, bye, or already decided
    const matchId = logic.matchIdForSlot(code, t.currentRound, s);
    const matchDoc = await db.collection('matches').doc(matchId).get();
    if (!matchDoc.exists) continue; // neither player has opened this match yet
    const match = matchDoc.data();
    if (match.status !== 'finished') continue;
    const board = match.leaderboard || [];
    if (board.length < 2) continue;

    const winnerUid = (board[0].score !== board[1].score)
      ? board[0].uid
      : logic.pickCreatorUid(board[0].uid, board[1].uid);

    const key = 'bracket.r' + t.currentRound + '_s' + s + '.winnerUid';
    updates[key] = winnerUid;
    entry.winnerUid = winnerUid; // update the in-memory copy too, for isRoundComplete below
    anyChanged = true;
  }

  // No-show pairings (nobody, or only one side, ever showed up to create
  // or join their match) never reach 'finished' on their own — the loop
  // above only ever resolves a pairing that a real match doc exists for.
  // Same underlying problem HOST MIGRATION solves for a vanished host,
  // just applied to "did either player show up at all" — see CLAUDE.md
  // "HOST MIGRATION & GRACEFUL LEAVING". This bot has no browser tab of
  // its own, but it can still read the real presence data the PLAYERS'
  // own browsers wrote while viewing tournament.html for this event.
  const roundStartedAtMs = (t.roundStartedAt && t.roundStartedAt.toMillis) ? t.roundStartedAt.toMillis() : null;
  const walkovers = logic.computeWalkovers(
    bracket, t.currentRound, slots, t.presence || {}, t.leftPlayers || {},
    Date.now(), logic.PRESENCE_STALE_MS, roundStartedAtMs
  );
  const walkoverKeys = Object.keys(walkovers);
  if (walkoverKeys.length > 0) {
    walkoverKeys.forEach(function (key) {
      updates['bracket.' + key + '.winnerUid'] = walkovers[key];
      updates['bracket.' + key + '.walkover'] = true;
      bracket[key].winnerUid = walkovers[key];
    });
    anyChanged = true;
    console.log(code + ': applied ' + walkoverKeys.length + ' walkover(s) in round ' + t.currentRound + '.');
  }

  if (anyChanged) {
    await doc.ref.update(updates);
    console.log(code + ': recorded ' + Object.keys(updates).length + ' round-' + t.currentRound + ' result(s).');
  }

  if (!logic.isRoundComplete(bracket, t.currentRound, slots)) return;

  const isFinalRound = (t.currentRound === t.totalRounds - 1);
  if (isFinalRound) {
    const championUid = bracket['r' + t.currentRound + '_s0'].winnerUid;
    await doc.ref.update({ status: 'finished', championUid: championUid });
    console.log(code + ': finished — champion ' + championUid + '.');
    return;
  }

  const nextUpdates = logic.nextRoundPairings(bracket, t.currentRound, slots);
  nextUpdates.currentRound = t.currentRound + 1;
  nextUpdates.roundStartedAt = FieldValue.serverTimestamp();
  await doc.ref.update(nextUpdates);
  console.log(code + ': advanced to round ' + (t.currentRound + 1) + '.');
}

async function advanceLeagueGroupStage(doc) {
  const t = doc.data();
  const code = t.tournamentCode;
  const groupResults = Object.assign({}, t.groupResults || {});
  const updates = {};
  let anyChanged = false;

  for (const g of ['A', 'B']) {
    const schedule = t.groupSchedule[g];
    for (let r = 0; r < schedule.length; r++) {
      const round = schedule[r];
      for (let p = 0; p < round.length; p++) {
        const key = g + '_r' + r + '_p' + p;
        if (groupResults[key]) continue; // already recorded

        const pair = round[p];
        const matchId = logic.matchIdForGroupPairing(code, g, r, p);
        const matchDoc = await db.collection('matches').doc(matchId).get();
        if (!matchDoc.exists) continue;
        const match = matchDoc.data();
        if (match.status !== 'finished') continue;
        const board = match.leaderboard || [];
        if (board.length < 2) continue;

        const scoreOf = {};
        board.forEach(function (row) { scoreOf[row.uid] = row.score; });
        const uidX = pair[0], uidY = pair[1];
        const scoreX = scoreOf[uidX] || 0, scoreY = scoreOf[uidY] || 0;
        const winnerUid = (scoreX === scoreY) ? null : (scoreX > scoreY ? uidX : uidY);
        const result = { player1Uid: uidX, player2Uid: uidY, winnerUid: winnerUid, score1: scoreX, score2: scoreY };

        groupResults[key] = result;
        updates['groupResults.' + key] = result;
        anyChanged = true;
      }
    }
  }

  if (anyChanged) {
    await doc.ref.update(updates);
    console.log(code + ': recorded ' + Object.keys(updates).length + ' group result(s).');
  }

  if (!logic.isGroupStageComplete(t.groupSchedule, groupResults)) return;

  const standingsA = logic.computeGroupStandings(t.players, t.groups.A, 'A', groupResults, POINTS_WIN, POINTS_DRAW, POINTS_LOSS);
  const standingsB = logic.computeGroupStandings(t.players, t.groups.B, 'B', groupResults, POINTS_WIN, POINTS_DRAW, POINTS_LOSS);
  const seeds = logic.seedKnockoutBracket(standingsA, standingsB, LEAGUE_QUALIFIERS_PER_GROUP);
  const bracketSize = seeds.length; // 8, always -- top 4 from each of 2 groups
  const totalRounds = Math.log2(bracketSize);
  const bracket = logic.buildInitialBracket(seeds, bracketSize, totalRounds);

  await doc.ref.update({
    status: 'knockout',
    bracketSize: bracketSize,
    totalRounds: totalRounds,
    currentRound: 0,
    bracket: bracket,
    qualifiers: seeds,
    roundStartedAt: FieldValue.serverTimestamp()
  });
  console.log(code + ': group stage complete — moved to knockout playoffs.');
}

async function advanceInProgressTournaments() {
  const snap = await db.collection('tournaments')
    .where('hostUid', '==', BOT_HOST_UID)
    .where('status', 'in', ['playing', 'group', 'knockout'])
    .get();

  for (const doc of snap.docs) {
    const status = doc.data().status;
    try {
      if (status === 'group') {
        await advanceLeagueGroupStage(doc);
      } else {
        await advanceKnockoutTournament(doc); // 'playing' (pure knockout) and 'knockout' (league playoffs) share the exact same bracket engine
      }
    } catch (err) {
      console.error('Failed to advance ' + doc.id + ':', err);
    }
  }
}

// =====================================================================
// MAIN
// =====================================================================
async function main() {
  const now = istNow();
  const dateStr = istDateStr(now);
  const timeStr = istTimeStr(now);

  console.log('Scheduled-tournament bot run at ' + dateStr + ' ' + timeStr + ' IST.');

  await maybeLockAndStart('knockout', dateStr, timeStr);
  await maybeLockAndStart('league', dateStr, timeStr);
  await advanceInProgressTournaments();

  console.log('Run complete.');
}

main().catch(function (err) {
  console.error('Scheduled-tournament bot failed:', err);
  process.exit(1);
});
