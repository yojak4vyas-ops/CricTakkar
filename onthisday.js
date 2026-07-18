// ===== CRICTAKKAR ON THIS DAY =====
// A small bank of dated cricket history events, each verified against ESPNcricinfo
// and/or Wikipedia before being added (Question Quality Rule applies here too, since
// a wrong date is just as bad as a wrong quiz answer). Started with 18 entries spread
// across the calendar — more can be added over time the same way.
//
// month is 1-12, day is 1-31 (calendar day, year is just for display/context —
// matching only checks month+day so the card recurs every year on that date).

const onThisDayEvents = [
  { month: 2, day: 7, year: 1999, title: "Kumble's perfect 10", fact: "🎳 Anil Kumble took 10 wickets for 74 runs against Pakistan at Feroz Shah Kotla, Delhi — only the second bowler in Test history to take all 10 in an innings." },
  { month: 2, day: 24, year: 2010, title: "Sachin's ODI double century", fact: "👑 Sachin Tendulkar scored 200* off 147 balls against South Africa in Gwalior — the first double century in ODI history." },
  { month: 3, day: 15, year: 2001, title: "The Eden Gardens miracle", fact: "🌟 India beat Australia by 171 runs at Eden Gardens after following on — only the third time this had happened in Test history. VVS Laxman's 281 and Rahul Dravid's 180 added 376 runs together." },
  { month: 3, day: 16, year: 2012, title: "Sachin's 100th international century", fact: "🏏 Sachin Tendulkar became the first batsman ever to score 100 international centuries, reaching the landmark against Bangladesh in the 2012 Asia Cup at Mirpur." },
  { month: 4, day: 2, year: 2011, title: "India lift the World Cup at home", fact: "🏆 India beat Sri Lanka by 6 wickets at Wankhede Stadium, Mumbai to win the 2011 Cricket World Cup — becoming the first team ever to win the World Cup on home soil." },
  { month: 4, day: 12, year: 2004, title: "Lara's 400 not out", fact: "🦁 Brian Lara scored an unbeaten 400 against England in Antigua — still the highest individual score in Test cricket history." },
  { month: 4, day: 18, year: 2008, title: "The first ever IPL match", fact: "🏟️ The very first IPL match was played at M Chinnaswamy Stadium, Bengaluru — RCB vs KKR. Brendon McCullum smashed an unbeaten 158 as KKR won by 140 runs." },
  { month: 6, day: 3, year: 2025, title: "RCB's maiden IPL title", fact: "🏆 Royal Challengers Bengaluru won their first ever IPL title, beating Punjab Kings by 6 runs in the final at Narendra Modi Stadium, Ahmedabad." },
  { month: 6, day: 18, year: 1983, title: "Kapil Dev's forgotten masterpiece", fact: "🔥 Kapil Dev scored an unbeaten 175 against Zimbabwe at Tunbridge Wells after India had slipped to 17 for 5 — one of the greatest ODI innings ever, and there's no surviving footage of it." },
  { month: 6, day: 25, year: 1932, title: "India's first ever Test match", fact: "🇬🇧 India played their first ever Test match, against England at Lord's, with CK Nayudu as captain. England won, but Mohammad Nissar's opening burst left them shaken." },
  { month: 6, day: 25, year: 1983, title: "India's first World Cup", fact: "🇮🇳 India beat the mighty West Indies by 43 runs at Lord's to win their first Cricket World Cup — one of the biggest upsets in sport history, under captain Kapil Dev." },
  { month: 7, day: 11, year: 1930, title: "Bradman's 309 in a day", fact: "🐐 Don Bradman scored 309 runs in a single day of Test cricket against England at Headingley, Leeds — a record that still stands nearly a century later." },
  { month: 7, day: 21, year: 1981, title: "Botham's Ashes miracle", fact: "🔥 England, forced to follow on at Headingley, somehow beat Australia by 18 runs — Ian Botham's defiant 149 not out set up the chase, and Bob Willis ripped through with 8 for 43. Only the second team in Test history to win after following on." },
  { month: 7, day: 22, year: 2010, title: "Murali's perfect goodbye", fact: "🎯 Muttiah Muralitharan took his 800th Test wicket — Pragyan Ojha, caught behind — off the very last ball he ever bowled in Test cricket, at his farewell Test in Galle. He remains the only bowler in history to reach 800 Test wickets." },
  { month: 7, day: 23, year: 2017, title: "India's heartbreak at Lord's", fact: "😢 A packed Lord's watched England beat India by just 9 runs to win the Women's Cricket World Cup — India lost their last 7 wickets for only 28 runs while chasing 229. Anya Shrubsole's 6 for 46 sealed it, but India's run to the final transformed the profile of women's cricket back home." },
  { month: 7, day: 26, year: 1902, title: "Cricket's tightest classic", fact: "😰 Australia beat England by just 3 runs at Old Trafford — one of the closest results in Test history. Victor Trumper had scored a century before lunch on day one, and England's last man, Fred Tate, was out for 4 attempting the winning hit after dropping a crucial catch earlier in the match." },
  { month: 7, day: 28, year: 1973, title: "The first ever Cricket World Cup", fact: "🏆 Two years before the men's first World Cup, England beat Australia by 92 runs at Edgbaston to win the inaugural Women's Cricket World Cup — cricket's very first World Cup of any kind. Enid Bakewell's 118 anchored England's winning total." },
  { month: 7, day: 31, year: 1956, title: "Laker's impossible 19", fact: "🎳 Jim Laker took 19 wickets for 90 runs in a single Test at Old Trafford — 9 for 37 in the first innings and all 10 for 53 in the second — still the best match bowling figures in first-class cricket history, over 65 years on." },
  { month: 8, day: 1, year: 1993, title: "England's second Women's World Cup", fact: "🏆 England beat New Zealand by 67 runs at Lord's to win the 1993 Women's Cricket World Cup — their second title, and their first since the inaugural 1973 tournament. Jo Chamberlain was Player of the Match." },
  { month: 8, day: 2, year: 2003, title: "Smith's twin double at Lord's", fact: "🏏 Graeme Smith, in only his fourth Test as captain, made 259 at Lord's — following 277 at Edgbaston earlier in the series — still the highest score by a visiting batsman at Lord's, surpassing Don Bradman's 254 from 1930. South Africa won by an innings and 92 runs." },
  { month: 8, day: 3, year: 2000, title: "A joint 100th Test cap", fact: "💯 Mike Atherton and Alec Stewart both played their 100th Test together, against West Indies at Old Trafford — Stewart marked the occasion with 105, becoming only the fourth player in history to score a century in his 100th Test." },
  { month: 8, day: 4, year: 2019, title: "Smith's comeback double at Edgbaston", fact: "🔥 On his first Test back from a one-year ball-tampering ban, Steve Smith scored 144 and 142 at Edgbaston — becoming only the fifth Australian ever to score twin centuries in an Ashes Test — as Australia won by 251 runs." },
  { month: 8, day: 6, year: 2015, title: "Broad blows Australia away at Trent Bridge", fact: "💥 Stuart Broad took 8 for 15 as Australia were bowled out for just 60 in 18.3 overs — the fewest overs a team has faced in a Test innings — helping England win by an innings and 78 runs to regain the Ashes at Trent Bridge." },
  { month: 8, day: 7, year: 1997, title: "Brothers on debut", fact: "👬 Adam and Ben Hollioake became just the third pair of brothers to make their England Test debut in the same match, in the fifth Ashes Test at Trent Bridge. Ben, aged 19 years 269 days, was England's youngest Test player since 1949." },
  { month: 8, day: 7, year: 2005, title: "Edgbaston's 2-run classic", fact: "😱 England beat Australia by 2 runs at Edgbaston — the narrowest margin of victory in Ashes history — after Michael Kasprowicz gloved Steve Harmison behind with Australia just 3 runs short. Andrew Flintoff's all-round performance and sportsmanship toward a devastated Brett Lee became one of cricket's most iconic images." },
  { month: 8, day: 13, year: 1976, title: "Richards' 291", fact: "🔥 Viv Richards made 291 against England at The Oval — his second double-century of the series, having also scored 232 at Trent Bridge earlier in the summer." },
  { month: 8, day: 13, year: 1982, title: "Mohsin Khan's Lord's double", fact: "🏏 Mohsin Khan scored 200 at Lord's, setting up a ten-wicket win for Pakistan — their first Test win in England in 28 years — with opening partner Mudassar Nazar chipping in with 6 for 32 in England's second innings." },
  { month: 8, day: 14, year: 1948, title: "Bradman's final duck", fact: "😢 Don Bradman was bowled for a duck by Eric Hollies in his very last Test innings, at The Oval — needing just 4 runs to retire with a career average of exactly 100, he finished on 99.94 instead, still the greatest batting average in Test history." },
  { month: 8, day: 15, year: 1964, title: "Fiery Fred's 300", fact: "🎯 Fred Trueman became the first bowler in history to take 300 Test wickets at The Oval. Having dismissed Ian Redpath and Garth McKenzie off successive balls, he just missed a hat-trick when Neil Hawke survived the next delivery — only for Hawke himself to become the historic 300th wicket, caught by Colin Cowdrey." },
  { month: 8, day: 16, year: 2000, title: "Cricket goes indoors", fact: "🏟️ Australia beat South Africa by 94 runs at Melbourne's Colonial Stadium in the first ever international cricket match played indoors, under a closed retractable roof." },
  { month: 8, day: 17, year: 1976, title: "Holding's Oval demolition", fact: "💥 Michael Holding took 14 wickets for 149 runs in the match (8 for 92 and 6 for 57) against England at The Oval — still the best match figures ever by a West Indian bowler, on a pitch so flat that every other fast bowler in the match combined took only 5 wickets." },
  { month: 8, day: 17, year: 2002, title: "Mithali Raj's world record 214", fact: "🏏 A 19-year-old Mithali Raj scored 214 against England at Taunton — the highest individual score in women's Test cricket at the time, breaking Karen Rolton's 209*. The record has since been passed by Pakistan's Kiran Baluch (242 in 2004)." },
  { month: 8, day: 21, year: 1986, title: "Botham's script-writer moment", fact: "🎬 Ian Botham, back from a two-month ban, dismissed New Zealand's Bruce Edgar with the very first ball of his comeback Test at The Oval to equal Dennis Lillee's world record of 355 Test wickets — then went past it in his next over. Team-mate Graham Gooch's reaction summed it up: \"Who writes your scripts?\"" },
  { month: 8, day: 23, year: 1938, title: "Hutton's record 364", fact: "📈 22-year-old Len Hutton passed Don Bradman's Ashes record of 334 on his way to 364 at The Oval — the highest individual Test score at the time — as England declared on 903 for 7, still their highest Test total ever. Bradman, who fractured his ankle while bowling, was the first to congratulate him." },
  { month: 8, day: 25, year: 2019, title: "Stokes' Headingley miracle", fact: "🤯 Chasing 359 and reduced to 286 for 9, Ben Stokes carried England home with an unbeaten 135, adding 76 for the last wicket with Jack Leach (1 not out) — England's highest-ever successful Test run chase, keeping the 2019 Ashes alive with a one-wicket win." },
  { month: 8, day: 27, year: 1968, title: "The Oval's rain-soaked thriller", fact: "🌧️ England beat Australia by 226 runs at The Oval to level the series, after spectators helped mop up a lunchtime storm so play could resume — Derek Underwood took 7 for 50 with just minutes to spare. Basil D'Oliveira's 158 in the match fueled the political storm that followed when he was later left out of the tour to South Africa." },
  { month: 8, day: 27, year: 1973, title: "Sobers' last hurrah at Lord's", fact: "🙌 On what turned out to be his last tour of England, Garry Sobers made the 26th and final Test century of his career at Lord's, and held six catches in the match to equal the then-record for catches by a non-wicketkeeper in a Test." },
  { month: 8, day: 28, year: 1992, title: "A wizard's quiet beginning", fact: "🎩 Muttiah Muralitharan made his Test debut against Australia in Colombo, taking 3 for 141 — Craig McDermott his first wicket. Nobody could have guessed it was the start of a career that would end with 800 Test wickets, still the most by anyone in history." },
  { month: 8, day: 29, year: 1882, title: "The birth of the Ashes", fact: "☠️ Australia beat England by 7 runs at The Oval — England's first-ever home Test defeat — as Fred Spofforth took 14 wickets in the match. The Sporting Times ran a mock obituary for English cricket, joking its ashes would be sent to Australia, and the name stuck forever." },
  { month: 9, day: 19, year: 2007, title: "Yuvraj's six sixes", fact: "💥 Yuvraj Singh hit Stuart Broad for six sixes in a single over during the 2007 T20 World Cup in Durban — the first player to do it in international T20 cricket." },
  { month: 9, day: 24, year: 2007, title: "India's first T20 World Cup", fact: "🏆 MS Dhoni's young India side beat Pakistan by 5 runs in Johannesburg to win the inaugural ICC T20 World Cup, with Joginder Sharma bowling the final over." },
  { month: 11, day: 13, year: 2014, title: "Rohit's 264", fact: "💥 Rohit Sharma scored 264 against Sri Lanka at Eden Gardens, Kolkata — still the highest individual score in ODI history." },
  { month: 11, day: 14, year: 2013, title: "Sachin's final Test begins", fact: "🙏 Sachin Tendulkar walked out for his 200th and final Test, against West Indies at Wankhede Stadium — the closing chapter of a 24-year international career." },
  { month: 11, day: 15, year: 1989, title: "Sachin's international debut", fact: "🇮🇳 A 16-year-old Sachin Tendulkar made his Test debut against Pakistan in Karachi — the start of a career that would redefine Indian cricket." },
  { month: 11, day: 19, year: 2023, title: "Australia's sixth World Cup", fact: "🏆 Australia beat host nation India in the 2023 ODI World Cup final at Narendra Modi Stadium, Ahmedabad, to win a record sixth World Cup title." }
];

