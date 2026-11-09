---
name: proposal-writer
description: Turn discovery-call notes into a clear client proposal with scope, definition of done, timeline, price options and a V2 list. Use when I say "write the proposal", "/proposal-writer", or share call notes.
---

# proposal-writer

## Input
Discovery-call notes (a file in `clients/calls/` or pasted text).

## Steps
1. Read the notes. If something essential is missing (budget range, deadline, who decides, what tools they use), ask me before writing.
2. Pull out their problem **in their own words** (quote them where you can).
3. Do the value maths (below) and show the working.
4. Write the proposal to `clients/proposals/{client-slug}.md` using the structure below.
5. Offer to turn it into a shareable web page (an Artifact) to send as a link.

## Structure
1. **The problem**, in their words
2. **The outcome**: what changes for them, in one paragraph. Outcome first, no tech words.
3. **What we'll build**: 3–6 bullets
4. **Not included**: be explicit. This protects both sides.
5. **Definition of done**: a checklist the client can tick
6. **Timeline**: milestones with dates
7. **What we need from you**: access, sample data, a contact person
8. **Investment**: 2–3 options (e.g. Core / Core + extras / Core + 3 months maintenance)
9. **The maths**: yearly cost of the problem → value of solving it → why the price makes sense
10. **Later / V2**: good ideas that are out of scope for now
11. **Next step**: one clear action

## Value maths
- Cost of the problem per year = hours per week × hourly cost × 52 (+ revenue lost, if any)
- Value of solving it = that cost × % the system handles (+ revenue recovered)
- 10x rule: the client should get roughly 10× what they pay in year 1, so setup ≈ 10% of year-1 value
- Maintenance: a monthly fee for bugs, model updates and a monthly report. Use my real number from `context/offer.md`.

## Rules
- Use my voice from `context/about-me.md`. Plain English.
- Only claim results I've actually delivered. No invented case studies.
- Change scope, never fudge numbers, to hit a budget.
