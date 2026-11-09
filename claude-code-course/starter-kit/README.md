# Claude Code 2027 Starter Kit

Everything from the "Claude Code Full Course (2027)" by Shubham Gunjal (AriseTransform).

## How to use it
1. Create a folder (e.g. `agency-in-a-box`) and open it in Antigravity or VS Code with the Claude Code extension.
2. Copy everything from this kit into it, keeping the folders (including the hidden `.claude/` folder).
3. Open `CLAUDE.md` and replace every `[bracket]` with your own details.
4. Follow along with the course. `prompts.md` has every prompt in order.

## What's inside
| File | What it does |
|---|---|
| `CLAUDE.md` | Router template. The first thing Claude reads every session |
| `rules/website.md` | Design rules, honesty rules, screenshot verify loop, "push" rule. Move to `.claude/rules/` |
| `.claude/settings.json` | Deny rules (no rm -rf, no force push, no reading .env) + a Windows "done" sound |
| `.claude/skills/outreach-writer/` | Personalised cold email drafts. Never sends |
| `.claude/skills/proposal-writer/` | Call notes → proposal with scope, done-definition, price maths, V2 |
| `.claude/skills/handoff/` | Hand a heavy session to a fresh one without losing anything |
| `.claude/skills/interview-me/` | Claude asks you questions until it's 95% sure |
| `.claude/agents/lead-researcher.md` | Cheap (Haiku) researcher. Run 10 in parallel |
| `.claude/agents/outreach-reviewer.md` | Fresh-eyes review of drafts before you send |
| `brand/brand.example.md` | Example brand file for your website |
| `clients/calls/dr-smith-clinic.md` | Demo discovery-call notes (fictional) to test proposal-writer |
| `templates/lead-scoring.md` | Signals that a business needs what you sell |
| `templates/trust-map.csv` | Warm-first list of 20 people |
| `checklists/delivery-checklist.md` | Sign → build → QA → handover → get paid again |
| `checklists/60-day-plan.md` | Week-by-week plan to your first client before 2027 |
| `prompts.md` | Every prompt from the course, in order |

## Notes
- **Mac / Linux:** the sound hook in `settings.json` is for Windows. Ask Claude: "change the Stop hook to play a sound on my OS".
- **Keys:** never paste API keys into the chat. Put them in `.env` yourself.
- **Honesty:** the skills only claim results you've delivered. Keep it that way. It's your reputation.

Want it built for you instead (your own AI Operating System, or your SaaS idea as an MVP in 14 days)? AriseTransform: https://arisetransform.in
