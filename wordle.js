// ===== CRICTAKKAR CRICKET WORDLE ENGINE =====

var wTodayPlayer = null;
var wGuesses = [];
var wMaxGuesses = 6;
var wGameOver = false;
var wShareLines = [];

// ===== PAGE LOAD =====
window.onload = function() {
  pickTodayPlayer();
  buildGuessRows();
};

// ===== START GAME — called when player clicks "I Understand" =====
function startWordle() {
  document.getElementById('wStartScreen').style.display = 'none';
  document.getElementById('wGameScreen').style.display = 'flex';
}

// ===== PICK TODAY'S PLAYER (rotates daily, same for everyone) =====
function pickTodayPlayer() {
  var today = new Date();
  var dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  var index = dayNumber % wordlePlayers.length;
  wTodayPlayer = wordlePlayers[index];
}

// ===== BUILD 6 EMPTY GUESS ROWS =====
function buildGuessRows() {
  var container = document.getElementById('guessRows');
  container.innerHTML = '';
  for (var i = 0; i < wMaxGuesses; i++) {
    var row = document.createElement('div');
    row.className = 'guess-row';
    row.id = 'row-' + i;
    var cols = ['name', 'country', 'role', 'battingStyle', 'era', 'format'];
    cols.forEach(function(col) {
      var cell = document.createElement('div');
      cell.className = 'guess-cell' + (col === 'name' ? ' name-cell' : '');
      cell.id = 'row-' + i + '-' + col;
      cell.textContent = '';
      row.appendChild(cell);
    });
    container.appendChild(row);
  }
}

// ===== AUTOCOMPLETE =====
function showSuggestions() {
  var input = document.getElementById('playerInput').value.toLowerCase().trim();
  var list = document.getElementById('autocompleteList');
  if (input.length < 2) { list.style.display = 'none'; return; }
  var matches = wordlePlayers.filter(function(p) {
    return p.name.toLowerCase().includes(input);
  });
  if (matches.length === 0) { list.style.display = 'none'; return; }
  list.innerHTML = '';
  matches.slice(0, 6).forEach(function(p) {
    var item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.textContent = p.name;
    item.onclick = function() {
      document.getElementById('playerInput').value = p.name;
      list.style.display = 'none';
    };
    list.appendChild(item);
  });
  list.style.display = 'block';
}

// ===== PRESS ENTER TO SUBMIT =====
function handleEnter(event) {
  if (event.key === 'Enter') {
    document.getElementById('autocompleteList').style.display = 'none';
    submitGuess();
  }
}

// ===== SUBMIT A GUESS =====
function submitGuess() {
  if (wGameOver) return;
  var inputEl = document.getElementById('playerInput');
  var guessName = inputEl.value.trim();
  if (!guessName) { alert('Please type a player name first!'); return; }
  var guessedPlayer = wordlePlayers.find(function(p) {
    return p.name.toLowerCase() === guessName.toLowerCase();
  });
  if (!guessedPlayer) {
    alert('Player not found in our list. Please pick from the suggestions.');
    return;
  }
  var alreadyGuessed = wGuesses.find(function(g) {
    return g.name.toLowerCase() === guessedPlayer.name.toLowerCase();
  });
  if (alreadyGuessed) { alert('You already guessed ' + guessedPlayer.name + '!'); return; }

  wGuesses.push(guessedPlayer);
  var rowIndex = wGuesses.length - 1;
  var result = comparePlayer(guessedPlayer, wTodayPlayer);
  fillRow(rowIndex, guessedPlayer, result);

  var emojis = result.map(function(r) {
    if (r === 'green') return '🟩';
    if (r === 'yellow') return '🟨';
    return '⬛';
  });
  wShareLines.push(emojis.join(''));

  inputEl.value = '';
  document.getElementById('autocompleteList').style.display = 'none';

  var remaining = wMaxGuesses - wGuesses.length;
  document.getElementById('attemptsLeft').textContent =
    remaining + ' attempt' + (remaining === 1 ? '' : 's') + ' remaining';

  var allGreen = result.every(function(r) { return r === 'green'; });
  if (allGreen) { wGameOver = true; setTimeout(function() { showResult(true); }, 400); return; }
  if (wGuesses.length >= wMaxGuesses) { wGameOver = true; setTimeout(function() { showResult(false); }, 400); }
}

