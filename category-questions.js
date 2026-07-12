// ===== CRICTAKKAR CATEGORY QUESTION BANK =====
// Verified against ESPNcricinfo, Wikipedia, and live search results.
// Last updated: June 2026
//
// ERA TAGGING (Day 14): every question has an `era` field for the Stats Dashboard.
// Rule used — event-specific questions (a match, a record set on a known date) are
// tagged by that event's decade. Player/team career questions with no single
// anchoring date are tagged by the midpoint of their career (or the spread of the
// years involved) in the relevant format. Timeless rules/definitions and open-ended
// records spanning too many decades to pin down are tagged "General". Buckets:
// Pre-1970s, 1970s-80s, 1990s, 2000s, 2010s, 2020s, General.

const categoryQuestions = {

  ipl: [
    {
      question: "Which team won the IPL 2025 title — their first ever IPL trophy?",
      options: ["Mumbai Indians", "Punjab Kings", "Royal Challengers Bengaluru", "Kolkata Knight Riders"],
      correct: 2,
      fact: "🏆 RCB won their first ever IPL title in 2025 after 17 years of heartbreak, beating Punjab Kings by 6 runs in the final at Ahmedabad. Captain was Rajat Patidar.",
      era: "2020s"
    },
    {
      question: "Which team won the IPL 2024 title?",
      options: ["Mumbai Indians", "Sunrisers Hyderabad", "Kolkata Knight Riders", "Rajasthan Royals"],
      correct: 2,
      fact: "🏆 KKR won their third IPL title in 2024, defeating Sunrisers Hyderabad by 8 wickets in the final at Chepauk, Chennai. Shreyas Iyer was the captain.",
      era: "2020s"
    },
    {
      question: "Which team won the IPL 2023 title?",
      options: ["Mumbai Indians", "Chennai Super Kings", "Gujarat Titans", "Rajasthan Royals"],
      correct: 1,
      fact: "🦁 Chennai Super Kings won their 5th IPL title in 2023 under MS Dhoni, defeating Gujarat Titans by 5 wickets in the final at Ahmedabad.",
      era: "2020s"
    },
    {
      question: "Who has scored the most runs in IPL history?",
      options: ["Rohit Sharma", "David Warner", "Shikhar Dhawan", "Virat Kohli"],
      correct: 3,
      fact: "👑 Virat Kohli is the all-time leading run-scorer in IPL history with over 8,000 runs. He also won the Orange Cap in IPL 2024 with 741 runs.",
      era: "2010s"
    },
    {
      question: "Who has taken the most wickets in IPL history?",
      options: ["Lasith Malinga", "Amit Mishra", "Dwayne Bravo", "Yuzvendra Chahal"],
      correct: 3,
      fact: "🌀 Yuzvendra Chahal is the highest wicket-taker in IPL history, surpassing Dwayne Bravo's record during IPL 2024.",
      era: "2020s"
    },
    {
      question: "In which year was the IPL first played?",
      options: ["2006", "2007", "2008", "2009"],
      correct: 2,
      fact: "🏏 The first IPL season was played in 2008. Rajasthan Royals won the inaugural title under Shane Warne.",
      era: "2000s"
    },
    {
      question: "Who captained Rajasthan Royals to win the very first IPL title in 2008?",
      options: ["Rahul Dravid", "Shane Warne", "Graeme Smith", "MS Dhoni"],
      correct: 1,
      fact: "🐍 Shane Warne led Rajasthan Royals to the 2008 IPL title — considered one of the greatest captaincy performances in T20 history.",
      era: "2000s"
    },
    {
      question: "Which player scored 175* in an IPL match — the highest individual score in IPL history?",
      options: ["Chris Gayle", "AB de Villiers", "Brendon McCullum", "David Warner"],
      correct: 0,
      fact: "💣 Chris Gayle scored 175* off just 66 balls for RCB against PWI in 2013 — the highest individual score in IPL history.",
      era: "2010s"
    },
    {
      question: "What is the name of RCB's home stadium?",
      options: ["Wankhede Stadium", "Eden Gardens", "M Chinnaswamy Stadium", "Arun Jaitley Stadium"],
      correct: 2,
      fact: "🏟️ Royal Challengers Bengaluru play at M Chinnaswamy Stadium in Bengaluru — one of the most high-scoring venues in the IPL.",
      era: "General"
    },
    {
      question: "How many IPL titles have Mumbai Indians won?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      fact: "🏆 Mumbai Indians have won 5 IPL titles — in 2013, 2015, 2017, 2019 and 2020. They are joint-most successful along with Chennai Super Kings.",
      era: "2010s"
    },
    {
      question: "Who won the Orange Cap (most runs) in IPL 2024?",
      options: ["Rohit Sharma", "Travis Head", "Virat Kohli", "KL Rahul"],
      correct: 2,
      fact: "🧡 Virat Kohli won the Orange Cap in IPL 2024 with 741 runs — including his first ever IPL century after 17 years in the tournament.",
      era: "2020s"
    },
    {
      question: "What does IPL stand for?",
      options: ["India Premier League", "Indian Premier League", "International Premier League", "India Power League"],
      correct: 1,
      fact: "🏏 IPL stands for Indian Premier League. It was founded by the BCCI in 2008 and is now the richest cricket league in the world.",
      era: "General"
    },
    {
      question: "Which IPL team is based in Hyderabad?",
      options: ["Rajasthan Royals", "Punjab Kings", "Sunrisers Hyderabad", "Lucknow Super Giants"],
      correct: 2,
      fact: "☀️ Sunrisers Hyderabad play their home matches at Rajiv Gandhi International Cricket Stadium in Uppal, Hyderabad.",
      era: "General"
    },
    {
      question: "Who captained RCB to their first ever IPL title in 2025?",
      options: ["Virat Kohli", "Faf du Plessis", "Rajat Patidar", "Glenn Maxwell"],
      correct: 2,
      fact: "🌟 Rajat Patidar captained RCB to their first IPL title in 2025 — ending 17 years of heartbreak for RCB fans around the world.",
      era: "2020s"
    },
    {
      question: "Which was the first IPL match ever played and where?",
      options: ["MI vs CSK at Wankhede", "RCB vs KKR at Chinnaswamy", "RR vs CSK at Chepauk", "KKR vs SRH at Eden Gardens"],
      correct: 1,
      fact: "🏟️ The first ever IPL match was played at M Chinnaswamy Stadium, Bengaluru on 18 April 2008 between RCB and KKR. Brendon McCullum scored 158* for KKR.",
      era: "2000s"
    }
  ],

  test: [
    {
      question: "Who holds the record for the highest individual score in Test cricket with 400*?",
      options: ["Sachin Tendulkar", "Matthew Hayden", "Virender Sehwag", "Brian Lara"],
      correct: 3,
      fact: "🦁 Brian Lara scored 400* against England in Antigua in April 2004 — the highest individual score in Test cricket history.",
      era: "2000s"
    },
    {
      question: "Who is the only bowler to take all 10 wickets in a Test innings for India?",
      options: ["Kapil Dev", "Harbhajan Singh", "Anil Kumble", "Bishan Singh Bedi"],
      correct: 2,
      fact: "🎳 Anil Kumble took 10 wickets for 74 runs against Pakistan in Delhi in February 1999 — only the second bowler ever to achieve this in Tests.",
      era: "1990s"
    },
    {
      question: "How many days does a Test match last at most?",
      options: ["3 days", "4 days", "5 days", "7 days"],
      correct: 2,
      fact: "📜 A Test match is played over a maximum of 5 days with each team getting 2 innings. It is cricket's longest and most prestigious format.",
      era: "General"
    },
    {
      question: "Who has scored the most runs in Test cricket history?",
      options: ["Ricky Ponting", "Rahul Dravid", "Sachin Tendulkar", "Kumar Sangakkara"],
      correct: 2,
      fact: "👑 Sachin Tendulkar scored 15,921 runs in 200 Test matches — the most by any batsman in Test cricket history.",
      era: "2000s"
    },
    {
      question: "Who has taken the most wickets in Test cricket history with 800 wickets?",
      options: ["Shane Warne", "Glenn McGrath", "Anil Kumble", "Muttiah Muralitharan"],
      correct: 3,
      fact: "🌀 Muttiah Muralitharan of Sri Lanka retired with 800 Test wickets — a record that has stood since 2010.",
      era: "2010s"
    },
    {
      question: "Which Indian batsman was known as 'The Wall' for his defensive technique?",
      options: ["Sachin Tendulkar", "Sunil Gavaskar", "VVS Laxman", "Rahul Dravid"],
      correct: 3,
      fact: "🧱 Rahul Dravid earned the nickname 'The Wall' and retired with 13,288 Test runs — the second highest by an Indian after Sachin.",
      era: "2000s"
    },
    {
      question: "In which city was the famous 2001 Test where India won after following on against Australia?",
      options: ["Mumbai", "Chennai", "Kolkata", "Delhi"],
      correct: 2,
      fact: "🏟️ The famous 2001 Test was at Eden Gardens, Kolkata. VVS Laxman scored 281* and India won after following on — one of cricket's greatest upsets.",
      era: "2000s"
    },
    {
      question: "Which country did India play their very first Test match against in 1932?",
      options: ["Australia", "England", "South Africa", "West Indies"],
      correct: 1,
      fact: "🇬🇧 India played their first ever Test match against England at Lord's in June 1932. CK Nayudu was the captain.",
      era: "Pre-1970s"
    },
    {
      question: "Who scored 309 runs in a single day of Test cricket — a world record?",
      options: ["Sachin Tendulkar", "Don Bradman", "Virender Sehwag", "Brian Lara"],
      correct: 1,
      fact: "🐐 Don Bradman scored 309 runs in a single day against England in Leeds in 1930 — a record that has never been broken.",
      era: "Pre-1970s"
    },
    {
      question: "What is a 'follow-on' in Test cricket?",
      options: ["When a team bats again immediately after being bowled out", "When a fielder follows the ball to the boundary", "When a bowler bowls two overs in a row", "When a batsman crosses for a run"],
      correct: 0,
      fact: "📖 A follow-on happens when the team batting second scores 200 runs fewer than the first team. The leading team can make them bat again immediately.",
      era: "General"
    },
    {
      question: "Sunil Gavaskar was the first batsman to score how many Test centuries?",
      options: ["20", "25", "29", "34"],
      correct: 3,
      fact: "🇮🇳 Sunil Gavaskar was the first batsman to score 34 Test centuries — a world record at the time he retired in 1987.",
      era: "1970s-80s"
    },
    {
      question: "How many runs separate teams for a follow-on to be enforced in a 5-day Test?",
      options: ["100 runs", "150 runs", "200 runs", "250 runs"],
      correct: 2,
      fact: "📜 In a 5-day Test, if the team batting second is 200 or more runs behind, the opposition can enforce the follow-on.",
      era: "General"
    },
    {
      question: "Who scored India's first ever Test century?",
      options: ["Vijay Merchant", "CK Nayudu", "Lala Amarnath", "Vijay Hazare"],
      correct: 2,
      fact: "🏏 Lala Amarnath scored India's first Test century — 118 against England in Bombay in December 1933.",
      era: "Pre-1970s"
    },
    {
      question: "Which Indian bowler has taken the most Test wickets ever?",
      options: ["Kapil Dev", "Harbhajan Singh", "Zaheer Khan", "Anil Kumble"],
      correct: 3,
      fact: "🌀 Anil Kumble is India's highest wicket-taker in Tests with 619 wickets — the third highest in the history of Test cricket.",
      era: "1990s"
    },
    {
      question: "In how many innings does each team bat in a Test match?",
      options: ["1", "2", "3", "4"],
      correct: 1,
      fact: "📜 Each team gets 2 innings in a Test match. That is why Tests can last up to 5 days — they are the ultimate test of skill and endurance.",
      era: "General"
    }
  ],

  odi: [
    {
      question: "Who scored the first ever double century (200*) in ODI cricket?",
      options: ["Rohit Sharma", "Martin Guptill", "Virender Sehwag", "Sachin Tendulkar"],
      correct: 3,
      fact: "👑 Sachin Tendulkar scored 200* against South Africa in Gwalior on 24 February 2010 — the first ODI double century in history.",
      era: "2010s"
    },
    {
      question: "Who holds the record for the highest individual score in ODI cricket with 264?",
      options: ["Martin Guptill", "Chris Gayle", "Virender Sehwag", "Rohit Sharma"],
      correct: 3,
      fact: "💥 Rohit Sharma scored 264 against Sri Lanka in Kolkata on 13 November 2014 — the highest individual score in ODI cricket history.",
      era: "2010s"
    },
    {
      question: "Which country won the first ever Cricket World Cup in 1975?",
      options: ["Australia", "India", "West Indies", "England"],
      correct: 2,
      fact: "🏆 West Indies won the first Cricket World Cup in 1975 at Lord's, London. Clive Lloyd scored a magnificent century in the final.",
      era: "1970s-80s"
    },
    {
      question: "In which year did India win their first Cricket World Cup?",
      options: ["1975", "1979", "1983", "1987"],
      correct: 2,
      fact: "🇮🇳 India won the 1983 World Cup at Lord's under Kapil Dev — one of sport's greatest ever upsets. India beat the mighty West Indies in the final.",
      era: "1970s-80s"
    },
    {
      question: "How many overs does each team face in an ODI match?",
      options: ["40 overs", "45 overs", "50 overs", "60 overs"],
      correct: 2,
      fact: "🏏 Each team faces 50 overs in an ODI. ODIs were originally 60 overs per side when they began in 1971.",
      era: "General"
    },
    {
      question: "Who scored the most runs in a single ODI World Cup tournament — 648 runs in 2019?",
      options: ["Sachin Tendulkar", "Rohit Sharma", "David Warner", "Martin Guptill"],
      correct: 1,
      fact: "🏆 Rohit Sharma scored 648 runs in the 2019 ODI World Cup including 5 centuries — the most by any batsman in a single World Cup edition.",
      era: "2010s"
    },
    {
      question: "Which team won the 2023 ODI World Cup held in India?",
      options: ["India", "Australia", "South Africa", "New Zealand"],
      correct: 1,
      fact: "🏆 Australia won the 2023 ODI World Cup, defeating host nation India in the final at Narendra Modi Stadium, Ahmedabad.",
      era: "2020s"
    },
    {
      question: "Who captained India in the 1983 World Cup winning team?",
      options: ["Sunil Gavaskar", "Dilip Vengsarkar", "Kapil Dev", "Mohinder Amarnath"],
      correct: 2,
      fact: "🇮🇳 Kapil Dev captained India in 1983. His unbeaten 175 against Zimbabwe in the group stage is one of cricket's greatest ever innings.",
      era: "1970s-80s"
    },
    {
      question: "How many players are in a cricket team?",
      options: ["9", "10", "11", "12"],
      correct: 2,
      fact: "🏏 Each cricket team has 11 players. A 12th man can field as a substitute but cannot bat or bowl.",
      era: "General"
    },
    {
      question: "What is a 'Duckworth-Lewis' result in cricket?",
      options: ["A tie that goes to a super over", "A result calculated by a formula when rain interrupts an ODI", "When both teams score the same runs", "A method of selecting the playing XI"],
      correct: 1,
      fact: "🌧️ The Duckworth-Lewis-Stern method calculates revised targets when rain interrupts limited-overs matches. It was introduced in 1997.",
      era: "General"
    },
    {
      question: "Which Indian bowler took the most wickets in the 2011 World Cup?",
      options: ["Harbhajan Singh", "Zaheer Khan", "Munaf Patel", "Ashish Nehra"],
      correct: 1,
      fact: "🎳 Zaheer Khan was India's leading wicket-taker in the 2011 World Cup with 21 wickets — joint highest wicket-taker of the entire tournament.",
      era: "2010s"
    },
    {
      question: "Where was the 2011 ODI World Cup final played?",
      options: ["Eden Gardens, Kolkata", "M Chinnaswamy, Bengaluru", "Wankhede Stadium, Mumbai", "Feroz Shah Kotla, Delhi"],
      correct: 2,
      fact: "🏟️ The 2011 World Cup final between India and Sri Lanka was played at Wankhede Stadium, Mumbai on 2 April 2011.",
      era: "2010s"
    },
    {
      question: "Who was named Player of the Tournament in the 2011 ODI World Cup?",
      options: ["MS Dhoni", "Sachin Tendulkar", "Yuvraj Singh", "Zaheer Khan"],
      correct: 2,
      fact: "🌟 Yuvraj Singh was Player of the Tournament in 2011 — he scored 362 runs AND took 15 wickets. A truly legendary all-round performance.",
      era: "2010s"
    },
    {
      question: "Who hit the winning six in the 2011 ODI World Cup final?",
      options: ["Virat Kohli", "Yuvraj Singh", "Gautam Gambhir", "MS Dhoni"],
      correct: 3,
      fact: "🎯 MS Dhoni hit the winning six off Nuwan Kulasekara to seal India's 2011 World Cup victory. He finished unbeaten on 91.",
      era: "2010s"
    },
    {
      question: "Which Indian cricketer scored a century on his Test debut at Lord's in 1996?",
      options: ["Sachin Tendulkar", "Virat Kohli", "Sourav Ganguly", "Rahul Dravid"],
      correct: 2,
      fact: "🎩 Sourav Ganguly scored 131 on his Test debut at Lord's in 1996 — one of the most celebrated debut innings in Indian cricket history.",
      era: "1990s"
    }
  ],

  t20: [
    {
      question: "Which country has won the most T20 World Cup titles as of June 2026?",
      options: ["West Indies", "England", "India", "Australia"],
      correct: 2,
      fact: "🇮🇳 India leads all teams with 3 T20 World Cup titles — won in 2007, 2024 and 2026. They are the first team ever to defend the T20 World Cup.",
      era: "2020s"
    },
    {
      question: "Who won the T20 World Cup 2026?",
      options: ["England", "Australia", "New Zealand", "India"],
      correct: 3,
      fact: "🏆 India won the T20 World Cup 2026, beating New Zealand in the final at Narendra Modi Stadium, Ahmedabad. It was India's third T20 World Cup title.",
      era: "2020s"
    },
    {
      question: "Who captained India in the T20 World Cup 2026?",
      options: ["Rohit Sharma", "Virat Kohli", "Suryakumar Yadav", "Jasprit Bumrah"],
      correct: 2,
      fact: "🌟 Suryakumar Yadav captained India to the T20 World Cup 2026 title, with Sanju Samson named Player of the Tournament.",
      era: "2020s"
    },
    {
      question: "Who won the T20 World Cup 2024?",
      options: ["England", "Australia", "South Africa", "India"],
      correct: 3,
      fact: "🇮🇳 India won the T20 World Cup 2024 in the West Indies and USA, defeating South Africa in the final under Rohit Sharma.",
      era: "2020s"
    },
    {
      question: "Which country won the inaugural ICC T20 World Cup in 2007?",
      options: ["Pakistan", "Australia", "India", "Sri Lanka"],
      correct: 2,
      fact: "🏆 India won the first T20 World Cup in South Africa in 2007 under MS Dhoni, beating Pakistan in a thrilling final by 5 runs.",
      era: "2000s"
    },
    {
      question: "Who took the last wicket to win India the 2007 T20 World Cup?",
      options: ["Irfan Pathan", "RP Singh", "Harbhajan Singh", "Joginder Sharma"],
      correct: 3,
      fact: "🎳 MS Dhoni gave the last over to Joginder Sharma — an unknown pacer. Misbah-ul-Haq was caught trying a scoop shot. India won by 5 runs.",
      era: "2000s"
    },
    {
      question: "How many overs does each team face in a T20 match?",
      options: ["10 overs", "15 overs", "20 overs", "25 overs"],
      correct: 2,
      fact: "⚡ Each team faces exactly 20 overs in a T20 match. This format was designed to make cricket faster and more exciting for all audiences.",
      era: "General"
    },
    {
      question: "Who scored the first century in T20 World Cup history?",
      options: ["Chris Gayle", "Brendon McCullum", "Yuvraj Singh", "Kevin Pietersen"],
      correct: 0,
      fact: "💣 Chris Gayle scored the first century in T20 World Cup history — 117 against South Africa in the 2007 T20 World Cup.",
      era: "2000s"
    },
    {
      question: "Who did Yuvraj Singh hit for 6 sixes in one over in the 2007 T20 World Cup?",
      options: ["Andrew Flintoff", "Kevin Pietersen", "Stuart Broad", "Dimitri Mascarenhas"],
      correct: 2,
      fact: "💥 Yuvraj Singh hit Stuart Broad for 6 sixes in one over in the 2007 T20 World Cup against England — one of cricket's most iconic moments.",
      era: "2000s"
    },
    {
      question: "Where was the T20 World Cup 2024 held?",
      options: ["England and Ireland", "Australia and New Zealand", "West Indies and USA", "India and Sri Lanka"],
      correct: 2,
      fact: "🌍 The 2024 T20 World Cup was co-hosted by West Indies and USA — the first time the USA hosted a major cricket tournament.",
      era: "2020s"
    },
    {
      question: "Where was the T20 World Cup 2026 held?",
      options: ["England and Ireland", "Australia and New Zealand", "West Indies and USA", "India and Sri Lanka"],
      correct: 3,
      fact: "🇮🇳 The 2026 T20 World Cup was co-hosted by India and Sri Lanka. India won as hosts — breaking the host nation curse that had lasted 19 years.",
      era: "2020s"
    },
    {
      question: "Who won the Player of the Tournament award in the T20 World Cup 2024?",
      options: ["Rohit Sharma", "Virat Kohli", "Hardik Pandya", "Jasprit Bumrah"],
      correct: 3,
      fact: "🌟 Jasprit Bumrah won Player of the Tournament in T20 World Cup 2024. He was India's most important bowler throughout the tournament.",
      era: "2020s"
    },
    {
      question: "Who was named Player of the Tournament in the T20 World Cup 2026?",
      options: ["Suryakumar Yadav", "Jasprit Bumrah", "Sanju Samson", "Varun Chakravarthy"],
      correct: 2,
      fact: "🌟 Sanju Samson was named Player of the Tournament in the T20 World Cup 2026, playing a key role in India's historic back-to-back title wins.",
      era: "2020s"
    },
    {
      question: "What was the venue of the T20 World Cup 2024 final?",
      options: ["Sabina Park, Jamaica", "Kensington Oval, Barbados", "Brian Lara Stadium, Trinidad", "Daren Sammy Stadium, St Lucia"],
      correct: 1,
      fact: "🏟️ The T20 World Cup 2024 final between India and South Africa was played at Kensington Oval in Bridgetown, Barbados.",
      era: "2020s"
    },
    {
      question: "In the 2007 T20 World Cup, India and Pakistan played a group stage tie. How was the winner decided?",
      options: ["Super over", "Bowl out", "Toss of a coin", "Run rate"],
      correct: 1,
      fact: "🎳 The India vs Pakistan group match in 2007 was tied and decided by a bowl-out — like a penalty shootout in football. India won 3–0.",
      era: "2000s"
    }
  ],

  // ===== POETRY QUIZ (Day 14) =====
  // Same question/options/correct/fact/era shape as every other category — the quiz
  // engine needs no changes. Each poem is 4 lines or fewer and describes a moment
  // already verified elsewhere in the app (questions.js/category-questions.js/
  // onthisday.js/poems.js) — no new unverified facts introduced here.
  poetry: [
    {
      question: "Four days I stood, my bat held high,\nfour hundred runs beneath the sky,\nin Antigua's sun, a record fell—\nwhose innings does this poem tell?",
      options: ["Brian Lara", "Matthew Hayden", "Virender Sehwag", "Sachin Tendulkar"],
      correct: 0,
      fact: "🦁 Brian Lara scored 400* against England in Antigua in 2004 — the highest individual score in Test cricket history.",
      era: "2000s"
    },
    {
      question: "The wait was twenty-eight years long,\none final six, a nation's song,\nat Wankhede the sixes fly—\nwho lifted the World Cup to the sky?",
      options: ["MS Dhoni", "Yuvraj Singh", "Virat Kohli", "Gautam Gambhir"],
      correct: 0,
      fact: "🏆 MS Dhoni hit the winning six off Nuwan Kulasekara to seal India's 2011 World Cup victory at Wankhede Stadium, Mumbai.",
      era: "2010s"
    },
    {
      question: "From seventeen for five I rose,\na knock no camera dared to close,\nagainst Zimbabwe, hope reborn—\nwhose innings saved that World Cup morn?",
      options: ["Kapil Dev", "Sunil Gavaskar", "Mohinder Amarnath", "Yashpal Sharma"],
      correct: 0,
      fact: "🔥 Kapil Dev scored an unbeaten 175 against Zimbabwe at Tunbridge Wells in the 1983 World Cup after India had slipped to 17 for 5.",
      era: "1970s-80s"
    },
    {
      question: "Ten wickets fell to just one hand,\nat Kotla's pitch I took my stand,\nagainst Pakistan, history's page—\nwhose spell became a Test-match sage?",
      options: ["Anil Kumble", "Harbhajan Singh", "Bishan Singh Bedi", "Kapil Dev"],
      correct: 0,
      fact: "🎳 Anil Kumble took 10/74 against Pakistan at Feroz Shah Kotla, Delhi in 1999 — only the second bowler in Test history to take all 10 in an innings.",
      era: "1990s"
    },
    {
      question: "Six balls bowled, six times I swung,\nsix sixes over the boundary flung,\nBroad's over, Durban's night—\nwhose bat lit up that famous fight?",
      options: ["Yuvraj Singh", "Virender Sehwag", "Suresh Raina", "Rohit Sharma"],
      correct: 0,
      fact: "💥 Yuvraj Singh hit Stuart Broad for six sixes in one over in the 2007 T20 World Cup against England.",
      era: "2000s"
    },
    {
      question: "Two-eighty-one at Eden's ground,\nwith Dravid's bat, a fortress found,\nafter follow-on, Australia fell—\nwhose innings does this story tell?",
      options: ["VVS Laxman", "Rahul Dravid", "Sourav Ganguly", "Sachin Tendulkar"],
      correct: 0,
      fact: "🌟 VVS Laxman's 281 at Eden Gardens in 2001 is one of the greatest innings ever — India won after following on against Australia.",
      era: "2000s"
    },
    {
      question: "Two hundred sixty-four I made,\nat Eden Gardens, records swayed,\nSri Lanka's bowlers, no reply—\nwhose blade sent the ball so high?",
      options: ["Rohit Sharma", "Virender Sehwag", "Chris Gayle", "Martin Guptill"],
      correct: 0,
      fact: "💥 Rohit Sharma scored 264 against Sri Lanka at Eden Gardens, Kolkata in 2014 — the highest individual score in ODI history.",
      era: "2010s"
    },
    {
      question: "Not stone that stands but stone that grows,\neach session calmer, no fear he shows,\nthirteen thousand Test runs and more—\nwhich batsman built this rock-solid score?",
      options: ["Rahul Dravid", "Sunil Gavaskar", "Cheteshwar Pujara", "VVS Laxman"],
      correct: 0,
      fact: "🧱 Rahul Dravid earned the nickname 'The Wall' and retired with 13,288 Test runs — the second highest by an Indian after Sachin.",
      era: "2000s"
    },
    {
      question: "A billion hearts, one final night,\nWankhede glowed with victory light,\nSri Lanka chased, the target fell—\nwhich year did India ring that bell?",
      options: ["2011", "2007", "2015", "2023"],
      correct: 0,
      fact: "🏏 India won the 2011 World Cup at Wankhede Stadium, Mumbai, beating Sri Lanka by 6 wickets — their first World Cup win on home soil.",
      era: "2010s"
    },
    {
      question: "One-fifty-eight not out he blazed,\nthe very first IPL, fans amazed,\nat Chinnaswamy the sixes flew—\nwhich batsman lit that opening view?",
      options: ["Brendon McCullum", "Chris Gayle", "AB de Villiers", "David Warner"],
      correct: 0,
      fact: "🏟️ Brendon McCullum smashed an unbeaten 158 for KKR against RCB in the first ever IPL match, played at M Chinnaswamy Stadium in 2008.",
      era: "2000s"
    },
    {
      question: "Three hundred nine before day's end,\nat Leeds, no bowler he'd befriend,\na hundred thrice in sessions three—\nwhich legend batted history?",
      options: ["Don Bradman", "Sachin Tendulkar", "Brian Lara", "Virender Sehwag"],
      correct: 0,
      fact: "🐐 Don Bradman scored 309 runs in a single day against England at Headingley, Leeds in 1930 — a record that has never been broken.",
      era: "Pre-1970s"
    },
    {
      question: "A hundred hundreds, none before,\nMirpur's ground, the record tore,\nBangladesh watched the milestone reign—\nwhose bat wrote cricket's proudest name?",
      options: ["Sachin Tendulkar", "Virat Kohli", "Ricky Ponting", "Kumar Sangakkara"],
      correct: 0,
      fact: "🏏 Sachin Tendulkar became the first batsman to score 100 international centuries, reaching the landmark against Bangladesh in the 2012 Asia Cup.",
      era: "2010s"
    }
  ]

};
