# [Your agency name]: AI Agency in a Box

This file is a map, not a book. Keep it under 150 lines. Long details live in the files it links to.

## What this project is
My AI agency, run with Claude Code. I build [what you sell] for [who you sell to] so they get [the outcome].
- Offer and ideal client: `context/offer.md`, `context/ideal-client.md`
- About me and my voice: `context/about-me.md`
- Current priorities (next 60 days): `context/priorities.md`

## Folder map
| Folder | What lives there |
|---|---|
| `site/` | My agency website (deployed from GitHub, root directory = site) |
| `brand/` | Logo, colours, fonts, inspiration screenshots |
| `lead-finder/` | Lead Finder app + SQLite database. Run: `[command Claude gave you]` |
| `clients/` | Drafts, research, call notes, proposals, handover kits |
| `context/` | Who I am, what I sell, who I sell to |
| `decisions/log.md` | Append-only log of decisions and why |
| `.claude/skills/` | outreach-writer, proposal-writer, handoff, interview-me |
| `.claude/agents/` | lead-researcher, outreach-reviewer |

## How I like to work
- Plan first for anything bigger than a small fix. Ask me questions until you're 95% sure.
- Verify before you say "done". For UI: screenshots at desktop (1440px) and mobile (390px).
- Never push to GitHub unless I say "push".
- One task per session. When the context gets heavy, offer a handoff.
- Explain things in plain English. I'm not a developer and that's fine.

## Rules
- Never ask me to paste API keys into the chat. Keys live in `.env`, which I fill in myself.
- Outreach is drafts only. Never send emails or messages.
- Only claim results I've actually delivered. For new niches, write "what we'd build for you".
- No fake testimonials, fake logos or made-up numbers, anywhere.
- Website rules: `.claude/rules/website.md`

## Connections
| Tool | How | Key |
|---|---|---|
| GitHub | `gh` CLI | logged in via browser |
| Apify | direct API | `APIFY_API_TOKEN` in `.env` |
| [add yours] | | |

## Learned rules (add one line each time Claude repeats a mistake)
- 
