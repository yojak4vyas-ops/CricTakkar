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
  { month: 7, day: 19, year: 1952, title: "Trueman tears into India", fact: "🔥 A 21-year-old Fred Trueman took 8 for 31 in his third-ever Test, as India collapsed to 58 all out against England at Old Trafford — England won by an innings and 207 runs." },
  { month: 7, day: 19, year: 2015, title: "Smith's Lord's double", fact: "🏏 Steve Smith made 215 — the first double-century by an Australian at Lord's since World War II — as Australia thrashed England by 405 runs to level the 2015 Ashes, bowling the hosts out for just 103 in the second innings." },
  { month: 7, day: 20, year: 2017, title: "Harmanpreet's 171*", fact: "💥 Batting through injury with a dislocated finger, Harmanpreet Kaur smashed an unbeaten 171 off 115 balls against defending champions Australia in the 2017 Women's World Cup semi-final at Derby, taking India to their second World Cup final by 36 runs." },
  { month: 7, day: 20, year: 2009, title: "Flintoff's Lord's farewell", fact: "🎯 Andrew Flintoff took a five-wicket haul in his final Test appearance at Lord's, sealing a 115-run win over Australia — England's first Ashes victory at the Home of Cricket in 75 years." },
  { month: 7, day: 21, year: 1981, title: "Botham's Ashes miracle", fact: "🔥 England, forced to follow on at Headingley, somehow beat Australia by 18 runs — Ian Botham's defiant 149 not out set up the chase, and Bob Willis ripped through with 8 for 43. Only the second team in Test history to win after following on." },
  { month: 7, day: 22, year: 2010, title: "Murali's perfect goodbye", fact: "🎯 Muttiah Muralitharan took his 800th Test wicket — Pragyan Ojha, caught behind — off the very last ball he ever bowled in Test cricket, at his farewell Test in Galle. He remains the only bowler in history to reach 800 Test wickets." },
  { month: 7, day: 23, year: 2017, title: "India's heartbreak at Lord's", fact: "😢 A packed Lord's watched England beat India by just 9 runs to win the Women's Cricket World Cup — India lost their last 7 wickets for only 28 runs while chasing 229. Anya Shrubsole's 6 for 46 sealed it, but India's run to the final transformed the profile of women's cricket back home." },
  { month: 7, day: 24, year: 2010, title: "Amir's Headingley heist", fact: "🌟 A 18-year-old Mohammad Amir took 7 wickets in the match to help Pakistan beat Australia at Headingley — their first Test win over Australia in 15 years, after Australia were skittled for just 88." },
  { month: 7, day: 25, year: 2011, title: "The 2000th Test", fact: "💯 Lord's hosted the 2000th Test match ever played — fittingly also the 100th between England and India. Kevin Pietersen's unbeaten 202 anchored England's 474 for 8 declared, and India lost by an innings, denying Sachin Tendulkar a shot at his 100th international century at the Home of Cricket (he'd get there 8 months later, against Bangladesh)." },
  { month: 7, day: 26, year: 1902, title: "Cricket's tightest classic", fact: "😰 Australia beat England by just 3 runs at Old Trafford — one of the closest results in Test history. Victor Trumper had scored a century before lunch on day one, and England's last man, Fred Tate, was out for 4 attempting the winning hit after dropping a crucial catch earlier in the match." },
  { month: 7, day: 27, year: 1990, title: "Gooch's 456-run match", fact: "🐐 Graham Gooch made 333 and 123 against India at Lord's, becoming the first batsman ever to score a triple-century and a century in the same first-class match — his match aggregate of 456 remains a Test record for one batter in a single match." },
  { month: 7, day: 27, year: 2025, title: "Old Trafford rearguard", fact: "🛡️ Washington Sundar scored his maiden Test century, alongside Ravindra Jadeja's hundred, to bat out the final day and save the fourth Test against England at Old Trafford in the inaugural Anderson-Tendulkar Trophy — after England had piled up 669." },
  { month: 7, day: 28, year: 1973, title: "The first ever Cricket World Cup", fact: "🏆 Two years before the men's first World Cup, England beat Australia by 92 runs at Edgbaston to win the inaugural Women's Cricket World Cup — cricket's very first World Cup of any kind. Enid Bakewell's 118 anchored England's winning total." },
  { month: 7, day: 29, year: 2006, title: "The biggest stand of all", fact: "🧱 Mahela Jayawardene (374) and Kumar Sangakkara (287) added 624 for Sri Lanka's third wicket against South Africa in Colombo — still the highest partnership for any wicket in Test cricket history, batting for nearly three days." },
  { month: 7, day: 29, year: 2001, title: "Masakadza's teenage ton", fact: "🌱 At 17 years and 354 days old, Hamilton Masakadza became the youngest player ever to score a century on Test debut, and the first black African Test centurion, making 119 for Zimbabwe against West Indies — a record that lasted barely six weeks before Bangladesh's Mohammad Ashraful broke it." },
  { month: 7, day: 30, year: 1995, title: "Cork's hat-trick", fact: "🎩 Dominic Cork took a hat-trick against West Indies at Old Trafford — the first Test hat-trick by an England bowler since Peter Loader in 1957 — as England went on to win by six wickets." },
  { month: 7, day: 31, year: 1956, title: "Laker's impossible 19", fact: "🎳 Jim Laker took 19 wickets for 90 runs in a single Test at Old Trafford — 9 for 37 in the first innings and all 10 for 53 in the second — still the best match bowling figures in first-class cricket history, over 65 years on." },
  { month: 8, day: 1, year: 1993, title: "England's second Women's World Cup", fact: "🏆 England beat New Zealand by 67 runs at Lord's to win the 1993 Women's Cricket World Cup — their second title, and their first since the inaugural 1973 tournament. Jo Chamberlain was Player of the Match." },
  { month: 8, day: 5, year: 1966, title: "Sobers' Headingley masterclass", fact: "👑 Garry Sobers scored 174 and took match figures of 8 for 80 (5 for 41 plus 3 in the follow-on) against England at Headingley — part of a series in which he made 722 runs at 103.14 and took 20 wickets as West Indies won 3-1." },
  { month: 8, day: 2, year: 2003, title: "Smith's twin double at Lord's", fact: "🏏 Graeme Smith, in only his fourth Test as captain, made 259 at Lord's — following 277 at Edgbaston earlier in the series — still the highest score by a visiting batsman at Lord's, surpassing Don Bradman's 254 from 1930. South Africa won by an innings and 92 runs." },
  { month: 8, day: 3, year: 2000, title: "A joint 100th Test cap", fact: "💯 Mike Atherton and Alec Stewart both played their 100th Test together, against West Indies at Old Trafford — Stewart marked the occasion with 105, becoming only the fourth player in history to score a century in his 100th Test." },
  { month: 8, day: 4, year: 2019, title: "Smith's comeback double at Edgbaston", fact: "🔥 On his first Test back from a one-year ball-tampering ban, Steve Smith scored 144 and 142 at Edgbaston — becoming only the fifth Australian ever to score twin centuries in an Ashes Test — as Australia won by 251 runs." },
  { month: 8, day: 6, year: 2015, title: "Broad blows Australia away at Trent Bridge", fact: "💥 Stuart Broad took 8 for 15 as Australia were bowled out for just 60 in 18.3 overs — the fewest overs a team has faced in a Test innings — helping England win by an innings and 78 runs to regain the Ashes at Trent Bridge." },
  { month: 8, day: 7, year: 1997, title: "Brothers on debut", fact: "👬 Adam and Ben Hollioake became just the third pair of brothers to make their England Test debut in the same match, in the fifth Ashes Test at Trent Bridge. Ben, aged 19 years 269 days, was England's youngest Test player since 1949." },
  { month: 8, day: 7, year: 2005, title: "Edgbaston's 2-run classic", fact: "😱 England beat Australia by 2 runs at Edgbaston — the narrowest margin of victory in Ashes history — after Michael Kasprowicz gloved Steve Harmison behind with Australia just 3 runs short. Andrew Flintoff's all-round performance and sportsmanship toward a devastated Brett Lee became one of cricket's most iconic images." },
  { month: 8, day: 9, year: 1955, title: "The 347-run stand", fact: "🏗️ Denis Atkinson (219) and wicketkeeper Clairmonte Depeiaza (122) added 347 for West Indies' seventh wicket against Australia in Bridgetown — still a Test record for that wicket today. Atkinson also took 5 for 56, becoming the first player to score a century and take a five-for in the same Test." },
  { month: 8, day: 10, year: 1991, title: "Tufnell's Oval spell", fact: "🌀 Phil Tufnell took 6 for 25 as England bowled out West Indies at The Oval to level the series — a career-best haul that came from a devastating mid-innings burst of wickets." },
  { month: 8, day: 11, year: 2005, title: "Warne's 600th", fact: "🎳 Shane Warne became the first bowler in Test history to reach 600 wickets, trapping Marcus Trescothick at Old Trafford during the 2005 Ashes — Adam Gilchrist completing a juggling catch off the leading edge." },
  { month: 8, day: 11, year: 1977, title: "Boycott's 100th, on cue", fact: "💯 Geoffrey Boycott became the first player ever to score his 100th first-class century in a Test match itself, doing it on his home ground at Headingley against Australia — he went on to make 191." },
  { month: 8, day: 12, year: 1972, title: "Brothers in arms", fact: "👬 Ian Chappell made 192 and Greg Chappell also reached three figures in the same Test innings against England at The Oval, the pair adding 201 together — the first pair of brothers ever to both score centuries in the same Test innings." },
  { month: 8, day: 13, year: 1976, title: "Richards' 291", fact: "🔥 Viv Richards made 291 against England at The Oval — his second double-century of the series, having also scored 232 at Trent Bridge earlier in the summer." },
  { month: 8, day: 13, year: 1982, title: "Mohsin Khan's Lord's double", fact: "🏏 Mohsin Khan scored 200 at Lord's, setting up a ten-wicket win for Pakistan — their first Test win in England in 28 years — with opening partner Mudassar Nazar chipping in with 6 for 32 in England's second innings." },
  { month: 8, day: 14, year: 1948, title: "Bradman's final duck", fact: "😢 Don Bradman was bowled for a duck by Eric Hollies in his very last Test innings, at The Oval — needing just 4 runs to retire with a career average of exactly 100, he finished on 99.94 instead, still the greatest batting average in Test history." },
  { month: 8, day: 15, year: 1964, title: "Fiery Fred's 300", fact: "🎯 Fred Trueman became the first bowler in history to take 300 Test wickets at The Oval. Having dismissed Ian Redpath and Garth McKenzie off successive balls, he just missed a hat-trick when Neil Hawke survived the next delivery — only for Hawke himself to become the historic 300th wicket, caught by Colin Cowdrey." },
  { month: 8, day: 16, year: 2000, title: "Cricket goes indoors", fact: "🏟️ Australia beat South Africa by 94 runs at Melbourne's Colonial Stadium in the first ever international cricket match played indoors, under a closed retractable roof." },
  { month: 8, day: 17, year: 1976, title: "Holding's Oval demolition", fact: "💥 Michael Holding took 14 wickets for 149 runs in the match (8 for 92 and 6 for 57) against England at The Oval — still the best match figures ever by a West Indian bowler, on a pitch so flat that every other fast bowler in the match combined took only 5 wickets." },
  { month: 8, day: 17, year: 2002, title: "Mithali Raj's world record 214", fact: "🏏 A 19-year-old Mithali Raj scored 214 against England at Taunton — the highest individual score in women's Test cricket at the time, breaking Karen Rolton's 209*. The record has since been passed by Pakistan's Kiran Baluch (242 in 2004)." },
  { month: 8, day: 18, year: 1934, title: "Ponsford and Bradman's 451", fact: "🧱 Bill Ponsford (266, his last Test innings) and Don Bradman (244) added 451 for Australia's second wicket against England at The Oval — still the highest partnership in Australian Test history." },
  { month: 8, day: 18, year: 2000, title: "The two-day Test", fact: "⚡ England bowled out West Indies for just 61 to win inside two days at Headingley — the first Test finished in two days since 1946 — with Andy Caddick taking four wickets in a single over." },
  { month: 8, day: 19, year: 1953, title: "England regain the Ashes", fact: "🏆 England won the Ashes back at The Oval after a 19-year wait, Tony Lock and Jim Laker sharing nine wickets in Australia's second innings — the first Ashes series won under a professional (not amateur) England captain, Len Hutton." },
  { month: 8, day: 20, year: 2006, title: "The forfeited Test", fact: "😤 Pakistan refused to retake the field after being penalised for ball-tampering at The Oval, and umpires awarded the match to England by forfeit — the first Test in history to end this way, in over 1,000 Tests played to that point." },
  { month: 8, day: 21, year: 1986, title: "Botham's script-writer moment", fact: "🎬 Ian Botham, back from a two-month ban, dismissed New Zealand's Bruce Edgar with the very first ball of his comeback Test at The Oval to equal Dennis Lillee's world record of 355 Test wickets — then went past it in his next over. Team-mate Graham Gooch's reaction summed it up: \"Who writes your scripts?\"" },
  { month: 8, day: 22, year: 1930, title: "Bradman's 974", fact: "🐐 Don Bradman's 232 sealed an innings win for Australia at The Oval and regained the Ashes — capping a series in which he scored 974 runs at 139.14, including three double-centuries, still the record for the most runs in a single Test series nearly a century on." },
  { month: 8, day: 22, year: 2011, title: "England complete the sweep", fact: "🧹 England finished off a 4-0 series whitewash of India at The Oval — Ian Bell's maiden Test double-century (235) built a 350-run stand with Kevin Pietersen, while India's Rahul Dravid carried his bat for an unbeaten 146 in the follow-on." },
  { month: 8, day: 23, year: 1938, title: "Hutton's record 364", fact: "📈 22-year-old Len Hutton passed Don Bradman's Ashes record of 334 on his way to 364 at The Oval — the highest individual Test score at the time — as England declared on 903 for 7, still their highest Test total ever. Bradman, who fractured his ankle while bowling, was the first to congratulate him." },
  { month: 8, day: 24, year: 1971, title: "India's first Test win in England", fact: "🇮🇳 Bhagwath Chandrasekhar took 6 for 38 to bowl England out for just 101 at The Oval, as India won by 4 wickets — their first-ever Test victory on English soil, ending England's 26-Test unbeaten run." },
  { month: 8, day: 24, year: 1972, title: "The first ODI century", fact: "💯 Dennis Amiss scored 103 for England against Australia at Old Trafford — the first century ever made in One Day International cricket." },
  { month: 8, day: 25, year: 2019, title: "Stokes' Headingley miracle", fact: "🤯 Chasing 359 and reduced to 286 for 9, Ben Stokes carried England home with an unbeaten 135, adding 76 for the last wicket with Jack Leach (1 not out) — England's highest-ever successful Test run chase, keeping the 2019 Ashes alive with a one-wicket win." },
  { month: 8, day: 27, year: 1968, title: "The Oval's rain-soaked thriller", fact: "🌧️ England beat Australia by 226 runs at The Oval to level the series, after spectators helped mop up a lunchtime storm so play could resume — Derek Underwood took 7 for 50 with just minutes to spare. Basil D'Oliveira's 158 in the match fueled the political storm that followed when he was later left out of the tour to South Africa." },
  { month: 8, day: 27, year: 1973, title: "Sobers' last hurrah at Lord's", fact: "🙌 On what turned out to be his last tour of England, Garry Sobers made the 26th and final Test century of his career at Lord's, and held six catches in the match to equal the then-record for catches by a non-wicketkeeper in a Test." },
  { month: 8, day: 28, year: 1992, title: "A wizard's quiet beginning", fact: "🎩 Muttiah Muralitharan made his Test debut against Australia in Colombo, taking 3 for 141 — Craig McDermott his first wicket. Nobody could have guessed it was the start of a career that would end with 800 Test wickets, still the most by anyone in history." },
  { month: 8, day: 26, year: 1920, title: "The 35-minute century", fact: "⚡ Percy Fender scored a century in just 35 minutes for Surrey against Northamptonshire — still the fastest century by time in first-class cricket history, over a century later." },
  { month: 8, day: 26, year: 1963, title: "Worrell's final bow", fact: "🙏 Frank Worrell led West Indies to an eight-wicket win over England at The Oval in his final Test, sealing a 3-1 series victory — he was the first black cricketer to captain West Indies for an entire series, and the two nations now play for the Frank Worrell Trophy." },
  { month: 8, day: 29, year: 1882, title: "The birth of the Ashes", fact: "☠️ Australia beat England by 7 runs at The Oval — England's first-ever home Test defeat — as Fred Spofforth took 14 wickets in the match. The Sporting Times ran a mock obituary for English cricket, joking its ashes would be sent to Australia, and the name stuck forever." },
  { month: 9, day: 19, year: 2007, title: "Yuvraj's six sixes", fact: "💥 Yuvraj Singh hit Stuart Broad for six sixes in a single over during the 2007 T20 World Cup in Durban — the first player to do it in international T20 cricket." },
  { month: 9, day: 24, year: 2007, title: "India's first T20 World Cup", fact: "🏆 MS Dhoni's young India side beat Pakistan by 5 runs in Johannesburg to win the inaugural ICC T20 World Cup, with Joginder Sharma bowling the final over." },
  { month: 9, day: 12, year: 2005, title: "Pietersen seals the urn", fact: "🏆 Kevin Pietersen's series-defining 158 helped England hold on for a draw at The Oval, sealing a 2-1 series win and reclaiming the Ashes for the first time since 1986-87 after Australia's 16-year, eight-series stranglehold on the urn." },
  { month: 9, day: 30, year: 2002, title: "Cricket's only shared world trophy", fact: "🤝 Rain twice washed out the ICC Champions Trophy final between India and Sri Lanka at the R. Premadasa Stadium, Colombo — after two separate attempts on 29 and 30 September both ended in downpours, the tournament trophy was shared, the only time this has happened in a global ICC event." },
  { month: 10, day: 5, year: 2023, title: "Ravindra's stunning World Cup bow", fact: "🌟 In his first-ever World Cup match, New Zealand's Rachin Ravindra made 123 not out and put on an unbeaten 273 with Devon Conway as New Zealand chased down defending champions England's 282 by 9 wickets in the tournament opener at Ahmedabad." },
  { month: 10, day: 5, year: 2009, title: "Watson's Champions Trophy repeat", fact: "🏆 Shane Watson's unbeaten 105 carried Australia to a 6-wicket win over New Zealand in the final at Centurion — successfully defending their 2006 title and earning Watson the Player of the Match award in a Champions Trophy final for the second tournament running." },
  { month: 10, day: 24, year: 2021, title: "Pakistan finally beat India at a World Cup", fact: "💚 Mohammad Rizwan and Babar Azam's unbeaten opening stand carried Pakistan to a 10-wicket win over India in Dubai — Pakistan's first-ever win over India at any men's World Cup, in any format, after 13 previous meetings." },
  { month: 11, day: 13, year: 2014, title: "Rohit's 264", fact: "💥 Rohit Sharma scored 264 against Sri Lanka at Eden Gardens, Kolkata — still the highest individual score in ODI history." },
  { month: 11, day: 14, year: 2013, title: "Sachin's final Test begins", fact: "🙏 Sachin Tendulkar walked out for his 200th and final Test, against West Indies at Wankhede Stadium — the closing chapter of a 24-year international career." },
  { month: 11, day: 15, year: 1989, title: "Sachin's international debut", fact: "🇮🇳 A 16-year-old Sachin Tendulkar made his Test debut against Pakistan in Karachi — the start of a career that would redefine Indian cricket." },
  { month: 11, day: 19, year: 2023, title: "Australia's sixth World Cup", fact: "🏆 Australia beat host nation India in the 2023 ODI World Cup final at Narendra Modi Stadium, Ahmedabad, to win a record sixth World Cup title." },
  { month: 11, day: 27, year: 2014, title: "The death of Phillip Hughes", fact: "🖤 Australian batsman Phillip Hughes died two days after being struck on the neck by a bouncer while batting for South Australia against New South Wales at the SCG — his death led directly to mandatory neck-guard standards on cricket helmets worldwide." },
  { month: 11, day: 29, year: 2015, title: "Cricket's first day-night Test", fact: "💡 Australia beat New Zealand by 3 wickets at the Adelaide Oval in the first ever day-night Test match, played with a pink ball under floodlights — a record crowd of 123,736 watched across the three days." },
  { month: 12, day: 2, year: 1932, title: "Bodyline's quiet beginning", fact: "😤 England beat Australia by 10 wickets in the first Test of the infamous Bodyline series at Sydney — Harold Larwood took 10 wickets in the match, and it was here that journalist Hugh Buggy first coined the term 'bodyline' to describe England's leg-theory bowling." },
  { month: 12, day: 19, year: 2020, title: "India's lowest-ever Test total", fact: "📉 India were bowled out for just 36 in their second innings against Australia in Adelaide — their lowest total in Test history, with Josh Hazlewood taking 5 for 8 in a pink-ball day-night Test." },
  { month: 12, day: 23, year: 2012, title: "Sachin bids farewell to ODIs", fact: "🙏 Sachin Tendulkar announced his retirement from One Day Internationals, bringing the curtain down on a career of 463 ODIs, 18,426 runs and 49 centuries — all of them world records at the time." }
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
