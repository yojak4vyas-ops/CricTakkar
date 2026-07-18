// ===== RANKING CHALLENGE — CricTakkar =====
// Player drag-and-drop ranking game
// 4 challenges per session, XP saved to Firebase
//
// FIX NOTE (Day 12): calculateLevel() below previously used different level names
// (National Reserve, International, Test Cricketer) than the rest of the app.
// Now matches the standard used in profile.html, quiz.js, speedround.js and wordle.js:
// Debutant -> Club Cricketer -> State Player -> IPL Pro -> T20 Star -> ODI Champion -> Test Legend
//
// FIX NOTE (Day 27): challenge data moved out to ranking-challenges.js. Two sources feed a
// session — RANKING_PARAMETERS (growing "leaderboard" topics, e.g. Test batting average) and
// FIXED_CHALLENGES (small one-off topics, e.g. IPL titles). The old hardcoded "challenge
// index === 2 is the IPL tie" special case was replaced with a generic tiedGroups check so
// any challenge can mark players as tied without needing custom code.
//
// FIX NOTE (Day 27, later same day): switched from a fixed pool of pre-built 5-player
// challenges to on-the-fly generation for RANKING_PARAMETERS. Each parameter holds a
// `leaders` list sorted best-to-worst; every session, generateChallengeFromParameter()
// randomly draws a 5-player WINDOW from that list, where consecutive drawn players can never
// be more than 3 ranks apart (pickWindowIndices()) — so the 5 shown are always a plausible,
// tightly-clustered comparison instead of jumping from rank #1 to rank #20. The correct order
// is just the leaders list's own sort order within that window, so no correctOrder needs to
// be hand-written per instance. While a parameter has 5-7 leaders the window is effectively
// the whole list (same behaviour as a fixed challenge); the randomness only becomes visible
// once a parameter grows well past that. Session size dropped from 5 to 4 challenges.

const SESSION_SIZE = 4;
const WINDOW_SIZE = 5;   // players shown per challenge
const MAX_RANK_GAP = 3;  // max gap between consecutive drawn ranks in a parameter's leaders list

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
  activeChallenges = pickRandomChallenges(buildSessionPool(), SESSION_SIZE);
  loadChallenge(currentChallengeIndex);
});

// ===== BUILD THIS SESSION'S POOL =====
// One generated instance per RANKING_PARAMETERS entry (skipped if not enough leaders yet)
// plus every FIXED_CHALLENGES entry, normalized to the same { question, hint, players,
// correctOrder, tiedGroups } shape so the rest of the game doesn't need to know which
// source a challenge came from.
function buildSessionPool() {
  const generated = RANKING_PARAMETERS
    .map(param => generateChallengeFromParameter(param))
    .filter(Boolean);
  return [...generated, ...FIXED_CHALLENGES];
}

// ===== GENERATE A CHALLENGE FROM A GROWING PARAMETER =====
function generateChallengeFromParameter(param) {
  const leaders = param.leaders;
  if (!leaders || leaders.length < WINDOW_SIZE) return null; // not enough data yet

  const indices = pickWindowIndices(leaders.length, WINDOW_SIZE, MAX_RANK_GAP);
  if (!indices) return null;

  const players = indices.map(i => ({
    name: leaders[i].name,
    flag: leaders[i].flag,
    value: leaders[i].value
  }));

  // Detect adjacent ties that landed inside this drawn window
  const tiedGroups = [];
  for (let k = 0; k < indices.length - 1; k++) {
    if (leaders[indices[k]].tiedWithNext && indices[k + 1] === indices[k] + 1) {
      tiedGroups.push([k, k + 1]);
    }
  }

  return {
    id: param.id + '-' + indices.join('_'),
    question: param.question,
    hint: param.hint,
    players,
    correctOrder: [0, 1, 2, 3, 4].slice(0, WINDOW_SIZE),
    tiedGroups: tiedGroups.length ? tiedGroups : undefined
  };
}

// ===== PICK A RANDOM WINDOW OF INDICES =====
// Returns `size` ascending indices into a list of length n, where each consecutive pair is
// at most maxGap apart. Succeeds deterministically whenever n >= size (no retry/luck
// involved) by first choosing a random total span, splitting it into `size - 1` random
// gaps (each 1..maxGap) that add up to that span, then placing the whole window at a
// random valid starting point.
function pickWindowIndices(n, size, maxGap) {
  const gapsNeeded = size - 1;
  const minSpan = gapsNeeded; // every gap at least 1
  const maxSpan = Math.min(gapsNeeded * maxGap, n - 1);
  if (maxSpan < minSpan) return null; // not enough room even for the tightest window

  const span = minSpan + Math.floor(Math.random() * (maxSpan - minSpan + 1));
  const gaps = distributeGaps(span, gapsNeeded, maxGap);

  const maxStart = n - 1 - span;
  const start = Math.floor(Math.random() * (maxStart + 1));

  const indices = [start];
  let current = start;
  gaps.forEach(g => { current += g; indices.push(current); });
  return indices;
}

// Randomly split `span` into `count` positive integers, each between 1 and maxGap,
// that sum to exactly `span`. Always succeeds when called with a `span` that's
// achievable under those bounds (guaranteed by pickWindowIndices above).
function distributeGaps(span, count, maxGap) {
  const gaps = new Array(count).fill(1);
  let remaining = span - count;
  while (remaining > 0) {
    const idx = Math.floor(Math.random() * count);
    if (gaps[idx] < maxGap) {
      gaps[idx]++;
      remaining--;
    }
  }
  return gaps;
}

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
    movePosition(dragSrcIndex, dropIndex);
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
      movePosition(touchDragIndex, dropIndex);
    }
  }

  touchDragIndex = null;
}

// ===== MOVE A PLAYER TO A NEW POSITION (shifts the players in between, not a swap) =====
function movePosition(from, to) {
  const [moved] = currentUserOrder.splice(from, 1);
  currentUserOrder.splice(to, 0, moved);
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

      // ===== STREAK LOGIC — playing ANY game keeps the daily streak alive =====
      var lastPlayed = data.lastPlayedDate || '';
      var currentStreak = data.currentStreak || 0;
      var bestStreak = data.bestStreak || 0;

      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      var yesterdayStr = yesterday.getFullYear() + '-' +
        String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
        String(yesterday.getDate()).padStart(2, '0');

      if (lastPlayed === todayStr) {
        // already played something today — streak unchanged
      } else if (lastPlayed === yesterdayStr) {
        currentStreak = currentStreak + 1;
      } else {
        currentStreak = 1;
      }
      if (currentStreak > bestStreak) bestStreak = currentStreak;
      // ===== END STREAK LOGIC =====

      transaction.update(userRef, {
        quizHistory: quizHistory,
        currentStreak: currentStreak,
        bestStreak: bestStreak,
        lastPlayedDate: todayStr
      });
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
