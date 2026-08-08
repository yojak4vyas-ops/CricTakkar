// ===== RANKING CHALLENGE — CricTakkar =====
// Two kinds of challenge source:
//
// 1) RANKING_PARAMETERS — "growing leaderboard" topics (Test batting average, ODI wickets,
//    etc.). Each has a `leaders` array sorted from BEST (index 0) to WORST. At session start,
//    ranking.js randomly draws a 5-player WINDOW from this list (see pickWindowIndices() in
//    ranking.js): consecutive drawn players may never be more than 3 ranks apart in the
//    underlying leaders list, so every drawn set stays a "tight cluster" rather than jumping
//    from #1 to #20. The correct order is just the leaders list's own sort order within that
//    window — no separate correctOrder needs to be hand-written.
//    Target size per parameter: 25 leaders (started Day 27) — grown gradually over many
//    future sessions, same pace as the Wordle cap-number expansion project. While a
//    parameter has fewer than 5 leaders it's skipped for that session (not enough data yet).
//    While it has exactly 5-7, the window is effectively the whole list (same behaviour as
//    the original Day 27 fixed-5 build) — the randomness only becomes visible once a
//    parameter grows well past 5.
//
// 2) FIXED_CHALLENGES — one-off topics that don't fit a growing sorted leaderboard (a tie
//    between two IPL teams, a "who debuted earliest" list, a "biggest single-innings record"
//    list). These stay as a small hand-picked set of exactly 5, same as the whole game was
//    built on Day 11-27. May become RANKING_PARAMETERS-style growing lists later.
//
// STALENESS RULE (permanent, applies to every leader added to any parameter — see CLAUDE.md
// RANKING CHALLENGE EXPANSION PROJECT): for career-cumulative stats (battingAvg, bowlingAvg,
// runs, wickets, strikeRate, economyRate, centuries) — only fully retired players. An active
// player's number keeps moving, which could silently flip a ranking's correct order.
//
// TIES: a `leaders` entry can be marked `tiedWithNext: true` if it and the very next entry
// in the sorted list have the exact same stat value (e.g. two players tied on wicket count).
// If both members of a tied pair land in the same drawn window, the game accepts either
// order between just those two. FIXED_CHALLENGES use the older `tiedGroups` field directly
// on the challenge object (positions within `correctOrder`) — see ranking.js.

