// ===== CRICTAKKAR CATEGORY QUIZ ENGINE V2 =====

var crictakkarCategory = localStorage.getItem('selectedCategory') || 'ipl';

var crictakkarCategoryInfo = {
  ipl: { title: 'IPL Quiz', icon: '🏏' },
  test: { title: 'Test Cricket Quiz', icon: '🎩' },
  odi: { title: 'ODI Cricket Quiz', icon: '🌍' },
  t20: { title: 'T20 World Cup Quiz', icon: '⚡' }
};

var crictakkarQuestions = [];
var crictakkarIndex = 0;
var crictakkarScore = 0;
var crictakkarTimer = null;
var crictakkarTimeLeft = 15;
var crictakkarAnswered = false;
var crictakkarResults = [];
var crictakkarTotal = 10;

// ===== SET UP START SCREEN =====
window.onload = function() {
  var info = crictakkarCategoryInfo[crictakkarCategory];
  document.getElementById('categoryTitle').textContent = info.title;
  document.getElementById('categoryIcon').textContent = info.icon;
};

// ===== START THE QUIZ =====
function startCategoryQuiz() {
  var allQuestions = categoryQuestions[crictakkarCategory];

  crictakkarQuestions = allQuestions.slice()
    .sort(function() { return Math.random() - 0.5; })
    .slice(0, crictakkarTotal);

  crictakkarIndex = 0;
  crictakkarScore = 0;
  crictakkarResults = [];

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('questionScreen').style.display = 'flex';

  crictakkarLoadQuestion();
}

// ===== LOAD A QUESTION =====
function crictakkarLoadQuestion() {
  crictakkarAnswered = false;
  crictakkarTimeLeft = 15;

  var q = crictakkarQuestions[crictakkarIndex];

  var progress = (crictakkarIndex / crictakkarTotal) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  document.getElementById('questionCounter').textContent =
    'Question ' + (crictakkarIndex + 1) + ' of ' + crictakkarTotal;

  document.getElementById('timerNumber').textContent = crictakkarTimeLeft;
  document.getElementById('timerCircle').classList.remove('danger');
  document.getElementById('questionText').textContent = q.question;

  var optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(function(btn, index) {
    btn.textContent = q.options[index];
    btn.className = 'option-btn';
    btn.disabled = false;
  });

  document.getElementById('factBox').style.display = 'none';
  crictakkarStartTimer();
}

// ===== TIMER =====
function crictakkarStartTimer() {
  clearInterval(crictakkarTimer);

  crictakkarTimer = setInterval(function() {
    crictakkarTimeLeft--;
    document.getElementById('timerNumber').textContent = crictakkarTimeLeft;

    if (crictakkarTimeLeft <= 5) {
      document.getElementById('timerCircle').classList.add('danger');
    }

    if (crictakkarTimeLeft <= 0) {
      clearInterval(crictakkarTimer);
      if (!crictakkarAnswered) {
        crictakkarTimeUp();
      }
    }
  }, 1000);
}

// ===== TIME UP =====
function crictakkarTimeUp() {
  crictakkarAnswered = true;
  crictakkarResults.push(false);
  crictakkarDisableOptions();
  document.getElementById('opt' + crictakkarQuestions[crictakkarIndex].correct)
    .classList.add('correct');
  crictakkarShowFact("⏰ Time's up! The correct answer was highlighted above.");
}

// ===== SELECT ANSWER =====
function selectAnswer(selectedIndex) {
  if (crictakkarAnswered) return;
  crictakkarAnswered = true;
  clearInterval(crictakkarTimer);

  var correctIndex = crictakkarQuestions[crictakkarIndex].correct;
  var isCorrect = selectedIndex === correctIndex;

  crictakkarDisableOptions();

  if (isCorrect) {
    crictakkarScore++;
    crictakkarResults.push(true);
    document.getElementById('opt' + selectedIndex).classList.add('correct');
  } else {
    crictakkarResults.push(false);
    document.getElementById('opt' + selectedIndex).classList.add('wrong');
    document.getElementById('opt' + correctIndex).classList.add('correct');
  }

  crictakkarShowFact(crictakkarQuestions[crictakkarIndex].fact);
}

// ===== SHOW FACT =====
function crictakkarShowFact(factText) {
  document.getElementById('factText').textContent = factText;
  document.getElementById('factBox').style.display = 'block';

  var nextBtn = document.querySelector('#factBox .btn-primary');
  if (crictakkarIndex === crictakkarTotal - 1) {
    nextBtn.textContent = 'See My Score 🏆';
  } else {
    nextBtn.textContent = 'Next Question →';
  }
}

