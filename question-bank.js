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

  // ===== IPL (93) =====
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

  {
    question: "Which team won the very first IPL title in 2008?",
    options: ["Chennai Super Kings", "Rajasthan Royals", "Mumbai Indians", "Kolkata Knight Riders"],
    correct: 1,
    fact: "🏆 Rajasthan Royals, led by Shane Warne, won the inaugural IPL 2008 title, beating Chennai Super Kings by 3 wickets in the final.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2008 final?",
    options: ["Chennai Super Kings", "Kings XI Punjab", "Delhi Daredevils", "Deccan Chargers"],
    correct: 0,
    fact: "🥈 Chennai Super Kings lost the IPL 2008 final to Rajasthan Royals by 3 wickets — their first of many final appearances.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2008, the tournament's first season?",
    options: ["Sachin Tendulkar", "Shaun Marsh", "Gautam Gambhir", "Shane Watson"],
    correct: 1,
    fact: "🧡 Shaun Marsh scored 616 runs for Kings XI Punjab to win the first ever IPL Orange Cap in 2008.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2008, the tournament's first season?",
    options: ["Sohail Tanvir", "Lasith Malinga", "Anil Kumble", "RP Singh"],
    correct: 0,
    fact: "🎳 Sohail Tanvir took 22 wickets for Rajasthan Royals to win the first ever IPL Purple Cap in 2008.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2009 title, held entirely in South Africa?",
    options: ["Royal Challengers Bangalore", "Deccan Chargers", "Chennai Super Kings", "Delhi Daredevils"],
    correct: 1,
    fact: "🏆 Deccan Chargers won IPL 2009, beating Royal Challengers Bangalore by 6 runs in the final at Johannesburg — a remarkable turnaround after finishing last in 2008.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2009 final?",
    options: ["Chennai Super Kings", "Royal Challengers Bangalore", "Mumbai Indians", "Rajasthan Royals"],
    correct: 1,
    fact: "🥈 Royal Challengers Bangalore lost the IPL 2009 final to Deccan Chargers by just 6 runs in Johannesburg.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2009?",
    options: ["Matthew Hayden", "Sachin Tendulkar", "Adam Gilchrist", "Shane Watson"],
    correct: 0,
    fact: "🧡 Matthew Hayden scored 572 runs for Chennai Super Kings to win the Orange Cap in IPL 2009.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2009?",
    options: ["RP Singh", "Anil Kumble", "Pragyan Ojha", "Lasith Malinga"],
    correct: 0,
    fact: "🎳 RP Singh took 23 wickets for Deccan Chargers to win the Purple Cap in IPL 2009.",
    era: "2000s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2010 title?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Deccan Chargers", "Kings XI Punjab"],
    correct: 1,
    fact: "🏆 Chennai Super Kings won their first IPL title in 2010, beating Mumbai Indians by 22 runs in the final at Navi Mumbai.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2010 final?",
    options: ["Royal Challengers Bangalore", "Mumbai Indians", "Deccan Chargers", "Kolkata Knight Riders"],
    correct: 1,
    fact: "🥈 Mumbai Indians lost the IPL 2010 final to Chennai Super Kings by 22 runs, with Sachin Tendulkar top-scoring for MI with 48.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won both the Orange Cap and the Player of the Series award in IPL 2010?",
    options: ["MS Dhoni", "Suresh Raina", "Sachin Tendulkar", "Chris Gayle"],
    correct: 2,
    fact: "🧡 Sachin Tendulkar scored 618 runs for Mumbai Indians to win the Orange Cap in IPL 2010, and was also named Player of the Series.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2010?",
    options: ["Pragyan Ojha", "Lasith Malinga", "Zaheer Khan", "R Vinay Kumar"],
    correct: 0,
    fact: "🎳 Pragyan Ojha took 21 wickets for Deccan Chargers to win the Purple Cap in IPL 2010.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2011 title, their second in a row?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bangalore", "Kolkata Knight Riders"],
    correct: 1,
    fact: "🏆 Chennai Super Kings won back-to-back IPL titles in 2011, beating Royal Challengers Bangalore by 58 runs in the final.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2011 final?",
    options: ["Royal Challengers Bangalore", "Mumbai Indians", "Kolkata Knight Riders", "Kings XI Punjab"],
    correct: 0,
    fact: "🥈 Royal Challengers Bangalore lost the IPL 2011 final to Chennai Super Kings by 58 runs.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2011?",
    options: ["Virat Kohli", "Chris Gayle", "Suresh Raina", "Gautam Gambhir"],
    correct: 1,
    fact: "🧡 Chris Gayle scored 608 runs for Royal Challengers Bangalore to win the Orange Cap in IPL 2011.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2011?",
    options: ["Lasith Malinga", "Dwayne Bravo", "Sunil Narine", "Morne Morkel"],
    correct: 0,
    fact: "🎳 Lasith Malinga took 28 wickets for Mumbai Indians to win the Purple Cap in IPL 2011.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2012 title, their first ever?",
    options: ["Chennai Super Kings", "Kolkata Knight Riders", "Delhi Daredevils", "Royal Challengers Bangalore"],
    correct: 1,
    fact: "🏆 Kolkata Knight Riders won their maiden IPL title in 2012, chasing down 191 to beat Chennai Super Kings by 5 wickets in the final, with Manvinder Bisla scoring 89.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2012 final?",
    options: ["Chennai Super Kings", "Delhi Daredevils", "Royal Challengers Bangalore", "Mumbai Indians"],
    correct: 0,
    fact: "🥈 Chennai Super Kings lost the IPL 2012 final to Kolkata Knight Riders by 5 wickets in Chennai.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2012, hitting an IPL-record 59 sixes along the way?",
    options: ["Chris Gayle", "Virat Kohli", "Gautam Gambhir", "Suresh Raina"],
    correct: 0,
    fact: "🧡 Chris Gayle scored 733 runs for Royal Challengers Bangalore to win the Orange Cap in IPL 2012, hitting a then-record 59 sixes in the season.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2012?",
    options: ["Morne Morkel", "Lasith Malinga", "Sunil Narine", "Ravichandran Ashwin"],
    correct: 0,
    fact: "🎳 Morne Morkel took 25 wickets for Delhi Daredevils to win the Purple Cap in IPL 2012.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2013 title?",
    options: ["Chennai Super Kings", "Mumbai Indians", "Rajasthan Royals", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🏆 Mumbai Indians won their first IPL title in 2013, beating Chennai Super Kings by 23 runs in the final.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2013 final?",
    options: ["Rajasthan Royals", "Chennai Super Kings", "Royal Challengers Bangalore", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🥈 Chennai Super Kings lost the IPL 2013 final to Mumbai Indians by 23 runs.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2013?",
    options: ["Michael Hussey", "Shane Watson", "Chris Gayle", "Virat Kohli"],
    correct: 0,
    fact: "🧡 Michael Hussey scored 733 runs for Chennai Super Kings to win the Orange Cap in IPL 2013.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2013?",
    options: ["Dwayne Bravo", "Ravichandran Ashwin", "Bhuvneshwar Kumar", "Jaydev Unadkat"],
    correct: 0,
    fact: "🎳 Dwayne Bravo took 32 wickets for Chennai Super Kings to win the Purple Cap in IPL 2013.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2014 title, played partly in the UAE due to the Indian general elections?",
    options: ["Kings XI Punjab", "Kolkata Knight Riders", "Chennai Super Kings", "Royal Challengers Bangalore"],
    correct: 1,
    fact: "🏆 Kolkata Knight Riders won their second IPL title in 2014, chasing down 199 to beat Kings XI Punjab by 3 wickets in the final at Bengaluru, with Manish Pandey named Man of the Match for his 94.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2014 final?",
    options: ["Chennai Super Kings", "Kings XI Punjab", "Mumbai Indians", "Rajasthan Royals"],
    correct: 1,
    fact: "🥈 Kings XI Punjab, who topped the points table all season, lost the IPL 2014 final to Kolkata Knight Riders by 3 wickets.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2014?",
    options: ["Robin Uthappa", "David Warner", "Virat Kohli", "Shikhar Dhawan"],
    correct: 0,
    fact: "🧡 Robin Uthappa scored 660 runs for Kolkata Knight Riders to win the Orange Cap in IPL 2014.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2014?",
    options: ["Mohit Sharma", "Bhuvneshwar Kumar", "Dwayne Bravo", "Sunil Narine"],
    correct: 0,
    fact: "🎳 Mohit Sharma took 23 wickets for Chennai Super Kings to win the Purple Cap in IPL 2014.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2015 title?",
    options: ["Chennai Super Kings", "Mumbai Indians", "Royal Challengers Bangalore", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🏆 Mumbai Indians won their second IPL title in 2015, beating Chennai Super Kings by 41 runs in the final at Eden Gardens, Kolkata.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2015 final?",
    options: ["Royal Challengers Bangalore", "Chennai Super Kings", "Sunrisers Hyderabad", "Rajasthan Royals"],
    correct: 1,
    fact: "🥈 Chennai Super Kings lost the IPL 2015 final to Mumbai Indians by 41 runs.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2015?",
    options: ["David Warner", "Virat Kohli", "AB de Villiers", "Ajinkya Rahane"],
    correct: 0,
    fact: "🧡 David Warner scored 562 runs for Sunrisers Hyderabad to win the Orange Cap in IPL 2015.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2015, for the second time?",
    options: ["Dwayne Bravo", "Ashish Nehra", "Imran Tahir", "Mohit Sharma"],
    correct: 0,
    fact: "🎳 Dwayne Bravo took 26 wickets for Chennai Super Kings to win his second IPL Purple Cap in 2015.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won its first-ever IPL title in 2016?",
    options: ["Gujarat Lions", "Sunrisers Hyderabad", "Royal Challengers Bangalore", "Rising Pune Supergiant"],
    correct: 1,
    fact: "🏆 Sunrisers Hyderabad won their maiden IPL title in 2016, beating Royal Challengers Bangalore by 8 runs in the final at Bengaluru.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2016 final?",
    options: ["Gujarat Lions", "Kolkata Knight Riders", "Royal Challengers Bangalore", "Delhi Daredevils"],
    correct: 2,
    fact: "🥈 Royal Challengers Bangalore lost the IPL 2016 final to Sunrisers Hyderabad by just 8 runs, despite Virat Kohli's 54.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2016 with 973 runs — still the most by any batsman in a single IPL season?",
    options: ["Virat Kohli", "David Warner", "AB de Villiers", "Gautam Gambhir"],
    correct: 0,
    fact: "🧡 Virat Kohli scored a record 973 runs for Royal Challengers Bangalore in IPL 2016 — still the most runs by any batsman in a single IPL season.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2016?",
    options: ["Bhuvneshwar Kumar", "Adam Zampa", "Ashish Nehra", "Jaydev Unadkat"],
    correct: 0,
    fact: "🎳 Bhuvneshwar Kumar took 23 wickets for Sunrisers Hyderabad to win the Purple Cap in IPL 2016.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2017 title by just 1 run — the narrowest margin in IPL final history?",
    options: ["Rising Pune Supergiant", "Mumbai Indians", "Kolkata Knight Riders", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🏆 Mumbai Indians won their third IPL title in 2017, beating Rising Pune Supergiant by just 1 run in the final — the closest margin in IPL final history.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2017 final, in their only season under that name?",
    options: ["Gujarat Lions", "Rising Pune Supergiant", "Delhi Daredevils", "Kings XI Punjab"],
    correct: 1,
    fact: "🥈 Rising Pune Supergiant lost the IPL 2017 final to Mumbai Indians by 1 run, in what was their final season before the franchise was dissolved.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2017?",
    options: ["David Warner", "Shikhar Dhawan", "Rohit Sharma", "Manoj Tiwary"],
    correct: 0,
    fact: "🧡 David Warner scored 641 runs for Sunrisers Hyderabad to win the Orange Cap in IPL 2017.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2017, becoming the only bowler to win it in back-to-back seasons?",
    options: ["Bhuvneshwar Kumar", "Jasprit Bumrah", "Mitchell McClenaghan", "Sandeep Sharma"],
    correct: 0,
    fact: "🎳 Bhuvneshwar Kumar took 26 wickets for Sunrisers Hyderabad to win the IPL 2017 Purple Cap, becoming the only bowler to win it in consecutive seasons (2016 and 2017).",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2018 title, their first since returning from a 2-year suspension?",
    options: ["Rajasthan Royals", "Chennai Super Kings", "Sunrisers Hyderabad", "Delhi Daredevils"],
    correct: 1,
    fact: "🏆 Chennai Super Kings won the IPL 2018 title in their first season back after a 2-year suspension, beating Sunrisers Hyderabad by 8 wickets in the final at Mumbai.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team was the runner-up in the IPL 2018 final?",
    options: ["Kolkata Knight Riders", "Sunrisers Hyderabad", "Royal Challengers Bangalore", "Kings XI Punjab"],
    correct: 1,
    fact: "🥈 Sunrisers Hyderabad lost the IPL 2018 final to Chennai Super Kings by 8 wickets.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap (most runs) in IPL 2018 despite being on the losing side in the final?",
    options: ["Kane Williamson", "Shikhar Dhawan", "Rishabh Pant", "AB de Villiers"],
    correct: 0,
    fact: "🧡 Kane Williamson scored 735 runs for Sunrisers Hyderabad to win the Orange Cap in IPL 2018, despite SRH losing the final.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap (most wickets) in IPL 2018?",
    options: ["Andrew Tye", "Rashid Khan", "Siddarth Kaul", "Jasprit Bumrah"],
    correct: 0,
    fact: "🎳 Andrew Tye took 24 wickets for Kings XI Punjab to win the Purple Cap in IPL 2018.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2019 title by the narrowest margin in any IPL final — just 1 run?",
    options: ["Chennai Super Kings", "Mumbai Indians", "Royal Challengers Bangalore", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🏆 Mumbai Indians beat Chennai Super Kings by 1 run in the IPL 2019 final at Hyderabad — the tightest margin of any IPL final — for their 4th title.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2019 final to Mumbai Indians by just 1 run?",
    options: ["Royal Challengers Bangalore", "Delhi Capitals", "Chennai Super Kings", "Kolkata Knight Riders"],
    correct: 2,
    fact: "🥈 Chennai Super Kings fell agonisingly short in the IPL 2019 final, losing to Mumbai Indians by 1 run despite needing just 9 off the last over.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2019 with 692 runs, in his comeback season after a ball-tampering ban?",
    options: ["Rohit Sharma", "KL Rahul", "David Warner", "Shikhar Dhawan"],
    correct: 2,
    fact: "🧡 David Warner scored 692 runs at an average of 69 to win the IPL 2019 Orange Cap for Sunrisers Hyderabad, returning straight to top form after his year-long ban.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2019 with 26 wickets, pipping Kagiso Rabada by a single scalp?",
    options: ["Jasprit Bumrah", "Dwayne Bravo", "Imran Tahir", "Deepak Chahar"],
    correct: 2,
    fact: "🎳 Imran Tahir took 26 wickets for Chennai Super Kings to win the IPL 2019 Purple Cap, edging out Kagiso Rabada by just one wicket.",
    era: "2010s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2020 title, played entirely in the UAE due to the COVID-19 pandemic?",
    options: ["Delhi Capitals", "Mumbai Indians", "Royal Challengers Bangalore", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🏆 Mumbai Indians beat Delhi Capitals by 5 wickets in Dubai to win the IPL 2020 title — their 5th, making them the most successful IPL franchise. The whole tournament was moved to the UAE because of COVID-19.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team reached its first-ever IPL final in 2020 but lost to Mumbai Indians?",
    options: ["Kings XI Punjab", "Sunrisers Hyderabad", "Delhi Capitals", "Royal Challengers Bangalore"],
    correct: 2,
    fact: "🥈 Delhi Capitals reached their maiden IPL final in 2020 under Shreyas Iyer but lost to Mumbai Indians by 5 wickets in Dubai.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2020 with 670 runs, including a then-record unbeaten 132 in a single innings?",
    options: ["Shikhar Dhawan", "David Warner", "KL Rahul", "Ishan Kishan"],
    correct: 2,
    fact: "🧡 KL Rahul scored 670 runs for Kings XI Punjab to win the IPL 2020 Orange Cap, including a 132* against RCB that was then the highest individual score by an Indian in the IPL.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2020 with 30 wickets for Delhi Capitals?",
    options: ["Jasprit Bumrah", "Trent Boult", "Kagiso Rabada", "Rahul Chahar"],
    correct: 2,
    fact: "🎳 Kagiso Rabada took 30 wickets for Delhi Capitals to win the IPL 2020 Purple Cap.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2021 title, their 4th, after the season was suspended mid-tournament and resumed months later in the UAE?",
    options: ["Delhi Capitals", "Kolkata Knight Riders", "Chennai Super Kings", "Royal Challengers Bangalore"],
    correct: 2,
    fact: "🏆 Chennai Super Kings beat Kolkata Knight Riders by 27 runs in Dubai to win the IPL 2021 title, their 4th, under MS Dhoni — after the season had been suspended in May 2021 due to a COVID outbreak in the bio-bubble and resumed in the UAE that September.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2021 final to Chennai Super Kings by 27 runs?",
    options: ["Delhi Capitals", "Royal Challengers Bangalore", "Kolkata Knight Riders", "Punjab Kings"],
    correct: 2,
    fact: "🥈 Kolkata Knight Riders lost the IPL 2021 final to Chennai Super Kings by 27 runs in Dubai.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2021 in his breakout season, scoring 635 runs for Chennai Super Kings?",
    options: ["Faf du Plessis", "Shikhar Dhawan", "Ruturaj Gaikwad", "KL Rahul"],
    correct: 2,
    fact: "🧡 Ruturaj Gaikwad scored 635 runs to win the IPL 2021 Orange Cap in only his second IPL season, playing a key role in CSK's title win.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2021 with a then-record 32 wickets for Royal Challengers Bangalore?",
    options: ["Yuzvendra Chahal", "Mohammed Shami", "Harshal Patel", "Rashid Khan"],
    correct: 2,
    fact: "🎳 Harshal Patel took 32 wickets for Royal Challengers Bangalore to win the IPL 2021 Purple Cap — the most wickets by any bowler in a single IPL season.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team won the IPL 2022 title in their very first season in the tournament?",
    options: ["Lucknow Super Giants", "Royal Challengers Bangalore", "Gujarat Titans", "Punjab Kings"],
    correct: 2,
    fact: "🏆 Gujarat Titans, led by Hardik Pandya, beat Rajasthan Royals by 7 wickets in Ahmedabad to win the IPL 2022 title in their debut season — only the second team ever to win IPL in its first year, after Rajasthan Royals in 2008.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2022 final to debutants Gujarat Titans?",
    options: ["Royal Challengers Bangalore", "Lucknow Super Giants", "Rajasthan Royals", "Sunrisers Hyderabad"],
    correct: 2,
    fact: "🥈 Rajasthan Royals lost the IPL 2022 final to Gujarat Titans by 7 wickets in Ahmedabad.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2022 with 863 runs, then the second-highest single-season tally in IPL history?",
    options: ["KL Rahul", "Shubman Gill", "Quinton de Kock", "Jos Buttler"],
    correct: 3,
    fact: "🧡 Jos Buttler scored 863 runs for Rajasthan Royals to win the IPL 2022 Orange Cap, including a then-record 4 centuries in a single season, level with Virat Kohli's 2016 tally.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2022 with 27 wickets for Rajasthan Royals?",
    options: ["Prasidh Krishna", "Umran Malik", "Kagiso Rabada", "Yuzvendra Chahal"],
    correct: 3,
    fact: "🎳 Yuzvendra Chahal took 27 wickets for Rajasthan Royals to win the IPL 2022 Purple Cap.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2023 final to Chennai Super Kings by 5 wickets?",
    options: ["Rajasthan Royals", "Gujarat Titans", "Lucknow Super Giants", "Mumbai Indians"],
    correct: 1,
    fact: "🥈 Gujarat Titans lost the IPL 2023 final to Chennai Super Kings by 5 wickets in Ahmedabad, denying them back-to-back titles after winning in 2022.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2023 with 890 runs for Gujarat Titans?",
    options: ["Faf du Plessis", "Shubman Gill", "Yashasvi Jaiswal", "Devon Conway"],
    correct: 1,
    fact: "🧡 Shubman Gill scored 890 runs for Gujarat Titans to win the IPL 2023 Orange Cap, including a knock of 129 in Qualifier 2 — the highest individual score in an IPL playoff match.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2023 with 28 wickets for Gujarat Titans?",
    options: ["Rashid Khan", "Mohammed Shami", "Mohit Sharma", "Mohammed Siraj"],
    correct: 1,
    fact: "🎳 Mohammed Shami took 28 wickets for Gujarat Titans to win his first IPL Purple Cap in 2023.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2024 final to Kolkata Knight Riders by 8 wickets?",
    options: ["Rajasthan Royals", "Sunrisers Hyderabad", "Royal Challengers Bengaluru", "Delhi Capitals"],
    correct: 1,
    fact: "🥈 Sunrisers Hyderabad lost the IPL 2024 final to Kolkata Knight Riders by 8 wickets at Chepauk, Chennai, despite their aggressive run-chasing style through the tournament.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2025 final to Royal Challengers Bengaluru by 6 runs?",
    options: ["Punjab Kings", "Mumbai Indians", "Gujarat Titans", "Lucknow Super Giants"],
    correct: 0,
    fact: "🥈 Punjab Kings lost the IPL 2025 final to Royal Challengers Bengaluru by 6 runs in Ahmedabad, falling agonisingly short of their first ever IPL title.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2025 with 759 runs for Gujarat Titans?",
    options: ["Shubman Gill", "B Sai Sudharsan", "Suryakumar Yadav", "Yashasvi Jaiswal"],
    correct: 1,
    fact: "🧡 B Sai Sudharsan scored 759 runs for Gujarat Titans to win the IPL 2025 Orange Cap, finishing 42 runs clear of Suryakumar Yadav in second place.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2025 with 25 wickets for Gujarat Titans?",
    options: ["Josh Hazlewood", "Trent Boult", "Prasidh Krishna", "Mohammed Siraj"],
    correct: 2,
    fact: "🎳 Prasidh Krishna took 25 wickets for Gujarat Titans to win the IPL 2025 Purple Cap.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Which team lost the IPL 2026 final to Royal Challengers Bengaluru by 5 wickets?",
    options: ["Mumbai Indians", "Gujarat Titans", "Chennai Super Kings", "Punjab Kings"],
    correct: 1,
    fact: "🥈 Gujarat Titans lost the IPL 2026 final to Royal Challengers Bengaluru by 5 wickets at Ahmedabad, finishing runners-up for the second time in 3 seasons.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Orange Cap in IPL 2026 with 776 runs at just 15 years old?",
    options: ["Yashasvi Jaiswal", "Vaibhav Sooryavanshi", "Sameer Rizvi", "Abhishek Sharma"],
    correct: 1,
    fact: "🧡 Vaibhav Sooryavanshi scored 776 runs for Rajasthan Royals to win the IPL 2026 Orange Cap at a strike rate over 237 — he was also named the tournament's Most Valuable Player and Emerging Player of the Season.",
    era: "2020s",
    category: "ipl"
  },
  {
    question: "Who won the Purple Cap in IPL 2026 with 29 wickets for Gujarat Titans?",
    options: ["Bhuvneshwar Kumar", "Jofra Archer", "Kagiso Rabada", "Mohammed Shami"],
    correct: 2,
    fact: "🎳 Kagiso Rabada took 29 wickets for Gujarat Titans to win the IPL 2026 Purple Cap, edging out Bhuvneshwar Kumar of RCB by one wicket.",
    era: "2020s",
    category: "ipl"
  },

  // ===== TEST CRICKET (36) =====
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
  {
    question: "Which team was runner-up in the first ever World Test Championship final in 2021?",
    options: ["India", "England", "Australia", "South Africa"],
    correct: 0,
    fact: "🥈 India lost the inaugural WTC final to New Zealand by 8 wickets at Southampton in 2021 — India would go on to reach two more WTC finals (2023 and 2025's precursor cycle) without winning the title.",
    era: "2020s",
    category: "test"
  },
  {
    question: "At which venue was the 2021 World Test Championship final between India and New Zealand played?",
    options: ["Lord's, London", "The Oval, London", "The Rose Bowl, Southampton", "Old Trafford, Manchester"],
    correct: 2,
    fact: "🏟️ The 2021 WTC final was originally scheduled for Lord's but moved to the Rose Bowl, Southampton — its on-site hotels made it easier to maintain a COVID-19 bio-bubble.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Who was Player of the Match in the 2021 WTC final for his all-round performance with the ball and bat?",
    options: ["Tim Southee", "Kyle Jamieson", "Kane Williamson", "Ravindra Jadeja"],
    correct: 1,
    fact: "⭐ Kyle Jamieson took 5/31 and 2/30 with the ball and scored 21 runs in New Zealand's 8-wicket win over India in the 2021 WTC final.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Which team won the 2023 World Test Championship final, beating India by 209 runs?",
    options: ["England", "Australia", "South Africa", "New Zealand"],
    correct: 1,
    fact: "🏆 Australia beat India by 209 runs at The Oval in June 2023 to win their first ever WTC title — and become the first team to hold the World Test Championship, ODI World Cup, and T20 World Cup titles at once.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Which team was runner-up in the 2023 World Test Championship final?",
    options: ["New Zealand", "England", "India", "Pakistan"],
    correct: 2,
    fact: "🥈 India lost the 2023 WTC final to Australia by 209 runs at The Oval, having also lost the 2021 final to New Zealand — back-to-back WTC final defeats.",
    era: "2020s",
    category: "test"
  },
  {
    question: "At which venue was the 2023 World Test Championship final between Australia and India played?",
    options: ["Lord's, London", "The Oval, London", "The Rose Bowl, Southampton", "Edgbaston, Birmingham"],
    correct: 1,
    fact: "🏟️ The 2023 WTC final was played at The Oval in London from 7-11 June 2023 — Australia's Travis Head and Steve Smith both scored centuries to set up the win.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Who was Player of the Match in the 2023 WTC final after scoring 163 in Australia's first innings?",
    options: ["Steve Smith", "Marnus Labuschagne", "Travis Head", "Pat Cummins"],
    correct: 2,
    fact: "⭐ Travis Head's 163 in Australia's first innings of 469 was the platform for their 209-run win over India in the 2023 WTC final at The Oval.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Which team was runner-up in the 2025 World Test Championship final at Lord's?",
    options: ["India", "England", "New Zealand", "Australia"],
    correct: 3,
    fact: "🥈 Australia lost the 2025 WTC final to South Africa by 5 wickets at Lord's — South Africa's win ended a 27-year wait for an ICC title, their first since the 1998 ICC KnockOut Trophy.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Who was Player of the Match in the 2025 WTC final after scoring 136 in South Africa's second innings run chase?",
    options: ["Temba Bavuma", "Kagiso Rabada", "Aiden Markram", "Marco Jansen"],
    correct: 2,
    fact: "⭐ Aiden Markram's 136 steered South Africa to a 5-wicket win over Australia at Lord's in the 2025 WTC final — Kagiso Rabada also took a 5-wicket haul in the same match.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Which country has hosted all three World Test Championship finals played so far (2021, 2023, 2025)?",
    options: ["India", "Australia", "England", "South Africa"],
    correct: 2,
    fact: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Every WTC final so far has been played in England — Southampton (2021), The Oval (2023), and Lord's (2025) — since the ICC uses neutral English venues for the showpiece final.",
    era: "2020s",
    category: "test"
  },
  {
    question: "Who held the record for the highest individual score in Test cricket (365 not out) before Brian Lara broke it in 1994?",
    options: ["Don Bradman", "Garry Sobers", "Len Hutton", "Brian Lara"],
    correct: 1,
    fact: "🏏 Sobers, aged just 21, scored 365* against Pakistan at Sabina Park, Kingston in 1958 — breaking Len Hutton's 364 (1938) and holding the record for 36 years, the longest anyone has held it, until Lara's 375 in 1994.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Against which team did Garry Sobers score his then-world-record 365 not out in 1958?",
    options: ["India", "Australia", "England", "Pakistan"],
    correct: 3,
    fact: "🇧🇧 Sobers turned his maiden Test century into 365* against Pakistan at Sabina Park — he added 446 for the 2nd wicket with Conrad Hunte (260), as West Indies piled up 790/3, their highest ever Test total.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Which English all-rounder's unbeaten 149 famously powered England to victory over Australia at Headingley in 1981, after England had followed on?",
    options: ["Geoffrey Boycott", "Ian Botham", "Mike Brearley", "Bob Willis"],
    correct: 1,
    fact: "🏏 Botham's 149* helped set Australia just 130 to win — England had trailed by 227 on first innings and were forced to follow on. The match, and the series, became known as 'Botham's Ashes.'",
    era: "1970s-80s",
    category: "test"
  },
  {
    question: "Which England bowler took 8 wickets for 43 runs to bowl Australia out for 111 and complete England's famous 18-run win at Headingley in 1981?",
    options: ["Ian Botham", "Bob Willis", "Chris Old", "Graham Dilley"],
    correct: 1,
    fact: "⚡ Bob Willis's 8/43, bowling downhill with the slope, dismissed Australia for 111 in their chase of just 130 — England had been rated 500-1 outsiders to win at one stage of the match.",
    era: "1970s-80s",
    category: "test"
  },
  {
    question: "The 1986 Chennai Test between India and Australia was only the second tied Test in cricket history. Which Australian batsman scored 210 in that match despite severe dehydration?",
    options: ["Allan Border", "David Boon", "Dean Jones", "Steve Waugh"],
    correct: 2,
    fact: "🥵 Dean Jones batted through brutal Chennai heat to score 210, later needing hospital treatment and a saline drip for exhaustion — his captain Allan Border had needled him to stay on, saying he'd 'get a Queenslander' if Jones couldn't handle the conditions.",
    era: "1970s-80s",
    category: "test"
  },
  {
    question: "At which stadium was the famous 1986 tied Test between India and Australia played?",
    options: ["Wankhede Stadium, Mumbai", "Eden Gardens, Kolkata", "M.A. Chidambaram Stadium, Chennai", "Feroz Shah Kotla, Delhi"],
    correct: 2,
    fact: "🏟️ The 1986 tied Test was played at Chepauk (M.A. Chidambaram Stadium) in Chennai — Australia declared at 574/7 and 170/5, India were bowled out for 397 and then 347, with the scores level when the last wicket fell.",
    era: "1970s-80s",
    category: "test"
  },
  {
    question: "Which two teams played the first ever tied Test in cricket history, at the Gabba in Brisbane in 1960?",
    options: ["England and Australia", "Australia and West Indies", "India and Pakistan", "England and West Indies"],
    correct: 1,
    fact: "🏏 Australia (captained by Richie Benaud) and West Indies (captained by Frank Worrell) tied in Brisbane in December 1960 — the first tie in 498 Tests played since 1877. The Frank Worrell Trophy was created to commemorate the series.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Which West Indies fast bowler took the last three Australian wickets in a dramatic final over to help seal the first ever tied Test in 1960?",
    options: ["Charlie Griffith", "Wes Hall", "Garry Sobers", "Lance Gibbs"],
    correct: 1,
    fact: "🔥 Wes Hall bowled the chaotic final over with Australia needing 6 to win with 3 wickets in hand — he finished with match figures of 9/203, and the scores ended level.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Which Indian bowler famously bowled 14 overs with a fractured jaw, bandaged up, to dismiss Brian Lara lbw in Antigua in 2002?",
    options: ["Javagal Srinath", "Harbhajan Singh", "Anil Kumble", "Zaheer Khan"],
    correct: 2,
    fact: "🩹 Kumble's jaw was fractured by a Mervyn Dillon delivery while he was batting, but he strapped it up and came out to bowl the next day anyway, trapping Brian Lara lbw in an unforgettable show of grit.",
    era: "2000s",
    category: "test"
  },
  {
    question: "In which West Indian city did Anil Kumble bowl through a broken jaw to dismiss Brian Lara in 2002?",
    options: ["Bridgetown, Barbados", "Kingston, Jamaica", "St John's, Antigua", "Port of Spain, Trinidad"],
    correct: 2,
    fact: "🏏 It happened in the 4th Test of India's 2001-02 tour of the West Indies, at the Antigua Recreation Ground in St John's.",
    era: "2000s",
    category: "test"
  },
  {
    question: "What was the exact runs total of the record-breaking 5th-wicket partnership between VVS Laxman and Rahul Dravid in the famous 2001 Kolkata Test?",
    options: ["281", "356", "376", "410"],
    correct: 2,
    fact: "🤝 Laxman (281) and Dravid (180) added 376 for the 5th wicket at Eden Gardens — still India's highest ever 5th-wicket Test partnership, batting through the entire fourth day without being separated.",
    era: "2000s",
    category: "test"
  },
  {
    question: "The Laxman-Dravid 376-run stand in the 2001 Kolkata Test broke India's previous record for the highest 5th-wicket partnership, held by Ravi Shastri and which other batsman?",
    options: ["Mohammad Azharuddin", "Sachin Tendulkar", "Sourav Ganguly", "Kapil Dev"],
    correct: 0,
    fact: "📈 The old record was 214, put together by Ravi Shastri and Mohammad Azharuddin — Laxman and Dravid nearly doubled it in one of Test cricket's greatest rearguard partnerships.",
    era: "2000s",
    category: "test"
  },
  {
    question: "Chasing 271 against Pakistan in the famous 1999 Chennai Test, Sachin Tendulkar scored 136 before India fell agonisingly short. By how many runs did India lose?",
    options: ["6 runs", "12 runs", "21 runs", "34 runs"],
    correct: 1,
    fact: "💔 Batting with a painful back injury, Tendulkar's 136 nearly pulled off the chase alone, but India's last 3 wickets fell for just 4 runs and Pakistan won by 12 — Sachin was still named Player of the Match despite the loss.",
    era: "1990s",
    category: "test"
  },
  {
    question: "Which Pakistan spinner dismissed Sachin Tendulkar late in his heroic 136 during the 1999 Chennai Test, triggering India's collapse?",
    options: ["Mushtaq Ahmed", "Saqlain Mushtaq", "Shahid Afridi", "Wasim Akram"],
    correct: 1,
    fact: "🎯 Saqlain Mushtaq's doosra deceived Tendulkar into a leading edge to mid-off — Pakistan's attack that day also included Wasim Akram, Waqar Younis, and a young Shahid Afridi.",
    era: "1990s",
    category: "test"
  },
  {
    question: "Which England all-rounder's unbeaten 135 completed a stunning one-wicket win over Australia at Headingley in the 2019 Ashes, chasing a target of 359?",
    options: ["Joe Root", "Jonny Bairstow", "Ben Stokes", "Jos Buttler"],
    correct: 2,
    fact: "🏆 Stokes hit 11 fours and 8 sixes in the highest successful fourth-innings run chase in England's Test history — Wisden later rated it the greatest hundred of the 2010s.",
    era: "2010s",
    category: "test"
  },
  {
    question: "Who was Ben Stokes' No. 11 batting partner, scoring just 1 not out, in the famous 76-run last-wicket stand that won the 2019 Headingley Test?",
    options: ["Jofra Archer", "Stuart Broad", "Jack Leach", "James Anderson"],
    correct: 2,
    fact: "🤝 Jack Leach faced 17 balls for his solitary run — England were 286/9, still needing 73 to win, when he walked out to join Stokes.",
    era: "2010s",
    category: "test"
  },
  {
    question: "Don Bradman needed just 4 runs in his final Test innings to finish with a career average of exactly 100. What did he actually score?",
    options: ["0", "4", "99", "23"],
    correct: 0,
    fact: "😮 Bowled second ball for a duck by Eric Hollies at The Oval in 1948, Bradman's average was frozen at 99.94 — still by far the greatest batting average in Test history.",
    era: "Pre-1970s",
    category: "test"
  },
  {
    question: "Which English bowler dismissed Don Bradman for a duck in his final Test innings at The Oval in 1948, denying him a career average of 100?",
    options: ["Alec Bedser", "Eric Hollies", "Jim Laker", "Doug Wright"],
    correct: 1,
    fact: "🎾 Eric Hollies bowled Bradman with a googly that beat him completely — the crowd had given Bradman a standing ovation just moments earlier as he walked out to bat.",
    era: "Pre-1970s",
    category: "test"
  },

  // ===== ODI CRICKET (88) =====
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
    question: "Which team lost the 1975 Cricket World Cup final to West Indies by 17 runs?",
    options: ["England", "Australia", "India", "Pakistan"],
    correct: 1,
    fact: "🥈 Australia were beaten by 17 runs in the first ever World Cup final, chasing West Indies' 291/8 at Lord's on 21 June 1975.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the first ever World Cup final for his 102 off 85 balls?",
    options: ["Viv Richards", "Clive Lloyd", "Rohan Kanhai", "Gordon Greenidge"],
    correct: 1,
    fact: "🏏 West Indies captain Clive Lloyd scored 102 off 85 balls in the 1975 final, including a 149-run partnership with Rohan Kanhai, and was named Man of the Match.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which country hosted the very first Cricket World Cup in 1975?",
    options: ["Australia", "India", "England", "West Indies"],
    correct: 2,
    fact: "🏟️ The first Cricket World Cup was played entirely in England, across 5 venues, in June 1975.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "At which venue was the first ever Cricket World Cup final played?",
    options: ["The Oval", "Lord's", "Old Trafford", "Headingley"],
    correct: 1,
    fact: "🏟️ The first ever World Cup final was played at Lord's, London on 21 June 1975.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which team lost the 1983 Cricket World Cup final to India by 43 runs?",
    options: ["Australia", "West Indies", "Pakistan", "England"],
    correct: 1,
    fact: "🥈 Two-time defending champions West Indies were shocked by India in the 1983 final, bowled out for 140 chasing just 183 at Lord's — one of cricket's greatest upsets.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 1983 World Cup final for his 3 wickets and useful runs?",
    options: ["Kapil Dev", "Mohinder Amarnath", "Krishnamachari Srikkanth", "Roger Binny"],
    correct: 1,
    fact: "🏏 Mohinder Amarnath took 3/12 and scored 26 in the 1983 final to win Man of the Match, as India bowled out West Indies for just 140.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which country hosted the 1983 Cricket World Cup, India's maiden title-winning edition?",
    options: ["India", "England", "Australia", "West Indies"],
    correct: 1,
    fact: "🏟️ The 1983 World Cup was played entirely in England, the same as 1975 and 1979 — the tournament didn't move outside England until 1987.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "At which venue did India win their first ever World Cup title in 1983?",
    options: ["The Oval", "Lord's", "Edgbaston", "Trent Bridge"],
    correct: 1,
    fact: "🏟️ India beat West Indies at Lord's, London on 25 June 1983 — the same venue as the first two World Cup finals in 1975 and 1979.",
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
  {
    question: "Which team won the 1979 Cricket World Cup, retaining the title they'd won in 1975?",
    options: ["West Indies", "England", "Australia", "Pakistan"],
    correct: 0,
    fact: "🏆 West Indies beat England by 92 runs at Lord's on 23 June 1979 to retain their title — Viv Richards's unbeaten 138 and Joel Garner's 5/38 in the final sealed it.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which team lost the 1979 Cricket World Cup final to West Indies by 92 runs?",
    options: ["Australia", "England", "Pakistan", "New Zealand"],
    correct: 1,
    fact: "🥈 England were bowled out for 194 chasing West Indies' 286/9 in the 1979 final at Lord's — Joel Garner's 5/38 did the damage.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who was named Player of the Match in the 1979 World Cup final for his unbeaten 138?",
    options: ["Clive Lloyd", "Viv Richards", "Gordon Greenidge", "Collis King"],
    correct: 1,
    fact: "💥 Viv Richards scored an unbeaten 138 in the 1979 final, including a 139-run stand with Collis King, to power West Indies to 286/9.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which team won the 1987 Reliance World Cup, their first ever title, beating England by 7 runs?",
    options: ["West Indies", "Australia", "Pakistan", "India"],
    correct: 1,
    fact: "🏆 Australia beat England by 7 runs at Eden Gardens, Kolkata on 8 November 1987 to win their maiden World Cup title under captain Allan Border.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which team lost the 1987 World Cup final to Australia by 7 runs at Eden Gardens?",
    options: ["India", "Pakistan", "England", "West Indies"],
    correct: 2,
    fact: "🥈 England fell 7 runs short chasing Australia's 253/5 in the 1987 final at Eden Gardens, Kolkata — their third World Cup final defeat.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which two countries co-hosted the 1987 World Cup — the first ever held outside England?",
    options: ["Australia and New Zealand", "India and Pakistan", "Sri Lanka and Bangladesh", "South Africa and Zimbabwe"],
    correct: 1,
    fact: "🌍 The 1987 World Cup was co-hosted by India and Pakistan — the first edition ever held outside England, and the first with matches reduced from 60 to 50 overs a side.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Which team won their maiden Cricket World Cup title in 1992, beating England by 22 runs at the MCG?",
    options: ["Pakistan", "South Africa", "New Zealand", "Sri Lanka"],
    correct: 0,
    fact: "🏆 Pakistan beat England by 22 runs in the 1992 final at the MCG, Melbourne — Imran Khan's last ever ODI, and Pakistan's first World Cup title.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which team lost the 1992 World Cup final to Pakistan by 22 runs?",
    options: ["Australia", "England", "New Zealand", "South Africa"],
    correct: 1,
    fact: "🥈 England lost their third World Cup final in 1992, bowled out for 227 chasing Pakistan's 249/6 at the MCG — Wasim Akram's 3/49 broke their middle order.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 1992 World Cup with a tournament-high 456 runs for New Zealand?",
    options: ["Mark Greatbatch", "Martin Crowe", "John Wright", "Andrew Jones"],
    correct: 1,
    fact: "🌟 Martin Crowe scored a tournament-high 456 runs and captained New Zealand to the semi-finals in the 1992 World Cup, winning Player of the Tournament.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which team won their first ever Cricket World Cup title in 1996, becoming the first host nation to win it?",
    options: ["Sri Lanka", "Pakistan", "India", "South Africa"],
    correct: 0,
    fact: "🏆 Sri Lanka beat Australia by 7 wickets in the 1996 final at Gaddafi Stadium, Lahore — the first host nation ever to win the World Cup.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which team lost the 1996 World Cup final to Sri Lanka by 7 wickets?",
    options: ["Pakistan", "Australia", "India", "West Indies"],
    correct: 1,
    fact: "🥈 Australia were restricted to 241/7 and then chased down by Sri Lanka's 7-wicket win in the 1996 final in Lahore — Aravinda de Silva scored an unbeaten 107 and took 3 wickets to win Player of the Match.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 1996 World Cup with 221 runs and 7 wickets, revolutionising ODI opening batting?",
    options: ["Arjuna Ranatunga", "Sanath Jayasuriya", "Aravinda de Silva", "Romesh Kaluwitharana"],
    correct: 1,
    fact: "🌟 Sanath Jayasuriya's explosive opening batting (221 runs, 7 wickets) won him Player of the Tournament in 1996 and changed how ODI cricket was played, attacking the fielding restrictions from ball one.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which country hosted the 1979 Cricket World Cup, the tournament's second edition?",
    options: ["India", "Australia", "England", "West Indies"],
    correct: 2,
    fact: "🏟️ The 1979 World Cup was held entirely in England, just like the first edition in 1975 — the tournament didn't move outside England until 1987.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "At which iconic venue was the 1979 World Cup final played?",
    options: ["The Oval", "Lord's", "Old Trafford", "Edgbaston"],
    correct: 1,
    fact: "🏟️ The 1979 World Cup final was played at Lord's, London on 23 June 1979 — West Indies' second straight title, won there.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who was named Player of the Match in the 1987 World Cup final for his 75 runs?",
    options: ["Allan Border", "David Boon", "Mike Veletta", "Craig McDermott"],
    correct: 1,
    fact: "🏏 David Boon top-scored with 75 off 125 balls for Australia in the 1987 final and was named Player of the Match, as Australia won their maiden title by 7 runs. (Note: an official Player of the Tournament award for the whole event didn't exist until 1992, so 1979 and 1987 only have a final Player of the Match, not a tournament-wide one.)",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "At which stadium was the 1987 World Cup final played?",
    options: ["Wankhede Stadium", "Eden Gardens", "Narendra Modi Stadium", "Gaddafi Stadium"],
    correct: 1,
    fact: "🏟️ The 1987 World Cup final was played at Eden Gardens, Kolkata on 8 November 1987 — Australia beat England by 7 runs in front of around 70,000 spectators.",
    era: "1970s-80s",
    category: "odi"
  },
  {
    question: "Who was named Player of the Match in the 1992 World Cup final for his match-winning bowling spell?",
    options: ["Imran Khan", "Wasim Akram", "Aaqib Javed", "Javed Miandad"],
    correct: 1,
    fact: "🎳 Wasim Akram's 3/49, including two wickets in two balls, broke England's middle order and won him Player of the Match in the 1992 final.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which two countries co-hosted the 1992 World Cup, the first edition with coloured clothing and day-night matches?",
    options: ["England and Wales", "India and Pakistan", "Australia and New Zealand", "South Africa and Zimbabwe"],
    correct: 2,
    fact: "🌏 The 1992 World Cup was co-hosted by Australia and New Zealand — the first edition to feature coloured clothing, a white ball, and day-night matches.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "At which stadium was the 1992 World Cup final played?",
    options: ["Sydney Cricket Ground", "Melbourne Cricket Ground", "The Gabba", "Adelaide Oval"],
    correct: 1,
    fact: "🏟️ The 1992 World Cup final was played at the Melbourne Cricket Ground on 25 March 1992 — Pakistan's maiden title, and Imran Khan's last ever ODI.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Who was named Player of the Match in the 1996 World Cup final for his unbeaten 107 and 3 wickets?",
    options: ["Sanath Jayasuriya", "Arjuna Ranatunga", "Aravinda de Silva", "Romesh Kaluwitharana"],
    correct: 2,
    fact: "🏏 Aravinda de Silva scored an unbeaten 107 and took 3/42 in the 1996 final — the first player ever to score a century and take three wickets in a World Cup final, winning Player of the Match.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which three countries co-hosted the 1996 World Cup?",
    options: ["India, Pakistan and Bangladesh", "India, Pakistan and Sri Lanka", "Pakistan, Sri Lanka and Bangladesh", "India, Sri Lanka and Bangladesh"],
    correct: 1,
    fact: "🌏 The 1996 World Cup was co-hosted by India, Pakistan and Sri Lanka — India staged 17 matches, Pakistan 16, and Sri Lanka 4.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "At which stadium was the 1996 World Cup final played?",
    options: ["Wankhede Stadium", "Eden Gardens", "Gaddafi Stadium", "National Stadium, Karachi"],
    correct: 2,
    fact: "🏟️ The 1996 World Cup final was played at the Gaddafi Stadium, Lahore on 17 March 1996 — Sri Lanka's maiden title, the first ever won by a host nation.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which team won the 2011 ODI World Cup, their first title since 1983?",
    options: ["Sri Lanka", "India", "Pakistan", "South Africa"],
    correct: 1,
    fact: "🏆 India beat Sri Lanka by 6 wickets at Wankhede Stadium, Mumbai on 2 April 2011 — their second World Cup title, and the first time any country won the tournament on home soil.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which team lost the 2011 World Cup final to India by 6 wickets?",
    options: ["Pakistan", "Sri Lanka", "Australia", "South Africa"],
    correct: 1,
    fact: "🥈 Sri Lanka fell 6 wickets short despite Mahela Jayawardene's unbeaten 103 — the first time two Asian teams had ever contested a World Cup final.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 2011 World Cup final for his unbeaten 91?",
    options: ["Gautam Gambhir", "Sachin Tendulkar", "MS Dhoni", "Virender Sehwag"],
    correct: 2,
    fact: "🏏 MS Dhoni's unbeaten 91 off 79 balls, finished off with a six over long-on, won him Man of the Match in the 2011 final.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which team lost the 2015 World Cup final to Australia by 7 wickets?",
    options: ["India", "New Zealand", "South Africa", "Pakistan"],
    correct: 1,
    fact: "🥈 Co-hosts New Zealand were bowled out for 183 in the 2015 final, then Australia chased it down for their 5th title.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 2015 World Cup final for his 3/36?",
    options: ["Mitchell Starc", "James Faulkner", "Mitchell Johnson", "Brad Haddin"],
    correct: 1,
    fact: "🎳 James Faulkner took 3/36 for Australia in the low-scoring 2015 final to win Man of the Match.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 2015 World Cup with 22 wickets for Australia?",
    options: ["Mitchell Johnson", "Josh Hazlewood", "Mitchell Starc", "James Faulkner"],
    correct: 2,
    fact: "🌟 Mitchell Starc took 22 wickets at an average of 10.18 to win Player of the Tournament in the 2015 World Cup.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which two countries co-hosted the 2015 World Cup?",
    options: ["England and Wales", "India and Sri Lanka", "Australia and New Zealand", "South Africa and Zimbabwe"],
    correct: 2,
    fact: "🌏 The 2015 World Cup was co-hosted by Australia and New Zealand, across 14 venues in both countries.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "At which stadium was the 2015 World Cup final played?",
    options: ["Sydney Cricket Ground", "Melbourne Cricket Ground", "Eden Park", "The Gabba"],
    correct: 1,
    fact: "🏟️ The 2015 World Cup final was played at the Melbourne Cricket Ground on 29 March 2015, in front of a record Australian cricket crowd of over 93,000.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which team lost the dramatic, tied 2019 World Cup final to England on the boundary countback rule?",
    options: ["Australia", "New Zealand", "India", "Pakistan"],
    correct: 1,
    fact: "🥈 New Zealand tied the 2019 final with England — and the Super Over too — but lost on the boundary countback rule, cricket's most controversial tiebreaker.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 2019 World Cup final for his unbeaten 84?",
    options: ["Jos Buttler", "Eoin Morgan", "Ben Stokes", "Jofra Archer"],
    correct: 2,
    fact: "🏏 Ben Stokes scored an unbeaten 84 off 98 balls, then 8 more in the Super Over, to win Man of the Match in the epic 2019 final.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 2019 World Cup despite New Zealand losing the final?",
    options: ["Trent Boult", "Ross Taylor", "Kane Williamson", "Tom Latham"],
    correct: 2,
    fact: "🌟 Kane Williamson scored 578 runs and captained New Zealand to the final, winning Player of the Tournament in 2019 despite the runners-up finish.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which two countries co-hosted the 2019 World Cup?",
    options: ["England and Scotland", "England and Wales", "England and Ireland", "England only"],
    correct: 1,
    fact: "🌏 The 2019 World Cup was hosted across 10 venues in England and 1 in Wales — the fifth time England had hosted the tournament.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "At which venue was the dramatic tied 2019 World Cup final played?",
    options: ["The Oval", "Lord's", "Edgbaston", "Old Trafford"],
    correct: 1,
    fact: "🏟️ The 2019 World Cup final was played at Lord's, London on 14 July 2019 — England's maiden World Cup title, on the boundary countback rule.",
    era: "2010s",
    category: "odi"
  },
  {
    question: "Which team lost the 2023 World Cup final to Australia by 6 wickets on home soil?",
    options: ["India", "Pakistan", "South Africa", "New Zealand"],
    correct: 0,
    fact: "🥈 Host nation India lost the 2023 final to Australia by 6 wickets at Ahmedabad, despite going unbeaten through the entire group stage.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 2023 World Cup final for his 137 off 120 balls?",
    options: ["David Warner", "Travis Head", "Steve Smith", "Marnus Labuschagne"],
    correct: 1,
    fact: "🏏 Travis Head scored 137 off 120 balls to win Man of the Match and steer Australia to their 6th World Cup title in 2023.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 2023 World Cup with a record 765 runs, despite India losing the final?",
    options: ["Rohit Sharma", "Virat Kohli", "Shubman Gill", "KL Rahul"],
    correct: 1,
    fact: "🌟 Virat Kohli scored a tournament-record 765 runs, including 3 centuries, to win Player of the Tournament in 2023 — 92 more than Sachin Tendulkar's previous record.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Which country hosted the entire 2023 World Cup?",
    options: ["Pakistan", "England", "India", "Australia"],
    correct: 2,
    fact: "🌏 India hosted the entire 2023 World Cup by itself, across 10 venues.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "At which stadium was the 2023 World Cup final played?",
    options: ["Wankhede Stadium", "Eden Gardens", "Narendra Modi Stadium", "M. Chinnaswamy Stadium"],
    correct: 2,
    fact: "🏟️ The 2023 World Cup final was played at the Narendra Modi Stadium, Ahmedabad on 19 November 2023 — its first ever World Cup final.",
    era: "2020s",
    category: "odi"
  },
  {
    question: "Which team won the 1999 Cricket World Cup, beating Pakistan by 8 wickets at Lord's?",
    options: ["Australia", "South Africa", "Pakistan", "New Zealand"],
    correct: 0,
    fact: "🏆 Australia beat Pakistan by 8 wickets in the 1999 final at Lord's — a one-sided finish after Pakistan collapsed to 132 all out.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which team lost the 1999 World Cup final to Australia by 8 wickets?",
    options: ["South Africa", "Pakistan", "New Zealand", "Sri Lanka"],
    correct: 1,
    fact: "🥈 Pakistan were bowled out for just 132 in the 1999 final at Lord's, and Australia knocked off the target in under 21 overs.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 1999 World Cup final for his 4/33?",
    options: ["Glenn McGrath", "Shane Warne", "Damien Fleming", "Tom Moody"],
    correct: 1,
    fact: "🎳 Shane Warne took 4/33, including the key wickets of Ijaz Ahmed and Inzamam-ul-Haq, to win Man of the Match in the 1999 final.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 1999 World Cup despite South Africa not reaching the final?",
    options: ["Jacques Kallis", "Lance Klusener", "Allan Donald", "Herschelle Gibbs"],
    correct: 1,
    fact: "🌟 Lance Klusener was Player of the Tournament in 1999 for his explosive all-round form — despite South Africa being eliminated in the famous tied semi-final against Australia.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which country primarily hosted the 1999 World Cup, with some matches also played in Wales, Scotland, Ireland and the Netherlands?",
    options: ["Australia", "South Africa", "England", "India"],
    correct: 2,
    fact: "🌏 The 1999 World Cup was primarily hosted by England, with a handful of group matches also played in Wales, Scotland, Ireland and the Netherlands.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "At which venue was the 1999 World Cup final played?",
    options: ["The Oval", "Lord's", "Edgbaston", "Trent Bridge"],
    correct: 1,
    fact: "🏟️ The 1999 World Cup final was played at Lord's, London on 20 June 1999 — Australia's second title.",
    era: "1990s",
    category: "odi"
  },
  {
    question: "Which team won the 2003 Cricket World Cup, beating India by 125 runs in Johannesburg?",
    options: ["Australia", "South Africa", "India", "New Zealand"],
    correct: 0,
    fact: "🏆 Australia beat India by 125 runs in the 2003 final at the Wanderers, Johannesburg — their third World Cup title, and still the largest margin of victory in any World Cup final.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Which team lost the 2003 World Cup final to Australia by 125 runs?",
    options: ["Pakistan", "India", "Sri Lanka", "Kenya"],
    correct: 1,
    fact: "🥈 India were bowled out for 234 chasing Australia's 359/2 in the 2003 final — Sachin Tendulkar was out in the very first over, to Glenn McGrath.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 2003 World Cup final for his unbeaten 140?",
    options: ["Adam Gilchrist", "Ricky Ponting", "Damien Martyn", "Matthew Hayden"],
    correct: 1,
    fact: "🏏 Ricky Ponting scored an unbeaten 140 off 121 balls, including 8 sixes, in the 2003 final to win Man of the Match — emulating Clive Lloyd's 1975 captain's century.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 2003 World Cup with a then-record 673 runs, despite India losing the final?",
    options: ["Rahul Dravid", "Sourav Ganguly", "Sachin Tendulkar", "Virender Sehwag"],
    correct: 2,
    fact: "🌟 Sachin Tendulkar scored a then-record 673 runs to win Player of the Tournament in 2003, over 200 runs clear of his nearest challenger — despite India losing the final.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Which three countries co-hosted the 2003 World Cup?",
    options: ["South Africa, Zimbabwe and Kenya", "South Africa, Zimbabwe and Namibia", "South Africa, Kenya and Namibia", "England, South Africa and Zimbabwe"],
    correct: 0,
    fact: "🌏 The 2003 World Cup was co-hosted by South Africa, Zimbabwe and Kenya, from 9 February to 23 March 2003.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "At which stadium was the 2003 World Cup final played?",
    options: ["Newlands", "Wanderers Stadium", "Kingsmead", "SuperSport Park"],
    correct: 1,
    fact: "🏟️ The 2003 World Cup final was played at the Wanderers Stadium, Johannesburg on 23 March 2003.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Which team won the 2007 Cricket World Cup, their third title in a row?",
    options: ["Australia", "Sri Lanka", "South Africa", "New Zealand"],
    correct: 0,
    fact: "🏆 Australia beat Sri Lanka by 53 runs (D/L method) in the chaotic, near-darkness 2007 final at Kensington Oval, Barbados — their 4th World Cup title and 3rd in a row, going through the entire tournament unbeaten.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Which team lost the 2007 World Cup final to Australia by 53 runs (D/L method)?",
    options: ["South Africa", "Sri Lanka", "New Zealand", "West Indies"],
    correct: 1,
    fact: "🥈 Sri Lanka fell to Australia in the 2007 final, which ended in confusion in near-darkness under the Duckworth-Lewis method.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Who was named Man of the Match in the 2007 World Cup final for his 149 off 104 balls?",
    options: ["Matthew Hayden", "Adam Gilchrist", "Ricky Ponting", "Glenn McGrath"],
    correct: 1,
    fact: "🏏 Adam Gilchrist smashed 149 off 104 balls in the 2007 final — the fastest century ever scored in a World Cup final — to win Man of the Match.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Who was Player of the Tournament in the 2007 World Cup with 26 wickets, in his final tournament before retiring?",
    options: ["Brett Lee", "Shaun Tait", "Glenn McGrath", "Nathan Bracken"],
    correct: 2,
    fact: "🌟 Glenn McGrath took 26 wickets at an average of 13.73 to win Player of the Tournament in 2007, then retired from international cricket immediately after.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "Which region hosted the 2007 Cricket World Cup?",
    options: ["England", "West Indies", "South Africa", "Australia and New Zealand"],
    correct: 1,
    fact: "🌏 The 2007 World Cup was hosted across the West Indies, from 13 March to 28 April 2007 — the first time the tournament was held in the Caribbean.",
    era: "2000s",
    category: "odi"
  },
  {
    question: "At which venue was the 2007 World Cup final played, the first time this ground hosted a World Cup final?",
    options: ["Sabina Park", "Kensington Oval", "Queen's Park Oval", "Bourda"],
    correct: 1,
    fact: "🏟️ The 2007 World Cup final was played at Kensington Oval, Barbados on 28 April 2007 — the first time Barbados hosted a World Cup final.",
    era: "2000s",
    category: "odi"
  },

  // ===== T20 CRICKET (72) =====
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
  {
    question: "Who lost the final of the inaugural 2007 T20 World Cup to India?",
    options: ["Pakistan", "Sri Lanka", "South Africa", "Australia"],
    correct: 0,
    fact: "🥈 Pakistan were runners-up in the first ever T20 World Cup, losing to India by 5 runs in a nail-biting final at the Wanderers, Johannesburg.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Which country hosted the inaugural 2007 ICC World Twenty20?",
    options: ["India", "England", "South Africa", "West Indies"],
    correct: 2,
    fact: "🌍 South Africa hosted the first ever T20 World Cup in September 2007 — the tournament that launched the format's biggest global stage.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "What was the venue of the 2007 T20 World Cup final between India and Pakistan?",
    options: ["Newlands, Cape Town", "The Wanderers, Johannesburg", "Kingsmead, Durban", "SuperSport Park, Centurion"],
    correct: 1,
    fact: "🏟️ The 2007 T20 World Cup final was played at the Wanderers Stadium in Johannesburg on 24 September 2007.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the 2007 T20 World Cup final for his 3/16 against Pakistan?",
    options: ["RP Singh", "Joginder Sharma", "Irfan Pathan", "Harbhajan Singh"],
    correct: 2,
    fact: "🎯 Irfan Pathan took 3/16 to win Player of the Match in the 2007 T20 World Cup final, alongside RP Singh's 3/26 in restricting Pakistan's chase.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the inaugural 2007 T20 World Cup?",
    options: ["Yuvraj Singh", "Shahid Afridi", "Chris Gayle", "Umar Gul"],
    correct: 1,
    fact: "🌟 Pakistan's Shahid Afridi was the first ever Player of the Tournament at a T20 World Cup, taking 12 wickets in the 2007 edition despite his team losing the final.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Which team lost the 2021 T20 World Cup final to Australia?",
    options: ["England", "New Zealand", "Pakistan", "South Africa"],
    correct: 1,
    fact: "🥈 New Zealand were runners-up at the 2021 T20 World Cup, losing to Australia by 8 wickets in the final at Dubai International Stadium.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which country was the official host of the 2021 T20 World Cup, even though it was played in the UAE and Oman?",
    options: ["India", "England", "Sri Lanka", "Pakistan"],
    correct: 0,
    fact: "🇮🇳 India remained the official host of the 2021 T20 World Cup, but the BCCI moved the tournament to the UAE and Oman due to the COVID-19 situation in the country.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "What was the venue of the 2021 T20 World Cup final between Australia and New Zealand?",
    options: ["Sharjah Cricket Stadium", "Dubai International Cricket Stadium", "Sheikh Zayed Stadium, Abu Dhabi", "Zayed Cricket Stadium, Oman"],
    correct: 1,
    fact: "🏟️ The 2021 T20 World Cup final was played at Dubai International Cricket Stadium on 14 November 2021.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the 2021 T20 World Cup final for his unbeaten 77 off 50 balls?",
    options: ["David Warner", "Mitchell Marsh", "Aaron Finch", "Glenn Maxwell"],
    correct: 1,
    fact: "💥 Mitchell Marsh smashed an unbeaten 77 off just 50 balls to win Player of the Match and fire Australia to their maiden T20 World Cup title in 2021.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the 2021 T20 World Cup?",
    options: ["Mitchell Marsh", "David Warner", "Josh Hazlewood", "Adam Zampa"],
    correct: 1,
    fact: "🌟 David Warner was Player of the Tournament at the 2021 T20 World Cup, scoring 289 runs at an average of 48.16 during Australia's title run.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which team lost the 2022 T20 World Cup final to England at the MCG?",
    options: ["India", "New Zealand", "Pakistan", "South Africa"],
    correct: 2,
    fact: "🥈 Pakistan were runners-up at the 2022 T20 World Cup, losing to England by 5 wickets in the final at the MCG.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which country hosted the 2022 T20 World Cup?",
    options: ["England", "India", "Australia", "UAE"],
    correct: 2,
    fact: "🇦🇺 Australia hosted the 2022 T20 World Cup, across seven venues including Adelaide, Perth, Sydney and Melbourne.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "What was the venue of the 2022 T20 World Cup final between England and Pakistan?",
    options: ["Sydney Cricket Ground", "Adelaide Oval", "Melbourne Cricket Ground", "The Gabba, Brisbane"],
    correct: 2,
    fact: "🏟️ The 2022 T20 World Cup final was played at the Melbourne Cricket Ground on 13 November 2022, in front of over 80,000 fans.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the 2022 T20 World Cup final for his 3/12 against Pakistan?",
    options: ["Ben Stokes", "Adil Rashid", "Sam Curran", "Chris Jordan"],
    correct: 2,
    fact: "🎯 Sam Curran took 3/12 to win Player of the Match in the 2022 T20 World Cup final, capping a tournament in which he also won Player of the Tournament.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who won both Player of the Match in the final and Player of the Tournament at the 2022 T20 World Cup?",
    options: ["Ben Stokes", "Sam Curran", "Jos Buttler", "Mark Wood"],
    correct: 1,
    fact: "🌟 England's Sam Curran took 13 wickets across the 2022 T20 World Cup to win Player of the Tournament, then sealed the title with 3/12 in the final.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which team lost the 2024 T20 World Cup final to India by 7 runs?",
    options: ["Australia", "England", "South Africa", "Afghanistan"],
    correct: 2,
    fact: "🥈 South Africa were runners-up at the 2024 T20 World Cup, losing to India by 7 runs in the final at Kensington Oval, Barbados — it was South Africa's first ever final at any men's cricket World Cup, ODI or T20.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the 2024 T20 World Cup final for his 76 off 59 balls?",
    options: ["Rohit Sharma", "Virat Kohli", "Suryakumar Yadav", "Axar Patel"],
    correct: 1,
    fact: "🏏 Virat Kohli scored 76 off 59 balls to win Player of the Match in the 2024 T20 World Cup final — his 8th Player-of-the-Match award at a T20 World Cup, the most by any player.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Which team lost the 2026 T20 World Cup final to India by 96 runs?",
    options: ["Australia", "New Zealand", "England", "South Africa"],
    correct: 1,
    fact: "🥈 New Zealand were runners-up at the 2026 T20 World Cup, losing to India by 96 runs in the final at Ahmedabad.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "What was the venue of the 2026 T20 World Cup final between India and New Zealand?",
    options: ["Eden Gardens, Kolkata", "Wankhede Stadium, Mumbai", "Narendra Modi Stadium, Ahmedabad", "M. Chinnaswamy Stadium, Bengaluru"],
    correct: 2,
    fact: "🏟️ The 2026 T20 World Cup final was played at the Narendra Modi Stadium in Ahmedabad — the world's largest cricket stadium, with a seating capacity of around 132,000.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the 2026 T20 World Cup final for his 4/15 against New Zealand?",
    options: ["Varun Chakravarthy", "Jasprit Bumrah", "Arshdeep Singh", "Suryakumar Yadav"],
    correct: 1,
    fact: "🎯 Jasprit Bumrah took 4/15 in the 2026 T20 World Cup final. India's 255/5 was the first 200-plus total ever posted in a T20 World Cup final.",
    era: "2020s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2009?",
    options: ["Sri Lanka", "India", "Pakistan", "England"],
    correct: 2,
    fact: "🏆 Pakistan won the T20 World Cup 2009, beating Sri Lanka by 8 wickets in the final.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Which team was the runner-up in the T20 World Cup 2009 final?",
    options: ["Sri Lanka", "South Africa", "West Indies", "New Zealand"],
    correct: 0,
    fact: "🥈 Sri Lanka lost the T20 World Cup 2009 final to Pakistan by 8 wickets.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Which country hosted the T20 World Cup 2009?",
    options: ["South Africa", "England", "West Indies", "India"],
    correct: 1,
    fact: "🏏 England hosted the T20 World Cup 2009, with the final played at Lord's.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "What was the venue of the T20 World Cup 2009 final between Pakistan and Sri Lanka?",
    options: ["The Oval", "Lord's", "Old Trafford", "Edgbaston"],
    correct: 1,
    fact: "🏟️ The T20 World Cup 2009 final was played at Lord's, London on 21 June 2009.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the T20 World Cup 2009 final for his unbeaten 54?",
    options: ["Younis Khan", "Umar Gul", "Shahid Afridi", "Kamran Akmal"],
    correct: 2,
    fact: "🌟 Shahid Afridi hit an unbeaten 54 to guide Pakistan to victory in the 2009 final, earning Player of the Match.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the T20 World Cup 2009?",
    options: ["Kevin Pietersen", "Tillakaratne Dilshan", "Shahid Afridi", "Yuvraj Singh"],
    correct: 1,
    fact: "🎯 Tillakaratne Dilshan of Sri Lanka was Player of the Tournament at the T20 World Cup 2009, scoring 317 runs at an average of 63.40 — despite his team losing the final.",
    era: "2000s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2010?",
    options: ["Australia", "India", "England", "Pakistan"],
    correct: 2,
    fact: "🏆 England won the T20 World Cup 2010, beating Australia by 7 wickets in the final — their first ever ICC world title in any format.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which team was the runner-up in the T20 World Cup 2010 final?",
    options: ["Australia", "Sri Lanka", "Pakistan", "South Africa"],
    correct: 0,
    fact: "🥈 Australia lost the T20 World Cup 2010 final to England by 7 wickets in Barbados.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which region hosted the T20 World Cup 2010?",
    options: ["South Africa", "West Indies", "Sri Lanka", "Bangladesh"],
    correct: 1,
    fact: "🏏 The West Indies hosted the T20 World Cup 2010, with matches played across Barbados, Guyana and St Vincent.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "What was the venue of the T20 World Cup 2010 final between England and Australia?",
    options: ["Providence Stadium, Guyana", "Kensington Oval, Barbados", "Sabina Park, Jamaica", "Arnos Vale, St Vincent"],
    correct: 1,
    fact: "🏟️ The T20 World Cup 2010 final was played at Kensington Oval in Bridgetown, Barbados on 16 May 2010.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the T20 World Cup 2010 final for his 63?",
    options: ["Kevin Pietersen", "Craig Kieswetter", "Eoin Morgan", "Michael Lumb"],
    correct: 1,
    fact: "🌟 Craig Kieswetter scored 63 off 49 balls, earning Player of the Match as England beat Australia in the 2010 final.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the T20 World Cup 2010?",
    options: ["Craig Kieswetter", "Mike Hussey", "Kevin Pietersen", "Dwayne Bravo"],
    correct: 2,
    fact: "🎯 Kevin Pietersen of England was Player of the Tournament at the T20 World Cup 2010, scoring 248 runs at an average of 62.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2012?",
    options: ["Sri Lanka", "West Indies", "Australia", "South Africa"],
    correct: 1,
    fact: "🏆 West Indies won the T20 World Cup 2012, beating hosts Sri Lanka by 36 runs in the final — their first World Twenty20 title.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which team was the runner-up in the T20 World Cup 2012 final?",
    options: ["Sri Lanka", "Australia", "Pakistan", "India"],
    correct: 0,
    fact: "🥈 Sri Lanka lost the T20 World Cup 2012 final to West Indies by 36 runs on home soil in Colombo.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which country hosted the T20 World Cup 2012?",
    options: ["Bangladesh", "Sri Lanka", "India", "UAE"],
    correct: 1,
    fact: "🏏 Sri Lanka hosted the T20 World Cup 2012, the second time the tournament was held there.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "What was the venue of the T20 World Cup 2012 final between Sri Lanka and West Indies?",
    options: ["Pallekele Stadium", "R. Premadasa Stadium, Colombo", "Galle International Stadium", "Hambantota Stadium"],
    correct: 1,
    fact: "🏟️ The T20 World Cup 2012 final was played at the R. Premadasa Stadium in Colombo on 7 October 2012.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the T20 World Cup 2012 final for his 78 off 56 balls?",
    options: ["Chris Gayle", "Marlon Samuels", "Sunil Narine", "Darren Sammy"],
    correct: 1,
    fact: "🌟 Marlon Samuels scored 78 off 56 balls and took 1/15, earning Player of the Match as West Indies beat Sri Lanka in the 2012 final.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the T20 World Cup 2012?",
    options: ["Marlon Samuels", "Ajantha Mendis", "Shane Watson", "Kieron Pollard"],
    correct: 2,
    fact: "🎯 Shane Watson of Australia was Player of the Tournament at the T20 World Cup 2012, with 249 runs and 11 wickets — the most of any player in both categories.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2014?",
    options: ["India", "Sri Lanka", "Bangladesh", "South Africa"],
    correct: 1,
    fact: "🏆 Sri Lanka won the T20 World Cup 2014, beating India by 6 wickets in the final — a fitting farewell tournament for retiring stars Kumar Sangakkara and Mahela Jayawardene.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which team was the runner-up in the T20 World Cup 2014 final?",
    options: ["Pakistan", "West Indies", "India", "South Africa"],
    correct: 2,
    fact: "🥈 India lost the T20 World Cup 2014 final to Sri Lanka by 6 wickets in Dhaka.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which country hosted the T20 World Cup 2014?",
    options: ["Sri Lanka", "India", "Bangladesh", "UAE"],
    correct: 2,
    fact: "🏏 Bangladesh hosted the T20 World Cup 2014, with matches played in Dhaka, Chittagong and Sylhet.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "What was the venue of the T20 World Cup 2014 final between India and Sri Lanka?",
    options: ["Zahur Ahmed Chowdhury Stadium, Chittagong", "Sher-e-Bangla National Stadium, Mirpur", "Sylhet International Cricket Stadium", "Shere Bangla Cricket Stadium, Khulna"],
    correct: 1,
    fact: "🏟️ The T20 World Cup 2014 final was played at the Sher-e-Bangla National Stadium in Mirpur, Dhaka on 6 April 2014.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the T20 World Cup 2014 final for his unbeaten 52?",
    options: ["Mahela Jayawardene", "Lasith Malinga", "Kumar Sangakkara", "Angelo Mathews"],
    correct: 2,
    fact: "🌟 Kumar Sangakkara scored an unbeaten 52, earning Player of the Match in his final T20 international as Sri Lanka beat India in the 2014 final.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the T20 World Cup 2014?",
    options: ["Kumar Sangakkara", "Virat Kohli", "AB de Villiers", "Ahmed Shehzad"],
    correct: 1,
    fact: "🎯 Virat Kohli was Player of the Tournament at the T20 World Cup 2014, scoring 319 runs in 6 matches at an average of 106.33 — despite India losing the final.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who won the T20 World Cup 2016?",
    options: ["England", "India", "West Indies", "South Africa"],
    correct: 2,
    fact: "🏆 West Indies won the T20 World Cup 2016, beating England by 4 wickets in a final made famous by Carlos Brathwaite hitting four consecutive sixes off Ben Stokes in the last over. It was their second title, making them the first team to win the T20 World Cup twice.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which team was the runner-up in the T20 World Cup 2016 final?",
    options: ["England", "India", "Australia", "New Zealand"],
    correct: 0,
    fact: "🥈 England lost the T20 World Cup 2016 final to West Indies by 4 wickets at Eden Gardens, Kolkata.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Which country hosted the T20 World Cup 2016?",
    options: ["Bangladesh", "Sri Lanka", "India", "UAE"],
    correct: 2,
    fact: "🏏 India hosted the T20 World Cup 2016 — the first time the tournament was held there.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "What was the venue of the T20 World Cup 2016 final between England and West Indies?",
    options: ["Wankhede Stadium, Mumbai", "Eden Gardens, Kolkata", "M. Chinnaswamy Stadium, Bengaluru", "Feroz Shah Kotla, Delhi"],
    correct: 1,
    fact: "🏟️ The T20 World Cup 2016 final was played at Eden Gardens in Kolkata on 3 April 2016.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was Player of the Match in the T20 World Cup 2016 final for his unbeaten 85?",
    options: ["Carlos Brathwaite", "Chris Gayle", "Marlon Samuels", "Andre Russell"],
    correct: 2,
    fact: "🌟 Marlon Samuels scored an unbeaten 85 off 66 balls, earning Player of the Match — his second final Player of the Match award, after also winning it in 2012.",
    era: "2010s",
    category: "t20"
  },
  {
    question: "Who was named Player of the Tournament at the T20 World Cup 2016?",
    options: ["Marlon Samuels", "Virat Kohli", "Joe Root", "AB de Villiers"],
    correct: 1,
    fact: "🎯 Virat Kohli was Player of the Tournament at the T20 World Cup 2016, held in India — despite his team not making the final.",
    era: "2010s",
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
  },
  {
    question: "What is a 'hat-trick' in cricket?",
    options: ["A batsman scoring three centuries in a row", "A bowler taking three wickets with three consecutive deliveries", "A team winning three matches in a row", "A fielder taking three catches in one over"],
    correct: 1,
    fact: "🎩 The term dates back to 1858, when H.H. Stephenson took 3 wickets in 3 balls and was presented with a hat — giving the feat its name.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'duck' in cricket?",
    options: ["A batsman being dismissed without scoring any runs", "A ball that bounces twice before reaching the batsman", "A fielder dropping an easy catch", "A batsman retiring due to injury"],
    correct: 0,
    fact: "🦆 The term comes from 'duck's egg' — the shape of a zero on the scoreboard resembles an egg. Getting out first ball faced is called a 'golden duck.'",
    era: "General",
    category: "general"
  },
  {
    question: "Which of these is a common reason for an umpire to call a 'no-ball'?",
    options: ["The batsman hits the ball twice", "The bowler's front foot lands over the popping crease", "The ball bounces before reaching the pitch", "The wicketkeeper stands too close"],
    correct: 1,
    fact: "🚫 A no-ball is an illegal delivery — usually from overstepping the front crease — and costs the bowling side a penalty run, with the batsman protected from most dismissals off it.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'wide' in cricket?",
    options: ["A delivery bowled too far away for the batsman to reasonably play it", "A shot hit outside the boundary rope", "A fielder positioned far from the batsman", "A ball that hits the side of the stumps"],
    correct: 0,
    fact: "↔️ A wide is a legally bowled delivery — unlike a no-ball — that's simply out of the batsman's reach. It costs a penalty run and doesn't count toward the over's six balls.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'yorker' in cricket?",
    options: ["A ball bowled full and fast, aimed at the batsman's feet or the base of the stumps", "A slow, looping delivery", "A ball bowled straight down leg side", "A delivery that bounces twice"],
    correct: 0,
    fact: "🎯 The yorker is one of the hardest deliveries to bowl accurately, especially in the death overs of T20 cricket — get it wrong and it turns into an easy-to-hit full toss instead.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'googly' in cricket?",
    options: ["A fast bouncer aimed at the head", "A leg-spinner's delivery that turns the opposite way to a normal leg break", "A delivery bowled underarm", "A ball that swings late in the air"],
    correct: 1,
    fact: "🌀 Invented by England's Bernard Bosanquet around 1900, the googly deceives batsmen by spinning the 'wrong way' — into a right-hander instead of away from them.",
    era: "General",
    category: "general"
  },
  {
    question: "What is the Duckworth-Lewis-Stern (DLS) method used for in cricket?",
    options: ["Deciding who bats first", "Calculating a revised target score in a rain-affected limited-overs match", "Ranking players for team selection", "Measuring pitch conditions before a toss"],
    correct: 1,
    fact: "🌧️ DLS uses the 'resources' a team has left — balls remaining and wickets in hand — to fairly recalculate a target when overs are lost to weather.",
    era: "General",
    category: "general"
  },
  {
    question: "What happens in a 'Super Over' in limited-overs cricket?",
    options: ["Each team bowls an extra 10 overs", "Each team bats one extra over of 6 balls to break a tie", "The match is replayed the next day", "The team batting first automatically wins"],
    correct: 1,
    fact: "⚡ Since October 2019, a tied Super Over is replayed until there's a winner — before that rule change, the 2019 World Cup final between England and New Zealand was decided by a boundary count after both the match and the Super Over finished level.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'free hit' in limited-overs cricket?",
    options: ["An extra six runs awarded for a six", "A bonus delivery awarded after a no-ball, where the batsman can't be dismissed except by run out or a couple of other rare ways", "A free entry ticket for a fan who catches a six", "An extra over bowled after the innings ends"],
    correct: 1,
    fact: "🎁 After any no-ball, the very next delivery is a free hit — the batsman can't be out bowled, caught, lbw, or stumped off it, only run out, hit the ball twice, or obstructing the field.",
    era: "General",
    category: "general"
  },
  {
    question: "What is the standard length of a cricket pitch, from stump to stump?",
    options: ["18 yards", "20 yards", "22 yards", "24 yards"],
    correct: 2,
    fact: "📏 22 yards (about 20.12 metres) — a length that has stayed fixed in the Laws of Cricket for centuries, regardless of format.",
    era: "General",
    category: "general"
  },
  {
    question: "What is a 'nightwatchman' in Test cricket?",
    options: ["An umpire who officiates evening sessions", "A lower-order batsman sent in ahead of his usual position to protect a recognised batsman near the end of a day's play", "A substitute fielder used only after sunset", "A team's designated night-shift analyst"],
    correct: 1,
    fact: "🌙 Sent in when a wicket falls late in the day, the nightwatchman's job is to survive to stumps — usually a bowler more comfortable defending than a specialist batsman would be under pressure.",
    era: "General",
    category: "general"
  },
  {
    question: "How many runs does a batsman need to score in a single innings to complete a 'century'?",
    options: ["50", "75", "100", "150"],
    correct: 2,
    fact: "💯 A century (or 'ton') is one of batting's most celebrated milestones — score 50 instead and it's called a half-century.",
    era: "General",
    category: "general"
  },
  {
    question: "How many players make up a cricket team's Playing XI on the field?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    fact: "🏏 Each side fields 11 players, though teams can nominate substitute fielders (including concussion replacements) under current playing conditions.",
    era: "General",
    category: "general"
  },
  {
    question: "What does the '20' in 'T20' cricket refer to?",
    options: ["20 players per team", "20 overs per side per innings", "20-minute time limit per over", "20 fielders allowed on the field"],
    correct: 1,
    fact: "⏱️ Twenty20 was designed by the ECB in 2003 to fit inside about three hours, with each side batting 20 overs — a deliberate answer to fans who said matches took too long.",
    era: "General",
    category: "general"
  }

];