const RANKING_PARAMETERS = [
  {
    id: 'test-battingavg',
    category: 'batting',
    statType: 'battingAvg',
    format: 'test',
    question: "Rank these batsmen by Test batting average (highest to lowest)",
    hint: "Minimum 20 Test innings. Only retired players used so the answer never goes out of date.",
    // Literal real record order (min ~20 innings), curated to 25 recognizable names out of the
    // full list per user decision Day 28 — later "Phase 2" pass will reconcile to the exact
    // unfiltered rank order. Virat Kohli (46.85) does not rank inside the real top 40 and was
    // dropped from this cell for that reason (still appears in other cells where he qualifies).
    // ICC: exact figure confirmed for 23/25; Mohammad Yousuf and Michael Hussey have no page on
    // icc-cricket.com stating a final career average explicitly (coverage gap, not a mismatch —
    // ESPNcricinfo + Wikipedia agree exactly for both). Cricbuzz unreachable as usual.
    leaders: [
      { name: "Don Bradman", flag: "🇦🇺", value: "Avg: 99.94" },
      { name: "Graeme Pollock", flag: "🇿🇦", value: "Avg: 60.97" },
      { name: "George Headley", flag: "🇯🇲", value: "Avg: 60.83" },
      { name: "Herbert Sutcliffe", flag: "🇬🇧", value: "Avg: 60.73" },
      { name: "Ken Barrington", flag: "🇬🇧", value: "Avg: 58.67" },
      { name: "Everton Weekes", flag: "🇧🇧", value: "Avg: 58.61" },
      { name: "Wally Hammond", flag: "🇬🇧", value: "Avg: 58.45" },
      { name: "Garry Sobers", flag: "🇧🇧", value: "Avg: 57.78" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "Avg: 57.40" },
      { name: "Jack Hobbs", flag: "🇬🇧", value: "Avg: 56.94" },
      { name: "Clyde Walcott", flag: "🇧🇧", value: "Avg: 56.68" },
      { name: "Len Hutton", flag: "🇬🇧", value: "Avg: 56.67" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "Avg: 55.37" },
      { name: "Greg Chappell", flag: "🇦🇺", value: "Avg: 53.86" },
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Avg: 53.78" },
      { name: "Brian Lara", flag: "🇹🇹", value: "Avg: 52.88" },
      { name: "Javed Miandad", flag: "🇵🇰", value: "Avg: 52.57" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "Avg: 52.31" },
      { name: "Mohammad Yousuf", flag: "🇵🇰", value: "Avg: 52.29" },
      { name: "Younis Khan", flag: "🇵🇰", value: "Avg: 52.05" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "Avg: 51.85" },
      { name: "Michael Hussey", flag: "🇦🇺", value: "Avg: 51.52" },
      { name: "Shivnarine Chanderpaul", flag: "🇬🇾", value: "Avg: 51.37" },
      { name: "Sunil Gavaskar", flag: "🇮🇳", value: "Avg: 51.12" },
      { name: "Steve Waugh", flag: "🇦🇺", value: "Avg: 51.06" }
    ]
  },
  {
    id: 'test-bowlingavg',
    category: 'bowling',
    statType: 'bowlingAvg',
    format: 'test',
    question: "Rank these bowlers by career Test bowling average (best/lowest to worst)",
    hint: "Minimum 200 Test wickets. Only retired players used so the answer never goes out of date.",
    // Literal real record order (min 200 wickets, retired only), expanded 5->25 Day 28.
    // Ravichandran Ashwin: ESPNcricinfo shows 24.00, Wikipedia shows 23.95 (ICC's own coverage
    // only gives a rounded "average of 24" reference, consistent with ESPNcricinfo but not a
    // precise independent figure) - a genuine small mismatch. User decision (Day 28): keep
    // 24.00.
    leaders: [
      { name: "Malcolm Marshall", flag: "🇧🇧", value: "Avg: 20.94" },
      { name: "Joel Garner", flag: "🇧🇧", value: "Avg: 20.97" },
      { name: "Curtly Ambrose", flag: "🇦🇬", value: "Avg: 20.99" },
      { name: "Fred Trueman", flag: "🇬🇧", value: "Avg: 21.57" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "Avg: 21.64" },
      { name: "Allan Donald", flag: "🇿🇦", value: "Avg: 22.25" },
      { name: "Richard Hadlee", flag: "🇳🇿", value: "Avg: 22.29" },
      { name: "Vernon Philander", flag: "🇿🇦", value: "Avg: 22.32" },
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "Avg: 22.72" },
      { name: "Imran Khan", flag: "🇵🇰", value: "Avg: 22.81" },
      { name: "Dale Steyn", flag: "🇿🇦", value: "Avg: 22.95" },
      { name: "Ray Lindwall", flag: "🇦🇺", value: "Avg: 23.03" },
      { name: "Shaun Pollock", flag: "🇿🇦", value: "Avg: 23.11" },
      { name: "Waqar Younis", flag: "🇵🇰", value: "Avg: 23.56" },
      { name: "Wasim Akram", flag: "🇵🇰", value: "Avg: 23.62" },
      { name: "Michael Holding", flag: "🇯🇲", value: "Avg: 23.68" },
      { name: "Dennis Lillee", flag: "🇦🇺", value: "Avg: 23.92" },
      { name: "Ravichandran Ashwin", flag: "🇮🇳", value: "Avg: 24.00" },
      { name: "Clarrie Grimmett", flag: "🇦🇺", value: "Avg: 24.21" },
      { name: "Fanie de Villiers", flag: "🇿🇦", value: "Avg: 24.27" },
      { name: "Courtney Walsh", flag: "🇯🇲", value: "Avg: 24.44" },
      { name: "Brian Statham", flag: "🇬🇧", value: "Avg: 24.84" },
      { name: "Alec Bedser", flag: "🇬🇧", value: "Avg: 24.89" },
      { name: "Shane Warne", flag: "🇦🇺", value: "Avg: 25.41" },
      { name: "James Anderson", flag: "🇬🇧", value: "Avg: 26.45" }
    ]
  },
  {
    id: 'test-runs',
    category: 'batting',
    statType: 'runs',
    format: 'test',
    question: "Rank these batsmen by total career Test runs (most to least)",
    hint: "All-time career Test runs — only retired players used so the answer never goes out of date.",
    // Literal real record order, retired only, expanded 5->25 Day 30. Joe Root and Steve Smith
    // are the only 2 active players in the real all-time top ~25 (both confirmed still playing
    // Test cricket in 2026) - excluded per the staleness rule. Kane Williamson (retired 12 Jun
    // 2026), Virat Kohli (retired 12 May 2025), and David Warner (retired Jan 2024) are all
    // newly-retired and now eligible. Real order confirmed via ESPNcricinfo + Wikipedia +
    // cross-checked against the ACS (Association of Cricket Statisticians) official records
    // table. Two search-synthesis mismatches were caught and resolved by going to a primary
    // source directly (not real cross-source disagreements): Michael Clarke's total was briefly
    // misreported as 8,628 by one search summary - both ESPNcricinfo and Wikipedia confirm
    // 8,643. Inzamam-ul-Haq's total was briefly misreported as 8,820/8,829 by other summaries -
    // his live Wikipedia infobox confirms 8,830, matching ESPNcricinfo and ACS.
    leaders: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "15,921 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,378 runs" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "13,289 runs" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "13,288 runs" },
      { name: "Alastair Cook", flag: "🇬🇧", value: "12,472 runs" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "12,400 runs" },
      { name: "Brian Lara", flag: "🇹🇹", value: "11,953 runs" },
      { name: "Shivnarine Chanderpaul", flag: "🇬🇾", value: "11,867 runs" },
      { name: "Mahela Jayawardene", flag: "🇱🇰", value: "11,814 runs" },
      { name: "Allan Border", flag: "🇦🇺", value: "11,174 runs" },
      { name: "Steve Waugh", flag: "🇦🇺", value: "10,927 runs" },
      { name: "Sunil Gavaskar", flag: "🇮🇳", value: "10,122 runs" },
      { name: "Younis Khan", flag: "🇵🇰", value: "10,099 runs" },
      { name: "Kane Williamson", flag: "🇳🇿", value: "9,515 runs" },
      { name: "Hashim Amla", flag: "🇿🇦", value: "9,282 runs" },
      { name: "Graeme Smith", flag: "🇿🇦", value: "9,265 runs" },
      { name: "Virat Kohli", flag: "🇮🇳", value: "9,230 runs" },
      { name: "Graham Gooch", flag: "🇬🇧", value: "8,900 runs" },
      { name: "Javed Miandad", flag: "🇵🇰", value: "8,832 runs" },
      { name: "Inzamam-ul-Haq", flag: "🇵🇰", value: "8,830 runs" },
      { name: "David Warner", flag: "🇦🇺", value: "8,786 runs" },
      { name: "VVS Laxman", flag: "🇮🇳", value: "8,781 runs" },
      { name: "AB de Villiers", flag: "🇿🇦", value: "8,765 runs" },
      { name: "Michael Clarke", flag: "🇦🇺", value: "8,643 runs" },
      { name: "Matthew Hayden", flag: "🇦🇺", value: "8,625 runs" }
    ]
  },
  {
    id: 'test-wickets',
    category: 'bowling',
    statType: 'wickets',
    format: 'test',
    question: "Rank these bowlers by total Test wickets (most to least)",
    hint: "All-time career Test wickets — only retired players used so the answer never goes out of date.",
    // Literal real record order, retired only, expanded 5->25 Day 31. Source: ESPNcricinfo's
    // live "Most Wickets In Career" table and Wikipedia's "300+ Test wickets" table, both
    // fetched directly (not search synthesis) and cross-checked figure-by-figure - exact
    // agreement on every wicket count, zero mismatches. Both sources also explicitly flag
    // active players (Wikipedia's "†" marker / ESPNcricinfo's open-ended career span) - used
    // this to exclude 5 otherwise-qualifying active bowlers per the staleness rule: Nathan Lyon
    // (567, still active per 2025-26 Ashes coverage, no retirement announced), Mitchell Starc
    // (433, confirmed actively playing Tests as of June 2026), Ravindra Jadeja (348, active),
    // Kagiso Rabada (340, active), Pat Cummins (315, active). Tim Southee (391) was confirmed
    // RETIRED (bowed out of Tests after New Zealand's home series vs England, career span
    // 2008-2024 on both sources) so he stays in. ICC official records confirm the top-3 figures
    // directly (Murali 800, Warne 708, Anderson 704) but has no dedicated all-time leaderboard
    // page covering the rest - a coverage gap, not a mismatch, consistent with the same gap
    // found for other cells (see test-battingavg). Cricbuzz unreachable as usual, flagged.
    // Minor non-blocking note: Daniel Vettori's career span shows as 1997-2014 on ESPNcricinfo
    // vs 1997-2015 on Wikipedia - his wicket count (362) matches exactly on both and span isn't
    // a stored field, so not treated as a real mismatch requiring a user decision.
    leaders: [
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "800 wickets" },
      { name: "Shane Warne", flag: "🇦🇺", value: "708 wickets" },
      { name: "James Anderson", flag: "🇬🇧", value: "704 wickets" },
      { name: "Anil Kumble", flag: "🇮🇳", value: "619 wickets" },
      { name: "Stuart Broad", flag: "🇬🇧", value: "604 wickets" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "563 wickets" },
      { name: "Ravichandran Ashwin", flag: "🇮🇳", value: "537 wickets" },
      { name: "Courtney Walsh", flag: "🇯🇲", value: "519 wickets" },
      { name: "Dale Steyn", flag: "🇿🇦", value: "439 wickets" },
      { name: "Kapil Dev", flag: "🇮🇳", value: "434 wickets" },
      { name: "Rangana Herath", flag: "🇱🇰", value: "433 wickets" },
      { name: "Richard Hadlee", flag: "🇳🇿", value: "431 wickets" },
      { name: "Shaun Pollock", flag: "🇿🇦", value: "421 wickets" },
      { name: "Harbhajan Singh", flag: "🇮🇳", value: "417 wickets" },
      { name: "Wasim Akram", flag: "🇵🇰", value: "414 wickets" },
      { name: "Curtly Ambrose", flag: "🇦🇬", value: "405 wickets" },
      { name: "Tim Southee", flag: "🇳🇿", value: "391 wickets" },
      { name: "Makhaya Ntini", flag: "🇿🇦", value: "390 wickets" },
      { name: "Ian Botham", flag: "🇬🇧", value: "383 wickets" },
      { name: "Malcolm Marshall", flag: "🇧🇧", value: "376 wickets" },
      { name: "Waqar Younis", flag: "🇵🇰", value: "373 wickets" },
      { name: "Imran Khan", flag: "🇵🇰", value: "362 wickets", tiedWithNext: true },
      { name: "Daniel Vettori", flag: "🇳🇿", value: "362 wickets" },
      { name: "Dennis Lillee", flag: "🇦🇺", value: "355 wickets", tiedWithNext: true },
      { name: "Chaminda Vaas", flag: "🇱🇰", value: "355 wickets" }
    ]
  },
  {
    id: 'odi-battingavg',
    category: 'batting',
    statType: 'battingAvg',
    format: 'odi',
    question: "Rank these batsmen by ODI batting average (highest to lowest)",
    hint: "Minimum 20 ODI innings. Only retired players used so the answer never goes out of date.",
    // Literal real record order (min 20 innings, retired only), expanded 5->25 Day 61. Source:
    // ESPNcricinfo's own official "Highest career batting average in ODIs" records page
    // (stats.espncricinfo.com/ci/content/records/282911.html, fetched directly via browser
    // since direct WebFetch still 403s espncricinfo.com stat pages), which is unqualified except
    // for its own baked-in ~20-innings floor, matching this cell's hint exactly. Every active
    // player was excluded per the staleness rule, INCLUDING several who came up ambiguous and
    // needed a dedicated per-player retirement search rather than being assumed from the raw
    // table's career-span column alone: Quinton de Kock (retired from ODIs after the 2023 World
    // Cup, but reversed that retirement in Oct 2025 and is active again - excluded), Fakhar
    // Zaman (active, in Pakistan's 2026 T20 World Cup squad), and 5 players who were dropped/out
    // of favour but never actually announced a retirement, so stay excluded on the same standing
    // "no formal retirement = not eligible" rule as everywhere else in this project - Faf du
    // Plessis (hasn't played ODI since the 2019 World Cup but never formally retired from the
    // format), Imam-ul-Haq, Janneman Malan, Haris Sohail (explicitly denied retirement rumours,
    // Nov 2024), and Tom Cooper (an earlier Netherlands retirement he himself reversed with a
    // comeback, current status unclear). Steve Smith genuinely DOES have a formal, ODI-specific
    // retirement (Mar 2025, right after the 2025 Champions Trophy semi-final loss to India, while
    // remaining active in Tests/T20Is - confirmed independently Day 61) but his real average
    // (43.28) doesn't crack this cell's real top 25, so he correctly does NOT appear in the
    // leaders list below despite being a genuinely eligible retired-ODI player. Every figure
    // cross-checked directly off that same live ESPNcricinfo table
    // (average = runs / (innings - not-outs), confirmed by hand for Heinrich Klaasen's 43.69
    // after an unrelated AI-search summary tried to wrongly divide runs by matches instead) plus
    // spot Wikipedia checks for the newer, less-cited names (ten Doeschate, van der Dussen).
    // ICC has no dedicated all-time ODI batting-average leaderboard page - a coverage gap, not a
    // mismatch, consistent with every other average-type cell in this project. Cricbuzz
    // unreachable as usual (blocked at the domain level), flagged.
    leaders: [
      { name: "Ryan ten Doeschate", flag: "🇳🇱", value: "Avg: 67.00" },
      { name: "Dawid Malan", flag: "🇬🇧", value: "Avg: 55.76" },
      { name: "Michael Bevan", flag: "🇦🇺", value: "Avg: 53.58" },
      { name: "AB de Villiers", flag: "🇿🇦", value: "Avg: 53.50" },
      { name: "Jonathan Trott", flag: "🇬🇧", value: "Avg: 51.25" },
      { name: "MS Dhoni", flag: "🇮🇳", value: "Avg: 50.57" },
      { name: "Rassie van der Dussen", flag: "🇿🇦", value: "Avg: 50.13" },
      { name: "Hashim Amla", flag: "🇿🇦", value: "Avg: 49.46" },
      { name: "Kane Williamson", flag: "🇳🇿", value: "Avg: 48.69" },
      { name: "Michael Hussey", flag: "🇦🇺", value: "Avg: 48.15" },
      { name: "Zaheer Abbas", flag: "🇵🇰", value: "Avg: 47.62" },
      { name: "Ross Taylor", flag: "🇳🇿", value: "Avg: 47.55" },
      { name: "Ambati Rayudu", flag: "🇮🇳", value: "Avg: 47.05" },
      { name: "Glenn Turner", flag: "🇳🇿", value: "Avg: 47.00", tiedWithNext: true },
      { name: "Viv Richards", flag: "🇦🇬", value: "Avg: 47.00" },
      { name: "Adam Voges", flag: "🇦🇺", value: "Avg: 45.78" },
      { name: "David Warner", flag: "🇦🇺", value: "Avg: 45.30" },
      { name: "Gordon Greenidge", flag: "🇧🇧", value: "Avg: 45.03" },
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Avg: 44.83" },
      { name: "Dean Jones", flag: "🇦🇺", value: "Avg: 44.61" },
      { name: "Michael Clarke", flag: "🇦🇺", value: "Avg: 44.58" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "Avg: 44.36" },
      { name: "Shikhar Dhawan", flag: "🇮🇳", value: "Avg: 44.11" },
      { name: "Matthew Hayden", flag: "🇦🇺", value: "Avg: 43.80" },
      { name: "Heinrich Klaasen", flag: "🇿🇦", value: "Avg: 43.69" }
    ]
  },
  {
    id: 'odi-runs',
    category: 'batting',
    statType: 'runs',
    format: 'odi',
    question: "Rank these batsmen by total career ODI runs (most to least)",
    hint: "All-time career ODI runs — only retired players used so the answer never goes out of date.",
    // Literal real record order, retired only, expanded 5->25 Day 61. Source: ESPNcricinfo's
    // live "Most runs in career" table (fetched directly via browser, not search synthesis,
    // since direct WebFetch still 403s espncricinfo.com stat pages) cross-checked figure-by-
    // figure against Wikipedia's own per-player infobox for every one of the 20 new entries -
    // exact agreement on every run total, zero mismatches. Virat Kohli (14,941, #2 all-time)
    // and Rohit Sharma (11,895, #7 all-time) are both confirmed still active in ODIs as of
    // Aug 2026 (Kohli recovering from a 2026 IPL hamstring injury but not retired; Rohit's
    // ODI future was under media speculation during India's Jul 2026 England tour but he has
    // explicitly not retired) - both excluded per the staleness rule, same treatment as the
    // test-runs cell's Root/Smith exclusions. ICC has no dedicated all-time ODI run-scorers
    // leaderboard page - a coverage gap, not a mismatch, consistent with other cells. Cricbuzz
    // unreachable as usual (blocked at the domain level), flagged.
    leaders: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "18,426 runs" },
      { name: "Kumar Sangakkara", flag: "🇱🇰", value: "14,234 runs" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "13,704 runs" },
      { name: "Sanath Jayasuriya", flag: "🇱🇰", value: "13,430 runs" },
      { name: "Mahela Jayawardene", flag: "🇱🇰", value: "12,650 runs" },
      { name: "Inzamam-ul-Haq", flag: "🇵🇰", value: "11,739 runs" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "11,579 runs" },
      { name: "Sourav Ganguly", flag: "🇮🇳", value: "11,363 runs" },
      { name: "Rahul Dravid", flag: "🇮🇳", value: "10,889 runs" },
      { name: "MS Dhoni", flag: "🇮🇳", value: "10,773 runs" },
      { name: "Chris Gayle", flag: "🇯🇲", value: "10,480 runs" },
      { name: "Brian Lara", flag: "🇹🇹", value: "10,405 runs" },
      { name: "Tillakaratne Dilshan", flag: "🇱🇰", value: "10,290 runs" },
      { name: "Mohammad Yousuf", flag: "🇵🇰", value: "9,720 runs" },
      { name: "Adam Gilchrist", flag: "🇦🇺", value: "9,619 runs" },
      { name: "AB de Villiers", flag: "🇿🇦", value: "9,577 runs" },
      { name: "Mohammad Azharuddin", flag: "🇮🇳", value: "9,378 runs" },
      { name: "Aravinda de Silva", flag: "🇱🇰", value: "9,284 runs" },
      { name: "Saeed Anwar", flag: "🇵🇰", value: "8,824 runs" },
      { name: "Shivnarine Chanderpaul", flag: "🇬🇾", value: "8,778 runs" },
      { name: "Yuvraj Singh", flag: "🇮🇳", value: "8,701 runs" },
      { name: "Desmond Haynes", flag: "🇧🇧", value: "8,648 runs" },
      { name: "Ross Taylor", flag: "🇳🇿", value: "8,607 runs" },
      { name: "Marvan Atapattu", flag: "🇱🇰", value: "8,529 runs" },
      { name: "Mark Waugh", flag: "🇦🇺", value: "8,500 runs" }
    ]
  },
  {
    id: 'odi-wickets',
    category: 'bowling',
    statType: 'wickets',
    format: 'odi',
    question: "Rank these bowlers by total career ODI wickets (most to least)",
    hint: "All-time career ODI wickets — only retired players used so the answer never goes out of date.",
    // Literal real record order, retired only, expanded 5->25 Day 61. Source: ESPNcricinfo's
    // live "Most wickets in career" table (fetched directly via browser, not search synthesis,
    // since direct WebFetch still 403s espncricinfo.com stat pages) cross-checked figure-by-
    // figure against Wikipedia's own per-player infobox for every one of the 20 new entries -
    // exact agreement on every wicket count, zero mismatches. Shahid Afridi (395) actually
    // ranks ABOVE Shaun Pollock (393) in the real order - the original Day 27 hand-picked set
    // of 5 had skipped him, so he's inserted in his correct spot rather than appended at the
    // end. Three players needed an explicit active/retired check before inclusion: Shakib Al
    // Hasan (317, would rank between Jayasuriya and Srinath) is confirmed NOT retired from ODIs
    // as of Aug 2026 (as recently as Dec 2025 said he plans to play a full ODI series before
    // eventually retiring) - excluded. Mitchell Starc (247) is confirmed actively targeting the
    // 2027 ODI World Cup - excluded. Mashrafe Mortaza (270, Bangladesh) has never formally
    // announced ODI retirement, but has not played international cricket since March 2020 and
    // Bangladesh's own board has said he is not being considered for selection - treated as
    // effectively closed for the staleness rule's purpose (same "settled in practice, no formal
    // announcement" handling as other flagged cases elsewhere in this project) and included.
    // ICC has no dedicated all-time ODI wicket-takers leaderboard page - a coverage gap, not a
    // mismatch, consistent with other cells. Cricbuzz unreachable as usual, flagged.
    leaders: [
      { name: "Muttiah Muralitharan", flag: "🇱🇰", value: "534 wickets" },
      { name: "Wasim Akram", flag: "🇵🇰", value: "502 wickets" },
      { name: "Waqar Younis", flag: "🇵🇰", value: "416 wickets" },
      { name: "Chaminda Vaas", flag: "🇱🇰", value: "400 wickets" },
      { name: "Shahid Afridi", flag: "🇵🇰", value: "395 wickets" },
      { name: "Shaun Pollock", flag: "🇿🇦", value: "393 wickets" },
      { name: "Glenn McGrath", flag: "🇦🇺", value: "381 wickets" },
      { name: "Brett Lee", flag: "🇦🇺", value: "380 wickets" },
      { name: "Lasith Malinga", flag: "🇱🇰", value: "338 wickets" },
      { name: "Anil Kumble", flag: "🇮🇳", value: "337 wickets" },
      { name: "Sanath Jayasuriya", flag: "🇱🇰", value: "323 wickets" },
      { name: "Javagal Srinath", flag: "🇮🇳", value: "315 wickets" },
      { name: "Daniel Vettori", flag: "🇳🇿", value: "305 wickets" },
      { name: "Shane Warne", flag: "🇦🇺", value: "293 wickets" },
      { name: "Saqlain Mushtaq", flag: "🇵🇰", value: "288 wickets", tiedWithNext: true },
      { name: "Ajit Agarkar", flag: "🇮🇳", value: "288 wickets" },
      { name: "Zaheer Khan", flag: "🇮🇳", value: "282 wickets" },
      { name: "Jacques Kallis", flag: "🇿🇦", value: "273 wickets" },
      { name: "Allan Donald", flag: "🇿🇦", value: "272 wickets" },
      { name: "Mashrafe Mortaza", flag: "🇧🇩", value: "270 wickets" },
      { name: "James Anderson", flag: "🇬🇧", value: "269 wickets", tiedWithNext: true },
      { name: "Abdul Razzaq", flag: "🇵🇰", value: "269 wickets", tiedWithNext: true },
      { name: "Harbhajan Singh", flag: "🇮🇳", value: "269 wickets" },
      { name: "Makhaya Ntini", flag: "🇿🇦", value: "266 wickets" },
      { name: "Kapil Dev", flag: "🇮🇳", value: "253 wickets" }
    ]
  }
  // Every other cell in the full taxonomy (BATTING/BOWLING/FIELDING/OTHERS x Test/ODI/T20I/IPL)
  // is still empty — see the RANKING CHALLENGE EXPANSION PROJECT section in CLAUDE.md for the
  // full sub-parameter list and the progress tracker that says which cell to fill next.
];

