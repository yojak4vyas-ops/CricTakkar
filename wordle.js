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
// Only picks from players that have been through the bowlingStyle/iplTeams data pass
// (Day 14 — currently just India). Players from countries not yet re-verified can still
// be guessed, they just won't come up as the secret answer until their batch is done.
function pickTodayPlayer() {
  var verifiedPlayers = wordlePlayers.filter(function(p) { return typeof p.bowlingStyle !== 'undefined'; });
  var pool = verifiedPlayers.length > 0 ? verifiedPlayers : wordlePlayers;
  var today = new Date();
  var dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  var index = dayNumber % pool.length;
  wTodayPlayer = pool[index];
}

// ===== BUILD 6 EMPTY GUESS ROWS =====
function buildGuessRows() {
  var container = document.getElementById('guessRows');
  container.innerHTML = '';
  for (var i = 0; i < wMaxGuesses; i++) {
    var row = document.createElement('div');
    row.className = 'guess-row';
    row.id = 'row-' + i;
    var cols = ['name', 'country', 'role', 'battingStyle', 'bowlingStyle', 'debutYear', 'format', 'iplTeams', 'iccTrophies'];
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

// ===== ABBREVIATIONS — keep table columns narrow enough to fit without scrolling =====
var countryAbbr = {
  'India': 'IND', 'Australia': 'AUS', 'West Indies': 'WI', 'New Zealand': 'NZ',
  'Sri Lanka': 'SL', 'Pakistan': 'PAK', 'England': 'ENG', 'South Africa': 'SA',
  'Bangladesh': 'BAN', 'Afghanistan': 'AFG', 'Zimbabwe': 'ZIM'
};
var roleAbbr = {
  'Batsman': 'BAT', 'Bowler': 'BWL', 'All-rounder': 'AR', 'Wicketkeeper': 'WK'
};
var battingStyleAbbr = { 'Right-hand': 'R', 'Left-hand': 'L' };
var bowlingStyleAbbr = {
  'NA': 'NA',
  'Right-arm fast': 'R-FAST', 'Right-arm fast-medium': 'R-FM', 'Right-arm medium-fast': 'R-MF',
  'Right-arm medium': 'R-MED', 'Right-arm offbreak': 'R-OB',
  'Right-arm legbreak': 'R-LB', 'Right-arm legbreak googly': 'R-LB',
  'Left-arm fast': 'L-FAST', 'Left-arm fast-medium': 'L-FM', 'Left-arm medium-fast': 'L-MF',
  'Left-arm medium': 'L-MED', 'Left-arm orthodox': 'L-ORT',
  'Left-arm wrist-spin (chinaman)': 'L-WS'
};
var formatAbbr = { 'All-format': 'ALL', 'ODI': 'ODI', 'Test': 'TEST', 'T20': 'T20' };

// ===== FORMAT VALUE -> SET OF FORMATS PLAYED =====
// "format" now shows the exact combination of formats a player has played, e.g. "ODI+T20"
// (ODI + T20I, no Test) or "Test+ODI" (Test + ODI, no T20I) instead of a lossy catch-all.
var formatTokens = {
  'Test': ['Test'], 'ODI': ['ODI'], 'T20': ['T20'],
  'Test+ODI': ['Test', 'ODI'], 'Test+T20': ['Test', 'T20'], 'ODI+T20': ['ODI', 'T20'],
  'All-format': ['Test', 'ODI', 'T20']
};
var iplTeamAbbr = {
  'Mumbai Indians': 'MI', 'Chennai Super Kings': 'CSK', 'Royal Challengers Bangalore': 'RCB',
  'Kolkata Knight Riders': 'KKR', 'Rajasthan Royals': 'RR', 'Deccan Chargers': 'DCH',
  'Delhi Daredevils': 'DD', 'Delhi Capitals': 'DC', 'Punjab Kings': 'PBKS',
  'Kings XI Punjab': 'KXIP', 'Gujarat Titans': 'GT', 'Lucknow Super Giants': 'LSG',
  'Sunrisers Hyderabad': 'SRH', 'Rising Pune Supergiant': 'RPS', 'Pune Warriors': 'PWI',
  'Kochi Tuskers Kerala': 'KTK', 'Gujarat Lions': 'GL'
};

// ===== SHORT DISPLAY TEXT FOR A CELL (comparisons still use the raw player values) =====
function displayValue(attr, player) {
  var v = player[attr];
  // Players from countries not yet through the Day 14 data pass won't have bowlingStyle/
  // iplTeams — show a neutral placeholder instead of the literal word "undefined".
  if (v === undefined || v === null) return attr === 'iplTeams' ? '—' : '?';
  if (attr === 'country') return countryAbbr[v] || v;
  if (attr === 'role') return roleAbbr[v] || v;
  if (attr === 'battingStyle') return battingStyleAbbr[v] || v;
  if (attr === 'bowlingStyle') return bowlingStyleAbbr[v] || v;
  if (attr === 'format') return formatAbbr[v] || v;
  if (attr === 'iplTeams') {
    if (!v || v.length === 0) return '—';
    return v.map(function(t) { return iplTeamAbbr[t] || t; }).join(',');
  }
  return v;
}

// ===== COMPARE TWO IPL TEAM LISTS =====
// green: same exact set of teams (order doesn't matter) — including both "never played IPL"
// yellow: they share at least one team but the sets aren't identical
// grey: no teams in common
function compareIplTeams(guessed, target) {
  var g = guessed || [], t = target || [];
  var gSet = g.slice().sort().join('|');
  var tSet = t.slice().sort().join('|');
  if (gSet === tSet) return 'green';
  var shared = g.some(function(team) { return t.indexOf(team) !== -1; });
  return shared ? 'yellow' : 'grey';
}

// ===== COMPARE PLAYERS =====
function comparePlayer(guessed, target) {
  var attrs = ['country', 'role', 'battingStyle', 'bowlingStyle', 'debutYear', 'format', 'iplTeams', 'iccTrophies'];
  return attrs.map(function(attr) {
    var gVal = guessed[attr];
    var tVal = target[attr];

    if (attr === 'iplTeams') return compareIplTeams(gVal, tVal);

    if (gVal === tVal) return 'green';
    if (attr === 'debutYear') {
      if (Math.abs(gVal - tVal) <= 5) return 'yellow';
    }
    if (attr === 'iccTrophies') {
      if (Math.abs(gVal - tVal) === 1) return 'yellow';
    }
    if (attr === 'format') {
      var gFormats = formatTokens[gVal] || [];
      var tFormats = formatTokens[tVal] || [];
      var overlap = gFormats.some(function(f) { return tFormats.indexOf(f) !== -1; });
      if (overlap) return 'yellow';
    }
    return 'grey';
  });
}

// ===== FILL ROW WITH COLOURS =====
function fillRow(rowIndex, player, result) {
  var attrs = ['country', 'role', 'battingStyle', 'bowlingStyle', 'debutYear', 'format', 'iplTeams', 'iccTrophies'];
  var nameCell = document.getElementById('row-' + rowIndex + '-name');
  nameCell.textContent = player.name;
  nameCell.classList.add('grey');
  attrs.forEach(function(attr, i) {
    var cell = document.getElementById('row-' + rowIndex + '-' + attr);
    cell.textContent = displayValue(attr, player);
    cell.title = attr === 'iplTeams'
      ? (player[attr] && player[attr].length ? player[attr].join(', ') : "Didn't play IPL")
      : (player[attr] === undefined ? 'Not yet verified' : player[attr]);
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

      // ===== BADGES — Wordle Wizard (Day 12) =====
      // Unlocked by winning Cricket Wordle in 3 guesses or fewer.
      var badges = data.badges || {};
      if (won && wGuesses.length <= 3) {
        badges.wordleWizard = true;
      }
      // ===== END BADGES =====

      userRef.update({
        xp: newXP,
        level: newLevel,
        wordlePlayed: (data.wordlePlayed || 0) + 1,
        wordleWins: (data.wordleWins || 0) + (won ? 1 : 0),
        badges: badges
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
