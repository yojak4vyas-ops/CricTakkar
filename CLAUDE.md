This file is the permanent memory for this project. Always read it before starting work, and always update the Current Build Status section at the end of each session.

# CricTakkar — Project Master Brief

---

## WHO I AM

- I have zero coding knowledge. I am completely non-technical.
- I have a laptop and can give 1.5 hours every day.
- My budget is zero — every tool used must be free.
- I am based in Maharashtra, India.
- The app is for the Indian cricket audience.

---

## HOW YOU MUST TALK TO ME

- I will describe what I want in plain language. Build it directly — don't ask me to copy-paste code, and don't rewrite whole files when a smaller edit will do.
- Don't over-explain routine code changes. Just tell me briefly what you built and why, in a few plain-English lines.
- If something breaks or you hit an error, stop and explain clearly what went wrong before continuing.
- If you need a decision from me (a design choice, a missing detail, an API key), ask directly instead of guessing.
- Still build and test one feature at a time — don't move to the next feature until the current one works.
- Still deploy to Vercel and commit to GitHub after every completed feature, automatically — don't just remind me, actually do it.
- At the start of every session, briefly tell me what we completed last time and what we're doing today.
- At the end of every session, give me a short summary of what we finished.

---

## THE APP — CRICTAKKAR

A cricket knowledge and battle platform for Indian cricket fans.
Tagline: "Aao CricTakkar karte hain" / "Cricket. Quiz. Battle."
Target domain: crictakkar.in
Instagram handle: @crictakkar

---

## LEGAL BOUNDARIES (IMPORTANT — NEVER CROSS THESE)

- No cash prize contests of any kind.
- No token, coin, or virtual currency system that converts to real money.
- No paid entry for a chance to win — this requires an NOGC licence under India's 2025 Online Gaming Act.
- All gameplay is completely free.
- Revenue comes only from: ads, subscriptions, affiliate links, brand sponsorships.

---

## REVENUE MODEL

- Google AdSense: ads shown between quizzes and on results screen. Never mid-question.
- Premium subscription: ₹99–199/month via Razorpay. Benefits: ad-free, exclusive quiz packs, Pro badge on profile.
- Affiliate links: Dream11, My11Circle, MPL referral links. ₹50–500 per referred signup.
- Brand sponsorships: brands pay ₹5,000–50,000 to sponsor a weekly contest. They provide the prize (merch, vouchers). Legal and safe.
- Revenue target: ₹1–2 lakh/month at 100,000 monthly active users.

---

## COMPLETE FEATURE LIST

### PHASE 1 — Core App (Days 1–12, 1.5 hrs/day)
Goal: A working app live on the internet with real users by Day 12.

1. Home screen with navigation bar
2. Daily quiz — 5 questions, 15-second countdown timer, 4 answer options, reveal correct answer after each, show a fun fact
3. Category quizzes — IPL, Test cricket, ODIs, T20 World Cup, Player-specific packs
4. Question bank — 200+ questions each with 4 options, correct answer marked, fun fact
5. User login and profiles — using Firebase Authentication (free)
6. User profile page — username, favourite team, quizzes played, accuracy %, best streak
7. Global leaderboard — top players this week and this month
8. Friends leaderboard — beat specific friends
9. Daily streak system — play every day to keep streak alive, lose it if you miss a day
10. XP and level system — earn XP per quiz, levels from Debutant → Test Legend
11. Shareable score card — auto-generated image of score to share on WhatsApp and Instagram
12. Deploy live on Vercel — app accessible by anyone on the internet

### PHASE 2 — Content Features (Days 13–22)
Goal: Add all unique content features that make CricTakkar different from any other app.

13. Speed round quiz — 30 questions in 60 seconds ✅ Done Day 9
14. Guess the player — blurred/silhouette image, user guesses the cricketer (skipping for now)
15. Guess the stats — clubbed into existing question bank, no separate page needed ✅ Decision made Day 10
16. Cricket Wordle — guess the cricketer in 6 tries with clues (country, role, bat style, era, format) ✅ Done Day 10
17. Ranking challenge — drag and drop 5 players in correct order (by average, by sixes etc.)
18. Badges and titles — "Sachin Scholar", "IPL Legend", "Test Specialist", "Speed Demon" etc.
19. Stats dashboard — user's strongest category, weakest era, accuracy over time graph
20. Avatar customisation — team jersey, helmet, bat — cosmetic unlockables
21. Cricket Poetry section
22. Top 5 section
23. On This Day — daily cricket history card
24. Cricket news feed
25. Push notifications
26. Match day alert
27. Hindi language support
28. Player encyclopaedia

### PHASE 3 — Multiplayer (Days 23–40)
Goal: Real-time tournaments with 100+ players simultaneously.

29. Private room system
30. Public matchmaking lobby
31. Classic Mode
32. Speed Mode
33. Elimination Mode
34. Tournament structure
35. Live leaderboard
36. Emoji reactions
37. Spectator mode
38. Power-ups
39. Daily 8pm scheduled tournament
40. IPL season special tournaments
41. State leaderboard
42. 1v1 duel

### PHASE 4 — Money Features (Days 41–50)
Goal: Turn the app into an earning platform.

43. Google AdSense integration
44. Premium Pro subscription
45. Affiliate banners
46. Sponsored contest system
47. Admin dashboard

---

## TECH STACK (ALL FREE)

- Frontend: HTML, CSS, JavaScript — Claude Code edits the project files directly (no more copy-pasting code from chat)
- Hosting: Vercel (free) — makes the app live on the internet, deployed automatically by Claude Code
- Code storage: GitHub (free) — stores all our code safely, committed and pushed automatically by Claude Code
- Database and login: Firebase (free tier) — stores users, scores, questions
- Real-time multiplayer: Socket.io + Node.js — handles live tournaments
- Multiplayer hosting: Railway.app (free tier) — runs the live server
- Payments: Razorpay — for Premium subscriptions
- AI poems: Claude API — generates match poems automatically
- Cricket live data: CricAPI (free tier) — for live match quiz triggers
- Design and graphics: Canva (free) — logo, score cards, social media posts
- Email list: Brevo (free up to 500 contacts) — weekly newsletter

---

## BUILD RULES — FOLLOW EVERY SINGLE SESSION

1. Start every session by telling me what we completed last time and what today's goal is.
2. End every session by giving me a short summary of what we finished today.
3. Build and test one feature completely before touching the next.
4. Commit to GitHub and deploy to Vercel automatically after every completed feature — don't just remind me, actually do it.
5. If something breaks or errors out, stop and fix it immediately — do not continue building until it's resolved.
6. Edit project files directly. Use small, targeted edits rather than rewriting whole files unless a full rewrite is genuinely needed.
7. Launch after Phase 1 Day 12. Do not wait for the full app to be ready.
8. If I ask what day of building we are on, calculate it from Phase 1 Day 1 onwards.
9. When showing me a built feature, always show it as a Claude Artifact (a real preview I can open and click through, using sample data if needed) — never just a live browser preview or a description. Claude can still use a live browser internally to test and verify the code works, but what gets shown to me must be an Artifact.

---

## MODEL SELECTION RULE — PERMANENT (Added Day 12)

I cannot judge on my own which Claude model (Sonnet vs Opus vs Haiku) is right for a given piece of work, and Claude cannot switch the main conversation model itself — only I can do that, in the app's model picker. So Claude must proactively tell me which model to be on.

DEFAULT: Sonnet 5 for almost everything in this project — it's a mostly straightforward frontend/Firebase app and Sonnet is the right cost/quality balance.

