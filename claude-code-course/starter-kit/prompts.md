# Every prompt from the course

Claude Code Full Course (2027) · Shubham Gunjal (AriseTransform)

Replace anything in [brackets] with your own details. Run them in order: each module builds on the last.

## Module 01: Setup + first build in 2 minutes

### First build

```
I'm a complete beginner. Build me a single web page that says "60 days to 2027"
with a live countdown to January 1st 2027. Make it look premium, dark background,
big numbers. Then open it in my browser.
```

### Create CLAUDE.md

```
/init
```

## Module 02: Build #1: your agency website, live

### Agency site (plan mode)

```
I want a one-page website for my AI agency. Put it in a folder called site/.

Who I am: [your name], I build AI systems for [niche] using Claude Code.
What they get: [the outcome, e.g. "never miss a lead again"].
Call to action: book a 15 minute call (use this link: [your calendar link]).

Design: match the style of @brand/inspiration.png and use @brand/logo.png and @brand/brand.md.

Honesty rules: no fake testimonials, no fake client logos, no made-up numbers.
If a section needs proof I don't have yet, write "what we'd build for you" instead.

Before you build anything, ask me questions one at a time until you're 95% sure
what I want.
```

### Screenshot verification loop

```
Now verify your own work. Install Playwright, open the site at desktop width (1440px)
and mobile width (390px), take full-page screenshots, look at them carefully, compare
with @brand/inspiration.png, and fix anything that looks off. Repeat until you're
happy, then show me the final screenshots.
```

### Make the loop a rule

```
Add to CLAUDE.md: after any change to the site, run the screenshot check at desktop
and mobile before telling me it's done. Never push to GitHub unless I say "push".
```

### GitHub repo

```
Create a private GitHub repo for this project and push it. Install and log in to the
GitHub CLI if you need to, and walk me through anything I have to click myself.
```

### Change → push → live

```
Change the headline to "[new headline]". Run the screenshot check, then push.
```

## Module 03: Give Claude a brain: CLAUDE.md, memory, limits

### CLAUDE.md as a router

```
Rewrite CLAUDE.md as a short router, under 150 lines:
1) what this project is (my AI agency in a box),
2) the folder map (site/, brand/, and what's coming),
3) how I like to work (plan first, verify before saying done, never push unless I say),
4) rules. Move anything long into separate files under .claude/rules/ or docs/
and just link to them.
```

### Rule from a mistake

```
Earlier you [describe the mistake]. Add a rule to CLAUDE.md so this never happens again.
Keep it to one line.
```

### Memory

```
Remember that I always want prices in USD and British English spelling.
```

## Module 04: Safety, the right way

### .env setup

```
I'm about to add API keys. Create a .env file with empty placeholders for
APIFY_API_TOKEN, make sure .env is in .gitignore, and tell me where to paste the key.
I will paste it myself, never ask me to paste keys into this chat.
```

### Deny rules

```
Add deny rules to .claude/settings.json so you can never: delete files with rm -rf,
force-push to git, or read the .env file directly. Explain each rule in one line.
```

### Test it

```
What's in my .env file?
```

## Module 05: Build #2: Lead Finder app

### Lead Finder (plan mode)

```
Build me a Lead Finder app in lead-finder/.

1) Use the Apify Google Maps scraper (key is APIFY_API_TOKEN in .env, don't print it)
   to find [dental clinics] in [Austin, Texas].
2) Save every business into a local SQLite database: name, address, phone, website,
   rating, review count, Google Maps link, and the place ID so we never save duplicates.
3) Give each lead an "opportunity score" from 0 to 100 based on signals that they need
   [what I sell]: no website, rating under 4.2, few reviews, etc. Explain the scoring.
4) A simple local dashboard: a table I can sort and filter by score, a status column
   (new / researched / contacted / replied / client), and an "export CSV" button.

Start with a test run of 10 results only so we don't waste credits.
Ask me questions until you're 95% sure, then show me the plan.
```

### Ask for the cost

```
How much will 100 results cost on Apify? Show the maths.
```

### Duplicate test

```
Run the same search again. Did we save any duplicates? If yes, fix it.
```

### Scale to 100

```
Now run it for 100 results and tell me the cost.
```

### Verify the data

```
Verify the data: pick 5 random leads, open their Google Maps pages and websites,
and confirm the info in the database matches. Report anything wrong.
```

### Teach CLAUDE.md

```
Update CLAUDE.md: add lead-finder/ to the folder map with the command to run it,
so next time I can just say "refresh my leads".
```

## Module 06: Skills: outreach + proposals on autopilot

### Do it once by hand

```
Take the top lead from my Lead Finder database. Read their website and Google reviews.
Write a short cold email from me:
- under 90 words, plain text, no links
- open with one specific thing about THEIR business (from their site or reviews)
- one problem I can solve for them, one clear ask (a 15-min call or "want me to send a 2-min video?")
- only claim things I've actually done. If you're not sure, ask me.
- save it as a DRAFT in clients/drafts/, do not send anything.
```

### Turn it into a skill

```
Turn what we just did, including my feedback, into a skill called outreach-writer.
It should take a lead (or "top 10 leads") from the database and write drafts only.
Ask me questions before you write it.
```

### Run it

```
/outreach-writer top 3
```

### Fix the skill, not the output

```
Update outreach-writer so it never [describe the problem] again. Show me the change.
```

### proposal-writer skill

