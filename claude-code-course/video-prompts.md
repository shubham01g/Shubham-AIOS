# Prompts as used in the video

In the video I mostly talked to Claude with voice typing instead of copy-pasting. These are those prompts, tidied up so you can paste them. Replace anything in [brackets].

For the polished step-by-step versions, see [starter-kit/prompts.md](starter-kit/prompts.md).

---

## Module 1: First build

```
I'm a complete beginner. Build me a single web page that says "60 days to 2027"
with a live countdown to January 1st 2027. Make it look premium, dark background,
big numbers. Then open it in my browser.
```

## Module 2: Agency website

Attach 3-4 inspiration screenshots, your logo and (optional) your photo first.

```
Build a landing page / website for my AI agency, where I sell my AI services.

I sell [AI operating systems] for [businesses]. They help them automate [60%] of their
work and bring everything into one place, so they don't juggle different software.
We find where they lose money, automate their repetitive work, and set up AI agents
that work like an employee.

Design: [dark theme]. Use my logo and photo. Take inspiration from the reference images.
At the end, add a Cal.com booking section so a client can book a 15-minute call with me.

Honesty rules: no fake testimonials, no fake client logos.
```

Cal.com: create an event → **Embed** → copy the embed code → paste it to Claude with:

```
Add this Cal.com booking embed to the website. I don't want a separate booking page.
The client should be able to book the call inside our home page.
```

Iterate:

```
I don't like it yet. I want a dark theme with the purple from my references.
Here is an example of the booking section I want: [screenshot]
```

Push and deploy:

```
Push all the code to this GitHub repo: [repo URL]
```

If Vercel shows an error, paste a screenshot of it to Claude and let it fix it.

## Module 3: CLAUDE.md

```
Create a CLAUDE.md file. It is the main brain of this project: a [YouTube operating system]
that automates and manages my whole [YouTube channel] from one place: ideas, research,
shooting, editing, thumbnails and upload. Keep it under 150 lines. If a section gets too
long, move it into a separate file under rules/ and link it.

Rules:
1. Never push or post anything unless I review it first.
2. Every time you make a mistake and I point it out, add a rule so you never make it twice.

Tell me which steps we can automate and which need to stay manual.
```

When the context window is about half full: `/session-handoff` → copy the summary → new session → paste.

## Module 4: Safety

```
Create a .env file with a placeholder for OPENAI_API_KEY, where I can paste the key myself.
Make sure .env is in .gitignore. Never ask me to paste keys into this chat.
```

## Module 5: Lead Finder

```
Create a CLAUDE.md for this project (under 150 lines, move long parts into linked rule files).

This project is a lead scraper agent. It scrapes leads with Apify, removes duplicates,
scores each lead out of 10 (has a website or not, review count, positive reviews, star rating)
so I know which leads are most likely to buy, and stores everything in Supabase.
```

```
Create a .env file with a placeholder for my Apify API key. I will paste it myself.
```

```
I pasted my Apify key in .env. Use the Apify Google Maps scraper and scrape the first
10 leads for testing: [clinics] in [San Francisco] that have no website or a low rating,
with [under 5 doctors].
```

```
Create an automation that runs every time we scrape leads and removes duplicate entries,
so every business appears only once.
```

```
Test it: add 2 duplicate entries to the data (12 total), run the automation, and confirm
it returns 10 unique leads.
```

```
Give me the leads as a CSV file and a JSON file.
```

```
Connect this project to Supabase and save every lead there.
Project URL: [url] · Publishable key: [key] · CLI setup command: [command]
```

(The project URL and publishable key are safe to share. Secret keys go in `.env` only.)

```
Add a rule to CLAUDE.md: never push leads that already have a website or don't fit
our criteria to the database.
```

## Module 6: Skills

Attach 3-5 screenshots of the style you want first.

```
Analyze these screenshots and create a skill called test-html. Whenever I give you a topic
plus some extra information, create a visually attractive HTML site like these, with
different visuals and images.
```

```
/test-html Create an HTML site for my YouTube video where I show I created 100+ AI websites
with one prompt.
```

```
Create a skill for HTML presentations like these screenshots, but use a dark blue theme
with high saturation instead of the light theme. Create the skill first, then an example
presentation I can review. [Optional: use my logo and brand colours on every slide.]
```

```
Open [prototype URL], analyze the whole website (features, dashboards, theme), take
screenshots, and turn it into a skill called prototype-generator. Every prototype has
different needs, so the skill must adapt features, dashboards and theme to each client.
```

```
Using the prototype-generator skill, create a prototype for [a networking app where
founders connect internationally, with categories for AI, content creators, developers;
they can chat, follow and post]. Include the app, an admin dashboard and a pricing section.
```

Letting Claude use your browser (after installing Claude in Chrome):

```
I have connected Claude to Chrome. You can use it to open websites, take screenshots
and check your work.
```

## Module 7: Connections

```
Install the GitHub CLI so you can use it in this project.
```

```
I want to sign out of GitHub and sign in again. Give me the commands.
```

Then run `gh auth logout` and `gh auth login` in the terminal: GitHub.com → HTTPS → log in with a web browser → paste the code.

## Module 8: Subagents

```
/roast Analyze this whole project: the scope, will it work in the market, the competitors.
Analyze everything and come up with a report for me.
```

```
Create 5 different [prototypes / presentations / HTML sites] for [details]. Run 5 subagents
in parallel, one for each.
```

## Module 9: Autopilot

```
Set up a hook so Windows plays a sound every time you finish a task or are waiting for me.
Put it in this project's settings.
```

```
/loop 10m check if my site at [localhost URL or live URL] is up and working.
Tell me only if something is wrong.
```

```
Create a scheduled task that runs every Monday at 7am on this machine: refresh my leads
(50 new), score them, run lead-researcher on the top 10, and write outreach drafts.
Never send anything. Then run it once now so we can test it.
```

Want it to run with your computer off? Add: `Make it a cloud version that runs without me.`

## Module 10: AI Operating System

```
Clone this GitHub repo into this folder: https://github.com/shubham01g/Shubham-AIOS
I want to build my own AI operating system from it.
```

```
/onboard
```

Answer the 7 questions (who you are, writing samples, 90-day priorities, where revenue lands, where you talk to customers, tools, what eats your week). Then:

```
Create a dashboard where I can track everything about our business. This is our AIOS
dashboard. Build it as a real website, not an artifact.
```

## Module 11: Getting paid

```
I have a list of 100 people I know. Each of them knows 100 other people.
Calculate how many people I can reach and show the calculation.
```

The pricing maths is in the [resource index](README.md#module-11-getting-paid).
