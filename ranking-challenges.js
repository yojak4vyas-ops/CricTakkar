// ===== RANKING CHALLENGE — CricTakkar =====
// Two kinds of challenge source:
//
// 1) RANKING_PARAMETERS — "growing leaderboard" topics (Test batting average, ODI wickets,
//    etc.). Each has a `leaders` array sorted from BEST (index 0) to WORST. At session start,
//    ranking.js randomly draws a 5-player WINDOW from this list (see pickWindowIndices() in
//    ranking.js): consecutive drawn players may never be more than 3 ranks apart in the
//    underlying leaders list, so every drawn set stays a "tight cluster" rather than jumping
//    from #1 to #20. The correct order is just the leaders list's own sort order within that
//    window — no separate correctOrder needs to be hand-written.
//    Target size per parameter: 25 leaders (started Day 27) — grown gradually over many
//    future sessions, same pace as the Wordle cap-number expansion project. While a
//    parameter has fewer than 5 leaders it's skipped for that session (not enough data yet).
//    While it has exactly 5-7, the window is effectively the whole list (same behaviour as
//    the original Day 27 fixed-5 build) — the randomness only becomes visible once a
//    parameter grows well past 5.
//
// 2) FIXED_CHALLENGES — one-off topics that don't fit a growing sorted leaderboard (a tie
//    between two IPL teams, a "who debuted earliest" list, a "biggest single-innings record"
//    list). These stay as a small hand-picked set of exactly 5, same as the whole game was
//    built on Day 11-27. May become RANKING_PARAMETERS-style growing lists later.
//
// STALENESS RULE (permanent, applies to every leader added to any parameter — see CLAUDE.md
// RANKING CHALLENGE EXPANSION PROJECT): for career-cumulative stats (battingAvg, bowlingAvg,
// runs, wickets, strikeRate, economyRate, centuries) — only fully retired players. An active
// player's number keeps moving, which could silently flip a ranking's correct order.
//
// TIES: a `leaders` entry can be marked `tiedWithNext: true` if it and the very next entry
// in the sorted list have the exact same stat value (e.g. two players tied on wicket count).
// If both members of a tied pair land in the same drawn window, the game accepts either
// order between just those two. FIXED_CHALLENGES use the older `tiedGroups` field directly
// on the challenge object (positions within `correctOrder`) — see ranking.js.

