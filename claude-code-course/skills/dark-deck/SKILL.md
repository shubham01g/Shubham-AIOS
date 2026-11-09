---
name: dark-deck
description: Build a presentable HTML slide deck in a saturated dark-blue neon style. It opens on a "course board" of numbered chapter cards (done / up next / locked) and moves into 16:9 slides with a big headline plus handwritten gradient accent, an "In simple words" box, a dotted glass panel, flow diagrams, bar meters, quiz reveals, copyable "Try" prompts, terminals, before/after, stat count-ups, timelines, big quotes and checklists. Keyboard driven (→ ← Esc N F H), click-to-reveal fragments, speaker notes. Use when the user says "/dark-deck", "make an HTML presentation/deck/slides about X", "turn this module/lesson into slides", or wants slides to present from a browser.
argument-hint: "[topic or module] + [key points, prompts, numbers, chapter list]"
---

## What this does

Produces **one self-contained `index.html`** presentation. The look and the engine are locked in `assets/template.html` (which is also a complete working example deck). Your job is the **slide plan and copy**, then filling the template's components.

Never invent a new design and never switch to a light theme. Always start from the template.

## Step 1: Read the brief

From `$ARGUMENTS` and anything pasted or attached, pull out:

- **Topic / module**: headline of the first slide, and the chapter that is "up next" on the board.
- **Series info**: brand line, chapter list (number, title, minutes, emoji, one-line blurb), which are done, the current one, total count, countdown date. If the user gives no series, make a board with just the chapters of this deck (all `done` except the current one = `next`), or 3–6 chapters for the deck's sections.
- **Key ideas**: each becomes one slide (5–9 slides is the sweet spot).
- **Hard material**: prompts, commands, numbers, steps, comparisons, quotes. These decide the visuals.

If only a topic is given, write the content yourself. Ask only if the topic itself is missing. Don't ask about style.

## Step 2: Plan the slides

Outline for yourself first:

```
Board: brand · countdown · chapters[] (status) · finale card
S1  eyebrow · headline (plain + accent) · simple-words line · visuals · Try prompt?
S2  ...
Last: recap checklist + up-next card
```

Pick visuals per slide from this menu (all markup in `references/components.md`):

| Content | Component |
|---|---|
| Process, "how X becomes Y" | `.flow` of `.box.step` cards with `.arrow` |
| How much / cost / priority | `.meter` bar rows (`data-w` = %) |
| Question to the room | `.quiz` + answer `.ans.frag.peek` (reveals on →) |
| Something to copy and run | `.try` bar with COPY button (one per slide max, at the bottom) |
| 2–6 parallel items | `.cards` (2 cols) or `.cards.three` with emoji + `.tag` |
| CLI output, folder tree | `.term` window |
| Old vs new, mistakes vs fixes | `.compare` with `.vs` |
| Headline numbers | `.stats` with `data-count` / `data-suffix` |
| Ordered steps | `.steps` timeline (each `.st.frag` reveals one per →) |
| The one big rule | `.bigq` big quote + `.take.frag` |
| Recap | `.check` list + `.nextcard` |

Rules for a deck that looks great:
- Each slide fills the panel: **one or two visuals plus an optional Try bar**. The panel is fixed at 640px tall; never let content overflow. Use `.row` / `.col` / `.grow` to split space.
- **Variety**: no primary visual on two slides in a row; use at least 5 different components in the deck.
- **Colour rotation**: put a different `c-*` class on each `<section>` (it colours the badge) and vary the boxes inside: `c-blue c-cyan c-violet c-pink c-lime c-amber c-orange c-green c-red`. Rotate the headline accent gradient: `.em` (cyan→violet), `.em.warm`, `.em.mint`, `.em.neon`.
- **Emoji are the illustrations.** No icon libraries, no stock images.
- Use **fragments** (`.frag`, or `.frag.peek` for a visible dashed placeholder) for reveals the presenter should control: quiz answers, "so what" cards, timeline steps, takeaways.
- Every user-supplied prompt goes into a `.try` bar **verbatim**. Fill-in parts use `<span class="ph">[like this]</span>`.
- Add an `<aside>` per slide with 1–2 lines of speaker notes (shown with **N**).

## Step 3: Write the copy

- **Headline**: 2–6 words, plain bold + accent phrase: `Do it once, <span class="em">then make it a skill</span>`. Keep the whole headline under ~30 characters so it stays on one line next to the badge.
- **Eyebrow**: `• Module 06 • Short label •`.
- **In simple words**: one or two plain sentences, under 25 words.
- **Box text**: bold label + a line under 15 words. Simple words, no hype.
- Only state facts you're confident about or that came from the user. Mark illustrative numbers as such in the speaker notes.

## Step 4: Build

1. Read `~/.claude/skills/dark-deck/assets/template.html`.
2. Copy `<head>`, the whole `<style>`, the `.sky` div, the board `<section>`, the `<footer>`, notes/toast divs and the whole `<script>` **unchanged**, except:
   - `<title>` (2–4 word name) and meta description.
   - The `DECK` config object at the top of the script (brand, unit word, current/total, countdown or `null`, finale or `null`, chapters).
3. Replace every `<section class="view slide ...">` with your slides. Each needs `data-chapter="N"` matching a chapter `n` in `DECK.chapters`; clicking that board card jumps to the chapter's first slide. Slides of several chapters can live in one deck.
4. Single file. Only Google Fonts load externally. No frameworks.
5. Save to the path the user gives, otherwise `./<topic-slug>-deck/index.html` in the working directory.

## Step 5: Check

- Grep the output for leftover example content (`outreach-writer`, `Skills that sell`, `Joe's Dental`, `Proposals that close`) unless the topic really is that.
- Every slide has `.sh` header + `.panel`, a `data-chapter`, and an `<aside>`.
- Preview it: serve the folder (`npx serve` or `py -m http.server`) and use the `browser-check` skill or Chrome tools to screenshot each slide (`#s1`, `#s2`…). Fix any overflow or empty-looking panel by resizing text or adding a second visual. If no browser is available, open it with `start "" "<path>\index.html"`.

## Step 6: Report

In 3–5 lines: the file path as a clickable link, the slide list with the main visual of each, the keyboard controls (→/Space next, ← back, Esc board, N notes, F fullscreen, H hide chrome), and anything you invented so the user can correct it.
