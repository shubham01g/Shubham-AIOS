---
name: test-html
description: Turn a topic plus extra notes into a single, visually striking HTML page in the dark "course module" style (big bold headline with an italic serif accent, glowing hero, sticky section nav, cream flow diagrams, copy-paste prompt cards, animated bar meters, quote callouts, emoji card grids, stat tiles, before/after, terminal, timelines). Use when the user says "/test-html", "make an HTML site/page about X", "turn this topic into a page", "build a lesson/explainer page for X", or gives a topic and wants a web page from it.
argument-hint: "[topic] + [extra info: audience, key points, prompts, numbers, images]"
---

## What this does

Takes a **topic** plus whatever **extra info** the user attaches (key points, audience, prompts, numbers, links, images) and produces **one self-contained `index.html`** in a fixed, polished visual system. The look is locked by `assets/template.html`; your job is the **content plan and copy**, then filling the template's components with it.

Never invent a new design. Always start from the template: same tokens, fonts, CSS, and JS.

## Step 1: Read the brief

From `$ARGUMENTS` (and anything the user pasted or attached), pull out:

- **Topic**: becomes the hero headline.
- **Audience and goal**: who reads it, and what they should be able to do after.
- **Key ideas**: 3–6 main points. Each becomes one section.
- **Hard material**: prompts, commands, code, numbers, steps, comparisons, quotes, image files/URLs. These decide the visuals.
- **Meta**: series/module number, duration, brand name, output folder, if given.

If only a topic is given, write the content yourself from what you know. Ask a question only if the topic itself is missing or ambiguous. Don't ask about style.

## Step 2: Plan the page

Write a short outline (for yourself, not the user) before building:

```
Hero:    badge · eyebrow · headline (plain + *accent*) · lede · 3 chips
01  <eyebrow label>  ·  <headline>  ·  primary visual  ·  [prompt cards?]
02  ...
Closing: one-line punch headline + CTA
```

Choose **one primary visual per section** from this menu, matched to the content:

| Content in the section | Visual (template component) |
|---|---|
| A process / pipeline / "how X becomes Y" | **Flow diagram**: cream dotted panel, step cards + → arrows (`.flow-panel`) |
| Something the reader should copy and run (prompt, command, code) | **Prompt card** with Copy button (`.prompt`), under a "▶ Your turn" divider |
| Relative sizes, cost, priority, progress, "how much" | **Bar meter rows** (`.bars`, `data-w` = %) |
| One big insight, rule, or mental model | **Quote callout** (`.quote`) with a → takeaway line |
| 2–4 parallel items (inputs/outputs, features, options, tools) | **Card grid** with emoji + tag chip (`.cards`) |
| Headline numbers / results | **Stat tiles** with count-up (`.stats`, `data-count`, `data-suffix`) |
| Old way vs new way, mistakes vs fixes | **Before/After** (`.compare`) |
| Terminal output, folder tree, CLI session | **Terminal window** (`.term`) |
| Ordered steps / timeline / checklist | **Numbered steps** (`.steps`) |
| An image the user supplied | **Figure** (`.figure`). Never hotlink random web images. |

Rules for a page that looks great:
- **Variety**: use at least **4 different visual types** on the page, and never the same primary visual in two sections in a row. A section may pair a primary visual with a prompt card or quote.
- **Accent rotation**: the italic accent word in each section headline cycles colour: orange (`.em`), then `teal`, `green`, `amber`, `violet`. Tags, bar fills and stat numbers follow the same palette.
- **Emoji are the illustrations.** Use one fitting emoji per step, card, and chip. No icon libraries, no stock images.
- **3–6 sections** plus the closing. Nav links match the sections one-to-one (`01`…`0N`, or `M0…Mn` if the user says it's part of a series).
- Every user-supplied prompt or command goes in a prompt card **verbatim**. Mark things the reader fills in with `<span class="ph">[like this]</span>`.

## Step 3: Write the copy

- **Headlines**: Title Case, 2–6 words, split into plain bold words + an **italic accent phrase**: `By Hand First, <span class="em">Skill Second</span>`. The accent carries the twist. Keep the **hero** headline to about 25 characters in total so it fits on one line. If it wraps, a lone word gets stranded on line two.
- **Eyebrows**: `NN • SHORT LABEL` (2–3 words), e.g. `01 • The method`. In the hero: `Module 06 • 25 min` or `Guide • 10 min read`.
- **Lede/subtitles**: one or two plain sentences. Simple words, no hype, no filler.
- **Card/step text**: a bold label plus a short line under 15 words.
- **Quote**: a question or punchy rule, then `→` and the actionable takeaway.
- **Closing**: a 2–5 word punch headline with an accent, one sentence, one button.
- Only state facts you're confident about, or ones taken from the user's info.

## Step 4: Build

1. Read `assets/template.html` (in this skill's folder: `~/.claude/skills/test-html/assets/template.html`).
2. Copy it **unchanged** from `<head>` through `</style>` and the whole `<script>`. Those are the design system and the behaviour.
3. Replace the `<title>`, meta description, nav brand/links, hero, every `<section>`, the closing, and the footer with your content, using the template's component markup exactly (same class names, same structure). Remove components you don't use. Copy the markup for any you need more of.
4. Keep every animated block wrapped in `.reveal` so it fades in. Bars need `data-w`, and stats need `data-count`.
5. Keep it a **single file**. Only Google Fonts may load externally. No frameworks.
6. Save to the path the user gives. Otherwise use `./<topic-slug>/index.html` in the current working directory.

## Step 5: Check and open

- Search the output for leftover template content (`outreach-writer`, `Module 06`, `Claude Code Full Course`, `proposal`) unless the topic really is that. Fix any matches.
- Check that every nav `href="#sN"` has a matching section `id`, and that every section has a `.sec-head`.
- Open the page: on Windows, `start "" "<path>\index.html"` (macOS `open`, Linux `xdg-open`). If the user wants a visual check or fixes, use the `browser-check` skill to screenshot and refine.

## Step 6: Report

Tell the user in 3–5 lines: the file path (as a clickable link), the section list with the visual each one uses, and anything you invented because the brief didn't cover it, so they can correct it. Offer one next step, such as adjusting a section, adding prompts, or publishing it as an Artifact.
