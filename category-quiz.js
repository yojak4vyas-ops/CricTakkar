// ===== CRICTAKKAR CATEGORY QUIZ ENGINE =====

const selectedCategory = localStorage.getItem('selectedCategory') || 'ipl';

const categoryInfo = {
  ipl: { title: 'IPL Quiz', icon: '🏏' },
  test: { title: 'Test Cricket Quiz', icon: '🎩' },
  odi: { title: 'ODI Cricket Quiz', icon: '🌍' },
  t20: { title: 'T20 World Cup Quiz', icon: '⚡' }
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 15;
let answered = false;
let results = [];
const TOTAL_QUESTIONS = 10;

// ===== SET UP START SCREEN =====
window.onload = function() {
  const info = categoryInfo[selectedCategory];
  document.getElementById('categoryTitle').textContent = info.title;
  document.getElementById('categoryIcon').textContent = info.icon;
};

// ===== START THE QUIZ =====
function startCategoryQuiz() {
  const allQuestions = categoryQuestions[selectedCategory];

  currentQuestions = [...allQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, TOTAL_QUESTIONS);

  currentIndex = 0;
  score = 0;
  results = [];

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'flex';

  loadQuestion();
}

// ===== LOAD A QUESTION =====
function loadQuestion() {
  answered = false;
  timeLeft = 15;

  const q = currentQuestions[currentIndex];

  const progress = (currentIndex / TOTAL_QUESTIONS) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  document.getElementById('questionCounter').textContent =
    'Question ' + (currentIndex + 1) + ' of ' + TOTAL_QUESTIONS;

  document.getElementById('timerNumber').textContent = timeLeft;
  document.getElementById('timerCircle').classList.remove('danger');

  document.getElementById('questionText').textContent = q.question;

  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(function(btn, index) {
    btn.textContent = q.options[index];
    btn.className = 'option-btn';
    btn.disabled = false;
  });

  document.getElementById('factBox').style.display = 'none';

  startTimer();
}

// ===== TIMER =====
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timerNumber').textContent = timeLeft;

    if (timeLeft <= 5) {
      document.getElementById('timerCircle').classList.add('danger');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) {
        timeUp();
      }
    }
  }, 1000);
}

// ===== TIME UP =====
function timeUp() {
  answered = true;
  results.push(false);
  disableAllOptions();
  document.getElementById('opt' + currentQuestions[currentIndex].correct)
    .classList.add('correct');
  showFact("⏰ Time's up! The correct answer was highlighted above.");
}

// ===== SELECT ANSWER =====
function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const correctIndex = currentQuestions[currentIndex].correct;
  const isCorrect = selectedIndex === correctIndex;

  disableAllOptions();

  if (isCorrect) {
    score++;
    results.push(true);
    document.getElementById('opt' + selectedIndex).classList.add('correct');
  } else {
    results.push(false);
    document.getElementById('opt' + selectedIndex).classList.add('wrong');
    document.getElementById('opt' + correctIndex).classList.add('correct');
  }

  showFact(currentQuestions[currentIndex].fact);
}

// ===== SHOW FACT =====
function showFact(factText) {
  document.getElementById('factText').textContent = factText;
  document.getElementById('factBox').style.display = 'block';

  const nextBtn = document.querySelector('#factBox .btn-primary');
  if (currentIndex === TOTAL_QUESTIONS - 1) {
    nextBtn.textContent = 'See My Score 🏆';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// ===== DISABLE OPTIONS =====
function disableAllOptions() {
  document.querySelectorAll('.option-btn').forEach(function(btn) {
    btn.disabled = true;
  });
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= TOTAL_QUESTIONS) {
    showScoreScreen();
  } else {
    loadQuestion();
  }
}

// ===== SCORE SCREEN =====
function showScoreScreen() {
  document.getElementById('progressBar').style.width = '100%';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('scoreScreen').style.display = 'flex';

  document.getElementById('scoreNumber').textContent = score;
  document.getElementById('scoreOutOf').textContent = '/' + TOTAL_QUESTIONS;

  const scoreData = getScoreData(score, TOTAL_QUESTIONS);
  document.getElementById('scoreEmoji').textContent = scoreData.emoji;
  document.getElementById('scoreTitle').textContent = scoreData.title;
  document.getElementById('scoreMessage').textContent = scoreData.message;

  const breakdown = document.getElementById('scoreBreakdown');
  breakdown.innerHTML = '';
  results.forEach(function(isCorrect) {
    const dot = document.createElement('div');
    dot.className = 'breakdown-dot ' + (isCorrect ? 'correct' : 'wrong');
    dot.textContent = isCorrect ? '✓' : '✗';
    breakdown.appendChild(dot);
  });

  // Save score to Firebase
  saveScoreToFirebase(score, TOTAL_QUESTIONS);
}

// ===== SAVE SCORE TO FIREBASE =====
function saveScoreToFirebase(score, total) {
  var user = auth.currentUser;
  if (!user) {
    console.log('No user logged in — score not saved');
    return;
  }

  var xpEarned = score * 10;
  var userRef = db.collection('users').doc(user.uid);

  userRef.get().then(function(doc) {
    if (doc.exists) {
      var data = doc.data();
      var newXP = (data.xp || 0) + xpEarned;
      var newLevel = calculateLevel(newXP);

      userRef.update({
        quizzesPlayed: (data.quizzesPlayed || 0) + 1,
        totalScore: (data.totalScore || 0) + score,
        totalQuestions: (data.totalQuestions || 0) + total,
        xp: newXP,
        level: newLevel
      }).then(function() {
        console.log('Category score saved! +' + xpEarned + ' XP');
      });
    }
  }).catch(function(error) {
    console.error('Error saving score:', error);
  });
}

// ===== CALCULATE LEVEL =====
function calculateLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}

// ===== SCORE MESSAGE =====
function getScoreData(score, total) {
  const percent = score / total;
  if (percent === 1) return {
    emoji: '🏆', title: 'Perfect Score! Absolute Legend!',
    message: 'You got every single question right. You know this format inside out!'
  };
  if (percent >= 0.8) return {
    emoji: '🌟', title: 'Excellent! Almost Perfect!',
    message: 'Outstanding cricket knowledge. Just a couple slipped away!'
  };
  if (percent >= 0.6) return {
    emoji: '👏', title: 'Good Game!',
    message: 'Solid performance! Keep playing to sharpen your knowledge.'
  };
  if (percent >= 0.4) return {
    emoji: '🏏', title: 'Getting There!',
    message: 'Not bad! The fun facts will help you improve fast.'
  };
  return {
    emoji: '😬', title: 'Tough Day at the Crease!',
    message: "Don't give up! Even legends had bad days. Come back and try again!"
  };
}

// ===== SHARE SCORE =====
function shareScore() {
  const info = categoryInfo[selectedCategory];
  const shareText =
    '🏏 I scored ' + score + '/' + TOTAL_QUESTIONS +
    ' on the CricTakkar ' + info.title + '!\n' +
    'Can you beat me? Play free at crictakkar.in\n' +
    '#CricTakkar #Cricket #CricketQuiz';

  if (navigator.share) {
    navigator.share({ title: 'CricTakkar Quiz Score', text: shareText });
  } else {
    navigator.clipboard.writeText(shareText).then(function() {
      alert('Score copied! Paste it on WhatsApp or Instagram. 🏏');
    });
  }
}

// ===== RESTART =====
function restartQuiz() {
  document.getElementById('scoreScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'flex';
}
