// ===== CRICTAKKAR — SCHEDULED PUSH NOTIFICATION SENDER =====
// Run by GitHub Actions on a schedule (see .github/workflows/send-notifications.yml).
// Not part of the deployed website — this only runs in GitHub's cloud, never in a
// user's browser, because it needs the private Firebase service-account key.
//
// Usage: node send-notifications.js <type>
//   type is one of: streak | onthisday | weekly-leaderboard | we-miss-you |
//                    tournament-signup | knockout-starting-soon | league-starting-soon
//
// The first 4 notification types were agreed with the user on Day 35/36 — see
// CLAUDE.md's Current Build Status for the reasoning behind each one's content
// and timing. The 3 tournament-related types were added Day 47 alongside the
// host-less scheduled Knockout/League (see CLAUDE.md "HOST-LESS SCHEDULED
// TOURNAMENTS"), all going to the SAME broad opted-in audience as everything
// else in this file, on purpose — the -starting-soon types are a last chance
// for anyone who hasn't signed up yet to still join, not just a nudge for
// people already in. (Cancellation notices are different — only the
// scheduled-tournament bot, run-scheduled-tournaments.js, knows at lock time
// whether tonight's event actually got cancelled, and only sends that notice
// to the small list of people who did sign up — that one isn't in this file.)

const admin = require('firebase-admin');
const path = require('path');

const NOTIFICATION_TYPE = process.argv[2];
const VALID_TYPES = ['streak', 'onthisday', 'weekly-leaderboard', 'we-miss-you', 'tournament-signup', 'knockout-starting-soon', 'league-starting-soon'];

if (!VALID_TYPES.includes(NOTIFICATION_TYPE)) {
  console.error('Usage: node send-notifications.js <' + VALID_TYPES.join('|') + '>');
  process.exit(1);
}

// ===== FIREBASE ADMIN SETUP =====
// The service account key is passed in as a GitHub Actions secret (FIREBASE_SERVICE_ACCOUNT),
// injected as an environment variable at run time — never committed to the repo.
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const messaging = admin.messaging();

// ===== IST DATE HELPERS =====
// Every user's lastPlayedDate is written client-side using the browser's LOCAL date
// (quiz.js etc.) — since CricTakkar is built for the Indian cricket audience, that's
// effectively always IST. This server runs on GitHub's UTC clock, so "today" here must
// be computed in IST to match, or streak/inactivity comparisons would be off by hours.
function istNow() {
  var utcMs = Date.now();
  return new Date(utcMs + 5.5 * 60 * 60 * 1000);
}

function dateStr(d) {
  return d.getUTCFullYear() + '-' +
    String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(d.getUTCDate()).padStart(2, '0');
}

function daysBetween(aStr, bStr) {
  var a = new Date(aStr + 'T00:00:00Z');
  var b = new Date(bStr + 'T00:00:00Z');
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

// ===== SEND HELPER =====
// Sends to every user in the given array ({uid, fcmToken}), clearing any token Firebase
// reports as dead (uninstalled/expired) so we stop trying it every run.
async function sendToUsers(users, title, body) {
  var sent = 0, failed = 0, cleared = 0;

  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    try {
      await messaging.send({
        token: u.fcmToken,
        notification: { title: title, body: body },
        webpush: { fcmOptions: { link: 'https://cric-takkar.vercel.app/' } }
      });
      sent++;
    } catch (err) {
      failed++;
      var code = err && err.code;
      if (code === 'messaging/registration-token-not-registered' ||
          code === 'messaging/invalid-registration-token') {
        // fcmToken lives in the private subcollection (audit item S1);
        // notificationsEnabled stays on the public doc.
        await db.collection('users').doc(u.uid).update({ notificationsEnabled: false });
        await db.collection('users').doc(u.uid).collection('private').doc('data')
          .update({ fcmToken: admin.firestore.FieldValue.delete() });
        cleared++;
      } else {
        console.error('Send failed for ' + u.uid + ':', code || err.message);
      }
    }
  }

  console.log(NOTIFICATION_TYPE + ': ' + sent + ' sent, ' + failed + ' failed (' + cleared + ' dead tokens cleared), out of ' + users.length + ' targeted.');
}

// ===== FETCH ALL NOTIFICATION-ENABLED USERS =====
// One query for the opted-in list, plus one read per opted-in user for their
// private fcmToken (audit item S1 moved it off the public doc it used to
// share with lastPlayedDate/currentStreak). This runs with the Admin SDK,
// which bypasses security rules entirely, so the extra reads are just a
// quota cost, not a permissions concern — and at only a handful of runs per
// day against a small user base, that cost is negligible either way.
async function fetchOptedInUsers() {
  var snap = await db.collection('users').where('notificationsEnabled', '==', true).get();

  var candidates = [];
  snap.forEach(function(doc) {
    var d = doc.data();
    candidates.push({
      uid: doc.id,
      lastPlayedDate: d.lastPlayedDate || '',
      currentStreak: d.currentStreak || 0
    });
  });

  var privateDocs = await Promise.all(candidates.map(function(c) {
    return db.collection('users').doc(c.uid).collection('private').doc('data').get();
  }));

  var users = [];
  for (var i = 0; i < candidates.length; i++) {
    var privateData = privateDocs[i].exists ? privateDocs[i].data() : {};
    if (privateData.fcmToken) {
      users.push({
        uid: candidates[i].uid,
        fcmToken: privateData.fcmToken,
        lastPlayedDate: candidates[i].lastPlayedDate,
        currentStreak: candidates[i].currentStreak
      });
    }
  }
  return users;
}