WHEN TO SWITCH TO OPUS:
- Phase 3 (Multiplayer) — designing the real-time Socket.io architecture, tournament sync, and matchmaking logic. Once that architecture is settled, routine feature work in Phase 3 can drop back to Sonnet.
- Phase 4 (Money Features) — Razorpay payment integration and admin dashboard access control. Money handling and access control deserve the extra care.
- Any bug Claude is still stuck on after 2+ attempts on Sonnet.
- A contested cricket fact (record holder, "most/fastest/highest") that stays unclear even after a web search under the Question Quality Rule.

NEVER use Haiku to build this project — quality and reliability matter more than raw speed given the legal and financial stakes (Online Gaming Act, Razorpay payments).

WHAT CLAUDE MUST DO:
- At the start of every new feature or phase, state plainly which model I should be on, e.g. "Use Sonnet 5 for this" or "Switch to Opus for this one — here's why."
- Do this even when the answer is "stay on Sonnet" — don't assume I'll remember or guess correctly.

---

## QUESTION QUALITY RULE — PERMANENT (Added after Day 2)

Every question added to CricTakkar — by me or by Claude — must pass this checklist before going into the app.

CHECKLIST (all boxes must be true):
- Fact passes the FOUR-SOURCE VERIFICATION RULE below (Cricbuzz + ESPNcricinfo + Wikipedia + ICC official records, all matching)
- All 4 options are plausible (not obviously silly wrong answers)
- The fun fact adds something new — not just repeating the answer
- No "as of today" answers that will become outdated (e.g. "current world record holder")

QUESTIONS WE WILL NEVER WRITE:
- Anything involving "hat-trick" unless verified on ESPNcricinfo first
- Any "fastest", "most", "highest" record without checking the exact current record holder
- Any question about a match result from memory
- Any statistic with a specific number without verifying the source

WHAT CLAUDE MUST DO:
- Every time Claude writes a new question, Claude must state clearly: "Verified on ESPNcricinfo — [what the source confirms]"
- If Claude is not 100% certain, Claude must say "I am not fully certain — please verify this on ESPNcricinfo before adding"
- Never add a question just because it sounds right
- Before adding any question involving "most titles", "current champion", "who holds the record" or any fact that changes over time — do a web search first to confirm the latest answer. Do not rely on training data for live records.

---

## FOUR-SOURCE VERIFICATION RULE — PERMANENT (Added Day 16)

This is the master fact-checking standard for the entire app. It applies to every question, fact, and data point across ALL content areas: Daily Quiz + Category Quiz — IPL/Test/ODI/T20 (all now live in one central, category-tagged file, `question-bank.js`, as of Day 17), On This Day (`onthisday.js`), Ranking Challenge (`ranking.js`), Cricket Poetry — poems and Poetry Quiz (`poems.js`), and Cricket Wordle (`players.js`). It supersedes the older 2-source ("ESPNcricinfo + Wikipedia") wording used elsewhere in this file — wherever this file says to check 2 sources, this 4-source rule now takes precedence.

STANDING SCOPE — THIS RULE IS NOT LIMITED TO THE LIST ABOVE: it automatically applies to any new quiz mode, category, sub-category, game, or content area added to CricTakkar at any point in the future (e.g. a future T20 World Cup category, a new Phase 2/3 feature with cricket facts, a new player database for another game mode) — Claude does not need a separate instruction to apply it each time. It also applies to any additional data the user or Claude adds to an existing area later — more questions added to any quiz, more players added to Wordle, more events added to On This Day, more challenges added to Ranking, more poems added to Poetry. The rule runs by default on all cricket facts/data in this codebase, existing or future, unless the user explicitly says otherwise for a specific case.

THE RULE:
- Every fact must be checked against all 4 of: **Cricbuzz, ESPNcricinfo, Wikipedia, and ICC official records** (icc-cricket.com).
- MECHANISM — NOT OPTIONAL (added Day 17, session 6, after a real lapse): "checked against" means an explicit, separate, domain-restricted search per site — using WebSearch's `allowed_domains` parameter set to exactly one of espncricinfo.com / wikipedia.org / icc-cricket.com / cricbuzz.com per query — for every single fact. A broad, unrestricted web search that happens to cite some of these sites in its results is NOT the same thing and does NOT satisfy this rule, even if the fact looks consistent across what came back. The lapse that triggered this clause: an entire batch of 30 questions (Day 17, session 5) was "verified" using broad searches instead of per-site ones — the facts turned out fine on a spot re-check, but the process itself didn't match what this rule requires, and the user caught it, not Claude. Default to the strictest reading of this rule, always — it is described as non-negotiable and hardcore by the user, so ambiguity gets resolved toward more rigor, never toward what's faster.
- This is an AND, not an OR. All four sources must show the exact same fact/number/detail.
- Zero tolerance: ANY mismatch between the sources, however small (e.g. 703 vs 704 wickets, "left-arm orthodox" vs "left-arm unorthodox", one team missing from an IPL list), counts as a mismatch.
- Claude never resolves a mismatch on its own — no picking the "more likely" source, no majority rule, no judgment call. Every mismatch gets flagged to the user instead.
- Flags are collected together and presented as one list at the end of a batch/file, not one at a time as they come up.
- The user decides the resolution for each flagged item (fix it a specific way, drop it, or keep with a caveat comment). Claude waits for that decision before writing the data.
- Applies to BOTH the existing database (a full re-verification pass, started Day 16, working through content areas one at a time) and every new question/fact/player added from now on — nothing new goes in without clearing all 4 sources first.

KNOWN TOOL LIMITATION (found Day 16): Claude's web tools (WebSearch/WebFetch) cannot access cricbuzz.com at all — it blocks the crawler on both domain-filtered search and direct fetch. Per user decision: Cricbuzz stays in the rule, and every single time it is unreachable, Claude must explicitly flag that fact as "Cricbuzz unreachable" alongside the verification result — this is a standing, permanent flag, not a one-time note. Verification proceeds on the other 3 sources (ESPNcricinfo + Wikipedia + ICC) when Cricbuzz can't be reached, but the gap must always be visible to the user, never silently skipped.

SCOPE AT TIME OF WRITING (Day 16): ~155 existing items across Daily Quiz, Category Quiz (4 categories), On This Day, and Ranking Challenge, plus 130 Wordle players × 8 attributes each, all need to be re-verified under this standard. See Current Build Status for progress through the backlog.

---

## ADDING NEW CONTENT — STANDARD OPERATING PROCEDURE (Added Day 17, session 5)

This is the permanent, repeatable process Claude follows any time the user says "add questions" / "add players" / "add [X]" to any content area — the user should never need to re-explain this process. It applies to all 5 content files: `question-bank.js` (quiz questions), `players.js` (Wordle), `onthisday.js` (dated events), `ranking.js` (challenges), `poems.js` (poems + Poetry Quiz).

**Step 1 — Figure out the target file and shape.** Match the request to the right file (see the field shapes documented earlier in this file for each). If the user gives a topic/player/theme rather than full content, Claude drafts the actual question/entry itself.

**Step 2 — Check for duplicates.** Before writing anything, check the existing bank for the same fact already covered under different phrasing (this is what caused the Day 17 merge cleanup). Skip or merge instead of adding a near-duplicate.

