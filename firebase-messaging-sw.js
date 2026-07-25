// ===== CRICTAKKAR PUSH NOTIFICATIONS — SERVICE WORKER =====
// Must live at the site root with this exact filename — Firebase's SDK looks for it
// here by default when registering for background push messages.
// Handles notifications that arrive while the CricTakkar tab is closed or in the background.

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBYOs-GNvpmbp6gGM5A5N2A4nPT2wvMfbE",
  authDomain: "crictakkar-44c10.firebaseapp.com",
  projectId: "crictakkar-44c10",
  storageBucket: "crictakkar-44c10.firebasestorage.app",
  messagingSenderId: "96883177573",
  appId: "1:96883177573:web:215aba6e651fbac6086e8c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  var title = (payload.notification && payload.notification.title) || 'CricTakkar';
  var options = {
    body: (payload.notification && payload.notification.body) || '',
    badge: undefined,
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

// Clicking a notification focuses/opens the CricTakkar tab instead of leaving a dead popup.
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if (clientList[i].url.indexOf(self.location.origin) === 0 && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
