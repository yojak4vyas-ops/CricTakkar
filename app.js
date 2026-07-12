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

// ===== LIVE STATS STRIP =====
// Pulls real counts from questions.js and category-questions.js instead of a
// hardcoded number, so the home page never goes stale as the question bank grows.
function renderLiveStats() {
  var totalEl = document.getElementById('statTotalQuestions');
  var catEl = document.getElementById('statTotalCategories');
  if (!totalEl || !catEl) return;

  var total = 0;
  var categoryCount = 0;

  if (typeof questionBank !== 'undefined') {
    total += questionBank.length;
    categoryCount += 1; // Daily Quiz counts as its own category
  }

  if (typeof categoryQuestions !== 'undefined') {
    Object.keys(categoryQuestions).forEach(function(key) {
      total += categoryQuestions[key].length;
      categoryCount += 1;
    });
  }

  totalEl.textContent = total > 0 ? total : '—';
  catEl.textContent = categoryCount > 0 ? categoryCount : '—';
}

document.addEventListener('DOMContentLoaded', renderLiveStats);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('🏏 CricTakkar loaded successfully! Aao CricTakkar karte hain!');