const RANKING_PARAMETERS = [
  {
    id: 'test-battingavg',
    category: 'batting',
    statType: 'battingAvg',
    format: 'test',
    question: "Rank these batsmen by Test batting average (highest to lowest)",
    hint: "Minimum 20 Test innings. Only retired players used so the answer never goes out of date.",
    leaders: [
      { name: "Don Bradman", flag: "🇦🇺", value: "Avg: 99.94" },
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Avg: 53.78" },
      { name: "Brian Lara", flag: "🇹🇹", value: "Avg: 52.88" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "Avg: 51.85" },
      { name: "Virat Kohli", flag: "🇮🇳", value: "Avg: 46.85" }
    ]
  },
  {
    id: 'test-bowlingavg',
    category: 'bowling',
    statType: 'bowlingAvg',
    format: 'test',
    question: "Rank these bowlers by career Test bowling average (best/lowest to worst)",
    hint: "Minimum 200 Test wickets. Only retired players used so the answer never goes out of date.",
    leaders: [
      { name: "Malcolm Marshall", flag: "🇧🇧", value: "Avg: 20.94" },
      { name: "Joel Garner", flag: "🇧🇧", value: "Avg: 20.97" },
      { name: "Curtly Ambrose", flag: "🇦🇬", value: "Avg: 20.99" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "Avg: 21.64" },
      { name: "Dale Steyn", flag: "🇿🇦", value: "Avg: 22.95" }
    ]
  },
  {
    id: 'test-runs',
    category: 'batting',
    statType: 'runs',
    format: 'test',
    question: "Rank these batsmen by total career Test runs (most to least)",
    hint: "All-time career Test runs — only retired players used so the answer never goes out of date.",
    leaders: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "15,921 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,378 runs" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "13,289 runs" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "13,288 runs" },
      { name: "Alastair Cook", flag: "🇬🇧", value: "12,472 runs" }
    ]
  },
  {
    id: 'test-wickets',
    category: 'bowling',
    statType: 'wickets',
    format: 'test',
    question: "Rank these bowlers by total Test wickets (most to least)",
    hint: "All-time career Test wickets.",
    leaders: [
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "800 wickets" },
      { name: "Shane Warne", flag: "🇦🇺", value: "708 wickets" },
      { name: "James Anderson", flag: "🇬🇧", value: "704 wickets" },
      { name: "Anil Kumble", flag: "🇮🇳", value: "619 wickets" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "563 wickets" }
    ]
  },
  {
    id: 'odi-runs',
    category: 'batting',
    statType: 'runs',
    format: 'odi',
    question: "Rank these batsmen by total career ODI runs (most to least)",
    hint: "All-time career ODI runs — only retired players used so the answer never goes out of date.",
    leaders: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "18,426 runs" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "14,234 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,704 runs" },
      { name: "Sanath Jayasuriya", flag: "🇱🇰", value: "13,430 runs" },
      { name: "Mahela Jayawardene", flag: "🇱🇰", value: "12,650 runs" }
    ]
  },
  {
    id: 'odi-wickets',
    category: 'bowling',
    statType: 'wickets',
    format: 'odi',
    question: "Rank these bowlers by total career ODI wickets (most to least)",
    hint: "All-time career ODI wickets — only retired players used so the answer never goes out of date.",
    leaders: [
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "534 wickets" },
      { name: "Wasim Akram", flag: "🇵🇰", value: "502 wickets" },
      { name: "Waqar Younis", flag: "🇵🇰", value: "416 wickets" },
      { name: "Chaminda Vaas", flag: "🇱🇰", value: "400 wickets" },
      { name: "Shaun Pollock", flag: "🇿🇦", value: "393 wickets" }
    ]
  }
  // Every other cell in the full taxonomy (BATTING/BOWLING/FIELDING/OTHERS x Test/ODI/T20I/IPL)
  // is still empty — see the RANKING CHALLENGE EXPANSION PROJECT section in CLAUDE.md for the
  // full sub-parameter list and the progress tracker that says which cell to fill next.
];

// ===== FIXED ONE-OFF CHALLENGES (not windowed — small hand-picked sets) =====
const FIXED_CHALLENGES = [
  {
    id: 'ipl-titles-1',
    category: 'others',
    statType: 'titles',
    format: 'ipl',
    question: "Rank these IPL teams by total IPL titles won (most to least)",
    hint: "IPL titles from 2008 to 2026.",
    players: [
      { name: "Mumbai Indians", flag: "🔵", value: "5 titles" },
      { name: "Chennai Super Kings", flag: "🟡", value: "5 titles" },
      { name: "Kolkata Knight Riders", flag: "🟣", value: "3 titles" },
      { name: "Royal Challengers Bengaluru", flag: "🔴", value: "2 titles" },
      { name: "Sunrisers Hyderabad", flag: "🟠", value: "1 title" }
    ],
    correctOrder: [0, 1, 2, 3, 4],
    tiedGroups: [[0, 1]]
    // MI 5 = CSK 5 (tied, either order accepted) > KKR 3 > RCB 2 (2025+2026) > SRH 1
  },
  {
    id: 'test-debutyear-1',
    category: 'others',
    statType: 'debutYear',
    format: 'test',
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
    id: 'odi-highestscore-1',
    category: 'batting',
    statType: 'highestScore',
    format: 'odi',
    question: "Rank these batsmen by highest individual ODI score (highest to lowest)",
    hint: "Single innings highest score in ODIs. Still a standing record — could change if broken.",
    players: [
      { name: "Rohit Sharma", flag: "🇮🇳", value: "264 vs Sri Lanka" },
      { name: "Martin Guptill", flag: "🇳🇿", value: "237* vs West Indies" },
      { name: "Chris Gayle", flag: "🇯🇲", value: "215 vs Zimbabwe" },
      { name: "Virender Sehwag", flag: "🇮🇳", value: "219 vs West Indies" },
      { name: "Fakhar Zaman", flag: "🇵🇰", value: "210* vs Zimbabwe" }
    ],
    correctOrder: [0, 1, 3, 2, 4]
    // Rohit 264 > Guptill 237* > Sehwag 219 > Gayle 215 > Fakhar 210*
  }
];
