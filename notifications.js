// ===== CRICTAKKAR PUSH NOTIFICATIONS — CLIENT OPT-IN =====
// Shared by any page that includes it after Firebase Auth + Firestore + Messaging are
// initialized. Handles: asking the browser for permission, fetching an FCM token, saving
// it to the user's Firestore doc, and turning notifications back off.
//
// SETUP NEEDED (one-time, from Firebase Console -> Project Settings -> Cloud Messaging ->
// Web configuration -> Web Push certificates -> generate/copy the key pair):
// paste the key below. This is a PUBLIC key, safe to keep in client-side code.
const VAPID_KEY = "BBtGrm4WO8_oOzHXHNb8_HG82d4fZCDyifQztf2cHo9YjA6CzIGsAoAO08chKpXYl-GdRJDqdvzi51gPPLK-vdE";

var ctMessaging = null;
try {
  if (firebase.messaging.isSupported && firebase.messaging.isSupported()) {
    ctMessaging = firebase.messaging();
  }
} catch (e) {
  console.log('Push notifications not supported in this browser.');
}

function notificationsSupported() {
  return !!ctMessaging && typeof Notification !== 'undefined';
}

function getNotificationPermissionState() {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission; // 'default' | 'granted' | 'denied'
}

// Call on a user click (button), not on page load — browsers require a user gesture.
function enableNotifications(onDone) {
  if (!notificationsSupported()) {
    onDone && onDone(false, 'Push notifications aren\'t supported in this browser.');
    return;
  }
  if (VAPID_KEY === "PASTE_YOUR_VAPID_KEY_HERE") {
    onDone && onDone(false, 'Notifications aren\'t fully set up yet.');
    return;
  }

  Notification.requestPermission().then(function(permission) {
    if (permission !== 'granted') {
      onDone && onDone(false, 'Notifications permission was not granted.');
      return;
    }

    ctMessaging.getToken({ vapidKey: VAPID_KEY }).then(function(token) {
      var user = firebase.auth().currentUser;
      if (!user || !token) {
        onDone && onDone(false, 'Could not get a notification token.');
        return;
      }
      db.collection('users').doc(user.uid).update({
        fcmToken: token,
        notificationsEnabled: true
      }).then(function() {
        onDone && onDone(true, 'Notifications enabled!');
      }).catch(function(err) {
        console.error('Failed to save FCM token:', err);
        onDone && onDone(false, 'Could not save your notification settings.');
      });
    }).catch(function(err) {
      console.error('Failed to get FCM token:', err);
      onDone && onDone(false, 'Could not enable notifications.');
    });
  });
}

function disableNotifications(onDone) {
  var user = firebase.auth().currentUser;
  if (!user) { onDone && onDone(false); return; }
  db.collection('users').doc(user.uid).update({
    notificationsEnabled: false
  }).then(function() {
    onDone && onDone(true);
  }).catch(function(err) {
    console.error('Failed to disable notifications:', err);
    onDone && onDone(false);
  });
}

// Foreground messages (tab already open) don't trigger a native background push,
// so show a lightweight in-page toast instead.
if (notificationsSupported()) {
  ctMessaging.onMessage(function(payload) {
    var title = (payload.notification && payload.notification.title) || 'CricTakkar';
    var body = (payload.notification && payload.notification.body) || '';
    var toast = document.createElement('div');
    toast.className = 'ct-toast';
    toast.innerHTML = '<strong>' + title + '</strong><br>' + body;
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 6000);
  });
}

// ===== FIRST-QUIZ NOTIFICATION PROMPT =====
// Shown once, right after a user's very first completed quiz — the moment they're most
// likely to say yes — instead of relying only on the Profile page's quiet toggle.
// Reuses the site's existing .popup-overlay/.popup-box styling (same as the "Coming Soon"
// popup) so it looks native, no new CSS needed.
function maybeShowFirstQuizNotifPrompt(userDocData) {
  if (!notificationsSupported()) return;
  if (getNotificationPermissionState() !== 'default') return; // already granted, denied, or blocked
  if (userDocData.notificationsEnabled) return;
  if (userDocData.notifPromptShown) return;

  var user = firebase.auth().currentUser;
  if (!user) return;

  var overlay = document.createElement('div');
  overlay.className = 'popup-overlay active';
  overlay.innerHTML =
    '<div class="popup-box">' +
      '<div class="popup-icon">🔔</div>' +
      '<h3>Don\'t lose your streak!</h3>' +
      '<p>Turn on notifications and we\'ll remind you before your streak breaks, plus send daily cricket history and leaderboard updates.</p>' +
      '<button class="btn-primary" id="firstQuizNotifEnable" style="width:100%; margin-bottom:12px;">Enable Notifications 🔔</button>' +
      '<button class="btn-secondary" id="firstQuizNotifSkip" style="width:100%;">Maybe Later</button>' +
    '</div>';
  document.body.appendChild(overlay);

  function closeAndMark() {
    overlay.remove();
    db.collection('users').doc(user.uid).update({ notifPromptShown: true }).catch(function(err) {
      console.error('Failed to mark notification prompt as shown:', err);
    });
  }

  document.getElementById('firstQuizNotifEnable').addEventListener('click', function() {
    enableNotifications(function() { closeAndMark(); });
  });
  document.getElementById('firstQuizNotifSkip').addEventListener('click', closeAndMark);
}