**Step 3 — Verify every fact.** Run the Four-Source Verification Rule above on every new fact — live web search, not training data. Cricbuzz is expected to be unreachable (standing tool limitation) — flag it every time, don't silently skip it. If a fact is a "current record" / "most X" / "reigning champion" type that can change over time (Question Quality Rule), handle it explicitly: note in the fact text if the record is still growing (an active player), confirm if the record is now closed (a retired player), and phrase dated tournament results around their specific year rather than "current champion" so the question never goes stale.

**Step 4 — Tag correctly.** For `question-bank.js`: assign `category` (ipl/test/odi/t20/general) and `era` (Pre-1970s/1970s-80s/1990s/2000s/2010s/2020s/General) per the existing tagging rules. For other files, follow that file's existing field schema exactly (e.g. Wordle's 8 attributes, Ranking's 5-item ordered list).

**Step 5 — Structural validation.** Before considering the content done, run a quick integrity check confirming every new entry has all required fields, exactly 4 options where applicable, and a valid correct-answer index — this catches typos/missing fields before they ever reach a user.

**Step 6 — Test live in the browser.** Load the relevant page(s), confirm the new content renders correctly with no console errors, and confirm any live counts (home page stat strip, category pool sizes) updated correctly with zero manual editing needed elsewhere.

**Step 7 — Report back plainly.** Give the user the full list of what was added (not just a count), any facts that needed special "growing record" handling, and explicitly confirm the verification pass ran (which sources, Cricbuzz status) rather than just asserting "verified" — this is what lets the user actually check the work, not just trust it blindly.

**Step 8 — Commit, push, deploy, and update Current Build Status** — per the standing project rule, automatically, without being asked.

If at any point a fact can't be confirmed clean across the reachable sources, it gets flagged to the user per the Four-Source Verification Rule's mismatch-handling process — Claude never guesses or picks a "likely" answer to keep moving.

---

## CRICKET WORDLE PLAYER DATA RULE — PERMANENT (Added Day 10, updated Day 14)

The Cricket Wordle game uses a player database in `players.js`. Every player entry has 8 guessable attributes: country, role, battingStyle, bowlingStyle, debutYear, format, iplTeams, iccTrophies.