// ===== COMPARE PLAYERS =====
function comparePlayer(guessed, target) {
  var attrs = ['country', 'role', 'battingStyle', 'era', 'format'];
  return attrs.map(function(attr) {
    if (guessed[attr] === target[attr]) return 'green';
    if (attr === 'era') {
      var eras = ['90s', '2000s', '2010s', '2020s'];
      var gIdx = eras.indexOf(guessed.era);
      var tIdx = eras.indexOf(target.era);
      if (Math.abs(gIdx - tIdx) === 1) return 'yellow';
    }
    if (attr === 'format') {
      if (guessed.format === 'All-format' || target.format === 'All-format') return 'yellow';
    }
    return 'grey';
  });
}

// ===== FILL ROW WITH COLOURS =====
function fillRow(rowIndex, player, result) {
  var attrs = ['country', 'role', 'battingStyle', 'era', 'format'];
  var nameCell = document.getElementById('row-' + rowIndex + '-name');
  nameCell.textContent = player.name;
  nameCell.classList.add('grey');
  attrs.forEach(function(attr, i) {
    var cell = document.getElementById('row-' + rowIndex + '-' + attr);
    cell.textContent = player[attr];
    cell.classList.add(result[i]);
  });
}

// ===== SHOW RESULT =====
function showResult(won) {
  document.getElementById('inputArea').style.display = 'none';
  document.getElementById('attemptsLeft').style.display = 'none';
  document.getElementById('resultBox').style.display = 'block';

  if (won) {
    document.getElementById('resultEmoji').textContent = '🏆';
    document.getElementById('resultTitle').textContent =
      'Got it in ' + wGuesses.length + (wGuesses.length === 1 ? ' try!' : ' tries!');
  } else {
    document.getElementById('resultEmoji').textContent = '😔';
    document.getElementById('resultTitle').textContent = 'Better luck tomorrow!';
  }

  document.getElementById('resultAnswer').textContent = 'Today\'s player: ' + wTodayPlayer.name;

  var fullShare = '🏏 CricTakkar Cricket Wordle\n' +
    (won ? wGuesses.length : 'X') + '/' + wMaxGuesses + '\n\n' +
    wShareLines.join('\n') +
    '\n\nPlay at cric-takkar.vercel.app/wordle.html';

  document.getElementById('shareTextBox').textContent = fullShare;
  wSaveToFirebase(won);
}

// ===== SHARE ON WHATSAPP =====
function shareOnWhatsApp() {
  var text = document.getElementById('shareTextBox').textContent;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}

// ===== SAVE TO FIREBASE =====
function wSaveToFirebase(won) {
  wAuth.onAuthStateChanged(function(user) {
    if (!user) return;
    var xpEarned = won ? Math.max(10, (wMaxGuesses - wGuesses.length + 1) * 10) : 5;
    var userRef = wDb.collection('users').doc(user.uid);
    userRef.get().then(function(doc) {
      if (!doc.exists) return;
      var data = doc.data();
      var newXP = (data.xp || 0) + xpEarned;
      var newLevel = wCalculateLevel(newXP);
      userRef.update({
        xp: newXP,
        level: newLevel,
        wordlePlayed: (data.wordlePlayed || 0) + 1,
        wordleWins: (data.wordleWins || 0) + (won ? 1 : 0)
      });
    });
  });
}

// ===== LEVEL CALCULATOR =====
function wCalculateLevel(xp) {
  if (xp >= 5000) return "Test Legend";
  if (xp >= 3000) return "ODI Champion";
  if (xp >= 2000) return "T20 Star";
  if (xp >= 1000) return "IPL Pro";
  if (xp >= 500)  return "State Player";
  if (xp >= 200)  return "Club Cricketer";
  return "Debutant";
}
