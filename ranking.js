// ===== RANKING CHALLENGE — CricTakkar =====
// Player drag-and-drop ranking game
// 5 challenges per session, randomly drawn from the RANKING_CHALLENGES pool
// (see ranking-challenges.js), XP saved to Firebase
//
// FIX NOTE (Day 12): calculateLevel() below previously used different level names
// (National Reserve, International, Test Cricketer) than the rest of the app.
// Now matches the standard used in profile.html, quiz.js, speedround.js and wordle.js:
// Debutant -> Club Cricketer -> State Player -> IPL Pro -> T20 Star -> ODI Champion -> Test Legend
//
// FIX NOTE (Day 27): challenge data moved out to ranking-challenges.js as a growing pool
// (see the RANKING CHALLENGE EXPANSION PROJECT in CLAUDE.md). Each session now randomly
// draws 5 distinct challenges from the pool instead of always showing the same fixed 5.
// The old hardcoded "challenge index === 2 is the IPL tie" special case was replaced with
// a generic tiedGroups check so any future challenge can mark players as tied without
// needing custom code.

const SESSION_SIZE = 5;

// ===== GAME STATE =====
let activeChallenges = [];
let currentChallengeIndex = 0;
let totalCorrect = 0;
let totalXPEarned = 0;
let dragSrcIndex = null;
let currentUserOrder = []; // tracks current positions of players
let lastResult = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  activeChallenges = pickRandomChallenges(RANKING_CHALLENGES, SESSION_SIZE);
  loadChallenge(currentChallengeIndex);
});

// ===== PICK RANDOM CHALLENGES FOR THIS SESSION =====
function pickRandomChallenges(pool, count) {
  const indices = shuffleArray([...Array(pool.length).keys()]);
  return indices.slice(0, count).map(i => pool[i]);
}

// ===== TIE-AWARE SCORING HELPERS =====
// A challenge may include tiedGroups: an array of position-groups (0-indexed positions
// within correctOrder) that are interchangeable, e.g. [[0,1]].
function findTiedGroup(challenge, position) {
  const groups = challenge.tiedGroups || [];
  return groups.find(g => g.includes(position));
}

function isPositionCorrect(challenge, userOrder, position) {
  const group = findTiedGroup(challenge, position);
  if (group) {
    const tiedSet = new Set(group.map(p => challenge.correctOrder[p]));
    const userSet = new Set(group.map(p => userOrder[p]));
    return tiedSet.size === userSet.size && [...tiedSet].every(v => userSet.has(v));
  }
  return challenge.correctOrder[position] === userOrder[position];
}

function scoreChallenge(challenge, userOrder) {
  let correct = 0;
  const countedGroups = new Set();
  userOrder.forEach((playerIndex, position) => {
    const group = findTiedGroup(challenge, position);
    if (group) {
      const groupKey = group.join(',');
      if (countedGroups.has(groupKey)) return; // already scored this tied group
      countedGroups.add(groupKey);
      if (isPositionCorrect(challenge, userOrder, position)) correct += group.length;
    } else {
      if (challenge.correctOrder[position] === playerIndex) correct++;
    }
  });
  return correct;
}

