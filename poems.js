// ===== CRICTAKKAR CRICKET POETRY =====
// Original poems written for CricTakkar. Any cricket fact referenced inside a poem
// (dates, scores, records) is drawn only from moments already verified elsewhere in
// the app (questions.js, category-questions.js, onthisday.js) — no new unverified
// claims are introduced here, per the Question Quality Rule.

const cricketPoems = [
  {
    id: 'the-wall',
    icon: '🧱',
    tag: 'Legends',
    title: 'The Wall',
    subtitle: 'Ode to Rahul Dravid',
    verses: [
      "They came with pace, they came with spin,\nsearching for a way to break within—\nbut stroke by stroke, over by over,\nfound no gap, found no way over.",
      "Thirteen thousand runs and more,\nbuilt like bricks upon a floor,\nno flourish asked, no crowd to please,\njust duty done on bended knees.",
      "They called him Wall, and rightly so—\nnot stone that stands, but stone that grows,\neach session longer, calmer still,\na captain's prayer, a bowler's chill.",
      "When others fell to strokes too bold,\nhe stayed and watched the total told,\nthe quiet gift of standing tall—\nsome win with flair; The Wall wins all."
    ]
  },
  {
    id: 'six-to-glory',
    icon: '🏆',
    tag: 'World Cup',
    title: 'Six to Glory',
    subtitle: '2 April 2011, Wankhede Stadium',
    verses: [
      "The night was thick with twenty-eight years' wait,\na billion hearts held still at Wankhede's gate,\none man walked out when wickets fell too fast,\nand calmly told the storm, \"not yet, not last.\"",
      "Ball by ball the target inched to reach,\ntill one long-hop arrived within his reach—\nhe swung, and time itself stood at the crease,\nthe crowd exhaled a nation's held-in peace.",
      "It cleared the rope, it cleared the years of pain,\nKapil's boys had waited, watched, again—\nnow Dhoni stood, bat raised against the sky,\nand twenty-eight became a single sigh."
    ]
  },
  {
    id: 'four-hundred-not-out',
    icon: '🦁',
    tag: 'Records',
    title: 'Four Hundred Not Out',
    subtitle: 'Antigua, 12 April 2004',
    verses: [
      "Four days of sun, four days of will,\na left hand bat who would not spill\na single chance, a single beat,\ntill record fell before his feet.",
      "Three-eighty gone, then one run more,\nthe number that stood tall before—\nhe shattered it, then kept his eye,\nand climbed until the sun climbed high.",
      "Four hundred runs, not out, not done,\na mountain moved by only one,\nLara stood where none had trod,\nand cricket watched, and cricket applaud."
    ]
  },
  {
    id: 'every-kids-sachin',
    icon: '🐐',
    tag: 'Legends',
    title: "Every Kid's Sachin",
    subtitle: 'For a career that spanned 24 years',
    verses: [
      "Sixteen years, a bat too big for him,\nKarachi's pace like fire and limb,\nhe took the blows, he stood his ground,\nand something in that boy was found.",
      "Two decades passed, a hundred more —\nof centuries the world had not seen before,\nnot one, not ten, but every soul who dreamed\nof holding bat found him where hope had gleamed.",
      "He did not shout, he let the willow speak,\nfor every heart too shy, too weak\nto say aloud what Sachin said in bat and stance:\nthat a small town boy can hold the world in his hands."
    ]
  },
  {
    id: 'edens-miracle',
    icon: '🌟',
    tag: 'Test Cricket',
    title: "Eden's Miracle",
    subtitle: 'Kolkata, March 2001',
    verses: [
      "Two men walked in when hope walked out,\nthe follow-on given, no room for doubt\nthat history's script had long been penned—\nand then two willows refused the end.",
      "Three hundred seventy-six they built,\nbrick by brick, no run left to guilt,\nLaxman calm, Dravid still,\nagainst a wall no team could drill.",
      "By the fifth day's fading light,\nthe impossible had turned to right—\nEden roared, the record fell,\nand cricket learned what patience tells."
    ]
  },
  {
    id: 'aao-crictakkar-karte-hain',
    icon: '🏏',
    tag: 'Anthem',
    title: 'Aao CricTakkar Karte Hain',
    subtitle: 'A love letter to the game, in Hindi',
    verses: [
      "बल्ले में जोश, दिल में जुनून,\nहर गली में खेलता कोई न कोई नून,\nतीन सौ चौंसठ दिन, एक ही ख़्वाब—\nचौका, छक्का, या फिर हिसाब।",
      "आओ CricTakkar करते हैं,\nसवाल पूछें, रिकॉर्ड्स बताते हैं,\nहार भी अपनी, जीत भी अपनी,\nक्रिकेट के रंग में रंगते हैं।",
      "न इनाम चाहिए, न दांव, न शर्त,\nबस इस खेल से इश्क़, बस यही है चाहत,\nक्विज़ दर क्विज़, स्ट्रीक दर स्ट्रीक,\nहर हिन्दुस्तानी दिल बोलता है — क्रिकेट ही तो है ज़िंदगी की पीक।"
    ]
  }
];

// ===== POETRY QUIZ =====
// Moved here from category-questions.js (Day 17) so Poetry has one single
// repository — the poems above and their matching quiz questions live together.
// Same question/options/correct/fact/era shape as questionBank in question-bank.js
// — the quiz engine needs no changes. Each poem is 4 lines or fewer and describes
// a moment already verified elsewhere in the app (question-bank.js/onthisday.js) —
// no new unverified facts introduced here.
const poetryQuizQuestions = [
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
];