```
Make a skill called proposal-writer. Input: my notes from a discovery call.
Output: a clean proposal with: their problem in their words, the outcome, what's in
scope, what's NOT in scope, a definition of done, timeline, 2-3 price options, and a
"later / V2" list. Use my voice from CLAUDE.md. No claims I can't prove.
Ask me questions first.
```

### Test with demo call notes

```
/proposal-writer using @clients/calls/dr-smith-clinic.md
```

## Module 07: Connections: MCP vs CLI vs API + Claude in Chrome

### Fiverr competitor research (Chrome)

```
Using Chrome, search Fiverr for gigs selling "[AI automation for dental clinics]" or
close to it. Open the top 5. For each one: title, price for each package, what's
included, delivery time, number of reviews. Put it in a table in clients/research/fiverr-gigs.md.
Don't log in or click buy on anything.
```

### Teach CLAUDE.md its toolbox

```
Add a "Connections" section to CLAUDE.md: every tool you can reach in this project,
how (CLI, API, MCP or browser), and where the key lives. One line each.
```

## Module 08: Subagents and agent teams

### Create lead-researcher

```
Create a subagent called lead-researcher. Job: given one lead from the database,
read their website and reviews and return exactly: 3 facts about the business,
their biggest visible problem, and one personalised opening line. Use the cheapest
fast model (Haiku). Read-only tools plus web. It must not edit files.
```

### Run 10 in parallel

```
Use lead-researcher on my top 10 leads, in parallel. Save the results into the
database so outreach-writer can use them.
```

### Connect it to the skill

```
Update outreach-writer to use the lead-researcher results when they exist.
```

### Create outreach-reviewer

```
Create a subagent called outreach-reviewer. It has never seen our chat. It reviews
drafts in clients/drafts/ against these rules: under 90 words, one specific detail,
one ask, no claims I haven't proven, sounds human. It returns pass/fail plus fixes.
```

### Review the drafts

```
Use outreach-reviewer on everything in clients/drafts/ and fix what fails.
```

### Optional: agent team roast

```
Create an agent team of 3: a skeptical clinic owner, a buyer who always wants it
cheaper, and a competing agency. Have them debate my offer in context/offer.md for
2 rounds, then give me the 3 changes that would make it easier to say yes to.
```

## Module 09: Autopilot: hooks, /loop, routines

### Hook: done sound

```
Set up a hook so Windows plays a sound every time you finish a task and are waiting
for me. Put it in this project's settings.
```

### /loop watcher

```
/loop 10m check if my Vercel site is up and the headline matches the latest commit.
Tell me only if something is wrong.
```

### Weekly lead refresh

```
Create a scheduled task that runs every Monday at 7am on this machine:
refresh my leads (50 new), score them, run lead-researcher on the top 10, and write
outreach drafts. Never send anything. Write a one-line summary to logs/weekly.md
(read it first, write it last). The prompt must run start to finish without asking
me questions. Then run it once now so we can test it.
```

## Module 10: Your AI Operating System (the thing you sell)

### Build your AIOS

```
Turn this project into my AI Operating System. Interview me one question at a time:
who I am, what I sell, who I sell to, my goals for the next 60 days, my tools,
and my most repetitive tasks. Then create:
- context/ (about-me, offer, ideal-client, priorities)
- connections.md (every tool and how you reach it)
- decisions/log.md (append-only, with today's first decision)
- an updated CLAUDE.md router that links all of it plus every skill we built today.
Keep CLAUDE.md under 150 lines.
```

### Test: does it know you?

```
What should I do today?
```

## Module 11: Get paid: offer, gig, outreach, proposal, price

### 1 · Offer in one sentence

```
Using context/, write 5 versions of my offer in one sentence: "I help [who] get
[outcome] in [time] without [pain]". Outcome first, no tech words. Then pick the
strongest and tell me why.
```

### 2 · Fiverr gig

```
Using my offer and clients/research/fiverr-gigs.md, write my Fiverr gig: title,
description in my voice, 3 packages (what's included, delivery time, price), FAQ,
and 5 search tags. Price the packages against the competitors in the research,
don't undercut to the bottom. No claims I can't prove.
```

### 3 · Warm first: trust map

```
Help me build a trust map: interview me to list 20 people I know who run a business
or know business owners (family, ex-colleagues, communities, friends of friends).
Save it as clients/trust-map.csv with name, relation, their business, and a possible
pain. Then write a no-pitch message for each one: just asking where work feels manual,
or if they know anyone this could help. Drafts only.
```

### 4 · Cold outreach from Lead Finder

```
/outreach-writer top 10
```

### 5 · Proposal from the call

```
/proposal-writer using @clients/calls/dr-smith-clinic.md
```

### 5b · Proposal as a link

```
Turn this proposal into a clean, shareable web page (an Artifact) I can send the
client as a link. Professional, readable on a phone, my branding.
```

### 6 · Price it with maths

```
Here's what I learned on the call: [notes]. Calculate the yearly value of solving
this for them, show your working, and suggest a price using the 10x rule, plus a
monthly maintenance price. Add the maths as a section in the proposal.
```

## Module 12: Deliver, get paid again + 60 days to 2027

### QA with real data

```
Act as QA for this project. List every way this could go wrong with real data:
bad input, empty data, duplicates, API down, rate limits. Write tests for each,
run them, and give me a pass/fail report I can show the client.
```

### Handover kit

```
Create a handover kit in clients/[name]/handover/: a plain-English README (what it
does, how to run it, what to do if it breaks), a list of accounts and keys the client
owns, and a 3-minute walkthrough script I can record as a video.
```
