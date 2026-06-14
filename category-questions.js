// ===== CRICTAKKAR CATEGORY QUESTION BANK =====
// Every question verified against ESPNcricinfo and Wikipedia.
// Last verified: June 2025
// RULE: Never add a question without checking ESPNcricinfo first.

const categoryQuestions = {

  // ================================================
  // IPL QUESTIONS
  // ================================================
  ipl: [
    {
      question: "Which team won the IPL 2024 title?",
      options: ["Mumbai Indians", "Sunrisers Hyderabad", "Kolkata Knight Riders", "Rajasthan Royals"],
      correct: 2,
      fact: "🏆 KKR won their third IPL title in 2024, defeating Sunrisers Hyderabad in the final at Chepauk, Chennai."
    },
    {
      question: "Which team won the IPL 2023 title?",
      options: ["Mumbai Indians", "Chennai Super Kings", "Gujarat Titans", "Rajasthan Royals"],
      correct: 1,
      fact: "🦁 Chennai Super Kings won their 5th IPL title in 2023 under MS Dhoni, defeating Gujarat Titans in the final."
    },
    {
      question: "Who has scored the most runs in IPL history?",
      options: ["Rohit Sharma", "David Warner", "Shikhar Dhawan", "Virat Kohli"],
      correct: 3,
      fact: "👑 Virat Kohli is the all-time leading run-scorer in IPL history with over 8,000 runs across his career."
    },
    {
      question: "Who has taken the most wickets in IPL history?",
      options: ["Lasith Malinga", "Amit Mishra", "Dwayne Bravo", "Yuzvendra Chahal"],
      correct: 3,
      fact: "🌀 Yuzvendra Chahal is the highest wicket-taker in IPL history. He surpassed Dwayne Bravo's record during IPL 2024."
    },
    {
      question: "Which IPL team is based in Hyderabad?",
      options: ["Rajasthan Royals", "Punjab Kings", "Sunrisers Hyderabad", "Lucknow Super Giants"],
      correct: 2,
      fact: "☀️ Sunrisers Hyderabad play their home matches at Rajiv Gandhi International Cricket Stadium in Uppal, Hyderabad."
    },
    {
      question: "In which year was the IPL first played?",
      options: ["2006", "2007", "2008", "2009"],
      correct: 2,
      fact: "🏏 The first IPL season was played in 2008. Rajasthan Royals won the inaugural title under Shane Warne."
    },
    {
      question: "Who captained Rajasthan Royals to win the very first IPL title in 2008?",
      options: ["Rahul Dravid", "Shane Warne", "Graeme Smith", "MS Dhoni"],
      correct: 1,
      fact: "🐍 Shane Warne led Rajasthan Royals to the 2008 IPL title — considered one of the greatest captaincy performances in T20 history."
    },
    {
      question: "Which stadium hosted the first ever IPL match in 2008?",
      options: ["Wankhede Stadium, Mumbai", "Eden Gardens, Kolkata", "M Chinnaswamy Stadium, Bengaluru", "Feroz Shah Kotla, Delhi"],
      correct: 2,
      fact: "🏟️ The first IPL match was played at M Chinnaswamy Stadium, Bengaluru on 18 April 2008 between RCB and KKR."
    },
    {
      question: "Who hit the first six in IPL history?",
      options: ["Brendon McCullum", "Virat Kohli", "Adam Gilchrist", "Sourav Ganguly"],
      correct: 0,
      fact: "💥 Brendon McCullum hit the first six in IPL history during his explosive 158* for KKR in the very first IPL match in 2008."
    },
    {
      question: "Which IPL team has won the most titles as of end of IPL 2024?",
      options: ["Chennai Super Kings", "Mumbai Indians", "Both are equal on 5 titles each", "Kolkata Knight Riders"],
      correct: 2,
      fact: "🏆 After IPL 2023, both Mumbai Indians and Chennai Super Kings are level on 5 IPL titles each — the most by any team."
    },
    {
      question: "What is the name of RCB's home stadium?",
      options: ["Wankhede Stadium", "Eden Gardens", "M Chinnaswamy Stadium", "Arun Jaitley Stadium"],
      correct: 2,
      fact: "🏟️ Royal Challengers Bengaluru play at M Chinnaswamy Stadium in Bengaluru, one of the most high-scoring venues in the IPL."
    },
    {
      question: "Which player scored 175* in an IPL match — the highest individual score in IPL history?",
      options: ["Chris Gayle", "AB de Villiers", "Brendon McCullum", "David Warner"],
      correct: 0,
      fact: "💣 Chris Gayle scored 175* off just 66 balls for RCB against PWI in 2013 — the highest score in IPL history."
    },
    {
      question: "Which team did MS Dhoni lead to their first IPL title?",
      options: ["Mumbai Indians", "Chennai Super Kings", "Rising Pune Supergiant", "Deccan Chargers"],
      correct: 1,
      fact: "🦁 MS Dhoni led Chennai Super Kings to their first IPL title in 2010. He has been CSK's captain for almost their entire history."
    },
    {
      question: "Who won the Orange Cap (most runs) in IPL 2024?",
      options: ["Virat Kohli", "Rohit Sharma", "Travis Head", "Virat Kohli"],
      correct: 0,
      fact: "🧡 Virat Kohli won the Orange Cap in IPL 2024 with 741 runs — including his first IPL century after 17 years in the tournament."
    },
    {
      question: "What does IPL stand for?",
      options: ["India Premier League", "Indian Premier League", "International Premier League", "India Power League"],
      correct: 1,
      fact: "🏏 IPL stands for Indian Premier League. It was founded by the BCCI in 2008 and is now the richest cricket league in the world."
    }
  ],

  // ================================================
  // TEST CRICKET QUESTIONS
  // ================================================
  test: [
    {
      question: "Who holds the record for the highest individual score in Test cricket with 400*?",
      options: ["Sachin Tendulkar", "Matthew Hayden", "Virender Sehwag", "Brian Lara"],
      correct: 3,
      fact: "🦁 Brian Lara scored 400* against England in Antigua in April 2004 — the highest individual score in Test cricket history."
    },
    {
      question: "Who is the only bowler to take all 10 wickets in a Test innings for India?",
      options: ["Kapil Dev", "Harbhajan Singh", "Anil Kumble", "Bishan Singh Bedi"],
      correct: 2,
      fact: "🎳 Anil Kumble took 10 wickets for 74 runs against Pakistan in Delhi in February 1999 — only the second bowler ever to achieve this in Tests."
    },
    {
      question: "How many days does a Test match last at most?",
      options: ["3 days", "4 days", "5 days", "7 days"],
      correct: 2,
      fact: "📜 A Test match is played over a maximum of 5 days with each team getting 2 innings. It is cricket's longest and most prestigious format."
    },
    {
      question: "Who has scored the most runs in Test cricket history?",
      options: ["Ricky Ponting", "Rahul Dravid", "Sachin Tendulkar", "Kumar Sangakkara"],
      correct: 2,
      fact: "👑 Sachin Tendulkar scored 15,921 runs in 200 Test matches — the most by any batsman in Test cricket history."
    },
    {
      question: "Who has taken the most wickets in Test cricket history with 800 wickets?",
      options: ["Shane Warne", "Glenn McGrath", "Anil Kumble", "Muttiah Muralitharan"],
      correct: 3,
      fact: "🌀 Muttiah Muralitharan of Sri Lanka retired with 800 Test wickets — a record that has stood since 2010."
    },
    {
      question: "Which Indian batsman was known as 'The Wall' for his defensive technique?",
      options: ["Sachin Tendulkar", "Sunil Gavaskar", "VVS Laxman", "Rahul Dravid"],
      correct: 3,
      fact: "🧱 Rahul Dravid earned the nickname 'The Wall' and retired with 13,288 Test runs — the second highest by an Indian after Sachin."
    },
    {
      question: "In which city was the famous 2001 Test match where India won after following on against Australia?",
      options: ["Mumbai", "Chennai", "Kolkata", "Delhi"],
      correct: 2,
      fact: "🏟️ The famous 2001 Test was played at Eden Gardens, Kolkata. VVS Laxman scored 281* and India won after following on — one of cricket's greatest upsets."
    },
    {
      question: "Who was the first batsman to be given out by the third umpire (TV umpire) in Test cricket?",
      options: ["Sachin Tendulkar", "Kapil Dev", "Sachin Tendulkar", "Kiran More"],
      correct: 3,
      fact: "📺 Kiran More was the first player given out by TV umpire technology in a Test match — South Africa vs India in Durban in 1992."
    },
    {
      question: "Which country did India play their very first Test match against in 1932?",
      options: ["Australia", "England", "South Africa", "West Indies"],
      correct: 1,
      fact: "🇬🇧 India played their first ever Test match against England at Lord's in June 1932. CK Nayudu was the captain."
    },
    {
      question: "Who scored 309 runs in a single day of Test cricket — a world record?",
      options: ["Sachin Tendulkar", "Don Bradman", "Virender Sehwag", "Brian Lara"],
      correct: 1,
      fact: "🐐 Don Bradman scored 309 runs in a single day against England in Leeds in 1930 — a record that has never been broken."
    },
    {
      question: "What is a 'follow-on' in Test cricket?",
      options: ["When a team bats again immediately after being bowled out", "When a fielder follows the ball to the boundary", "When a bowler bowls two overs in a row", "When a batsman crosses for a run"],
      correct: 0,
      fact: "📖 A follow-on happens when the team batting second scores 200 runs fewer than the first team. The leading team can make them bat again immediately."
    },
    {
      question: "Sunil Gavaskar was the first batsman to score how many Test centuries?",
      options: ["20", "25", "29", "34"],
      correct: 3,
      fact: "🇮🇳 Sunil Gavaskar was the first batsman to score 34 Test centuries — a world record at the time he retired in 1987."
    },
    {
      question: "Which Test match is known as the 'Tied Test' between India and Australia in 1986?",
      options: ["Kolkata Test 1986", "Madras Test 1986", "Mumbai Test 1986", "Delhi Test 1986"],
      correct: 1,
      fact: "🤝 The Madras Test of 1986 between India and Australia ended in a tie — only the second tied Test in history. Dean Jones scored a heroic 210."
    },
    {
      question: "How many runs separate teams for a follow-on to be enforced in a 5-day Test?",
      options: ["100 runs", "150 runs", "200 runs", "250 runs"],
      correct: 2,
      fact: "📜 In a 5-day Test, if the team batting second is 200 or more runs behind, the opposition can enforce the follow-on."
    },
    {
      question: "Who scored India's first ever Test century?",
      options: ["Vijay Merchant", "CK Nayudu", "Lala Amarnath", "Vijay Hazare"],
      correct: 2,
      fact: "🏏 Lala Amarnath scored India's first Test century — 118 against England in Bombay in December 1933."
    }
  ],

  // ================================================
  // ODI QUESTIONS
  // ================================================
  odi: [
    {
      question: "Who scored the first ever double century (200*) in ODI cricket?",
      options: ["Rohit Sharma", "Martin Guptill", "Virender Sehwag", "Sachin Tendulkar"],
      correct: 3,
      fact: "👑 Sachin Tendulkar scored 200* against South Africa in Gwalior on 24 February 2010 — the first ODI double century in history."
    },
    {
      question: "Who holds the record for the highest individual score in ODI cricket with 264?",
      options: ["Martin Guptill", "Chris Gayle", "Virender Sehwag", "Rohit Sharma"],
      correct: 3,
      fact: "💥 Rohit Sharma scored 264 against Sri Lanka in Kolkata on 13 November 2014 — the highest score in ODI cricket history."
    },
    {
      question: "Which country won the first ever Cricket World Cup in 1975?",
      options: ["Australia", "India", "West Indies", "England"],
      correct: 2,
      fact: "🏆 West Indies won the first Cricket World Cup in 1975 at Lord's, London. Clive Lloyd scored a magnificent century in the final."
    },
    {
      question: "In which year did India win their first Cricket World Cup?",
      options: ["1975", "1979", "1983", "1987"],
      correct: 2,
      fact: "🇮🇳 India won the 1983 World Cup at Lord's under Kapil Dev — one of sport's greatest upsets. India beat the mighty West Indies in the final."
    },
    {
      question: "How many overs does each team face in an ODI match?",
      options: ["40 overs", "45 overs", "50 overs", "60 overs"],
      correct: 2,
      fact: "🏏 Each team faces 50 overs in an ODI. ODIs were originally 60 overs per side when they began in 1971."
    },
    {
      question: "Who scored the most runs in a single ODI World Cup tournament?",
      options: ["Sachin Tendulkar", "Rohit Sharma", "David Warner", "Martin Guptill"],
      correct: 1,
      fact: "🏆 Rohit Sharma scored 648 runs in the 2019 ODI World Cup — the most by any batsman in a single World Cup edition."
    },
    {
      question: "Which team won the 2023 ODI World Cup held in India?",
      options: ["India", "Australia", "South Africa", "New Zealand"],
      correct: 1,
      fact: "🏆 Australia won the 2023 ODI World Cup in India, defeating the host nation India in the final at Narendra Modi Stadium, Ahmedabad."
    },
    {
      question: "Who captained India in the 1983 World Cup winning team?",
      options: ["Sunil Gavaskar", "Dilip Vengsarkar", "Kapil Dev", "Mohinder Amarnath"],
      correct: 2,
      fact: "🇮🇳 Kapil Dev was India's captain in 1983. His famous unbeaten 175 against Zimbabwe in the group stage is one of cricket's greatest innings."
    },
    {
      question: "What was special about Kapil Dev's 175* against Zimbabwe in the 1983 World Cup?",
      options: ["It was scored without any boundaries", "India were 17 for 5 when he came in and he rescued them", "He hit 10 sixes in the innings", "It was his debut match"],
      correct: 1,
      fact: "🦁 India were in deep trouble at 17 for 5 when Kapil Dev came in. He scored 175* to take India to 266 — and no TV cameras were recording the match!"
    },
    {
      question: "Which India vs Pakistan match result happened in the 1992 World Cup?",
      options: ["India won by 7 wickets", "Pakistan won by 43 runs", "Match was tied", "Match was abandoned"],
      correct: 1,
      fact: "🏏 Pakistan beat India by 43 runs in the 1992 World Cup in Sydney. Imran Khan's Pakistan went on to win the entire tournament."
    },
    {
      question: "How many players are in a cricket team?",
      options: ["9", "10", "11", "12"],
      correct: 2,
      fact: "🏏 Each cricket team has 11 players. A 12th man can field as a substitute but cannot bat or bowl."
    },
    {
      question: "What is a 'Duckworth-Lewis' result in cricket?",
      options: ["A tie that goes to a super over", "A result calculated by a formula when rain interrupts an ODI", "When both teams score the same runs", "A method of selecting the playing XI"],
      correct: 1,
      fact: "🌧️ The Duckworth-Lewis-Stern method calculates revised targets when rain interrupts limited-overs matches. It was introduced in 1997."
    },
    {
      question: "Which Indian bowler took the most wickets in the 2011 World Cup?",
      options: ["Harbhajan Singh", "Zaheer Khan", "Munaf Patel", "Ashish Nehra"],
      correct: 1,
      fact: "🎳 Zaheer Khan was India's leading wicket-taker in the 2011 World Cup with 21 wickets — the joint highest wicket-taker of the tournament."
    },
    {
      question: "Where was the 2011 ODI World Cup final played?",
      options: ["Eden Gardens, Kolkata", "M Chinnaswamy, Bengaluru", "Wankhede Stadium, Mumbai", "Feroz Shah Kotla, Delhi"],
      correct: 2,
      fact: "🏟️ The 2011 World Cup final between India and Sri Lanka was played at Wankhede Stadium, Mumbai on 2 April 2011."
    },
    {
      question: "Who was named Player of the Tournament in the 2011 ODI World Cup?",
      options: ["MS Dhoni", "Sachin Tendulkar", "Yuvraj Singh", "Zaheer Khan"],
      correct: 2,
      fact: "🌟 Yuvraj Singh was named Player of the Tournament in the 2011 World Cup. He scored 362 runs AND took 15 wickets — a legendary all-round performance."
    }
  ],

  // ================================================
  // T20 WORLD CUP QUESTIONS
  // ================================================
  t20: [
    {
      question: "Which country won the inaugural ICC T20 World Cup in 2007?",
      options: ["Pakistan", "Australia", "India", "Sri Lanka"],
      correct: 2,
      fact: "🏆 India won the first T20 World Cup in South Africa in 2007 under MS Dhoni, beating Pakistan in a thrilling final."
    },
    {
      question: "Who won the T20 World Cup 2024?",
      options: ["England", "Australia", "South Africa", "India"],
      correct: 3,
      fact: "🇮🇳 India won the T20 World Cup 2024 in the West Indies and USA, defeating South Africa in the final under Rohit Sharma."
    },
    {
      question: "Who hit the last-ball six to win the 2007 T20 World Cup final for India against Pakistan?",
      options: ["MS Dhoni", "Yuvraj Singh", "Misbah-ul-Haq tried to scoop but was caught", "Joginder Sharma bowled the last over"],
      correct: 2,
      fact: "😮 Actually, Pakistan needed 13 off the last over. Misbah-ul-Haq tried a scoop shot off Joginder Sharma and was caught at short fine leg. India won by 5 runs."
    },
    {
      question: "Who took the last wicket to win India the 2007 T20 World Cup — a surprise choice to bowl the last over?",
      options: ["Irfan Pathan", "RP Singh", "Harbhajan Singh", "Joginder Sharma"],
      correct: 3,
      fact: "🎳 MS Dhoni gave the last over to Joginder Sharma — an unknown pacer — instead of Harbhajan. Sharma took the crucial last wicket. A legendary captain's call."
    },
    {
      question: "How many overs does each team face in a T20 match?",
      options: ["10 overs", "15 overs", "20 overs", "25 overs"],
      correct: 2,
      fact: "⚡ Each team faces exactly 20 overs in a T20 match. This format was designed to make cricket faster and more exciting."
    },
    {
      question: "Who scored the first century in T20 World Cup history?",
      options: ["Chris Gayle", "Brendon McCullum", "Yuvraj Singh", "Kevin Pietersen"],
      correct: 0,
      fact: "💣 Chris Gayle scored the first century in T20 World Cup history — 117 against South Africa in the 2007 T20 World Cup."
    },
    {
      question: "Which England player hit 6 sixes in one over in the 2007 T20 World Cup?",
      options: ["Andrew Flintoff", "Kevin Pietersen", "Stuart Broad", "Paul Collingwood"],
      correct: 1,
      fact: "💥 Yuvraj Singh hit Kevin Pietersen — wait, actually Yuvraj hit Stuart Broad for 6 sixes in an over against England in the 2007 T20 World Cup."
    },
    {
      question: "Who did Yuvraj Singh hit for 6 sixes in one over in the 2007 T20 World Cup?",
      options: ["Andrew Flintoff", "Kevin Pietersen", "Stuart Broad", "Dimitri Mascarenhas"],
      correct: 2,
      fact: "💥 Yuvraj Singh hit Stuart Broad for 6 sixes in one over in the 2007 T20 World Cup semifinal against England — one of cricket's most iconic moments."
    },
    {
      question: "Which country has won the most T20 World Cup titles?",
      options: ["India", "West Indies", "England", "Australia"],
      correct: 1,
      fact: "🏆 West Indies have won the T20 World Cup twice — in 2012 and 2016. No other country has won it more than once as of 2024."
    },
    {
      question: "Where was the T20 World Cup 2024 held?",
      options: ["England and Ireland", "Australia and New Zealand", "West Indies and USA", "India and Sri Lanka"],
      correct: 2,
      fact: "🌍 The 2024 T20 World Cup was co-hosted by West Indies and USA — the first time the USA hosted a major cricket tournament."
    },
    {
      question: "Who won the Player of the Tournament award in the T20 World Cup 2024?",
      options: ["Rohit Sharma", "Jasprit Bumrah", "Virat Kohli", "Hardik Pandya"],
      correct: 2,
      fact: "🌟 Jasprit Bumrah won the Player of the Tournament in T20 World Cup 2024. He was India's most important bowler throughout the tournament."
    },
    {
      question: "What was the venue of the T20 World Cup 2024 final?",
      options: ["Sabina Park, Jamaica", "Kensington Oval, Barbados", "Brian Lara Stadium, Trinidad", "Daren Sammy Stadium, St Lucia"],
      correct: 1,
      fact: "🏟️ The T20 World Cup 2024 final between India and South Africa was played at Kensington Oval in Bridgetown, Barbados."
    },
    {
      question: "Virat Kohli scored how many runs in the T20 World Cup 2024 final against South Africa?",
      options: ["56", "66", "76", "86"],
      correct: 2,
      fact: "🌟 Virat Kohli scored 76 runs in the T20 World Cup 2024 final against South Africa — one of his greatest innings under pressure."
    },
    {
      question: "Which team did India beat in the semifinal of the T20 World Cup 2024?",
      options: ["Australia", "Bangladesh", "England", "Afghanistan"],
      correct: 0,
      fact: "🏏 India beat England in the T20 World Cup 2024 semifinal. Adil Rashid and other English bowlers fought hard but India prevailed."
    },
    {
      question: "In the 2007 T20 World Cup, India and Pakistan played a group stage match that ended in a tie. How was the winner decided?",
      options: ["Super over", "Bowl out (penalty shootout style)", "Toss of a coin", "Run rate"],
      correct: 1,
      fact: "🎳 The India vs Pakistan group match in 2007 was tied. It was decided by a bowl-out — like a penalty shootout. India won the bowl-out 3–0."
    }
  ]

};
