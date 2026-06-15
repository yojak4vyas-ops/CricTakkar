// ===== CRICTAKKAR QUIZ ENGINE =====

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 15;
let answered = false;
let results = [];

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
  document.getElementById('timerCircle').classList.remove('danger');
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
      if (!answered) timeUp();
    }
  }, 1000);
}

// ===== TIME RAN OUT =====
function timeUp() {
  answered = true;
  results.push(false);
  disableAllOptions();
  document.getElementById('opt' + currentQuestions[currentIndex].correct).classList.add('correct');
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
  nextBtn.textContent = currentIndex === 4 ? 'See My Score 🏆' : 'Next Question →';
}

// ===== DISABLE ALL OPTIONS =====
function disableAllOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => { btn.disabled = true; });
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

  saveScoreToFirebase(score, 5);
}

// ===== SAVE SCORE TO FIREBASE =====
function saveScoreToFirebase(scoreVal, total) {
  // Wait until Firebase auth is ready
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      console.log('Not logged in — score not saved');
      return;
    }

    var xpEarned = scoreVal * 10;
    var userRef = firebase.firestore().collection('users').doc(user.uid);

    userRef.get().then(function(doc) {
      if (doc.exists) {
        var data = doc.data();
        var newXP = (data.xp || 0) + xpEarned;
        var newLevel = calculateLevel(newXP);

        userRef.update({
          quizzesPlayed: (data.quizzesPlayed || 0) + 1,
          totalScore: (data.totalScore || 0) + scoreVal,
          totalQuestions: (data.totalQuestions || 0) + total,
          xp: newXP,
          level: newLevel
        }).then(function() {
          console.log('✅ Daily quiz score saved! +' + xpEarned + ' XP');
        });
      }
    }).catch(function(error) {
      console.error('Error saving score:', error);
    });
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

// ===== SCORE MESSAGE DATA =====
function getScoreData(score) {
  if (score === 5) return { emoji: '🏆', title: 'Perfect Score! Test Legend!', message: 'You got every single question right. You are a true cricket genius!' };
  if (score === 4) return { emoji: '🌟', title: 'Excellent! Almost Perfect!', message: 'Just one slip. Your cricket knowledge is seriously impressive!' };
  if (score === 3) return { emoji: '👏', title: 'Good Game!', message: 'Solid performance! Keep playing daily to improve your streak.' };
  if (score === 2) return { emoji: '🏏', title: 'Getting There!', message: 'Two right is a start. Play the daily quiz every day and improve!' };
  if (score === 1) return { emoji: '😅', title: 'Keep Practicing!', message: 'One right answer! The fun facts will help you learn fast.' };
  return { emoji: '😬', title: 'Tough Day at the Crease!', message: "Don't give up! Even Sachin had bad days. Come back tomorrow!" };
}

// ===== SHARE SCORE =====
function shareScore() {
  const scoreText =
    '🏏 I scored ' + score + '/5 on CricTakkar Daily Quiz!\n' +
    'Can you beat me? Play at crictakkar.in\n' +
    '#CricTakkar #Cricket #CricketQuiz';

  if (navigator.share) {
    navigator.share({ title: 'CricTakkar Quiz Score', text: scoreText });
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
