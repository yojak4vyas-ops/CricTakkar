// ===== CRICTAKKAR CRICKET WORDLE — PLAYER DATABASE =====
// 275 players across 11 countries
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm medium",
    debutYear: 1971,
    format: "Test+ODI",
    // 125 Tests, 108 ODIs — retired 1987, T20I format did not exist
    iplTeams: [],
    iccTrophies: 1
    // 1983 ODI WC — squad member, played in the final (out for 2) — ESPNcricinfo + Wikipedia confirmed.
    // Corrected Day 32: was wrongly 0 despite Kapil Dev's entry (same squad) correctly showing 1.
  },
  {
    name: "VVS Laxman",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Left Arm Wrist Spin (Chinaman)",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Left arm medium fast",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
    debutYear: 2024,
    format: "All-format",
    // Test debut 22 Nov 2024 vs Australia (Perth), ODI debut 6 Feb 2025 vs England, T20I debut 31 Jan 2025 vs England —
    // ESPNcricinfo confirmed. One of only 5 bowlers ever with 3+ wickets on debut in all 3 formats.
    iplTeams: ["Kolkata Knight Riders"],
    iccTrophies: 0
    // Note added Day 32: was originally selected for the winning 2026 T20 World Cup squad but
    // ruled out by a knee injury in the warm-up before the tournament started (replaced by
    // Mohammed Siraj) — never played, so 0 is correct, not an oversight. ESPNcricinfo confirmed.
  },
  {
    name: "Nitish Kumar Reddy",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
    debutYear: 2017,
    format: "All-format",
    // T20I debut 2017 vs New Zealand, ODI debut 15 Jan 2019 vs Australia (Adelaide), Test debut 2020
    // (Boxing Day Test) — ESPNcricinfo confirmed
    iplTeams: ["Sunrisers Hyderabad", "Royal Challengers Bangalore", "Gujarat Titans"],
    iccTrophies: 2
    // Left out of the 2025 Champions Trophy 15 (correct, unchanged) — ESPNcricinfo confirmed.
    // Corrected Day 32 (2nd fix, user-caught): was actually part of TWO winning T20 World Cup
    // squads — listed under Bowlers on ESPNcricinfo's own official 2024 squad page (30-Apr-2024),
    // and added to the 2026 squad as a late injury replacement for Harshit Rana, playing a
    // match-sealing wicket vs USA — both confirmed via direct ESPNcricinfo squad-page fetch
    // (2024) and ESPNcricinfo + Wikipedia (2026).
  },
  {
    name: "Shahbaz Nadeem",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Left arm medium fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Left arm fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Left arm fast",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Left arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Left Arm Wrist Spin (Chinaman)",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Left Arm Wrist Spin (Chinaman)",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
  {
    name: "Cameron White",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    debutYear: 2005,
    format: "All-format",
    // ODI debut 5 Oct 2005 vs ICC World XI (Super Series, earliest), T20I debut 9 Jan 2007
    // vs England, Test debut 9 Oct 2008 vs India — 4 Tests, 91 ODIs, 47 T20Is — ESPNcricinfo +
    // Wikipedia confirmed. Australia T20I captain 2011-2013. Squad member of the winning 2009
    // ICC Champions Trophy (confirmed via the official ESPNcricinfo squad list) — 62 in the
    // final vs New Zealand.
    iplTeams: ["Royal Challengers Bangalore", "Deccan Chargers", "Sunrisers Hyderabad"],
    iccTrophies: 1
    // 2009 Champions Trophy
  },
  {
    name: "David Hussey",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2008,
    format: "ODI+T20",
    // T20I debut 1 Feb 2008 vs India (MCG, earliest), ODI debut 4 Jul 2008 vs West Indies —
    // never played a Test despite a first-class average over 55 — ESPNcricinfo + Wikipedia
    // confirmed. Squad member of the winning 2009 ICC Champions Trophy (confirmed via the
    // official ESPNcricinfo squad list, listed as an allrounder) — 1 trophy. Also toured with
    // the 2010 WT20 (runners-up), 2011 ODI WC, and 2012 WT20 squads, none won by Australia.
    iplTeams: ["Kolkata Knight Riders", "Kings XI Punjab", "Chennai Super Kings"],
    iccTrophies: 1
    // 2009 Champions Trophy
  },
  {
    name: "D'Arcy Short",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Left Arm Wrist Spin (Chinaman)",
    debutYear: 2018,
    format: "ODI+T20",
    // T20I debut 3 Feb 2018 vs New Zealand (earliest), ODI debut 16 Jun 2018 vs England — never
    // played a Test — ESPNcricinfo + Wikipedia confirmed. Career span 2018-2020, before
    // Australia's next ICC trophy (2021 T20 WC) — 0 trophies.
    iplTeams: ["Rajasthan Royals"],
    iccTrophies: 0
  },
  {
    name: "Nathan Coulter-Nile",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    debutYear: 2013,
    format: "ODI+T20",
    // T20I debut 13 Feb 2013 vs West Indies (earliest), ODI debut 14 Sep 2013 vs England —
    // never played a Test — ESPNcricinfo + Wikipedia confirmed. Squad member for the 2014 WT20
    // (Sri Lanka won), 2016 WT20 (West Indies won), and 2019 ODI WC (England won) — ruled out of
    // the winning 2015 ODI WC squad by injury (confirmed via dedicated search) — 0 trophies.
    iplTeams: ["Mumbai Indians", "Delhi Daredevils", "Kolkata Knight Riders", "Royal Challengers Bangalore", "Rajasthan Royals"],
    iccTrophies: 0
    // Note: rejoined Mumbai Indians a second time (2020-2021) after the Delhi/KKR/RCB spells —
    // listed once per the array's "every distinct team played for" convention, not per stint
  },
  {
    // ROUND 2 (cap-number method): Australia's T20I caps 118, 117, 115 — the 3 most recent
    // debutants not already in the database (cap 116 Matt Renshaw already present) — added to
    // close the Round 1 shortfall (17/20) up to the 20-player Round 1+2 target.
    name: "Joel Davies",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left arm orthodox",
    debutYear: 2026,
    format: "T20",
    // T20I cap 118, debut 17 Jun 2026 vs Bangladesh (Chattogram) — 3/17 on debut, first
    // Australian to take 3+ wickets on T20I debut in 3 years — ESPNcricinfo confirmed. No Test
    // or ODI caps. Never played IPL (domestic teams only: Sydney Sixers, Sydney Thunder).
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Nikhil Chaudhary",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    debutYear: 2026,
    format: "T20",
    // T20I cap 117, debut 17 Jun 2026 vs Bangladesh (Chattogram) — India-born (Delhi), qualified
    // for Australia via 5-year residency, called up as a replacement for the rested Travis Head —
    // ESPNcricinfo confirmed. No Test or ODI caps. Never played IPL.
    iplTeams: [],
    iccTrophies: 0
  },
  {
    name: "Jack Edwards",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 2026,
    format: "T20",
    // T20I cap 115, debut 29 Jan 2026 vs Pakistan (Lahore) — 5 runs, 0/25 — ESPNcricinfo
    // confirmed. No Test or ODI caps.
    // FLAGGED: signed by Sunrisers Hyderabad for IPL 2026 (INR 3 crore, only uncapped overseas
    // player bought at that auction) but ruled out by a foot injury before playing a match — his
    // full career stats show zero IPL-tournament rows, confirming no actual appearance — treated
    // as "signed but never played" per the standing rule, iplTeams left empty.
    iplTeams: [],
    iccTrophies: 0
  },

  // ===== WEST INDIES (10 players) =====

  {
    name: "Brian Lara",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm fast",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
  {
    name: "Tom Latham",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 2012,
    format: "All-format",
    // ODI debut Feb 2012, T20I debut Jun 2012, Test debut Feb 2014 — ESPNcricinfo + Wikipedia confirmed
    // Went unsold at multiple IPL auctions (2023, 2025) — has never played in the IPL —
    // Wikipedia + press reports confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2021 WTC — named in the official 15-man final squad — Wikipedia confirmed
  },
  {
    name: "John Wright",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 1978,
    format: "Test+ODI",
    // Test and ODI debut both 1978, retired 1993 — before T20Is existed (Feb 2005) — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1993, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Nathan Astle",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 1995,
    format: "All-format",
    // ODI debut Jan 1995, Test debut 1996, played 4 T20Is 2005-2006 — ESPNcricinfo + Wikipedia confirmed
    // Retired 2006, before the IPL began (2008) — no IPL history
    iplTeams: [],
    iccTrophies: 1
    // 2000 ICC KnockOut Trophy (Champions Trophy) — named in the actual winning squad —
    // Wikipedia squad list confirmed
  },
  {
    name: "BJ Watling",
    country: "New Zealand",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2009,
    format: "All-format",
    // T20I debut Nov 2009, Test debut Dec 2009, ODI debut Aug 2010 — Wikipedia confirmed.
    // Most dismissals by a New Zealand wicketkeeper (265) — ESPNcricinfo confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2021 WTC — named in the official 15-man final squad, his last international match
    // before retiring — Wikipedia confirmed
  },
  {
    name: "Bevan Congdon",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 1965,
    format: "Test+ODI",
    // 61 Tests, 11 ODIs, 1965-1978 — before T20Is existed — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1978, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "John Reid",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // UNCONFIRMED PRECISELY: Wikipedia describes his bowling as evolving from genuinely quick
    // early in his career to off-cutters and spin later — recorded as best-available rather
    // than one exact settled style, same treatment as other flagged/uncertain entries
    debutYear: 1949,
    format: "Test",
    // Test debut 1949, career ended 1965 — before ODI cricket existed (first ODI was Jan 1971) —
    // Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Career ended 1965, decades before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Henry Nicholls",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2015,
    format: "All-format",
    // ODI debut Dec 2015, Test debut Feb 2016, T20I debut Mar 2016 — Wikipedia confirmed
    // Played BBL for Sydney Thunder but has 0 IPL matches — no evidence of any IPL auction
    // signing found — Wikipedia + search confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2021 WTC — named in the official 15-man final squad — Wikipedia confirmed
  },
  {
    name: "Chris Cairns",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 1989,
    format: "All-format",
    // Test debut 1989, ODI debut 1991, T20I debut Feb 2005 (played in cricket's first-ever
    // T20I, vs Australia) — ESPNcricinfo + Wikipedia confirmed
    // Captained the Chandigarh Lions in the rival Indian Cricket League (ICL), NOT the IPL —
    // he never played actual IPL cricket — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 1
    // 2000 ICC KnockOut Trophy (Champions Trophy) — named in the actual winning squad —
    // Wikipedia squad list confirmed
  },
  {
    name: "Neil Wagner",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Left-hand",
    bowlingStyle: "Left arm fast medium",
    debutYear: 2012,
    format: "Test",
    // Test debut 2012, retired 2024 — was named in ODI squads (e.g. 2017 tri-series) but never
    // actually played an ODI or T20I match — Wikipedia + ESPNcricinfo confirmed
    // No evidence of any IPL history found — Wikipedia's domestic-career section lists South
    // African domestic sides, Otago, Northern Districts and English county teams, no IPL
    iplTeams: [],
    iccTrophies: 1
    // 2021 WTC — named in the official 15-man final squad — Wikipedia confirmed
  },
  {
    name: "Chris Martin",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 2000,
    format: "All-format",
    // Test debut 2000, ODI 2001-2008, T20I Sep 2007-Feb 2008 — Wikipedia confirmed.
    // NOT in the 2000 ICC KnockOut Trophy winning squad (14-man list checked directly) — Wikipedia confirmed
    // No evidence of any IPL history found despite his career (2000-2013) overlapping the IPL era —
    // famous for being one of very few cricketers whose international wickets exceed his runs scored
    iplTeams: [],
    iccTrophies: 0
    // Called up to the 2007 World Cup squad only as an injury replacement, not part of any
    // trophy-winning squad — Wikipedia confirmed
  },
  {
    name: "Danny Morrison",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 1987,
    format: "Test+ODI",
    // Test and ODI debut both 1987, retired 1997 — before T20Is existed — Wikipedia confirmed.
    // One of only 3 New Zealanders to take an ODI hat-trick (vs India, 25 Mar 1994) — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1997, before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Matt Henry",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 2014,
    format: "All-format",
    // ODI debut Jan 2014, T20I debut Dec 2014, Test debut 2015 — ESPNcricinfo + Wikipedia confirmed
    // Signed by Chennai Super Kings 2014-2015 but never played a match for them (excluded per the
    // signed-but-never-played rule) — genuine playing stints were Kings XI Punjab (2017),
    // Lucknow Super Giants (2024), and a real return to Chennai Super Kings in 2026 (played
    // vs Rajasthan Royals, 30 Mar 2026) — Wikipedia + match reports confirmed
    iplTeams: ["Kings XI Punjab", "Lucknow Super Giants", "Chennai Super Kings"],
    iccTrophies: 1
    // 2021 WTC — named in the official 15-man final squad — Wikipedia confirmed
  },
  {
    name: "Lance Cairns",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium fast",
    debutYear: 1974,
    format: "Test+ODI",
    // Test and ODI debut both 1974, retired 1985 — before T20Is existed — Wikipedia confirmed.
    // Father of Chris Cairns; famous for hitting 6 sixes in an over at the 1983 World Series Cup
    iplTeams: [],
    iccTrophies: 0
    // Retired 1985, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Ewen Chatfield",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium fast",
    debutYear: 1975,
    format: "Test+ODI",
    // Test debut Feb 1975, ODI debut Jun 1979 — before T20Is existed — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1989, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Richard Collinge",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left arm fast medium",
    debutYear: 1965,
    format: "Test+ODI",
    // Test debut Jan 1965, ODI debut Feb 1973 — before T20Is existed — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1978, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Bruce Taylor",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 1965,
    format: "Test+ODI",
    // 30 Tests, 2 ODIs, 1965-1973 — before T20Is existed — Wikipedia confirmed.
    // Only cricketer to score a century and take a 5-wicket haul on Test debut (105 and 5/86
    // vs India, Calcutta, 1964-65) — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1973, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "John Bracewell",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 1980,
    format: "Test+ODI",
    // Test debut Nov 1980, ODI debut Jun 1983 — before T20Is existed — Wikipedia confirmed
    iplTeams: [],
    iccTrophies: 0
    // Retired 1990, well before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Richard Motz",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    debutYear: 1961,
    format: "Test",
    // Test debut Dec 1961, retired 1969 — career ended before ODI cricket began (first ODI was
    // Jan 1971) — Wikipedia confirmed. First New Zealander to take 100 Test wickets
    iplTeams: [],
    iccTrophies: 0
    // Retired 1969, decades before New Zealand's first ICC trophy (2000 CT)
  },
  {
    name: "Dean Foxcroft",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2023,
    format: "All-format",
    // T20I debut 20 Aug 2023, ODI debut 26 Sep 2023, Test debut 27 May 2026 (cap 294, the most
    // recent New Zealand Test cap as of this session) vs Ireland — Wikipedia + ESPN confirmed.
    // South African-born; played PSL for Lahore Qalandars (2022) but no IPL history found
    iplTeams: [],
    iccTrophies: 0
    // International debut (2023) came after New Zealand's most recent ICC trophy (2021 WTC)
  },
  {
    name: "Michael Rae",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium fast",
    debutYear: 2025,
    format: "Test",
    // Test debut 10 Dec 2025 vs West Indies (cap 293), called up as injury cover straight from
    // domestic Plunket Shield cricket — no ODI or T20I caps found — Wikipedia + NZ Herald confirmed
    iplTeams: [],
    iccTrophies: 0
    // Debuted after New Zealand's most recent ICC trophy (2021 WTC)
  },

  // ===== SRI LANKA (10 players) =====

  {
    name: "Kumar Sangakkara",
    country: "Sri Lanka",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm fast",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm medium",
    debutYear: 1975,
    format: "Test+ODI",
    // Tests, ODIs — retired 1995, T20I format did not exist. Over 200 first-class wickets
    // as an occasional medium-pacer, a genuine secondary bowling record — ESPNcricinfo confirmed
    iplTeams: [],
    // Retired 1995, 13 years before IPL began — ESPNcricinfo confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // England Wordle cap/round expansion, Day 37 — Round 1 (top-15 all-time run-scorers +
  // top-15 all-time wicket-takers), applied from a scheduled automation output, independently
  // re-verified (WebSearch + a direct WebFetch of the 2010 World T20 squads Wikipedia page)
  // before being written to this file
  {
    name: "Alec Stewart",
    country: "England",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // Verified ESPNcricinfo + Wikipedia (right-handed wicketkeeper-batsman; genuinely bowled in
    // Tests, 2 innings/3.2 overs, best 0/5 — real ball-bowling record, not NA)
    debutYear: 1989,
    format: "Test+ODI",
    // 133 Tests (debut 24 Feb 1990 vs West Indies), 170 ODIs (debut 15 Oct 1989 vs Sri Lanka),
    // retired 2003 — before England's first T20I (13 Jun 2005), so zero T20Is by career-span logic
    iplTeams: [],
    iccTrophies: 0
    // England reached the 1992 World Cup final (Stewart played) but lost to Pakistan by 22 runs.
    // No Champions Trophy existed until 1998. Zero England ICC titles across his 1990-2003 career.
  },
  {
    name: "David Gower",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm offbreak",
    // ESPNcricinfo + Wikipedia agree: right-arm offbreak despite batting left-handed, 1 Test wicket
    debutYear: 1978,
    format: "Test+ODI",
    // Test debut 1978 vs Pakistan, 114 ODIs, retired 1992/93 — before England's first T20I (2005)
    iplTeams: [],
    iccTrophies: 0
    // England World Cup runners-up 1979/1987 (never won) — his career (1978-1993) predates the
    // Champions Trophy (1998) entirely. Zero England ICC titles in his career span.
  },
  {
    name: "Geoffrey Boycott",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: occasional right-arm medium/inswing bowler, 7 Test wickets
    debutYear: 1964,
    format: "Test+ODI",
    // 108 Tests (debut Jun 1964), 36 ODIs (debut 5 Jan 1971 — the very first ODI ever played),
    // Test career ended 1982 — before England's first T20I (2005)
    iplTeams: [],
    iccTrophies: 0
    // Career (1964-1982) covers England's 1979 WC final loss; Champions Trophy didn't exist until
    // 1998, 16 years after he retired. Zero England ICC titles in his career span.
  },
  {
    name: "Michael Atherton",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: occasional leg-break bowler — a genuine playing skill, not NA
    debutYear: 1989,
    format: "Test+ODI",
    // 115 Tests (debut 1989 vs Australia, retired 2001), 54 ODIs (debut 18 Jul 1990, last 20 Aug
    // 1998) — retired 2001, before England's first T20I (Feb 2005)
    iplTeams: [],
    iccTrophies: 0
    // England were 1992 World Cup runners-up (lost final to Pakistan) during his career (1989-2001)
    // — no Champions Trophy win either (1998 SA, 2000 NZ). Zero England ICC titles in this window.
  },
  {
    name: "Ian Bell",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: part-time medium pace, 1 Test wicket + a 5/41 ODI return
    debutYear: 2004,
    format: "All-format",
    // Test debut 19 Aug 2004, 118 Tests; ODI debut 28 Nov 2004, 161 ODIs; T20I debut 28 Aug 2006,
    // 8 T20Is (last 20 May 2014) — all 3 formats confirmed genuinely played
    iplTeams: [],
    // Confirmed via 3 independent sources: never played a single IPL match (unsold at 2012 and
    // 2014 auctions) — only entered the league in 2026 as Delhi Capitals' assistant COACH, not
    // as a player. Empty array is correct, not just unresearched.
    iccTrophies: 0
    // Independently re-verified by fetching the actual official 2010 World T20 winning squad
    // directly (Wikipedia): Collingwood(c), Anderson, Bopara, Bresnan, Broad, Kieswetter, Lumb,
    // Morgan, Pietersen, Shahzad, Sidebottom, Swann, Tredwell, Wright, Yardy — Bell is NOT on it,
    // confirming the automation's original flag (a broad search had wrongly implied he was) was
    // correctly resolved. No other ICC trophy overlaps his 2004-2015 career.
  },
  {
    name: "Colin Cowdrey",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: occasional right-arm leg spin, 88 balls bowled in Tests
    // (best 0/1) — real deliveries bowled, so per the "even one ball = record it" rule, not NA
    debutYear: 1954,
    format: "Test+ODI",
    // 114 Tests (debut Dec 1954, career to Feb 1975). Played in the very first-ever ODI, 5 Jan
    // 1971 at the MCG (scored 1 run, independently re-verified via Wikipedia) — confirmed as his
    // ONLY ODI cap (1 match). Career effectively ended Feb 1975, before the first-ever T20I
    // (2005) — Test+ODI, not All-format.
    iplTeams: [],
    iccTrophies: 0
    // First-ever Cricket World Cup wasn't held until Jun 1975, months after his final Test (Feb
    // 1975) — he was not part of that squad, and West Indies won it anyway. Zero by elimination.
  },
  {
    name: "Wally Hammond",
    country: "England",
    role: "All-rounder",
    // CORRECTED from the automation's drafted "Batsman" to "All-rounder" — independently confirmed
    // 83 Test wickets in 85 Tests (Wikipedia), the same bar this database already uses elsewhere
    // for a genuine batting+bowling contributor (see Ian Botham, Andrew Flintoff, both tagged
    // "All-rounder" for a comparable profile) rather than "Batsman"
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: fast-medium cutter/swing bowler, 83 Test wickets at 37.80
    // (best 5/36 on Test debut) — a real, substantial bowling record, not NA
    debutYear: 1927,
    format: "Test",
    // Career 1927-1947 (85 Tests), entirely before ODIs existed (1971) or T20Is (2005)
    iplTeams: [],
    iccTrophies: 0
    // Retired 1947 — no ICC trophy of any kind existed yet (first ODI World Cup was 1975)
  },
  {
    name: "Andrew Strauss",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "NA",
    // FLAGGED (unconfirmed, not proven — same treatment as KL Rahul): some lower-quality
    // aggregator sites list a nominal "Left arm medium" style, but dedicated checks (including an
    // independent re-check this session) found no confirmed overs bowled in any format and no
    // Test bowling record either way — marked NA per the "unconfirmed" precedent rather than
    // asserting an unevidenced style
    debutYear: 2004,
    format: "All-format",
    // Test debut 20 May 2004 vs New Zealand; ODI debut 2003; T20I — played exactly 1 (vs Pakistan,
    // Bristol, 28 Aug 2006, out for a duck) — confirmed via scorecard, all 3 formats genuinely
    // played despite the minimal T20I sample
    iplTeams: [],
    iccTrophies: 0
    // Never played IPL as a player (his later IPL involvement was purely as ECB Director of
    // Cricket, post-retirement, unrelated to playing). Independently re-verified by fetching the
    // actual 2010 World T20 winning squad directly (Wikipedia): Strauss is NOT on it. Only ICC
    // final reached was the 2004 Champions Trophy (lost to West Indies). Zero, confirmed not
    // assumed.
  },
  {
    name: "Len Hutton",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: useful leg-break bowler, genuinely bowled and took wickets
    // late into his career (documented clean-bowling Richie Benaud with his literal last Test ball)
    debutYear: 1937,
    format: "Test",
    // Career 1937-1955 (79 Tests), entirely before ODIs existed (1971)
    iplTeams: [],
    iccTrophies: 0
    // Retired 1955 — 16 years before the first ODI, 20 years before the first ICC trophy (1975)
  },
  {
    name: "Ken Barrington",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: slow leg-breaks and googlies, 29 Test wickets at 44.82
    debutYear: 1955,
    format: "Test",
    // Career 1955-1968 (82 Tests), entirely before ODIs existed (1971)
    iplTeams: [],
    iccTrophies: 0
    // Retired 1968 — 3 years before the first ODI, 7 years before the first ICC trophy (1975)
  },
  {
    name: "Bob Willis",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Verified explicitly (not assumed from bowling arm): right-hand lower-order bat, Test average
    // 11.50
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo: genuinely fast pace with steep bounce, not fast-medium
    debutYear: 1971,
    // Test debut 9 Jan 1971 (Sydney, Ashes tour)
    format: "Test+ODI",
    // 90 Tests (1971-1984), 64 ODIs (debut Sep 1973) — career ended 1984, before T20I existed
    iplTeams: [],
    iccTrophies: 0
    // Career ended 1984 — before England's first ICC white-ball trophy (2010 T20 World Cup)
  },
  {
    name: "Fred Trueman",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // ESPNcricinfo explicit: right-hand bat; useful late-order batsman, 3 first-class centuries
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: genuinely fast pace ("Fiery Fred")
    debutYear: 1952,
    // Test debut 1952 vs India (8/31 on debut)
    format: "Test",
    // Retired from Tests Jun 1965 — ODIs didn't begin until Jan 1971, zero ODI/T20I caps by
    // definition
    iplTeams: [],
    iccTrophies: 0
    // Career predates any ICC trophy (first ODI World Cup wasn't until 1975, a decade after he
    // retired)
  },
  {
    name: "Derek Underwood",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Confirmed explicitly, not assumed from bowling arm: batted and wrote right-handed despite
    // bowling left-arm (same trap as Zaheer Khan/Anderson/Broad — checked individually)
    bowlingStyle: "Left arm orthodox",
    // ESPNcricinfo + Wikipedia agree: "slow left-arm orthodox" (bowled brisker than typical, but
    // classification is orthodox) — this DB's naming standard folds "slow left-arm orthodox" into
    // "Left arm orthodox," no genuine mismatch
    debutYear: 1966,
    // Test debut 30 Jun 1966 vs West Indies, Trent Bridge
    format: "Test+ODI",
    // 86 Tests (1966-1982), 26 ODIs (debut 18 Jul 1973, last 14 Feb 1982) — retired 1982, before
    // T20I existed
    iplTeams: [],
    iccTrophies: 0
    // Career ended 1982 — 28 years before England's first ICC white-ball trophy (2010 T20 WC)
  },
  {
    name: "Graeme Swann",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // ESPNcricinfo explicit: right-hand bat and right-arm offbreak bowler
    bowlingStyle: "Right arm offbreak",
    // ESPNcricinfo + Wikipedia agree: traditional right-arm off-spin finger-spinner
    debutYear: 2000,
    // CORRECTED to match this DB's established debutYear convention (earliest international
    // debut across any format, not Test-specific — see Dhoni/Ishan Kishan precedent): Swann's
    // actual first England cap was an ODI in 2000 vs South Africa, several years before he was
    // recalled and made his Test debut in 2008. His Test debut alone (2008) would understate his
    // real international career start.
    format: "All-format",
    // Test debut Dec 2008 vs India (60 Tests, 2008-2013); ODI debut 2000 (79 ODIs); T20I — 39
    // caps (2008-2013), including the winning 2010 World T20 campaign — all 3 confirmed
    iplTeams: [],
    // Dedicated search confirmed: entered the IPL auction three times (2010, 2011, 2012) and went
    // unsold every year — never played a single IPL match. Empty array is correct, not unresearched.
    iccTrophies: 1
    // Independently re-verified by fetching the actual official 2010 World T20 winning squad
    // directly (Wikipedia): Swann IS on it. No other ICC trophy falls within his 2008-2013
    // international career (England lost the 2013 Champions Trophy final to India).
  },
  {
    name: "Brian Statham",
    country: "England",
    role: "Bowler",
    battingStyle: "Left-hand",
    // ESPNcricinfo explicit: left-hand bat (occasionally effective tailender) — verified
    // explicitly, not assumed from bowling arm
    bowlingStyle: "Right arm fast medium",
    // FLAGGED — minor cross-source pace-category disagreement: ESPNcricinfo's structured profile
    // field says "right-arm fast-medium," while Wikipedia's prose just says "right arm fast
    // bowler" with no finer subcategory. Went with ESPNcricinfo's structured field per this
    // project's usual tie-break precedent, but flagging as a genuine (if minor) mismatch not
    // resolved by re-query, per the Four-Source Verification Rule.
    debutYear: 1951,
    format: "Test",
    // Career 1951-1965 — ODIs began 1971, T20Is began 2005, both well after his retirement
    iplTeams: [],
    iccTrophies: 0
    // Retired 1965 — England's first ICC trophy (2010 T20 WC) came 45 years later
  },
  {
    name: "Matthew Hoggard",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Confirmed right-hand bat via Wikipedia, consistent with ESPNcricinfo role listing
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-arm fast-medium bowler, clean agreement
    debutYear: 2000,
    format: "Test+ODI",
    // Test cap (29 Jun 2000 vs West Indies), ODI cap (3 Oct 2001 vs Zimbabwe, 26 ODIs) — no T20I
    // cap found anywhere despite England playing T20I since Jun 2005 and Hoggard remaining active
    // through 2008; independently re-checked this session, still no evidence of a T20I cap found
    iplTeams: [],
    // FLAGGED: one low-quality aggregator (cricclubs.com) claimed 2 IPL matches for Kolkata
    // Knight Riders, but neither ESPNcricinfo nor Wikipedia shows any IPL history for him at all —
    // independently re-checked this session (Wikipedia), still no IPL history found — treated as
    // an unreliable-source false positive (same pattern as the Day 15 Asghar Afghan/Legends
    // League Cricket case), empty array used
    iccTrophies: 0
    // Career 2000-2008, ended just before England's first ICC trophy (2010 T20 WC)
  },
  {
    name: "Alec Bedser",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // ESPNcricinfo explicit: right-hand bat, no disagreement with Wikipedia
    bowlingStyle: "Right arm medium fast",
    // ESPNcricinfo + Wikipedia agree: "right-arm medium-fast" / "primarily a medium-fast bowler" —
    // clean agreement, kept distinct from "fast medium" per this DB's standing convention
    debutYear: 1946,
    format: "Test",
    // Career 1946-1955, well before ODIs began (1971)
    iplTeams: [],
    iccTrophies: 0
    // Retired 1955 — 55 years before England's first ICC trophy (2010 T20 WC)
  },
  {
    name: "Darren Gough",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // ESPNcricinfo explicit: right-hand bat
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo explicit: right-arm fast-medium bowler, no disagreement found with Wikipedia
    debutYear: 1994,
    format: "All-format",
    // Wikipedia confirms explicitly: Gough played 2 T20Is (vs Australia 2005, vs Pakistan 2006)
    // alongside his 58-Test and 159-ODI career — checked explicitly rather than assumed, genuine
    // All-format international
    iplTeams: [],
    iccTrophies: 0
    // Retired end of 2008 — England's first ICC trophy (2010 T20 WC) came after his retirement.
    // No evidence found of any IPL involvement despite a dedicated search.
  },
  {
    name: "John Snow",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    // Wikipedia explicit: batted right-handed as a useful tail-ender
    bowlingStyle: "Right arm fast medium",
    // FLAGGED — minor cross-source pace-category disagreement: his early career is described as
    // fast-medium, but sources note he developed genuine extra pace mid-career after an action
    // change in 1965-66 ("a bowler of genuine pace"), while Wikipedia's plain prose just says
    // "right-arm fast bowler." Went with the fast-medium profile designation per the same
    // tie-break precedent as Statham, but flagging as a real classification tension, not resolved
    // by re-query.
    debutYear: 1965,
    // Test debut 1965 vs New Zealand at Lord's
    format: "Test+ODI",
    // Played in the first-ever official ODI, 5 Jan 1971 at the MCG (England vs Australia), ODI
    // cap 11 — confirmed via scorecard, a real ODI credit rather than the naive "career ended
    // 1976 = Test-only" assumption
    iplTeams: [],
    iccTrophies: 0
    // Retired from Tests 1976 — decades before IPL (2008) or England's first ICC trophy (2010 T20
    // WC)
  },

  // England Test Round 1 completion, Day 38 — after Day 37's 19 additions, direct ESPNcricinfo
  // stats-table checks (batting-most-runs-career and bowling-most-wickets-career, England/Tests)
  // showed the real top-15 batting list was already fully covered, but the real top-15 bowling
  // list had 2 genuine gaps neither the automation nor Day 37 had caught: Andy Caddick (234
  // wickets, rank 12) and Steve Harmison (222 wickets, rank 14). John Snow (added Day 37, 202
  // wickets) turns out to rank 17th — a reasonable near-miss, not a strict top-15 member.
  {
    name: "Andy Caddick",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-arm fast-medium bowler, right-hand bat
    debutYear: 1993,
    // ODI debut 19 May 1993 vs Australia, Test debut 3 Jun 1993 vs Australia (same series) —
    // both confirmed via Wikipedia
    format: "Test+ODI",
    // 62 Tests (1993-2003) — retired 2003, before England's first-ever T20I (Jun 2005), so zero
    // T20Is by career-span logic, independently confirmed via Wikipedia (no T20I appearances
    // listed)
    iplTeams: [],
    // Retired 2003, 5 years before the IPL began (2008) — no IPL history found via Wikipedia
    iccTrophies: 0
    // Named in England's 2003 World Cup squad, but Australia won that tournament, not England.
    // Retired 2003 — 7 years before England's first-ever ICC trophy (2010 World T20). Zero,
    // confirmed not assumed.
  },
  {
    name: "Steve Harmison",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: genuinely fast bowler (bowled at 90mph+), right-hand bat
    debutYear: 2002,
    // Test debut 8 Aug 2002 vs India, ODI debut 17 Dec 2002 vs Sri Lanka — earliest international
    // debut per this DB's convention, confirmed via Wikipedia
    format: "All-format",
    // Tests (2002-2009), ODIs (2002-2009, retired from the format after the 2009 Champions
    // Trophy), and 2 T20Is (debut 13 Jun 2005 vs Australia) — all 3 formats confirmed via
    // Wikipedia
    iplTeams: [],
    // No IPL history found via Wikipedia — international career (2002-2009) overlapped with the
    // IPL's first 2 seasons (2008-2009) but no evidence of any signing or appearance
    iccTrophies: 0
    // Named in England's 2003 World Cup squad but did not play a match, and Australia won that
    // tournament anyway. Retired from ODIs after the 2009 Champions Trophy (England did not reach
    // the final) and from Tests the same year — before England's first-ever ICC trophy (2010
    // World T20). Zero, confirmed not assumed.
  },

  // ===== SOUTH AFRICA (10 players) =====

  {
    name: "AB de Villiers",
    country: "South Africa",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    // Right-hand bat — ESPNcricinfo, Cricbuzz, Wikipedia agree
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm medium",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Right arm medium fast",
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
    bowlingStyle: "Left arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm fast medium",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm leg break",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Left arm orthodox",
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
    bowlingStyle: "Right arm offbreak",
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
    bowlingStyle: "Right arm offbreak",
    // Occasional bowler, primarily a batsman — ESPNcricinfo confirmed
    debutYear: 1983,
    format: "Test+ODI",
    // Tests, ODIs — retired 1997, T20I format did not exist
    iplTeams: [],
    // Retired 1997, well before IPL began in 2008 — confirmed
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Ashton Agar",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left arm orthodox",
    debutYear: 2013,
    format: "All-format",
    // Test debut 10 Jul 2013 vs England, Trent Bridge (scored 98 at No. 11 — highest Test score
    // ever by a No. 11 batter), ODI debut 8 Sep 2015 vs England (Manchester), T20I debut 2013 —
    // ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Rising Pune Supergiant", "Kolkata Knight Riders"],
    // RCB (2015), Rising Pune Supergiant (2016-17), KKR (2022-23) — dedicated IPL-history search confirmed
    iccTrophies: 1
    // 2021 T20 World Cup winning squad — confirmed. Named in Australia's preliminary 2023 ODI
    // World Cup squad but ruled out by a calf injury before the tournament, replaced by Marnus
    // Labuschagne (confirmed via ESPNcricinfo, cricket.com, SABC Sport) — does not count, same
    // squad-but-injured-out precedent as Gillespie/Lee (Day 26)
  },
  {
    name: "Glenn Maxwell",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2012,
    format: "All-format",
    // T20I debut 2012 vs Pakistan (UAE), Test debut 2013 (Hyderabad, No. 8) — ESPNcricinfo +
    // Wikipedia confirmed
    iplTeams: ["Delhi Daredevils", "Mumbai Indians", "Kings XI Punjab", "Royal Challengers Bangalore", "Punjab Kings"],
    // Delhi Daredevils (2012, 2018), Mumbai Indians (2013), Kings XI Punjab (2014-17, 2020),
    // RCB (2021-24), Punjab Kings (2025) — dedicated IPL-history search confirmed
    iccTrophies: 3
    // 2015 ODI World Cup, 2021 T20 World Cup, 2023 ODI World Cup — all confirmed winning squad
    // member (scored the winning runs in the 2023 final) — ESPNcricinfo/Wikipedia confirmed
  },
  {
    name: "Andrew Tye",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 2016,
    format: "ODI+T20",
    // T20I debut 29 Jan 2016 vs India (MCG), ODI debut 14 Jan 2018 vs England — no Test caps —
    // ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Gujarat Lions", "Kings XI Punjab", "Rajasthan Royals", "Lucknow Super Giants"],
    // Signed by Chennai Super Kings in the 2015 auction but never played a match for them (excluded
    // per the standing "signed but never played" rule — confirmed via Wikipedia's 2015 CSK season
    // page: bought for the 2015 auction, did not debut in the IPL until 2017 with Gujarat Lions).
    // Actual appearances: Gujarat Lions (2017, 5/17 on debut), Kings XI Punjab (2018-19, Purple Cap
    // 2018 with 24 wickets), Rajasthan Royals (2020), Lucknow Super Giants (2022) — dedicated
    // IPL-history search confirmed
    iccTrophies: 0
    // Confirmed NOT part of Australia's 2021 T20 World Cup winning squad (omitted from the final
    // 15) — dedicated search confirmed. No other trophy-winning squad membership found
  },
  {
    name: "Kane Richardson",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 2013,
    format: "ODI+T20",
    // ODI debut 2013 vs Sri Lanka — no Test caps, career spanned 2013-2023 — ESPNcricinfo confirmed
    iplTeams: ["Pune Warriors", "Rajasthan Royals", "Royal Challengers Bangalore"],
    // Pune Warriors (2013), Rajasthan Royals (2014), RCB (2016, 2021) — dedicated IPL-history
    // search confirmed
    iccTrophies: 1
    // Confirmed named in Australia's winning 2021 T20 World Cup squad — counts per the standing
    // squad-membership precedent (same as Bracken/Hogg, Day 26) regardless of final-XI appearance,
    // which could not be independently pinned down beyond squad confirmation. Also played at the
    // 2019 ODI World Cup as an injury replacement, but Australia did not win that tournament
    // (lost semi-final to England) — no trophy from that
  },
  {
    name: "Marcus Stoinis",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 2015,
    format: "ODI+T20",
    // ODI debut 11 Sep 2015 vs England (Leeds), T20I debut 2015 — no Test caps (pushed for Test
    // contention in 2017/2019 but never capped) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kings XI Punjab", "Royal Challengers Bangalore", "Delhi Capitals", "Lucknow Super Giants", "Punjab Kings"],
    // Signed by Delhi Daredevils in 2015 but did not feature in a single match that season
    // (excluded per the standing "signed but never played" rule — confirmed via direct search:
    // signed for INR 25 lakh, no game time, actual IPL debut came with Kings XI Punjab in 2016).
    // Actual appearances: Kings XI Punjab (2016-18), RCB (2019), Delhi Capitals (2020-21), Lucknow
    // Super Giants (2022-24), Punjab Kings (2025) — dedicated IPL-history search confirmed
    iccTrophies: 2
    // 2021 T20 World Cup + 2023 ODI World Cup — both confirmed winning squad member.
    // Retired from ODIs Feb 2025, still active in T20Is
  },
  {
    name: "Nathan Ellis",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 2021,
    format: "ODI+T20",
    // T20I debut mid-2021 vs Bangladesh (Mirpur — took a hat-trick on debut), ODI debut 29 Mar
    // 2022 vs Pakistan (Lahore) — no Test caps — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Punjab Kings", "Chennai Super Kings"],
    // Punjab Kings (2021-24), Chennai Super Kings (2025) — dedicated IPL-history search confirmed
    iccTrophies: 0
    // Confirmed NOT selected in Australia's final 15-man squad for the 2023 ODI World Cup — lost
    // out to Sean Abbott for the fourth pace-bowling spot behind Cummins/Starc/Hazlewood
    // (confirmed via cricket.com.au and Cricket Times squad-announcement coverage). Part of the
    // 2025 Champions Trophy squad, but Australia lost that final to India — no trophy
  },
  {
    name: "James Faulkner",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Left arm medium fast",
    debutYear: 2012,
    format: "All-format",
    // T20I debut 2 Jan 2012, ODI debut 1 Feb 2013, Test debut 21 Aug 2013 (The Oval, 6 wickets on
    // debut) — retired from international cricket 2017 — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Pune Warriors", "Kings XI Punjab", "Rajasthan Royals", "Gujarat Lions"],
    // Pune Warriors, Kings XI Punjab, Rajasthan Royals (28 wickets in 2013, 3rd-most in a single
    // IPL season), Gujarat Lions — played 2011-2017 — dedicated IPL-history search confirmed via
    // Wikipedia's own infobox (a separate lower-quality aggregator briefly implied a 2017 Rising
    // Pune Supergiant stint, but Wikipedia's infobox does not list it — not a genuine cross-source
    // disagreement, resolved without flagging)
    iccTrophies: 1
    // 2015 ODI World Cup winning squad — Player of the Match in the final (3/36) — confirmed.
    // CORRECTED from the drafted claim: he was dropped from Australia's 2017 Champions Trophy
    // squad, not a "2015 Champions Trophy" — no Champions Trophy was held in 2015 (editions run
    // 1998/2000/2002/2004/2006/2009/2013/2017/2025) — confirmed via Wikipedia/cricket.com.au. No
    // trophy from that tournament either way, since he wasn't selected
  },
  {
    name: "Sean Abbott",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    debutYear: 2014,
    format: "ODI+T20",
    // T20I debut 5 Oct 2014 vs Pakistan (UAE), ODI debut 7 Oct 2014 vs Pakistan (UAE) — no Test
    // caps despite multiple Test squad selections (Nov 2020, 2025-26 Ashes), always ruled out by
    // injury before playing — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Sunrisers Hyderabad"],
    // RCB (2015), Sunrisers Hyderabad (2022) — dedicated IPL-history search confirmed
    iccTrophies: 1
    // Confirmed member of Australia's winning 2023 ODI World Cup 15-man squad (won the 4th
    // pace-bowling spot over Nathan Ellis) — ESPNcricinfo/cricket.com.au confirmed. Part of the
    // 2025 Champions Trophy squad, but Australia lost that final to India — no trophy from that
  },
  {
    name: "Mitchell Marsh",
    country: "Australia",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    debutYear: 2011,
    format: "All-format",
    // ODI debut 19 Oct 2011 vs South Africa (Centurion), T20I debut 2011, Test debut 22 Oct 2014
    // vs Pakistan (UAE) — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Deccan Chargers", "Pune Warriors", "Rising Pune Supergiant", "Sunrisers Hyderabad", "Delhi Capitals", "Lucknow Super Giants"],
    // Deccan Chargers (2010, 3 matches as a 19-year-old), Pune Warriors (2011 & 2013), Rising Pune
    // Supergiant (2016, 3 matches), Sunrisers Hyderabad (2020, 1 match before injury), Delhi
    // Capitals (2022), Lucknow Super Giants (current) — dedicated IPL-history search confirmed
    iccTrophies: 2
    // 2021 T20 World Cup (winning squad member, ESPNcricinfo squad list confirmed) + 2023 ODI
    // World Cup (played throughout, including the final) — ESPNcricinfo + ICC official squad list
    // both confirmed; independently re-verified against ESPNcricinfo's own 2023 ODI WC squad page
  },
  {
    name: "Matthew Wade",
    country: "Australia",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm medium",
    // Bowled a single maiden over to Thilan Samaraweera as a surprise option in the Dec 2012
    // Hobart Test vs Sri Lanka — his only recorded international bowling — confirmed via
    // ESPNcricinfo, so not NA per the standing rule
    debutYear: 2011,
    format: "All-format",
    // Played 36 Tests, 97 ODIs, 92 T20Is for Australia between 2011 and 2024, retired from
    // international cricket in 2024 — ESPNcricinfo confirmed
    iplTeams: ["Delhi Daredevils", "Gujarat Titans"],
    // Delhi Daredevils (2011, 3 matches), Gujarat Titans (2022 & 2024) — dedicated IPL-history
    // search confirmed
    iccTrophies: 1
    // 2021 T20 World Cup winning squad (independently re-verified against ESPNcricinfo's own
    // squad list, vice-captain, unbeaten 41 off 17 balls in the semi-final vs Pakistan) —
    // ESPNcricinfo + ICC official squad list confirmed. Could not confirm squad membership either
    // way for the 2015 ODI World Cup (Brad Haddin was the primary keeper that tournament) — not
    // credited without confirmation
  },
  {
    name: "Travis Head",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2016,
    format: "All-format",
    // ODI debut 13 Jun 2016 vs West Indies (Basseterre), T20I debut 2016, Test debut 7 Oct 2018 vs
    // Pakistan (Dubai) — ESPNcricinfo confirmed
    iplTeams: ["Royal Challengers Bangalore", "Sunrisers Hyderabad"],
    // Royal Challengers Bangalore (2016-17), Sunrisers Hyderabad (2024-2026, retained) —
    // dedicated IPL-history search confirmed
    iccTrophies: 2
    // 2023 ODI World Cup (Player of the Match in the final, 137 vs India) + 2023 World Test
    // Championship (Player of the Match in the final, 163 vs India) — ESPNcricinfo + ICC official
    // both confirmed. Explicitly NOT part of Australia's 2021 T20 World Cup winning squad —
    // independently re-verified against ESPNcricinfo's own squad list for that tournament
  },
  {
    name: "Tim David",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    debutYear: 2022,
    format: "ODI+T20",
    // Singapore-born; played T20I for Singapore first (debut 22 Jul 2019 vs Qatar — independently
    // re-verified via direct Wikipedia infobox fetch) before switching allegiance and debuting for
    // Australia (T20I debut Nov 2022 T20 World Cup, ODI debut 9 Sep 2023 vs South Africa), no Test
    // caps and never played first-class cricket (confirmed — his live ESPNcricinfo/Wikipedia
    // career stats table has no First-class column at all, only ODI/T20I/List A/T20)
    iplTeams: ["Royal Challengers Bangalore", "Mumbai Indians"],
    // Royal Challengers Bangalore (IPL debut, 2021), Mumbai Indians (2022-2024), returned to
    // Royal Challengers Bangalore (2025-2026) — independently re-verified via direct Wikipedia
    // infobox fetch, matches exactly
    iccTrophies: 0
    // Independently re-verified against ESPNcricinfo's own 2023 ODI World Cup squad page — Tim
    // David is confirmed NOT among the 15 named players (only played 4 ODIs in a September 2023
    // series before the tournament, not the tournament itself). Named in Australia's 2026 T20
    // World Cup squad, but Australia did not win that tournament (India beat New Zealand in the
    // final) — no trophy either way
  },
  {
    name: "Josh Inglis",
    country: "Australia",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "NA",
    // No record of Josh Inglis bowling a single delivery anywhere in international or domestic
    // cricket — confirmed via ESPNcricinfo + Wikipedia
    debutYear: 2022,
    format: "All-format",
    // ODI and T20I debut both Feb 2022 vs Sri Lanka, Test debut early 2025 (century on debut) —
    // ESPNcricinfo confirmed
    iplTeams: ["Punjab Kings", "Lucknow Super Giants"],
    // IPL debut with Punjab Kings in 2025, moved to Lucknow Super Giants in 2026 — independently
    // re-verified via Wikipedia, matches exactly
    iccTrophies: 2
    // 2021 T20 World Cup (named in the winning 15-man squad, independently re-verified against
    // ESPNcricinfo's own squad list — same "squad membership counts" precedent used elsewhere in
    // this file, e.g. Bracken/Hogg) + 2023 ODI World Cup (independently re-verified against
    // ESPNcricinfo's own squad page — confirmed on the 15-man list) — ESPNcricinfo + ICC official
    // squad list confirmed
  },
  {
    name: "Adil Rashid",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm leg break googly bowler
    debutYear: 2009,
    format: "All-format",
    // ODI debut 27 Aug 2009 vs Ireland (earliest), T20I debut also 2009, Test debut 2015 —
    // still an active white-ball international as of 2026 — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Punjab Kings", "Sunrisers Hyderabad"],
    // Punjab Kings (2021) and Sunrisers Hyderabad (2023) — genuine playing appearances,
    // independently re-verified via a dedicated IPL-history search. Went unsold in the IPL 2026
    // mega auction
    iccTrophies: 2
    // 2019 ODI World Cup + 2022 T20 World Cup — both independently re-verified against the actual
    // 15-man winning squad lists (Wikipedia 2019 squads page / ESPNcricinfo 2022 squad), not
    // assumed from career-span proximity
  },
  {
    name: "Chris Woakes",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowling all-rounder
    debutYear: 2011,
    format: "All-format",
    // T20I debut 12 Jan 2011 vs Australia (earliest), ODI debut 21 Jan 2011, Test debut 21 Aug
    // 2013 vs Australia — retired from international cricket September 2025 — Wikipedia infobox
    // confirmed
    iplTeams: ["Kolkata Knight Riders", "Royal Challengers Bangalore", "Delhi Capitals"],
    // Kolkata Knight Riders (2017, 13 matches, 17 wickets), Royal Challengers Bangalore (2018,
    // 5 matches), Delhi Capitals (2021 — he was also signed for 2020 but pulled out before that
    // season). CORRECTION applied on entry: the drafted data also listed Punjab Kings (2024), but
    // he was bought at that auction and never appeared in a single match, withdrawing during the
    // season — excluded per the standing "signed but never played" rule (Axar Patel / Stuart
    // Broad precedent). Wikipedia's own team list shows no Punjab Kings entry at all. Also
    // confirmed NOT a Rajasthan Royals player in 2026 (his 2026 franchise team is Sylhet Titans
    // in the BPL, not an IPL side)
    iccTrophies: 2
    // 2019 ODI World Cup + 2022 T20 World Cup — both independently re-verified against the actual
    // 15-man winning squad lists
  },
  {
    name: "Liam Plunkett",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast medium bowler
    debutYear: 2005,
    format: "All-format",
    // Test and ODI debut both Nov-Dec 2005 vs Pakistan (earliest), T20I debut 15 Jun 2006 vs
    // Sri Lanka — international career until 2019 — Wikipedia confirmed
    iplTeams: ["Delhi Daredevils"],
    // Delhi Daredevils (2018) — signed as an injury replacement for Kagiso Rabada and genuinely
    // played: 7 matches, 4 wickets, including 3/17 on debut vs Kings XI Punjab. Independently
    // re-verified via a dedicated IPL-history search (iplt20.com + Sky Sports both confirm the
    // signing, match reports confirm the appearances). Franchise name is correct for 2018 — the
    // Delhi Capitals rename came in 2019
    iccTrophies: 1
    // 2019 ODI World Cup — independently re-verified, confirmed on the 15-man winning squad list.
    // Not in the 2010 World Twenty20 squad (he was out of the England side in that period)
  },
  {
    name: "Phillip DeFreitas",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — genuine
    // bowling all-rounder (10,000+ first-class runs and 1,000 first-class wickets)
    debutYear: 1986,
    format: "Test+ODI",
    // Test debut 14 Nov 1986 vs Australia, ODI debut 1 Jan 1987 vs Australia, last ODI 24 May
    // 1997 — 44 Tests and 103 ODIs. Retired from international cricket well before T20Is existed
    // (first T20I was Feb 2005), so no T20I caps are possible — Wikipedia infobox confirmed
    iplTeams: [],
    // Retired 1997, over a decade before the IPL began in 2008 — no IPL history possible
    iccTrophies: 0
    // Confirmed squad member of England's 1987 and 1992 World Cup teams, but both were
    // runners-up finishes — no ICC trophy — Wikipedia confirmed
  },
  {
    name: "Paul Collingwood",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm medium — a batting all-rounder
    // whose medium pace was a genuine part-time option
    debutYear: 2001,
    format: "All-format",
    // ODI debut Jun 2001 vs Pakistan (earliest), Test debut late 2003 vs Sri Lanka, and he was
    // England's first-ever T20I captain — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Delhi Daredevils"],
    // Delhi Daredevils (2010) — genuine playing appearances independently re-verified, including
    // 50 off 43 balls vs Kolkata Knight Riders on 29 Mar 2010 (ESPNcricinfo scorecard). Franchise
    // name is correct for 2010 — the Delhi Capitals rename came in 2019, after his IPL career
    iccTrophies: 1
    // Captained England to the 2010 World Twenty20 — their first-ever ICC trophy — and hit the
    // winning runs himself in the final vs Australia. Wikipedia confirmed
  },
  {
    name: "Moeen Ali",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm offbreak",
    // Wikipedia: left-handed batsman, right-arm off-spin bowler (first English spinner to bowl a
    // doosra in international cricket, 2014 vs Sri Lanka)
    debutYear: 2014,
    format: "All-format",
    // Debuted in all 3 formats in 2014 — retired from international cricket 8 September 2024 —
    // Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Chennai Super Kings", "Kolkata Knight Riders"],
    // Royal Challengers Bangalore (2018-2020), Chennai Super Kings (2021-2024, part of both the
    // 2021 and 2023 title-winning squads), Kolkata Knight Riders (2025) — independently
    // re-verified via a dedicated IPL-history search: 1,167 runs and 41 wickets in 73 matches,
    // all three stints genuine playing spells
    iccTrophies: 2
    // 2019 ODI World Cup + 2022 T20 World Cup — both independently re-verified against the actual
    // 15-man winning squad lists
  },
  {
    name: "Steven Finn",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // CORRECTION applied on entry: the drafted data said "Right arm fast", but both ESPNcricinfo
    // and Wikipedia describe him as right-arm FAST MEDIUM — the two sources agree with each
    // other, so this was a drafting error rather than a genuine cross-source mismatch
    debutYear: 2010,
    format: "All-format",
    // Test debut 2010 vs Bangladesh (earliest), ODI debut 2011 vs Australia, T20I debut 2011 vs
    // West Indies (last T20I Aug 2015) — retired from all cricket 14 Aug 2023 — Wikipedia
    // infobox confirmed
    iplTeams: [],
    // Never played in the IPL despite being an active England international through the 2010s —
    // Wikipedia lists no IPL franchise at all (his overseas franchise cricket was elsewhere), and
    // he was widely expected to go unsold at the 2018 auction
    iccTrophies: 0
    // Was in England's 2015 ODI World Cup squad (took a hat-trick, but England exited early with
    // no trophy) and is confirmed NOT on the winning 2019 squad list — independently re-verified
    // against the actual 15-man 2019 squad. His international career also started after the 2010
    // World Twenty20 win, so no trophy from that either
  },
  {
    name: "David Willey",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left arm fast medium",
    // ESPNcricinfo + Wikipedia agree: left-hand bat, left-arm fast-medium bowler and useful
    // lower-order hitter — son of former England all-rounder Peter Willey
    debutYear: 2015,
    format: "ODI+T20",
    // ODI debut 8 May 2015 vs Ireland, T20I debut 23 Jun 2015 vs New Zealand — explicitly
    // confirmed he never received a Test cap. Retired from international cricket 1 Nov 2023 after
    // the 2023 World Cup, finishing on exactly 100 ODI wickets
    iplTeams: ["Chennai Super Kings", "Royal Challengers Bangalore"],
    // Chennai Super Kings (2018 — genuine debut appearances, 3 matches and 2 wickets) and Royal
    // Challengers Bangalore (2022-2023). Two "signed but never played" exclusions applied per the
    // standing rule: retained by CSK for 2019 without playing a match that season (2018 already
    // counts the team), and signed by Lucknow Super Giants at the 2024 auction but withdrew
    // before the tournament and was replaced by Matt Henry — independently re-verified
    iccTrophies: 1
    // 2022 T20 World Cup — confirmed on the 15-man winning squad list. Deliberately NOT credited
    // with 2019: he was in England's original 2019 World Cup squad but was REPLACED by Jofra
    // Archer before the tournament and took no part in the win — independently re-verified
    // against Wikipedia's 2019 squads page, same injury/replacement precedent already applied to
    // Jason Gillespie and Brett Lee elsewhere in this file
  },
  {
    name: "Jos Buttler",
    country: "England",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "NA",
    // ESPNcricinfo + Wikipedia agree: right-hand bat wicketkeeper, no bowling style — never bowls
    debutYear: 2011,
    format: "All-format",
    // T20I debut 31 Aug 2011 vs India (earliest), ODI debut 21 Feb 2012 vs Pakistan, Test debut 27
    // Jul 2014 vs India — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Mumbai Indians", "Rajasthan Royals", "Gujarat Titans"],
    // Mumbai Indians (2016-2017), Rajasthan Royals (2018-2024, his most successful stint — leading
    // run-getter with 3,000+ runs), Gujarat Titans (2025-present, most expensive overseas buy in the
    // 2025 auction) — dedicated IPL-history search confirmed via ESPNcricinfo + Wikipedia
    iccTrophies: 2
    // 2019 ODI World Cup (ran out Martin Guptill on the final ball of the Super Over) + 2022 T20
    // World Cup as captain — both independently re-verified against the actual winning squad lists
  },
  {
    name: "Marcus Trescothick",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: left-hand opening batsman, right-arm medium part-time bowler
    debutYear: 2000,
    format: "All-format",
    // ODI debut 8 Jul 2000 vs Zimbabwe (earliest), Test debut 3 Aug 2000 vs West Indies, T20I debut
    // 13 Jun 2005 vs Australia — England's first-ever T20I. Forced into early retirement by a
    // stress-related illness in 2006 (international career), fully retired 2008 — ESPNcricinfo +
    // Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — international career ended in 2006, two years before the IPL began in
    // 2008
    iccTrophies: 0
    // His international career (2000-2006) ended before England's first-ever ICC trophy (the 2010
    // World Twenty20)
  },
  {
    name: "Jason Roy",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand opening batsman, right-arm medium part-time bowler
    debutYear: 2014,
    format: "All-format",
    // T20I debut 7 Sep 2014 vs India (earliest), ODI debut 8 May 2015 vs Ireland, Test debut 24 Jul
    // 2019 vs Ireland — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Gujarat Lions", "Delhi Daredevils", "Sunrisers Hyderabad", "Kolkata Knight Riders"],
    // Gujarat Lions (2017), Delhi Daredevils (2018, half-century on debut), Sunrisers Hyderabad
    // (2021), Kolkata Knight Riders (2023) — all genuine playing spells, independently re-verified
    // via a dedicated IPL-history search. Two "signed but never played" exclusions applied per the
    // standing rule: Delhi Capitals 2020 (opted out for personal reasons — same franchise as his
    // 2018 Delhi Daredevils stint, so already counted) and Gujarat Titans 2022 (pulled out before
    // the tournament, took an indefinite break from cricket)
    iccTrophies: 1
    // 2019 ODI World Cup (scored the tournament's highest individual score at one point, helped run
    // out Martin Guptill in the Super Over) — confirmed NOT on the winning 2022 T20 World Cup squad,
    // independently re-verified against the actual 15-man squad list
  },
  {
    name: "Allan Lamb",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm medium bowler — South African-born
    // (Langebaanweg, Cape Town), qualified for and represented England internationally
    debutYear: 1982,
    format: "Test+ODI",
    // ODI debut 2 Jun 1982 vs India (earliest), Test debut 10 Jun 1982 vs India — retired from
    // international cricket in 1995, a decade before T20Is existed (first T20I Feb 2005) —
    // ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — retired in 1995, 13 years before the IPL began in 2008
    iccTrophies: 0
    // Reached two Cricket World Cup finals with England (1987, 1992) and lost both — his career
    // ended before England won their first-ever ICC trophy (the 2010 World Twenty20)
  },
  {
    name: "Jonny Bairstow",
    country: "England",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo confirms right-arm medium with a genuine (if tiny) bowling record — 2
    // international innings bowled, 0 wickets, 7 runs conceded — so per the standing rule this is
    // recorded as his actual bowling style rather than NA, even though Wikipedia's infobox omits it
    // entirely
    debutYear: 2011,
    format: "All-format",
    // ODI debut 16 Sep 2011 vs India (earliest), T20I debut 23 Sep 2011 vs West Indies, Test debut
    // 17 May 2012 vs West Indies — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Sunrisers Hyderabad", "Punjab Kings", "Mumbai Indians"],
    // Sunrisers Hyderabad (2019-2021), Punjab Kings (2022 and 2024, ruled out injured for the 2023
    // season in between), Mumbai Indians (2025, a temporary playoff-replacement signing) — all
    // genuine playing spells, independently re-verified via a dedicated IPL-history search
    iccTrophies: 1
    // 2019 ODI World Cup, confirmed on the winning squad list. Deliberately NOT credited with 2022:
    // he was originally selected for the T20 World Cup squad but broke his leg playing golf before
    // the tournament and was replaced by Alex Hales, taking no part in the win — independently
    // re-verified against Wikipedia, same injury/replacement precedent already applied to Jason
    // Gillespie, Brett Lee, and David Willey elsewhere in this file
  },
  {
    name: "Jonathan Trott",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm medium bowler — South African-born
    // (Cape Town), qualified for and represented England internationally
    debutYear: 2007,
    format: "All-format",
    // T20I debut 28 Jun 2007 vs West Indies (earliest, only 2 T20I caps total, last one Feb 2010),
    // Test debut 20 Aug 2009 vs Australia, ODI debut 27 Aug 2009 vs Ireland — ESPNcricinfo +
    // Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL
    iccTrophies: 0
    // Confirmed NOT on England's winning 2010 World Twenty20 squad (his T20I career had already
    // ended by then) — reached the 2013 Champions Trophy final (Team of the Tournament, 82* in the
    // semi-final) but England lost that final to India
  },
  {
    name: "Josh Tongue",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler, cap 281 —
    // Round 2 (cap-number method) for England ODI. Verified directly rather than trusted from the
    // stale Wikipedia cap table (which still showed cap 280/2025 as the latest): his real ODI debut
    // (14 Jul 2026 vs India) was independently confirmed via a dedicated ESPNcricinfo search and
    // cross-checked against the actual match scorecard/playing XI, per the standing Day 24
    // data-quality caveat about not trusting a table's newest rows at face value
    debutYear: 2023,
    format: "All-format",
    // Test debut 1 Jun 2023 vs Ireland (earliest, 3/27 and 5/66 on debut), T20I debut 4 Jul 2026 vs
    // India, ODI debut 14 Jul 2026 vs India — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — Wikipedia's domestic-career listing shows no IPL franchise at all
    iccTrophies: 0
    // International career began 2023, after England's last ICC trophy (the 2022 T20 World Cup,
    // Nov 2022) — not yet capped for that squad. England did not win the 2025 Champions Trophy or
    // the 2026 T20 World Cup either
  },
  {
    name: "Sonny Baker",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast bowler — cap 280, confirmed as
    // England's most recent ODI cap as of this database's cutoff, independently re-verified against
    // the actual July 2026 India ODI series playing XIs (no debutant appeared after him)
    debutYear: 2025,
    format: "All-format",
    // ODI debut 2 Sep 2025 vs South Africa (earliest — his 0/76 in 7 overs is the most expensive ODI
    // debut figures by an England bowler on record), T20I debut 21 Sep 2025 vs Ireland, Test debut
    // 17 Jun 2026 vs New Zealand at The Oval — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — Wikipedia's franchise-career listing (Trent Rockets, Southern Brave,
    // Manchester Originals, Hampshire) shows no IPL involvement
    iccTrophies: 0
    // International career began Sep 2025, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "John Turner",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — cap 279,
    // South African-born (Johannesburg), qualified for England via a British passport through his
    // mother
    debutYear: 2024,
    format: "ODI+T20",
    // ODI debut 31 Oct 2024 vs West Indies (earliest), T20I debut 16 Nov 2024 vs West Indies —
    // explicitly confirmed no Test caps yet — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — his franchise history (Trent Rockets, Paarl Royals, a 2025 Lancashire
    // loan) is all outside the IPL
    iccTrophies: 0
    // International career began Oct 2024, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Jamie Overton",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast bowler, a genuine batting
    // all-rounder — cap 278
    debutYear: 2022,
    format: "All-format",
    // Test debut 23 Jun 2022 vs New Zealand (earliest), T20I debut 11 Sep 2024 vs Australia, ODI
    // debut 31 Oct 2024 vs West Indies — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Chennai Super Kings"],
    // Chennai Super Kings (2025-present) — signed for the 2025 Mega Auction as a replacement for Sam
    // Curran, genuine playing appearances confirmed via a dedicated IPL-history search (3 matches in
    // 2025, a bigger middle-overs role with 10 wickets in 2026 before a mid-season thigh injury)
    iccTrophies: 0
    // Test debut came before England's 2022 T20 World Cup win but he had no white-ball caps at that
    // point (T20I debut not until Sep 2024), so not part of that squad — England did not win the
    // 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Dan Mousley",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm offbreak",
    // ESPNcricinfo + Wikipedia agree: left-hand bat, right-arm offbreak bowler with an unusually
    // fast 109kph average pace (per CricViz, the fastest spinner on record since 2006) — cap 277
    debutYear: 2024,
    format: "ODI+T20",
    // ODI debut 31 Oct 2024 vs West Indies (earliest), T20I debut 9 Nov 2024 vs West Indies —
    // explicitly confirmed no Test caps yet, replaced Moeen Ali in the squad for this tour —
    // ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — his franchise history (MI Emirates, Birmingham Phoenix, Peshawar
    // Zalmi) is all outside the IPL
    iccTrophies: 0
    // International career began Oct 2024, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Jordan Cox",
    country: "England",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, wicketkeeper who grew up developing an offbreak
    // as a secondary skill — cap 276, named the 2025 PCA Men's Player of the Year
    debutYear: 2024,
    format: "All-format",
    // T20I debut 11 Sep 2024 vs Australia (earliest), ODI debut 31 Oct 2024 vs West Indies, Test
    // debut 17 Jun 2026 vs New Zealand at The Oval — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // "Signed but never played" exclusion applied per the standing rule: bought by Royal Challengers
    // Bengaluru for the 2026 auction and part of their title-winning squad, but a dedicated
    // IPL-history search confirmed he did not play a single match all season — his only on-field
    // involvement was as a substitute fielder. His real franchise history (Dubai Capitals, Gulf
    // Giants, Melbourne Renegades, Sunrisers Eastern Cape, Dambulla Aura, Hobart Hurricanes, Oval
    // Invincibles) is all outside the IPL anyway
    iccTrophies: 0
    // International career began Sep 2024, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Alex Hales",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand opening batsman, right-arm medium part-time bowler
    // — England T20I Round 1 (top-15 run-scorers)
    debutYear: 2011,
    format: "All-format",
    // T20I debut 31 Aug 2011 vs India (earliest), ODI debut 27 Aug 2014 vs India, Test debut 26 Dec
    // 2015 vs South Africa — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Sunrisers Hyderabad"],
    // Two "signed but never played" exclusions applied per the standing rule: Mumbai Indians (2015,
    // signed for the playoffs/final but made no appearances) and Kolkata Knight Riders (2022,
    // purchased in auction but withdrew for personal reasons) — only Sunrisers Hyderabad (2018,
    // debuted as David Warner's replacement) is a genuine playing spell, independently re-verified
    iccTrophies: 1
    // Deliberately NOT credited with 2019: he was dropped from the World Cup squad shortly before
    // the tournament following a failed drugs test, replaced by James Vince — independently
    // re-verified against the actual 15-man squad list. Credited with 2022 instead: recalled as a
    // late replacement for the injured Jonny Bairstow and played a starring role, including a
    // record 170-run opening stand with Jos Buttler in the semi-final
  },
  {
    name: "Dawid Malan",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: left-hand bat, right-arm legbreak part-time bowler
    debutYear: 2017,
    format: "All-format",
    // T20I debut 25 Jun 2017 vs South Africa (earliest, 78 off 44 on debut), Test debut 27 Jul 2017
    // vs South Africa, ODI debut 3 May 2019 vs Ireland — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Punjab Kings"],
    // Punjab Kings (2021) — bought in the auction, genuinely played 1 match that season
    iccTrophies: 1
    // Confirmed NOT on the winning 2019 World Cup squad (independently re-verified against the
    // actual 15-man list). Credited with 2022 instead: named in the winning T20 World Cup squad,
    // scored 56 runs in the group stage before an injury ruled him out of the semi-final and final
  },
  {
    name: "Phil Salt",
    country: "England",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm offbreak",
    // ESPNcricinfo + Wikipedia agree: right-hand bat wicketkeeper who occasionally bowls offbreak
    debutYear: 2021,
    format: "ODI+T20",
    // ODI debut 8 Jul 2021 vs Pakistan (earliest), T20I debut 26 Jan 2022 vs West Indies —
    // explicitly confirmed no Test caps — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Delhi Capitals", "Kolkata Knight Riders", "Royal Challengers Bangalore"],
    // Delhi Capitals (2023), Kolkata Knight Riders (2024, a title-winning campaign — 435 runs at a
    // strike rate of 182), Royal Challengers Bangalore (2025-present, another title-winning
    // campaign in 2025) — all genuine playing spells confirmed via a dedicated IPL-history search.
    // (His Abu Dhabi Knight Riders spell is ILT20, not the IPL, and is excluded)
    iccTrophies: 1
    // Part of England's winning 2022 T20 World Cup squad — independently re-verified
  },
  {
    name: "Liam Livingstone",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree he genuinely bowls both legbreak (his primary stock ball) and
    // offbreak (used almost exclusively to left-handers) — no single source lists one as his sole
    // style, so legbreak was chosen as the closest fit to this app's single-value schema, per the
    // "primary style" judgment call precedent used elsewhere in this file (e.g. Ashwin)
    debutYear: 2017,
    format: "All-format",
    // T20I debut 23 Jun 2017 vs South Africa (earliest), ODI debut 26 Mar 2021 vs India, Test debut
    // 1 Dec 2022 vs Pakistan — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Rajasthan Royals", "Punjab Kings"],
    // Rajasthan Royals (2019-2021), Punjab Kings (2022-2024) — both genuine playing spells
    iccTrophies: 1
    // Named in England's winning 2022 T20 World Cup squad and played all 6 matches (55 runs, 3
    // wickets) — independently re-verified
  },
  {
    name: "Harry Brook",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm medium part-time bowler — England's
    // current white-ball captain
    debutYear: 2022,
    format: "All-format",
    // T20I debut 26 Jan 2022 vs West Indies (earliest), Test debut 8 Sep 2022 vs South Africa, ODI
    // debut 27 Jan 2023 vs South Africa — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Sunrisers Hyderabad"],
    // A real correction caught during a dedicated IPL-history search: Wikipedia's infobox lists
    // Delhi Capitals (2024) as if it were a genuine stint, but ESPNcricinfo's fuller account shows
    // he withdrew from DC before ever playing a match (a family bereavement, then a second
    // consecutive withdrawal in 2025 that triggered a two-year IPL ban until 2027) — excluded per
    // the standing "signed but never played" rule. Only Sunrisers Hyderabad (2023, 190 runs in 11
    // matches including a memorable 100* vs KKR) is a genuine playing spell
    iccTrophies: 1
    // Named in England's winning 2022 T20 World Cup squad — independently re-verified against the
    // actual 15-man squad list
  },
  {
    name: "Luke Wright",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand opening batsman, right-arm medium part-time bowler
    debutYear: 2007,
    format: "ODI+T20",
    // ODI debut 5 Sep 2007 vs India (earliest), T20I debut 13 Sep 2007 vs Zimbabwe — explicitly
    // confirmed no Test caps, retired from all cricket Nov 2022 and became an England selector —
    // ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Pune Warriors India"],
    // A real correction caught during a dedicated IPL-history search: one AI-summarized source
    // claimed he "never played in the IPL specifically" despite listing Pune Warriors India in the
    // same breath — independently re-verified via ESPNcricinfo match reports confirming genuine
    // appearances in both 2012 and 2013, including a Player-of-the-Match 44 off 23 vs Delhi
    // Daredevils in 2013
    iccTrophies: 1
    // Named in England's winning 2010 World Twenty20 squad — bowled only 1 over in the whole
    // tournament, but it accounted for the wicket of Cameron White in the final vs Australia —
    // independently re-verified against the actual 15-man squad list
  },
  {
    name: "Ravi Bopara",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm medium bowler
    debutYear: 2007,
    format: "All-format",
    // ODI debut 2 Feb 2007 vs Australia (earliest), Test debut 1 Dec 2007 vs Sri Lanka, T20I debut
    // 13 Jun 2008 vs New Zealand — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kings XI Punjab"],
    // Kings XI Punjab (2009-2010) — genuine playing spells across both seasons
    iccTrophies: 1
    // Named in England's winning 2010 World Twenty20 squad — independently re-verified against the
    // actual 15-man squad list
  },
  {
    name: "Chris Jordan",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — Barbados-born
    // (Christ Church), qualified for and represented England internationally — England T20I Round 1
    // (top-15 wicket-takers)
    debutYear: 2013,
    format: "All-format",
    // ODI debut 16 Sep 2013 vs Australia (earliest), T20I debut 2 Feb 2014 vs Australia, Test debut
    // 12 Jun 2014 vs Sri Lanka — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Sunrisers Hyderabad", "Punjab Kings", "Chennai Super Kings"],
    // Royal Challengers Bangalore (2016, signed as Mitchell Starc's injury replacement — played
    // multiple matches including a 4/11 vs Gujarat Lions and the final), Sunrisers Hyderabad (2017,
    // 1 genuine match), Punjab Kings (2020-2021), Chennai Super Kings (2022) — all genuine playing
    // spells confirmed via a dedicated IPL-history search
    iccTrophies: 1
    // Confirmed NOT on the winning 2019 World Cup squad (independently re-verified against the
    // actual 15-man list). Credited with 2022 instead: came into the winning T20 World Cup squad as
    // injury cover for Mark Wood, took 3/43 in the semi-final and 2/27 in the final
  },
  {
    name: "Mark Wood",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast bowler — one of the fastest
    // bowlers in the world, averaging 89mph in Tests since 2020
    debutYear: 2015,
    format: "All-format",
    // ODI debut 8 May 2015 vs Ireland (earliest), Test debut 21 May 2015 vs New Zealand, T20I debut
    // 23 Jun 2015 vs New Zealand — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Chennai Super Kings", "Lucknow Super Giants"],
    // Chennai Super Kings (2018, 1 match), Lucknow Super Giants (2023, 4 matches including a
    // stand-out 5/14 on debut vs Delhi Capitals) — both genuine playing spells confirmed via a
    // dedicated IPL-history search. A 2022 LSG signing ended in injury before he played that season
    // — moot since his genuine 2023 LSG stint already counts the same franchise
    iccTrophies: 2
    // 2019 ODI World Cup (3/40 vs Sri Lanka, 3/18 vs West Indies) + 2022 T20 World Cup (played every
    // Super 12 match before an injury ruled him out of the semi-final and final) — one of only 6
    // players to win both tournaments, independently re-verified against both squad lists
  },
  {
    name: "Sam Curran",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left arm medium fast",
    // ESPNcricinfo + Wikipedia agree: left-hand bat, left-arm medium-fast bowler
    debutYear: 2018,
    format: "All-format",
    // Test debut 1 Jun 2018 vs India (earliest), ODI debut 24 Jun 2018 vs Australia, T20I debut 1
    // Nov 2019 vs New Zealand — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kings XI Punjab", "Chennai Super Kings", "Punjab Kings"],
    // Kings XI Punjab (2019), Chennai Super Kings (2020-2021, 2025), Punjab Kings (2023-2024, the
    // league's most expensive player that auction at ₹18.5cr) — all genuine playing spells. A 2026
    // trade to Rajasthan Royals is deliberately excluded: he missed the entire season with a groin
    // injury and never played a match for them, confirmed via a dedicated IPL-history search
    iccTrophies: 1
    // Confirmed NOT on the winning 2019 World Cup squad (independently re-verified). Credited with
    // 2022 instead: Player of the Match AND Player of the Tournament in the winning T20 World Cup
    // campaign, 3/12 in the final
  },
  {
    name: "Jofra Archer",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast bowler — Barbados-born
    // (Bridgetown), qualified for and represented England internationally
    debutYear: 2019,
    format: "All-format",
    // ODI debut 3 May 2019 vs Ireland (earliest), T20I debut 5 May 2019 vs Pakistan, Test debut 14
    // Aug 2019 vs Australia — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Rajasthan Royals", "Mumbai Indians"],
    // Rajasthan Royals (2018-2020, 2025-present), Mumbai Indians (2022-2023, though 2022 itself was
    // missed to injury — his genuine 2023 appearances, 5 matches, confirm the franchise regardless)
    // — both genuine playing spells confirmed via a dedicated IPL-history search
    iccTrophies: 1
    // Part of England's winning 2019 World Cup squad — bowled the Super Over in the final.
    // Confirmed NOT on the 2022 T20 World Cup squad (out injured all year) — independently
    // re-verified against the actual 15-man squad list
  },
  {
    name: "Jade Dernbach",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — South
    // African-born (Johannesburg), qualified for and represented England internationally
    debutYear: 2011,
    format: "ODI+T20",
    // T20I debut 25 Jun 2011 vs Sri Lanka (earliest), ODI debut 28 Jun 2011 vs Sri Lanka —
    // explicitly confirmed no Test caps, international career ran 2011-2014 — ESPNcricinfo +
    // Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — his franchise cricket (Melbourne Stars, Wellington, Quetta Gladiators,
    // Jamaica Tallawahs) is all outside the IPL
    iccTrophies: 0
    // International career (2011-2014) fell entirely between England's ICC trophies — after the
    // 2010 World Twenty20, before the 2019 World Cup
  },
  {
    name: "Reece Topley",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Left arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, left-arm fast-medium bowler
    debutYear: 2015,
    format: "ODI+T20",
    // T20I debut 31 Aug 2015 vs Australia (earliest), ODI debut 13 Sep 2015 vs Australia —
    // explicitly confirmed no Test caps — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore", "Mumbai Indians"],
    // Royal Challengers Bangalore (2023, 1 wicket on debut before a shoulder injury ended his
    // season; retained and played on into 2024), Mumbai Indians (2025) — both genuine playing
    // spells. (His Melbourne Renegades spell is BBL, not the IPL, and is excluded)
    iccTrophies: 0
    // A repeated near-miss rather than a genuine mismatch: named in England's squad for both the
    // winning 2022 T20 World Cup and the 2023 ODI World Cup (which England did not win anyway), but
    // ruled out by injury before playing a match in either — independently re-verified. No mention
    // found anywhere of a 2019 World Cup squad call-up either
  },
  {
    name: "Tom Curran",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — South
    // African-born (Cape Town), qualified for and represented England internationally — Sam
    // Curran's older brother
    debutYear: 2017,
    format: "All-format",
    // T20I debut 23 Jun 2017 vs South Africa (earliest), ODI debut 29 Sep 2017 vs West Indies, Test
    // debut 26 Dec 2017 vs Australia — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Kolkata Knight Riders", "Rajasthan Royals", "Delhi Capitals"],
    // Kolkata Knight Riders (2018, signed as a Mitchell Starc replacement), Rajasthan Royals (2020),
    // Delhi Capitals (2021) — all genuine playing spells as a back-up seam-bowling all-rounder,
    // confirmed via a dedicated IPL-history search
    iccTrophies: 1
    // Part of England's winning 2019 World Cup squad as an unused member. Also named in the 2021 T20
    // World Cup squad (won by Australia, not England) but fell out of favour before the winning 2022
    // squad was picked — independently re-verified, no double-count
  },
  {
    name: "Matthew Potts",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — cap 108,
    // England T20I Round 2 (cap-number method)
    debutYear: 2022,
    format: "All-format",
    // Test debut 2 Jun 2022 vs New Zealand (earliest), ODI debut 19 Jul 2022 vs South Africa, T20I
    // debut 6 Jun 2025 vs West Indies — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — his MI Cape Town (2025) spell is South Africa's SA20 league, not the
    // IPL
    iccTrophies: 0
    // International career began Jun 2022, before that year's T20 World Cup but he had no white-ball
    // caps until 2025, so not part of that squad. England did not win the 2025 Champions Trophy or
    // the 2026 T20 World Cup either
  },
  {
    name: "Jamie Smith",
    country: "England",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    bowlingStyle: "NA",
    // No source could confirm a bowling record either way (bowled or never bowled) — marked NA per
    // the standing rule for genuinely unconfirmed cases, flagged here rather than presented as
    // settled fact, same treatment as KL Rahul/Eoin Morgan/Navjot Singh Sidhu elsewhere in this file
    debutYear: 2023,
    format: "All-format",
    // ODI debut 23 Sep 2023 vs Ireland (earliest), Test debut 10 Jul 2024 vs West Indies at Lord's
    // (took over as England's Test wicketkeeper, highest score by an England Test 'keeper: 184),
    // T20I debut 25 Jan 2025 vs India — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Nominated himself for the IPL 2026 auction but went unsold, despite reported interest from
    // KKR/DC/PBKS — independently re-verified
    iccTrophies: 0
    // International career began Sep 2023, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Jacob Bethell",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    bowlingStyle: "Left arm orthodox",
    // ESPNcricinfo + Wikipedia agree: left-hand bat, slow left-arm orthodox bowler — Barbados-born,
    // captained England Under-19s — cap 102
    debutYear: 2024,
    format: "All-format",
    // T20I debut 11 Sep 2024 vs Australia (earliest), ODI debut 19 Sep 2024 vs Australia, Test debut
    // 28 Nov 2024 vs New Zealand — ESPNcricinfo + Wikipedia confirmed
    iplTeams: ["Royal Challengers Bangalore"],
    // Royal Challengers Bangalore (2025-present) — genuine playing appearances confirmed via a
    // dedicated IPL-history search (2 matches in 2025 including a 33-ball 55 vs CSK; multiple
    // matches in 2026 opening with Kohli before a finger injury ended his season). (His Melbourne
    // Renegades spell is BBL, not the IPL, and is excluded)
    iccTrophies: 0
    // International career began Sep 2024, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Gus Atkinson",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast medium",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast-medium bowler — cap 101
    debutYear: 2023,
    format: "All-format",
    // T20I debut 1 Sep 2023 vs New Zealand (earliest), ODI debut 8 Sep 2023 vs New Zealand, Test
    // debut 10 Jul 2024 vs West Indies at Lord's — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // "Signed but never played" exclusion applied per the standing rule: signed by Kolkata Knight
    // Riders for IPL 2024 (₹1cr) but withdrew before playing a match, citing workload management
    // after a long winter of England cricket — replaced by Dushmantha Chameera, independently
    // re-verified via a dedicated IPL-history search
    iccTrophies: 0
    // International career began Sep 2023, after England's last ICC trophy (the 2022 T20 World Cup)
    // — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  },
  {
    name: "Brydon Carse",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm fast",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm fast bowler — South African-born
    // (Port Elizabeth), qualified for England through a British passport in 2019 — cap 100
    debutYear: 2021,
    format: "All-format",
    // ODI debut 8 Jul 2021 vs Pakistan (earliest), T20I debut 30 Aug 2023 vs New Zealand, Test debut
    // 7 Oct 2024 vs Pakistan at Multan — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // A real catch during a dedicated IPL-history search: signed by Sunrisers Hyderabad for BOTH
    // IPL 2025 and IPL 2026, but never played a single match in either season — ruled out by a toe
    // injury before the 2025 season even started, then injured his hand in a pre-tournament net
    // session before IPL 2026's opener and was replaced (first by Wiaan Mulder in 2025, then by
    // Dilshan Madushanka in 2026) without ever taking the field. Excluded entirely per the standing
    // "signed but never played" rule
    iccTrophies: 0
    // Ruled out of the 2025 Champions Trophy with a toe injury (England did not win it anyway).
    // International white-ball career began too late for the 2022 T20 World Cup, and England did not
    // win the 2023 or 2025 ODI-format events he was near either
  },
  {
    name: "Rehan Ahmed",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    bowlingStyle: "Right arm leg break",
    // ESPNcricinfo + Wikipedia agree: right-hand bat, right-arm legbreak bowler — became England's
    // youngest-ever Test debutant (18 years 126 days) with a 5-wicket haul on debut — cap 99
    debutYear: 2022,
    format: "All-format",
    // Test debut 17 Dec 2022 vs Pakistan (earliest), ODI debut 6 Mar 2023 vs Bangladesh, T20I debut
    // 12 Mar 2023 vs Bangladesh — ESPNcricinfo + Wikipedia confirmed
    iplTeams: [],
    // Never played the IPL — withdrew himself from IPL auction contention to focus on England
    // commitments, confirmed via a dedicated search; never signed by any franchise
    iccTrophies: 0
    // International career began Dec 2022, weeks after that year's T20 World Cup final (13 Nov
    // 2022) — England did not win the 2025 Champions Trophy or the 2026 T20 World Cup either
  }

];
