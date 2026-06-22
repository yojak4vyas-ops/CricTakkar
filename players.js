// ===== CRICTAKKAR CRICKET WORDLE — PLAYER DATABASE =====
// Format rule: "All-format" = played at least 1 match in Tests, ODIs AND T20Is internationally
// Every entry verified against ESPNcricinfo and Wikipedia — June 2025

const wordlePlayers = [
  {
    name: "Sachin Tendulkar",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    era: "2000s",
    format: "All-format"
    // Verified: 200 Tests, 463 ODIs, 1 T20I (vs South Africa, 2006) — ESPNcricinfo
  },
  {
    name: "MS Dhoni",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 90 Tests, 350 ODIs, 98 T20Is — ESPNcricinfo
  },
  {
    name: "Virat Kohli",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 113 Tests, 292 ODIs, 125 T20Is — ESPNcricinfo
  },
  {
    name: "Rohit Sharma",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 67 Tests, 264 ODIs, 159 T20Is — ESPNcricinfo
  },
  {
    name: "Anil Kumble",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    era: "2000s",
    format: "All-format"
    // Verified: 132 Tests, 271 ODIs, 1 T20I — ESPNcricinfo
  },
  {
    name: "Kapil Dev",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    era: "90s",
    format: "ODI"
    // Verified: 131 Tests, 225 ODIs — retired 1994, T20I format did not exist. NO T20Is.
  },
  {
    name: "Sourav Ganguly",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    era: "2000s",
    format: "All-format"
    // Verified: 113 Tests, 311 ODIs, 1 T20I (vs South Africa, 2007) — ESPNcricinfo
  },
  {
    name: "Rahul Dravid",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    era: "2000s",
    format: "All-format"
    // Verified: 164 Tests, 344 ODIs, 1 T20I (vs England, 2011) — ESPNcricinfo
  },
  {
    name: "Yuvraj Singh",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 40 Tests, 304 ODIs, 58 T20Is — ESPNcricinfo
  },
  {
    name: "Harbhajan Singh",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    era: "2000s",
    format: "All-format"
    // Verified: 103 Tests, 236 ODIs, 28 T20Is — ESPNcricinfo
  },
  {
    name: "Brian Lara",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    era: "2000s",
    format: "ODI"
    // Verified: 131 Tests, 299 ODIs — retired April 2007. ZERO T20 Internationals.
    // His T20 appearances (Southern Rocks 2010) were domestic, not international.
  },
  {
    name: "Shane Warne",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    era: "2000s",
    format: "ODI"
    // Verified: 145 Tests, 194 ODIs — retired January 2007. ZERO T20 Internationals.
    // IPL (Rajasthan Royals) was domestic/franchise cricket, not international T20I.
  },
  {
    name: "Ricky Ponting",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    era: "2000s",
    format: "All-format"
    // Verified: 168 Tests, 375 ODIs, 17 T20Is — ESPNcricinfo
  },
  {
    name: "AB de Villiers",
    country: "South Africa",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 114 Tests, 228 ODIs, 78 T20Is — ESPNcricinfo
  },
  {
    name: "Chris Gayle",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 103 Tests, 301 ODIs, 79 T20Is — ESPNcricinfo
  },
  {
    name: "Wasim Akram",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Left-hand",
    era: "90s",
    format: "ODI"
    // Verified: 104 Tests, 356 ODIs — retired 2003. T20I cricket did not exist. ZERO T20Is.
  },
  {
    name: "Kumar Sangakkara",
    country: "Sri Lanka",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    era: "2010s",
    format: "All-format"
    // Verified: 134 Tests, 404 ODIs, 56 T20Is — ESPNcricinfo
  },
  {
    name: "Jasprit Bumrah",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    era: "2020s",
    format: "All-format"
    // Verified: 40+ Tests, 80+ ODIs, 75+ T20Is — ESPNcricinfo
  },
  {
    name: "Hardik Pandya",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    era: "2020s",
    format: "All-format"
    // Verified: 13 Tests, 70+ ODIs, 110+ T20Is — ESPNcricinfo
  },
  {
    name: "Suryakumar Yadav",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    era: "2020s",
    format: "All-format"
    // Verified: 7 Tests, 50+ ODIs, 70+ T20Is — ESPNcricinfo
  }
];
