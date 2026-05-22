# Arise OS — AI Operating System starter kit for Claude Code

A free, MIT-licensed starter kit that turns Claude Code into your personal **AI Operating System (AIOS)**. Built for anyone serious about AI automation — solopreneurs, freelancers, agency owners, content creators, and AI consultants.

The kit personalizes itself to you via an `/onboard` interview, then gives you recurring thinking skills (`/audit`, `/level-up`) and action skills (`/browser-tool`) to keep building leverage week over week.

> **Arise OS** stands for **AriseTransform Operating System** — designed by Shubham Gunjal to help creators and operators build real AI leverage.

---

## The litmus test

> **"While you're not at your desk, your Arise OS observes one real-world event and produces an output that's faster and more accurate than what you'd produce yourself."**

Every design decision in this kit rolls up to that test.

---

## How you'll know it's working

**1. Team-reaches-out:** A teammate messages you. Your AIOS answers better, faster, with exact sources.

**2. Context-switching reduction:** Your first move is to ask the AIOS, not to open six tabs.

**3. Knowledge-leaves-your-head:** You trust the retrieval. The AIOS holds the truth, you hold the questions.

---

## Two frameworks

### The ARISE Method — operator brain (how you think)

| Step | Name | One-liner |
|------|------|-----------|
| **A** | **Awareness** | AI-First Reflex, Task Decomposition, The Why Loop. *To what extent can AI be leveraged here?* |
| **R** | **Roadmap** | Find Constraint → Priority Filter (Cut, Automate, Assign) → Map Process → Pick Autonomy Level → Tie to KPI. |
| **I** | **Implement** | Building Block Approach, Validation Chain, Assembly Line. *Simplicity scales. Workflows beat agents.* |
| **S** | **Sustain** | Trust Ramp, New Hire Protocol, Kill Switch. *Roll out in phases. Monitor. Iterate.* |
| **E** | **Evolve** | Weekly rituals, score tracking, compounding gains. *One shipped artifact per week.* |

Full breakdown in `references/arise-method.md`. The `/level-up` skill walks you through all five steps weekly.

> *The ARISE Method™ is a trademark of Shubham Gunjal. © 2026 Shubham Gunjal.*

### The Four Pillars — architecture (what you build)

| # | Pillar | One-liner | Test |
|---|--------|-----------|------|
| 1 | **Foundation** | Knows your business | Fresh session answers "what does this business do?" without browsing |
| 2 | **Integration** | Reaches your stuff | "What's on my calendar tomorrow?" → live data, no paste |
| 3 | **Automation** | Knows how to do the work | A short phrase triggers a multi-step workflow |
| 4 | **Orchestration** | Runs without being asked | Laptop closed. A brief lands in inbox. |

> *The Four Pillars of an AIOS™ is a trademark of Shubham Gunjal. © 2026 Shubham Gunjal.*

---

## What ships — 4 skills

| Skill | Type | When to run |
|-------|------|-------------|
| `/onboard` | Setup wizard | Day 1. 7-question interview. Generates Day-1 file set. |
| `/audit` | Thinking skill | Day 7, then weekly. Four Pillars gap report. |
| `/level-up` | Thinking skill | Day 14, then weekly. ARISE Method interview. One run = one artifact. |
| `/browser-tool` | Action skill | Any time. Autonomous browser agent for research, navigation, and action. |

---

## Quick start

1. **Clone the repo** to a working folder.
2. **Open in Claude Code** and run `/onboard`. Answer 7 questions. ~15 minutes.
3. **Use it for a week.** Bring real questions. Log decisions to `decisions/log.md`.
4. **Day 7:** run `/audit`. Read the Four Pillars gap report.
5. **Day 14:** run `/level-up`. Ship one automation.
6. **Week 3+:** weekly `/level-up` ritual. Use `/browser-tool` for autonomous browser tasks.

---

## Repo layout

```
Arise-OS/
├── README.md
├── CLAUDE.md                        ← Operating manual (filled by /onboard)
├── EXPANSIONS.md                    ← What to add as you grow
├── LICENSE
├── .gitignore
├── arise-intake.md                  ← Source-of-truth for /onboard
├── connections.md                   ← Registry of connected systems
├── context/                         ← About you, your business
├── references/
│   └── arise-method.md              ← The ARISE Method framework
├── decisions/
│   └── log.md                       ← Append-only decision record
├── archives/                        ← Old stuff lives here
└── .claude/
    └── skills/
        ├── onboard/SKILL.md
        ├── audit/SKILL.md
        ├── level-up/SKILL.md
        └── browser-tool/SKILL.md    ← Autonomous browser agent
```

---

## License + attribution

MIT License. © 2026 Shubham Gunjal.

The ARISE Method™ and The Four Pillars of an AIOS™ are trademarks of Shubham Gunjal.
