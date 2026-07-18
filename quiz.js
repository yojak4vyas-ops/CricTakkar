// ===== CRICTAKKAR QUIZ ENGINE =====

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 15;
let answered = false;
let results = [];
let generatedCardDataUrl = null; // stores the card image after generation

// ===== START THE QUIZ =====
function startQuiz() {
  currentQuestions = getRandomQuestions(10);
  currentIndex = 0;
  score = 0;
  results = [];
  generatedCardDataUrl = null;

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

  const progress = ((currentIndex) / 10) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  document.getElementById('questionCounter').textContent =
    'Question ' + (currentIndex + 1) + ' of 10';

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
  if (currentIndex >= 10) {
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

  // Reset score card buttons and preview for fresh game
  document.getElementById('scoreCardPreview').style.display = 'none';
  document.getElementById('generateCardBtn').style.display = 'block';
  document.getElementById('shareCardBtn').style.display = 'none';
  document.getElementById('downloadCardBtn').style.display = 'none';
  generatedCardDataUrl = null;

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
  saveScoreToFirebase(score, 10);
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
            console.log('Already played today — streak unchanged');
          } else if (lastPlayed === yesterdayStr) {
            currentStreak = currentStreak + 1;
            console.log('Streak increased to ' + currentStreak);
          } else {
            currentStreak = 1;
            console.log('Streak reset to 1');
          }

          if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
          }
          // ===== END STREAK LOGIC =====

          // ===== BADGES — Perfectionist (Day 12) =====
          // Unlocked the moment a player scores a perfect 10/10 on the Mixed Category Quiz.
          var badges = data.badges || {};
          if (finalScore === total) {
            badges.perfectionist = true;
          }
          // ===== END BADGES =====

          // ===== QUIZ HISTORY — powers the Stats Dashboard's category/time stats =====
          var quizHistory = data.quizHistory || [];
          quizHistory.push({ category: 'Daily', score: finalScore, total: total, date: todayStr });
          if (quizHistory.length > 200) quizHistory = quizHistory.slice(quizHistory.length - 200);
          // ===== END QUIZ HISTORY =====

          // ===== ERA STATS — powers the Stats Dashboard's "weakest era" card =====
          var eraStats = mergeEraStats(data.eraStats || {}, currentQuestions, results);
          // ===== END ERA STATS =====

          userRef.update({
            quizzesPlayed: (data.quizzesPlayed || 0) + 1,
            totalScore: (data.totalScore || 0) + finalScore,
            totalQuestions: (data.totalQuestions || 0) + total,
            xp: newXP,
            level: newLevel,
            currentStreak: currentStreak,
            bestStreak: bestStreak,
            lastPlayedDate: todayStr,
            badges: badges,
            quizHistory: quizHistory,
            eraStats: eraStats
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

// ===== MERGE ERA STATS =====
// Adds this session's per-question correct/total counts (by era) into the running
// totals already saved on the user doc. "General" (timeless rules/definitions) is
// skipped since it isn't a real era and shouldn't count toward strongest/weakest.
function mergeEraStats(existing, questions, resultsArr) {
  var merged = {};
  for (var era in existing) merged[era] = { correct: existing[era].correct, total: existing[era].total };

  questions.forEach(function(q, i) {
    var era = q.era;
    if (!era || era === 'General') return;
    if (!merged[era]) merged[era] = { correct: 0, total: 0 };
    merged[era].total++;
    if (resultsArr[i]) merged[era].correct++;
  });

  return merged;
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
  if (score === 10) return {
    emoji: '🏆',
    title: 'Perfect Score! Test Legend!',
    message: 'You got every single question right. You are a true cricket genius!'
  };
  if (score >= 8) return {
    emoji: '🌟',
    title: 'Excellent! Almost Perfect!',
    message: 'Just a couple of slips. Your cricket knowledge is seriously impressive!'
  };
  if (score >= 6) return {
    emoji: '👏',
    title: 'Good Game!',
    message: 'Solid performance! Keep playing to improve your streak.'
  };
  if (score >= 4) return {
    emoji: '🏏',
    title: 'Getting There!',
    message: 'A decent start. Play more and improve!'
  };
  if (score >= 2) return {
    emoji: '😅',
    title: 'Keep Practicing!',
    message: 'A few right answers! The fun facts will help you learn fast.'
  };
  return {
    emoji: '😬',
    title: 'Tough Day at the Crease!',
    message: "Don't give up! Even Sachin had bad days. Come back tomorrow!"
  };
}

// ===== STEP 1: USER CLICKS "GENERATE SCORE CARD" =====
// This draws the card and shows a preview on screen
function generateAndShowCard() {
  var btn = document.getElementById('generateCardBtn');
  btn.textContent = 'Generating... ⏳';
  btn.disabled = true;

  generateScoreCard(function(dataUrl) {
    generatedCardDataUrl = dataUrl;

    // Show the preview image on screen
    var img = document.getElementById('scoreCardImage');
    img.src = dataUrl;
    document.getElementById('scoreCardPreview').style.display = 'block';

    // Hide generate button, show share + download buttons
    btn.style.display = 'none';
    document.getElementById('shareCardBtn').style.display = 'block';
    document.getElementById('downloadCardBtn').style.display = 'block';
  });
}

// ===== STEP 2A: SHARE ON WHATSAPP =====
function shareCardToWhatsApp() {
  var text = '🏏 I scored ' + score + '/10 on CricTakkar Mixed Category Quiz!\n' +
    '🔥 Test your cricket knowledge at crictakkar.in\n' +
    '#CricTakkar #Cricket #IndianCricket';
  var whatsappUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
  window.open(whatsappUrl, '_blank');
}

// ===== STEP 2B: DOWNLOAD FOR INSTAGRAM =====
function downloadCard() {
  if (!generatedCardDataUrl) return;
  var link = document.createElement('a');
  link.download = 'CricTakkar-Score.png';
  link.href = generatedCardDataUrl;
  link.click();
}

// ===== DRAW THE SCORE CARD (1080x1080 square — perfect for Instagram) =====
function generateScoreCard(callback) {
  var canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  var ctx = canvas.getContext('2d');

  // --- Dark background ---
  var bg = ctx.createLinearGradient(0, 0, 1080, 1080);
  bg.addColorStop(0, '#0a0a0f');
  bg.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1080, 1080);

  // --- Orange top stripe ---
  var stripe = ctx.createLinearGradient(0, 0, 1080, 0);
  stripe.addColorStop(0, '#ff6b35');
  stripe.addColorStop(1, '#f7931e');
  ctx.fillStyle = stripe;
  ctx.fillRect(0, 0, 1080, 14);

  // --- Big faint circle in background (decorative) ---
  ctx.beginPath();
  ctx.arc(540, 540, 400, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 107, 53, 0.07)';
  ctx.lineWidth = 100;
  ctx.stroke();

  // --- Cricket bat emoji as logo placeholder ---
  ctx.font = '110px serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏏', 540, 210);

  // --- CricTakkar title ---
  ctx.font = 'bold 96px Arial';
  var titleGrad = ctx.createLinearGradient(200, 0, 880, 0);
  titleGrad.addColorStop(0, '#ff6b35');
  titleGrad.addColorStop(1, '#f7931e');
  ctx.fillStyle = titleGrad;
  ctx.fillText('CricTakkar', 540, 330);

  // --- Tagline below title ---
  ctx.font = '38px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText('Cricket. Quiz. Battle.', 540, 390);

  // --- Horizontal divider line ---
  ctx.beginPath();
  ctx.moveTo(160, 430);
  ctx.lineTo(920, 430);
  ctx.strokeStyle = 'rgba(255,107,53,0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // --- Big score number ---
  ctx.font = 'bold 220px Arial';
  var scoreGrad = ctx.createLinearGradient(300, 440, 780, 660);
  scoreGrad.addColorStop(0, '#ff6b35');
  scoreGrad.addColorStop(1, '#f7931e');
  ctx.fillStyle = scoreGrad;
  ctx.fillText(score + '/10', 540, 660);

  // --- Score title text ---
  var scoreData = getScoreData(score);
  ctx.font = 'bold 50px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(scoreData.title, 540, 730);

  // --- Dot breakdown (green = correct, red = wrong) ---
  var dotRadius = 24;
  var dotGap = 16;
  var totalDotsWidth = (dotRadius * 2 + dotGap) * 10 - dotGap;
  var dotStartX = (1080 - totalDotsWidth) / 2 + dotRadius;
  var dotY = 800;

  results.forEach(function(isCorrect, i) {
    var cx = dotStartX + i * (dotRadius * 2 + dotGap);
    ctx.beginPath();
    ctx.arc(cx, dotY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = isCorrect ? '#27ae60' : '#e74c3c';
    ctx.fill();
    ctx.font = 'bold 38px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(isCorrect ? '✓' : '✗', cx, dotY + 14);
  });

  // --- Now fetch streak from Firebase and finish drawing ---
  try {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        db.collection('users').doc(user.uid).get().then(function(doc) {
          var streak = 0;
          if (doc.exists) {
            streak = doc.data().currentStreak || 0;
          }
          finishCardDrawing(ctx, canvas, streak, callback);
        }).catch(function() {
          finishCardDrawing(ctx, canvas, 0, callback);
        });
      } else {
        finishCardDrawing(ctx, canvas, 0, callback);
      }
    });
  } catch(e) {
    finishCardDrawing(ctx, canvas, 0, callback);
  }
}

// ===== FINISH THE CARD — add streak and bottom elements =====
function finishCardDrawing(ctx, canvas, streak, callback) {

  // --- Streak line (only if streak is 2 or more) ---
  if (streak >= 2) {
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f7931e';
    ctx.fillText('🔥 ' + streak + ' Day Streak!', 540, 900);
  }

  // --- Bottom tagline ---
  ctx.font = '36px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.textAlign = 'center';
  ctx.fillText('Aao CricTakkar karte hain!', 540, 970);

  // --- Orange bottom stripe ---
  var stripe2 = ctx.createLinearGradient(0, 0, 1080, 0);
  stripe2.addColorStop(0, '#ff6b35');
  stripe2.addColorStop(1, '#f7931e');
  ctx.fillStyle = stripe2;
  ctx.fillRect(0, 1066, 1080, 14);

  // --- Convert canvas to image and send back ---
  var dataUrl = canvas.toDataURL('image/png');
  callback(dataUrl);
}

// ===== PLAY AGAIN =====
function restartQuiz() {
  document.getElementById('scoreScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'flex';
}
