---
name: handoff
description: Pack up the current session so a fresh session can continue without losing anything. Use when I say "handoff", "wrap up", "context is getting full", or before /clear.
---

# handoff

Write a handoff note so I can start a new session, paste it in, and keep going.

## Output (in chat, and saved to `handoffs/{YYYY-MM-DD-HHmm}.md`)

**Goal:** what we're trying to get done, in one or two lines.

**Decided:** decisions made this session and why (one line each).

**Done:** what was built or changed, with file paths.

**Not working / open:** bugs, blockers, questions still waiting on me.

**Running:** dev servers, ports, background jobs. Or "nothing".

**How to check it works:** 1–3 commands or steps.

**Next step:** the very first thing the new session should do.

## Rules
- Short. A new session should read it in under a minute.
- File paths, not file contents.
- If a decision belongs in `decisions/log.md`, say so.
