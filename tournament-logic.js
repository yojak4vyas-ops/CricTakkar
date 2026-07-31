// ===== CRICTAKKAR — SHARED TOURNAMENT BRACKET LOGIC =====
//
// Pure, dependency-free bracket/schedule math — no DOM, no Firebase. Loaded
// two different ways so there's exactly one copy of this logic, not two
// that can drift apart:
//   - Browser: <script src="tournament-logic.js"> before tournament.js,
//     attaches everything onto `window` as plain globals (same style
//     tournament.js's own functions used to be defined in).
//   - Node (the scheduled-tournament bot, automation/run-scheduled-
//     tournaments.js): require('../tournament-logic.js') returns the same
//     functions as a module.exports object.
//
// Split out on Day 47 when the host-less scheduled Knockout/League bot
// needed the EXACT SAME bracket/round-robin/bye math the browser-hosted
// flow already used — rather than hand-copy it into Node and risk the two
// versions drifting apart over time, it moved here once, unchanged.

(function (root) {
  'use strict';

  // =====================================================================
  // KNOCKOUT — same functions tournament.js always had, unchanged
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

  // =====================================================================
  // BYES — new. Only the scheduled/no-cap sign-up path ever calls these;
  // the manual "create a bracket" flow still requires an exact 4/8/16 fill
  // and always uses the plain buildInitialBracket above.
  // =====================================================================
  function nextPowerOf2(n) {
    var p = 1;
    while (p < n) p *= 2;
    return p;
  }

  // Builds a full bracket for ANY player count. If N isn't already a power
  // of 2, (nextPowerOf2(N) - N) players get a random round-1 bye instead of
  // an opening match — a bye is written as an already-resolved round-0
  // pairing (opponent 'BYE', winnerUid pre-set to the bye player) so every
  // existing downstream function (nextRoundPairings/isRoundComplete/the
  // host's round-advancement) treats it exactly like an already-played
  // match, with zero special-casing needed anywhere else.
  function buildInitialBracketWithByes(uids) {
    var n = uids.length;
    var bracketSize = nextPowerOf2(n);
    var totalRounds = Math.log2(bracketSize);
    var numByes = bracketSize - n;

    var shuffled = uids.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }

    var byePlayers = shuffled.slice(0, numByes);
    var playing = shuffled.slice(numByes);

    var slotContents = [];
    byePlayers.forEach(function (uid) { slotContents.push({ type: 'bye', uid: uid }); });
    for (var k = 0; k < playing.length; k += 2) {
      slotContents.push({ type: 'match', a: playing[k], b: playing[k + 1] });
    }
    // Shuffle again so byes aren't all clustered at one end of the bracket view.
    for (var m = slotContents.length - 1; m > 0; m--) {
      var mj = Math.floor(Math.random() * (m + 1));
      var mtmp = slotContents[m]; slotContents[m] = slotContents[mj]; slotContents[mj] = mtmp;
    }

    var bracket = {};
    slotContents.forEach(function (content, slot) {
      if (content.type === 'bye') {
        bracket['r0_s' + slot] = { player1Uid: content.uid, player2Uid: 'BYE', winnerUid: content.uid };
      } else {
        bracket['r0_s' + slot] = { player1Uid: content.a, player2Uid: content.b, winnerUid: null };
      }
    });

    for (var round = 1; round < totalRounds; round++) {
      var slots = numSlotsInRound(bracketSize, round);
      for (var s = 0; s < slots; s++) {
        bracket['r' + round + '_s' + s] = { player1Uid: null, player2Uid: null, winnerUid: null };
      }
    }

    return { bracket: bracket, bracketSize: bracketSize, totalRounds: totalRounds };
  }

  // =====================================================================
  // LEAGUE / ROUND-ROBIN
  // =====================================================================

  // Standard "circle method". Now also handles an ODD player count (the
  // scheduled League has no fixed 20/10-10 split) by adding a 'BYE'
  // placeholder seat — whoever is paired against it just sits out that one
  // round, no match, nothing recorded for that pairing. For an EVEN count
  // (including the manual flow's fixed groups of 10) this is byte-for-byte
  // identical to the original — the bye seat is never added.
  function generateRoundRobinSchedule(players) {
    var list = players.slice();
    var hasByeSeat = (list.length % 2 === 1);
    if (hasByeSeat) list.push('BYE');

    var n = list.length;
    var fixed = list[0];
    var rotating = list.slice(1);
    var rounds = [];

    for (var r = 0; r < n - 1; r++) {
      var current = [fixed].concat(rotating);
      var round = [];
      for (var i = 0; i < n / 2; i++) {
        var pair = [current[i], current[n - 1 - i]];
        if (pair.indexOf('BYE') === -1) round.push(pair);
      }
      rounds.push(round);
      rotating.unshift(rotating.pop()); // rotate one seat for the next round
    }

    return rounds;
  }

  function matchIdForGroupPairing(tournamentCode, group, round, pairIdx) {
    return tournamentCode + '-G' + group + '-R' + round + '-P' + pairIdx;
  }

  function groupTotalPairings(groupSchedule) {
    var total = 0;
    ['A', 'B'].forEach(function (g) {
      (groupSchedule[g] || []).forEach(function (round) { total += round.length; });
    });
    return total;
  }

  function isGroupStageComplete(groupSchedule, groupResults) {
    return Object.keys(groupResults || {}).length >= groupTotalPairings(groupSchedule);
  }

  // players: map uid -> {name, ...}. groupUids: this group's player list.
  // Computes one group's live standings — points, then cumulative quiz
  // score (tiebreak), then name (final fallback).
  function computeGroupStandings(players, groupUids, g, groupResults, pointsWin, pointsDraw, pointsLoss) {
    var stats = {};
    groupUids.forEach(function (uid) {
      var p = players[uid];
      stats[uid] = {
        uid: uid, name: (p && p.name) || 'Player',
        played: 0, won: 0, drawn: 0, lost: 0, points: 0, totalScore: 0
      };
    });

    var results = groupResults || {};
    Object.keys(results).forEach(function (key) {
      if (key.charAt(0) !== g) return; // keys look like "A_r0_p0" / "B_r3_p2"
      var res = results[key];
      var s1 = stats[res.player1Uid];
      var s2 = stats[res.player2Uid];
      if (!s1 || !s2) return;

      s1.played++; s2.played++;
      s1.totalScore += res.score1; s2.totalScore += res.score2;

      if (res.winnerUid === null) {
        s1.drawn++; s2.drawn++;
        s1.points += pointsDraw; s2.points += pointsDraw;
      } else if (res.winnerUid === res.player1Uid) {
        s1.won++; s1.points += pointsWin;
        s2.lost++; s2.points += pointsLoss;
      } else {
        s2.won++; s2.points += pointsWin;
        s1.lost++; s1.points += pointsLoss;
      }
    });

    var arr = groupUids.map(function (uid) { return stats[uid]; });
    arr.sort(function (a, b) {
      if (b.points !== a.points) return b.points - a.points;
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return a.name.localeCompare(b.name);
    });
    return arr;
  }

  // Cross-group Quarterfinal draw so the top 2 finishers from the SAME
  // group can't meet before the Semifinal at the earliest: A1-B4, A2-B3,
  // B1-A4, B2-A3.
  function seedKnockoutBracket(standingsA, standingsB, qualifiersPerGroup) {
    var A = standingsA.slice(0, qualifiersPerGroup).map(function (s) { return s.uid; });
    var B = standingsB.slice(0, qualifiersPerGroup).map(function (s) { return s.uid; });
    return [A[0], B[3], A[1], B[2], B[0], A[3], B[1], A[2]];
  }

  // Splits N signed-up players into 2 groups as evenly as possible — not a
  // fixed 10/10, since the scheduled League has a minimum but no cap.
  // Group A gets the extra player when N is odd.
  function splitIntoTwoGroups(uids) {
    var shuffled = uids.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var sizeA = Math.ceil(shuffled.length / 2);
    return { A: shuffled.slice(0, sizeA), B: shuffled.slice(sizeA) };
  }

  // =====================================================================
  // HOST MIGRATION & WALKOVERS — added Day 48, see CLAUDE.md "HOST
  // MIGRATION & GRACEFUL LEAVING". Every player's browser writes a
  // `presence.{uid}` heartbeat (a Firestore serverTimestamp) while a
  // tournament is actively in progress. These two pure functions are what
  // both tournament.js (a real browser tab) and the scheduled bot
  // (automation/run-scheduled-tournaments.js — no browser tab of its own,
  // but it can still read the real presence data players' own browsers
  // wrote) use to make the exact same walkover decision from the exact
  // same rule, so a bot-hosted tournament isn't left permanently unable to
  // recover from a no-show the way a browser-hosted one briefly used to be
  // before this file existed.
  // =====================================================================
  var PRESENCE_STALE_MS = 45000;        // ~2 missed heartbeats before someone's considered gone
  var WALKOVER_WAIT_MS = 4 * 60 * 1000; // how long a round waits before a no-show pairing gets walked over

  // presence[uid] is expected to be a Firestore Timestamp (from either the
  // client SDK or the Admin SDK — both expose .toMillis()). Missing,
  // still-pending (server hasn't resolved the write yet), or malformed
  // entries all read as "not fresh" rather than throwing.
  function isPresenceFresh(presence, uid, nowMs, staleMs) {
    if (!presence || !presence[uid]) return false;
    var ts = presence[uid];
    var tsMs = (ts && typeof ts.toMillis === 'function') ? ts.toMillis() : null;
    if (tsMs === null) return false;
    return (nowMs - tsMs) < staleMs;
  }

  // Deterministic "who should be running this doc right now" — the
  // recorded hostUid stays host for as long as they're still fresh; only
  // once they go stale (or explicitly leave) does anyone else take over,
  // and then it's always the lexicographically smallest fresh, non-left
  // uid, so every client that reads the same doc computes the same answer
  // independently with no separate "election" write needed. A doc with no
  // presence data at all yet (brand new, before anyone's first heartbeat
  // lands) defers to the recorded host unconditionally, so there's no
  // chicken-and-egg race at the very start of a match/tournament.
  function effectiveHostUid(doc, nowMs, staleMs) {
    var players = doc.players || {};
    var leftPlayers = doc.leftPlayers || {};
    var presence = doc.presence || {};

    if (Object.keys(presence).length === 0) return doc.hostUid;

    var candidates = Object.keys(players).filter(function (uid) {
      if (Object.prototype.hasOwnProperty.call(leftPlayers, uid)) return false;
      return isPresenceFresh(presence, uid, nowMs, staleMs);
    });

    if (candidates.length === 0) return null; // nobody present right now — idles until someone reconnects
    if (candidates.indexOf(doc.hostUid) !== -1) return doc.hostUid;

    candidates.sort();
    return candidates[0];
  }

  // A pairing only gets decided by walkover if the round has been live for
  // at least WALKOVER_WAIT_MS AND exactly one of its two players currently
  // has fresh presence while the other doesn't (missing, stale, or
  // explicitly left) — if neither or both are around, nothing is decided;
  // the normal match-result path (or a later re-check) still gets first
  // chance to resolve it honestly. Byes and already-decided/TBD slots are
  // skipped. Returns a plain { 'r{round}_s{slot}': winnerUid } map for the
  // caller to write — never writes anything itself.
  function computeWalkovers(bracket, round, numSlotsThisRound, presence, leftPlayers, nowMs, staleMs, roundStartedAtMs) {
    var winners = {};
    if (roundStartedAtMs === null || roundStartedAtMs === undefined) return winners;
    if (nowMs - roundStartedAtMs < WALKOVER_WAIT_MS) return winners;

    for (var s = 0; s < numSlotsThisRound; s++) {
      var key = 'r' + round + '_s' + s;
      var entry = bracket[key];
      if (!entry || entry.winnerUid) continue;
      if (!entry.player1Uid || !entry.player2Uid || entry.player2Uid === 'BYE') continue;

      var p1Fresh = isPresenceFresh(presence, entry.player1Uid, nowMs, staleMs) &&
        !(leftPlayers && leftPlayers[entry.player1Uid]);
      var p2Fresh = isPresenceFresh(presence, entry.player2Uid, nowMs, staleMs) &&
        !(leftPlayers && leftPlayers[entry.player2Uid]);

      if (p1Fresh && !p2Fresh) winners[key] = entry.player1Uid;
      else if (p2Fresh && !p1Fresh) winners[key] = entry.player2Uid;
    }
    return winners;
  }

  // =====================================================================
  var exportsObj = {
    matchIdForSlot: matchIdForSlot,
    pickCreatorUid: pickCreatorUid,
    roundLabel: roundLabel,
    numSlotsInRound: numSlotsInRound,
    buildInitialBracket: buildInitialBracket,
    nextRoundPairings: nextRoundPairings,
    isRoundComplete: isRoundComplete,
    nextPowerOf2: nextPowerOf2,
    buildInitialBracketWithByes: buildInitialBracketWithByes,
    generateRoundRobinSchedule: generateRoundRobinSchedule,
    matchIdForGroupPairing: matchIdForGroupPairing,
    groupTotalPairings: groupTotalPairings,
    isGroupStageComplete: isGroupStageComplete,
    computeGroupStandings: computeGroupStandings,
    seedKnockoutBracket: seedKnockoutBracket,
    splitIntoTwoGroups: splitIntoTwoGroups,
    PRESENCE_STALE_MS: PRESENCE_STALE_MS,
    WALKOVER_WAIT_MS: WALKOVER_WAIT_MS,
    isPresenceFresh: isPresenceFresh,
    effectiveHostUid: effectiveHostUid,
    computeWalkovers: computeWalkovers
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exportsObj;
  } else {
    Object.keys(exportsObj).forEach(function (k) { root[k] = exportsObj[k]; });
  }
})(typeof window !== 'undefined' ? window : global);
