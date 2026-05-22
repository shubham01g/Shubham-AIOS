---
name: audit
description: Use when someone asks for an AIOS audit, asks to score their setup against the Four Pillars, or says "is my AIOS working" / "audit my setup" / "find gaps in my AIOS". Produces a Four Pillars scoreboard with top-3 fixes ranked by leverage.
---

## What this skill does

Runs the **Four Pillars Audit** on the current Claude Code project. Reads (never writes) the project's operating manual, memory, skills, agents, MCPs, decisions, and references. Scores each of the Four Pillars out of 25. Surfaces strengths and the top 3 leverage-weighted gaps with concrete next-step commands.

**Scope is structural — "is the AIOS built right?"** It is NOT a capability planner. Capability gaps belong to `/level-up`. The audit answers: are the files, folders, registries, and connections in good shape?

First run is the baseline. Re-run weekly to watch the score climb.

## Today's context

- **Date:** !`date +%Y-%m-%d`
- **Project root:** the current working directory

## The Four Pillars (scored 25 each = 100 total)

| Pillar | Test |
|--------|------|
| **Foundation** | Knows the business — identity, team, voice, decisions, references |
| **Integration** | Reaches the user's stuff — MCPs, integrations, data sources |
| **Automation** | Knows how to do work — skills + agents |
| **Orchestration** | Runs without being asked — schedules, hooks, recurring rituals |

## Execution

### Step 1: Discover the project shape

The audit looks for **patterns and intent**, not exact paths. File names vary. Use Glob and Read to check:

**Operating manual:** `CLAUDE.md` (root), `CLAUDE.local.md` (gitignored).
**Memory:** `MEMORY.md` (root), `~/.claude/projects/<id>/memory/MEMORY.md`, or `memory/` folder.
**Skills:** `.claude/skills/*/SKILL.md` — count + frontmatter.
**Agents:** `.claude/agents/*.md` — count + frontmatter.
**Connection mechanisms** (any of these = "reachable"):
- MCPs: `.mcp.json`, `.claude/settings.json` (mcpServers key), `.claude/settings.local.json`
- API scripts: `scripts/*.py|.js|.ts` documented in CLAUDE.md
- Export pipelines: `data/`, `imports/`, `exports/` with refresh script + last-run timestamp
- API keys + reference guide: `.env` entries + corresponding `references/{tool}-api.md`
- Browser automation: `/browser-tool` skill configured for specific sites

**Connections registry:** `connections.md` (anywhere).
**Reference guides:** `references/{tool}-api.md`, `references/*-reference.md`, or equivalent.
**Decisions:** `decisions/log.md`, `decisions.md`, or any append-only decisions file.
**References / SOPs:** `references/`, `docs/`, `sops/` folders.
**Templates:** `templates/`, `.claude/templates/`.
**Hooks / scheduled jobs:** `.claude/settings.json` hooks key, or skill names matching `morning-*`, `weekly-*`, `daily-*`, `monthly-*`, `standup`.

Don't penalize for non-canonical names if equivalent intent is captured elsewhere.

### Step 2: Score each Pillar (25 points each)

#### Foundation (25 pts)

| Criterion | Points | How to detect |
|---|---|---|
| Operating manual exists and is substantive (>200 words) | 5 | Read CLAUDE.md, count words |
| Identity / role / voice captured | 5 | CLAUDE.md mentions who the user is + role/mission, OR `.claude/rules/*.md` exists |
| Persistent memory exists with multiple entries | 5 | MEMORY.md exists with >3 entries, OR `memory/` has >3 files |
| Reference docs exist | 5 | `references/`, `docs/`, or `sops/` has ≥1 file |
| Decisions captured | 5 | `decisions/log.md` or equivalent has ≥1 entry |

#### Integration (25 pts) — domain-aware, mechanism-agnostic

A "reachable" connection counts via ANY mechanism: MCP, script, export pipeline, `.env` key + `references/{tool}-api.md`, or browser automation via `/browser-tool`. The kit is API-first; the audit doesn't prefer MCPs.

**The 7 Tier-1 Universal Data Domains:**

| # | Domain | Examples |
|---|---|---|
| 1 | Revenue / Financials | Stripe, Skool, GoHighLevel, QuickBooks, Looker |
| 2 | Customer interactions | HubSpot, Salesforce, Gmail-as-CRM, Skool DMs |
| 3 | Calendar | Google Cal, Outlook, Calendly |
| 4 | Communication | Gmail, Outlook, Slack, Teams |
| 5 | Project / task tracking | ClickUp, Asana, Linear, Notion DB, Jira |
| 6 | Meeting intelligence | Granola, Otter, Fireflies, Gong, Zoom |
| 7 | Knowledge / files | Notion, Drive, Dropbox, Confluence, SharePoint |

