// ===== CRICTAKKAR SPEED ROUND ENGINE =====

var srQuestions = [];
var srIndex = 0;
var srScore = 0;
var srTimeLeft = 60;
var srTimerInterval = null;
var srAnswered = false;
var srTotal = 30;

// ===== START THE SPEED ROUND =====
function startSpeedRound() {
  // Pick 30 random questions from the question bank
  var shuffled = [...questionBank].sort(function() { return Math.random() - 0.5; });
  srQuestions = shuffled.slice(0, srTotal);

  srIndex = 0;
  srScore = 0;
  srTimeLeft = 60;
  srAnswered = false;

  document.getElementById('srStartScreen').style.display = 'none';
  document.getElementById('srQuestionScreen').style.display = 'flex';

  srLoadQuestion();
  srStartTimer();
}

// ===== LOAD A QUESTION =====
function srLoadQuestion() {
  srAnswered = false;

  var q = srQuestions[srIndex];
  var progress = (srIndex / srTotal) * 100;

  document.getElementById('srProgressBar').style.width = progress + '%';
  document.getElementById('srCounter').textContent = (srIndex + 1) + ' / ' + srTotal;
  document.getElementById('srQuestion').textContent = q.question;
  document.getElementById('srResultFlash').textContent = '';
  document.getElementById('srResultFlash').className = 'result-flash';

  for (var i = 0; i < 4; i++) {
    var btn = document.getElementById('srOpt' + i);
    btn.textContent = q.options[i];
    btn.className = 'speed-opt';
    btn.disabled = false;
  }
}

// ===== 60-SECOND COUNTDOWN TIMER =====
function srStartTimer() {
  clearInterval(srTimerInterval);

  srTimerInterval = setInterval(function() {
    srTimeLeft--;
    document.getElementById('srTimer').textContent = srTimeLeft;

    if (srTimeLeft <= 10) {
      document.getElementById('srTimer').classList.add('danger');
    }

    if (srTimeLeft <= 0) {
      clearInterval(srTimerInterval);
      srShowScoreScreen();
    }
  }, 1000);
}

// ===== USER TAPS AN ANSWER =====
function srSelectAnswer(selectedIndex) {
  if (srAnswered) return;
  srAnswered = true;

  var correctIndex = srQuestions[srIndex].correct;
  var isCorrect = selectedIndex === correctIndex;

  // Disable all buttons briefly
  for (var i = 0; i < 4; i++) {
    document.getElementById('srOpt' + i).disabled = true;
  }

  // Flash correct/wrong colour
  if (isCorrect) {
    srScore++;
    document.getElementById('srOpt' + selectedIndex).classList.add('correct');
    document.getElementById('srResultFlash').textContent = '✓ Correct!';
    document.getElementById('srResultFlash').className = 'result-flash correct-flash';
  } else {
    document.getElementById('srOpt' + selectedIndex).classList.add('wrong');
    document.getElementById('srOpt' + correctIndex).classList.add('correct');
    document.getElementById('srResultFlash').textContent = '✗ Wrong!';
    document.getElementById('srResultFlash').className = 'result-flash wrong-flash';
  }

  // Move to next question after 400ms (short flash so user can see result)
  setTimeout(function() {
    srIndex++;
    if (srIndex >= srTotal) {
      clearInterval(srTimerInterval);
      srShowScoreScreen();
    } else {
      srLoadQuestion();
    }
  }, 400);
}

