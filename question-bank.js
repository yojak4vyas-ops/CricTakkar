// ===== CRICTAKKAR CENTRAL QUESTION BANK =====
// Single source of truth for all cricket quiz questions (poetry excluded — that
// lives in poems.js as its own repository). Used by:
//   - Daily Quiz (quiz.js) — draws 5 random questions from the WHOLE bank
//   - Category Quiz (category-quiz-v2.js) — filters by `category` field, draws 10
//   - Speed Round (speedround.js) — draws 30 random questions from the WHOLE bank
//   - On This Day (onthisday.js) — pulls a random `fact` for the no-event fallback
//
// Every question verified against Cricbuzz + ESPNcricinfo + Wikipedia + ICC
// (Four-Source Verification Rule, CLAUDE.md). Last full re-verification: Day 17.
//
// MERGE NOTE (Day 17, session 4): this file replaces the old questions.js (Daily
// Quiz only, no tags) and the non-poetry part of category-questions.js (Category
// Quiz only). Those two files had grown 14 genuine duplicate questions between them
// (same fact, different phrasing) — each duplicate was merged into a single tagged
// entry here, keeping whichever phrasing was more specific. No fact was dropped,
// just the redundant second copy of each.
//
// `category` field: ipl | test | odi | t20 | general
// "general" = format-agnostic trivia (rules, terminology) with no category-quiz tab
// of its own — these only ever surface in Daily Quiz / Speed Round.
//
// `era` field powers the Stats Dashboard's "weakest era" card. Buckets: Pre-1970s,
// 1970s-80s, 1990s, 2000s, 2010s, 2020s, General (timeless rules — excluded from
// era-strength scoring).

