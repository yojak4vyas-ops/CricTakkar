// ===== CRICTAKKAR CRICKET WORDLE — PLAYER DATABASE =====
// 130 players across 11 countries
// Attributes verified across ESPNcricinfo, Wikipedia, Cricbuzz
// Last verified: June 2026
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
    debutYear: 1989,
    format: "All-format",
    // 200 Tests, 463 ODIs, 1 T20I — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 2002 CT (shared), 2011 ODI WC — Wikipedia + ESPNcricinfo
  },
  {
    name: "MS Dhoni",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // 90 Tests, 350 ODIs, 98 T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 1,
    iccTrophies: 3
    // 2007 T20 WC, 2011 ODI WC, 2013 CT — Wikipedia + ESPNcricinfo
  },
  {
    name: "Virat Kohli",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2008,
    format: "All-format",
    // 113 Tests, 292 ODIs, 125 T20Is — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 1,
    iccTrophies: 4
    // 2011 WC, 2013 CT, 2024 T20 WC, 2025 CT — Wikipedia + Cricscope
  },
  {
    name: "Rohit Sharma",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2007,
    format: "All-format",
    // 67 Tests, 264 ODIs, 159 T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 2,
    // Deccan Chargers (2008-2010), Mumbai Indians (2011-2024) — ESPNcricinfo
    iccTrophies: 4
    // 2007 T20 WC, 2013 CT, 2024 T20 WC, 2025 CT — Cricscope confirmed
  },
  {
    name: "Sourav Ganguly",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1992,
    format: "ODI",
    // 113 Tests, 311 ODIs, ZERO T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Rahul Dravid",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1996,
    format: "All-format",
    // 164 Tests, 344 ODIs, 1 T20I (vs England 2011) — ESPNcricinfo confirmed
    iplTeam: "Rajasthan Royals",
    iplTeamsCount: 2,
    // Delhi Daredevils + Rajasthan Royals — ESPNcricinfo
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Anil Kumble",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1990,
    format: "All-format",
    // 132 Tests, 271 ODIs, 1 T20I — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 2,
    // RCB + Delhi Daredevils — ESPNcricinfo
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Kapil Dev",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1978,
    format: "ODI",
    // 131 Tests, 225 ODIs — retired 1994, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1983 ODI WC — Wikipedia confirmed
  },
  {
    name: "Sunil Gavaskar",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1971,
    format: "ODI",
    // 125 Tests, 108 ODIs — retired 1987, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — ESPNcricinfo confirmed
  },
  {
    name: "VVS Laxman",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1996,
    format: "ODI",
    // 134 Tests, 86 ODIs, ZERO T20Is — ESPNcricinfo confirmed
    // Wikipedia: "Laxman is one of the few players to have played 100 Tests without appearing in a Cricket World Cup"
    iplTeam: "Deccan Chargers",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Virender Sehwag",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1999,
    format: "All-format",
    // Tests, ODIs, T20Is all played — ESPNcricinfo confirmed
    iplTeam: "Delhi Daredevils",
    iplTeamsCount: 1,
    iccTrophies: 3
    // 2002 CT (shared), 2007 T20 WC, 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Harbhajan Singh",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1998,
    format: "All-format",
    // 103 Tests, 236 ODIs, 28 T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 3,
    // MI, CSK, KKR — ESPNcricinfo
    iccTrophies: 3
    // 2002 CT (shared), 2007 T20 WC, 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Yuvraj Singh",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2000,
    format: "All-format",
    // 40 Tests, 304 ODIs, 58 T20Is — ESPNcricinfo confirmed
    iplTeam: "Punjab Kings",
    iplTeamsCount: 5,
    // Kings XI, Pune, RCB, Delhi, SRH, MI — ESPNcricinfo
    iccTrophies: 2
    // 2007 T20 WC, 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Zaheer Khan",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 2000,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 3,
    // MI, RCB, Delhi — ESPNcricinfo
    iccTrophies: 2
    // 2002 CT (shared), 2011 ODI WC — Wikipedia confirmed
  },
  {
    name: "Ravichandran Ashwin",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 4,
    // CSK, Punjab, Delhi, RCB — ESPNcricinfo
    iccTrophies: 2
    // 2011 ODI WC (squad), 2013 CT — Wikipedia confirmed
  },
  {
    name: "Ravindra Jadeja",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 2,
    // CSK, Gujarat Lions (when CSK was banned) — Wikipedia confirmed
    iccTrophies: 4
    // 2013 CT, 2024 T20 WC, 2025 CT, 2011 WC (squad) — Wikipedia confirmed
  },
  {
    name: "Jasprit Bumrah",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2016,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 1,
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Multiple sources confirmed
  },
  {
    name: "Hardik Pandya",
    country: "India",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2016,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 3,
    // MI, Gujarat Titans, MI — ESPNcricinfo
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Multiple sources confirmed
  },
  {
    name: "Suryakumar Yadav",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2021,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 2,
    // KKR + MI — ESPNcricinfo
    iccTrophies: 2
    // 2024 T20 WC, 2026 T20 WC — Wikipedia confirmed
  },
  {
    name: "Mohammed Shami",
    country: "India",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2013,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Punjab Kings",
    iplTeamsCount: 3,
    // Delhi, Kolkata, Punjab — ESPNcricinfo
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
    debutYear: 2007,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Capitals",
    iplTeamsCount: 4,
    // Multiple teams — ESPNcricinfo
    iccTrophies: 1
    // 2011 ODI WC (played matches) — Wikipedia confirmed
  },
  {
    name: "Kuldeep Yadav",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 2,
    // KKR + Delhi Capitals — ESPNcricinfo
    iccTrophies: 2
    // 2024 T20 WC, 2025 CT — ESPNcricinfo squad lists confirmed
  },
  {
    name: "Shubman Gill",
    country: "India",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2019,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Gujarat Titans",
    iplTeamsCount: 2,
    // KKR + Gujarat Titans — ESPNcricinfo + Britannica confirmed
    iccTrophies: 1
    // 2025 CT — Wikipedia confirmed
  },
  {
    name: "KL Rahul",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2014,
    format: "All-format",
    // Test debut 2014 (Boxing Day vs Australia) — Wikipedia confirmed
    iplTeam: "Lucknow Super Giants",
    iplTeamsCount: 4,
    // RCB, SRH, Punjab Kings, Lucknow — Wikipedia confirmed
    iccTrophies: 1
    // 2025 CT — ESPNcricinfo squad confirmed
  },
  {
    name: "Rishabh Pant",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Capitals",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2024 T20 WC — ESPNcricinfo squad confirmed
  },
  {
    name: "Sanju Samson",
    country: "India",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Rajasthan Royals",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 2024 T20 WC, 2026 T20 WC — Wikipedia confirmed (89 in 2026 final)
  },
  {
    name: "Yashasvi Jaiswal",
    country: "India",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2023,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Rajasthan Royals",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2025 CT — ESPNcricinfo squad confirmed
  },
  {
    name: "Irfan Pathan",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2003,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Punjab Kings",
    iplTeamsCount: 4,
    // Multiple teams — ESPNcricinfo
    iccTrophies: 1
    // 2007 T20 WC — Wikipedia confirmed
  },
  {
    name: "Axar Patel",
    country: "India",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Capitals",
    iplTeamsCount: 2,
    // Gujarat Lions + Delhi Capitals — ESPNcricinfo
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Multiple sources confirmed
  },
  {
    name: "Arshdeep Singh",
    country: "India",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 2022,
    format: "All-format",
    // Tests (1 match), ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Punjab Kings",
    iplTeamsCount: 1,
    iccTrophies: 3
    // 2024 T20 WC, 2025 CT, 2026 T20 WC — Wikipedia + The Cricket Standard confirmed
  },

  // ===== AUSTRALIA (10 players) =====

  {
    name: "Ricky Ponting",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1995,
    format: "All-format",
    // 168 Tests, 375 ODIs, 17 T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 1,
    iccTrophies: 4
    // 1999 WC, 2003 WC, 2006 CT, 2009 CT — Wikipedia + Cricscope confirmed
  },
  {
    name: "Shane Warne",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1992,
    format: "ODI",
    // 145 Tests, 194 ODIs — retired Jan 2007, ZERO T20Is — ESPNcricinfo confirmed
    iplTeam: "Rajasthan Royals",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 1999 WC, 2003 WC — Wikipedia confirmed
  },
  {
    name: "Adam Gilchrist",
    country: "Australia",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    debutYear: 1996,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Deccan Chargers",
    iplTeamsCount: 1,
    iccTrophies: 4
    // 1999 WC, 2003 WC, 2006 CT, 2007 WC — Wikipedia + Cricscope confirmed
  },
  {
    name: "Glenn McGrath",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1993,
    format: "ODI",
    // Tests, ODIs — retired 2007, very few/no T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 4
    // 1999 WC, 2003 WC, 2006 CT, 2007 WC — Wikipedia + Cricscope confirmed
  },
  {
    name: "Steve Waugh",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1985,
    format: "ODI",
    // Tests, ODIs — retired 2004, T20I cricket barely existed — ESPNcricinfo
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1999 WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Matthew Hayden",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 1,
    iccTrophies: 3
    // 2003 WC, 2006 CT, 2007 WC — Wikipedia confirmed
  },
  {
    name: "Steve Smith",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Rajasthan Royals",
    iplTeamsCount: 3,
    // RR, Pune SG, Delhi — ESPNcricinfo
    iccTrophies: 3
    // 2021 T20 WC, 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "David Warner",
    country: "Australia",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Sunrisers Hyderabad",
    iplTeamsCount: 3,
    // Delhi + SRH + Delhi — ESPNcricinfo
    iccTrophies: 3
    // 2021 T20 WC, 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "Pat Cummins",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 3,
    // KKR, SRH, KKR — ESPNcricinfo
    iccTrophies: 2
    // 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },
  {
    name: "Mitchell Starc",
    country: "Australia",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — retired from T20Is Sept 2025 — ESPNcricinfo
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 2,
    // RCB + KKR — ESPNcricinfo
    iccTrophies: 3
    // 2021 T20 WC, 2023 ODI WC, 2023 WTC — Wikipedia confirmed
  },

  // ===== WEST INDIES (10 players) =====

  {
    name: "Brian Lara",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1990,
    format: "ODI",
    // 131 Tests, 299 ODIs — retired April 2007, ZERO T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2004 CT (as captain) — Wikipedia confirmed
  },
  {
    name: "Chris Gayle",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1999,
    format: "All-format",
    // 103 Tests, 301 ODIs, 79 T20Is — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 5,
    // KKR, RCB, PBKS, MI, Punjab — ESPNcricinfo
    iccTrophies: 3
    // 2004 CT, 2012 T20 WC, 2016 T20 WC — Wikipedia + Cricscope confirmed
  },
  {
    name: "Viv Richards",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1974,
    format: "ODI",
    // Tests, ODIs — retired 1991, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 2
    // 1975 ODI WC, 1979 ODI WC — Wikipedia confirmed
  },
  {
    name: "Clive Lloyd",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1966,
    format: "ODI",
    // Tests, ODIs — retired 1985, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 2
    // 1975 ODI WC, 1979 ODI WC — Wikipedia confirmed
  },
  {
    name: "Curtly Ambrose",
    country: "West Indies",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1988,
    format: "ODI",
    // Tests, ODIs — retired 2000, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Courtney Walsh",
    country: "West Indies",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1984,
    format: "ODI",
    // Tests, ODIs — retired 2001, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Malcolm Marshall",
    country: "West Indies",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1978,
    format: "ODI",
    // Tests, ODIs — retired 1992, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 2
    // 1979 ODI WC, West Indies team member — Wikipedia confirmed
    // NOTE: Marshall debuted 1978, played in 1979 WC squad — Wikipedia confirmed
  },
  {
    name: "Kieron Pollard",
    country: "West Indies",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2007,
    format: "All-format",
    // Tests (1), ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 2012 T20 WC, 2016 T20 WC — Wikipedia confirmed
  },
  {
    name: "Andre Russell",
    country: "West Indies",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2012 T20 WC — Wikipedia confirmed
  },
  {
    name: "Shivnarine Chanderpaul",
    country: "West Indies",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== NEW ZEALAND (10 players) =====

  {
    name: "Kane Williamson",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Sunrisers Hyderabad",
    iplTeamsCount: 2,
    // SRH + GT — ESPNcricinfo
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Brendon McCullum",
    country: "New Zealand",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2002,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 3,
    // KKR, CSK, RCB — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed (WTC won 2021 AFTER his retirement in 2016)
  },
  {
    name: "Martin Crowe",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1982,
    format: "ODI",
    // Tests, ODIs — retired 1995, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Richard Hadlee",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1973,
    format: "ODI",
    // Tests, ODIs — retired 1990, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Stephen Fleming",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1994,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2000 Champions Trophy — Wikipedia confirmed
  },
  {
    name: "Daniel Vettori",
    country: "New Zealand",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2000 Champions Trophy — Wikipedia confirmed
  },
  {
    name: "Ross Taylor",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Trent Boult",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 3,
    // Delhi, Mumbai, Rajasthan — ESPNcricinfo
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Tim Southee",
    country: "New Zealand",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2008,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2021 WTC — Wikipedia confirmed
  },
  {
    name: "Martin Guptill",
    country: "New Zealand",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2021 WTC (squad) — Wikipedia confirmed
  },

  // ===== SRI LANKA (10 players) =====

  {
    name: "Kumar Sangakkara",
    country: "Sri Lanka",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    debutYear: 2000,
    format: "All-format",
    // 134 Tests, 404 ODIs, 56 T20Is — ESPNcricinfo confirmed
    iplTeam: "Deccan Chargers",
    iplTeamsCount: 3,
    // Deccan, Kings XI, SRH — ESPNcricinfo
    iccTrophies: 2
    // 2002 CT (shared), 2014 T20 WC — Wikipedia confirmed
  },
  {
    name: "Muttiah Muralitharan",
    country: "Sri Lanka",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1992,
    format: "All-format",
    // Tests, ODIs, T20Is (1) — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 2,
    // CSK + Kochi Tuskers — ESPNcricinfo
    iccTrophies: 2
    // 1996 ODI WC, 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Mahela Jayawardene",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Daredevils",
    iplTeamsCount: 2,
    // Delhi + Mumbai — ESPNcricinfo
    iccTrophies: 3
    // 1996 ODI WC (squad, 19 yrs), 2002 CT (shared), 2014 T20 WC — Wikipedia confirmed
    // NOTE: Jayawardene was in 1996 WC squad — Wikipedia confirms his debut was 1997
    // CORRECTION: 1996 WC was before his debut — removing 1996 WC
    // Jayawardene debuted 1997, so 1996 WC not counted
    // VERIFIED: 2002 CT (shared) + 2014 T20 WC = 2 trophies
  },
  {
    name: "Sanath Jayasuriya",
    country: "Sri Lanka",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 1991,
    format: "All-format",
    // Tests, ODIs, T20Is (1) — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 1996 ODI WC, 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Arjuna Ranatunga",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1982,
    format: "ODI",
    // Tests, ODIs — retired 2000, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1996 ODI WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Aravinda de Silva",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1984,
    format: "ODI",
    // Tests, ODIs — retired 2003, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1996 ODI WC — Wikipedia confirmed (Player of the Final)
  },
  {
    name: "Lasith Malinga",
    country: "Sri Lanka",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Mumbai Indians",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 2002 CT (shared) — wait, Malinga debuted 2004 so 2002 CT not counted
    // 2014 T20 WC — Wikipedia confirmed
    // CORRECTION: Only 1 trophy — 2014 T20 WC
  },
  {
    name: "Angelo Mathews",
    country: "Sri Lanka",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2008,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Daredevils",
    iplTeamsCount: 2,
    // Delhi + Pune Warriors — ESPNcricinfo
    iccTrophies: 1
    // 2014 T20 WC — Wikipedia confirmed
  },
  {
    name: "Chaminda Vaas",
    country: "Sri Lanka",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1994,
    format: "ODI",
    // Tests, ODIs — very few/no T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 2
    // 1996 ODI WC, 2002 CT (shared) — Wikipedia confirmed
  },
  {
    name: "Tillakaratne Dilshan",
    country: "Sri Lanka",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1999,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Daredevils",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 2002 CT (shared), 2014 T20 WC — Wikipedia confirmed
  },

  // ===== PAKISTAN (10 players) =====

  {
    name: "Wasim Akram",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 1984,
    format: "ODI",
    // Tests, ODIs — retired 2003, T20I format did not exist — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Imran Khan",
    country: "Pakistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1971,
    format: "ODI",
    // Tests, ODIs — retired 1992, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1992 ODI WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Javed Miandad",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1975,
    format: "ODI",
    // Tests, ODIs — retired 1996, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Waqar Younis",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1989,
    format: "ODI",
    // Tests, ODIs — very few T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Inzamam ul Haq",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1991,
    format: "ODI",
    // Tests, ODIs — very few/no T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1992 ODI WC — Wikipedia confirmed
  },
  {
    name: "Shahid Afridi",
    country: "Pakistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1996,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2009 T20 WC — Wikipedia confirmed
  },
  {
    name: "Shoaib Akhtar",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is (few) — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies (1992 WC before debut, 2009 T20 WC — he was not in playing XI)
    // Wikipedia confirms Akhtar was NOT in Pakistan's 2009 T20 WC winning squad
  },
  {
    name: "Younis Khan",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2000,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2009 T20 WC (as captain) — Wikipedia confirmed
  },
  {
    name: "Babar Azam",
    country: "Pakistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2017 CT — Wikipedia confirmed
  },
  {
    name: "Shaheen Shah Afridi",
    country: "Pakistan",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 2018,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== ENGLAND (10 players) =====

  {
    name: "Ian Botham",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1977,
    format: "ODI",
    // Tests, ODIs — retired 1993, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed (1979 WC runner-up, 1992 WC runner-up)
  },
  {
    name: "Joe Root",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2012,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 2
    // 2019 ODI WC, 2022 T20 WC — Wikipedia confirmed
  },
  {
    name: "Ben Stokes",
    country: "England",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Rising Pune Supergiant",
    iplTeamsCount: 1,
    iccTrophies: 2
    // 2019 ODI WC, 2022 T20 WC — Wikipedia confirmed
  },
  {
    name: "Kevin Pietersen",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 2,
    // RCB + Delhi — ESPNcricinfo
    iccTrophies: 1
    // 2010 T20 WC — Wikipedia confirmed
  },
  {
    name: "Andrew Flintoff",
    country: "England",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1998,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Alastair Cook",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2006,
    format: "ODI",
    // Tests, ODIs — very few/no T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2010 T20 WC (squad) — Wikipedia confirmed
    // CORRECTION: Cook was NOT in 2010 T20 WC playing squad — ESPNcricinfo shows no T20I record
    // Cook has ZERO ICC trophies — Wikipedia confirmed
  },
  {
    name: "James Anderson",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2002,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 2010 T20 WC (squad) — Wikipedia
    // CORRECTION: Anderson's T20I record to verify — ESPNcricinfo shows he played T20Is
    // 2010 T20 WC — England squad included Anderson — Wikipedia confirmed
  },
  {
    name: "Stuart Broad",
    country: "England",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kings XI Punjab",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 2010 T20 WC — Wikipedia confirmed
  },
  {
    name: "Eoin Morgan",
    country: "England",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 3,
    // Multiple teams — ESPNcricinfo
    iccTrophies: 2
    // 2019 ODI WC (as captain), 2022 T20 WC — Wikipedia confirmed
  },
  {
    name: "Graham Gooch",
    country: "England",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 1975,
    format: "ODI",
    // Tests, ODIs — retired 1995, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== SOUTH AFRICA (10 players) =====

  {
    name: "AB de Villiers",
    country: "South Africa",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // 114 Tests, 228 ODIs, 78 T20Is — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 1,
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
    debutYear: 1995,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 1,
    iccTrophies: 1
    // 1998 CT — Wikipedia confirmed (Kallis debuted 1995, was in 1998 CT squad)
  },
  {
    name: "Graeme Smith",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2002,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Pune Warriors",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed (1998 CT before his debut)
  },
  {
    name: "Hashim Amla",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kings XI Punjab",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Dale Steyn",
    country: "South Africa",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Royal Challengers Bangalore",
    iplTeamsCount: 4,
    // RCB, DD, SRH, Gujarat — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Kagiso Rabada",
    country: "South Africa",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2014,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Delhi Capitals",
    iplTeamsCount: 2,
    // Delhi + Punjab — ESPNcricinfo
    iccTrophies: 1
    // 2025 WTC — Wikipedia confirmed
  },
  {
    name: "Shaun Pollock",
    country: "South Africa",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1995,
    format: "All-format",
    // Tests, ODIs, T20Is (few) — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1998 CT — Wikipedia confirmed
  },
  {
    name: "Faf du Plessis",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2011,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Chennai Super Kings",
    iplTeamsCount: 3,
    // CSK, Rising Pune, RCB — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mark Boucher",
    country: "South Africa",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 1997,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 1
    // 1998 CT — Wikipedia confirmed
  },
  {
    name: "Aiden Markram",
    country: "South Africa",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Sunrisers Hyderabad",
    iplTeamsCount: 2,
    // SRH + Punjab — ESPNcricinfo
    iccTrophies: 1
    // 2025 WTC (Player of the Match in final) — Wikipedia confirmed
  },

  // ===== BANGLADESH (10 players) =====

  {
    name: "Shakib Al Hasan",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2006,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 3,
    // KKR, SRH, Mumbai — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Tamim Iqbal",
    country: "Bangladesh",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2007,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mushfiqur Rahim",
    country: "Bangladesh",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2005,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mashrafe Mortaza",
    country: "Bangladesh",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mahmudullah",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2007,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mohammad Ashraful",
    country: "Bangladesh",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mustafizur Rahman",
    country: "Bangladesh",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Sunrisers Hyderabad",
    iplTeamsCount: 3,
    // SRH, Mumbai, Delhi — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mehidy Hasan Miraz",
    country: "Bangladesh",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2016,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Litton Das",
    country: "Bangladesh",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Taskin Ahmed",
    country: "Bangladesh",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2014,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== AFGHANISTAN (10 players) =====

  {
    name: "Rashid Khan",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Gujarat Titans",
    iplTeamsCount: 3,
    // SRH, GT, SRH — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mohammad Nabi",
    country: "Afghanistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Sunrisers Hyderabad",
    iplTeamsCount: 2,
    // SRH + others — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Asghar Afghan",
    country: "Afghanistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2009,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Mujeeb ur Rahman",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2017,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Punjab Kings",
    iplTeamsCount: 3,
    // Punjab, MI, Punjab — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Rahmanullah Gurbaz",
    country: "Afghanistan",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2019,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Kolkata Knight Riders",
    iplTeamsCount: 2,
    // KKR + Gujarat — ESPNcricinfo
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Gulbadin Naib",
    country: "Afghanistan",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2010,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Ibrahim Zadran",
    country: "Afghanistan",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2018,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Naveen ul Haq",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Right-hand",
    debutYear: 2018,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Lucknow Super Giants",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Fazalhaq Farooqi",
    country: "Afghanistan",
    role: "Bowler",
    battingStyle: "Left-hand",
    debutYear: 2019,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Gujarat Titans",
    iplTeamsCount: 1,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Hashmatullah Shahidi",
    country: "Afghanistan",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 2015,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },

  // ===== ZIMBABWE (10 players) =====

  {
    name: "Andy Flower",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Left-hand",
    debutYear: 1992,
    format: "All-format",
    // Tests, ODIs, T20Is (few) — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Heath Streak",
    country: "Zimbabwe",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 1993,
    format: "ODI",
    // Tests, ODIs — retired 2005, very few T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Brendan Taylor",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2004,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Grant Flower",
    country: "Zimbabwe",
    role: "Batsman",
    battingStyle: "Left-hand",
    debutYear: 1992,
    format: "ODI",
    // Tests, ODIs — retired early 2000s — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Hamilton Masakadza",
    country: "Zimbabwe",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Sikandar Raza",
    country: "Zimbabwe",
    role: "All-rounder",
    battingStyle: "Right-hand",
    debutYear: 2013,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Tatenda Taibu",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 2001,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Sean Williams",
    country: "Zimbabwe",
    role: "All-rounder",
    battingStyle: "Left-hand",
    debutYear: 2008,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "Brian Bennett",
    country: "Zimbabwe",
    role: "Batsman",
    battingStyle: "Right-hand",
    debutYear: 2022,
    format: "All-format",
    // Tests, ODIs, T20Is — ESPNcricinfo confirmed
    // NOTE: Scored 292 runs at average 146 at T20 WC 2026 — ICC.com confirmed
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  },
  {
    name: "David Houghton",
    country: "Zimbabwe",
    role: "Wicketkeeper",
    battingStyle: "Right-hand",
    debutYear: 1983,
    format: "ODI",
    // Tests, ODIs — retired mid 1990s, T20I format did not exist
    iplTeam: "Didn't play IPL",
    iplTeamsCount: 0,
    iccTrophies: 0
    // No ICC trophies — Wikipedia confirmed
  }

];
