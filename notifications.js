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
