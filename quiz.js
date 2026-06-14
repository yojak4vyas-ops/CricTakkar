// ===== CRICTAKKAR QUIZ ENGINE =====

// These variables track the quiz state
let currentQuestions = [];   // The 5 questions chosen for this session
let currentIndex = 0;        // Which question we are on (0 to 4)
let score = 0;               // How many correct answers
let timerInterval = null;    // The countdown timer
let timeLeft = 15;           // Seconds remaining
let answered = false;        // Has the user answered this question?
let results = [];            // Stores correct/wrong for each question

// ===== STEP 1: START THE QUIZ =====
function startQuiz() {
  // Pick 5 random questions from the question bank
  currentQuestions = getRandomQuestions(5);
  currentIndex = 0;
  score = 0;
  results = [];

  // Hide start screen, show question screen
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'flex';

  // Load the first question
  loadQuestion();
}

// ===== PICK RANDOM QUESTIONS =====
function getRandomQuestions(count) {
  // Shuffle the full question bank and take the first 'count' questions
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ===== LOAD A QUESTION ONTO THE SCREEN =====
function loadQuestion() {
  answered = false;
  timeLeft = 15;

  const q = currentQuestions[currentIndex];

  // Update progress bar (20% per question)
  const progress = ((currentIndex) / 5) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  // Update question counter text
  document.getElementById('questionCounter').textContent =
    'Question ' + (currentIndex + 1) + ' of 5';

  // Update timer display
  document.getElementById('timerNumber').textContent = timeLeft;
  const timerCircle = document.getElementById('timerCircle');
  timerCircle.classList.remove('danger');

  // Set the question text
  document.getElementById('questionText').textContent = q.question;

  // Set the 4 option buttons
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, index) => {
    btn.textContent = q.options[index];
    btn.className = 'option-btn';   // Reset any colour from previous question
    btn.disabled = false;
  });

  // Hide the fact box
  document.getElementById('factBox').style.display = 'none';

  // Start the countdown timer
  startTimer();
}

// ===== COUNTDOWN TIMER =====
function startTimer() {
  // Clear any previous timer
  clearInterval(timerInterval);

  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timerNumber').textContent = timeLeft;

    // When 5 seconds left, turn timer red and pulsing
    if (timeLeft <= 5) {
      document.getElementById('timerCircle').classList.add('danger');
    }

    // Time is up — treat as wrong answer
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
  results.push(false);  // Wrong (no answer = wrong)

  // Disable all buttons
  disableAllOptions();

  // Highlight the correct answer in green
  document.getElementById('opt' + currentQuestions[currentIndex].correct)
    .classList.add('correct');

  // Show the fun fact
  showFact("⏰ Time's up! The correct answer was highlighted above.");
}

// ===== USER SELECTS AN ANSWER =====
function selectAnswer(selectedIndex) {
  // Ignore if already answered
  if (answered) return;
  answered = true;

  // Stop the timer
  clearInterval(timerInterval);

  const correctIndex = currentQuestions[currentIndex].correct;
  const isCorrect = selectedIndex === correctIndex;

  // Disable all buttons so user can't click again
  disableAllOptions();

  if (isCorrect) {
    // Correct — turn selected button green
    score++;
    results.push(true);
    document.getElementById('opt' + selectedIndex).classList.add('correct');
  } else {
    // Wrong — turn selected button red, reveal correct in green
    results.push(false);
    document.getElementById('opt' + selectedIndex).classList.add('wrong');
    document.getElementById('opt' + correctIndex).classList.add('correct');
  }

  // Show the fun fact
  showFact(currentQuestions[currentIndex].fact);
}

// ===== SHOW FUN FACT =====
function showFact(factText) {
  document.getElementById('factText').textContent = factText;
  document.getElementById('factBox').style.display = 'block';

  // Change "Next Question" button text on last question
  const nextBtn = document.querySelector('#factBox .btn-primary');
  if (currentIndex === 4) {
    nextBtn.textContent = 'See My Score 🏆';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// ===== DISABLE ALL OPTION BUTTONS =====
function disableAllOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
  });
}

// ===== MOVE TO NEXT QUESTION =====
function nextQuestion() {
  currentIndex++;

  if (currentIndex >= 5) {
    // All 5 questions done — show score screen
    showScoreScreen();
  } else {
    // Load the next question
    loadQuestion();
  }
}

// ===== SHOW FINAL SCORE =====
function showScoreScreen() {
  // Update progress bar to 100%
  document.getElementById('progressBar').style.width = '100%';

  // Hide question screen, show score screen
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('scoreScreen').style.display = 'flex';

  // Set the score number
  document.getElementById('scoreNumber').textContent = score;

  // Set emoji, title, and message based on score
  const scoreData = getScoreData(score);
  document.getElementById('scoreEmoji').textContent = scoreData.emoji;
  document.getElementById('scoreTitle').textContent = scoreData.title;
  document.getElementById('scoreMessage').textContent = scoreData.message;

  // Show breakdown dots (green tick or red cross for each question)
  const breakdown = document.getElementById('scoreBreakdown');
  breakdown.innerHTML = '';
  results.forEach(function(isCorrect) {
    const dot = document.createElement('div');
    dot.className = 'breakdown-dot ' + (isCorrect ? 'correct' : 'wrong');
    dot.textContent = isCorrect ? '✓' : '✗';
    breakdown.appendChild(dot);
  });
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

  // Try to use the phone's share feature first
  if (navigator.share) {
    navigator.share({
      title: 'CricTakkar Quiz Score',
      text: scoreText
    });
  } else {
    // On desktop, copy to clipboard
    navigator.clipboard.writeText(scoreText).then(function() {
      alert('Score copied! Paste it on WhatsApp or Instagram. 🏏');
    });
  }
}

// ===== PLAY AGAIN =====
function restartQuiz() {
  // Reset everything and go back to start screen
  document.getElementById('scoreScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'flex';
}