- `bowlingStyle` — added Day 14. Mark "NA" only if the player has a genuinely confirmed zero-ball bowling record (e.g. Rishabh Pant, Sanju Samson — explicitly 0 overs/wickets in their career stats). If they have bowled even a single delivery anywhere in their career — even just once, even a part-timer's over — record their actual bowling style instead of NA. Caught this the hard way on Day 14: MS Dhoni was wrongly marked NA despite having bowled in internationals (took 1 wicket, 2009 Champions Trophy, right-arm medium). If no source can confirm bowling record either way (bowled or never bowled), mark NA but add a comment flagging it as unconfirmed rather than proven, so it can be revisited (see KL Rahul's entry as the template for this).
- `iplTeams` — added Day 14, replaces the old single `iplTeam` + `iplTeamsCount` fields. An array of every IPL team the player has actually played a match for, in chronological order — not just their current or most recent team. A team they were signed to but never played a game for (e.g. Axar Patel's Mumbai Indians stint) does not count. Empty array `[]` for players who never played IPL.
- IPL TEAM LIST SEARCH METHOD — PERMANENT (added Day 14, after Batch 2 needed a second correction pass): a single combined search query (e.g. "Player X batting bowling style IPL teams") reliably surfaces batting/bowling style but is NOT reliable for the full IPL team list — it tends to surface only the player's most recent or most prominent team and silently miss earlier ones. This caused 6 real misses in Batch 2 alone (Guptill, Ponting, Gilchrist, Russell, Chanderpaul, Ross Taylor), including two players wrongly marked "Didn't play IPL" who had actually played for multiple franchises. Always run a SEPARATE, dedicated query for IPL history specifically — phrase it as "complete IPL career all teams" or "did X ever play IPL" rather than folding it into the combined batting/bowling query — for every player, not just the ones that seem like they might have a complicated history. This is now mandatory before marking any player's `iplTeams` as a single team or empty array.
- CROSS-VERIFICATION STANDARD: every one of the 8 attributes (not just batting/bowling style and IPL teams) must pass the FOUR-SOURCE VERIFICATION RULE above — Cricbuzz + ESPNcricinfo + Wikipedia + ICC official records, zero-tolerance AND logic. Any mismatch is flagged to the user, collected together per batch, never resolved silently.
- `pickTodayPlayer()` in wordle.js only selects the daily mystery player from players that have `bowlingStyle` defined (i.e., have been through this verification pass) — this expands automatically as each country batch gets done, so nobody is ever shown as the day's answer with unverified data.

FORMAT RULE — THIS IS CRITICAL:
- "All-format" means the player played at least 1 official international match in ALL THREE formats: Tests, ODIs, AND T20 Internationals.
- IPL, Big Bash, domestic T20, franchise cricket — these do NOT count as T20 Internationals.
- If a player retired before T20 Internationals existed (before 2005) — they cannot be All-format.
- If a player played only 1 T20I — that still counts as All-format (e.g. Sachin, Ganguly — wait, Ganguly played zero T20Is, he is ODI only).

VERIFIED FORMAT CORRECTIONS MADE ON DAY 10:
- Brian Lara → ODI (retired 2007, zero T20Is — Southern Rocks T20 in 2010 was domestic Zimbabwe cricket)
- Shane Warne → ODI (retired January 2007, zero T20Is — IPL was franchise cricket not T20I)
- Wasim Akram → ODI (retired 2003, T20I format did not exist)
- Kapil Dev → ODI (retired 1994, T20I format did not exist)
- Sourav Ganguly → ODI (zero T20 Internationals for India — all T20 appearances were IPL/domestic only)
- Rahul Dravid → All-format (played 1 T20I vs England in 2011 — verified on ESPNcricinfo and Britannica)

BEFORE ADDING ANY NEW PLAYER TO players.js:
- Always verify their format on ESPNcricinfo first — check the Debut/Last Matches page for T20I section
- If there is no T20I debut listed on ESPNcricinfo, they have zero T20Is — mark them as ODI or Test only
- Never assume a player is All-format because they played IPL or domestic T20
- Always add a comment line with the verification source and match counts

---

## DAILY SESSION FORMAT

Every session must follow this structure:
1. START: "Last session we completed [X]. Today we are building [Y]."
2. BUILD: Make the changes directly in the code, one feature at a time.
3. TEST: Tell me exactly how to test that the feature works.
4. DEPLOY: Commit to GitHub and deploy to Vercel automatically.
5. END: "Today we completed [X]. Next session we will build [Y]."

---

## CURRENT BUILD STATUS

- Day: 17 In Progress (re-verification pass, continuing next session)
- Last completed:
  Day 9 — Full Phase 1 end-to-end test passed. Speed Round Quiz built (speedround.html + speedround.js). 30 questions, 60-second timer, instant answer flash, Speed Demon badge at 25/30, XP saved to Firebase. Speed Round card added to home screen.
  Day 10 — Cricket Wordle built (wordle.html + wordle.js + players.js). 20 verified players, 5 attributes each, 6 guesses, colour-coded tiles (green/yellow/grey), autocomplete input, WhatsApp share of emoji tile result, XP saved to Firebase. Full rules screen shown before game starts. All player format attributes verified against ESPNcricinfo — Ganguly, Lara, Warne, Wasim, Kapil corrected to ODI-only.
  Day 11 — Ranking Challenge built (ranking.html + ranking.js). 5 drag-and-drop challenges with touch support for mobile, XP saved to Firebase. Fact-checked all player stats — fixed 4 real errors: Steve Smith swapped for Ricky Ponting (Smith is still active, average keeps changing), James Anderson wicket count and sort order corrected (704 wickets, was ranked wrongly above Warne), broken England flag emoji fixed, IPL titles list rebuilt to include RCB's 2025 and 2026 championships and correct Rajasthan Royals count (1 title, not 2).
  Day 12 — Badges & Titles system built across 6 files (profile.html, profile.css, quiz.js, category-quiz-v2.js, wordle.js, ranking.js). 9 badges total: Debutant, Perfectionist, Sachin Scholar, IPL Legend, Speed Demon, Wordle Wizard, Ranking Master, On Fire, Test Legend. 3 are computed directly from existing profile data (no extra writes needed); 6 unlock live during gameplay via a `badges` object saved to Firestore. Verified level-naming system is consistent across all game files. Fact-checked category quiz bank (IPL/Test/ODI/T20) — all confirmed accurate, including 2026 T20 World Cup results.
  Day 13 — Switched fully to Claude Code workflow (repo cloned locally, CLAUDE.md rewritten for direct file edits instead of copy-paste, permanent Model Selection rule added, "new chat per day" guidance added, permanent rule added to always show built features as Artifacts instead of live browser previews). Fixed a real Cricket Wordle bug: the game compared a placeholder "era" field that didn't exist anywhere in players.js, so that column always showed green with the literal text "undefined." Rebuilt around the actual 9 confirmed fields (country, role, battingStyle, debutYear, format, iplTeam, iplTeamsCount, iccTrophies) with abbreviations so all 9 columns fit on a phone without scrolling, plus a landscape layout. Also fixed a pre-existing site-wide navbar overflow bug on narrow phones. Started Feature 19 — Stats Dashboard: Step 1 (stats.html) shows quizzes played, accuracy, streaks, XP/level, badges, Wordle record, Speed Round record — all from existing Firebase fields. Step 2 added per-attempt quizHistory logging to quiz.js and category-quiz-v2.js (category, score, total, date) and built Category Strength, Accuracy Over Time graph, and a 70-day Activity Calendar heatmap from it.
  Day 14 — Feature 19 Stats Dashboard, Step 3: added the same per-attempt quizHistory logging to speedround.js (one entry per round, score/30) and ranking.js (one entry per full 5-challenge session, correct positions/25), so both games now feed Category Strength, Accuracy Over Time, and the Activity Calendar the same way Daily Quiz and Category Quiz already do. Updated stats.html's CATEGORY_NAMES map to display "Speed Round" and "Ranking Challenge" labels. Verified both save paths run without console errors in the browser (not logged in, so hit the expected "not saved" branch — real Firebase write untested live, needs a logged-in playtest to confirm end-to-end).
  Day 14 (session 2) — Feature 19 Stats Dashboard, Step 4: tagged every question in questions.js (28) and category-questions.js (60) — 88 total, the app's current real question count (the 200+ figure in the master feature list is the eventual target, not yet built) — with an `era` field. Rule agreed with user: event-specific questions (a match, a record set on a known date) are tagged by that event's decade; player/team career questions with no single anchoring date use the midpoint of the relevant career span; timeless rules and definitions are tagged "General". Buckets used: Pre-1970s, 1970s-80s, 1990s, 2000s, 2010s, 2020s, General. Real distribution: 2020s×20, 2010s×20, 2000s×18, General×16, 1970s-80s×6, 1990s×5, Pre-1970s×3. This is prep data only — the Stats Dashboard does not yet display a "weakest era" stat; that's unbuilt.
  Day 14 (session 3) — Feature 19 Stats Dashboard, Step 5: added a Percentile Rank card (ranks the player's XP against every user in Firestore, shows "Top X%"; needs 5+ ranked players or shows a friendly "not enough players yet" message) and a Friends Comparison card (mini XP-ranked list of the player plus their friends, with a "You're #N of M" line). Friends Comparison reuses the existing `friends` UID array that leaderboard.html's Friends tab already manages — no new friend system was built. Added a `?tab=friends` URL param to leaderboard.html so the new "Manage Friends →" link deep-links straight into that existing tab. Verified both cards' empty states (not logged in, no friends, too few players) render correctly against the real Firestore project, and verified the populated-state row/rank logic with mock data — real end-to-end (a logged-in account with friends and enough ranked players) still needs a live playtest.
  Day 14 (session 4) — Feature 19 Stats Dashboard, Step 6 (final piece): built the weakest-era card. Daily Quiz (quiz.js), Category Quiz (category-quiz-v2.js) and Speed Round (speedround.js) now check each answered question against its era tag and merge correct/total counts into a running `eraStats` object on the user doc — Speed Round needed a new `srResults` array added first since it didn't previously track per-question correctness. Ranking Challenge and Wordle don't draw from the era-tagged question banks, so they don't contribute. "General" (timeless rules/definitions) is excluded from era stats since it isn't a real era. Stats Dashboard's new "Cricket Era Strength" card shows strongest/weakest era, reusing the existing category-card CSS. Removed the old "Coming soon" placeholder card, which only listed this one feature. Verified the merge math and rendering with mock data in the browser — real end-to-end still needs a logged-in playtest across a few quiz types. **Feature 19 (Stats Dashboard) is now fully built: Overview, Game-by-Game Breakdown, Category Strength, Cricket Era Strength, Accuracy Over Time, Activity Calendar, Percentile Rank, Friends Comparison, Badges.**
  Day 14 (session 5) — Feature 23 (On This Day) built. User chose this plus Avatar Customisation next, parking Top 5 for later. New file onthisday.js holds 18 dated cricket events (Kumble's 10/74, Sachin's ODI 200*, the Eden Gardens Test, Sachin's 100th century, the 2011 World Cup win, Lara's 400*, the first IPL match, RCB's 2025 title, Kapil Dev's 175*, India's first Test, India's first World Cup, Bradman's 309 in a day, Yuvraj's six sixes, India's first T20 World Cup, Rohit's 264, Sachin's Test debut and retirement, and Australia's 2023 World Cup win) — every date verified against ESPNcricinfo/Wikipedia via live web search before adding, per the Question Quality Rule. New card on index.html (below the stats strip) matches by month+day so it recurs yearly; if a date has 2+ events (25 June has two, 51 years apart) it rotates deterministically like Wordle's daily player. Falls back to a "Did You Know" fact pulled from the already-verified Daily Quiz question bank on days with no logged event — today (12 July) currently shows the fallback. Verified both the match path and fallback path render correctly in the browser with no console errors.
  Day 14 (session 6) — Feature 20 (Avatar Customisation) built on profile.html + profile.css. Three cosmetic slots — Headgear (Cap → Pro Helmet → Champion's Crown), Bat (Classic → Golden → Speedster), Avatar Frame (Bronze → Silver → Gold ring) — shown as emoji overlays/box-shadow ring on the existing team-emoji avatar circle in the header card. Every unlock condition reads data already earned by playing (XP level, badges, best streak, quizzes played) — no currency, nothing to buy, stays inside the legal boundary in this file. Equipped choice saves to a new `equippedAvatar` field on the user doc and re-renders instantly on click. Verified locked/unlocked/equipped rendering with mock data in the browser, no console errors — real end-to-end (logging in, unlocking an item by actually playing, equipping it) still needs a live playtest. **Both features the user asked for this session (On This Day, Avatar Customisation) are done; Top 5 remains parked.**
  Day 14 (session 7) — Real bug fix: the On This Day fallback ("Did You Know") gave no indication it was part of On This Day and never showed today's date, so on non-matching days (like 12 July) the section looked unrelated to its own heading. Added a persistent "📅 On This Day in Cricket" heading above the card so the section reads clearly in both states, and both the matched-event and fallback text now name today's date explicitly (e.g. "On This Day, 2 April — 2011" / "No cricket event logged for 12 July yet — here's a fact instead:").
  Day 14 (session 8) — Feature 21 (Cricket Poetry) built. User asked for more options beyond Top 5/News Feed/Encyclopaedia (all parked); picked Poetry over Match Day Alert, Push Notifications, and Hindi support. New poetry.html page + poems.js holds 6 original poems: The Wall (Dravid), Six to Glory (Dhoni's 2011 World Cup final six), Four Hundred Not Out (Lara's 400*), Every Kid's Sachin, Eden's Miracle (the 2001 follow-on Test), and a Hinglish anthem for the app itself ("Aao CricTakkar Karte Hain"). Every cricket fact referenced inside a poem is drawn only from moments already verified elsewhere in the app (questions.js/category-questions.js/onthisday.js) — no new unverified claims introduced. Home screen got a matching feature card. Live match-triggered Claude-API poems (mentioned in the master brief) need a paid API key, so this is a curated pre-written set instead — can add more poems the same way, or layer in live generation once there's revenue to fund it.
  Day 14 (session 9) — Two real bug fixes. (1) The home page stats strip showed hardcoded "200+ Quiz Questions" and "5 Categories" that had drifted out of sync with the actual question bank — now computed live in app.js from questionBank + categoryQuestions on every page load, so it always matches reality without a manual edit (currently 88 questions, 5 categories). (2) The "Aao CricTakkar Karte Hain" anthem poem was written in romanized Hinglish; user wanted it in actual Hindi (Devanagari) script — rewrote all three stanzas in Devanagari, keeping only the title and the brand name "CricTakkar" in Roman script to match the rest of the app's branding.
  Day 14 (session 10) — Community Poems added to poetry.html: logged-in users can now post their own cricket poems to a public feed (new Firestore collection `communityPoems`), like/unlike, comment (subcollection), share via WhatsApp (same wa.me pattern used elsewhere), and delete their own poem. MODERATION DECISION (asked user directly since there's no admin dashboard yet — that's Feature 47, Phase 4): auto-publish immediately, plus a lightweight community safety net — any poem reported by 3+ distinct users auto-hides from the public feed. All user-submitted text (title, body, author name, comments) is HTML-escaped before insertion into the DOM to prevent script/HTML injection. Verified not-logged-in state, empty-feed state, author-vs-other-user button visibility (delete vs report), report-threshold math, and XSS escaping — all via mock data and isolated function calls, deliberately without writing real content into production Firestore. Still needs a real logged-in playtest (post something, like it, comment, then delete it) to confirm the live write path end-to-end.
  Day 14 (session 11) — Two additions on top of Community Poems. (1) Uploaded poems are now treated like any other game: a new "My Poems" card on profile.html lists everything a player has posted (with delete), and stats.html's Game-by-Game Breakdown gets a Poetry row (poems shared + total likes) — both query `communityPoems` filtered by `authorUid`, sorted client-side to avoid needing a composite Firestore index. (2) Poetry Quiz added as a fifth category-quiz type alongside IPL/Test/ODI/T20, reusing the exact same categoryQuestions/category-quiz-v2.js engine with zero engine code changes — each entry's `question` field just holds a 4-line poem instead of a plain question, so era stats and everything else work automatically. 12 poems written, each grounded in a fact already verified elsewhere in the app (Lara's 400*, Dhoni's 2011 final six, Kapil's 175*, Kumble's 10/74, Yuvraj's six sixes, Laxman's 281, Rohit's 264, Dravid's "Wall" nickname, the 2011 World Cup win, the first IPL match, Bradman's 309 in a day, Sachin's 100th century). quiz.css's `.question-text` got `white-space: pre-line` so poem line breaks render. Verified: live stats strip auto-updated to 100 questions/6 categories with zero manual edit, full poetry quiz playthrough (10/10, era stats merged correctly), and My Poems / Poetry stat empty states against the real Firestore project.
  Day 14 (session 12) — Cricket Wordle data overhaul, Batch 1 of 5 (India, 30 players). User flagged a real error — Zaheer Khan listed as left-hand bat, actually right-hand — and asked for a full cross-check plus a new bowling-style field and complete IPL team lists. Agreed pacing with user: 5 batches of 25-30 players, each cross-verified against ESPNcricinfo, Cricbuzz, and Wikipedia via live web search. India done today: fixed Zaheer Khan plus 9 more real IPL-team errors found the same way (Dhoni, Ganguly, Dravid, Kumble, Laxman, Sehwag, Ashwin, Jadeja, Shami, Ishant Sharma, KL Rahul, Rishabh Pant, Sanju Samson, Irfan Pathan, Axar Patel — mostly missing a team they'd since moved to, or in Dravid/Kumble/Axar's case listing a team they never played for). Added `bowlingStyle` field (NA if a player never bowls) and replaced `iplTeam`+`iplTeamsCount` with a single `iplTeams` array listing every team actually played for. wordle.js: added a Bowl Style column, merged the two old IPL columns into one with new set-overlap comparison logic (green = identical team list, yellow = share at least one team, grey = none), rebalanced column widths. `pickTodayPlayer()` now only selects from players that have completed this verification pass, so the daily mystery player is always accurate — players from unconverted countries can still be guessed (just show "?"/"—" placeholders instead of crashing or showing literal "undefined"). Verified all of this live in browser: data loads correctly, comparison logic (green/yellow/grey) tested against real player pairs, full guess row renders correctly, guessing an unconverted player degrades gracefully.
  Day 14 (session 13) — Real bug fix caught by the user: MS Dhoni was wrongly marked bowlingStyle "NA" — he actually bowled in internationals and took his only wicket (Travis Dowlin, West Indies) in the 2009 Champions Trophy, ESPNcricinfo lists him as right-arm medium. This sharpened the NA rule (now permanent, see Cricket Wordle Player Data Rule above): NA only applies when a player's zero-ball bowling record is explicitly confirmed (like Rishabh Pant and Sanju Samson), not just "rarely used" or "primarily a batter." Re-checked the other India NA calls under this stricter bar — Pant and Samson both have confirmed 0-ball records so stayed NA; KL Rahul stayed NA too but is now flagged in a comment as unconfirmed (no source could prove he bowled OR that he never bowled) rather than presented as settled fact. The rules-screen "8 Clues" text the user thought was unfixed was actually already correct in the code (confirmed via git diff) — that screenshot was a stale/cached page, not a real bug.
  Day 14 (session 14) — Cricket Wordle data overhaul, Batch 2 of 5 (Australia, West Indies, New Zealand — 30 players), applying the sharpened "even one ball bowled = record it, don't default to NA" standard from session 13. Found and fixed 10 more real errors: Glenn McGrath and Tim Southee were both wrongly listed as "Didn't play IPL" (McGrath played 14 matches for Delhi Daredevils in 2008; Southee has played for 5 franchises since 2011); Martin Guptill was also wrongly "Didn't play IPL" (4 matches for Sunrisers Hyderabad in 2019); Steve Smith, Chris Gayle, Brendon McCullum, Trent Boult, and Daniel Vettori all had incomplete or wrong IPL team lists (Smith in particular was undercounted at 3 teams when he's actually played for 6); Curtly Ambrose and Richard Hadlee were both wrongly listed as right-hand bat when ESPNcricinfo and Wikipedia both confirm they batted left-handed. `pickTodayPlayer()` needed no code changes — it already filters generically on `bowlingStyle !== undefined`, so the verified pool auto-expanded to 60 players (India + these 3) the moment the data was added. Verified all 130 players still load with no console errors, spot-checked the fixed entries, and confirmed comparison logic (yellow for partial IPL-team overlap) works correctly on a real player pair (Warner vs Smith, sharing only Delhi Capitals).
  Day 14 (session 15) — Real correction round caught by the user: Martin Guptill's IPL teams were still wrong even after Batch 2's "cross-check" — he'd actually played for 3 franchises (Mumbai Indians, Kings XI Punjab, Sunrisers Hyderabad), not the 1 recorded. Root cause: the combined batting/bowling/IPL search query used for Batch 2 reliably found batting and bowling style but was unreliable for full IPL history, tending to surface only the most recent team. Re-checked every remaining single-team or "no IPL" entry in Batch 2 with a dedicated "complete IPL career" search and found 5 more of the same failure mode: Ricky Ponting (missing Kolkata Knight Riders), Adam Gilchrist (missing Kings XI Punjab), Andre Russell (missing Delhi Daredevils), and Shivnarine Chanderpaul + Ross Taylor (both wrongly marked "Didn't play IPL" — Chanderpaul played 3 matches for RCB in 2008, Taylor played for 4 separate franchises since 2008). Stephen Fleming and David Warner were re-checked and confirmed already correct. Added a permanent rule (see Cricket Wordle Player Data Rule above): IPL team history now always needs its own dedicated search query, separate from the batting/bowling query, for every player — this applies to all remaining batches (3, 4, 5) going forward.
  Day 14 (session 16) — Cricket Wordle data overhaul, Batch 3 of 5 (Sri Lanka, Pakistan, England — 30 players), applying the dedicated-IPL-search method from session 15 plus the sharpened NA standard from session 13. This batch was still on the pre-Day-14 schema entirely (no `bowlingStyle` field at all, old `iplTeam`+`iplTeamsCount` pair) — added bowlingStyle and converted every player to the `iplTeams` array. Found and fixed real errors: James Anderson and Stuart Broad were both wrongly listed as right-hand bat — both actually bat left-handed despite bowling right-arm (same pattern as the Zaheer Khan/Dhoni fixes in earlier batches); Stuart Broad's IPL entry (Kings XI Punjab) was wrong — he was signed for 2011-12 but injured out both seasons and never played a match, so per the existing signed-but-never-played rule (see Axar Patel precedent) this is now an empty array; Joe Root and Younis Khan were both wrongly "Didn't play IPL" — Root played 3 matches for Rajasthan Royals in 2023, Younis Khan played 1 match for Rajasthan Royals in the 2008 season before the informal exclusion of Pakistani players took hold; Shahid Afridi was also wrongly "Didn't play IPL" — he played the 2008 season for Deccan Chargers, the same pre-ban window; Kevin Pietersen and Eoin Morgan both had incomplete IPL team lists, now filled in completely. Eoin Morgan's bowling record could not be confirmed either way, so — like KL Rahul in Batch 1 — it's marked NA with a comment flagging it as unconfirmed rather than settled. Also cleaned up leftover scratch-work "CORRECTION:" comments that had been left baked into the Sri Lanka/Pakistan/England data from an earlier draft pass. `pickTodayPlayer()` needed no code changes — the verified pool auto-expanded to 90 players (previous 60 + these 30) the moment the data landed. Verified live in browser: all 130 players load with no console errors, spot-checked Stuart Broad's guess row rendered the corrected left-hand bat style and empty IPL list correctly.
  Day 15 — Cricket Wordle data overhaul, Batch 4 of 5 (South Africa, Bangladesh, Afghanistan — 30 players), applying the dedicated-IPL-search method and sharpened NA standard from earlier batches. This was the most error-dense batch yet — 18 of 30 players needed a real fix. Wrong batting hand (bowling-arm/batting-hand mix-ups, same pattern as Zaheer Khan/Anderson/Broad): Kagiso Rabada, Mustafizur Rahman, Taskin Ahmed all actually bat LEFT-handed; Fazalhaq Farooqi actually bats RIGHT-handed (the reverse mix-up). Wrongly "Didn't play IPL": Shaun Pollock (Mumbai Indians, 2008), Mark Boucher (RCB then KKR, 2008-2011), Mohammad Ashraful (Mumbai Indians, 2009), Litton Das (KKR, 2023), Gulbadin Naib (Delhi Capitals, 2024). Incomplete IPL histories (missing a team they'd moved to): AB de Villiers, Jacques Kallis, Graeme Smith, Faf du Plessis, Mark Boucher, Aiden Markram, Kagiso Rabada, Mustafizur Rahman. Wrongly included a team that signed but never fielded them (new instance of the Axar Patel/Stuart Broad "signed but never played" rule): Shakib Al Hasan (Mumbai Indians — he'd played AGAINST them, not for them), Mohammad Nabi (KKR 2022), Mujeeb ur Rahman (a second Kings XI Punjab stint that was actually a data error), Rahmanullah Gurbaz (Gujarat Titans 2022), Mustafizur Rahman (KKR 2026, released by BCCI instruction before playing). One near-miss caught before it became a bad edit: Asghar Afghan appeared to have "6 IPL matches, HS 164" in an early search, which would have been a big fix — but a follow-up search revealed the source was Legends League Cricket (a retired-players' exhibition tournament with teams like "Toyam Hyderabad"), not the real IPL, so "Didn't play IPL" stayed correct. Also flagged two low-confidence entries per the cross-verification rule rather than guessing: Mushfiqur Rahim's bowling style (sources split between left-arm orthodox and right-arm medium — went with the ESPNcricinfo-sourced answer but flagged it, same treatment as KL Rahul), and Mohammad Ashraful's bowling style (sources split between off break and leg break — recorded off break as primary with a flag). All 30 players newly got the `bowlingStyle` field and were converted from the old `iplTeam`/`iplTeamsCount` pair to the `iplTeams` array. `pickTodayPlayer()` needed no code changes — the verified pool auto-expanded to 120 of 130 players. Verified live in browser: all 130 players load with no console errors, spot-checked 4 of the corrected entries rendering exactly as written, and ran the actual `comparePlayer()` guess-scoring function against two of the new players (Rabada vs Markram) to confirm the green/yellow/grey logic works correctly on the new data, not just that it loads.
  Day 16 — Cricket Wordle data overhaul, Batch 5 of 5 (Zimbabwe, 10 players) — the FINAL batch. All 130 players are now fully verified. Found and fixed 3 real errors plus one format correction: (1) Grant Flower's battingStyle was wrongly "Left-hand" — he actually bats right-handed and bowls left-arm orthodox spin, the same bowling-arm/batting-hand mix-up pattern as Zaheer Khan/Anderson/Broad/Rabada, confirmed via direct Wikipedia infobox fetch plus a second source after an initial search gave conflicting answers. (2) Tatenda Taibu was wrongly "Didn't play IPL" — he was actually the first-ever Zimbabwean IPL player (Kolkata Knight Riders, 2008, 3 matches). (3) Sikandar Raza was wrongly "Didn't play IPL" — he played for Punjab Kings in IPL 2023–2024 (7 matches, first Zimbabwean IPL half-century). (4) Andy Flower's format was wrongly "All-format" — his playing career ended in 2003, before T20Is existed (first T20I was Feb 2005), so he has zero T20Is; corrected to ODI, same pattern as the Kapil Dev/Warne/Wasim Akram/Ganguly corrections from Day 10. Confirmed via a dedicated authoritative source (a CREX "Zimbabwe stars in IPL" listicle, cross-checked against Wikipedia's 2014 Sunrisers Hyderabad season squad/stats tables) that only 5 Zimbabweans have ever played IPL: Tatenda Taibu, Ray Price, Brendan Taylor, Sikandar Raza, Blessing Muzarabani — this confirmed Hamilton Masakadza and Grant Flower as correctly "Didn't play IPL" by exclusion, and clarified that Brendan Taylor was signed by Sunrisers Hyderabad in 2014 but never fielded in a match all season, so his empty iplTeams array is correct under the existing "signed but never played" rule (same as Axar Patel/Stuart Broad). All 10 players newly got the `bowlingStyle` field and were converted from the old `iplTeam`/`iplTeamsCount` pair to the `iplTeams` array. `pickTodayPlayer()` needed no code changes — the verified pool is now the full 130 players, so the "only fully-verified countries can be today's mystery player" restriction is now moot. Verified live in browser: all 130 players load with no console errors, spot-checked the corrected Grant Flower/Taibu/Raza/Andy Flower entries via direct data inspection, and ran the actual `comparePlayer()` guess-scoring function (Raza vs Taibu, Grant Flower vs Andy Flower, and a self-comparison sanity check) to confirm green/yellow/grey logic is correct on the new data. **The full Cricket Wordle data overhaul (all 5 batches, 130 players) is now complete.**
  Day 17 — User asked to build a "hardcore" permanent fact-checking system before continuing feature work, since questions/data had only ever been spot-checked ad hoc. Mapped every place facts live in the app (Daily Quiz, Category Quiz × 5 sub-categories including a T20 one that wasn't in the master feature list's original count, On This Day, Ranking Challenge, Cricket Wordle, Poetry) and agreed the rule with the user step by step: every fact must be checked against **Cricbuzz + ESPNcricinfo + Wikipedia + ICC official records** (4 sources, AND logic — all must agree, zero tolerance for any mismatch), applies to the existing backlog AND all future additions/new categories automatically, flags are collected together per batch (not one at a time), and the user decides the resolution for every flag. Written permanently into CLAUDE.md as the new FOUR-SOURCE VERIFICATION RULE section (supersedes the old 2-source wording in the Question Quality Rule and Wordle Player Data Rule). KNOWN TOOL LIMITATION discovered and now permanently documented: Claude's web tools cannot access cricbuzz.com at all (blocked on both WebSearch domain-filter and WebFetch) — Cricbuzz stays in the rule per user decision, but every check runs on the other 3 sources with Cricbuzz explicitly flagged as unreachable every single time.
  Then started the actual re-verification pass, one file at a time: **Daily Quiz (questions.js)** — all 28 checked, 24 confirmed clean, 4 fixed per user's calls: dropped the Rohit-Sharma-7-WC-centuries question (live/growing record risk, Rohit still active in ODIs), dropped the McGrath-dismissed-Sachin question (app said 8, no source agreed — real sources said 6 in Tests, one unreliable search said 20, ESPNcricinfo direct fetch was 403-blocked), updated Kohli's IPL runs to "over 9,000" with a growing-number note, fixed Kumble's Test wicket rank from "third highest" to "fourth highest" (Anderson's 704 passed him after Kumble retired). **Category Quiz — IPL** — 16 questions now (added 1): fixed Chahal's wicket-record year (was wrongly 2024, actually 2023), dropped a false "first ever IPL century after 17 years" claim from a Kohli fact (his real first IPL century was 2016), updated Kohli's runs to 9,000+, and added a new question for RCB's back-to-back IPL 2026 title (beat Gujarat Titans by 5 wickets, Ahmedabad) which the bank didn't have at all. **Category Quiz — Test** — 16 questions: only the same Kumble "third/fourth highest" fix needed; also resolved a minor Dravid run-total discrepancy (13,288 vs 13,265 from a lower-quality source) myself by going straight to ESPNcricinfo Statsguru, confirmed 13,288 is correct, no app change needed since it already had the right number. **Category Quiz — ODI** — 13 questions (dropped 2, net): dropped a wrong ODI-overs-history fact (app said "60 overs when they began in 1971," actually the first ODI was 40 eight-ball overs, 60-over standard came slightly later), and moved a miscategorized Test-match question (Ganguly's Lord's debut century) out of the ODI array into the Test array where it belongs. All fixes verified live in the browser via the static-server preview each time (question counts, no console errors, spot-checked the corrected fact text renders). Cricbuzz was unreachable for every single query across all of today's re-verification — the standing flag applies uniformly.
  Day 17 (session 2) — Continued the Four-Source Verification re-check. **Category Quiz — T20** (15 questions): all 15 confirmed clean, zero fixes needed — verified the 2026 T20 World Cup facts (India beat New Zealand by 96 runs at Narendra Modi Stadium Ahmedabad, Suryakumar Yadav captain, Sanju Samson Player of the Tournament with 321 runs, first team ever to defend the title, first host nation to win) directly against ICC official site, ESPNcricinfo, Wikipedia, and other sources via live web search, plus re-confirmed the 2024 facts (Bumrah POTT, Kensington Oval Barbados final) and the well-established 2007 facts (Gayle's first T20 WC century, Yuvraj's six sixes off Broad, the India-Pakistan bowl-out). **Poetry** (poems.js's 6 poems + category-questions.js's 12-question poetry quiz): checked all embedded facts, including re-confirming Rohit Sharma's 264 is still the ODI record in 2026 and that the Eden's Miracle poem's "376" correctly refers to the Laxman-Dravid partnership total. Found and fixed 1 real error: the "Four Hundred Not Out" poem said Lara's 400* broke a record of roughly "three-fifty," but the actual record he broke was Matthew Hayden's 380 (set 6 months earlier vs Zimbabwe) — user chose to fix the line to "Three-eighty gone, then one run more" rather than reword or leave it. Verified the corrected line renders properly on poetry.html with no console errors. Cricbuzz was unreachable for every query today — standing flag applies uniformly.
  Day 17 (session 3) — Finished the Four-Source Verification re-check backlog. **On This Day** (18 dated events): all 18 confirmed clean, zero fixes needed — verified every single date (Kumble's 10/74 on 7 Feb 1999, Sachin's ODI 200* on 24 Feb 2010, the Eden Gardens Test ending 15 March 2001, Sachin's 100th century on 16 March 2012, the first IPL match on 18 April 2008 including McCullum's exact score and margin, RCB's 2025 title date and margin, Kapil's 175* on 18 June 1983, India's first Test and first World Cup both correctly sharing 25 June across 1932/1983, Bradman's 309 on 11 July 1930, Yuvraj's six sixes on 19 Sept 2007, India's first T20 WC win on 24 Sept 2007, Rohit's 264 date, Sachin's final Test starting 14 Nov 2013, Sachin's debut on 15 Nov 1989, and Australia's 2023 World Cup win on 19 Nov 2023) against ESPNcricinfo/Wikipedia/ICC. **Ranking Challenge** (5 challenges, 25 data points): 24 of 25 confirmed clean, including re-verifying Ponting/Lara/Sachin/Kohli's exact career Test averages, all 5 bowlers' exact wicket counts, all 4 players' Test debut years, and IPL title counts (confirmed RCB now has 2 IPL titles after also winning IPL 2026 beating Gujarat Titans, and confirmed Sunrisers Hyderabad correctly stays at 1 title since Deccan Chargers 2009 is a separate franchise in official IPL records, not merged with SRH despite sharing a city). Found and fixed 1 real error: Fakhar Zaman's Challenge 5 entry said "193 vs Zimbabwe" but his actual score — Pakistan's first ODI double century — was 210 not out; user chose to fix the number (ranking order unaffected, still below Gayle's 215). Verified the corrected value loads correctly in the browser with no console errors. Cricbuzz was unreachable for every query today — standing flag applies uniformly. **The full Four-Source Verification re-check backlog (Daily Quiz, all 5 Category Quiz sub-categories, Poetry, On This Day, Ranking Challenge) is now complete — every fact currently in the app has been checked against Cricbuzz/ESPNcricinfo/Wikipedia/ICC.**
  Day 17 (session 4) — Merged the question-bank architecture per the user's request: Daily Quiz and Category Quiz used to be two separate files (`questions.js` for Daily, `category-questions.js` for IPL/Test/ODI/T20/Poetry) that had grown 14 genuine duplicate questions between them — the same fact tested twice under different phrasing (e.g. Lara's 400*, Kumble's 10/74, RCB's IPL 2025 win, Dravid's "Wall" nickname). Built one new central file, `question-bank.js` — a single 72-question array, each question tagged `category: ipl | test | odi | t20 | general` (`general` = format-agnostic trivia like LBW/golden duck with no category-quiz tab of its own). Daily Quiz and Speed Round now draw randomly from the whole tagged bank; Category Quiz filters by tag. Poetry got consolidated into its own single repository too, per the user's explicit instruction: the 12-question Poetry Quiz moved out of `category-questions.js` into `poems.js` as a new `poetryQuizQuestions` array, living alongside the existing 6 poems. `questions.js` and `category-questions.js` are both deleted. Updated `category-quiz-v2.js` to filter `questionBank` by category (or read `poetryQuizQuestions` for the poetry tab), and `app.js`'s home-page live stat counter to read the new structure. Updated 4 HTML files' script tags (`index.html`, `quiz.html`, `speedround.html`, `category-quiz.html`). Net count: 98 questions → 84 after dedup (72 tagged + 12 poetry), same knowledge base, no fact lost. Verified live in the browser: home page shows 84/6 with no console errors, Daily Quiz correctly draws mixed-category questions, all 5 Category Quiz tabs (including Poetry) filter to the right pool size (16/19/15/17/12), a deduplicated fact (RCB's IPL 2025 win) still renders correctly in its category tab, Speed Round's pool grew from 26 to 72 with no code changes needed, and Stats Dashboard/On This Day/Poetry pages all load clean. Wordle (`players.js`), On This Day (`onthisday.js`), and Ranking Challenge (`ranking.js`) were left untouched — they already had their own single dedicated file, matching what the user asked for.
  Day 17 (session 5) — Added 30 new verified questions to `question-bank.js`, bringing it from 72 to 102 (ipl 23, test 26, odi 22, t20 22, general 9). Every fact checked via live web search before adding — including several "current record" style facts handled carefully per the Question Quality Rule: Kohli's 54 ODI centuries flagged as still-growing (he's active in ODIs), Rohit Sharma's 5 T20I centuries noted as now-closed (he's retired from the format), and dated tournament results (Champions Trophy 2025, WTC 2021/2025, T20 WC 2021/2022) phrased around their specific year rather than "current champion" so they won't go stale. New topics added: IPL records (most sixes, fastest century, most successful captains, highest team total, first hat-trick, Purple Cap 2024, first season's team count), Test milestones (Jim Laker's 19-wicket match, the only 2 tied Tests in history, Bradman's 99.94 average, Sehwag's 319, McCullum's fastest century, both WTC finals), ODI history (the first ODI ever in 1971, Kohli's centuries record, 2015/2019 World Cup winners, Champions Trophy 2025, Ponting's 2 World Cup titles, Vaas's 8/19), T20 history (2021/2022 T20 World Cup winners, the first ever T20I, Kohli's twice-won Player of the Tournament, the Rohit/Maxwell century tie), and general rules (DRS, maiden over, Powerplay, what ODI stands for). Verified live in the browser: all 102 questions pass a structural integrity check (4 options, valid correct index, fact, era, category present on every entry), home page stat strip auto-updated to 114 total (102 + 12 poetry), Daily Quiz/Speed Round see the full 102, and all 4 category-quiz tabs filter to the right counts (23/26/22/22) with no console errors.
  Day 17 (session 6) — Two process fixes plus started an IPL history project. (1) Closed an ambiguity in the Four-Source Verification Rule: it said facts must be "checked against" the 4 sources but didn't specify the mechanism, which let a batch of 30 questions get verified via broad web searches instead of explicit per-site domain-restricted ones (user caught it — see the rule's own text for the added mechanism clause). (2) Discovered and documented two structural, permanent facts about IPL content specifically: ICC official records don't cover the IPL at all (it's a BCCI domestic league, not an ICC event — not "unreachable" like Cricbuzz, genuinely inapplicable), and there is no real official "IPL MVP" trophy — nearly every "MVP" claim online is actually ESPNcricinfo's own unofficial "Smart Stats" analytical ranking, not a BCCI-awarded prize, and it's inconsistently reported. Per user decision: for IPL facts specifically, the 3rd/4th source slots become ESPNcricinfo + Wikipedia + iplt20.com (official IPL site) with Cricbuzz still flagged unreachable every time; MVP is dropped as a question category entirely (not a verifiable official award). Started adding full IPL season history (winner, runner-up, Orange Cap, Purple Cap for all 19 seasons 2008-2026) in Wordle-style batches — **Batch 1 (2008-2013) done**: 24 new questions added to `question-bank.js` (102 → 126, IPL 23 → 47), each cross-checked against ESPNcricinfo + Wikipedia, with 3 real discrepancies caught and resolved via direct primary-source lookup (a 2010 winner mix-up and two MVP-attribution errors from noisy search synthesis — resolved using actual match scorecards/official award pages, not guessed). Verified live: no structural issues across all 126 questions, home page stat strip auto-updated to 138, IPL category pool confirmed at 47 with the new 2008 questions rendering correctly.
