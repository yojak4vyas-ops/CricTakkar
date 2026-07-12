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

  var matches = onThisDayEvents.filter(function(e) { return e.month === month && e.day === day; });

  if (matches.length > 0) {
    // If more than one event shares a date, rotate deterministically by day-of-year
    // (same pattern Wordle uses) so it's consistent for everyone, but not always the first.
    var dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    var event = matches[dayNumber % matches.length];

    container.innerHTML =
      '<div class="otd-card">' +
        '<div class="otd-eyebrow">📅 On This Day — ' + event.year + '</div>' +
        '<div class="otd-title">' + event.title + '</div>' +
        '<p class="otd-fact">' + event.fact + '</p>' +
      '</div>';
    return;
  }

  // No historical event logged for today yet — fall back to a "Did You Know" fact
  // from the already-verified daily quiz question bank, rotating daily like Wordle does.
  if (typeof questionBank !== 'undefined' && questionBank.length > 0) {
    var dayNumber2 = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
    var q = questionBank[dayNumber2 % questionBank.length];

    container.innerHTML =
      '<div class="otd-card">' +
        '<div class="otd-eyebrow">💡 Did You Know</div>' +
        '<p class="otd-fact">' + q.fact + '</p>' +
      '</div>';
  } else {
    container.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', renderOnThisDay);
