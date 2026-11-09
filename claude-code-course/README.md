# Claude Code Full Course (2027): Resource Pack

Everything from the 3-hour course, organized by module. All of it is free.

**New here? Start with these two:**

1. **[Starter kit](starter-kit/):** CLAUDE.md template, every prompt from the course in order ([prompts.md](starter-kit/prompts.md)), skills, subagents, safety settings and checklists.
2. **[AI Operating System template](../):** the repo this folder lives in. Clone it, open it in Claude Code, and run `/onboard` (Module 10).

**Skills from the video** (copy a folder into `.claude/skills/` in your project, or into `~/.claude/skills/` to use it everywhere):

| Skill | What it does | Module |
|---|---|---|
| [`/session-handoff`](skills/session-handoff/) | Writes a full summary of your session so you can start a fresh chat without losing anything | 3 |
| [`/test-html`](skills/test-html/) | Topic + notes → one polished HTML page | 6 |
| [`/dark-deck`](skills/dark-deck/) | Topic → dark-blue HTML slide deck you can present | 6 |
| [`/roast`](skills/roast/) | 5 subagents attack your idea in parallel, then a judge gives GO / RESHAPE / KILL | 8 |

> Read a skill before you install it. It runs on your computer.

---

## Module 0: Your agency in a box
The roadmap for the whole course. No resources needed yet.