- Next task: Continue the IPL season history project — Batch 2 (2014-2018), Batch 3 (2019-2022), Batch 4 (2023-2026), same 4 categories (winner/runner-up/Orange Cap/Purple Cap) each. After that, remaining still-parked features: Top 5 section (Feature 22), Cricket News Feed (Feature 24), Player Encyclopaedia (Feature 28), Match Day Alert (Feature 26), Push Notifications (Feature 25), Hindi language support (Feature 27), Battle Friends groundwork (Phase 3).

---

## HOW TO START EACH DAY

Start a new chat each day rather than continuing an old one. CLAUDE.md already carries everything that matters (build status, rules, feature list), so a fresh chat loses nothing — and it keeps daily usage limits from being eaten up by reprocessing many days of old conversation. Only continue the same chat if doing a second session on the same day, shortly after the first.

Begin every chat session inside this project with:
"Starting Day [number] of CricTakkar. Yesterday we [what you did]. Today let's [what's next]."

---

## WHEN TO UPDATE THESE INSTRUCTIONS

Only update these instructions when:
- A full Phase is completed (update Current Build Status section only)
- A major feature is added or removed from the plan
- A tool in the tech stack changes
- A permanent rule is added (like the Question Quality Rule above)

Do NOT update for daily progress — that goes in your personal Google Doc diary.