// ===== PICK AND RENDER TODAY'S CARD =====
function renderOnThisDay() {
  var container = document.getElementById('onThisDayContent');
  if (!container) return;

  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();

  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  var todayReadable = day + ' ' + MONTH_NAMES[month - 1];

  var matches = onThisDayEvents.filter(function(e) { return e.month === month && e.day === day; });

  if (matches.length > 0) {
    // If more than one event shares a date, rotate deterministically by day-of-year
    // (same pattern Wordle uses) so it's consistent for everyone, but not always the first.
    var dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    var event = matches[dayNumber % matches.length];

    container.innerHTML =
      '<div class="otd-card">' +
        '<div class="otd-eyebrow">📅 On This Day, ' + todayReadable + ' — ' + event.year + '</div>' +
        '<div class="otd-title">' + event.title + '</div>' +
        '<p class="otd-fact">' + event.fact + '</p>' +
      '</div>';
    return;
  }

  // No historical event logged for today yet — fall back to a "Did You Know" fact
  // from the already-verified daily quiz question bank, rotating daily like Wordle does.
  // Still names today's date so it's clear this card is part of On This Day, not a
  // separate unrelated feature.
  if (typeof questionBank !== 'undefined' && questionBank.length > 0) {
    var dayNumber2 = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    var q = questionBank[dayNumber2 % questionBank.length];

    container.innerHTML =
      '<div class="otd-subtext">No cricket event logged for ' + todayReadable + ' yet — here\'s a fact instead:</div>' +
      '<div class="otd-card">' +
        '<div class="otd-eyebrow">💡 Did You Know</div>' +
        '<p class="otd-fact">' + q.fact + '</p>' +
      '</div>';
  } else {
    container.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', renderOnThisDay);
