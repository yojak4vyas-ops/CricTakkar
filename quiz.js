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

  // Save score to Firebase
  saveScoreToFirebase(score, 5);
}

// ===== SAVE SCORE TO FIREBASE =====
function saveScoreToFirebase(finalScore, total) {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      var xpEarned = finalScore * 10;
      var userRef = db.collection('users').doc(user.uid);

      userRef.get().then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          var newXP = (data.xp || 0) + xpEarned;
          var newLevel = calculateLevel(newXP);

          // ===== STREAK LOGIC =====
          var today = new Date();
          var todayStr = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');

          var lastPlayed = data.lastPlayedDate || '';
          var currentStreak = data.currentStreak || 0;
          var bestStreak = data.bestStreak || 0;

          var yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          var yesterdayStr = yesterday.getFullYear() + '-' +
            String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
            String(yesterday.getDate()).padStart(2, '0');

          if (lastPlayed === todayStr) {
            // Already played today — streak unchanged
            console.log('Already played today — streak unchanged');
          } else if (lastPlayed === yesterdayStr) {
            // Played yesterday — increase streak
            currentStreak = currentStreak + 1;
            console.log('Streak increased to ' + currentStreak);
          } else {
            // Missed a day or first time — reset to 1
            currentStreak = 1;
            console.log('Streak reset to 1');
          }

          if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
          }
          // ===== END STREAK LOGIC =====

          userRef.update({
            quizzesPlayed: (data.quizzesPlayed || 0) + 1,
            totalScore: (data.totalScore || 0) + finalScore,
            totalQuestions: (data.totalQuestions || 0) + total,
            xp: newXP,
            level: newLevel,
            currentStreak: currentStreak,
            bestStreak: bestStreak,
            lastPlayedDate: todayStr
          }).then(function() {
            console.log('✅ Score saved! +' + xpEarned + ' XP. Streak: ' + currentStreak);
            showStreakMessage(currentStreak);
          }).catch(function(error) {
            console.error('❌ Error updating score:', error);
          });
        }
      }).catch(function(error) {
        console.error('❌ Error getting user data:', error);
      });
    } else {
      console.log('ℹ️ No user logged in — score not saved');
    }
  });
}

// ===== SHOW STREAK MESSAGE ON SCORE SCREEN =====
function showStreakMessage(streak) {
  if (streak < 2) return;

  var message = '';
  if (streak === 2) message = '🔥 2 day streak! You are on a roll!';
  else if (streak === 3) message = '🔥🔥 3 days in a row! Keep it going!';
  else if (streak === 7) message = '🏆 7 day streak! One full week — legend!';
  else if (streak >= 30) message = '👑 ' + streak + ' day streak! You are a CricTakkar god!';
  else message = '🔥 ' + streak + ' day streak! Do not break it!';

  var scoreCard = document.querySelector('#scoreScreen .quiz-card');
  if (scoreCard) {
    var streakDiv = document.createElement('div');
    streakDiv.style.cssText =
      'background: linear-gradient(135deg, rgba(255,107,53,0.2), rgba(247,147,30,0.15));' +
      'border: 1px solid rgba(255,107,53,0.5);' +
      'border-radius: 12px;' +
      'padding: 14px;' +
      'margin-top: 16px;' +
      'text-align: center;' +
      'font-weight: 700;' +
      'color: #f7931e;' +
      'font-size: 1rem;';
    streakDiv.textContent = message;
    scoreCard.appendChild(streakDiv);
  }
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

// ===== GENERATE AND SHARE SCORE CARD IMAGE =====
function shareScore() {
  generateScoreCard(function(imageDataUrl) {
    // Try native share (works on Android/iPhone)
    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'crictakkar-score.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({
            title: 'CricTakkar Quiz Score',
            text: '🏏 I scored ' + score + '/5 on CricTakkar! Can you beat me? crictakkar.in',
            files: [file]
          });
        } else {
          // Fallback — just download the image
          downloadScoreCard(imageDataUrl);
        }
      });
  });
}

// ===== DOWNLOAD SCORE CARD =====
function downloadScoreCard(imageDataUrl) {
  const link = document.createElement('a');
  link.download = 'crictakkar-score.png';
  link.href = imageDataUrl;
  link.click();
  alert('Score card saved! Now share it on WhatsApp or Instagram. 🏏');
}

