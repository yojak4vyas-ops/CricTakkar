// ===== CRICTAKKAR — SCHEDULED PUSH NOTIFICATION SENDER =====
// Run by GitHub Actions on a schedule (see .github/workflows/send-notifications.yml).
// Not part of the deployed website — this only runs in GitHub's cloud, never in a
// user's browser, because it needs the private Firebase service-account key.
//
// Usage: node send-notifications.js <type>
//   type is one of: streak | onthisday | weekly-leaderboard | we-miss-you
//
// All 4 notification types were agreed with the user on Day 35/36 — see CLAUDE.md's
// Current Build Status for the reasoning behind each one's content and timing.

const admin = require('firebase-admin');
const path = require('path');

const NOTIFICATION_TYPE = process.argv[2];
const VALID_TYPES = ['streak', 'onthisday', 'weekly-leaderboard', 'we-miss-you'];

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
        await db.collection('users').doc(u.uid).update({
          notificationsEnabled: false,
          fcmToken: admin.firestore.FieldValue.delete()
        });
        cleared++;
      } else {
        console.error('Send failed for ' + u.uid + ':', code || err.message);
      }
    }
  }

  console.log(NOTIFICATION_TYPE + ': ' + sent + ' sent, ' + failed + ' failed (' + cleared + ' dead tokens cleared), out of ' + users.length + ' targeted.');
}

// ===== FETCH ALL NOTIFICATION-ENABLED USERS =====
// One read per run regardless of type — cheap even at thousands of users, since this
// only fires a handful of times per day/week, not per page view (unlike the Stats
// Dashboard's Percentile Rank card, which is a separate, already-flagged scaling note).
async function fetchOptedInUsers() {
  var snap = await db.collection('users').where('notificationsEnabled', '==', true).get();
  var users = [];
  snap.forEach(function(doc) {
    var d = doc.data();
    if (d.fcmToken) {
      users.push({
        uid: doc.id,
        fcmToken: d.fcmToken,
        lastPlayedDate: d.lastPlayedDate || '',
        currentStreak: d.currentStreak || 0
      });
    }
  });
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

// ===== RUN =====
(async function() {
  try {
    if (NOTIFICATION_TYPE === 'streak') await runStreak();
    else if (NOTIFICATION_TYPE === 'onthisday') await runOnThisDay();
    else if (NOTIFICATION_TYPE === 'weekly-leaderboard') await runWeeklyLeaderboard();
    else if (NOTIFICATION_TYPE === 'we-miss-you') await runWeMissYou();
    process.exit(0);
  } catch (err) {
    console.error('Notification run failed:', err);
    process.exit(1);
  }
})();
