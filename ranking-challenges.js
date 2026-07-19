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
    // Literal real record order (min ~20 innings), curated to 25 recognizable names out of the
    // full list per user decision Day 28 — later "Phase 2" pass will reconcile to the exact
    // unfiltered rank order. Virat Kohli (46.85) does not rank inside the real top 40 and was
    // dropped from this cell for that reason (still appears in other cells where he qualifies).
    // ICC: exact figure confirmed for 23/25; Mohammad Yousuf and Michael Hussey have no page on
    // icc-cricket.com stating a final career average explicitly (coverage gap, not a mismatch —
    // ESPNcricinfo + Wikipedia agree exactly for both). Cricbuzz unreachable as usual.
    leaders: [
      { name: "Don Bradman", flag: "🇦🇺", value: "Avg: 99.94" },
      { name: "Graeme Pollock", flag: "🇿🇦", value: "Avg: 60.97" },
      { name: "George Headley", flag: "🇯🇲", value: "Avg: 60.83" },
      { name: "Herbert Sutcliffe", flag: "🇬🇧", value: "Avg: 60.73" },
      { name: "Ken Barrington", flag: "🇬🇧", value: "Avg: 58.67" },
      { name: "Everton Weekes", flag: "🇧🇧", value: "Avg: 58.61" },
      { name: "Wally Hammond", flag: "🇬🇧", value: "Avg: 58.45" },
      { name: "Garry Sobers", flag: "🇧🇧", value: "Avg: 57.78" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "Avg: 57.40" },
      { name: "Jack Hobbs", flag: "🇬🇧", value: "Avg: 56.94" },
      { name: "Clyde Walcott", flag: "🇧🇧", value: "Avg: 56.68" },
      { name: "Len Hutton", flag: "🇬🇧", value: "Avg: 56.67" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "Avg: 55.37" },
      { name: "Greg Chappell", flag: "🇦🇺", value: "Avg: 53.86" },
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Avg: 53.78" },
      { name: "Brian Lara", flag: "🇹🇹", value: "Avg: 52.88" },
      { name: "Javed Miandad", flag: "🇵🇰", value: "Avg: 52.57" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "Avg: 52.31" },
      { name: "Mohammad Yousuf", flag: "🇵🇰", value: "Avg: 52.29" },
      { name: "Younis Khan", flag: "🇵🇰", value: "Avg: 52.05" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "Avg: 51.85" },
      { name: "Michael Hussey", flag: "🇦🇺", value: "Avg: 51.52" },
      { name: "Shivnarine Chanderpaul", flag: "🇬🇾", value: "Avg: 51.37" },
      { name: "Sunil Gavaskar", flag: "🇮🇳", value: "Avg: 51.12" },
      { name: "Steve Waugh", flag: "🇦🇺", value: "Avg: 51.06" }
    ]
  },
  {
    id: 'test-bowlingavg',
    category: 'bowling',
    statType: 'bowlingAvg',
    format: 'test',
    question: "Rank these bowlers by career Test bowling average (best/lowest to worst)",
    hint: "Minimum 200 Test wickets. Only retired players used so the answer never goes out of date.",
    // Literal real record order (min 200 wickets, retired only), expanded 5->25 Day 28.
    // Ravichandran Ashwin: ESPNcricinfo shows 24.00, Wikipedia shows 23.95 (ICC's own coverage
    // only gives a rounded "average of 24" reference, consistent with ESPNcricinfo but not a
    // precise independent figure) - a genuine small mismatch. User decision (Day 28): keep
    // 24.00.
    leaders: [
      { name: "Malcolm Marshall", flag: "🇧🇧", value: "Avg: 20.94" },
      { name: "Joel Garner", flag: "🇧🇧", value: "Avg: 20.97" },
      { name: "Curtly Ambrose", flag: "🇦🇬", value: "Avg: 20.99" },
      { name: "Fred Trueman", flag: "🇬🇧", value: "Avg: 21.57" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "Avg: 21.64" },
      { name: "Allan Donald", flag: "🇿🇦", value: "Avg: 22.25" },
      { name: "Richard Hadlee", flag: "🇳🇿", value: "Avg: 22.29" },
      { name: "Vernon Philander", flag: "🇿🇦", value: "Avg: 22.32" },
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "Avg: 22.72" },
      { name: "Imran Khan", flag: "🇵🇰", value: "Avg: 22.81" },
      { name: "Dale Steyn", flag: "🇿🇦", value: "Avg: 22.95" },
      { name: "Ray Lindwall", flag: "🇦🇺", value: "Avg: 23.03" },
      { name: "Shaun Pollock", flag: "🇿🇦", value: "Avg: 23.11" },
      { name: "Waqar Younis", flag: "🇵🇰", value: "Avg: 23.56" },
      { name: "Wasim Akram", flag: "🇵🇰", value: "Avg: 23.62" },
      { name: "Michael Holding", flag: "🇯🇲", value: "Avg: 23.68" },
      { name: "Dennis Lillee", flag: "🇦🇺", value: "Avg: 23.92" },
      { name: "Ravichandran Ashwin", flag: "🇮🇳", value: "Avg: 24.00" },
      { name: "Clarrie Grimmett", flag: "🇦🇺", value: "Avg: 24.21" },
      { name: "Fanie de Villiers", flag: "🇿🇦", value: "Avg: 24.27" },
      { name: "Courtney Walsh", flag: "🇯🇲", value: "Avg: 24.44" },
      { name: "Brian Statham", flag: "🇬🇧", value: "Avg: 24.84" },
      { name: "Alec Bedser", flag: "🇬🇧", value: "Avg: 24.89" },
      { name: "Shane Warne", flag: "🇦🇺", value: "Avg: 25.41" },
      { name: "James Anderson", flag: "🇬🇧", value: "Avg: 26.45" }
    ]
  },
  {
    id: 'test-runs',
    category: 'batting',
    statType: 'runs',
    format: 'test',
    question: "Rank these batsmen by total career Test runs (most to least)",
    hint: "All-time career Test runs — only retired players used so the answer never goes out of date.",
    // Literal real record order, retired only, expanded 5->25 Day 30. Joe Root and Steve Smith
    // are the only 2 active players in the real all-time top ~25 (both confirmed still playing
    // Test cricket in 2026) - excluded per the staleness rule. Kane Williamson (retired 12 Jun
    // 2026), Virat Kohli (retired 12 May 2025), and David Warner (retired Jan 2024) are all
    // newly-retired and now eligible. Real order confirmed via ESPNcricinfo + Wikipedia +
    // cross-checked against the ACS (Association of Cricket Statisticians) official records
    // table. Two search-synthesis mismatches were caught and resolved by going to a primary
    // source directly (not real cross-source disagreements): Michael Clarke's total was briefly
    // misreported as 8,628 by one search summary - both ESPNcricinfo and Wikipedia confirm
    // 8,643. Inzamam-ul-Haq's total was briefly misreported as 8,820/8,829 by other summaries -
    // his live Wikipedia infobox confirms 8,830, matching ESPNcricinfo and ACS.
    leaders: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "15,921 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,378 runs" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "13,289 runs" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "13,288 runs" },
      { name: "Alastair Cook", flag: "🇬🇧", value: "12,472 runs" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "12,400 runs" },
      { name: "Brian Lara", flag: "🇹🇹", value: "11,953 runs" },
      { name: "Shivnarine Chanderpaul", flag: "🇬🇾", value: "11,867 runs" },
      { name: "Mahela Jayawardene", flag: "🇱🇰", value: "11,814 runs" },
      { name: "Allan Border", flag: "🇦🇺", value: "11,174 runs" },
      { name: "Steve Waugh", flag: "🇦🇺", value: "10,927 runs" },
      { name: "Sunil Gavaskar", flag: "🇮🇳", value: "10,122 runs" },
      { name: "Younis Khan", flag: "🇵🇰", value: "10,099 runs" },
      { name: "Kane Williamson", flag: "🇳🇿", value: "9,515 runs" },
      { name: "Hashim Amla", flag: "🇿🇦", value: "9,282 runs" },
      { name: "Graeme Smith", flag: "🇿🇦", value: "9,265 runs" },
      { name: "Virat Kohli", flag: "🇮🇳", value: "9,230 runs" },
      { name: "Graham Gooch", flag: "🇬🇧", value: "8,900 runs" },
      { name: "Javed Miandad", flag: "🇵🇰", value: "8,832 runs" },
      { name: "Inzamam-ul-Haq", flag: "🇵🇰", value: "8,830 runs" },
      { name: "David Warner", flag: "🇦🇺", value: "8,786 runs" },
      { name: "VVS Laxman", flag: "🇮🇳", value: "8,781 runs" },
      { name: "AB de Villiers", flag: "🇿🇦", value: "8,765 runs" },
      { name: "Michael Clarke", flag: "🇦🇺", value: "8,643 runs" },
      { name: "Matthew Hayden", flag: "🇦🇺", value: "8,625 runs" }
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
    id: 'odi-battingavg',
    category: 'batting',
    statType: 'battingAvg',
    format: 'odi',
    question: "Rank these batsmen by ODI batting average (highest to lowest)",
    hint: "Minimum 20 ODI innings. Only retired players used so the answer never goes out of date.",
    leaders: [
      { name: "Michael Bevan", flag: "🇦🇺", value: "Avg: 53.58" },
      { name: "AB de Villiers", flag: "🇿🇦", value: "Avg: 53.50" },
      { name: "MS Dhoni", flag: "🇮🇳", value: "Avg: 50.57" },
      { name: "Hashim Amla", flag: "🇿🇦", value: "Avg: 49.46" },
      { name: "Viv Richards", flag: "🇦🇬", value: "Avg: 47.00" }
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