**Tier-2 (bonus):** AI service API keys (OpenRouter, Anthropic, OpenAI), decisions/history, content/publishing, browser automation.

| Criterion | Points | How to detect |
|---|---|---|
| Tier-1 domain coverage | 10 | 1.4 pts per tier-1 domain reachable. Round to nearest 0.5. Cap 10. |
| Reference guide presence | 5 | -1 per connected tool with no `references/{tool}-api.md`. Floor 0. |
| Auth / pipeline freshness | 5 | -1 per connection in `needs-auth`/`expired` state. Floor 0. |
| Documentation in `connections.md` | 3 | 0 if missing; 1 sparse; 2 most; 3 covers all reachable. |
| Read-AND-write balance | 2 | At least one connection can WRITE. 0 if all read-only. |

#### Automation (25 pts)

| Criterion | Points | How to detect |
|---|---|---|
| 4+ skills installed | 10 | Count `.claude/skills/*/SKILL.md` |
| 1+ user-built skill | 10 | Skill names not in: `onboard`, `audit`, `level-up`, `browser-tool`, `skill-creator`, `skill-builder`, `decision`, `connect`, `connect-check`, `memory-prune`, `scaffold-skill`, `scaffold-agent`, `draft`, `standup` |
| 1+ agent defined | 5 | Count `.claude/agents/*.md` ≥ 1 |

#### Orchestration (25 pts)

| Criterion | Points | How to detect |
|---|---|---|
| 1+ recurring/scheduled trigger | 10 | `.claude/settings.json` hooks, OR skill name matches `morning-*` / `daily-*` / `weekly-*` / `monthly-*` / `standup` |
| Recent activity / usage signal | 10 | Files modified within 30 days, OR `decisions/log.md` has entry within 30 days |
| Templates folder populated | 5 | `templates/` or `.claude/templates/` has ≥1 file |

### Step 3: Identify top 3 gaps by leverage

For each criterion that lost points: leverage = (points lost) × (impact multiplier).

**Impact multipliers:**
- 0 tier-1 domains reachable: **4x**
- Operating manual missing or thin: **3x**
- ≤2 tier-1 domains reachable: **3x**
- 0 skills: **2x**
- No recurring trigger: **2x**
- All connections read-only: **2x**
- 0 reference guides for connected tools: **1.5x**
- No decisions log: **1.5x**
- All others: **1x**

Sort gaps by leverage descending. Take top 3. For each, write a concrete next step:
- **Need a new skill?** Recommend writing a SKILL.md at `.claude/skills/<name>/SKILL.md`.
- **Need to log a decision?** "Append to `decisions/log.md`."
- **Need to reach a tier-1 domain?** Prefer API+script. Recommend `/browser-tool` to research the API docs first.
- **Connected tool missing a reference guide?** "Run `/browser-tool` to read the API docs and save to `references/{tool}-api.md`."
- **Need a recurring trigger?** "Add a hook to `.claude/settings.json`, or write a skill named `daily-*`."

### Step 4: Output the report

```
# AIOS Audit — {date}
**Score: {total}/100** ({stage})

Stage thresholds:
- 0-39 → Stage 0: Foundation
- 40-69 → Stage 1: Built
- 70-89 → Stage 2: Compounding
- 90-100 → Stage 3: Autonomous

## Scoreboard

Foundation      {bar}  {n}/25  {label}
Integration     {bar}  {n}/25  {label}
Automation      {bar}  {n}/25  {label}
Orchestration   {bar}  {n}/25  {label}

(bar = ## per 5pts; label = "Strong" ≥20, "Solid" 15-19, "Thin" 8-14, "Missing" <8)

## Strengths
- {1-3 short bullets}

## Top 3 Gaps (ranked by leverage)
1. **{gap name}** (-{points} × {multiplier})
   → {concrete next-step}
2. ...
3. ...

## Suggested next: {single most leveraged action}

---
Structural gaps only. To explore CAPABILITY gaps, run /level-up after this audit.
```

### Step 5: Offer to save the report

After printing, ask: "Save this audit to `audits/audit-{date}.md`?" If yes, write it.

## Notes

- **Read-only by default.** Never modify CLAUDE.md, memory, skills, or any project files.
- **Be flexible about file names.** Don't penalize for non-canonical names.
- **Be honest, not generous.** A 95/100 is a flex. Most setups land 40-70.
- **Don't suggest skills that don't exist.** Point at what's actually available.
- **Speed matters.** Report in under 60 seconds wall-clock.

> *Part of Arise OS™. The ARISE Method™ is a trademark of Shubham Gunjal. © 2026 Shubham Gunjal.*