## Module 1: Setup + first build
- [Claude plans and pricing](https://claude.com/pricing). Claude Code needs Pro or higher. Start on Pro, upgrade only when you hit limits every day.
- [Google Antigravity (download)](https://antigravity.google/download). The free editor used in the course. Already use VS Code? It works the same way.
- [Claude Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code). In Antigravity: Extensions → search "Claude Code" → publisher Anthropic.
- [Claude Code docs](https://code.claude.com/docs)
- Prompt: "First build" in [prompts.md](starter-kit/prompts.md)

## Module 2: Your agency website, live
- Inspiration: [godly.website](https://godly.website) (now redirects to recent.design) · [Dribbble](https://dribbble.com) · [Pinterest](https://www.pinterest.com) · [Awwwards](https://www.awwwards.com)
- Example of a finished agency site: [arisetransform.in](https://arisetransform.in)
- [Wispr Flow](https://wisprflow.ai): voice-to-text, so you talk to Claude instead of typing (not sponsored)
- [Cal.com](https://cal.com): free booking page, embedded on the website
- [Claude in Chrome](https://claude.com/chrome): lets Claude open your site, take screenshots and fix what looks off ([Chrome Web Store](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn))
- [GitHub](https://github.com) + [GitHub CLI](https://cli.github.com): where your code lives
- [Vercel](https://vercel.com): puts the site live on a real URL. Alternative: [Netlify](https://www.netlify.com). Vercel's free plan is for non-commercial use.
- Starter kit: [brand.example.md](starter-kit/brand/brand.example.md) · [website rules](starter-kit/rules/website.md)

## Module 3: Give Claude a brain (CLAUDE.md, context, limits)
- [CLAUDE.md template](starter-kit/CLAUDE.md). Keep it under 150 lines, put the most important rules at the top, and add a rule every time Claude repeats a mistake.
- [`/session-handoff` skill](skills/session-handoff/). Hand off when the context window is about half full.
- Context and cache meter plugin shown on screen: **Cache Keeper** from [claude-code-mods](https://github.com/nateherkai/claude-code-mods) by Nate Herk (MIT license)
- Docs: [memory and CLAUDE.md](https://code.claude.com/docs/en/memory)

## Module 4: Safety, the right way
- Keys go in a `.env` file. Never paste them into the chat.
- [settings.json with deny rules](starter-kit/.claude/settings.json): blocks `rm -rf`, force-push and reading `.env`
- [Supabase secrets](https://supabase.com/docs/guides/functions/secrets): where to keep keys for client projects
- Prompts: ".env setup", "Deny rules" in [prompts.md](starter-kit/prompts.md)

## Module 5: Lead Finder app
- [Apify](https://apify.com) (includes $5 in free credit, not sponsored) · [Google Maps scraper](https://apify.com/compass/crawler-google-places) · [Where to find your API token](https://console.apify.com/settings/integrations)
- [Supabase](https://supabase.com) (database) · [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Lead scoring cheat sheet](starter-kit/templates/lead-scoring.md)
- Rule from the video: test with 10 leads first, then 100, then scale.

## Module 6: Skills that sell
- [`/test-html`](skills/test-html/) and [`/dark-deck`](skills/dark-deck/): the two skills built in the video
- Bonus selling skills: [outreach-writer](starter-kit/.claude/skills/outreach-writer/) (drafts only, never sends) · [proposal-writer](starter-kit/.claude/skills/proposal-writer/) · [demo call notes](starter-kit/clients/calls/dr-smith-clinic.md)
- Docs: [skills](https://code.claude.com/docs/en/skills)

## Module 7: Connections (CLI vs API vs MCP + Claude in Chrome)
- CLI: [GitHub CLI](https://cli.github.com). Ask Claude to install it, then run `gh auth login`.
- API keys: [OpenAI API keys](https://platform.openai.com/api-keys) · [GitHub tokens](https://github.com/settings/tokens) · [Apify token](https://console.apify.com/settings/integrations)
- Example tool you can connect: [ManyReach](https://www.manyreach.com) (cold email)
- MCP: [docs](https://code.claude.com/docs/en/mcp). Recommended order: CLI, then API, then Claude in Chrome. Use MCP only when nothing else works, because it uses up a lot of context.
- [Claude in Chrome](https://claude.com/chrome) · [docs](https://code.claude.com/docs/en/chrome)

## Module 8: Subagents and teams
- [`/roast` skill](skills/roast/): 5-persona council run in parallel
- Starter kit subagents: [lead-researcher](starter-kit/.claude/agents/lead-researcher.md) (cheap Haiku researcher) · [outreach-reviewer](starter-kit/.claude/agents/outreach-reviewer.md)
- Docs: [subagents](https://code.claude.com/docs/en/sub-agents)

## Module 9: It works without you (hooks, /loop, routines)
- Hook "done" sound: in [settings.json](starter-kit/.claude/settings.json) (Windows). On Mac or Linux, ask Claude to change it for your OS.
- Prompts: "Hook: done sound", "/loop watcher", "Weekly lead refresh" in [prompts.md](starter-kit/prompts.md)
- Docs: [hooks](https://code.claude.com/docs/en/hooks) · [scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks)
- Rule from the video: let automations write drafts only. Run each one yourself at least 3 times before you trust it.

## Module 10: Build an AI Operating System
- [AIOS template](../): clone it → open the folder in Claude Code → `/onboard` → answer the 7 questions
- Tools mentioned for connecting: [Cal.com](https://cal.com) · [OpenAI API](https://platform.openai.com/api-keys) · [Fireflies.ai](https://fireflies.ai) (meeting notes) · [Notion](https://www.notion.com) · [Google Docs](https://docs.google.com)

## Module 11: Getting paid
- Where clients come from: warm network first ([trust map template](starter-kit/templates/trust-map.csv)), then [Fiverr](https://www.fiverr.com) / [Upwork](https://www.upwork.com), cold email, and posting content consistently.
- Network maths: 100 people you know × 100 people each of them knows = 10,000 people you can reach.
- **Pricing maths (dental clinic example):**
  - 6 hrs/week of manual work × $25/hr × 52 weeks ≈ **$7,800/year** lost
  - Your system handles most of it ≈ **$5,000/year** saved
  - +2 appointments/month × $300 × 12 ≈ **$7,200/year** gained
  - Total value ≈ **$12,000/year** → charge about **10%**, roughly **$1,200** for setup, plus a monthly maintenance fee
- If they ask for a discount, cut the scope, not the price. Write a **definition of done** before you start, or the revisions never end.
- [proposal-writer skill](starter-kit/.claude/skills/proposal-writer/)

## Module 12: Deliver, then get paid again
- Client owns every account: their GitHub, their hosting, their API keys and billing. You get invited.
- [Delivery checklist](starter-kit/checklists/delivery-checklist.md) · [60-day plan](starter-kit/checklists/60-day-plan.md)
- **The 60-day plan from the video:**
  - Week 1: build your own system (your proof)
  - Week 2: pick a niche, map how you'll find clients, set up your website and calendar
  - Week 3: gigs on Fiverr/Upwork + 10–20 messages a day (don't stop)
  - Week 4: make the offer, book discovery calls
  - Weeks 5–7: deliver, track results, case study, testimonial
  - Week 8: retainer (maintenance + one new automation a month) and a V2 upsell

---

**Want it built for you?** Your own AI Operating System, or your SaaS idea as an MVP in 14 days. Book a free discovery call: [arisetransform.in](https://arisetransform.in)

Made by Shubham Gunjal · AriseTransform. Skills and starter kit are MIT licensed like the rest of this repo. Cache Keeper is Nate Herk's project; its link points to his repo.