// ===== LOAD A CHALLENGE =====
function loadChallenge(index) {
  const challenge = activeChallenges[index];

  // Reset UI
  document.getElementById('resultPanel').classList.remove('show');
  document.getElementById('challengeBox').style.display = 'block';
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').textContent = 'Submit My Ranking ✅';

  // Update progress
  const pct = (index / activeChallenges.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `Challenge ${index + 1} of ${activeChallenges.length}`;

  // Update question
  document.getElementById('challengeNumber').textContent = `Challenge ${index + 1}`;
  document.getElementById('challengeQuestion').textContent = challenge.question;
  document.getElementById('challengeHint').textContent = challenge.hint;

  // Shuffle players for display
  currentUserOrder = shuffleArray([...Array(challenge.players.length).keys()]);

  renderDragList();
}

// ===== RENDER DRAG LIST =====
function renderDragList() {
  const list = document.getElementById('dragList');
  list.innerHTML = '';

  const challenge = activeChallenges[currentChallengeIndex];

  currentUserOrder.forEach((playerIndex, position) => {
    const player = challenge.players[playerIndex];

    const item = document.createElement('div');
    item.className = 'drag-item';
    item.setAttribute('data-position', position);
    item.setAttribute('draggable', 'true');

    item.innerHTML = `
      <div class="drag-handle">⠿</div>
      <div class="drag-rank">${position + 1}</div>
      <div class="drag-name">${player.name}</div>
      <div class="drag-flag">${player.flag}</div>
    `;

    // Desktop drag events
    item.addEventListener('dragstart', onDragStart);
    item.addEventListener('dragover', onDragOver);
    item.addEventListener('drop', onDrop);
    item.addEventListener('dragend', onDragEnd);

    // Touch events for mobile
    item.addEventListener('touchstart', onTouchStart, { passive: false });
    item.addEventListener('touchmove', onTouchMove, { passive: false });
    item.addEventListener('touchend', onTouchEnd);

    list.appendChild(item);
  });
}

// ===== DESKTOP DRAG =====
function onDragStart(e) {
  dragSrcIndex = parseInt(this.getAttribute('data-position'));
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.drag-item').forEach(el => el.classList.remove('drag-over'));
  this.classList.add('drag-over');
}

function onDrop(e) {
  e.preventDefault();
  const dropIndex = parseInt(this.getAttribute('data-position'));
  if (dragSrcIndex !== null && dragSrcIndex !== dropIndex) {
    swapPositions(dragSrcIndex, dropIndex);
  }
}

function onDragEnd() {
  document.querySelectorAll('.drag-item').forEach(el => {
    el.classList.remove('dragging', 'drag-over');
  });
  dragSrcIndex = null;
}

// ===== TOUCH DRAG (MOBILE) =====
let touchDragIndex = null;
let touchGhost = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

function onTouchStart(e) {
  e.preventDefault();
  touchDragIndex = parseInt(this.getAttribute('data-position'));
  const touch = e.touches[0];
  const rect = this.getBoundingClientRect();
  touchOffsetX = touch.clientX - rect.left;
  touchOffsetY = touch.clientY - rect.top;

  // Create ghost
  touchGhost = this.cloneNode(true);
  touchGhost.className = 'drag-item drag-ghost';
  touchGhost.style.width = rect.width + 'px';
  touchGhost.style.left = (touch.clientX - touchOffsetX) + 'px';
  touchGhost.style.top = (touch.clientY - touchOffsetY) + 'px';
  document.body.appendChild(touchGhost);

  this.classList.add('dragging');
}

function onTouchMove(e) {
  e.preventDefault();
  if (!touchGhost) return;
  const touch = e.touches[0];
  touchGhost.style.left = (touch.clientX - touchOffsetX) + 'px';
  touchGhost.style.top = (touch.clientY - touchOffsetY) + 'px';

  // Highlight item underneath
  touchGhost.style.display = 'none';
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  touchGhost.style.display = '';

  document.querySelectorAll('.drag-item').forEach(i => i.classList.remove('drag-over'));
  const dragItem = el ? el.closest('.drag-item') : null;
  if (dragItem && !dragItem.classList.contains('drag-ghost')) {
    dragItem.classList.add('drag-over');
  }
}

function onTouchEnd(e) {
  if (touchGhost) {
    touchGhost.remove();
    touchGhost = null;
  }

  const touch = e.changedTouches[0];
  document.querySelectorAll('.drag-item').forEach(i => i.classList.remove('drag-over', 'dragging'));

  // Find drop target
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  const dragItem = el ? el.closest('.drag-item') : null;
  if (dragItem) {
    const dropIndex = parseInt(dragItem.getAttribute('data-position'));
    if (touchDragIndex !== null && touchDragIndex !== dropIndex) {
      swapPositions(touchDragIndex, dropIndex);
    }
  }

  touchDragIndex = null;
}

// ===== SWAP TWO POSITIONS =====
function swapPositions(a, b) {
  // Swap the two player indices in currentUserOrder
  const temp = currentUserOrder[a];
  currentUserOrder[a] = currentUserOrder[b];
  currentUserOrder[b] = temp;
  renderDragList();
}

// ===== SHUFFLE HELPER =====
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== SUBMIT ANSWER =====
function submitAnswer() {
  const challenge = activeChallenges[currentChallengeIndex];

  // Count correct positions (tie-aware — see scoreChallenge/isPositionCorrect above)
  const correct = scoreChallenge(challenge, currentUserOrder);

  // XP: 20 per correct position
  const xpEarned = correct * 20;
  totalCorrect += correct;
  totalXPEarned += xpEarned;

  lastResult = {
    correct,
    total: challenge.players.length,
    xpEarned,
    challenge
  };

  // Color code the drag items
  const items = document.querySelectorAll('.drag-item');
  items.forEach((item, position) => {
    const isCorrect = isPositionCorrect(challenge, currentUserOrder, position);
    item.classList.add(isCorrect ? 'correct' : 'wrong');
    item.setAttribute('draggable', 'false');
  });

  // Disable submit
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').textContent = 'Submitted!';

  // Show result
  showResult(correct, challenge, xpEarned);

  // Save XP to Firebase — pass how many were correct so we can check the Ranking Master badge
  saveXP(xpEarned, correct);
}

// ===== SHOW RESULT PANEL =====
function showResult(correct, challenge, xpEarned) {
  const total = challenge.players.length;
  const messages = [
    "Keep practising! 💪",
    "Not bad! 🤔",
    "Good effort! 👍",
    "Well done! ⭐",
    "Great job! 🔥",
    "Perfect! You're a cricket genius! 🏆"
  ];

  document.getElementById('resultScore').textContent = `${correct}/${total}`;
  document.getElementById('resultMessage').textContent = messages[correct] || messages[0];
  document.getElementById('resultXP').textContent = `+${xpEarned} XP earned`;

  // Show correct order
  const correctOrderList = document.getElementById('correctOrderList');
  correctOrderList.innerHTML = '';
  challenge.correctOrder.forEach((playerIndex, rank) => {
    const player = challenge.players[playerIndex];
    const item = document.createElement('div');
    item.className = 'correct-order-item';
    item.innerHTML = `
      <div class="correct-order-num">${rank + 1}</div>
      <div class="correct-order-name">${player.flag} ${player.name}</div>
      <div class="correct-order-value">${player.value}</div>
    `;
    correctOrderList.appendChild(item);
  });

  document.getElementById('resultPanel').classList.add('show');

  // Scroll to result
  setTimeout(() => {
    document.getElementById('resultPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 300);
}

// ===== SHARE ON WHATSAPP =====
function shareWhatsApp() {
  if (!lastResult) return;
  const { correct, total, challenge } = lastResult;
  const emoji = correct === total ? '🏆' : correct >= 3 ? '⭐' : '💪';
  const text = `${emoji} CricTakkar Ranking Challenge!\n\n"${challenge.question}"\n\nI got ${correct}/${total} correct!\n\nCan you beat me? Play at crictakkar.vercel.app 🏏`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// ===== NEXT CHALLENGE =====
function nextChallenge() {
  currentChallengeIndex++;

  if (currentChallengeIndex >= activeChallenges.length) {
    showFinishScreen();
  } else {
    document.getElementById('resultPanel').classList.remove('show');
    loadChallenge(currentChallengeIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ===== FINISH SCREEN =====
function showFinishScreen() {
  document.getElementById('challengeBox').style.display = 'none';
  document.getElementById('resultPanel').classList.remove('show');
  document.getElementById('progressFill').style.width = '100%';
  document.getElementById('progressText').textContent = 'All challenges complete!';

  const maxScore = activeChallenges.length * 5; // 5 players each
  document.getElementById('finishTotal').textContent =
    `You got ${totalCorrect} out of ${maxScore} positions correct · +${totalXPEarned} XP earned`;

  document.getElementById('finishScreen').classList.add('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  saveRankingHistory(totalCorrect, maxScore);
}

// ===== SAVE RANKING SESSION TO QUIZ HISTORY =====
// Logged once per full 5-challenge session — powers the Stats Dashboard's category/time stats
function saveRankingHistory(finalScore, total) {
  try {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);

    var today = new Date();
    var todayStr = today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0');

    db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) return;

      const data = doc.data();
      var quizHistory = data.quizHistory || [];
      quizHistory.push({ category: 'Ranking', score: finalScore, total: total, date: todayStr });
      if (quizHistory.length > 200) quizHistory = quizHistory.slice(quizHistory.length - 200);

      transaction.update(userRef, { quizHistory: quizHistory });
    });
  } catch (err) {
    console.log('Ranking history not saved — user not logged in');
  }
}

// ===== SHARE FINISH =====
function shareFinish() {
  const maxScore = activeChallenges.length * 5;
  const text = `🏆 CricTakkar Ranking Challenge!\n\nI completed all 5 challenges and got ${totalCorrect}/${maxScore} positions correct!\n\nCan you beat my score? Play at crictakkar.vercel.app 🏏`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// ===== SAVE XP TO FIREBASE =====
// correctCount = how many positions were correct in this one challenge (0-5)
// Used to check the Ranking Master badge (perfect 5/5 on any single challenge)
function saveXP(xpEarned, correctCount) {
  try {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);

    db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) return;

      const data = doc.data();
      const currentXP = data.xp || 0;
      const newXP = currentXP + xpEarned;
      const newLevel = calculateLevel(newXP);

      // Ranking Master badge — perfect 5/5 on any single challenge
      const badges = data.badges || {};
      if (correctCount === 5) {
        badges.rankingMaster = true;
      }

      transaction.update(userRef, {
        xp: newXP,
        level: newLevel,
        rankingPlayed: (data.rankingPlayed || 0) + 1,
        badges: badges
      });
    });
  } catch (err) {
    // User not logged in — XP not saved, game still works
    console.log('XP not saved — user not logged in');
  }
}

// ===== CALCULATE LEVEL =====
// Matches the standard used across the whole app (profile.html, quiz.js, speedround.js, wordle.js)
function calculateLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}