// ===== SHOW FINAL SCORE SCREEN =====
function srShowScoreScreen() {
  clearInterval(srTimerInterval);

  document.getElementById('srQuestionScreen').style.display = 'none';
  document.getElementById('srScoreScreen').style.display = 'flex';

  document.getElementById('srScoreNumber').textContent = srScore;

  var accuracy = Math.round((srScore / srTotal) * 100);
  document.getElementById('srAccuracyNumber').textContent = accuracy + '%';

  // Animate the accuracy bar
  setTimeout(function() {
    document.getElementById('srAccuracyFill').style.width = accuracy + '%';
  }, 100);

  // Score message
  var data = srGetScoreData(srScore);
  document.getElementById('srScoreEmoji').textContent = data.emoji;
  document.getElementById('srScoreTitle').textContent = data.title;
  document.getElementById('srScoreMessage').textContent = data.message;

  // Speed Demon badge — if 25 or more correct
  if (srScore >= 25) {
    var badgeBox = document.getElementById('srBadgeBox');
    badgeBox.style.display = 'block';
    badgeBox.textContent = '🏅 Speed Demon badge unlocked! You got ' + srScore + '/30!';
  }

  // Save to Firebase
  srSaveToFirebase(srScore);
}

// ===== SAVE SPEED ROUND SCORE TO FIREBASE =====
function srSaveToFirebase(finalScore) {
  srAuth.onAuthStateChanged(function(user) {
    if (!user) {
      console.log('ℹ️ Not logged in — Speed Round score not saved');
      return;
    }

    var xpEarned = finalScore * 5; // 5 XP per correct answer in Speed Round
    var userRef = srDb.collection('users').doc(user.uid);

    userRef.get().then(function(doc) {
      if (!doc.exists) return;

      var data = doc.data();
      var newXP = (data.xp || 0) + xpEarned;
      var newLevel = srCalculateLevel(newXP);
      var speedBest = data.speedRoundBest || 0;
      var newBest = finalScore > speedBest ? finalScore : speedBest;

      // Speed Demon badge flag
      var badges = data.badges || {};
      if (finalScore >= 25) {
        badges.speedDemon = true;
      }

      // ===== QUIZ HISTORY — powers the Stats Dashboard's category/time stats =====
      var today = new Date();
      var todayStr = today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
      var quizHistory = data.quizHistory || [];
      quizHistory.push({ category: 'Speed Round', score: finalScore, total: srTotal, date: todayStr });
      if (quizHistory.length > 200) quizHistory = quizHistory.slice(quizHistory.length - 200);
      // ===== END QUIZ HISTORY =====

      userRef.update({
        xp: newXP,
        level: newLevel,
        speedRoundBest: newBest,
        badges: badges,
        speedRoundsPlayed: (data.speedRoundsPlayed || 0) + 1,
        quizHistory: quizHistory
      }).then(function() {
        console.log('✅ Speed Round saved! Score: ' + finalScore + '/30, +' + xpEarned + ' XP');
      }).catch(function(err) {
        console.error('❌ Error saving Speed Round:', err);
      });
    });
  });
}

// ===== CALCULATE LEVEL (same as main quiz) =====
function srCalculateLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}

// ===== SCORE MESSAGES =====
function srGetScoreData(score) {
  if (score >= 28) return {
    emoji: '🚀',
    title: 'Unreal Speed!',
    message: score + '/30 — You are a certified Speed Demon. Nobody beats you!'
  };
  if (score >= 25) return {
    emoji: '⚡',
    title: 'Speed Demon!',
    message: score + '/30 — Blazing fast AND accurate. Speed Demon badge earned!'
  };
  if (score >= 20) return {
    emoji: '🔥',
    title: 'Lightning Fast!',
    message: score + '/30 — Incredible speed. Just a little more accuracy for the badge!'
  };
  if (score >= 15) return {
    emoji: '👏',
    title: 'Solid Round!',
    message: score + '/30 — Good effort. Keep practising to hit that Speed Demon mark!'
  };
  if (score >= 10) return {
    emoji: '🏏',
    title: 'Getting Faster!',
    message: score + '/30 — Speed Round is tough. Try again — you will improve!'
  };
  return {
    emoji: '😅',
    title: 'Warm Up Done!',
    message: score + '/30 — Now you know the pace. Go again and beat your score!'
  };
}

// ===== PLAY AGAIN =====
function restartSpeedRound() {
  document.getElementById('srScoreScreen').style.display = 'none';
  document.getElementById('srStartScreen').style.display = 'flex';
}