const questionBank = [

  // ===== IPL (23) =====
  {
    question: "Which team won the IPL 2026 title, becoming back-to-back champions?",
    options: ["Gujarat Titans", "Mumbai Indians", "Royal Challengers Bengaluru", "Chennai Super Kings"],
    correct: 2,
    fact: "🏆 RCB beat Gujarat Titans by 5 wickets in the IPL 2026 final at Narendra Modi Stadium, Ahmedabad — their second straight title. Virat Kohli's unbeaten 75 off 42 balls sealed the chase.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2025 title — their first ever IPL trophy?",
    options: ["Mumbai Indians", "Punjab Kings", "Royal Challengers Bengaluru", "Kolkata Knight Riders"],
    correct: 2,
    fact: "🏆 RCB won their first ever IPL title in 2025 after 17 years of heartbreak, beating Punjab Kings by 6 runs in the final at Ahmedabad. Captain was Rajat Patidar.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2024 title?",
    options: ["Mumbai Indians", "Sunrisers Hyderabad", "Kolkata Knight Riders", "Rajasthan Royals"],
    correct: 2,
    fact: "🏆 KKR won their third IPL title in 2024, defeating Sunrisers Hyderabad by 8 wickets in the final at Chepauk, Chennai. Shreyas Iyer was the captain.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2023 title?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Gujarat Titans", "Rajasthan Royals"],
    correct: 1,
    fact: "🦁 Chennai Super Kings won their 5th IPL title in 2023 under MS Dhoni, defeating Gujarat Titans by 5 wickets in the final at Ahmedabad.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who has scored the most runs in IPL history?",
    options: ["Rohit Sharma", "David Warner", "Shikhar Dhawan", "Virat Kohli"],
    correct: 3,
    fact: "👑 Virat Kohli is the all-time leading run-scorer in IPL history with over 9,000 runs (as of 2026 — Kohli is still active, so this number keeps growing). He also won the Orange Cap in IPL 2024 with 741 runs.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who has taken the most wickets in IPL history?",
    options: ["Lasith Malinga", "Amit Mishra", "Dwayne Bravo", "Yuzvendra Chahal"],
    correct: 3,
    fact: "🌀 Yuzvendra Chahal is the highest wicket-taker in IPL history, surpassing Dwayne Bravo's record during IPL 2023.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "In which year was the IPL first played?",
    options: ["2006", "2007", "2008", "2009"],
    correct: 2,
    fact: "🏏 The first IPL season was played in 2008. Rajasthan Royals won the inaugural title under Shane Warne.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Who captained Rajasthan Royals to win the very first IPL title in 2008?",
    options: ["Rahul Dravid", "Shane Warne", "Graeme Smith", "MS Dhoni"],
    correct: 1,
    fact: "🐍 Shane Warne led Rajasthan Royals to the 2008 IPL title — considered one of the greatest captaincy performances in T20 history.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Which player scored 175* in an IPL match — the highest individual score in IPL history?",
    options: ["Chris Gayle", "AB de Villiers", "Brendon McCullum", "David Warner"],
    correct: 0,
    fact: "💣 Chris Gayle scored 175* off just 66 balls for RCB against PWI in 2013 — the highest individual score in IPL history.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "What is the name of RCB's home stadium?",
    options: ["Wankhede Stadium", "Eden Gardens", "M Chinnaswamy Stadium", "Arun Jaitley Stadium"],
    correct: 2,
    fact: "🏟️ Royal Challengers Bengaluru play at M Chinnaswamy Stadium in Bengaluru — one of the most high-scoring venues in the IPL.",
    era: "General",
    category: "ipl"
  },
  {
    question: "How many IPL titles have Mumbai Indians won?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    fact: "🏆 Mumbai Indians have won 5 IPL titles — in 2013, 2015, 2017, 2019 and 2020. They are joint-most successful along with Chennai Super Kings.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2024?",
    options: ["Rohit Sharma", "Travis Head", "Virat Kohli", "KL Rahul"],
    correct: 2,
    fact: "🧡 Virat Kohli won the Orange Cap in IPL 2024 with 741 runs from 15 matches.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "What does IPL stand for?",
    options: ["India Premier League", "Indian Premier League", "International Premier League", "India Power League"],
    correct: 1,
    fact: "🏏 IPL stands for Indian Premier League. It was founded by the BCCI in 2008 and is now the richest cricket league in the world.",
    era: "General",
    category: "ipl"
  },
  {
    question: "Which IPL team is based in Hyderabad?",
    options: ["Rajasthan Royals", "Punjab Kings", "Sunrisers Hyderabad", "Lucknow Super Giants"],
    correct: 2,
    fact: "☀️ Sunrisers Hyderabad play their home matches at Rajiv Gandhi International Cricket Stadium in Uppal, Hyderabad.",
    era: "General",
    category: "ipl"
  },
  {
    question: "Who captained RCB to their first ever IPL title in 2025?",
    options: ["Virat Kohli", "Faf du Plessis", "Rajat Patidar", "Glenn Maxwell"],
    correct: 2,
    fact: "🌟 Rajat Patidar captained RCB to their first IPL title in 2025 — ending 17 years of heartbreak for RCB fans around the world.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which was the first IPL match ever played and where?",
    options: ["MI vs CSK at Wankhede", "RCB vs KKR at Chinnaswamy", "RR vs CSK at Chepauk", "KKR vs SRH at Eden Gardens"],
    correct: 1,
    fact: "🏟️ The first ever IPL match was played at M Chinnaswamy Stadium, Bengaluru on 18 April 2008 between RCB and KKR. Brendon McCullum scored 158* for KKR.",
    era: "2000s",
    category: "ipl"
  },

  {
    question: "Who holds the record for the most sixes in IPL history?",
    options: ["Rohit Sharma", "MS Dhoni", "Chris Gayle", "Virat Kohli"],
    correct: 2,
    fact: "💥 Chris Gayle hit 357 sixes in 142 IPL matches (2009–2021) — the most by any batsman in IPL history. Rohit Sharma is the closest active chaser.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who scored the fastest century in IPL history — in just 30 balls?",
    options: ["AB de Villiers", "Chris Gayle", "Andre Russell", "David Warner"],
    correct: 1,
    fact: "⚡ Chris Gayle reached his century off just 30 balls during his famous 175* for RCB against Pune Warriors India in 2013 — still the fastest IPL century over a decade later.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Along with Rohit Sharma, which captain shares the record for most IPL titles won (5 each)?",
    options: ["MS Dhoni", "Virat Kohli", "Gautam Gambhir", "Rahul Dravid"],
    correct: 0,
    fact: "🏆 MS Dhoni (Chennai Super Kings) and Rohit Sharma (Mumbai Indians) have each won 5 IPL titles as captain — the joint-most in IPL history.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team holds the record for the highest team total in a single IPL innings?",
    options: ["Royal Challengers Bengaluru", "Chennai Super Kings", "Sunrisers Hyderabad", "Mumbai Indians"],
    correct: 2,
    fact: "🔥 Sunrisers Hyderabad scored 287/3 against RCB on 15 April 2024 — the highest team total in IPL history, built on Travis Head's 102 and Heinrich Klaasen's 67.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who took the first ever hat-trick in IPL history?",
    options: ["Lakshmipathy Balaji", "Irfan Pathan", "Harbhajan Singh", "Zaheer Khan"],
    correct: 0,
    fact: "🎯 Lakshmipathy Balaji took the first IPL hat-trick in 2008, playing for Chennai Super Kings against Kings XI Punjab, finishing with figures of 5/24.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2024?",
    options: ["Jasprit Bumrah", "Yuzvendra Chahal", "Harshal Patel", "Mohammed Shami"],
    correct: 2,
    fact: "🎳 Harshal Patel won the IPL 2024 Purple Cap with 24 wickets for Punjab Kings — his second Purple Cap after also winning it with RCB in 2021.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "How many teams took part in the very first IPL season in 2008?",
    options: ["6", "8", "10", "12"],
    correct: 1,
    fact: "🏏 8 franchises played in the inaugural IPL season in 2008, each playing every other team home and away in a round-robin league stage.",
    era: "2000s",
    category: "ipl"
  },

  // ===== TEST CRICKET (26) =====
  {
    question: "Who holds the record for the highest individual score in Test cricket with 400*?",
    options: ["Sachin Tendulkar", "Matthew Hayden", "Virender Sehwag", "Brian Lara"],
    correct: 3,
    fact: "🦁 Brian Lara scored 400* against England in Antigua in April 2004 — the highest individual score in Test cricket history.",
    era: "2000s",
    category: "test"
  },
  {
    question: "Who is the only bowler to take all 10 wickets in a Test innings for India?",
    options: ["Kapil Dev", "Harbhajan Singh", "Anil Kumble", "Bishan Singh Bedi"],
    correct: 2,
    fact: "🎳 Anil Kumble took 10 wickets for 74 runs against Pakistan in Delhi in February 1999 — only the second bowler ever to achieve this in Tests.",
    era: "1990s",
    category: "test"
  },
  {
    question: "How many days does a Test match last at most?",
    options: ["3 days", "4 days", "5 days", "7 days"],
    correct: 2,
    fact: "📜 A Test match is played over a maximum of 5 days with each team getting 2 innings. It is cricket's longest and most prestigious format.",
    era: "General",
    category: "test"
  },
  {
    question: "Who has scored the most runs in Test cricket history?",
    options: ["Ricky Ponting", "Rahul Dravid", "Sachin Tendulkar", "Kumar Sangakkara"],
    correct: 2,
    fact: "👑 Sachin Tendulkar scored 15,921 runs in 200 Test matches — the most by any batsman in Test cricket history.",
    era: "2000s",
    category: "test"
  },
  {
    question: "Who has taken the most wickets in Test cricket history with 800 wickets?",
    options: ["Shane Warne", "Glenn McGrath", "Anil Kumble", "Muttiah Muralitharan"],
    correct: 3,
    fact: "🌀 Muttiah Muralitharan of Sri Lanka retired with 800 Test wickets — a record that has stood since 2010.",
    era: "2010s",
    category: "test"
  },
  {
    question: "Which Indian batsman was known as 'The Wall' for his defensive technique?",
    options: ["Sachin Tendulkar", "Sunil Gavaskar", "VVS Laxman", "Rahul Dravid"],
    correct: 3,
    fact: "🧱 Rahul Dravid earned the nickname 'The Wall' and retired with 13,288 Test runs — the second highest by an Indian after Sachin.",
    era: "2000s",
    category: "test"
  },
  {
    question: "In which city was the famous 2001 Test where India won after following on against Australia?",
    options: ["Mumbai", "Chennai", "Kolkata", "Delhi"],
    correct: 2,
    fact: "🏟️ The famous 2001 Test was at Eden Gardens, Kolkata. VVS Laxman scored 281* and India won after following on — one of cricket's greatest upsets.",
    era: "2000s",
    category: "test"
  },
  {
    question: "Which batsman scored 281* in the famous 2001 Kolkata Test against Australia?",
    options: ["Sachin Tendulkar", "Rahul Dravid", "Sourav Ganguly", "VVS Laxman"],
    correct: 3,
    fact: "🌟 VVS Laxman's 281* in the 2001 Eden Gardens Test is one of the greatest innings ever. India won after following on.",
    era: "2000s",
    category: "test"
  },
  {
    question: "Which country did India play their very first Test match against in 1932?",
    options: ["Australia", "England", "South Africa", "West Indies"],
    correct: 1,
    fact: "🇬🇧 India played their first ever Test match against England at Lord's in June 1932. CK Nayudu was the captain.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Who scored 309 runs in a single day of Test cricket — a world record?",
    options: ["Sachin Tendulkar", "Don Bradman", "Virender Sehwag", "Brian Lara"],
    correct: 1,
    fact: "🐐 Don Bradman scored 309 runs in a single day against England in Leeds in 1930 — a record that has never been broken.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "What is a 'follow-on' in Test cricket?",
    options: ["When a team bats again immediately after being bowled out", "When a fielder follows the ball to the boundary", "When a bowler bowls two overs in a row", "When a batsman crosses for a run"],
    correct: 0,
    fact: "📖 A follow-on happens when the team batting second scores 200 runs fewer than the first team. The leading team can make them bat again immediately.",
    era: "General",
    category: "test"
  },
  {
    question: "Sunil Gavaskar was the first batsman to score how many Test centuries?",
    options: ["20", "25", "29", "34"],
    correct: 3,
    fact: "🇮🇳 Sunil Gavaskar was the first batsman to score 34 Test centuries — a world record at the time he retired in 1987.",
    era: "1970s-80s",
    category: "test"
  },
  {
    question: "Who was the first batsman to score 10,000 runs in Test cricket?",
    options: ["Sunil Gavaskar", "Allan Border", "Sachin Tendulkar", "Brian Lara"],
    correct: 0,
    fact: "🇮🇳 Sunil Gavaskar was the first to reach 10,000 Test runs. He retired with 10,122 runs from 125 Tests.",
    era: "1970s-80s",
    category: "test"
  },
  {
    question: "How many runs separate teams for a follow-on to be enforced in a 5-day Test?",
    options: ["100 runs", "150 runs", "200 runs", "250 runs"],
    correct: 2,
    fact: "📜 In a 5-day Test, if the team batting second is 200 or more runs behind, the opposition can enforce the follow-on.",
    era: "General",
    category: "test"
  },
  {
    question: "Who scored India's first ever Test century?",
    options: ["Vijay Merchant", "CK Nayudu", "Lala Amarnath", "Vijay Hazare"],
    correct: 2,
    fact: "🏏 Lala Amarnath scored India's first Test century — 118 against England in Bombay in December 1933.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Which Indian bowler has taken the most Test wickets ever?",
    options: ["Kapil Dev", "Harbhajan Singh", "Zaheer Khan", "Anil Kumble"],
    correct: 3,
    fact: "🌀 Anil Kumble is India's highest wicket-taker in Tests with 619 wickets — the fourth highest in the history of Test cricket (behind Muralitharan, Warne, and Anderson).",
    era: "1990s",
    category: "test"
  },
  {
    question: "In how many innings does each team bat in a Test match?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    fact: "📜 Each team gets 2 innings in a Test match. That is why Tests can last up to 5 days — they are the ultimate test of skill and endurance.",
    era: "General",
    category: "test"
  },
  {
    question: "Which Indian cricketer scored a century on his Test debut at Lord's in 1996?",
    options: ["Sachin Tendulkar", "Virat Kohli", "Sourav Ganguly", "Rahul Dravid"],
    correct: 2,
    fact: "🎩 Sourav Ganguly scored 131 on his Test debut at Lord's in 1996 — one of the most celebrated debut innings in Indian cricket history.",
    era: "1990s",
    category: "test"
  },
  {
    question: "How many Test centuries did Sachin Tendulkar score in his career?",
    options: ["91", "100", "51", "49"],
    correct: 2,
    fact: "🏏 Sachin scored 51 Test centuries and 49 ODI centuries — 100 international hundreds in total. A record no one has come close to.",
    era: "2010s",
    category: "test"
  },

  {
    question: "Who holds the record for the best bowling figures in a Test match — 19 wickets in one game?",
    options: ["Muttiah Muralitharan", "Jim Laker", "Anil Kumble", "Shane Warne"],
    correct: 1,
    fact: "🎳 England's Jim Laker took 19 wickets for 90 runs in a single Test against Australia at Old Trafford in 1956 — a record that has never been threatened since.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "How many Test matches have ever ended in a tie?",
    options: ["Zero", "1", "2", "5"],
    correct: 2,
    fact: "🤝 Only 2 Tests have ever been tied — Australia vs West Indies in 1960, and Australia vs India in 1986. Both involved Australia.",
    era: "General",
    category: "test"
  },
  {
    question: "What is Don Bradman's career Test batting average — the most famous number in cricket?",
    options: ["89.94", "99.94", "109.94", "94.99"],
    correct: 1,
    fact: "🐐 Don Bradman retired with a Test average of 99.94 — he needed just 4 more runs in his final innings to reach 100, but was bowled for a duck instead.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Who scored 319 against South Africa in 2008 — the highest Test score by an Indian batsman?",
    options: ["Sachin Tendulkar", "Virender Sehwag", "Rahul Dravid", "VVS Laxman"],
    correct: 1,
    fact: "⚡ Virender Sehwag scored 319 off just 304 balls against South Africa in Chennai in 2008 — the fastest Test triple century ever and the highest individual score by an Indian in Tests.",
    era: "2000s",
    category: "test"
  },
  {
    question: "Who scored the fastest century in Test cricket history — off just 54 balls?",
    options: ["Viv Richards", "Misbah-ul-Haq", "Brendon McCullum", "Ben Stokes"],
    correct: 2,
    fact: "⚡ Brendon McCullum reached 100 off 54 balls against Australia in his final Test, in Christchurch in 2016 — two balls faster than the previous record.",
    era: "2010s",
    category: "test"
  },
  {
    question: "Which team won the first ever World Test Championship final in 2021?",
    options: ["India", "New Zealand", "Australia", "England"],
    correct: 1,
    fact: "🏆 New Zealand won the inaugural World Test Championship, beating India by 8 wickets at the Rose Bowl, Southampton in 2021, under captain Kane Williamson.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Which team won the World Test Championship final in 2025, beating Australia at Lord's?",
    options: ["India", "England", "South Africa", "New Zealand"],
    correct: 2,
    fact: "🏆 South Africa won the 2025 World Test Championship final at Lord's, defeating Australia under captain Temba Bavuma — their first WTC title.",
    era: "2020s",
    category: "test"
  },

  // ===== ODI CRICKET (22) =====
  {
    question: "Who scored the first ever double century (200*) in ODI cricket?",
    options: ["Rohit Sharma", "Martin Guptill", "Virender Sehwag", "Sachin Tendulkar"],
    correct: 3,
    fact: "👑 Sachin Tendulkar scored 200* against South Africa in Gwalior on 24 February 2010 — the first ODI double century in history.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who holds the record for the highest individual score in ODI cricket with 264?",
    options: ["Martin Guptill", "Chris Gayle", "Virender Sehwag", "Rohit Sharma"],
    correct: 3,
    fact: "💥 Rohit Sharma scored 264 against Sri Lanka in Kolkata on 13 November 2014 — the highest individual score in ODI cricket history.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which country won the first ever Cricket World Cup in 1975?",
    options: ["Australia", "India", "West Indies", "England"],
    correct: 2,
    fact: "🏆 West Indies won the first Cricket World Cup in 1975 at Lord's, London. Clive Lloyd scored a magnificent century in the final.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "In which year did India win their first Cricket World Cup?",
    options: ["1975", "1979", "1983", "1987"],
    correct: 2,
    fact: "🇮🇳 India won the 1983 World Cup at Lord's under Kapil Dev — one of sport's greatest ever upsets. India beat the mighty West Indies in the final.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who scored the most runs in a single ODI World Cup tournament — 648 runs in 2019?",
    options: ["Sachin Tendulkar", "Rohit Sharma", "David Warner", "Martin Guptill"],
    correct: 1,
    fact: "🏆 Rohit Sharma scored 648 runs in the 2019 ODI World Cup including 5 centuries — the most by any batsman in a single World Cup edition.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which team won the 2023 ODI World Cup held in India?",
    options: ["India", "Australia", "South Africa", "New Zealand"],
    correct: 1,
    fact: "🏆 Australia won the 2023 ODI World Cup, defeating host nation India in the final at Narendra Modi Stadium, Ahmedabad.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Who captained India in the 1983 World Cup winning team?",
    options: ["Sunil Gavaskar", "Dilip Vengsarkar", "Kapil Dev", "Mohinder Amarnath"],
    correct: 2,
    fact: "🇮🇳 Kapil Dev captained India in 1983. His unbeaten 175 against Zimbabwe in the group stage is one of cricket's greatest ever innings.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "How many players are in a cricket team?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    fact: "🏏 Each cricket team has 11 players. A 12th man can field as a substitute but cannot bat or bowl.",
    era: "General",
    category: "odi"
  },
  {
    question: "What is a 'Duckworth-Lewis' result in cricket?",
    options: ["A tie that goes to a super over", "A result calculated by a formula when rain interrupts an ODI", "When both teams score the same runs", "A method of selecting the playing XI"],
    correct: 1,
    fact: "🌧️ The Duckworth-Lewis-Stern method calculates revised targets when rain interrupts limited-overs matches. It was introduced in 1997.",
    era: "General",
    category: "odi"
  },
  {
    question: "Which Indian bowler took the most wickets in the 2011 World Cup?",
    options: ["Harbhajan Singh", "Zaheer Khan", "Munaf Patel", "Ashish Nehra"],
    correct: 1,
    fact: "🎳 Zaheer Khan was India's leading wicket-taker in the 2011 World Cup with 21 wickets — joint highest wicket-taker of the entire tournament.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Where was the 2011 ODI World Cup final played?",
    options: ["Eden Gardens, Kolkata", "M Chinnaswamy, Bengaluru", "Wankhede Stadium, Mumbai", "Feroz Shah Kotla, Delhi"],
    correct: 2,
    fact: "🏟️ The 2011 World Cup final between India and Sri Lanka was played at Wankhede Stadium, Mumbai on 2 April 2011.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which country hosted the 2011 ODI World Cup that India won?",
    options: ["England", "Australia", "India, Sri Lanka and Bangladesh", "South Africa"],
    correct: 2,
    fact: "🏏 The 2011 World Cup was co-hosted by India, Sri Lanka and Bangladesh. The final was played at Wankhede Stadium, Mumbai.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who was named Player of the Tournament in the 2011 ODI World Cup?",
    options: ["MS Dhoni", "Sachin Tendulkar", "Yuvraj Singh", "Zaheer Khan"],
    correct: 2,
    fact: "🌟 Yuvraj Singh was Player of the Tournament in 2011 — he scored 362 runs AND took 15 wickets. A truly legendary all-round performance.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who hit the winning six in the 2011 ODI World Cup final?",
    options: ["Virat Kohli", "Yuvraj Singh", "Gautam Gambhir", "MS Dhoni"],
    correct: 3,
    fact: "🎯 MS Dhoni hit the winning six off Nuwan Kulasekara to seal India's 2011 World Cup victory. He finished unbeaten on 91.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who scored the fastest century in ODI cricket history (off 31 balls)?",
    options: ["Shahid Afridi", "Chris Gayle", "AB de Villiers", "Virender Sehwag"],
    correct: 2,
    fact: "⚡ AB de Villiers scored 100 off just 31 balls against West Indies on 18 January 2015 in Johannesburg.",
    era: "2010s",
    category: "odi"
  },

  {
    question: "Where and when was the first ever ODI match played?",
    options: ["Lord's, 1971", "Melbourne, 1971", "Melbourne, 1975", "Sydney, 1971"],
    correct: 1,
    fact: "🏏 The first ODI was played between Australia and England at the MCG on 5 January 1971 — a 40-over-a-side match arranged after rain washed out a Test match.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who holds the record for the most ODI centuries in history?",
    options: ["Sachin Tendulkar", "Rohit Sharma", "Virat Kohli", "Ricky Ponting"],
    correct: 2,
    fact: "👑 Virat Kohli has 54 ODI centuries, surpassing Sachin Tendulkar's long-standing record of 49 (as of 2026 — Kohli is still active in ODIs, so this number keeps growing).",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Which team won the 2015 Cricket World Cup, held in Australia and New Zealand?",
    options: ["New Zealand", "India", "Australia", "South Africa"],
    correct: 2,
    fact: "🏆 Australia won the 2015 World Cup, beating New Zealand by 7 wickets in the final at the MCG — their fifth World Cup title.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which team won the ICC Champions Trophy 2025?",
    options: ["New Zealand", "India", "Australia", "England"],
    correct: 1,
    fact: "🏆 India won the Champions Trophy 2025, beating New Zealand by 4 wickets in the final in Dubai — their third Champions Trophy title, and the only team to go through the tournament unbeaten.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Along with Clive Lloyd, which captain has won 2 Cricket World Cups?",
    options: ["Ricky Ponting", "Steve Waugh", "Kapil Dev", "MS Dhoni"],
    correct: 0,
    fact: "🏆 Ricky Ponting captained Australia to World Cup titles in 2003 and 2007 — matching Clive Lloyd's West Indies, who won in 1975 and 1979.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Who holds the record for the best bowling figures in an ODI innings — 8 wickets for 19 runs?",
    options: ["Shahid Afridi", "Chaminda Vaas", "Glenn McGrath", "Muttiah Muralitharan"],
    correct: 1,
    fact: "🎳 Chaminda Vaas took 8/19 for Sri Lanka against Zimbabwe in 2001 — still the best bowling figures in ODI history, and no one else has taken 8 wickets in an ODI innings since.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Which team won the dramatic 2019 Cricket World Cup final on boundary count?",
    options: ["New Zealand", "England", "Australia", "India"],
    correct: 1,
    fact: "🏆 England won the 2019 World Cup final against New Zealand after the match — and the Super Over — both ended in ties, with England winning on the boundary countback rule.",
    era: "2010s",
    category: "odi"
  },

  // ===== T20 CRICKET (22) =====
  {
    question: "Which country has won the most T20 World Cup titles as of June 2026?",
    options: ["West Indies", "England", "India", "Australia"],
    correct: 2,
    fact: "🇮🇳 India leads all teams with 3 T20 World Cup titles — won in 2007, 2024 and 2026. They are the first team ever to defend the T20 World Cup.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2026?",
    options: ["England", "Australia", "New Zealand", "India"],
    correct: 3,
    fact: "🏆 India won the T20 World Cup 2026, beating New Zealand in the final at Narendra Modi Stadium, Ahmedabad. It was India's third T20 World Cup title.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who captained India in the T20 World Cup 2026?",
    options: ["Rohit Sharma", "Virat Kohli", "Suryakumar Yadav", "Jasprit Bumrah"],
    correct: 2,
    fact: "🌟 Suryakumar Yadav captained India to the T20 World Cup 2026 title, with Sanju Samson named Player of the Tournament.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2024?",
    options: ["England", "Australia", "South Africa", "India"],
    correct: 3,
    fact: "🇮🇳 India won the T20 World Cup 2024 in the West Indies and USA, defeating South Africa in the final under Rohit Sharma.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "India won the ICC T20 World Cup 2024. Who was the captain?",
    options: ["Virat Kohli", "Rohit Sharma", "KL Rahul", "Hardik Pandya"],
    correct: 1,
    fact: "🇮🇳 Rohit Sharma captained India to win the T20 World Cup 2024 in the West Indies and USA. India beat South Africa in the final.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which country won the inaugural ICC T20 World Cup in 2007?",
    options: ["Pakistan", "Australia", "India", "Sri Lanka"],
    correct: 2,
    fact: "🏆 India won the first T20 World Cup in South Africa in 2007 under MS Dhoni, beating Pakistan in a thrilling final by 5 runs.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who captained India to victory in the inaugural ICC T20 World Cup in 2007?",
    options: ["Sourav Ganguly", "Rahul Dravid", "Sachin Tendulkar", "MS Dhoni"],
    correct: 3,
    fact: "🏆 MS Dhoni captained a young India team to win the first T20 World Cup in South Africa in 2007.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who took the last wicket to win India the 2007 T20 World Cup?",
    options: ["Irfan Pathan", "RP Singh", "Harbhajan Singh", "Joginder Sharma"],
    correct: 3,
    fact: "🎳 MS Dhoni gave the last over to Joginder Sharma — an unknown pacer. Misbah-ul-Haq was caught trying a scoop shot. India won by 5 runs.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "How many overs does each team face in a T20 match?",
    options: ["10 overs", "15 overs", "20 overs", "25 overs"],
    correct: 2,
    fact: "⚡ Each team faces exactly 20 overs in a T20 match. This format was designed to make cricket faster and more exciting for all audiences.",
    era: "General",
    category: "t20"
  },
  {
    question: "Who scored the first century in T20 World Cup history?",
    options: ["Chris Gayle", "Brendon McCullum", "Yuvraj Singh", "Kevin Pietersen"],
    correct: 0,
    fact: "💣 Chris Gayle scored the first century in T20 World Cup history — 117 against South Africa in the 2007 T20 World Cup.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who did Yuvraj Singh hit for 6 sixes in one over in the 2007 T20 World Cup?",
    options: ["Andrew Flintoff", "Kevin Pietersen", "Stuart Broad", "Dimitri Mascarenhas"],
    correct: 2,
    fact: "💥 Yuvraj Singh hit Stuart Broad for 6 sixes in one over in the 2007 T20 World Cup against England — one of cricket's most iconic moments.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Where was the T20 World Cup 2024 held?",
    options: ["England and Ireland", "Australia and New Zealand", "West Indies and USA", "India and Sri Lanka"],
    correct: 2,
    fact: "🌍 The 2024 T20 World Cup was co-hosted by West Indies and USA — the first time the USA hosted a major cricket tournament.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Where was the T20 World Cup 2026 held?",
    options: ["England and Ireland", "Australia and New Zealand", "West Indies and USA", "India and Sri Lanka"],
    correct: 3,
    fact: "🇮🇳 The 2026 T20 World Cup was co-hosted by India and Sri Lanka. India won as hosts — breaking the host nation curse that had lasted 19 years.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who won the Player of the Tournament award in the T20 World Cup 2024?",
    options: ["Rohit Sharma", "Virat Kohli", "Hardik Pandya", "Jasprit Bumrah"],
    correct: 3,
    fact: "🌟 Jasprit Bumrah won Player of the Tournament in T20 World Cup 2024. He was India's most important bowler throughout the tournament.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament in the T20 World Cup 2026?",
    options: ["Suryakumar Yadav", "Jasprit Bumrah", "Sanju Samson", "Varun Chakravarthy"],
    correct: 2,
    fact: "🌟 Sanju Samson was named Player of the Tournament in the T20 World Cup 2026, playing a key role in India's historic back-to-back title wins.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "What was the venue of the T20 World Cup 2024 final?",
    options: ["Sabina Park, Jamaica", "Kensington Oval, Barbados", "Brian Lara Stadium, Trinidad", "Daren Sammy Stadium, St Lucia"],
    correct: 1,
    fact: "🏟️ The T20 World Cup 2024 final between India and South Africa was played at Kensington Oval in Bridgetown, Barbados.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "In the 2007 T20 World Cup, India and Pakistan played a group stage tie. How was the winner decided?",
    options: ["Super over", "Bowl out", "Toss of a coin", "Run rate"],
    correct: 1,
    fact: "🎳 The India vs Pakistan group match in 2007 was tied and decided by a bowl-out — like a penalty shootout in football. India won 3–0.",
    era: "2000s",
    category: "t20"
  },

  {
    question: "Which team won the 2021 T20 World Cup, their first ever T20 World Cup title?",
    options: ["England", "New Zealand", "Australia", "Pakistan"],
    correct: 2,
    fact: "🏆 Australia won their maiden T20 World Cup title in 2021, beating New Zealand by 8 wickets in the final in Dubai.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which team won the 2022 T20 World Cup, beating Pakistan in the final at the MCG?",
    options: ["India", "England", "New Zealand", "South Africa"],
    correct: 1,
    fact: "🏆 England beat Pakistan by 5 wickets in the 2022 T20 World Cup final at the MCG, becoming the first team to hold both the ODI and T20 World Cup titles at once.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which two teams played the first ever men's T20 International in 2005?",
    options: ["India and Pakistan", "England and Australia", "New Zealand and Australia", "South Africa and England"],
    correct: 2,
    fact: "🏏 The first men's T20I was played between New Zealand and Australia at Eden Park, Auckland on 17 February 2005. Australia won by 44 runs.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Virat Kohli is the only player to win Player of the Tournament at the T20 World Cup twice. In which two years?",
    options: ["2007 and 2014", "2014 and 2016", "2016 and 2022", "2012 and 2016"],
    correct: 1,
    fact: "🌟 Virat Kohli won Player of the Tournament at the T20 World Cup in both 2014 and 2016 — no one else has won it more than once.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Rohit Sharma retired from T20Is holding the record for most T20I centuries, tied with which Australian?",
    options: ["David Warner", "Glenn Maxwell", "Steve Smith", "Aaron Finch"],
    correct: 1,
    fact: "💥 Rohit Sharma and Glenn Maxwell are tied with 5 T20I centuries each — the most by any batsman. Rohit's record is now final since he retired from T20Is after India's 2024 T20 World Cup win.",
    era: "2020s",
    category: "t20"
  },

  // ===== GENERAL CRICKET (9) =====
  {
    question: "What does 'LBW' stand for in cricket?",
    options: ["Leg Before Wicket", "Left Ball Wide", "Leg Ball Wide", "Left Before Wicket"],
    correct: 0,
    fact: "📖 LBW means the ball struck the batsman's leg in line with the stumps and would have gone on to hit them.",
    era: "General",
    category: "general"
  },
  {
    question: "How many balls are bowled in one over in cricket?",
    options: ["4", "5", "6", "8"],
    correct: 2,
    fact: "🏏 One over = 6 legal deliveries. Extra deliveries are bowled for wides and no-balls.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'golden duck' in cricket?",
    options: ["Scoring exactly 50 runs", "Getting out on the very first ball for zero", "Hitting 4 sixes in one over", "Taking 5 wickets in an innings"],
    correct: 1,
    fact: "🦆 A golden duck means you were dismissed off the very first ball you faced without scoring a single run.",
    era: "General",
    category: "general"
  },
  {
    question: "Which Indian cricketer is nicknamed 'Hitman'?",
    options: ["Virat Kohli", "KL Rahul", "Shikhar Dhawan", "Rohit Sharma"],
    correct: 3,
    fact: "💥 Rohit Sharma is called 'Hitman' for his explosive batting and ability to hit huge sixes effortlessly.",
    era: "2010s",
    category: "general"
  },
  {
    question: "What is the name of the largest cricket stadium in the world?",
    options: ["Eden Gardens, Kolkata", "MCG, Melbourne", "Lord's, London", "Narendra Modi Stadium, Ahmedabad"],
    correct: 3,
    fact: "🏟️ Narendra Modi Stadium in Ahmedabad has a capacity of over 1,32,000 — the largest cricket stadium in the world.",
    era: "General",
    category: "general"
  },
  {
    question: "What does DRS stand for in cricket?",
    options: ["Decision Review System", "Direct Run System", "Delivery Replay System", "Dismissal Review Standard"],
    correct: 0,
    fact: "📺 DRS stands for Decision Review System — technology used to review umpiring decisions. It was first trialled in Tests in 2008 and added to T20Is in 2017.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'maiden over' in cricket?",
    options: ["An over with a wicket in every ball", "An over in which no runs are scored off the bat", "A bowler's very first over in a match", "An over bowled entirely with no-balls"],
    correct: 1,
    fact: "🎯 A maiden over is one in which the batting side scores no runs off the bat during all 6 legal deliveries — a sign of total bowling control.",
    era: "General",
    category: "general"
  },
  {
    question: "In T20 cricket, how many overs make up the mandatory Powerplay at the start of an innings?",
    options: ["4 overs", "5 overs", "6 overs", "10 overs"],
    correct: 2,
    fact: "⚡ The first 6 overs of a T20 innings are the Powerplay, during which only 2 fielders are allowed outside the 30-yard circle — designed to encourage attacking batting early on.",
    era: "General",
    category: "general"
  },
  {
    question: "What does 'ODI' stand for in cricket?",
    options: ["One Day International", "Official Day Innings", "Over Delivery Innings", "One Delivery Inning"],
    correct: 0,
    fact: "🏏 ODI stands for One Day International — a limited-overs format where each team bats for a maximum of 50 overs.",
    era: "General",
    category: "general"
  }

];