// ===== TYPE 1: STREAK REMINDER (daily, 8:30 PM IST) =====
// Only to users with a live streak who haven't played yet today.
async function runStreak() {
  var today = dateStr(istNow());
  var all = await fetchOptedInUsers();
  var targets = all.filter(function(u) {
    return u.currentStreak > 0 && u.lastPlayedDate !== today;
  });
  await sendToUsers(
    targets,
    '🔥 Your streak is about to break!',
    'Play a quick quiz before midnight to keep your streak alive.'
  );
}

// ===== TYPE 2: ON THIS DAY (daily, 8:00 AM IST) =====
// Reuses the same verified onthisday.js data the website itself uses — same matching
// and same-day rotation logic as renderOnThisDay() in onthisday.js, kept in sync
// deliberately rather than re-implemented differently here.
async function runOnThisDay() {
  var onThisDayEvents = require(path.join(__dirname, '..', 'onthisday.js'));
  var now = istNow();
  var month = now.getUTCMonth() + 1;
  var day = now.getUTCDate();

  var matches = onThisDayEvents.filter(function(e) { return e.month === month && e.day === day; });
  if (matches.length === 0) {
    console.log('onthisday: no logged event for today (' + month + '/' + day + ') — skipping send rather than pushing an inaccurate/generic fact.');
    return;
  }

  var dayNumber = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
  var event = matches[dayNumber % matches.length];

  var all = await fetchOptedInUsers();
  await sendToUsers(
    all,
    '📅 On This Day: ' + event.title,
    event.fact.replace(/^[^\w]*/, '') // strip the leading emoji, the notification icon already implies it's CricTakkar
  );
}

// ===== TYPE 3: WEEKLY LEADERBOARD RESET (Monday, 9:30 AM IST) =====
// Kept deliberately generic (no per-user rank lookup) to avoid the same full-collection-
// read-per-user pattern already flagged as a scaling risk on the Stats Dashboard.
async function runWeeklyLeaderboard() {
  var today = dateStr(istNow());
  var all = await fetchOptedInUsers();
  var targets = all.filter(function(u) {
    return u.lastPlayedDate && daysBetween(u.lastPlayedDate, today) <= 14;
  });
  await sendToUsers(
    targets,
    '🏆 New leaderboard week has started!',
    'Play today to start climbing this week\'s rankings.'
  );
}

// ===== TYPE 4: WE MISS YOU (Monday, 10:00 AM IST) =====
// 7-60 days inactive: long enough to be a real lapse, capped at 60 so we don't keep
// nudging accounts that are effectively gone forever.
async function runWeMissYou() {
  var today = dateStr(istNow());
  var all = await fetchOptedInUsers();
  var targets = all.filter(function(u) {
    if (!u.lastPlayedDate) return false;
    var gap = daysBetween(u.lastPlayedDate, today);
    return gap >= 7 && gap <= 60;
  });
  await sendToUsers(
    targets,
    '🏏 We miss you at CricTakkar!',
    'Come back and see if you can beat your old high score.'
  );
}

// ===== TYPE 5: TOURNAMENT SIGN-UP OPEN (daily, 9:00 AM IST) =====
// Generic daily reminder that tonight's Knockout (8 PM) and League (10 PM)
// are open to join — sign-up runs all day, so this goes out early enough to
// give people the whole day's notice. Sent to everyone opted in, not
// filtered by activity, since it's a standing daily event, not personalized.
async function runTournamentSignup() {
  var all = await fetchOptedInUsers();
  await sendToUsers(
    all,
    "🏆 Tonight's tournaments are open!",
    'Sign up for the 8 PM Knockout or the 10 PM League + Playoffs — anyone can join, all day.'
  );
}

// ===== TYPE 6/7: TOURNAMENT STARTING SOON (daily, 7:45 PM / 9:45 PM IST) =====
// 15 minutes before each scheduled tournament locks. Deliberately sent to
// everyone opted in, not just today's signed-up players — the point is a
// last chance for someone who hasn't joined yet to still get in before it's
// too late, not just a "don't forget" for people already registered.
async function runKnockoutStartingSoon() {
  var all = await fetchOptedInUsers();
  await sendToUsers(
    all,
    '⏰ Knockout starts in 15 minutes!',
    "Sign up now on the Tournaments page — it's not too late."
  );
}
async function runLeagueStartingSoon() {
  var all = await fetchOptedInUsers();
  await sendToUsers(
    all,
    '⏰ League + Playoffs starts in 15 minutes!',
    "Sign up now on the Tournaments page — it's not too late."
  );
}

// ===== RUN =====
(async function() {
  try {
    if (NOTIFICATION_TYPE === 'streak') await runStreak();
    else if (NOTIFICATION_TYPE === 'onthisday') await runOnThisDay();
    else if (NOTIFICATION_TYPE === 'weekly-leaderboard') await runWeeklyLeaderboard();
    else if (NOTIFICATION_TYPE === 'we-miss-you') await runWeMissYou();
    else if (NOTIFICATION_TYPE === 'tournament-signup') await runTournamentSignup();
    else if (NOTIFICATION_TYPE === 'knockout-starting-soon') await runKnockoutStartingSoon();
    else if (NOTIFICATION_TYPE === 'league-starting-soon') await runLeagueStartingSoon();
    process.exit(0);
  } catch (err) {
    console.error('Notification run failed:', err);
    process.exit(1);
  }
})();
