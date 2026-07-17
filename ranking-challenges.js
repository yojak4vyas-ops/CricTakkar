// ===== RANKING CHALLENGE — CricTakkar =====
// Challenge pool: every ranking challenge the game can serve.
// Each play session randomly draws 5 distinct challenges from this pool (see ranking.js).
//
// SCHEMA:
// id           — unique string
// statType     — 'battingAvg' | 'bowlingAvg' | 'runs' | 'wickets' | 'highestScore' | 'debutYear' | 'titles'
// format       — 'test' | 'odi' | 't20' | 'ipl' | 'general'
// question     — shown to the player
// hint         — shown to the player
// players      — array of 5 { name, flag, value }
// correctOrder — array of 5 player-indices, index 0 = correct rank 1 (top)
// tiedGroups   — OPTIONAL. Array of position-groups (0-indexed positions within correctOrder)
//                that are interchangeable, e.g. [[0,1]] means whichever of the two players
//                assigned to correctOrder[0]/[1] the user puts in either slot, both are correct.
//
// STALENESS RULE (added Day 27, permanent — see CLAUDE.md RANKING CHALLENGE EXPANSION PROJECT):
// For career-cumulative stats (battingAvg, bowlingAvg, runs, wickets) — ONLY fully retired
// players are used, so the correct order can never silently go wrong as an active player's
// numbers keep changing. One-off record stats (highestScore, best bowling figures) may use
// an active current record-holder, flagged in a comment as a still-standing record.
//
// VERIFICATION NOTE (Day 11-12, original 5 challenges):
// Challenge set 1 (Test batting average) uses Ricky Ponting instead of Steve Smith, because
// Smith was still an active Test player at the time and his average kept changing. Ponting
// retired in 2012, so his average (51.85) is locked forever. Kohli's final Test average
// (46.85) confirmed Day 11 — Kohli has since retired from Tests, so this is now locked too.
// Wicket counts/order verified via ESPNcricinfo/Britannica (July 2026).
// IPL titles rebuilt to include RCB's 2025 and 2026 titles, and to fix Rajasthan Royals
// (1 title, 2008 only). Verified via Wikipedia + Olympics.com (July 2026).
//
// VERIFICATION NOTE (Day 27, new batch of 4 — Four-Source Rule: ESPNcricinfo + Wikipedia +
// ICC official records, all agreed; Cricbuzz attempted for every fact, unreachable every
// time per the standing tool limitation):
// - Test bowling average: Marshall 20.94 (376 wkts), Garner 20.97 (259 wkts), Ambrose 20.99
//   (405 wkts) confirmed as the only three 200+ wicket bowlers under 21 average; McGrath
//   21.64 (563 wkts), Steyn 22.95 (439 wkts). All five fully retired.
// - ODI most runs: Tendulkar 18,426; Sangakkara 14,234; Ponting 13,704; Jayasuriya 13,430;
//   Jayawardene 12,650. Virat Kohli (currently 2nd all-time with 14,255 and still active in
//   ODIs) deliberately excluded per the staleness rule above.
// - ODI most wickets: Muralitharan 534; Wasim Akram 502; Waqar Younis 416; Vaas 400;
//   Pollock 393 (one ESPNcricinfo search snippet briefly returned "392" — resolved via a
//   clean Wikipedia infobox cross-check confirming 393; not a genuine source disagreement,
//   same self-resolution pattern used elsewhere in this project).
// - Test most runs: Tendulkar 15,921; Ponting 13,378; Kallis 13,289; Dravid 13,288 (matches
//   the figure already verified in this project on Day 17); Cook 12,472. Joe Root (currently
//   2nd all-time and still active) deliberately excluded per the staleness rule above.

const RANKING_CHALLENGES = [
  {
    id: 'test-battingavg-1',
    statType: 'battingAvg',
    format: 'test',
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
    id: 'test-wickets-1',
    statType: 'wickets',
    format: 'test',
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
    id: 'ipl-titles-1',
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
  },
  {
    id: 'test-bowlingavg-1',
    statType: 'bowlingAvg',
    format: 'test',
    question: "Rank these bowlers by career Test bowling average (best/lowest to worst)",
    hint: "Minimum 200 Test wickets. Career averages — only retired players used so the answer never goes out of date.",
    players: [
      { name: "Malcolm Marshall", flag: "🇧🇧", value: "Avg: 20.94" },
      { name: "Joel Garner", flag: "🇧🇧", value: "Avg: 20.97" },
      { name: "Curtly Ambrose", flag: "🇦🇬", value: "Avg: 20.99" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "Avg: 21.64" },
      { name: "Dale Steyn", flag: "🇿🇦", value: "Avg: 22.95" }
    ],
    correctOrder: [0, 1, 2, 3, 4]
    // Marshall 20.94 < Garner 20.97 < Ambrose 20.99 < McGrath 21.64 < Steyn 22.95
  },
  {
    id: 'odi-runs-1',
    statType: 'runs',
    format: 'odi',
    question: "Rank these batsmen by total career ODI runs (most to least)",
    hint: "All-time career ODI runs — only retired players used so the answer never goes out of date.",
    players: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "18,426 runs" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "14,234 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,704 runs" },
      { name: "Sanath Jayasuriya", flag: "🇱🇰", value: "13,430 runs" },
      { name: "Mahela Jayawardene", flag: "🇱🇰", value: "12,650 runs" }
    ],
    correctOrder: [0, 1, 2, 3, 4]
    // Tendulkar 18426 > Sangakkara 14234 > Ponting 13704 > Jayasuriya 13430 > Jayawardene 12650
  },
  {
    id: 'odi-wickets-1',
    statType: 'wickets',
    format: 'odi',
    question: "Rank these bowlers by total career ODI wickets (most to least)",
    hint: "All-time career ODI wickets — only retired players used so the answer never goes out of date.",
    players: [
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "534 wickets" },
      { name: "Wasim Akram", flag: "🇵🇰", value: "502 wickets" },
      { name: "Waqar Younis", flag: "🇵🇰", value: "416 wickets" },
      { name: "Chaminda Vaas", flag: "🇱🇰", value: "400 wickets" },
      { name: "Shaun Pollock", flag: "🇿🇦", value: "393 wickets" }
    ],
    correctOrder: [0, 1, 2, 3, 4]
    // Muralitharan 534 > Akram 502 > Waqar 416 > Vaas 400 > Pollock 393
  },
  {
    id: 'test-runs-1',
    statType: 'runs',
    format: 'test',
    question: "Rank these batsmen by total career Test runs (most to least)",
    hint: "All-time career Test runs — only retired players used so the answer never goes out of date.",
    players: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "15,921 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,378 runs" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "13,289 runs" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "13,288 runs" },
      { name: "Alastair Cook", flag: "🇬🇧", value: "12,472 runs" }
    ],
    correctOrder: [0, 1, 2, 3, 4]
    // Tendulkar 15921 > Ponting 13378 > Kallis 13289 > Dravid 13288 > Cook 12472
  }
];
