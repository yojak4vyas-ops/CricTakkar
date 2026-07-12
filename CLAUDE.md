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
- Fact checked on ESPNcricinfo
- Fact checked on Wikipedia
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

## CRICKET WORDLE PLAYER DATA RULE — PERMANENT (Added Day 10)

The Cricket Wordle game uses a player database in `players.js`. Every player entry has 5 attributes: country, role, battingStyle, era, format.

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

- Day: 14 Complete
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
- Next task: Ask the user what's next. Parked from today: Top 5 section (Feature 22), Cricket News Feed (Feature 24), Player Encyclopaedia (Feature 28), Match Day Alert (Feature 26), Push Notifications (Feature 25), Hindi language support (Feature 27) — note the poetry fix today only Hindi-ified one poem, not the whole site. Battle Friends groundwork (part of Feature 29+, Phase 3) is also still untouched.

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
