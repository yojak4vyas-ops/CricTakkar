// ===== CRICTAKKAR QUESTION BANK =====
// Each question has: the question, 4 options, correct answer index (0=A, 1=B, 2=C, 3=D), and a fun fact

const questionBank = [
  {
    question: "Who scored 281* against Australia in the 2001 Kolkata Test?",
    options: ["Sachin Tendulkar", "Rahul Dravid", "VVS Laxman", "Sourav Ganguly"],
    correct: 2,
    fact: "🌟 Laxman's 281* is considered one of the greatest Test innings ever. India won after following on!"
  },
  {
    question: "Which Indian batsman is known as 'The Wall'?",
    options: ["Sachin Tendulkar", "Rahul Dravid", "Virat Kohli", "Sunil Gavaskar"],
    correct: 1,
    fact: "🧱 Rahul Dravid earned the nickname 'The Wall' for his solid, unbeatable defensive batting style."
  },
  {
    question: "How many World Cups has India won?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    fact: "🏆 India won the ODI World Cup in 1983 (Kapil Dev) and 2011 (MS Dhoni), and the T20 World Cup in 2007 and 2024!"
  },
  {
    question: "Who hit the winning six in the 2011 ODI World Cup final?",
    options: ["Virat Kohli", "Yuvraj Singh", "MS Dhoni", "Sachin Tendulkar"],
    correct: 2,
    fact: "🎯 MS Dhoni came in at No. 5 ahead of in-form Yuvraj Singh and finished the match with an iconic six!"
  },
  {
    question: "Which IPL team has won the most IPL titles?",
    options: ["Chennai Super Kings", "Mumbai Indians", "Kolkata Knight Riders", "Sunrisers Hyderabad"],
    correct: 1,
    fact: "🏏 Mumbai Indians have won 5 IPL titles — the most by any team. CSK is close behind with 5 as well!"
  },
  {
    question: "Who holds the record for the highest individual score in Test cricket?",
    options: ["Brian Lara", "Sachin Tendulkar", "Matthew Hayden", "Virender Sehwag"],
    correct: 0,
    fact: "🦁 Brian Lara scored 400* against England in 2004. He also holds the previous record of 375!"
  },
  {
    question: "What does 'LBW' stand for in cricket?",
    options: ["Leg Before Wicket", "Left Ball Wide", "Leg Ball Wide", "Left Before Wicket"],
    correct: 0,
    fact: "📖 LBW means the ball hit the batsman's leg when it would have gone on to hit the stumps. A very common dismissal!"
  },
  {
    question: "Who was the first Indian to score an ODI double century?",
    options: ["Sachin Tendulkar", "Virender Sehwag", "Rohit Sharma", "MS Dhoni"],
    correct: 0,
    fact: "👑 Sachin Tendulkar scored 200* against South Africa in 2010 — the first ever double century in ODI cricket!"
  },
  {
    question: "Which stadium is known as the 'Home of Cricket' in India?",
    options: ["Wankhede Stadium", "Eden Gardens", "Narendra Modi Stadium", "Chepauk Stadium"],
    correct: 2,
    fact: "🏟️ Narendra Modi Stadium in Ahmedabad is the largest cricket stadium in the world with 1,32,000 capacity!"
  },
  {
    question: "Who is the highest wicket-taker in Test cricket history?",
    options: ["Shane Warne", "Anil Kumble", "Muttiah Muralitharan", "James Anderson"],
    correct: 2,
    fact: "🌀 Muttiah Muralitharan took 800 Test wickets — a record that may never be broken!"
  },
  {
    question: "Virat Kohli made his Test debut against which country?",
    options: ["Australia", "England", "Sri Lanka", "South Africa"],
    correct: 3,
    fact: "🌟 Virat Kohli made his Test debut in 2010 against South Africa at Centurion. He scored 4 and 20."
  },
  {
    question: "Which Indian bowler took a hat-trick in the 2011 World Cup?",
    options: ["Zaheer Khan", "Munaf Patel", "Harbhajan Singh", "Sreesanth"],
    correct: 0,
    fact: "🎳 Zaheer Khan took a hat-trick against Kenya in the 2011 World Cup. He was India's most important bowler that tournament!"
  },
  {
    question: "Who captained India in the inaugural T20 World Cup in 2007?",
    options: ["Sourav Ganguly", "Rahul Dravid", "MS Dhoni", "Sachin Tendulkar"],
    correct: 2,
    fact: "🏆 MS Dhoni was just 26 when he led a young Indian team to win the first-ever T20 World Cup in South Africa!"
  },
  {
    question: "What is the maximum number of overs in a Test cricket innings?",
    options: ["50", "80", "100", "No limit"],
    correct: 3,
    fact: "📜 In Test cricket there is no over limit! A team bats until 10 wickets fall or the captain declares."
  },
  {
    question: "Which Indian cricketer is nicknamed 'Hitman'?",
    options: ["Virat Kohli", "Rohit Sharma", "KL Rahul", "Shikhar Dhawan"],
    correct: 1,
    fact: "💥 Rohit Sharma earned the nickname 'Hitman' for his explosive sixes. He holds the record for most centuries in ODI World Cups!"
  },
  {
    question: "How many balls are there in one over in cricket?",
    options: ["4", "5", "6", "8"],
    correct: 2,
    fact: "🏏 One over = 6 legal deliveries. But if there are wides or no-balls, extra deliveries are bowled!"
  },
  {
    question: "Who scored the fastest century in ODI cricket?",
    options: ["AB de Villiers", "Shahid Afridi", "Chris Gayle", "Virender Sehwag"],
    correct: 0,
    fact: "⚡ AB de Villiers scored a century off just 31 balls against West Indies in 2015 — the fastest ODI 100 ever!"
  },
  {
    question: "In which year did India first win the Cricket World Cup?",
    options: ["1975", "1979", "1983", "1987"],
    correct: 2,
    fact: "🇮🇳 Kapil Dev lifted the World Cup in 1983 at Lord's, London — one of the biggest upsets in cricket history!"
  },
  {
    question: "Which bowler dismissed Sachin Tendulkar the most times in international cricket?",
    options: ["Glenn McGrath", "Shane Warne", "Wasim Akram", "Shoaib Akhtar"],
    correct: 0,
    fact: "🎯 Glenn McGrath dismissed Sachin 8 times in Tests — their battles are some of the greatest in cricket history!"
  },
  {
    question: "What is a 'golden duck' in cricket?",
    options: ["Scoring 50 runs", "Getting out on the first ball for zero", "Hitting 4 sixes in an over", "Taking 5 wickets"],
    correct: 1,
    fact: "🦆 A golden duck means you got out on the very first ball you faced without scoring a single run. Very embarrassing!"
  }
];
