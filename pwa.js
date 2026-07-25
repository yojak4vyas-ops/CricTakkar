// ===== CRICTAKKAR PWA — SERVICE WORKER REGISTRATION + INSTALL PROMPT =====
// Included on every page so the site is installable and gets offline caching regardless
// of which page a visitor lands on first. Separate from notifications.js, which handles
// the push-notification opt-in specifically — this file is about the app-like experience
// (home screen icon, offline fallback), not notifications.

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').catch(function(err) {
      console.error('Service worker registration failed:', err);
    });
  });
}

// ===== INSTALL PROMPT =====
// Browsers fire this event when the site meets install criteria (manifest + service
// worker + HTTPS). Calling preventDefault() suppresses the browser's own mini-infobar
// so we can show our own button instead, at a spot that doesn't get in the way.
var ctDeferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault();
  ctDeferredInstallPrompt = event;
  showInstallButton();
});

function showInstallButton() {
  if (document.getElementById('ctInstallBtn')) return; // already showing
  if (localStorage.getItem('ctInstallDismissed') === 'true') return;

  var btn = document.createElement('button');
  btn.id = 'ctInstallBtn';
  btn.className = 'ct-install-btn';
  btn.innerHTML = '📲 Install App';
  btn.onclick = function() {
    btn.remove();
    if (!ctDeferredInstallPrompt) return;
    ctDeferredInstallPrompt.prompt();
    ctDeferredInstallPrompt.userChoice.then(function() {
      ctDeferredInstallPrompt = null;
    });
  };

  var closeBtn = document.createElement('span');
  closeBtn.className = 'ct-install-close';
  closeBtn.innerHTML = '✕';
  closeBtn.onclick = function(e) {
    e.stopPropagation();
    localStorage.setItem('ctInstallDismissed', 'true');
    btn.remove();
  };
  btn.appendChild(closeBtn);

  document.body.appendChild(btn);
}

// Once actually installed, no point showing the button again.
window.addEventListener('appinstalled', function() {
  ctDeferredInstallPrompt = null;
  var btn = document.getElementById('ctInstallBtn');
  if (btn) btn.remove();
});
