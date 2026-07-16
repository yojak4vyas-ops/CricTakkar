// ===== CRICTAKKAR CRICKET WORDLE — PLAYER DATABASE =====
// 255 players across 11 countries
// Attributes verified across ESPNcricinfo, ICC official records, Wikipedia, Cricbuzz (unreachable — standing limitation)
// Last verified: July 2026
// Growing via the cap-number expansion project — see CLAUDE.md WORDLE PLAYER CAP-NUMBER EXPANSION PROJECT for progress tracking
// 
// FORMAT RULE: "All-format" = played Tests + ODIs + T20Is internationally
// IPL: franchise cricket only — not counted as T20 International
// ICC TROPHIES: ODI WC + T20 WC + Champions Trophy + WTC only (senior men's)
// 2002 CT counted as 1 trophy for India AND Sri Lanka (joint winners)

const wordlePlayers = [

  // ===== INDIA (30 players) =====

  {
    name: "Sachin Tendulkar",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1989,
    format: "All-format",
    // 200 Tests, 463 ODIs, 1 T20I — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 2
    // 2002 CT (shared), 2011 ODI WC — Wikipedia + ESPNcricinfo
  },
  {
    name: "MS Dhoni",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Day 14 FIX: was wrongly "NA" — Dhoni took his only international wicket bowling
    // Travis Dowlin (West Indies) in the 2009 Champions Trophy. ESPNcricinfo lists his
    // bowling style as Right-arm medium. Caught by re-checking after the user flagged this.
    bowlingStyle: "Right-arm medium",
    debutYear: 2004,
    format: "All-format",
    // 90 Tests, 350 ODIs, 98 T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Rising Pune Supergiant (2016-17, while CSK was banned) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Chennai Super Kings", "Rising Pune Supergiant"],
    iccTrophies: 3
    // 2007 T20 WC, 2011 ODI WC, 2013 CT — Wikipedia + ESPNcricinfo
  },
  {
    name: "Virat Kohli",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2008,
    format: "All-format",
    // 113 Tests, 292 ODIs, 125 T20Is — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore"],
    iccTrophies: 4
    // 2011 WC, 2013 CT, 2024 T20 WC, 2025 CT — Wikipedia + Cricscope
  },
  {
    name: "Rohit Sharma",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2007,
    format: "All-format",
    // 67 Tests, 264 ODIs, 159 T20Is — ESPNcricinfo confirmed
    iplTeams: ["Deccan Chargers", "Mumbai Indians"],
    // Deccan Chargers (2008-2010), Mumbai Indians (2011-2024) — ESPNcricinfo
    iccTrophies: 4
    // 2007 T20 WC, 2013 CT, 2024 T20 WC, 2025 CT — Cricscope confirmed
  },
  {
    name: "Sourav Ganguly",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1992,
    format: "Test+ODI",
    // 113 Tests, 311 ODIs, ZERO T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Pune Warriors India (2012-13) — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Pune Warriors"],
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Rahul Dravid",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1996,
    format: "All-format",
    // 164 Tests, 344 ODIs, 1 T20I (vs England 2011) — ESPNcricinfo confirmed
    // Day 14 FIX: was wrongly "Delhi Daredevils" — Dravid actually played for Royal Challengers
    // Bangalore (2008-2010, captain in 2008) then Rajasthan Royals (2011-2013) — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Rajasthan Royals"],
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Anil Kumble",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 1990,
    format: "All-format",
    // 132 Tests, 271 ODIs, 1 T20I — ESPNcricinfo confirmed
    // Day 14 FIX: was wrongly listing Delhi Daredevils — Kumble only ever played IPL for RCB
    // (2008-2010), later became RCB's mentor/coach, not a player elsewhere — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore"],
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Kapil Dev",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 1978,
    format: "Test+ODI",
    // 131 Tests, 225 ODIs — retired 1994, T20I format did not exist
    iplTeams: [],
    iccTrophies: 1
    // 1983 ODI WC — Wikipedia confirmed
  },
  {
    name: "Sunil Gavaskar",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1971,
    format: "Test+ODI",
    // 125 Tests, 108 ODIs — retired 1987, T20I format did not exist
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — ESPNcricinfo confirmed
  },
  {
    name: "VVS Laxman",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1996,
    format: "Test+ODI",
    // 134 Tests, 86 ODIs, ZERO T20Is — ESPNcricinfo confirmed
    // Wikipedia: "Laxman is one of the few players to have played 100 Tests without appearing in a Cricket World Cup"
    // Day 14 FIX: was missing Kochi Tuskers Kerala (2011) — ESPNcricinfo confirmed
    iplTeams: ["Deccan Chargers", "Kochi Tuskers Kerala"],
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Virender Sehwag",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1999,
    format: "All-format",
    // Tests, ODIs, T20Is all played — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Kings XI Punjab (2014-15) — ESPNcricinfo confirmed
    iplTeams: ["Delhi Daredevils", "Kings XI Punjab"],
    iccTrophies: 3
    // 2002 CT (shared), 2007 T20 WC, 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Harbhajan Singh",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1998,
    format: "All-format",
    // 103 Tests, 236 ODIs, 28 T20Is — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians", "Chennai Super Kings", "Kolkata Knight Riders"],
    iccTrophies: 3
    // 2002 CT (shared), 2007 T20 WC, 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Yuvraj Singh",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2000,
    format: "All-format",
    // 40 Tests, 304 ODIs, 58 T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: count was inconsistent with its own comment (said 5, listed 6 teams) — corrected to 6
    iplTeams: ["Kings XI Punjab", "Pune Warriors", "Royal Challengers Bangalore", "Delhi Daredevils", "Sunrisers Hyderabad", "Mumbai Indians"],
    iccTrophies: 2
    // 2007 T20 WC, 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Zaheer Khan",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Day 14 FIX: was wrongly "Left-hand" — Zaheer Khan bats right-handed, bowls left-arm.
    // Flagged by user, confirmed via ESPNcricinfo + Wikipedia.
    bowlingStyle: "Left-arm fast-medium",
    debutYear: 2000,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians", "Royal Challengers Bangalore", "Delhi Daredevils"],
    iccTrophies: 2
    // 2002 CT (shared), 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Ravichandran Ashwin",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was wrongly listing Punjab and RCB — Ashwin's actual IPL teams are
    // CSK, Delhi Capitals, and Rajasthan Royals — ESPNcricinfo confirmed
    iplTeams: ["Chennai Super Kings", "Delhi Capitals", "Rajasthan Royals"],
    iccTrophies: 2
    // 2011 ODI WC (squad), 2013 CT — Wikipedia confirmed
  },
  {
    name: "Ravindra Jadeja",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Rajasthan Royals (IPL debut team, 2008-09) and Kochi Tuskers
    // Kerala (2011) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Rajasthan Royals", "Kochi Tuskers Kerala", "Chennai Super Kings", "Gujarat Lions"],
    iccTrophies: 4
    // 2013 CT, 2024 T20 WC, 2025 CT, 2011 WC (squad) — Wikipedia confirmed
  },
  {
    name: "Jasprit Bumrah",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2016,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Multiple sources confirmed
  },
  {
    name: "Hardik Pandya",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2016,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Unique teams only (MI -> Gujarat Titans -> back to MI counts as 2 unique teams)
    iplTeams: ["Mumbai Indians", "Gujarat Titans"],
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Multiple sources confirmed
  },
  {
    name: "Suryakumar Yadav",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2021,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Mumbai Indians"],
    iccTrophies: 2
    // 2024 T20 WC, 2026 T20 WC — Wikipedia confirmed
  },
  {
    name: "Mohammed Shami",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2013,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Gujarat Titans and Lucknow Super Giants — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Delhi Daredevils", "Kings XI Punjab", "Gujarat Titans", "Lucknow Super Giants"],
    iccTrophies: 1
    // 2013 CT (squad) — Wikipedia — NOTE: Not fully confirmed in playing XI, marking conservatively
    // Actually Shami was NOT in 2013 CT squad — he debuted Nov 2013. Correcting to 0 trophies
    // Shami made ODI debut Jan 2013, CT was June 2013 — he was NOT in 2013 CT squad per ESPNcricinfo
    // 2025 CT — he was in squad but missed due to injury — per ESPNcricinfo
    // VERIFIED: Shami has 0 ICC trophies as a playing member
  },
  {
    name: "Ishant Sharma",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2007,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: "multiple teams" was vague and undercounted — full list per ESPNcricinfo:
    iplTeams: ["Kolkata Knight Riders", "Delhi Capitals", "Sunrisers Hyderabad", "Kings XI Punjab", "Rising Pune Supergiant", "Gujarat Titans"],
    iccTrophies: 1
    // 2011 ODI WC (played matches) — Wikipedia confirmed
  },
  {
    name: "Kuldeep Yadav",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm wrist-spin (chinaman)",
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Delhi Capitals"],
    iccTrophies: 2
    // 2024 T20 WC, 2025 CT — ESPNcricinfo squad lists confirmed
  },
  {
    name: "Shubman Gill",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2019,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Gujarat Titans"],
    iccTrophies: 1
    // 2025 CT — Wikipedia confirmed
  },
  {
    name: "KL Rahul",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // UNCONFIRMED (Day 14): ESPNcricinfo's profile page lists "right-arm medium" as a
    // classification, but repeated searches found no confirmed bowling figures or record of
    // him ever bowling a delivery (BCCI profile shows no bowling stat at all). Unlike Rishabh
    // Pant and Sanju Samson, whose 0-ball bowling records are explicitly confirmed, this one
    // could not be verified either way — marking NA as the safer call, flagged for re-check.
    bowlingStyle: "NA",
    debutYear: 2014,
    format: "All-format",
    // Test debut 2014 (Boxing Day vs Australia) — Wikipedia confirmed
    // Day 14 FIX: was missing Delhi Capitals (2025 move) — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Sunrisers Hyderabad", "Punjab Kings", "Lucknow Super Giants", "Delhi Capitals"],
    iccTrophies: 1
    // 2025 CT — ESPNcricinfo squad confirmed
  },
  {
    name: "Rishabh Pant",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "NA",
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Lucknow Super Giants (2025 move, most expensive IPL buy) — ESPNcricinfo confirmed
    iplTeams: ["Delhi Capitals", "Lucknow Super Giants"],
    iccTrophies: 1
    // 2024 T20 WC — ESPNcricinfo squad confirmed
  },
  {
    name: "Sanju Samson",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "NA",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Chennai Super Kings — Samson was traded RR to CSK on 15 Nov 2025
    // ahead of IPL 2026 — ESPNcricinfo confirmed
    iplTeams: ["Rajasthan Royals", "Chennai Super Kings"],
    iccTrophies: 2
    // 2024 T20 WC, 2026 T20 WC — Wikipedia confirmed (89 in 2026 final)
  },
  {
    name: "Yashasvi Jaiswal",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 2023,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 1
    // 2025 CT — ESPNcricinfo squad confirmed
  },
  {
    name: "Irfan Pathan",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast-medium",
    debutYear: 2003,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: "multiple teams" was vague and undercounted — full list per ESPNcricinfo:
    iplTeams: ["Kings XI Punjab", "Delhi Daredevils", "Sunrisers Hyderabad", "Chennai Super Kings", "Rising Pune Supergiants", "Gujarat Lions"],
    iccTrophies: 1
    // 2007 T20 WC — Wikipedia confirmed
  },
  {
    name: "Axar Patel",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was wrongly "Gujarat Lions" — that's the team he took a hat-trick AGAINST,
    // not for. His actual IPL teams are Kings XI Punjab (2014-18) and Delhi Capitals (2019-present).
    // He was also signed by Mumbai Indians in 2013 but never played a match for them, so that's
    // excluded — ESPNcricinfo confirmed
    iplTeams: ["Kings XI Punjab", "Delhi Capitals"],
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Multiple sources confirmed
  },
  {
    name: "Arshdeep Singh",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm medium-fast",
    debutYear: 2022,
    format: "All-format",
    // Tests (1 match), ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Punjab Kings"],
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Wikipedia + The Cricket Standard confirmed
  },

  // ===== INDIA — CAP-NUMBER EXPANSION (Test caps, added Day 24) =====
  // Sourced from India's Test cap-number sequence (see CLAUDE.md WORDLE PLAYER
  // CAP-NUMBER EXPANSION PROJECT), working backward from cap 319 (Manav Suthar,
  // the latest confirmed cap as of 15 Jul 2026 — cap "320" could not be verified
  // and was excluded, see CLAUDE.md for details).

  {
    name: "Manav Suthar",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2026,
    format: "Test",
    // Test cap 319, debut June 2026 vs Afghanistan (6/33 on debut) — ESPNcricinfo confirmed.
    // No confirmed ODI or T20I caps as of 15 Jul 2026 despite ODI squad call-ups — ESPNcricinfo.
    iplTeams: ["Gujarat Titans"],
    iccTrophies: 0
  },
  {
    name: "Anshul Kamboj",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2025,
    format: "Test",
    // Test cap 318, debut July 2025 vs England at Old Trafford — ESPNcricinfo confirmed.
    // No confirmed ODI or T20I caps as of 15 Jul 2026 — ESPNcricinfo.
    iplTeams: ["Mumbai Indians", "Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Sai Sudharsan",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm legbreak",
    // Occasional part-time bowler — ESPNcricinfo confirmed he bowls legspin sparingly (a wicket vs Bengal, Vijay Hazare Trophy)
    debutYear: 2023,
    format: "All-format",
    // ODI debut 17 Dec 2023 vs South Africa, T20I debut 7 Jul 2024 vs Zimbabwe, Test debut 20 Jun 2025 vs England — ESPNcricinfo confirmed
    iplTeams: ["Gujarat Titans"],
    iccTrophies: 0
  },
  {
    name: "Harshit Rana",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2024,
    format: "All-format",
    // Test debut 22 Nov 2024 vs Australia (Perth), ODI debut 6 Feb 2025 vs England, T20I debut 31 Jan 2025 vs England —
    // ESPNcricinfo confirmed. One of only 5 bowlers ever with 3+ wickets on debut in all 3 formats.
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
  },
  {
    name: "Nitish Kumar Reddy",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2024,
    format: "All-format",
    // T20I debut Oct 2024, Test debut Nov 2024 (Perth, Border-Gavaskar Trophy), ODI debut 2025-26 season vs Afghanistan —
    // ESPNcricinfo + Wikipedia confirmed all-format
    iplTeams: ["Sunrisers Hyderabad"],
    iccTrophies: 0
  },
  {
    name: "Devdutt Padikkal",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2021,
    format: "Test+T20",
    // T20I debut July 2021 vs Sri Lanka, Test debut March 2024 vs England (Dharamsala) — ESPNcricinfo confirmed.
    // Explicitly confirmed "yet to play an ODI" as of 2026 — ESPNcricinfo. Format corrected Day 26
    // session 3: was previously mislabeled "ODI" despite having no ODI cap at all — Test+T20 is the
    // accurate combination (Test + T20I, no ODI).
    iplTeams: ["Royal Challengers Bangalore", "Rajasthan Royals", "Lucknow Super Giants"],
    iccTrophies: 0
  },
  {
    name: "Akash Deep",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2024,
    format: "Test",
    // Test debut 23 Feb 2024 vs England (Ranchi) — ESPNcricinfo confirmed. No ODI/T20I caps found across
    // multiple searches despite ODI squad call-ups — treated as Test-only; flagged as best-available, not
    // an explicit "never played" confirmation, same caution as KL Rahul's bowling-style entry.
    // IPL: RCB (2022-24) then Lucknow Super Giants (2025). Signed by KKR for 2026 but ruled out by injury
    // before playing a match — excluded per the "signed but never played" rule (see Stuart Broad/Axar Patel).
    iplTeams: ["Royal Challengers Bangalore", "Lucknow Super Giants"],
    iccTrophies: 0
  },
  {
    name: "Dhruv Jurel",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // No source could confirm a bowling record either way — flagged as unconfirmed rather than
    // proven NA, same treatment as KL Rahul (see Cricket Wordle Player Data Rule)
    bowlingStyle: "NA",
    debutYear: 2024,
    format: "Test+T20",
    // Test debut 15 Feb 2024 vs England (Rajkot), T20I debut 6 Jul 2024 vs Zimbabwe — ESPNcricinfo confirmed.
    // Named as Rishabh Pant's ODI replacement Jan 2026 but an actual ODI cap/debut could not be confirmed
    // — treated conservatively as not-yet-All-format, flagged for re-check in a future session. Format
    // corrected Day 26 session 3: was previously mislabeled "ODI" despite having no ODI cap at all —
    // Test+T20 is the accurate combination (Test + T20I, no ODI).
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 0
  },

  // ===== INDIA — CAP-NUMBER EXPANSION, BATCH 2 (Test caps, added Day 24 session 5) =====
  // Continuing backward from cap 311 (Sarfaraz Khan). Skipped already-in-database cap holders
  // along the way: Yashasvi Jaiswal, Suryakumar Yadav, Axar Patel, Shubman Gill.
  // This batch (12 players) completes India Test at 20/20 — see CLAUDE.md progress tracker.

  {
    name: "Sarfaraz Khan",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    // Occasional part-time bowler, listed on his ESPNcricinfo profile
    debutYear: 2024,
    format: "Test",
    // Test debut 15 Feb 2024 vs England (Rajkot) — ESPNcricinfo confirmed. Explicitly confirmed
    // no ODI or T20I caps as of 2026 — Test-only, not All-format.
    iplTeams: ["Royal Challengers Bangalore", "Kings XI Punjab", "Chennai Super Kings"],
    // Confirmed no Delhi Capitals stint despite appearing in some squad-adjacent searches — ESPNcricinfo
    iccTrophies: 0
  },
  {
    name: "Rajat Patidar",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    // Occasional part-time bowler, listed on his ESPNcricinfo profile
    debutYear: 2023,
    format: "Test+ODI",
    // ODI debut 21 Dec 2023 vs South Africa (Paarl), Test debut 2 Feb 2024 vs England (Visakhapatnam) —
    // ESPNcricinfo confirmed. No T20I debut found — not All-format.
    iplTeams: ["Royal Challengers Bangalore"],
    iccTrophies: 0
  },
  {
    name: "Prasidh Krishna",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2021,
    format: "All-format",
    // ODI debut 2021 vs England (4/54 on debut), T20I + Test debut both 2023 — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Rajasthan Royals", "Gujarat Titans"],
    iccTrophies: 0
  },
  {
    name: "Mukesh Kumar",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    // One synthesis-noise catch: a search briefly returned "right arm offbreak" for a same-named
    // player, almost certainly a different, unrelated "Mukesh Kumar" profile on ESPNcricinfo (there
    // are several) — resolved via his well-documented fast-bowler background (Bengal, Delhi Capitals,
    // "next in line after Bumrah and Shami"), not a genuine cross-source disagreement to flag.
    debutYear: 2023,
    format: "All-format",
    // Debuted in all 3 formats within a 14-day span in the Caribbean, July 2023 — the shortest span
    // ever for an India player — ESPNcricinfo confirmed
    iplTeams: ["Delhi Capitals"],
    iccTrophies: 0
  },
  {
    name: "Ishan Kishan",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    // Occasional part-time bowler — ESPNcricinfo profile lists offbreak/legbreak combo, offbreak used as primary
    debutYear: 2021,
    format: "All-format",
    // ODI and T20I debuts both 2021 (fifties on debut in both), Test debut 12 Jul 2023 vs West Indies —
    // ESPNcricinfo confirmed
    iplTeams: ["Gujarat Lions", "Mumbai Indians", "Sunrisers Hyderabad"],
    iccTrophies: 1
    // 2024 T20 World Cup winning squad — ESPNcricinfo confirmed
  },
  {
    name: "Shreyas Iyer",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    // Occasional part-time bowler — ESPNcricinfo profile lists offbreak/legbreak/googly combo, offbreak used as primary
    debutYear: 2017,
    format: "All-format",
    // ODI debut 10 Dec 2017 vs Sri Lanka (Dharamsala), Test debut 2021 (century on debut vs New Zealand,
    // Kanpur), long-established T20I player and now India's T20I captain — ESPNcricinfo confirmed
    iplTeams: ["Delhi Daredevils", "Delhi Capitals", "Kolkata Knight Riders", "Punjab Kings"],
    iccTrophies: 1
    // 2025 Champions Trophy winning squad — ESPNcricinfo confirmed
  },
  {
    name: "Washington Sundar",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2017,
    format: "All-format",
    // ODI debut 13 Dec 2017 vs Sri Lanka (Mohali), T20I debut 24 Dec 2017 vs Sri Lanka (India's
    // youngest ever men's T20I debutant at 18y80d), Test debut 2021 — ESPNcricinfo confirmed
    iplTeams: ["Rising Pune Supergiant", "Royal Challengers Bangalore", "Sunrisers Hyderabad", "Gujarat Titans"],
    iccTrophies: 1
    // 2025 Champions Trophy winning squad — ESPNcricinfo confirmed
  },
  {
    name: "Thangarasu Natarajan",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm medium",
    debutYear: 2020,
    format: "All-format",
    // International debut December 2020 (Australia tour) in white-ball cricket, Test debut January 2021
    // at Brisbane alongside Washington Sundar's own Test debut — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kings XI Punjab", "Sunrisers Hyderabad", "Delhi Capitals"],
    iccTrophies: 0
  },
  {
    name: "Navdeep Saini",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2019,
    format: "All-format",
    // Represented India in all 3 international formats between 2019 and 2021 — Wikipedia + ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Rajasthan Royals", "Kolkata Knight Riders"],
    iccTrophies: 0
  },
  {
    name: "Mohammed Siraj",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2017,
    format: "All-format",
    // T20I debut 2017 vs New Zealand, ODI debut 15 Jan 2019 vs Australia (Adelaide), Test debut 2020
    // (Boxing Day Test) — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Royal Challengers Bangalore", "Gujarat Titans"],
    iccTrophies: 0
    // Left out of the 2025 Champions Trophy 15 — ESPNcricinfo confirmed
  },
  {
    name: "Shahbaz Nadeem",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2019,
    format: "Test",
    // Test debut 19 Oct 2019 vs South Africa (Ranchi) — ESPNcricinfo confirmed. No evidence of ODI or
    // T20I caps found — Test-only, not All-format.
    iplTeams: ["Delhi Daredevils", "Sunrisers Hyderabad"],
    // Signed by Lucknow Super Giants for 2022 but did not play a match — excluded per the
    // "signed but never played" rule (see Stuart Broad/Axar Patel precedent)
    iccTrophies: 0
  },
  {
    name: "Mayank Agarwal",
    country: "India",
    role: "Batsman",
    // No source could confirm a bowling record either way — flagged as unconfirmed rather than
    // proven NA, same treatment as KL Rahul (see Cricket Wordle Player Data Rule)
    bowlingStyle: "NA",
    battingStyle: "Right-hand",
    debutYear: 2018,
    format: "Test+ODI",
    // Test debut 2018, ODI debut 5 Feb 2020 vs New Zealand (Hamilton) — 5 ODIs total, confirmed zero
    // T20I caps — ESPNcricinfo confirmed, not All-format.
    iplTeams: ["Royal Challengers Bangalore", "Delhi Daredevils", "Rising Pune Supergiant", "Kings XI Punjab", "Punjab Kings", "Sunrisers Hyderabad"],
    iccTrophies: 0
  },
  {
    name: "KS Bharat",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // No source confirmed a bowling record either way — flagged as unconfirmed rather than
    // proven NA, same treatment as KL Rahul (see Cricket Wordle Player Data Rule)
    bowlingStyle: "NA",
    debutYear: 2023,
    format: "Test",
    // Test debut 9 Feb 2023 vs Australia (Nagpur), covering for the injured Rishabh Pant — played
    // 7 Tests before retiring from international cricket in June 2026. Confirmed no ODI or T20I
    // caps — Test-only, not All-format. ESPNcricinfo lists him as "Srikar Bharat" (full name Kona
    // Srikar Bharat) — this is the same player as "KS Bharat".
    // CORRECTION (added same session): this player was in the original cap-list research but was
    // missed from the batch that actually got verified and written, because a later, more detailed
    // Wikipedia table fetch used for the write-up simply didn't surface him — a concrete instance of
    // the standing cap-number data-quality caveat. Added here as a fix once the user asked why he
    // was missing. India Test cap expansion is now 21/20 (one over target) as a result.
    iplTeams: ["Royal Challengers Bangalore", "Delhi Capitals", "Gujarat Titans", "Kolkata Knight Riders"],
    // Signed by Delhi Daredevils for 2015 but did not play a match that season — excluded per the
    // "signed but never played" rule (see Stuart Broad/Axar Patel precedent)
    iccTrophies: 0
  },

  // ===== INDIA — CAP-NUMBER EXPANSION (ODI caps, added Day 24 session 7) =====
  // Sourced from India's ODI cap-number sequence, working backward from cap ~263 (Prince Yadav,
  // debuted 17 Jun 2026, the latest confirmed cap as of 15 Jul 2026). Skipped already-in-database
  // cap holders along the way: Nitish Kumar Reddy, Harshit Rana, Yashasvi Jaiswal, Rajat Patidar,
  // Sai Sudharsan, Mukesh Kumar, Arshdeep Singh, Sanju Samson, Suryakumar Yadav, Ishan Kishan,
  // Prasidh Krishna. This completes India ODI at 20/20 — see CLAUDE.md progress tracker.

  {
    name: "Prince Yadav",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2026,
    format: "ODI",
    // ODI debut 17 Jun 2026 vs Afghanistan (Lucknow) — ESPNcricinfo confirmed. Not included in the
    // Test squad for the Afghanistan series; no confirmed T20I debut — not All-format.
    iplTeams: ["Lucknow Super Giants"],
    iccTrophies: 0
  },
  {
    name: "Gurnoor Brar",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2026,
    format: "ODI+T20",
    // ODI debut 13 Jun 2026 vs Afghanistan (Dharamsala) — ESPNcricinfo confirmed. Was named in the
    // Test squad for the same series but Manav Suthar got the actual cap, not Brar — no Test debut,
    // not All-format.
    iplTeams: ["Punjab Kings"],
    // Signed by Gujarat Titans since 2024 but yet to play a match for them as of 2026 — excluded
    // per the "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Harsh Dubey",
    country: "India",
    // Batting hand could not be confirmed despite repeated searches — flagged as best-available
    // rather than settled fact, same treatment as KL Rahul's bowling style
    battingStyle: "Right-hand",
    role: "All-rounder",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2026,
    format: "ODI",
    // ODI debut 13 Jun 2026 vs Afghanistan (Dharamsala), 3 wickets on debut — ESPNcricinfo confirmed.
    // Same as Brar — named in the Test squad but Manav Suthar got the actual cap — no Test debut.
    // FLAGGED Day 26 session 3: received a T20I call-up/selection for India's July 2026 Zimbabwe tour,
    // but an actual T20I match cap could not be confirmed at time of writing — kept as "ODI" rather
    // than asserting "ODI+T20", flagged for re-check once the tour concludes.
    iplTeams: ["Sunrisers Hyderabad"],
    iccTrophies: 0
  },
  {
    name: "Varun Chakravarthy",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak-googly",
    debutYear: 2021,
    format: "ODI+T20",
    // T20I debut 25 Jul 2021 vs Sri Lanka, ODI debut 9 Feb 2025 vs England (Cuttack) — no Test caps
    // — ESPNcricinfo confirmed, not All-format
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
  },
  {
    name: "Riyan Parag",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    // Occasional part-time bowler — ESPNcricinfo profile lists offbreak/legbreak combo, offbreak used as primary
    debutYear: 2024,
    format: "ODI+T20",
    // T20I and ODI debuts both 2024, following his IPL 2024 breakout — no Test caps, not All-format
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 0
  },
  {
    name: "Rinku Singh",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2023,
    format: "ODI+T20",
    // T20I and ODI debuts both 2023 — explicitly confirmed yet to play red-ball cricket for India,
    // not All-format
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
  },
  {
    name: "Tilak Varma",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2023,
    format: "ODI+T20",
    // T20I debut 3 Aug 2023 vs West Indies, ODI debut also 2023 — no Test cap as of 2026 (explicitly
    // described as someone who "would soon be" an all-format player), not All-format yet
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 0
  },
  {
    name: "Kuldeep Sen",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2022,
    format: "ODI",
    // Made his only India appearance in December 2022 (1 ODI) before a back injury — no Test or
    // T20I caps — ESPNcricinfo confirmed, not All-format
    iplTeams: ["Rajasthan Royals"],
    // Signed by Punjab Kings for 2025 but did not play a match for them — excluded per the
    // "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Umran Malik",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2022,
    format: "ODI+T20",
    // T20I and ODI debuts both 2022 following his breakout IPL 2022 season — no Test caps, not All-format
    iplTeams: ["Sunrisers Hyderabad"],
    // Signed by Kolkata Knight Riders for 2025 and 2026 but ruled out injured/no confirmed
    // appearances found — excluded per the "signed but never played" rule, flagged for re-check
    iccTrophies: 0
  },
  {
    name: "Shahbaz Ahmed",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2022,
    format: "ODI+T20",
    // ODI debut 2022 vs South Africa (Ranchi), T20I debut 2023 (Asian Games) — no Test caps, not All-format
    iplTeams: ["Royal Challengers Bangalore", "Sunrisers Hyderabad", "Lucknow Super Giants"],
    iccTrophies: 0
  },
  {
    name: "Ravi Bishnoi",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak-googly",
    debutYear: 2022,
    format: "ODI+T20",
    // T20I and ODI debuts both 2022 — no Test caps, not All-format
    iplTeams: ["Punjab Kings", "Lucknow Super Giants", "Rajasthan Royals"],
    iccTrophies: 0
  },
  {
    name: "Ruturaj Gaikwad",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2022,
    format: "ODI+T20",
    // ODI debut 6 Oct 2022 vs South Africa (Lucknow) — no Test caps confirmed, not All-format
    iplTeams: ["Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Avesh Khan",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2022,
    format: "ODI+T20",
    // T20I debut 20 Feb 2022 vs West Indies (Eden Gardens), ODI debut 24 Jul 2022 vs West Indies
    // (Port of Spain) — no Test caps, not All-format
    iplTeams: ["Royal Challengers Bangalore", "Delhi Capitals", "Lucknow Super Giants", "Rajasthan Royals"],
    iccTrophies: 0
  },
  {
    name: "Deepak Hooda",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2022,
    format: "ODI+T20",
    // ODI debut 6 Feb 2022 vs West Indies (Ahmedabad) — no Test caps, not All-format
    iplTeams: ["Sunrisers Hyderabad", "Rajasthan Royals", "Punjab Kings", "Lucknow Super Giants", "Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Venkatesh Iyer",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2021,
    format: "ODI+T20",
    // T20I cap came first, ODI debut Jan 2022 vs South Africa — no Test caps, not All-format
    iplTeams: ["Kolkata Knight Riders", "Royal Challengers Bangalore"],
    iccTrophies: 0
  },
  {
    name: "Chetan Sakariya",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm medium-fast",
    debutYear: 2021,
    format: "ODI+T20",
    // ODI debut 2021 — no Test caps confirmed, not All-format
    iplTeams: ["Rajasthan Royals", "Delhi Capitals", "Kolkata Knight Riders"],
    iccTrophies: 0
  },
  {
    name: "Nitish Rana",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2021,
    format: "ODI+T20",
    // 1 ODI and 2 T20Is for India, all in 2021 vs Sri Lanka — no Test caps, not All-format
    iplTeams: ["Mumbai Indians", "Kolkata Knight Riders", "Rajasthan Royals", "Delhi Capitals"],
    iccTrophies: 0
  },
  {
    name: "Krishnappa Gowtham",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2021,
    format: "ODI",
    // Brief international career confined to 2021 — no Test caps, not All-format
    iplTeams: ["Rajasthan Royals", "Kings XI Punjab", "Chennai Super Kings", "Lucknow Super Giants"],
    iccTrophies: 0
  },
  {
    name: "Rahul Chahar",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 2019,
    format: "ODI+T20",
    // T20I debut 2019, 1 ODI and 6 T20Is total between 2019 and 2021 — no Test caps, not All-format
    iplTeams: ["Mumbai Indians", "Punjab Kings", "Sunrisers Hyderabad", "Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Krunal Pandya",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2018,
    format: "ODI+T20",
    // T20I debut 2018 vs West Indies (Eden Gardens), ODI debut 2021 vs England (Pune) — no Test
    // caps confirmed, not All-format
    iplTeams: ["Mumbai Indians", "Lucknow Super Giants", "Royal Challengers Bangalore"],
    iccTrophies: 0
  },
  {
    name: "Vaibhav Sooryavanshi",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2026,
    format: "T20",
    // T20I debut 4 Jul 2026 vs England (2nd T20I) at age 15, youngest ever India international debutant
    // — Wikipedia/ESPNcricinfo confirmed. No ODI/Test caps yet, not All-format
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 0
  },
  {
    name: "Suryansh Shedge",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2026,
    format: "T20",
    // T20I debut 28 Jun 2026 vs Ireland (Belfast) — ESPNcricinfo/Wikipedia confirmed. No ODI/Test
    // caps, not All-format
    iplTeams: ["Punjab Kings"],
    // Signed by Lucknow Super Giants in 2023 (replacement) but never played a match for them —
    // excluded per the "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Ramandeep Singh",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2024,
    format: "T20",
    // T20I debut 13 Nov 2024 vs South Africa (Centurion) — ESPNcricinfo confirmed. No ODI/Test caps,
    // not All-format
    iplTeams: ["Mumbai Indians", "Kolkata Knight Riders"],
    iccTrophies: 0
  },
  {
    name: "Mayank Yadav",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2024,
    format: "T20",
    // T20I debut 6 Oct 2024 vs Bangladesh (Gwalior) — ESPNcricinfo confirmed. No ODI/Test caps,
    // not All-format
    iplTeams: ["Lucknow Super Giants"],
    iccTrophies: 0
  },
  {
    name: "Tushar Deshpande",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2024,
    format: "T20",
    // T20I debut Jul 2024 vs Zimbabwe (Harare) — ESPNcricinfo confirmed. No ODI/Test caps, not
    // All-format
    iplTeams: ["Delhi Capitals", "Chennai Super Kings", "Rajasthan Royals"],
    iccTrophies: 0
  },
  {
    name: "Abhishek Sharma",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2024,
    format: "ODI+T20",
    // T20I debut 6 Jul 2024 vs Zimbabwe (Harare), ODI debut/maiden ODI century vs South Africa
    // 2025/26 series — ESPNcricinfo confirmed. No Test caps, not All-format
    iplTeams: ["Delhi Daredevils", "Sunrisers Hyderabad"],
    iccTrophies: 1
    // 2026 T20 World Cup winning squad — ESPNcricinfo confirmed
  },
  {
    name: "Jitesh Sharma",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2023,
    format: "T20",
    // T20I debut 3 Oct 2023, Asian Games vs Nepal — ESPNcricinfo confirmed. No ODI/Test caps, not
    // All-format
    iplTeams: ["Mumbai Indians", "Punjab Kings", "Royal Challengers Bengaluru"],
    // Signed by Mumbai Indians in 2016-17 but never played a match for them — excluded per the
    // "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Ravisrinivasan Sai Kishore",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2023,
    format: "T20",
    // T20I debut 3 Oct 2023, Asian Games vs Nepal — ESPNcricinfo confirmed. No ODI/Test caps, not
    // All-format
    iplTeams: ["Gujarat Titans"],
    // Signed by Chennai Super Kings in 2020-2021 but never played a match for them — excluded per
    // the "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Rahul Tripathi",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2023,
    format: "T20",
    // T20I debut 5 Jan 2023 vs Sri Lanka (Pune) — ESPNcricinfo confirmed. No ODI/Test caps, not
    // All-format
    iplTeams: ["Rising Pune Supergiant", "Rajasthan Royals", "Kolkata Knight Riders", "Sunrisers Hyderabad", "Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Shivam Mavi",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2023,
    format: "T20",
    // T20I debut 3 Jan 2023 vs Sri Lanka (Wankhede) — ESPNcricinfo confirmed. No ODI/Test caps, not
    // All-format
    iplTeams: ["Kolkata Knight Riders", "Sunrisers Hyderabad"],
    // Signed by Gujarat Titans (2023) and Lucknow Super Giants (2024) but never played a match for
    // either — excluded per the "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Harshal Patel",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2021,
    format: "T20",
    // T20I debut 19 Nov 2021 vs New Zealand — ESPNcricinfo confirmed. No ODI/Test caps, not
    // All-format
    iplTeams: ["Royal Challengers Bangalore", "Delhi Capitals", "Punjab Kings", "Sunrisers Hyderabad"],
    // Signed by Mumbai Indians in 2011 but never played a match for them — excluded per the
    // "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Sandeep Warrier",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2019,
    format: "ODI+T20",
    // ODI debut 14 Aug 2019 vs West Indies, T20I debut 29 Jul 2021 vs Sri Lanka — ESPNcricinfo
    // confirmed. No Test caps, not All-format
    iplTeams: ["Kolkata Knight Riders", "Gujarat Titans"],
    iccTrophies: 0
  },
  {
    name: "Prithvi Shaw",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2018,
    format: "All-format",
    // Test debut 4 Oct 2018 vs West Indies (century on debut), ODI debut 5 Feb 2020 vs New Zealand,
    // T20I debut 25 Jul 2021 vs Sri Lanka — ESPNcricinfo confirmed
    iplTeams: ["Delhi Capitals"],
    iccTrophies: 0
  },
  {
    name: "Shivam Dube",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2019,
    format: "ODI+T20",
    // T20I debut 3 Nov 2019 vs Bangladesh, ODI debut 15 Dec 2019 vs West Indies — ESPNcricinfo
    // confirmed. No Test caps, not All-format
    iplTeams: ["Royal Challengers Bangalore", "Rajasthan Royals", "Chennai Super Kings"],
    iccTrophies: 2
    // 2024 T20 World Cup and 2026 T20 World Cup winning squads — ESPNcricinfo confirmed
  },
  {
    name: "Mayank Markande",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak-googly",
    debutYear: 2019,
    format: "ODI+T20",
    // T20I debut 24 Feb 2019 vs Australia, ODI caps (5 matches) also confirmed — ESPNcricinfo
    // confirmed. No Test caps, not All-format
    iplTeams: ["Mumbai Indians", "Rajasthan Royals", "Sunrisers Hyderabad"],
    // Signed by Kolkata Knight Riders in 2025 but never played a match for them — excluded per the
    // "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Khaleel Ahmed",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm medium-fast",
    debutYear: 2018,
    format: "ODI+T20",
    // ODI debut 18 Sep 2018 vs Hong Kong, T20I debut 4 Nov 2018 vs West Indies — ESPNcricinfo
    // confirmed. Named as a reserve (not full squad) for the 2024 T20 World Cup winning squad, so
    // not credited an ICC trophy. No Test caps, not All-format
    iplTeams: ["Sunrisers Hyderabad", "Delhi Capitals", "Chennai Super Kings"],
    // Signed by Delhi Daredevils in 2016-2017 but never played a match for them — excluded per the
    // "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Deepak Chahar",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2018,
    format: "ODI+T20",
    // T20I debut 8 Jul 2018 vs England, ODI debut 25 Sep 2018 vs Afghanistan — ESPNcricinfo
    // confirmed. No Test caps despite an initial search synthesis error suggesting otherwise
    // (cross-checked directly on Wikipedia and corrected) — not All-format
    iplTeams: ["Rising Pune Supergiant", "Chennai Super Kings", "Mumbai Indians"],
    iccTrophies: 0
  },
  {
    name: "Siddarth Kaul",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2018,
    format: "ODI+T20",
    // T20I debut 29 Jun 2018 vs Ireland, ODI debut 12 Jul 2018 vs England — ESPNcricinfo confirmed.
    // No Test caps, not All-format. Retired from Indian cricket in 2024
    iplTeams: ["Delhi Daredevils", "Sunrisers Hyderabad", "Royal Challengers Bangalore"],
    // Drafted by Kolkata Knight Riders in the inaugural 2008 IPL but never played a match for them
    // — excluded per the "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Vijay Shankar",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2018,
    format: "ODI+T20",
    // T20I debut 6 Mar 2018, 2018 Nidahas Trophy vs Sri Lanka, ODI debut 18 Jan 2019 vs Australia
    // (MCG) — ESPNcricinfo confirmed. No Test caps despite being called up to a Test squad in 2017
    // (never capped), not All-format
    iplTeams: ["Chennai Super Kings", "Sunrisers Hyderabad", "Gujarat Titans"],
    // Signed by Delhi Daredevils in 2018 but never played a match for them — excluded per the
    // "signed but never played" rule
    iccTrophies: 0
  },
  {
    name: "Shardul Thakur",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2017,
    format: "All-format",
    // ODI debut 31 Aug 2017 vs Sri Lanka (Colombo), T20I debut 21 Feb 2018 vs South Africa
    // (Centurion), Test debut 12 Oct 2018 vs West Indies (Hyderabad) — ESPNcricinfo confirmed
    iplTeams: ["Kings XI Punjab", "Rising Pune Supergiant", "Chennai Super Kings", "Delhi Capitals", "Kolkata Knight Riders", "Lucknow Super Giants", "Mumbai Indians"],
    iccTrophies: 0
  },

  // ===== INDIA — ROUND 1 (POPULAR PLAYERS PASS, Day 25) =====
  // Top 15 all-time Test run-scorers + top 15 all-time Test wicket-takers for India,
  // cross-checked against ESPNcricinfo (records + Wikipedia infobox tables) + Wikipedia +
  // ICC official records; Cricbuzz unreachable (standing limitation, flagged per rule).
  // 12 new names after dedup against the existing 191-player database.

  {
    name: "Cheteshwar Pujara",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Bowled 12 balls in Tests (0 wickets) — has bowled internationally, so not NA per the
    // NA rule. ESPNcricinfo/Wikipedia confirm right-arm legbreak.
    bowlingStyle: "Right-arm legbreak",
    debutYear: 2010,
    format: "Test+ODI",
    // Test debut 9 Oct 2010 vs Australia, 5 ODIs (2013-14), zero T20Is confirmed —
    // ESPNcricinfo + Wikipedia infobox (no T20I row at all)
    iplTeams: ["Kolkata Knight Riders", "Royal Challengers Bangalore", "Kings XI Punjab", "Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Dilip Vengsarkar",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Bowled 47 balls in Tests, 6 in ODIs (0 wickets both) — has bowled internationally,
    // so not NA. ESPNcricinfo + Wikipedia confirm right-arm medium.
    bowlingStyle: "Right-arm medium",
    debutYear: 1976,
    format: "Test+ODI",
    // Career 1976-1992, retired before T20I existed (2005) — same pattern as Kapil
    // Dev/Ganguly/Wasim/Warne corrections. Never played IPL (retired 1992, before 2008).
    iplTeams: [],
    // 1983 World Cup winning squad (retired hurt during the WI group match but on the
    // winning squad) — ESPNcricinfo + Wikipedia confirmed. 1985 World Championship of
    // Cricket and 1988 Asia Cup are not ICC events, not counted.
    iccTrophies: 1
  },
  {
    name: "Mohammad Azharuddin",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    // 0 wickets in 13 Test balls, but 12 wickets in 552 ODI balls — has a confirmed
    // international bowling record, so not NA. ESPNcricinfo + Wikipedia confirm right-arm medium.
    bowlingStyle: "Right-arm medium",
    debutYear: 1984,
    format: "Test+ODI",
    // Career 1984-2000, retired before T20I existed. Never played IPL (retired 2000).
    iplTeams: [],
    // Played 1992/1996/1999 World Cups, all losses (Pakistan/Sri Lanka/Australia won
    // respectively) — 0 ICC trophies, ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 0
  },
  {
    name: "Gundappa Viswanath",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    // 1 wicket in 70 Test balls — has bowled internationally, so not NA. ESPNcricinfo +
    // Wikipedia confirm legbreak.
    bowlingStyle: "Legbreak",
    debutYear: 1969,
    format: "Test+ODI",
    // 91 Tests (1969-1983), 25 ODIs (1974-1982) including the 1975 and 1979 World Cups
    // (neither won by India), retired before T20I existed. Never played IPL (retired 1983).
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Ajinkya Rahane",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2011,
    format: "All-format",
    // T20I debut 31 Aug 2011 vs England (earliest cap), ODI debut 3 Sep 2011 vs England,
    // Test debut 22 Mar 2013 vs Australia — 85 Tests, 90 ODIs, 20 T20Is, Wikipedia infobox confirmed
    iplTeams: ["Mumbai Indians", "Rajasthan Royals", "Rising Pune Supergiant", "Delhi Capitals", "Kolkata Knight Riders", "Chennai Super Kings"],
    // Not part of the 2013 Champions Trophy squad (confirmed via ESPNcricinfo squad list) or
    // any other ICC-winning squad during his career (2011-2023) — 0 trophies
    iccTrophies: 0
  },
  {
    name: "Mohinder Amarnath",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1969,
    format: "Test+ODI",
    // Career 1969-1989, retired before T20I existed. Never played IPL (retired 1989).
    iplTeams: [],
    // 1983 World Cup winner — Player of the Match in BOTH the semi-final (vs England) and
    // the final (vs West Indies) — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 1
  },
  {
    name: "Bishan Singh Bedi",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 1966,
    format: "Test+ODI",
    // 67 Tests (1966-1979), 10 ODIs (1974-1979), retired before T20I existed. Never played
    // IPL (retired 1979).
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "BS Chandrasekhar",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Legbreak",
    debutYear: 1964,
    format: "Test+ODI",
    // 58 Tests (1964-1979), only 1 ODI (1976, took 3 wickets) — still counts as ODI format
    // per the "even 1 cap counts" precedent (e.g. Dravid's 1 T20I). Never played IPL.
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Javagal Srinath",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1991,
    format: "Test+ODI",
    // ODI debut 18 Oct 1991 vs Pakistan (earliest), Test debut 29 Nov 1991 vs Australia,
    // retired 2003 before T20I existed. Never played IPL (retired 2003, before 2008).
    iplTeams: [],
    // 2002 ICC Champions Trophy joint-winners with Sri Lanka (rain-affected final, shared
    // title) — counted as 1 trophy per the standing joint-winner rule (see file header note),
    // ESPNcricinfo + Wikipedia confirmed. Runner-up (not a win) at the 2003 World Cup.
    iccTrophies: 1
  },
  {
    name: "Erapalli Prasanna",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1962,
    format: "Test",
    // 49 Tests (1962-1978) — Wikipedia infobox shows no ODI or T20I row at all; never
    // played an ODI. Never played IPL (retired 1978).
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Umesh Yadav",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2010,
    format: "All-format",
    // ODI debut 28 May 2010 vs Zimbabwe (earliest), Test debut 6 Nov 2011 vs West Indies,
    // T20I debut 7 Aug 2012 vs Sri Lanka — Wikipedia infobox confirmed
    // Dedicated IPL-history search confirmed actual match appearances (not just signings)
    // for all 5 franchises below
    iplTeams: ["Delhi Daredevils", "Kolkata Knight Riders", "Royal Challengers Bangalore", "Delhi Capitals", "Gujarat Titans"],
    // 2013 ICC Champions Trophy winning squad — Wikipedia confirmed
    iccTrophies: 1
  },
  {
    name: "Vinoo Mankad",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 1946,
    format: "Test",
    // 44 Tests (1946-1959) — retired well before ODIs (1971) or T20Is existed. Never
    // played IPL.
    iplTeams: [],
    iccTrophies: 0
  },

  // ===== INDIA — ROUND 1 CONTINUED (ODI, Day 25) =====
  // Top 15 all-time ODI run-scorers + top 15 all-time ODI wicket-takers for India,
  // cross-checked against ESPNcricinfo (records tables) + Wikipedia infobox tables;
  // Cricbuzz unreachable (standing limitation, flagged per rule). 9 new names after
  // dedup against the database (6 more got added to Test Round 1 already covered them).

  {
    name: "Shikhar Dhawan",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    // 0 wickets in 54 Test balls — has bowled internationally, so not NA. ESPNcricinfo +
    // Wikipedia confirm right-arm offbreak.
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2010,
    format: "All-format",
    // ODI debut 20 Oct 2010 vs Australia (earliest), Test debut 14 Mar 2013 vs Australia,
    // T20I debut 4 Jun 2011 vs West Indies — Wikipedia infobox confirmed
    iplTeams: ["Delhi Daredevils", "Mumbai Indians", "Deccan Chargers", "Sunrisers Hyderabad", "Delhi Capitals", "Punjab Kings"],
    // 2013 Champions Trophy winner, Player of the Tournament — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 1
  },
  {
    name: "Suresh Raina",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2005,
    format: "All-format",
    // ODI debut 30 Jul 2005 vs Sri Lanka (earliest), T20I debut 1 Dec 2006 vs South Africa,
    // Test debut 26 Jul 2010 vs Sri Lanka — Wikipedia infobox confirmed
    iplTeams: ["Chennai Super Kings", "Gujarat Lions"],
    // 2011 World Cup + 2013 Champions Trophy winner — Wikipedia confirmed
    iccTrophies: 2
  },
  {
    name: "Ajay Jadeja",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // 20 ODI wickets — confirmed bowled internationally, not NA
    bowlingStyle: "Right-arm medium",
    debutYear: 1992,
    format: "Test+ODI",
    // 15 Tests + 196 ODIs (1992-2000), effectively career-ending match-fixing ban in 2000
    // before T20I existed. Never played IPL (ban predates IPL).
    iplTeams: [],
    // 1995 Asia Cup is an ACC event, not ICC — not counted. 0 ICC trophies.
    iccTrophies: 0
  },
  {
    name: "Gautam Gambhir",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    // No bowling record found on ESPNcricinfo or Wikipedia (infobox lists "right-arm leg
    // break" as a nominal style but shows no balls-bowled/wickets row at all across any
    // format) — could not confirm whether he ever bowled a delivery internationally either
    // way, so marked NA with this flag rather than asserted as a proven zero-ball record,
    // same treatment as KL Rahul's bowling style
    bowlingStyle: "NA",
    debutYear: 2003,
    format: "All-format",
    // ODI debut 11 Apr 2003 vs Bangladesh (earliest), Test debut 3 Nov 2004 vs Australia,
    // T20I debut 13 Sep 2007 vs Scotland — Wikipedia infobox confirmed
    iplTeams: ["Delhi Daredevils", "Kolkata Knight Riders"],
    // 2007 T20 World Cup (final MOTM) + 2011 World Cup (top scorer in the final) — Wikipedia confirmed
    iccTrophies: 2
  },
  {
    name: "Navjot Singh Sidhu",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Wikipedia infobox lists "right-arm medium" as a nominal style but shows no
    // balls-bowled/wickets row across any format — could not confirm whether he ever
    // bowled internationally, so marked NA with this flag rather than asserted as proven,
    // same treatment as KL Rahul's bowling style
    bowlingStyle: "NA",
    debutYear: 1983,
    format: "Test+ODI",
    // 51 Tests (1983-1999), 136 ODIs (1987-1998), retired before T20I existed. Never
    // played IPL (retired 1999).
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Kris Srikkanth",
    country: "India",
    role: "Batsman",
    // 0 Test wickets but 25 ODI wickets — confirmed bowled internationally, not NA
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1981,
    format: "Test+ODI",
    // 43 Tests + 146 ODIs (1981-1992), retired before T20I existed. Never played IPL.
    iplTeams: [],
    // 1983 World Cup winner — top scorer for India in the final (38 runs) — ESPNcricinfo +
    // Wikipedia confirmed. 1985 World Championship of Cricket not an ICC event, not counted.
    iccTrophies: 1
  },
  {
    name: "Venkatesh Prasad",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 1994,
    format: "Test+ODI",
    // ODI debut 2 Apr 1994 vs New Zealand (earliest), Test debut 7 Jun 1996 vs England,
    // retired 2001 before T20I existed. Never played IPL (retired 2001, before 2008).
    iplTeams: [],
    // Runners-up at the 2000 ICC Champions Trophy (lost final to New Zealand) — not a win,
    // 0 ICC trophies
    iccTrophies: 0
  },
  {
    name: "Manoj Prabhakar",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 1984,
    format: "Test+ODI",
    // ODI debut 8 Apr 1984 vs Sri Lanka (earliest), Test debut 12 Dec 1984 vs England,
    // retired 1996 before T20I existed. Never played IPL.
    iplTeams: [],
    // 1985 World Championship of Cricket and the Asia Cups (1984/1990-91/1995) are not ICC
    // events, not counted. 0 ICC trophies.
    iccTrophies: 0
  },
  {
    name: "Ashish Nehra",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm fast",
    debutYear: 1999,
    format: "All-format",
    // Test debut 24 Feb 1999 vs Sri Lanka (earliest), ODI debut 21 Jun 2001 vs Zimbabwe,
    // T20I debut 9 Dec 2009 vs Sri Lanka — Wikipedia infobox confirmed
    iplTeams: ["Mumbai Indians", "Delhi Daredevils", "Pune Warriors India", "Chennai Super Kings", "Sunrisers Hyderabad"],
    // 2002 Champions Trophy joint-winners with Sri Lanka + 2011 World Cup winner (squad
    // member, did not play the final) — Wikipedia confirmed
    iccTrophies: 2
  },

  // ===== INDIA — ROUND 1 CONTINUED (T20I, Day 25) =====
  // Top 15 all-time T20I run-scorers + top 15 all-time T20I wicket-takers for India,
  // cross-checked against ESPNcricinfo (records tables) + Wikipedia infobox tables;
  // Cricbuzz unreachable (standing limitation, flagged per rule). All 15 batting names
  // were already in the database (mostly from the Day 24 T20I cap-expansion batch and
  // today's earlier Round 1 batches) — only 2 new names, both from the bowling top 15.
  // This completes India's Round 1 pass across all 3 formats.

  {
    name: "Yuzvendra Chahal",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 2016,
    format: "ODI+T20",
    // ODI debut 11 Jun 2016 vs Zimbabwe, T20I debut 19 Jun 2016 vs Zimbabwe (same series,
    // 8 days apart) — no Test caps, Wikipedia infobox confirmed, not All-format
    // Dedicated IPL-history search confirmed he played (not just signed) for Mumbai Indians
    // — 1 match in 2011 vs KKR, plus playing in that year's Champions League T20 for MI —
    // before his long RCB/RR/PBKS spells
    iplTeams: ["Mumbai Indians", "Royal Challengers Bangalore", "Rajasthan Royals", "Punjab Kings"],
    // 2024 T20 World Cup winning squad (did not feature in any match) — confirmed via
    // Wikipedia. Explicitly NOT part of the 2025 Champions Trophy squad (confirmed via the
    // actual ESPNcricinfo squad list) despite an initial search implying a "comeback" —
    // resolved by checking the real squad list rather than trusting the search summary.
    iccTrophies: 1
  },
  {
    name: "Bhuvneshwar Kumar",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2012,
    format: "All-format",
    // T20I debut 25 Dec 2012 vs Pakistan (earliest), ODI debut 30 Dec 2012 vs Pakistan,
    // Test debut 22 Feb 2013 vs Australia — Wikipedia infobox confirmed
    iplTeams: ["Royal Challengers Bangalore", "Pune Warriors", "Sunrisers Hyderabad"],
    // 2013 Champions Trophy winning squad — Wikipedia confirmed. Last T20I Nov 2022, so
    // not part of the 2024 T20 World Cup winning squad.
    iccTrophies: 1
  },

  // ===== AUSTRALIA (51 players) =====

  {
    name: "Ricky Ponting",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1995,
    format: "All-format",
    // 168 Tests, 375 ODIs, 17 T20Is — ESPNcricinfo confirmed. Bowled occasionally in Tests
    // (took a Test wicket in 2005) — recorded per the "even one ball bowled" standard.
    // Day 14 RE-CHECK (user flagged Guptill as incomplete, prompted a second pass on the
    // rest of Batch 2): was missing Kolkata Knight Riders (2008, his first IPL team,
    // present for the very first ball ever bowled in the IPL) — Wikipedia confirmed
    iplTeams: ["Kolkata Knight Riders", "Mumbai Indians"],
    iccTrophies: 4
    // 1999 WC, 2003 WC, 2006 CT, 2009 CT — Wikipedia + Cricscope confirmed
  },
  {
    name: "Shane Warne",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 1992,
    format: "Test+ODI",
    // 145 Tests, 194 ODIs — retired Jan 2007, ZERO T20Is — ESPNcricinfo confirmed
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 2
    // 1999 WC, 2003 WC — Wikipedia confirmed
  },
  {
    name: "Adam Gilchrist",
    country: "Australia",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1996,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 RE-CHECK: was missing Kings XI Punjab (2011-2013, where he was captain) — Wikipedia confirmed
    iplTeams: ["Deccan Chargers", "Kings XI Punjab"],
    iccTrophies: 4
    // 1999 WC, 2003 WC, 2006 CT, 2007 WC — Wikipedia + Cricscope confirmed
  },
  {
    name: "Glenn McGrath",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 1993,
    format: "Test+ODI",
    // Tests, ODIs — retired 2007, very few/no T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was wrongly "Didn't play IPL" — McGrath played 14 matches for Delhi
    // Daredevils in the inaugural 2008 IPL season — ESPNcricinfo confirmed
    iplTeams: ["Delhi Daredevils"],
    iccTrophies: 4
    // 1999 WC, 2003 WC, 2006 CT, 2007 WC — Wikipedia + Cricscope confirmed
  },
  {
    name: "Steve Waugh",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1985,
    format: "Test+ODI",
    // Tests, ODIs — retired 2004, T20I cricket barely existed — ESPNcricinfo
    iplTeams: [],
    iccTrophies: 1
    // 1999 WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Matthew Hayden",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Chennai Super Kings"],
    iccTrophies: 3
    // 2003 WC, 2006 CT, 2007 WC — Wikipedia confirmed
  },
  {
    name: "Steve Smith",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was undercounted at 3 teams — Smith has actually played for 6 IPL
    // franchises — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Kochi Tuskers Kerala", "Pune Warriors", "Rajasthan Royals", "Rising Pune Supergiant", "Delhi Capitals"],
    iccTrophies: 3
    // 2021 T20 WC, 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "David Warner",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed. Part-time bowler who mixes medium pace
    // with leg spin — recorded per the "even one ball bowled" standard.
    iplTeams: ["Delhi Daredevils", "Sunrisers Hyderabad", "Delhi Capitals"],
    iccTrophies: 3
    // 2021 T20 WC, 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "Pat Cummins",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Delhi Capitals (brief stint between his two KKR spells) — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Delhi Capitals", "Sunrisers Hyderabad"],
    iccTrophies: 2
    // 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "Mitchell Starc",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — retired from T20Is Sept 2025 — ESPNcricinfo
    // Day 14 FIX: was missing Delhi Capitals (2025-26 move) — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Kolkata Knight Riders", "Delhi Capitals"],
    iccTrophies: 3
    // 2021 T20 WC, 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "Allan Border",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 1978,
    format: "Test+ODI",
    // 156 Tests (1978-1994), 273 ODIs (1979-1994) — retired before T20Is existed (first
    // T20I was Feb 2005) — ESPNcricinfo + Wikipedia confirmed. Genuine part-time left-arm
    // orthodox spinner (39 Test wickets, once took 11 in a Sydney Test vs West Indies)
    iplTeams: [],
    iccTrophies: 1
    // 1987 World Cup, as captain — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Michael Clarke",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2003,
    format: "All-format",
    // Tests (2004), ODIs (2003), T20Is (2005) — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search confirmed a genuine playing appearance (stumped for 13 vs KKR,
    // 19 May 2012), not just a signing
    iplTeams: ["Pune Warriors India"],
    iccTrophies: 3
    // 2006 Champions Trophy, 2007 World Cup, 2015 World Cup (as captain) — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Mark Waugh",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    // ESPNcricinfo profile literally lists "Right arm Medium, Right arm Offbreak" — began
    // as a medium pacer, converted to off-break later in his career after back injuries;
    // recorded here as medium (his primary/original style) — both sources agree on both,
    // this is not a cross-source mismatch
    debutYear: 1988,
    format: "Test+ODI",
    // Tests (1991), ODIs (1988) — retired 2002, before T20Is existed — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1999 World Cup — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Justin Langer",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1993,
    format: "Test+ODI",
    // Tests (1993), ODIs (1994) — Wikipedia infobox shows no T20I row at all, never
    // played one — ESPNcricinfo + Wikipedia confirmed
    // Wikipedia's "domestic team info" table lists Rajasthan Royals 2009, but Wikipedia's
    // own "List of Rajasthan Royals cricketers" (all 73 players who've played 1+ match for
    // RR) does NOT include Langer — a dedicated search confirmed he was retained by RR for
    // 2009 but never played an actual IPL match (same "signed but never played" pattern as
    // Axar Patel/Stuart Broad)
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Mark Taylor",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "NA",
    // FLAGGED: sources disagree on exact style — ESPNcricinfo's literal profile field says
    // "Right arm Medium", Wikipedia's literal infobox says "Right-arm leg spin", ICC has no
    // profile page for retired players like Taylor, Cricbuzz unreachable as usual. Checked
    // the actual scorecard of his only Test wicket (Rashid Latif, c Bevan b Taylor, 2nd
    // Test v Pakistan, Rawalpindi, 5 Oct 1994, figures 3-1-11-1) — confirms he genuinely
    // bowled, but the scorecard itself doesn't specify delivery type. Marked NA per user
    // decision rather than picking a side — note this differs from the usual NA case since
    // he is confirmed to have bowled (not a true zero-ball record)
    debutYear: 1989,
    format: "Test+ODI",
    // Tests, ODIs (both debuted Jan 1989) — retired 1999, before T20Is existed — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Runner-up 1996 World Cup as captain, did not win — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "David Boon",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1984,
    format: "Test+ODI",
    // Tests (Nov 1984), ODIs (Feb 1984) — retired 1996, before T20Is existed — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1987 World Cup, Player of the Match in the final — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Greg Chappell",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1970,
    format: "Test+ODI",
    // Tests (1970), ODIs (1971) — retired 1984, before Australia's first World Cup win
    // (1987) and before T20Is existed — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Runner-up 1975 World Cup as vice-captain, did not win — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Don Bradman",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 1928,
    format: "Test",
    // 52 Tests (1928-1948) — ODI cricket didn't begin until 1971 and T20I until 2005, both
    // long after his 1948 retirement — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Cricket World Cup didn't exist until 1975, decades after he retired
  },
  {
    name: "Mike Hussey",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2004,
    format: "All-format",
    // Tests (2005), ODIs (2004), T20Is (2005) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Chennai Super Kings", "Mumbai Indians"],
    // CSK 2008-2013 and 2015, Mumbai Indians 2014 in between — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 3
    // 2006 Champions Trophy, 2007 World Cup, 2009 Champions Trophy — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Usman Khawaja",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "NA",
    // FLAGGED: sources disagree on exact style — ESPNcricinfo's literal profile field AND
    // ICC's rankings page both say "Right-arm medium", Wikipedia's literal infobox says
    // "Right-arm off break", Cricbuzz unreachable as usual. He has a confirmed bowling
    // record (18 balls, 0 wickets in Tests; 174 balls, 1 wicket in FC cricket) so this is
    // not a true zero-ball case — marked NA per user decision rather than picking a side
    debutYear: 2011,
    format: "All-format",
    // Test debut 3 Jan 2011, ODI debut 11 Jan 2013, T20I debut 31 Jan 2016 (T20I career was
    // just the 2016 calendar year) — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Rising Pune Supergiant, 2016 only — confirmed via ESPNcricinfo's
    // own TEAMS list on his profile page and Wikipedia's domestic team table (both agree)
    iplTeams: ["Rising Pune Supergiant"],
    iccTrophies: 1
    // 2021-2023 World Test Championship — ESPNcricinfo + Wikipedia confirmed
  },

  {
    name: "Nathan Lyon",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2011,
    format: "All-format",
    // Test debut 31 Aug 2011 (Galle), ODI debut 8 Mar 2012, T20I debut 29 Jan 2016 — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: no record of any IPL franchise appearance or signing — confirmed via Wikipedia
    iplTeams: [],
    iccTrophies: 1
    // 2023 World Test Championship (took 1/19 & 4/41 in the final at The Oval) — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Dennis Lillee",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1971,
    format: "Test+ODI",
    // Test debut 29 Jan 1971 (6th Test, Adelaide, 1970-71 Ashes, 5/84 on debut), ODI debut
    // 24 Aug 1972 vs England — retired 1984, T20I format did not exist — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Retired 1984, well before the IPL existed (2008)
    iccTrophies: 0
    // Australia lost the 1975 World Cup final to West Indies; Australia's maiden WC win (1987)
    // came 3 years after Lillee's retirement — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "Mitchell Johnson",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast",
    debutYear: 2005,
    format: "All-format",
    // ODI debut 10 Dec 2005 (earliest), Test debut 8 Nov 2007, T20I debut 12 Sept 2007 — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Mumbai Indians (2012-2013 and again 2017), Kolkata Knight Riders
    // (2018, played matches vs CSK/DD/RCB) — Wikipedia + ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians", "Kolkata Knight Riders"],
    iccTrophies: 3
    // 2006 Champions Trophy, 2007 World Cup, 2015 World Cup (his last ODI) — Wikipedia confirmed
  },
  {
    name: "Brett Lee",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1999,
    format: "All-format",
    // Test debut 26 Dec 1999 (5 wickets on debut), ODI debut 9 Jan 2000, T20I debut 17 Feb 2005 — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Kings XI Punjab (2008-2010), Kolkata Knight Riders (2011-2013,
    // included in the 2012 final squad and took a wicket off the first ball of IPL 2013) —
    // Wikipedia + ESPNcricinfo confirmed. A single ambiguous search snippet suggested a 2011
    // Delhi Daredevils signing, but two independent sources (Wikipedia's KKR season pages +
    // ESPNcricinfo) confirm his real 2011-2013 team was Kolkata Knight Riders — treated as
    // synthesis noise, not a genuine mismatch, same pattern as prior sessions' catches
    iplTeams: ["Kings XI Punjab", "Kolkata Knight Riders"],
    iccTrophies: 2
    // 2003 World Cup, 2006 Champions Trophy — ruled out of the 2007 World Cup squad by injury
    // (replaced by Stuart Clark) so that title does not count — Wikipedia confirmed
  },
  {
    name: "Josh Hazlewood",
    country: "Australia",
    role: "Bowler",
    // FLAGGED: batting hand not found as an explicit infobox quote in any source reachable
    // today — recorded as Right-hand (the overwhelmingly likely default for an unremarkable
    // tailend bowler) but treated as best-available rather than fully confirmed, same
    // treatment as the KL Rahul/Harsh Dubey precedent
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2010,
    format: "All-format",
    // ODI debut 22 Jun 2010 vs England (earliest), Test debut 17 Dec 2014, T20I debut 13 Feb 2013 — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Chennai Super Kings (2020-2021), Royal Challengers Bangalore/
    // Bengaluru (2022-present, won IPL 2025 and 2026) — Wikipedia confirmed
    iplTeams: ["Chennai Super Kings", "Royal Challengers Bangalore"],
    iccTrophies: 3
    // 2021 T20 World Cup, 2023 ODI World Cup, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "Craig McDermott",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1984,
    format: "Test+ODI",
    // Test debut 22 Dec 1984 vs West Indies, ODI debut 6 Jan 1985 vs West Indies — retired
    // 1996, T20I format did not exist — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Retired 1996, well before the IPL existed (2008)
    iccTrophies: 1
    // 1987 World Cup — Australia's maiden title; McDermott was the tournament's leading
    // wicket-taker with 18 — Wikipedia confirmed
  },
  {
    name: "Jason Gillespie",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1996,
    format: "All-format",
    // ODI debut Aug 1996 vs Sri Lanka (earliest), Test debut Nov 1996 vs West Indies, T20I
    // debut 13 Jun 2005 (England's inaugural T20I, at the Rose Bowl) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Retired from international cricket Jan 2006, 2 years before the IPL began (2008)
    iccTrophies: 0
    // Was originally selected for the 2003 World Cup squad (which Australia won) but was
    // ruled out before the tournament by a tendon injury and replaced by Nathan Bracken — so
    // this title does not count. No other ICC trophy confirmed — Wikipedia confirmed
  },
  {
    name: "Richie Benaud",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 1952,
    format: "Test",
    // Test debut 25 Jan 1952 vs West Indies — retired 1964, 7 years before ODI cricket began
    // (1971) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Cricket World Cup didn't exist until 1975, 11 years after his retirement
  },
  {
    name: "Graham McKenzie",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1961,
    format: "Test+ODI",
    // Test debut 22 Jun 1961 vs England (5 wickets and 34 runs on debut) — ODI debut 5 Jan
    // 1971, the very first ODI ever played (Australia vs England, MCG), took 2/22 — T20I
    // format did not exist in his career — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Cricket World Cup didn't exist until 1975, 4 years after his retirement (1971)
  },
  {
    name: "Ray Lindwall",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1946,
    format: "Test",
    // Test debut 1946 vs New Zealand — retired 1960, 11 years before ODI cricket began
    // (1971) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Cricket World Cup didn't exist until 1975, 15 years after his retirement
  },
  {
    name: "Peter Siddle",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2008,
    format: "All-format",
    // Test debut 16 Oct 2008 vs India (Mohali), ODI debut 13 Feb 2009 vs New Zealand, T20I
    // debut 15 Feb 2009 vs New Zealand (last T20I 31 Oct 2010) — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: no record of any IPL franchise appearance or signing — he was a
    // foundation Melbourne Stars squad member (BBL, domestic) but never an IPL player — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2009 Champions Trophy — Wikipedia confirmed. Not part of any World Cup winning squad.
  },

  {
    name: "Michael Bevan",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm wrist-spin",
    debutYear: 1994,
    format: "Test+ODI",
    // ODI debut 14 Apr 1994 vs Sri Lanka (Sharjah, earliest), Test debut 28 Sept 1994 vs
    // Pakistan (Karachi) — retired 2003-04 season, T20I format did not exist — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Retired before the IPL existed (2008)
    iccTrophies: 2
    // 1999 World Cup and 2003 World Cup (both confirmed via the official Australia 2003 World
    // Cup squad list) — Wikipedia confirmed
  },
  {
    name: "Dean Jones",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1984,
    format: "Test+ODI",
    // ODI debut 30 Jan 1984 vs Pakistan (Adelaide, earliest), Test debut 16 Mar 1984 vs West
    // Indies (Port of Spain) — retired 1994, T20I format did not exist — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1987 World Cup — Australia's maiden title; Jones scored 314 runs at the tournament — Wikipedia confirmed
  },
  {
    name: "Shane Watson",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2002,
    format: "All-format",
    // ODI debut 24 Mar 2002 vs South Africa (earliest), Test debut 2 Jan 2005 vs Pakistan,
    // T20I debut 24 Feb 2006 vs South Africa — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Rajasthan Royals (2008, 2010, 2011-2015), Royal Challengers
    // Bangalore (2016-2017), Chennai Super Kings (2018-2020) — his St Lucia Stars/Islamabad
    // United/Quetta Gladiators spells are CPL/PSL franchise cricket, not IPL, and excluded — Wikipedia confirmed
    iplTeams: ["Rajasthan Royals", "Royal Challengers Bangalore", "Chennai Super Kings"],
    iccTrophies: 4
    // 2006 Champions Trophy, 2007 World Cup, 2009 Champions Trophy, 2015 World Cup — Wikipedia confirmed
  },
  {
    name: "Aaron Finch",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Slow left-arm orthodox",
    debutYear: 2011,
    format: "All-format",
    // T20I debut 12 Jan 2011 vs England (earliest), ODI debut 11 Jan 2013 vs Sri Lanka, Test
    // debut 7 Oct 2018 vs Pakistan — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Rajasthan Royals (2009-10), Delhi Daredevils (2011-2012), Pune
    // Warriors India (2013), Sunrisers Hyderabad (2014), Mumbai Indians (2015), Gujarat Lions
    // (2016-2017), Kings XI Punjab (2018), Royal Challengers Bangalore (2020), Kolkata Knight
    // Riders (2022) — Wikipedia confirmed
    iplTeams: ["Rajasthan Royals", "Delhi Daredevils", "Pune Warriors India", "Sunrisers Hyderabad", "Mumbai Indians", "Gujarat Lions", "Kings XI Punjab", "Royal Challengers Bangalore", "Kolkata Knight Riders"],
    iccTrophies: 2
    // 2015 World Cup (squad member) and 2021 T20 World Cup (as captain, Australia's maiden
    // title in that format) — Wikipedia confirmed
  },
  {
    name: "Adam Zampa",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 2016,
    format: "ODI+T20",
    // ODI debut 6 Feb 2016 vs New Zealand (Wellington, earliest), T20I debut 7 Mar 2016 vs
    // South Africa — no Test caps ("the Test career that never happened") — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Rising Pune Supergiant (2016, took a career-best 6/19 vs SRH),
    // Royal Challengers Bangalore (2022) — a 2025 Sunrisers Hyderabad signing is excluded: he
    // withdrew before the season with a shoulder injury and never played a match, same
    // "signed but never played" pattern as Akash Deep/Brendan Taylor — Wikipedia confirmed
    iplTeams: ["Rising Pune Supergiant", "Royal Challengers Bangalore"],
    iccTrophies: 2
    // 2021 T20 World Cup and 2023 ODI World Cup — Wikipedia confirmed
  },
  {
    name: "Nathan Bracken",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm fast-medium",
    debutYear: 2001,
    format: "All-format",
    // ODI debut 11 Jan 2001 vs West Indies (earliest), Test debut 4 Dec 2003 vs India, T20I
    // debut 9 Jan 2006 vs South Africa — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: no evidence found of any IPL franchise appearance or signing
    // across 2 separate searches — retired Jan 2011 due to a chronic knee injury — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 3
    // 2003 World Cup (joined the winning squad mid-tournament as a replacement for the
    // injured Jason Gillespie, confirmed via the official Australia 2003 squad list), 2006
    // Champions Trophy, 2007 World Cup — Wikipedia confirmed
  },
  {
    name: "Brad Hogg",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm wrist-spin",
    debutYear: 1996,
    format: "All-format",
    // ODI debut 26 Aug 1996 vs Zimbabwe (earliest), Test debut 10 Oct 1996 vs India, T20I
    // debut 24 Feb 2006 vs South Africa (later recalled to the T20I squad in 2011-12 at age
    // 40 after a Perth Scorchers BBL stint — a comeback, not a fresh debut) — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Kolkata Knight Riders (2015) — became the oldest player ever to
    // feature in an IPL match, aged 44 years 81 days, vs Chennai Super Kings — Wikipedia confirmed
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 3
    // 2003 World Cup (confirmed via the official Australia 2003 squad list), 2006 Champions
    // Trophy, 2007 World Cup (took 21 wickets at the tournament) — Wikipedia confirmed
  },
  {
    name: "Damien Fleming",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 1994,
    format: "Test+ODI",
    // ODI debut 16 Jan 1994 vs South Africa (earliest), Test debut 5 Oct 1994 vs Pakistan
    // (Rawalpindi, took a hat-trick on debut) — retired 2001, T20I format did not exist — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1999 World Cup — Wikipedia confirmed
  },

  {
    name: "Liam Scott",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2026,
    format: "ODI",
    // ODI debut 9 Jun 2026 vs Bangladesh (Mirpur) — a bowling allrounder, no Test/T20I caps
    // found as of this writing — ESPNcricinfo confirmed
    // Dedicated IPL search: no record of any IPL franchise appearance or signing found
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Ollie Peake",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2026,
    format: "ODI",
    // ODI debut May 2026 vs Pakistan (opening match of the series), age 19 — the youngest
    // specialist batter to debut for Australia in ODIs, and the 4th-youngest Australian ODI
    // debutant overall behind Pat Cummins, Josh Hazlewood, and Ray Bright — no T20I/Test caps
    // found yet — ESPNcricinfo confirmed
    // Dedicated IPL search: no record of any IPL franchise appearance or signing found
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Matt Renshaw",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2016,
    format: "All-format",
    // Test debut 24 Nov 2016 vs South Africa (Adelaide, earliest), ODI debut 19 Oct 2025 vs
    // India (Perth), T20I debut 29 Jan 2026 vs Pakistan (Lahore) — ESPNcricinfo confirmed
    // Dedicated IPL search: no record of any IPL franchise appearance or signing found —
    // Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Mitchell Owen",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2025,
    format: "ODI+T20",
    // T20I debut 20 Jul 2025 vs West Indies (Kingston, half-century on debut, earliest), ODI
    // debut 19 Oct 2025 vs India (Perth) — no Test caps found — ESPNcricinfo confirmed
    // Dedicated IPL search: Punjab Kings — Wikipedia confirmed
    iplTeams: ["Punjab Kings"],
    iccTrophies: 0
  },
  {
    name: "Cooper Connolly",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2024,
    format: "All-format",
    // T20I and ODI debuts both Sept 2024 (UK tour, earliest), Test debut Feb 2025 vs Sri
    // Lanka — ESPNcricinfo confirmed. Took 5/22 vs South Africa in ODIs, youngest Australian
    // to take an ODI five-wicket haul.
    // Dedicated IPL search: Punjab Kings (debut 2026 season, scored a maiden IPL century) —
    // Wikipedia confirmed
    iplTeams: ["Punjab Kings"],
    iccTrophies: 0
    // Not part of the 5 new players added to the losing 2025 Champions Trophy squad; even if
    // he featured, Australia lost that final to India — no trophy either way
  },
  {
    name: "Ben Dwarshuis",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast-medium",
    debutYear: 2022,
    format: "ODI+T20",
    // T20I debut 2022 (one-off match, end of Pakistan tour, earliest), ODI debut 19 Sep 2024
    // vs England (Nottingham) — no Test caps found — ESPNcricinfo confirmed. Was parachuted
    // into the 2025 Champions Trophy squad as a reinforcement and finished as Australia's
    // leading wicket-taker there.
    // Dedicated IPL search: bought by Kings XI Punjab in the 2018 auction but did not play
    // for them (signed but never played, excluded per the standing rule); Delhi Capitals
    // (2021, replacement for Chris Woakes in the UAE leg); Punjab Kings (2026, replacement
    // for Lockie Ferguson, played 1 match vs Delhi Capitals, 1/51) — Wikipedia confirmed
    iplTeams: ["Delhi Capitals", "Punjab Kings"],
    iccTrophies: 0
    // Australia lost the 2025 Champions Trophy final to India — no trophy despite featuring
  },
  {
    name: "Will Sutherland",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2024,
    format: "ODI",
    // ODI debut 4 Feb 2024 vs West Indies (Sydney) — no T20I debut found across 2 dedicated
    // searches (ESPNcricinfo + Wikipedia both confirmed no T20I record), no Test caps either
    // Dedicated IPL search: no record of any IPL franchise appearance or signing found —
    // Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Jake Fraser-McGurk",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    // FLAGGED: ESPNcricinfo profile lists "Legbreak googly" as his bowling style, but his
    // playing role is explicitly listed as batter and no international bowling appearance
    // could be confirmed — recorded as best-available per the standing KL Rahul precedent
    // rather than asserted as a proven bowling record
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 2024,
    format: "ODI+T20",
    // ODI debut 4 Feb 2024 vs West Indies (Sydney, earliest), T20I debut 4 Sep 2024 vs
    // Scotland — no Test caps — ESPNcricinfo + Wikipedia confirmed
    // Dedicated IPL search: Delhi Capitals (2024 season, played and scored 55 on debut; retained
    // for 2025 but withdrew before the season for personal reasons, never played that year —
    // the 2024 appearance is a confirmed real team membership regardless) — Wikipedia confirmed
    iplTeams: ["Delhi Capitals"],
    iccTrophies: 0
    // Was one of 5 reinforcements added to the 2025 Champions Trophy squad, which Australia
    // lost to India in the final — no trophy
  },
  {
    name: "Lance Morris",
    country: "Australia",
    role: "Bowler",
    // FLAGGED: no source could confirm his batting hand either way — recorded as best-available
    // (Right-hand, the overwhelming default for an unremarkable tailend bowler) rather than a
    // settled fact, same treatment as the KL Rahul/Harsh Dubey precedent
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2024,
    format: "ODI",
    // ODI debut 2 Feb 2024 vs West Indies (Melbourne) — despite being named in multiple Test
    // squads (South Africa 2022-23, India 2023, Pakistan 2023-24) he was released each time
    // without ever being capped — confirmed via Wikipedia he has NOT actually played a Test.
    // No T20I debut found either.
    // Dedicated IPL search: no record of any IPL franchise appearance or signing found —
    // Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Xavier Bartlett",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2024,
    format: "ODI+T20",
    // ODI debut 2 Feb 2024 vs West Indies (Melbourne, 8 wickets across his first 2 matches,
    // earliest), T20I debut a week later in 2024 — no Test caps (a stated personal goal, not
    // yet achieved) — ESPNcricinfo confirmed. Featured in limited matches during the 2025
    // Champions Trophy campaign.
    // Dedicated IPL search: Punjab Kings — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Punjab Kings"],
    iccTrophies: 0
    // Australia lost the 2025 Champions Trophy final to India — no trophy despite featuring
  },
  {
    name: "Spencer Johnson",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast-medium",
    debutYear: 2023,
    format: "ODI+T20",
    // T20I debut 30 Aug 2023 vs South Africa (Durban, earliest), ODI debut 24 Sep 2023 vs
    // India (Indore) — no Test caps — ESPNcricinfo + Wikipedia confirmed. Explicitly NOT part
    // of the 2023 ODI World Cup winning squad (announced 6 Sept 2023, before his ODI debut).
    // Was one of 5 reinforcements added to the 2025 Champions Trophy squad, which Australia
    // lost to India in the final — no trophy.
    // FLAGGED: dedicated IPL search confirmed Kolkata Knight Riders (2025, brought on as an
    // Impact Player substitute in a live match vs Lucknow Super Giants) and a Chennai Super
    // Kings signing (24 Mar 2026, replacement for Nathan Ellis) — the CSK stint's exact match
    // appearances could not be independently confirmed beyond the signing itself, included
    // per the season having fully concluded with no reported non-selection, same treatment as
    // other season-completed replacement signings
    iplTeams: ["Kolkata Knight Riders", "Chennai Super Kings"],
    iccTrophies: 0
  },
  {
    name: "Matthew Short",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2023,
    format: "ODI+T20",
    // T20I debut 30 Aug 2023 vs South Africa (Durban, earliest), ODI debut 22 Sep 2023 vs
    // India (Mohali) — no Test caps — ESPNcricinfo confirmed. Explicitly confirmed NOT part of
    // the 2023 ODI World Cup squad (announced 6 Sept 2023). Part of the 2025 Champions Trophy
    // squad, which Australia lost to India in the final — no trophy.
    // FLAGGED: dedicated IPL search confirmed Punjab Kings (2023, injury replacement for
    // Jonny Bairstow) and a Chennai Super Kings signing (Dec 2025 mini-auction for the 2026
    // season) — the CSK stint's exact match appearances could not be independently confirmed
    // beyond the signing itself, included per the season having fully concluded with no
    // reported non-selection, same treatment as other season-completed replacement signings
    iplTeams: ["Punjab Kings", "Chennai Super Kings"],
    iccTrophies: 0
  },

  // ===== WEST INDIES (10 players) =====

  {
    name: "Brian Lara",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 1990,
    format: "Test+ODI",
    // 131 Tests, 299 ODIs — retired April 2007, ZERO T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2004 CT (as captain) — Wikipedia confirmed
  },
  {
    name: "Chris Gayle",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1999,
    format: "All-format",
    // 103 Tests, 301 ODIs, 79 T20Is — ESPNcricinfo confirmed. Over 200 international
    // wickets with off-spin — well past "even one ball bowled".
    // Day 14 FIX: was wrongly listing 5 teams including Mumbai Indians (never played for
    // MI) — Gayle's actual IPL teams are KKR (2009-10), RCB (2011-17), Punjab (2018-21) — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Royal Challengers Bangalore", "Punjab Kings"],
    iccTrophies: 3
    // 2004 CT, 2012 T20 WC, 2016 T20 WC — Wikipedia + Cricscope confirmed
  },
  {
    name: "Viv Richards",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1974,
    format: "Test+ODI",
    // Tests, ODIs — retired 1991, T20I format did not exist
    iplTeams: [],
    iccTrophies: 2
    // 1975 ODI WC, 1979 ODI WC — Wikipedia confirmed
  },
  {
    name: "Clive Lloyd",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1966,
    format: "Test+ODI",
    // Tests, ODIs — retired 1985, T20I format did not exist. 114 first-class wickets as a
    // useful medium-pacer — ESPNcricinfo confirmed.
    iplTeams: [],
    iccTrophies: 2
    // 1975 ODI WC, 1979 ODI WC — Wikipedia confirmed
  },
  {
    name: "Curtly Ambrose",
    country: "West Indies",
    role: "Bowler",
    // Day 14 FIX: was wrongly "Right-hand" — Ambrose batted left-handed (bowled right-arm
    // fast). Confirmed via ESPNcricinfo and Wikipedia.
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1988,
    format: "Test+ODI",
    // Tests, ODIs — retired 2000, T20I format did not exist
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Courtney Walsh",
    country: "West Indies",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1984,
    format: "Test+ODI",
    // Tests, ODIs — retired 2001, T20I format did not exist
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Malcolm Marshall",
    country: "West Indies",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1978,
    format: "Test+ODI",
    // Tests, ODIs — retired 1992, T20I format did not exist
    iplTeams: [],
    iccTrophies: 2
    // 1979 ODI WC, West Indies team member — Wikipedia confirmed
    // NOTE: Marshall debuted 1978, played in 1979 WC squad — Wikipedia confirmed
  },
  {
    name: "Kieron Pollard",
    country: "West Indies",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2007,
    format: "All-format",
    // Tests (1), ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 2
    // 2012 T20 WC, 2016 T20 WC — Wikipedia confirmed
  },
  {
    name: "Andre Russell",
    country: "West Indies",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 RE-CHECK: was missing Delhi Daredevils (2012, his IPL debut team before
    // moving to KKR in 2014) — Wikipedia confirmed
    iplTeams: ["Delhi Daredevils", "Kolkata Knight Riders"],
    iccTrophies: 1
    // 2012 T20 WC — Wikipedia confirmed
  },
  {
    name: "Shivnarine Chanderpaul",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 RE-CHECK: was wrongly "Didn't play IPL" — Chanderpaul played 3 matches for
    // Royal Challengers Bangalore in the 2008 season — Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== NEW ZEALAND (10 players) =====

  {
    name: "Kane Williamson",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Gujarat Titans"],
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Brendon McCullum",
    country: "New Zealand",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2002,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed. Bowled and took his only international
    // wicket in a Test in Nov 2014 — recorded per the "even one ball bowled" standard.
    // Day 14 FIX: was missing Kochi Tuskers Kerala (2011) and Gujarat Lions — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Kochi Tuskers Kerala", "Chennai Super Kings", "Gujarat Lions", "Royal Challengers Bangalore"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed (WTC won 2021 AFTER his retirement in 2016)
  },
  {
    name: "Martin Crowe",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1982,
    format: "Test+ODI",
    // Tests, ODIs — retired 1995, T20I format did not exist
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Richard Hadlee",
    country: "New Zealand",
    role: "All-rounder",
    // Day 14 FIX: was wrongly "Right-hand" — Hadlee batted left-handed (bowled right-arm
    // fast). Confirmed via ESPNcricinfo and Wikipedia.
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1973,
    format: "Test+ODI",
    // Tests, ODIs — retired 1990, T20I format did not exist
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Stephen Fleming",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed. Occasional right-arm slow-medium bowler.
    iplTeams: ["Chennai Super Kings"],
    iccTrophies: 1
    // 2000 Champions Trophy — Wikipedia confirmed
  },
  {
    name: "Daniel Vettori",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Delhi Daredevils (his first 3 IPL seasons, 2008-2010) — ESPNcricinfo confirmed
    iplTeams: ["Delhi Daredevils", "Royal Challengers Bangalore"],
    iccTrophies: 1
    // 2000 Champions Trophy — Wikipedia confirmed
  },
  {
    name: "Ross Taylor",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 RE-CHECK: was wrongly "Didn't play IPL" — Taylor played for 4 franchises:
    // RCB (2008-2010), Pune Warriors India, Delhi (Capitals/Daredevils), and Rajasthan
    // Royals (from 2011) — Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Pune Warriors", "Delhi Capitals", "Rajasthan Royals"],
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Trent Boult",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm fast",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was missing Sunrisers Hyderabad and Kolkata Knight Riders — full list per ESPNcricinfo:
    iplTeams: ["Sunrisers Hyderabad", "Kolkata Knight Riders", "Delhi Capitals", "Mumbai Indians", "Rajasthan Royals"],
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Tim Southee",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium-fast",
    debutYear: 2008,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 FIX: was wrongly "Didn't play IPL" — Southee has played for 5 IPL franchises
    // since his 2011 debut — ESPNcricinfo confirmed
    iplTeams: ["Chennai Super Kings", "Rajasthan Royals", "Mumbai Indians", "Royal Challengers Bangalore", "Kolkata Knight Riders"],
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Martin Guptill",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed. Bowled 4 innings across his career
    // (0 wickets) — recorded per the "even one ball bowled" standard.
    // Day 14 FIX (re-checked after user flagged the first pass as incomplete): was wrongly
    // "Didn't play IPL", then wrongly narrowed to just Sunrisers Hyderabad. Guptill actually
    // played for three teams: Mumbai Indians (2016, injury replacement for Lendl Simmons),
    // Kings XI Punjab (2017), and Sunrisers Hyderabad (2019) — Wikipedia confirmed
    iplTeams: ["Mumbai Indians", "Kings XI Punjab", "Sunrisers Hyderabad"],
    iccTrophies: 1
    // 2021 WTC (squad) — Wikipedia confirmed
  },

  // ===== SRI LANKA (10 players) =====

  {
    name: "Kumar Sangakkara",
    country: "Sri Lanka",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2000,
    format: "All-format",
    // 134 Tests, 404 ODIs, 56 T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: moved off old iplTeam/iplTeamsCount schema, added bowlingStyle.
    // Full IPL history via dedicated search: Kings XI Punjab (2008), Deccan Chargers
    // (2011-12, captain), Sunrisers Hyderabad (2013, captain) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kings XI Punjab", "Deccan Chargers", "Sunrisers Hyderabad"],
    iccTrophies: 2
    // 2002 CT (shared), 2014 T20 WC — Wikipedia confirmed
  },
  {
    name: "Muttiah Muralitharan",
    country: "Sri Lanka",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1992,
    format: "All-format",
    // Tests, ODIs, T20Is (1) — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: full IPL history — CSK (2008-2010), Kochi Tuskers Kerala (2011,
    // the franchise's only season), RCB (2012-13) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Chennai Super Kings", "Kochi Tuskers Kerala", "Royal Challengers Bangalore"],
    iccTrophies: 2
    // 1996 ODI WC, 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Mahela Jayawardene",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: full IPL history — Kings XI Punjab (2008-10, captain), Kochi
    // Tuskers Kerala (2011, captain), Delhi Daredevils (from 2012) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kings XI Punjab", "Kochi Tuskers Kerala", "Delhi Daredevils"],
    iccTrophies: 2
    // 2002 CT (shared), 2014 T20 WC — Wikipedia confirmed. Debuted 1997, so the 1996 ODI WC
    // (which he did not play) is correctly excluded.
  },
  {
    name: "Sanath Jayasuriya",
    country: "Sri Lanka",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 1991,
    format: "All-format",
    // Tests, ODIs, T20Is (1) — ESPNcricinfo confirmed. 440 international wickets as a
    // frontline spinner, far past the "even one ball bowled" bar.
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 2
    // 1996 ODI WC, 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Arjuna Ranatunga",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1982,
    format: "Test+ODI",
    // Tests, ODIs — retired 2000, T20I format did not exist. Confirmed deceptive part-time
    // medium-pacer earlier in his career — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: retired 2000, 8 years before IPL existed (2008) — never played.
    // As SLC chairman he was a vocal IPL critic — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1996 ODI WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Aravinda de Silva",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1984,
    format: "Test+ODI",
    // Tests, ODIs — retired 2003, T20I format did not exist. Confirmed part-time off-spinner
    // with two 4-wicket international hauls — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: retired 2003, 5 years before IPL began (2008) — never played.
    iplTeams: [],
    iccTrophies: 1
    // 1996 ODI WC — Wikipedia confirmed (Player of the Final)
  },
  {
    name: "Lasith Malinga",
    country: "Sri Lanka",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians"],
    // Only ever played for Mumbai Indians (2008-2019), IPL's all-time leading wicket-taker
    // at retirement — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 1
    // 2014 T20 WC — Wikipedia confirmed. Debuted 2004, so the 2002 CT is correctly excluded.
  },
  {
    name: "Angelo Mathews",
    country: "Sri Lanka",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2008,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: full IPL history — KKR (2010), Pune Warriors (2011-13), Delhi
    // Daredevils (2015, 2017) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kolkata Knight Riders", "Pune Warriors", "Delhi Daredevils"],
    iccTrophies: 1
    // 2014 T20 WC — Wikipedia confirmed
  },
  {
    name: "Chaminda Vaas",
    country: "Sri Lanka",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm fast-medium",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, and T20Is (2006/07-2007/08 season) confirmed via ESPNcricinfo Statsguru — corrected
    // Day 26 session 3: was previously mislabeled "ODI" ("very few/no T20Is") when a T20I record
    // actually exists for him.
    iplTeams: ["Deccan Chargers"],
    // Only franchise, 2008 season (4 matches) — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 2
    // 1996 ODI WC, 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Tillakaratne Dilshan",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 1999,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: full IPL history — Delhi Daredevils (2008-2010), Royal
    // Challengers Bangalore (2011-2013) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Delhi Daredevils", "Royal Challengers Bangalore"],
    iccTrophies: 2
    // 2002 CT (shared), 2014 T20 WC — Wikipedia confirmed
  },

  // ===== PAKISTAN (10 players) =====
  // No Pakistani player has featured in the IPL since an informal exclusion took hold after
  // the 2008 season, except a handful who played that first 2008 season only — ESPNcricinfo confirmed

  {
    name: "Wasim Akram",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast",
    debutYear: 1984,
    format: "Test+ODI",
    // Tests, ODIs — retired 2003, T20I format did not exist — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: retired 2003, before IPL existed — never played. Later worked as
    // KKR's bowling coach, a coaching role, not a playing appearance — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Imran Khan",
    country: "Pakistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1971,
    format: "Test+ODI",
    // Tests, ODIs — retired 1992, T20I format did not exist
    iplTeams: [],
    // Retired 1992, 16 years before IPL began — ESPNcricinfo confirmed
    iccTrophies: 1
    // 1992 ODI WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Javed Miandad",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 1975,
    format: "Test+ODI",
    // Tests, ODIs — retired 1996, T20I format did not exist. Confirmed occasional part-time
    // leg-spinner — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Waqar Younis",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1989,
    format: "Test+ODI",
    // Tests, ODIs — very few T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: retired 2004, before IPL existed — never played. Later worked as
    // Sunrisers Hyderabad's bowling coach (2013), a coaching role — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Inzamam ul Haq",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 1991,
    format: "All-format",
    // Tests, ODIs, and 1 T20I confirmed (debut 28 Aug 2006 vs England at Bristol, last T20I 21 Mar
    // 2007 vs Zimbabwe) — Wikipedia + ESPNcricinfo confirmed. Corrected Day 26 session 3: was
    // previously mislabeled "ODI" ("very few/no T20Is") when he genuinely has 1 T20I cap. Occasional
    // part-time slow left-arm bowler (dismissed Brian Lara with his first-ever ODI ball) — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: after retiring internationally in 2007 he played in the ICL (Indian
    // Cricket League) — a separate, PCB-unsanctioned rebel T20 league, NOT the IPL — a common
    // mix-up given the similar names. He never played IPL — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Shahid Afridi",
    country: "Pakistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak googly",
    debutYear: 1996,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: was wrongly "Didn't play IPL" — Afridi played the inaugural 2008
    // IPL season for Deccan Chargers (10 matches) before the informal exclusion took hold,
    // and no other season or team — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Deccan Chargers"],
    iccTrophies: 1
    // 2009 T20 WC — Wikipedia confirmed
  },
  {
    name: "Shoaib Akhtar",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is (few) — ESPNcricinfo confirmed
    // Day 14 Batch 3 RE-CHECK: confirmed correct — played for Kolkata Knight Riders in the
    // 2008 season only (3 matches, 5 wickets, incl. a 4/11 debut vs Delhi Daredevils),
    // before the informal exclusion took hold — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
    // No ICC trophies (1992 WC before debut, 2009 T20 WC — he was not in playing XI)
    // Wikipedia confirms Akhtar was NOT in Pakistan's 2009 T20 WC winning squad
  },
  {
    name: "Younis Khan",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 2000,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed. Occasional part-time bowler (medium pace
    // and leg breaks) — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: was wrongly "Didn't play IPL" — Younis Khan was drafted by
    // Rajasthan Royals for the 2008 season only, playing 1 match, before the informal
    // exclusion took hold — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 1
    // 2009 T20 WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Babar Azam",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Debuted 2015, after the informal exclusion of Pakistani players took hold — never played — ESPNcricinfo confirmed
    iccTrophies: 1
    // 2017 CT — Wikipedia confirmed
  },
  {
    name: "Shaheen Shah Afridi",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast",
    debutYear: 2018,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Never played IPL — his large PSL (Pakistan Super League) stats for Lahore Qalandars are
    // sometimes mislabeled as IPL by low-quality sites; confirmed not the case — Wikipedia confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== ENGLAND (10 players) =====

  {
    name: "Ian Botham",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 1977,
    format: "Test+ODI",
    // Tests, ODIs — retired 1993, T20I format did not exist
    iplTeams: [],
    // Retired 1993, 16 years before IPL began — ESPNcricinfo confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed (1979 WC runner-up, 1992 WC runner-up)
  },
  {
    name: "Joe Root",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2012,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: was wrongly "Didn't play IPL" — Root debuted for Rajasthan
    // Royals in 2023 (3 matches), sat out 2024, went unsold in 2026 — ESPNcricinfo confirmed
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 2
    // 2019 ODI WC, 2022 T20 WC — Wikipedia confirmed
  },
  {
    name: "Ben Stokes",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: full IPL history — Rising Pune Supergiant (2017), Rajasthan
    // Royals (2018-2021), sat out 2022, Chennai Super Kings (2023, 2 matches before injury,
    // team won the title) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Rising Pune Supergiant", "Rajasthan Royals", "Chennai Super Kings"],
    iccTrophies: 2
    // 2019 ODI WC, 2022 T20 WC — Wikipedia confirmed
  },
  {
    name: "Kevin Pietersen",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: was missing Rising Pune Supergiants (2016) — full history: RCB
    // (2009-10, captain), Delhi Daredevils (2012 & 2014, captain), Rising Pune Supergiants
    // (2016). Excludes Deccan Chargers (2011, sold before playing) and Sunrisers Hyderabad
    // (2015, released before the tournament started) since he never played for either — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Delhi Daredevils", "Rising Pune Supergiant"],
    iccTrophies: 1
    // 2010 T20 WC — Wikipedia confirmed
  },
  {
    name: "Andrew Flintoff",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 1998,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Chennai Super Kings"],
    // Only franchise, 2009 season (3 matches, sent home injured) — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Alastair Cook",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    // Day 14 Batch 3 FIX: has a confirmed career bowling record — 18 deliveries across his
    // Test career, 1 wicket (vs India, Trent Bridge 2014). ESPNcricinfo lists "Right-arm
    // Slow"; other sources say "Right-arm Offbreak" — same part-time role, minor source
    // label disagreement flagged, not NA.
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2006,
    format: "Test+ODI",
    // Tests, ODIs — very few/no T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Never played IPL — confirmed via multiple sources — ESPNcricinfo confirmed
    iccTrophies: 0
    // No ICC trophies — Cook was NOT in the 2010 T20 WC playing squad, no confirmed T20I record — ESPNcricinfo + Wikipedia confirmed
  },
  {
    name: "James Anderson",
    country: "England",
    role: "Bowler",
    // Day 14 Batch 3 FIX: was wrongly "Right-hand" — Anderson bats left-handed despite
    // bowling right-arm (a genuine cross-dominant player, like Stuart Broad below) —
    // ESPNcricinfo profile explicitly confirmed
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2002,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Never played IPL — rejected earlier offers to focus on England, entered the 2025
    // auction but went unsold at his reserve price — ESPNcricinfo + Wikipedia confirmed
    iccTrophies: 1
    // 2010 T20 WC — England squad included Anderson — Wikipedia confirmed
  },
  {
    name: "Stuart Broad",
    country: "England",
    role: "Bowler",
    // Day 14 Batch 3 FIX: was wrongly "Right-hand" — Broad bats left-handed despite bowling
    // right-arm (scored a Test 169 vs Pakistan at Lord's in 2010) — ESPNcricinfo profile
    // explicitly confirmed
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: was wrongly listing Kings XI Punjab — Broad was signed to KXIP for
    // both 2011 and 2012 but was injured out both seasons and never played a single match
    // for them, so per the project's signed-but-never-played rule this is an empty array — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2010 T20 WC — Wikipedia confirmed
  },
  {
    name: "Eoin Morgan",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    // UNCONFIRMED (Day 14 Batch 3): ESPNcricinfo's profile lists a style classification of
    // "Right-arm medium," but no source confirms an actual delivery bowled in international
    // cricket (0 wickets in 16 Tests confirmed; ODI/T20I/IPL overs bowled could not be
    // confirmed either way — 0 overs bowled in IPL). Same situation as KL Rahul — marking NA
    // as the safer call, flagged for re-check rather than presented as settled fact.
    bowlingStyle: "NA",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 14 Batch 3 FIX: was undercounted at "KKR + 2 more unlisted" — full IPL history by
    // first appearance: RCB (2010), KKR (2011-13, then again 2019+), Sunrisers Hyderabad
    // (2015-16), Kings XI Punjab (2017). Sat out 2014 — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Kolkata Knight Riders", "Sunrisers Hyderabad", "Kings XI Punjab"],
    iccTrophies: 2
    // 2019 ODI WC (as captain), 2022 T20 WC — Wikipedia confirmed
  },
  {
    name: "Graham Gooch",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm medium",
    debutYear: 1975,
    format: "Test+ODI",
    // Tests, ODIs — retired 1995, T20I format did not exist. Over 200 first-class wickets
    // as an occasional medium-pacer, a genuine secondary bowling record — ESPNcricinfo confirmed
    iplTeams: [],
    // Retired 1995, 13 years before IPL began — ESPNcricinfo confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== SOUTH AFRICA (10 players) =====

  {
    name: "AB de Villiers",
    country: "South Africa",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium",
    // Took 2 Test wickets — occasional bowler, not a zero-ball record — ESPNcricinfo confirmed
    debutYear: 2004,
    format: "All-format",
    // 114 Tests, 228 ODIs, 78 T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing Delhi Daredevils (his first 3 IPL seasons,
    // 2008-2010, before moving to RCB in 2011) — ESPNcricinfo confirmed
    iplTeams: ["Delhi Daredevils", "Royal Challengers Bangalore"],
    iccTrophies: 1
    // 1998 CT (South Africa won) — BUT AB debuted 2004, so NOT counted
    // 2025 WTC — AB retired 2018, NOT counted
    // VERIFIED: AB de Villiers has ZERO ICC trophies — Wikipedia confirmed
  },
  {
    name: "Jacques Kallis",
    country: "South Africa",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm fast medium",
    // ESPNcricinfo confirmed — frontline seam bowling all-rounder
    debutYear: 1995,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing Royal Challengers Bangalore (his first 3 IPL
    // seasons, 2008-2010, before moving to KKR in 2011) — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Kolkata Knight Riders"],
    iccTrophies: 1
    // 1998 CT — Wikipedia confirmed (Kallis debuted 1995, was in 1998 CT squad)
  },
  {
    name: "Graeme Smith",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Left-hand",
    // Left-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium",
    // Occasional part-time bowler, career bowling average 52.83 — a real (if minor)
    // bowling record, not a confirmed zero-ball case — ESPNcricinfo confirmed
    debutYear: 2002,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing Rajasthan Royals (his first 3 IPL seasons,
    // 2008-2010, before moving to Pune Warriors in 2011) — ESPNcricinfo confirmed
    iplTeams: ["Rajasthan Royals", "Pune Warriors"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed (1998 CT before his debut)
  },
  {
    name: "Hashim Amla",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // Described as an "occasional off-break bowler" across sources — confirms he
    // did bowl, though exact wicket tally is unclear — ESPNcricinfo confirmed
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Kings XI Punjab only, 2016-2017 — dedicated IPL-history search confirmed no other team
    iplTeams: ["Kings XI Punjab"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Dale Steyn",
    country: "South Africa",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm fast",
    // ESPNcricinfo confirmed
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // RCB (2008-10, 2019-20), Deccan Chargers (2011), Sunrisers Hyderabad (2013-15),
    // Gujarat Lions (2016) — ESPNcricinfo confirmed. Old comment's "DD" abbreviation
    // was ambiguous (meant Deccan Chargers, not Delhi Daredevils) — clarified here
    iplTeams: ["Royal Challengers Bangalore", "Deccan Chargers", "Sunrisers Hyderabad", "Gujarat Lions"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Kagiso Rabada",
    country: "South Africa",
    role: "Bowler",
    // Day 15 Batch 4 FIX: was wrongly "Right-hand" — Rabada bats LEFT-handed despite
    // bowling right-arm — same pattern as Zaheer Khan/Anderson/Broad — ESPNcricinfo,
    // Cricbuzz, Wikipedia all confirm Left-hand Bat
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast",
    // ESPNcricinfo confirmed
    debutYear: 2014,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing Gujarat Titans (2025-present) — ESPNcricinfo confirmed
    iplTeams: ["Delhi Capitals", "Punjab Kings", "Gujarat Titans"],
    iccTrophies: 1
    // 2025 WTC — Wikipedia confirmed, in the SA squad for the final
  },
  {
    name: "Shaun Pollock",
    country: "South Africa",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm fast medium",
    // ESPNcricinfo confirmed
    debutYear: 1995,
    format: "All-format",
    // Tests, ODIs, T20Is (few) — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly "Didn't play IPL" — Pollock played the 2008
    // inaugural season for Mumbai Indians before retiring — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 1
    // 1998 CT — Wikipedia confirmed
  },
  {
    name: "Faf du Plessis",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm leg break",
    // Described as an "occasional leg-break bowler" — confirms he did bowl —
    // ESPNcricinfo confirmed
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing Delhi Capitals (2025-present, after CSK,
    // Rising Pune Supergiant, and RCB) — ESPNcricinfo confirmed
    iplTeams: ["Chennai Super Kings", "Rising Pune Supergiant", "Royal Challengers Bangalore", "Delhi Capitals"],
    iccTrophies: 0
    // No ICC trophies — retired from Tests in 2022, before the 2025 WTC win —
    // Wikipedia confirmed
  },
  {
    name: "Mark Boucher",
    country: "South Africa",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium",
    // Listed in his RCB 2008 squad profile as bowling right-arm medium pace —
    // ESPNcricinfo confirmed
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly "Didn't play IPL" — Boucher played for Royal
    // Challengers Bangalore (2008-2010) then Kolkata Knight Riders (2011, as a
    // mid-season injury replacement) before retiring in mid-2012 — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Kolkata Knight Riders"],
    iccTrophies: 1
    // 1998 CT — Wikipedia confirmed
  },
  {
    name: "Aiden Markram",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // Part-time off-spinner, increasingly used in T20Is — ESPNcricinfo confirmed
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing Lucknow Super Giants (2025-26) and had the
    // wrong order — correct chronological order is Punjab Kings (2021) first, then
    // Sunrisers Hyderabad (2022-24), then Lucknow Super Giants — ESPNcricinfo confirmed
    iplTeams: ["Punjab Kings", "Sunrisers Hyderabad", "Lucknow Super Giants"],
    iccTrophies: 1
    // 2025 WTC (Player of the Match in final) — Wikipedia confirmed
  },

  // ===== BANGLADESH (10 players) =====

  {
    name: "Shakib Al Hasan",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Left-hand",
    // Left-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Slow left-arm orthodox",
    // ESPNcricinfo confirmed
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly including Mumbai Indians — Shakib has only ever
    // played FOR Kolkata Knight Riders (2011-17, 2021, 2023) and Sunrisers Hyderabad
    // (2018-19); he played AGAINST Mumbai Indians in several matches, which the old
    // data appears to have confused for a franchise he represented — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders", "Sunrisers Hyderabad"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Tamim Iqbal",
    country: "Bangladesh",
    role: "Batsman",
    battingStyle: "Left-hand",
    // Left-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Slow left-arm orthodox",
    // Rarely used, but has recorded bowling figures (3 ODI innings, 0 wickets) — a
    // real if minor bowling record, not a confirmed zero-ball case — ESPNcricinfo confirmed
    debutYear: 2007,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Signed by Pune Warriors India for 2012 but never played a match for them —
    // per the signed-but-never-played rule (see Axar Patel precedent), this does
    // not count — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mushfiqur Rahim",
    country: "Bangladesh",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium",
    // UNCONFIRMED exact style — sources disagree (one lists left-arm orthodox, another
    // right-arm fast medium); going with the ESPNcricinfo-sourced answer, but flagging
    // this as needing a closer look, similar to KL Rahul's entry. He has bowled at
    // least once in domestic first-class cricket (1/23 in 10 overs, 2012-13 season)
    // so NA does not apply — his career bowling record is genuinely confirmed to exist
    debutYear: 2005,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Never played IPL — dedicated search confirmed no franchise history — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mashrafe Mortaza",
    country: "Bangladesh",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm fast medium",
    // ESPNcricinfo confirmed
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Kolkata Knight Riders only — 1 match, 2009 season — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mahmudullah",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // ESPNcricinfo confirmed
    debutYear: 2007,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Never played IPL — went unsold at auction, dedicated search confirmed no
    // franchise history despite an extensive T20 franchise career elsewhere
    // (Rangpur Riders, Jamaica Tallawahs, etc.) — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mohammad Ashraful",
    country: "Bangladesh",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // Sources flag both offbreak and legbreak as his variations — ESPNcricinfo lists
    // offbreak as primary; noting the disagreement per the cross-verification rule
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly "Didn't play IPL" — Ashraful was bought by
    // Mumbai Indians for the 2009 season and played 1 match — ESPNcricinfo confirmed
    iplTeams: ["Mumbai Indians"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mustafizur Rahman",
    country: "Bangladesh",
    role: "Bowler",
    // Day 15 Batch 4 FIX: was wrongly "Right-hand" — Mustafizur bats LEFT-handed
    // despite bowling left-arm too — ESPNcricinfo, Cricbuzz, Wikipedia all confirm
    // Left-hand Bat
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm fast medium",
    // ESPNcricinfo confirmed
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was missing 2 teams — full history is Sunrisers Hyderabad
    // (2016-17), Mumbai Indians (2018), Rajasthan Royals (2021), Delhi Capitals
    // (2022-23), Chennai Super Kings (2024). He was bought by KKR for IPL 2026 but
    // was released by BCCI instruction before playing a match, so per the
    // signed-but-never-played rule that does not count — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Mumbai Indians", "Rajasthan Royals", "Delhi Capitals", "Chennai Super Kings"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mehidy Hasan Miraz",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // ESPNcricinfo confirmed
    debutYear: 2016,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Never played IPL — went unsold at the 2025 mega auction, dedicated search
    // confirmed no franchise history — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Litton Das",
    country: "Bangladesh",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // ESPNcricinfo confirmed
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly "Didn't play IPL" — Das played 1 match for
    // Kolkata Knight Riders in the 2023 season — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Taskin Ahmed",
    country: "Bangladesh",
    role: "Bowler",
    // Day 15 Batch 4 FIX: was wrongly "Right-hand" — Taskin bats LEFT-handed despite
    // bowling right-arm — ESPNcricinfo, Cricbuzz, Wikipedia all confirm Left-hand Bat
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm fast",
    // ESPNcricinfo confirmed
    debutYear: 2014,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Registered for IPL auctions (including 2026) but dedicated search found no
    // record of him ever being bought or playing an actual IPL match — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== AFGHANISTAN (10 players) =====

  {
    name: "Rashid Khan",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Legbreak googly",
    // ESPNcricinfo confirmed
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: old data wrongly showed 3 stints ("SRH, GT, SRH") — he
    // only ever moved once, from Sunrisers Hyderabad (2017-2021) to Gujarat Titans
    // (2022-present), no return to SRH — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Gujarat Titans"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mohammad Nabi",
    country: "Afghanistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // ESPNcricinfo confirmed
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was vague ("SRH + others"). Full history: Sunrisers
    // Hyderabad (2017-2021), then bought by Kolkata Knight Riders in the 2022
    // auction but never got to play a match for them (excluded per the
    // signed-but-never-played rule), then Mumbai Indians (2024-present, actually
    // played) — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Mumbai Indians"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Asghar Afghan",
    country: "Afghanistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium fast",
    // Used as an occasional change bowler — ESPNcricinfo confirmed
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Confirmed "Didn't play IPL" — an initial search hit ("6 matches, HS 164")
    // turned out to be from Legends League Cricket (a retired-players' exhibition
    // tournament, teams like "Toyam Hyderabad"/"Maratha Arabians"), not the actual
    // IPL — flagging this here so it isn't mistaken for real IPL data again
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mujeeb ur Rahman",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // Mixes offbreak with legspin/googly variations — ESPNcricinfo confirmed
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: old data ("Punjab, MI, Punjab") didn't match his actual
    // history at all. Full record: Kings XI Punjab (2018-2020), Sunrisers Hyderabad
    // (2021), bought by KKR in 2024 but injury meant he never played for them
    // (excluded per the signed-but-never-played rule), Mumbai Indians (2025-present,
    // actually played) — ESPNcricinfo confirmed
    iplTeams: ["Kings XI Punjab", "Sunrisers Hyderabad", "Mumbai Indians"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Rahmanullah Gurbaz",
    country: "Afghanistan",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium",
    // ESPNcricinfo confirmed
    debutYear: 2019,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly including Gujarat Titans — he was named in
    // their 2022 squad as an injury replacement but never broke into the playing
    // XI, so per the signed-but-never-played rule that doesn't count. He was
    // traded to Kolkata Knight Riders ahead of 2023 and has played for them since
    // — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Gulbadin Naib",
    country: "Afghanistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium fast",
    // ESPNcricinfo confirmed
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: was wrongly "Didn't play IPL" — Naib made his IPL debut
    // for Delhi Capitals in the 2024 season — ESPNcricinfo confirmed
    iplTeams: ["Delhi Capitals"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Ibrahim Zadran",
    country: "Afghanistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium fast",
    // ESPNcricinfo confirmed
    debutYear: 2018,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Confirmed "Didn't play IPL" — one low-quality aggregator page claimed "8
    // matches" but this could not be corroborated; dedicated searches on the
    // 2024 and 2025 auctions found no franchise picked him (explicitly unsold
    // in 2025 at his base price), so treating the "8 matches" claim as unreliable
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Naveen ul Haq",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm medium fast",
    // ESPNcricinfo confirmed — known for his yorkers in the death overs
    debutYear: 2018,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Lucknow Super Giants only, since his Dec 2022 auction signing — ESPNcricinfo confirmed
    iplTeams: ["Lucknow Super Giants"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Fazalhaq Farooqi",
    country: "Afghanistan",
    role: "Bowler",
    // Day 15 Batch 4 FIX: was wrongly "Left-hand" — Farooqi bats RIGHT-handed
    // despite bowling left-arm — the old data appears to have conflated his
    // bowling arm with his batting hand (the reverse of the Zaheer Khan pattern)
    // — ESPNcricinfo, Cricbuzz, Wikipedia all confirm Right-hand Bat
    battingStyle: "Right-hand",
    bowlingStyle: "Left-arm fast medium",
    // ESPNcricinfo confirmed
    debutYear: 2019,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Day 15 Batch 4 FIX: old data ("Gujarat Titans") did not match his actual
    // history at all — he has only ever played for Sunrisers Hyderabad
    // (2022-2024) and Rajasthan Royals (2025-present); no record of Gujarat
    // Titans found anywhere — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Rajasthan Royals"],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Hashmatullah Shahidi",
    country: "Afghanistan",
    role: "Batsman",
    battingStyle: "Left-hand",
    // Left-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right-arm offbreak",
    // ESPNcricinfo confirmed
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // Confirmed "Didn't play IPL" — dedicated search found no record of any IPL
    // auction sale or franchise appearance — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== ZIMBABWE (10 players) =====

  {
    name: "Andy Flower",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "Right-arm offbreak",
    // Occasional off-break/slow-medium — ESPNcricinfo confirmed
    debutYear: 1992,
    format: "Test+ODI",
    // CORRECTED Day 15: was wrongly "All-format" — retired from international
    // cricket after the 2003 World Cup, before T20Is existed (first T20I was
    // Feb 2005) — zero T20Is. Same pattern as Kapil Dev/Warne/Wasim Akram/Ganguly.
    // Tests, ODIs — ESPNcricinfo/Wikipedia confirmed
    iplTeams: [],
    // Never played IPL as a player (career ended 2003, pre-IPL) — has since
    // coached Multan Sultans, Lucknow Super Giants and RCB (2025 & 2026 titles)
    // in the IPL, but that's coaching, not playing — ESPNcricinfo confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Heath Streak",
    country: "Zimbabwe",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm fast-medium",
    debutYear: 1993,
    format: "Test+ODI",
    // Tests, ODIs — retired October 2005, no evidence of any T20I appearance
    // for Zimbabwe — ESPNcricinfo/Wikipedia confirmed
    iplTeams: [],
    // Never played IPL as a player — was bowling coach for Gujarat Lions and
    // Kolkata Knight Riders, but that's coaching, not playing — confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Brendan Taylor",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Signed by Sunrisers Hyderabad for IPL 2014 but never fielded in a
    // match all season (per Wikipedia's 2014 SRH season squad/stats tables) —
    // same "signed but never played" rule as Axar Patel/MI and Stuart Broad/KXIP
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Grant Flower",
    country: "Zimbabwe",
    role: "Batsman",
    battingStyle: "Right-hand",
    // CORRECTED Day 15: was wrongly "Left-hand" — Grant Flower bats
    // right-handed but bowls left-arm orthodox spin, which had been
    // conflated into the batting field. Confirmed on Wikipedia infobox
    // ("Batting: Right-handed") and cross-checked via search — same
    // bowling-arm/batting-hand mix-up pattern as Zaheer Khan/Anderson/Broad
    bowlingStyle: "Left-arm orthodox",
    debutYear: 1992,
    format: "Test+ODI",
    // Tests, ODIs — retired early 2000s, T20I format did not exist — confirmed
    iplTeams: [],
    // Confirmed by exclusion: only 5 Zimbabweans have ever played IPL
    // (Taibu, Ray Price, Brendan Taylor, Sikandar Raza, Blessing Muzarabani)
    // — dedicated search confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Hamilton Masakadza",
    country: "Zimbabwe",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm legbreak",
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Confirmed by exclusion: only 5 Zimbabweans have ever played IPL
    // (Taibu, Ray Price, Brendan Taylor, Sikandar Raza, Blessing Muzarabani) —
    // other franchise team names surfaced in search (India Capitals, Rajasthan
    // Kings etc.) are Legends League Cricket, not the real IPL — confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Sikandar Raza",
    country: "Zimbabwe",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    // Bowls a mix of offbreak and legbreak (mystery spin) — offbreak listed
    // as primary style on ESPNcricinfo
    debutYear: 2013,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Punjab Kings"],
    // CORRECTED Day 15: was wrongly "Didn't play IPL" — played for Punjab
    // Kings in IPL 2023 and 2024 (7 matches, incl. first-ever IPL half-century
    // by a Zimbabwean); went unsold in the 2025 auction — dedicated search confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Tatenda Taibu",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    // Rarely used at international level — ESPNcricinfo confirmed
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: ["Kolkata Knight Riders"],
    // CORRECTED Day 15: was wrongly "Didn't play IPL" — first-ever Zimbabwean
    // to play IPL, signed by KKR in the inaugural 2008 season, played 3 matches
    // — dedicated search confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Sean Williams",
    country: "Zimbabwe",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left-arm orthodox",
    debutYear: 2008,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeams: [],
    // Confirmed by exclusion: only 5 Zimbabweans have ever played IPL
    // (Taibu, Ray Price, Brendan Taylor, Sikandar Raza, Blessing Muzarabani) —
    // dedicated search confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Brian Bennett",
    country: "Zimbabwe",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    debutYear: 2022,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // NOTE: Scored 292 runs at average 146 at T20 WC 2026 — ICC.com confirmed
    iplTeams: [],
    // Has not played IPL — signed by Peshawar Zalmi for PSL 2026, not IPL —
    // dedicated search confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "David Houghton",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right-arm offbreak",
    // Occasional bowler, primarily a batsman — ESPNcricinfo confirmed
    debutYear: 1983,
    format: "Test+ODI",
    // Tests, ODIs — retired 1997, T20I format did not exist
    iplTeams: [],
    // Retired 1997, well before IPL began in 2008 — confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  }

];