// ===== DRAW THE SCORE CARD ON A CANVAS =====
function generateScoreCard(callback) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // --- Background gradient ---
  const bg = ctx.createLinearGradient(0, 0, 1080, 1080);
  bg.addColorStop(0, '#0a0a0f');
  bg.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1080, 1080);

  // --- Orange top border stripe ---
  const stripe = ctx.createLinearGradient(0, 0, 1080, 0);
  stripe.addColorStop(0, '#ff6b35');
  stripe.addColorStop(1, '#f7931e');
  ctx.fillStyle = stripe;
  ctx.fillRect(0, 0, 1080, 12);

  // --- Decorative circle (background) ---
  ctx.beginPath();
  ctx.arc(540, 540, 420, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 107, 53, 0.08)';
  ctx.lineWidth = 80;
  ctx.stroke();

  // --- LOGO PLACEHOLDER (cricket ball emoji big) ---
  ctx.font = '100px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏏', 540, 200);

  // --- CricTakkar name ---
  ctx.font = 'bold 90px Arial';
  ctx.textAlign = 'center';
  const nameGrad = ctx.createLinearGradient(300, 0, 780, 0);
  nameGrad.addColorStop(0, '#ff6b35');
  nameGrad.addColorStop(1, '#f7931e');
  ctx.fillStyle = nameGrad;
  ctx.fillText('CricTakkar', 540, 310);

  // --- Tagline ---
  ctx.font = '36px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Cricket. Quiz. Battle.', 540, 370);

  // --- Divider line ---
  ctx.beginPath();
  ctx.moveTo(200, 410);
  ctx.lineTo(880, 410);
  ctx.strokeStyle = 'rgba(255,107,53,0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // --- Score display ---
  ctx.font = 'bold 200px Arial';
  ctx.textAlign = 'center';
  const scoreGrad = ctx.createLinearGradient(300, 430, 780, 630);
  scoreGrad.addColorStop(0, '#ff6b35');
  scoreGrad.addColorStop(1, '#f7931e');
  ctx.fillStyle = scoreGrad;
  ctx.fillText(score + '/5', 540, 640);

  // --- Score label ---
  const scoreData = getScoreData(score);
  ctx.font = 'bold 52px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(scoreData.title, 540, 710);

  // --- Dot breakdown ---
  const dotSize = 60;
  const dotGap = 30;
  const totalWidth = (dotSize + dotGap) * 5 - dotGap;
  const startX = (1080 - totalWidth) / 2;
  results.forEach(function(isCorrect, i) {
    const x = startX + i * (dotSize + dotGap);
    const y = 760;
    ctx.beginPath();
    ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = isCorrect ? '#27ae60' : '#e74c3c';
    ctx.fill();
    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(isCorrect ? '✓' : '✗', x + dotSize / 2, y + dotSize / 2 + 13);
  });

  // --- Streak (fetched from Firebase if logged in) ---
  try {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        db.collection('users').doc(user.uid).get().then(function(doc) {
          if (doc.exists) {
            var streak = doc.data().currentStreak || 0;
            drawStreakAndFinish(ctx, canvas, streak, callback);
          } else {
            drawStreakAndFinish(ctx, canvas, 0, callback);
          }
        });
      } else {
        drawStreakAndFinish(ctx, canvas, 0, callback);
      }
    });
  } catch(e) {
    drawStreakAndFinish(ctx, canvas, 0, callback);
  }
}

// ===== FINISH DRAWING AFTER STREAK IS KNOWN =====
function drawStreakAndFinish(ctx, canvas, streak, callback) {
  // --- Streak badge ---
  if (streak >= 2) {
    ctx.font = 'bold 44px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f7931e';
    ctx.fillText('🔥 ' + streak + ' Day Streak', 540, 910);
  }

  // --- Bottom tagline ---
  ctx.font = '38px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.textAlign = 'center';
  ctx.fillText('Aao CricTakkar karte hain!', 540, 980);

  // --- Orange bottom border stripe ---
  const stripe2 = ctx.createLinearGradient(0, 0, 1080, 0);
  stripe2.addColorStop(0, '#ff6b35');
  stripe2.addColorStop(1, '#f7931e');
  ctx.fillStyle = stripe2;
  ctx.fillRect(0, 1068, 1080, 12);

  // --- Convert to image and return ---
  const imageDataUrl = canvas.toDataURL('image/png');
  callback(imageDataUrl);
}

// ===== PLAY AGAIN =====
function restartQuiz() {
  document.getElementById('scoreScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'flex';
}
