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
// Pulls real counts from question-bank.js and poems.js instead of a hardcoded
// number, so the home page never goes stale as the question bank grows.
function renderLiveStats() {
  var totalEl = document.getElementById('statTotalQuestions');
  var catEl = document.getElementById('statTotalCategories');
  if (!totalEl || !catEl) return;

  var total = 0;
  var categoryCount = 0;

  if (typeof questionBank !== 'undefined') {
    total += questionBank.length;
    // Daily Quiz (draws from the whole bank) + the distinct category-quiz tags
    // represented inside it (ipl/test/odi/t20 — "general" has no tab of its own)
    var tags = {};
    questionBank.forEach(function(q) {
      if (q.category && q.category !== 'general') tags[q.category] = true;
    });
    categoryCount += 1 + Object.keys(tags).length;
  }

  if (typeof poetryQuizQuestions !== 'undefined') {
    total += poetryQuizQuestions.length;
    categoryCount += 1; // Poetry Quiz
  }

  totalEl.textContent = total > 0 ? total : '—';
  catEl.textContent = categoryCount > 0 ? categoryCount : '—';
}

document.addEventListener('DOMContentLoaded', renderLiveStats);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('🏏 CricTakkar loaded successfully! Aao CricTakkar karte hain!');