// ===== FIXED ONE-OFF CHALLENGES (not windowed — small hand-picked sets) =====
const FIXED_CHALLENGES = [
  {
    id: 'ipl-titles-1',
    category: 'others',
    statType: 'titles',
    format: 'ipl',
    question: "Rank these IPL teams by total IPL titles won (most to least)",
    hint: "IPL titles from 2008 to 2026.",
    players: [
      { name: "Mumbai Indians", flag: "🔵", value: "5 titles" },
      { name: "Chennai Super Kings", flag: "🟡", value: "5 titles" },
      { name: "Kolkata Knight Riders", flag: "🟣", value: "3 titles" },
      { name: "Royal Challengers Bengaluru", flag: "🔴", value: "2 titles" },
      { name: "Sunrisers Hyderabad", flag: "🟠", value: "1 title" }
    ],
    correctOrder: [0, 1, 2, 3, 4],
    tiedGroups: [[0, 1]]
    // MI 5 = CSK 5 (tied, either order accepted) > KKR 3 > RCB 2 (2025+2026) > SRH 1
  },
  {
    id: 'test-debutyear-1',
    category: 'others',
    statType: 'debutYear',
    format: 'test',
    question: "Rank these cricketers by the year they made their Test debut (earliest first)",
    hint: "Who played Test cricket first?",
    players: [
      { name: "Sachin Tendulkar", flag: "🇮🇳", value: "Debut: 1989" },
      { name: "Ricky Ponting", flag: "🇦🇺", value: "Debut: 1995" },
      { name: "MS Dhoni", flag: "🇮🇳", value: "Debut: 2005" },
      { name: "Virat Kohli", flag: "🇮🇳", value: "Debut: 2011" },
      { name: "Kapil Dev", flag: "🇮🇳", value: "Debut: 1978" }
    ],
    correctOrder: [4, 0, 1, 2, 3]
    // Kapil 1978 > Tendulkar 1989 > Ponting 1995 > Dhoni 2005 > Kohli 2011
  },
  {
    id: 'odi-highestscore-1',
    category: 'batting',
    statType: 'highestScore',
    format: 'odi',
    question: "Rank these batsmen by highest individual ODI score (highest to lowest)",
    hint: "Single innings highest score in ODIs. Still a standing record — could change if broken.",
    players: [
      { name: "Rohit Sharma", flag: "🇮🇳", value: "264 vs Sri Lanka" },
      { name: "Martin Guptill", flag: "🇳🇿", value: "237* vs West Indies" },
      { name: "Chris Gayle", flag: "🇯🇲", value: "215 vs Zimbabwe" },
      { name: "Virender Sehwag", flag: "🇮🇳", value: "219 vs West Indies" },
      { name: "Fakhar Zaman", flag: "🇵🇰", value: "210* vs Zimbabwe" }
    ],
    correctOrder: [0, 1, 3, 2, 4]
    // Rohit 264 > Guptill 237* > Sehwag 219 > Gayle 215 > Fakhar 210*
  },
  {
    id: 'ipl-highestscore-1',
    category: 'batting',
    statType: 'highestScore',
    format: 'ipl',
    question: "Rank these batsmen by highest individual IPL score (highest to lowest)",
    hint: "Single innings highest score in IPL history. Still a standing record — could change if broken (KL Rahul's 152* was only set in 2026).",
    // Added Day 61 (session 3), user's explicit request ("IPL, except Most Runs" — a one-off
    // record stat, allowed to include an active current record-holder per the Question Quality
    // Rule's "growing record" handling). Verified via ESPNcricinfo's own live "High Scores For
    // Indian Premier League" records table (stats.espncricinfo.com, fetched directly via
    // browser since direct WebFetch 403s espncricinfo.com stat pages) — exact figures, balls,
    // opponents, and dates for all 5 confirmed. Wikipedia's "List of Indian Premier League
    // centuries" independently confirms Gayle 175* and McCullum 158* as the top two, and states
    // there are "only three 150+ scores by individual batsmen in the league's history" — the
    // third being KL Rahul's 152* (25 Apr 2026), corroborating the ESPNcricinfo table rather
    // than contradicting it. iplt20.com confirmed via 4 separate dedicated per-score searches
    // (one per player/score, per the standing IPL-source method — a vague query returns nothing
    // useful) rather than one broad query: Gayle's 175* record, McCullum's 158* in IPL's first-
    // ever match, KL Rahul's 152* being IPL's "3rd highest TATA IPL Score" (iplt20.com's own
    // headline), and Abhishek Sharma's 141 explicitly described by iplt20.com as breaking
    // "KL Rahul's record for the highest score by an Indian in IPL history and becoming the
    // third-highest overall" at the time (since passed by Rahul's own later 152*). Cricbuzz
    // attempted via WebSearch domain-restriction — request rejected outright as an inaccessible
    // domain (standing tool limitation), flagged as usual.
    players: [
      { name: "Chris Gayle", flag: "🇯🇲", value: "175* vs Pune Warriors (RCB, 2013)" },
      { name: "Brendon McCullum", flag: "🇳🇿", value: "158* vs RCB (KKR, 2008)" },
      { name: "KL Rahul", flag: "🇮🇳", value: "152* vs Punjab Kings (DC, 2026)" },
      { name: "Abhishek Sharma", flag: "🇮🇳", value: "141 vs Punjab Kings (SRH, 2025)" },
      { name: "Quinton de Kock", flag: "🇿🇦", value: "140* vs KKR (LSG, 2022)" }
    ],
    correctOrder: [0, 1, 2, 3, 4]
    // Gayle 175* > McCullum 158* > Rahul 152* > Abhishek Sharma 141 > de Kock 140*
  }
];
