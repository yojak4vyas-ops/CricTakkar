// ===== RANKING CHALLENGE — CricTakkar =====
// Player drag-and-drop ranking game
// 5 challenges per session, XP saved to Firebase

// ===== CHALLENGE DATA =====
// Each challenge has: a question, 5 players, their correct order (index 0 = highest/first)
// and the stat value shown in the answer reveal
//
// VERIFICATION NOTE (Day 11):
// Challenge 1 uses Ricky Ponting instead of Steve Smith, because Smith is still an
// active Test player and his average changes every series. Ponting retired in 2012,
// so his average (51.85) is locked forever and safe to use.
// Kohli's average (46.85) — I am not fully certain this is the exact final figure.
// Please verify on ESPNcricinfo before treating this as permanent.
// Challenge 2 wicket counts and order verified via ESPNcricinfo/Britannica (July 2026).
// Challenge 3 IPL titles rebuilt to include RCB's 2025 and 2026 titles, and to fix
// Rajasthan Royals (they have 1 title, 2008 only — not 2 as previously listed).
// Verified via Wikipedia + Olympics.com (July 2026).

const CHALLENGES = [
  {
    id: 1,
    question: "Rank these batsmen by Test batting average (highest to lowest)",
    hint: "Minimum 20 Test innings. Career averages — only retired players used so the answer never goes out of date.",
    players: [
      { name: "Don Bradman", flag: "🇦🇺", value: "Avg: 99.94" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "Avg: 51.85" },
      { name: "Virat Kohli", flag: "🇮🇳", value: "Avg: 46.85" },
      { name: "Brian Lara", flag: "🇹🇹", value: "Avg: 52.88" },
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Avg: 53.78" }
    ],
    correctOrder: [0, 4, 3, 1, 2]
    // Bradman 99.94 > Tendulkar 53.78 > Lara 52.88 > Ponting 51.85 > Kohli 46.85
  },
  {
    id: 2,
    question: "Rank these bowlers by total Test wickets (most to least)",
    hint: "All-time career Test wickets.",
    players: [
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "800 wickets" },
      { name: "Shane Warne", flag: "🇦🇺", value: "708 wickets" },
      { name: "Anil Kumble", flag: "🇮🇳", value: "619 wickets" },
      { name: "James Anderson", flag: "🇬🇧", value: "704 wickets" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "563 wickets" }
    ],
    correctOrder: [0, 1, 3, 2, 4]
    // Murali 800 > Warne 708 > Anderson 704 > Kumble 619 > McGrath 563
  },
  {
    id: 3,
    question: "Rank these IPL teams by total IPL titles won (most to least)",
    hint: "IPL titles from 2008 to 2026.",
    players: [
      { name: "Mumbai Indians", flag: "🔵", value: "5 titles" },
      { name: "Chennai Super Kings", flag: "🟡", value: "5 titles" },
      { name: "Kolkata Knight Riders", flag: "🟣", value: "3 titles" },
      { name: "Royal Challengers Bengaluru", flag: "🔴", value: "2 titles" },
      { name: "Sunrisers Hyderabad", flag: "🟠", value: "1 title" }
    ],
    correctOrder: [0, 1, 2, 3, 4]
    // MI 5 = CSK 5 > RCB 2 (won 2025 and 2026) > SRH 1
    // MI and CSK both have 5 — positions 0 and 1 are interchangeable, handled in code below
    // KKR sits at 3 titles (2012, 2014, 2024)
  },
  {
    id: 4,
    question: "Rank these cricketers by the year they made their Test debut (earliest first)",
    hint: "Who played Test cricket first?",
    players: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Debut: 1989" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "Debut: 1995" },
      { name: "MS Dhoni", flag: "🇮🇳", value: "Debut: 2005" },
      { name: "Virat Kohli", flag: "🇮🇳", value: "Debut: 2011" },
      { name: "Kapil Dev", flag: "🇮🇳", value: "Debut: 1978" }
    ],
    correctOrder: [4, 0, 1, 2, 3]
    // Kapil 1978 > Tendulkar 1989 > Ponting 1995 > Dhoni 2005 > Kohli 2011
  },
  {
    id: 5,
    question: "Rank these batsmen by highest individual ODI score (highest to lowest)",
    hint: "Single innings highest score in ODIs.",
    players: [
      { name: "Rohit Sharma", flag: "🇮🇳", value: "264 vs Sri Lanka" },
      { name: "Martin Guptill", flag: "🇳🇿", value: "237* vs West Indies" },
      { name: "Chris Gayle", flag: "🇯🇲", value: "215 vs Zimbabwe" },
      { name: "Virender Sehwag", flag: "🇮🇳", value: "219 vs West Indies" },
      { name: "Fakhar Zaman", flag: "🇵🇰", value: "193 vs Zimbabwe" }
    ],
    correctOrder: [0, 1, 3, 2, 4]
    // Rohit 264 > Guptill 237 > Sehwag 219 > Gayle 215 > Fakhar 193
  }
];

