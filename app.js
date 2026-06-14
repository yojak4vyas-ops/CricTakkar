// ===== POPUP FUNCTIONS =====
// This shows the "Coming Soon" popup when a button is clicked
function showComingSoon() {
  const overlay = document.getElementById('popupOverlay');
  overlay.classList.add('active');
}

// This closes the popup when user clicks "Got it!"
function closePopup() {
  const overlay = document.getElementById('popupOverlay');
  overlay.classList.remove('active');
}

// Also close popup if user clicks the dark background area
document.getElementById('popupOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closePopup();
  }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('🏏 CricTakkar loaded successfully! Aao CricTakkar karte hain!');
