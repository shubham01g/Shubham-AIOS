---
name: level-up
description: Use weekly to find and ship one new automation. Walks the ARISE Method interview — Awareness (find the candidate) → Roadmap (scope one) → Implement (build it). Trigger on "let's level up", "what should I automate next", "find me leverage this week", or as a Friday ritual. One run = one shipped artifact.
---

> *The ARISE Method™. © 2026 Shubham Gunjal. All rights reserved.*
> *The ARISE Method™ is a trademark of Shubham Gunjal.*

## What this skill does

Walks the user through the ARISE Method each week to surface and ship one new automation. **One interview = one artifact.** It also installs the ARISE Method framework into the user's head over time — after 4-6 runs, the user starts spotting opportunities mid-week without prompting because the questions have become internal defaults.

This is the brain-rewire mechanism. The kit doesn't need cron jobs to anchor behavior; it needs `/level-up` running every Friday.

## What `/level-up` is NOT

- Not `/audit`. `/audit` is structural ("is the AIOS built right?"). `/level-up` is functional ("what business leverage am I missing?"). Run `/audit` first if structure is messy.
- Not a multi-candidate planner. One run = one shipped artifact.
- Not a coach. The user does the thinking. The skill conducts the interview.

## When `/level-up` runs

- **First run: Day 14.** After the user has connected ≥1 MCP/script and run `/audit` once.
- **Cadence: weekly, Friday afternoon.** Review the week, surface one automation, ship Monday.
- **On-demand any time.** Mid-week if a manual task itches.

## Inputs the skill reads

- `context/priorities.md` — what the user said matters
- `context/about-me.md` — top_pain, role
- `connections.md` — what's reachable, by what mechanism
- `references/arise-method.md` — the framework (used to quote principles back)
- `decisions/log.md` — recent decisions (what's already shipped or considered)
- `.claude/skills/*/SKILL.md` frontmatter — what capabilities exist
- Recent `audits/audit-{date}.md` if present

## Execution — three phases

### Phase 1 — Awareness interview (find the candidate)

Surface 1-3 candidates ranked by leverage. Ask these in order, conversationally:

1. *"Walk me through your week. What did you do 3+ times?"* (frequency)
2. *"Anything that felt manual, boring, or copy-paste?"* (drudgery)
3. *"Anything where you thought 'a smart intern could handle this'?"* (delegation)
4. *"If 500 new clients showed up tomorrow, what would break first?"* (constraint)
5. *"What would give you 500 more clients tomorrow?"* (growth lever)

Quote relevant Awareness principles when they fit:
- *"Sounds like the AI-First Reflex applies — to what extent could AI be leveraged here?"*
- *"This is Task Decomposition — you're not automating the whole job, just this one piece."*
- *"AI is better than you think and improving faster than you think. If it couldn't do this last quarter, it might be ready now."*

**Output of Phase 1:** numbered list of 1-3 candidate opportunities, one-line "why this is leverage" per candidate. Ask: *"Pick one to scope."*

### Phase 2 — Roadmap interview (scope one)

User picks one candidate. Walk the 5-step Roadmap pipeline:

**Step 1 — Find the constraint.** Which bottleneck does this solve, or which growth lever does it open?

**Step 2 — Priority Filter: Cut, Automate, Assign.**
- **Cut first:** *"What happens if we just stop doing this?"* If the answer is "nothing breaks" → skill exits cheerfully. *"Don't automate waste."* Log to `decisions/log.md` and stop.
- **Automate second:** apply 60/30/10 framing. ~60% deterministic, ~30% AI-assisted, ~10% manual.
- **Assign third:** if too complex/variable → suggest a person. Skill exits with a delegation suggestion.

**Step 3 — Map the process.** Five elements:
- Trigger, Data sources, Data transformations, Decision points, Destination

If the user can't articulate any of the five: *"If you can't explain it to a person, you can't explain it to an AI. Sketch it on paper first, then come back."*

**Step 4 — Pick the autonomy level.**

| Level | Name | What happens |
|---|---|---|
| L0 | Manual | No AI |
| L1 | Suggested | AI suggests, human decides every step |
| L2 | Drafted | AI drafts, human reviews and edits |
| L3 | Supervised | AI runs, human validates periodically |
| L4 | Autonomous | AI handles end-to-end |

**Default = lowest level that solves the problem.** *"Workflows beat agents. If a decision doesn't HAVE to be made by AI, don't let AI make it."*

**Step 5 — Tie to a KPI.** Which of the Three Buckets does this move?
- More customers
- More value per customer
- Less cost

**If the user can't name a bucket and a metric, skill stops.**

**Output of Phase 2:** scoped automation spec written to `decisions/log.md`.

### Phase 3 — Implement handoff (build it)

Ask: *"How do you want to ship this?"* Options ordered by Simplicity-Scales default:

1. **Prompt-only** — saved prompt template. Zero infrastructure.
2. **Deterministic skill** — SKILL.md that runs a script (no AI step).
3. **AI-assisted skill** — SKILL.md with one AI call inside.
4. **Browser-automated skill** — Uses `/browser-tool` for web-based workflows.
5. **Sub-agent** — multi-step agent. Last resort.

**Default selected = highest non-AI option that solves the problem.**

Every scaffolded artifact ships with these headers:

```markdown
---
trust-ramp-phase: 1  # Phase 1 — Training wheels. Run manually first.
arise-method-attribution: |
  The ARISE Method™ © 2026 Shubham Gunjal.
---
```

Surface the Implement principles when scaffolding:
- **Building Block Approach** — smallest steps, zero-AI first if possible
- **Validation Chain** — test each step before chaining
- **Iteration Mindset** — ship the POC, expand from real usage

## Output contract

Every `/level-up` run produces:

1. **One `decisions/log.md` entry** — dated, with the Roadmap spec
2. **One scaffolded artifact** — prompt, skill, or agent file
3. **A one-screen close** — what was scoped, what was built, and the Trust Ramp Phase 1 reminder

## Critical implementation rules

1. **One interview = one artifact.** No multi-candidate parallel scoping.
2. **Awareness phase always runs first.** Even if user comes in with a pre-formed idea.
3. **Priority Filter enforces "cut first."** If the answer is Cut, exit cheerfully.
4. **Default to the lowest autonomy level that works.**
5. **Simplicity-Scales default in Implement handoff.**
6. **Tie-to-KPI is mandatory.**
7. **Trust Ramp ships into every artifact.** `trust-ramp-phase: 1` in frontmatter.
8. **Read-only on user files except `decisions/log.md` and the new artifact.**
9. **Attribution on output.** Every report references the ARISE Method.

## Verification (for the implementer)

- **Dry run** with no prompt. Expected: skill surfaces 2-3 candidates from context. Generic output = fail.
- **Cut-first test.** Feed an obviously cut-able candidate. Expected: suggests Cut, exits, logs the win.
- **L4 push-back test.** User asks for autonomous email-replier on first build. Expected: insists on L1/L2 first.
- **Simplicity-Scales test.** Candidate solvable with deterministic Python. Expected: recommends deterministic skill.
- **Trust Ramp anti-skip.** User tries to advance to Phase 4 immediately. Expected: refuses without validation.

---

> *The ARISE Method™ is a trademark of Shubham Gunjal. © 2026 Shubham Gunjal. All rights reserved.*
