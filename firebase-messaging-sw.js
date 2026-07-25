// ===== CRICTAKKAR SERVICE WORKER =====
// Must live at the site root with this exact filename — Firebase's SDK looks for it
// here by default when registering for background push messages. Also doubles as the
// PWA's service worker (offline caching) — a single file, single registration, since a
// page can only cleanly have one service worker controlling it at the root scope.

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

// ===== PWA OFFLINE CACHING =====
// Bump this version any time site files change in a way that matters offline — old
// caches get cleaned up automatically on activate.
const CACHE_NAME = 'crictakkar-v1';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
             .map(function(name) { return caches.delete(name); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// Network-first, falling back to cache when offline. Deliberately NOT a cache-first/
// precache-everything strategy — this site pushes content updates (new quiz questions,
// Wordle players, etc.) constantly, and users should always see the freshest version
// when online. Cache only exists as an offline safety net, populated as pages are
// actually visited, and only for this site's own files (never Firebase/Firestore calls,
// which must always hit the network for real data).
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  if (event.request.url.indexOf(self.location.origin) !== 0) return;

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});
