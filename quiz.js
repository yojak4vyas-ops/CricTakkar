// ===== CRICTAKKAR QUIZ ENGINE =====

// These variables track the quiz state
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 15;
let answered = false;
let results = [];

// ===== FIREBASE SETUP =====
// Load Firebase to save quiz results
var firebaseScript1 = document.createElement('script');
firebaseScript1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
document.head.appendChild(firebaseScript1);

firebaseScript1.onload = function() {
  var firebaseScript2 = document.createElement('script');
  firebaseScript2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';
  document.head.appendChild(firebaseScript2);

  firebaseScript2.onload = function() {
    var firebaseScript3 = document.createElement('script');
    firebaseScript3.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
    document.head.appendChild(firebaseScript3);

    firebaseScript3.onload = function() {
      const firebaseConfig = {
        apiKey: "AIzaSyBYOs-GNvpmbp6gGM5A5N2A4nPT2wvMfbE",
        authDomain: "crictakkar-44c10.firebaseapp.com",
        projectId: "crictakkar-44c10",
        storageBucket: "crictakkar-44c10.firebasestorage.app",
        messagingSenderId: "96883177573",
        appId: "1:96883177573:web:215aba6e651fbac6086e8c"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      window.firebaseAuth = firebase.auth();
      window.firebaseDb = firebase.firestore();
    };
  };
};

// ===== START THE QUIZ =====
function startQuiz() {
  currentQuestions = getRandomQuestions(5);
  currentIndex = 0;
  score = 0;
  results = [];

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'flex';

  loadQuestion();
}

// ===== PICK RANDOM QUESTIONS =====
function getRandomQuestions(count) {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ===== LOAD A QUESTION =====
function loadQuestion() {
  answered = false;
  timeLeft = 15;

  const q = currentQuestions[currentIndex];

  const progress = ((currentIndex) / 5) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  document.getElementById('questionCounter').textContent =
    'Question ' + (currentIndex + 1) + ' of 5';

  document.getElementById('timerNumber').textContent = timeLeft;
  const timerCircle = document.getElementById('timerCircle');
  timerCircle.classList.remove('danger');

  document.getElementById('questionText').textContent = q.question;

  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.className = 'option-btn';
    btn.disabled = false;
  });

  document.getElementById('factBox').style.display = 'none';

  startTimer();
}

// ===== COUNTDOWN TIMER =====
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

// ===== TIME RAN OUT =====
function timeUp() {
  answered = true;
  results.push(false);

  disableAllOptions();

  document.getElementById('opt' + currentQuestions[currentIndex].correct)
    .classList.add('correct');

  showFact("⏰ Time's up! The correct answer was highlighted above.");
}

// ===== USER SELECTS AN ANSWER =====
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

// ===== SHOW FUN FACT =====
function showFact(factText) {
  document.getElementById('factText').textContent = factText;
  document.getElementById('factBox').style.display = 'block';

  const nextBtn = document.querySelector('#factBox .btn-primary');
  if (currentIndex === 4) {
    nextBtn.textContent = 'See My Score 🏆';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// ===== DISABLE ALL OPTIONS =====
function disableAllOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
  });
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  currentIndex++;

  if (currentIndex >= 5) {
    showScoreScreen();
  } else {
    loadQuestion();
  }
}

// ===== SHOW FINAL SCORE =====
function showScoreScreen() {
  document.getElementById('progressBar').style.width = '100%';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('scoreScreen').style.display = 'flex';
  document.getElementById('scoreNumber').textContent = score;

  const scoreData = getScoreData(score);
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

  // ===== SAVE TO FIREBASE =====
  saveScoreToFirebase(score, 5);
}

// ===== SAVE SCORE TO FIREBASE =====
function saveScoreToFirebase(score, total) {
  // Wait for Firebase to be ready
  var attempts = 0;
  var interval = setInterval(function() {
    attempts++;
    if (window.firebaseAuth && window.firebaseDb) {
      clearInterval(interval);

      var user = window.firebaseAuth.currentUser;
      if (user) {
        var userRef = window.firebaseDb.collection('users').doc(user.uid);
        var xpEarned = score * 10;

        // Get current data first
        userRef.get().then(function(doc) {
          if (doc.exists) {
            var data = doc.data();
            var newXP = (data.xp || 0) + xpEarned;
            var newLevel = calculateLevel(newXP);
            var newQuizzesPlayed = (data.quizzesPlayed || 0) + 1;
            var newTotalScore = (data.totalScore || 0) + score;
            var newTotalQuestions = (data.totalQuestions || 0) + total;

            userRef.update({
              quizzesPlayed: newQuizzesPlayed,
              totalScore: newTotalScore,
              totalQuestions: newTotalQuestions,
              xp: newXP,
              level: newLevel
            }).then(function() {
              console.log('Score saved! XP earned: ' + xpEarned);
            });
          }
        });
      }
    }
    if (attempts > 20) {
      clearInterval(interval);
      console.log('Firebase not ready — score not saved');
    }
  }, 500);
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

// ===== SCORE MESSAGE DATA =====
function getScoreData(score) {
  if (score === 5) return {
    emoji: '🏆',
    title: 'Perfect Score! Test Legend!',
    message: 'You got every single question right. You are a true cricket genius!'
  };
  if (score === 4) return {
    emoji: '🌟',
    title: 'Excellent! Almost Perfect!',
    message: 'Just one slip. Your cricket knowledge is seriously impressive!'
  };
  if (score === 3) return {
    emoji: '👏',
    title: 'Good Game!',
    message: 'Solid performance! Keep playing daily to improve your streak.'
  };
  if (score === 2) return {
    emoji: '🏏',
    title: 'Getting There!',
    message: 'Two right is a start. Play the daily quiz every day and improve!'
  };
  if (score === 1) return {
    emoji: '😅',
    title: 'Keep Practicing!',
    message: 'One right answer! The fun facts will help you learn fast.'
  };
  return {
    emoji: '😬',
    title: 'Tough Day at the Crease!',
    message: "Don't give up! Even Sachin had bad days. Come back tomorrow!"
  };
}

// ===== SHARE SCORE =====
function shareScore() {
  const scoreText =
    '🏏 I scored ' + score + '/5 on CricTakkar Daily Quiz!\n' +
    'Can you beat me? Play at crictakkar.in\n' +
    '#CricTakkar #Cricket #CricketQuiz';

  if (navigator.share) {
    navigator.share({
      title: 'CricTakkar Quiz Score',
      text: scoreText
    });
  } else {
    navigator.clipboard.writeText(scoreText).then(function() {
      alert('Score copied! Paste it on WhatsApp or Instagram. 🏏');
    });
  }
}

// ===== PLAY AGAIN =====
function restartQuiz() {
  document.getElementById('scoreScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'flex';
}