// ===== GAME STATE =====
let currentChallengeIndex = 0;
let totalCorrect = 0;
let totalXPEarned = 0;
let dragSrcIndex = null;
let currentUserOrder = []; // tracks current positions of players
let lastResult = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadChallenge(currentChallengeIndex);
});

// ===== LOAD A CHALLENGE =====
function loadChallenge(index) {
  const challenge = CHALLENGES[index];

  // Reset UI
  document.getElementById('resultPanel').classList.remove('show');
  document.getElementById('challengeBox').style.display = 'block';
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').textContent = 'Submit My Ranking ✅';

  // Update progress
  const pct = (index / CHALLENGES.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `Challenge ${index + 1} of ${CHALLENGES.length}`;

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

  const challenge = CHALLENGES[currentChallengeIndex];

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
  const challenge = CHALLENGES[currentChallengeIndex];
  const correctOrder = challenge.correctOrder;

  // Count correct positions
  let correct = 0;
  currentUserOrder.forEach((playerIndex, position) => {
    if (correctOrder[position] === playerIndex) correct++;
  });

  // Special case: Challenge 3 (IPL titles) — MI and CSK both have 5 titles
  // Position 0 and 1 are interchangeable — if user puts CSK at 0 and MI at 1, also correct
  if (currentChallengeIndex === 2) {
    const pos0 = currentUserOrder[0];
    const pos1 = currentUserOrder[1];
    // MI = index 0, CSK = index 1
    if ((pos0 === 0 && pos1 === 1) || (pos0 === 1 && pos1 === 0)) {
      // Both top-2 are correct regardless of order — ensure we count both
      const rest = currentUserOrder.slice(2);
      const correctRest = correctOrder.slice(2);
      correct = 2;
      rest.forEach((pi, i) => {
        if (pi === correctRest[i]) correct++;
      });
    }
  }

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
    const playerIndex = currentUserOrder[position];
    let isCorrect = correctOrder[position] === playerIndex;
    // Handle IPL tie
    if (currentChallengeIndex === 2 && position <= 1) {
      isCorrect = (currentUserOrder[0] === 0 || currentUserOrder[0] === 1) &&
                  (currentUserOrder[1] === 0 || currentUserOrder[1] === 1);
    }
    item.classList.add(isCorrect ? 'correct' : 'wrong');
    item.setAttribute('draggable', 'false');
  });

  // Disable submit
  document.getElementById('submitBtn').disabled = true;
  document.getElementById('submitBtn').textContent = 'Submitted!';

  // Show result
  showResult(correct, challenge, xpEarned);

  // Save XP to Firebase
  saveXP(xpEarned);
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

  if (currentChallengeIndex >= CHALLENGES.length) {
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

  const maxScore = CHALLENGES.length * 5; // 5 players each
  document.getElementById('finishTotal').textContent =
    `You got ${totalCorrect} out of ${maxScore} positions correct · +${totalXPEarned} XP earned`;

  document.getElementById('finishScreen').classList.add('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== SHARE FINISH =====
function shareFinish() {
  const maxScore = CHALLENGES.length * 5;
  const text = `🏆 CricTakkar Ranking Challenge!\n\nI completed all 5 challenges and got ${totalCorrect}/${maxScore} positions correct!\n\nCan you beat my score? Play at crictakkar.vercel.app 🏏`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// ===== SAVE XP TO FIREBASE =====
function saveXP(xpEarned) {
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

      transaction.update(userRef, {
        xp: newXP,
        level: newLevel,
        rankingPlayed: (data.rankingPlayed || 0) + 1
      });
    });
  } catch (err) {
    // User not logged in — XP not saved, game still works
    console.log('XP not saved — user not logged in');
  }
}

// ===== CALCULATE LEVEL =====
function calculateLevel(xp) {
  if (xp < 100) return 'Debutant';
  if (xp < 300) return 'Club Cricketer';
  if (xp < 600) return 'State Player';
  if (xp < 1000) return 'National Reserve';
  if (xp < 1500) return 'International';
  if (xp < 2500) return 'Test Cricketer';
  return 'Test Legend';
}