// ===== DISABLE OPTIONS =====
function crictakkarDisableOptions() {
  document.querySelectorAll('.option-btn').forEach(function(btn) {
    btn.disabled = true;
  });
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  crictakkarIndex++;
  if (crictakkarIndex >= crictakkarTotal) {
    crictakkarShowScore();
  } else {
    crictakkarLoadQuestion();
  }
}

// ===== SCORE SCREEN =====
function crictakkarShowScore() {
  document.getElementById('progressBar').style.width = '100%';
  document.getElementById('questionScreen').style.display = 'none';
  document.getElementById('scoreScreen').style.display = 'flex';

  document.getElementById('scoreNumber').textContent = crictakkarScore;
  document.getElementById('scoreOutOf').textContent = '/' + crictakkarTotal;

  var scoreData = crictakkarGetScoreData(crictakkarScore, crictakkarTotal);
  document.getElementById('scoreEmoji').textContent = scoreData.emoji;
  document.getElementById('scoreTitle').textContent = scoreData.title;
  document.getElementById('scoreMessage').textContent = scoreData.message;

  var breakdown = document.getElementById('scoreBreakdown');
  breakdown.innerHTML = '';
  crictakkarResults.forEach(function(isCorrect) {
    var dot = document.createElement('div');
    dot.className = 'breakdown-dot ' + (isCorrect ? 'correct' : 'wrong');
    dot.textContent = isCorrect ? '✓' : '✗';
    breakdown.appendChild(dot);
  });

  crictakkarSaveScore(crictakkarScore, crictakkarTotal);
}

// ===== SAVE SCORE TO FIREBASE =====
function crictakkarSaveScore(finalScore, total) {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      var xpEarned = finalScore * 10;
      var userRef = db.collection('users').doc(user.uid);

      userRef.get().then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          var newXP = (data.xp || 0) + xpEarned;
          var newLevel = crictakkarGetLevel(newXP);

          // ===== BADGES — Sachin Scholar & IPL Legend (Day 12) =====
          // Unlocked on a perfect score in the matching category quiz.
          var badges = data.badges || {};
          if (finalScore === total) {
            if (crictakkarCategory === 'test') {
              badges.sachinScholar = true;
            }
            if (crictakkarCategory === 'ipl') {
              badges.iplLegend = true;
            }
          }
          // ===== END BADGES =====

          // ===== QUIZ HISTORY — powers the Stats Dashboard's category/time stats =====
          var today = new Date();
          var todayStr = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');
          var quizHistory = data.quizHistory || [];
          quizHistory.push({ category: crictakkarCategory, score: finalScore, total: total, date: todayStr });
          if (quizHistory.length > 200) quizHistory = quizHistory.slice(quizHistory.length - 200);
          // ===== END QUIZ HISTORY =====

          // ===== ERA STATS — powers the Stats Dashboard's "weakest era" card =====
          var eraStats = crictakkarMergeEraStats(data.eraStats || {}, crictakkarQuestions, crictakkarResults);
          // ===== END ERA STATS =====

          userRef.update({
            quizzesPlayed: (data.quizzesPlayed || 0) + 1,
            totalScore: (data.totalScore || 0) + finalScore,
            totalQuestions: (data.totalQuestions || 0) + total,
            xp: newXP,
            level: newLevel,
            badges: badges,
            quizHistory: quizHistory,
            eraStats: eraStats
          }).then(function() {
            console.log('✅ Score saved! +' + xpEarned + ' XP');
          }).catch(function(error) {
            console.error('❌ Error:', error);
          });
        }
      });
    }
  });
}

// ===== MERGE ERA STATS =====
// Adds this session's per-question correct/total counts (by era) into the running
// totals already saved on the user doc. "General" (timeless rules/definitions) is
// skipped since it isn't a real era and shouldn't count toward strongest/weakest.
function crictakkarMergeEraStats(existing, questions, resultsArr) {
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
function crictakkarGetLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}

// ===== SCORE MESSAGE =====
function crictakkarGetScoreData(score, total) {
  var percent = score / total;
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
  var info = crictakkarCategoryInfo[crictakkarCategory];
  var shareText =
    '🏏 I scored ' + crictakkarScore + '/' + crictakkarTotal +
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
