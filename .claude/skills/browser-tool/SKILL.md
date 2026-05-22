---
name: browser-tool
description: Use when the user needs autonomous browser actions — navigating websites, reading documentation, filling forms, extracting data, researching APIs, or performing any web-based task. Trigger on "browse", "go to this site", "read this documentation", "fill out this form", "research this API", "check this page", or any task requiring web interaction.
---

> *Part of Arise OS™. © 2026 Shubham Gunjal.*

## What this skill does

Autonomous browser agent that acts on behalf of the user inside their browser. It navigates to URLs, reads and extracts content from web pages, interacts with web elements (clicking, typing, scrolling), reads API documentation, fills forms, and performs multi-step web workflows — all without the user needing to touch the browser.

**The power move:** combine `/browser-tool` with other skills. `/level-up` identifies an automation → `/browser-tool` researches the API docs → the AIOS writes the integration script. Full loop, minimal manual work.

## What `/browser-tool` is NOT

- Not a web scraper for bulk data harvesting. It's a focused agent for specific tasks.
- Not a replacement for proper API integrations. If an API exists, use the API. Browser automation is the fallback.
- Not unsupervised by default. Follows the Trust Ramp — Phase 1 (training wheels) on first use.

## When to use `/browser-tool`

| Scenario | Example |
|----------|---------|
| **Research & Documentation** | "Read the Stripe API docs and summarize the webhook endpoints" |
| **Form Filling** | "Fill out this client onboarding form with the data from context/" |
| **Data Extraction** | "Go to this dashboard and pull the key metrics" |
| **Competitive Research** | "Check competitor pricing pages and compare features" |
| **Setup & Configuration** | "Navigate to my Notion workspace and set up the database schema" |
| **Verification** | "Check if our website is loading correctly on this URL" |
| **Content Publishing** | "Go to my CMS and draft a new blog post with this content" |

## Capabilities

### Navigation
- Open any URL in the browser
- Follow links and navigate multi-page flows
- Handle redirects, pop-ups, and cookie banners
- Wait for page loads and dynamic content

### Reading & Extraction
- Read full page content (text, tables, lists)
- Extract specific data points from structured pages
- Parse API documentation (endpoints, parameters, auth methods)
- Screenshot pages for visual reference
- Read and interpret error messages

### Interaction
- Click buttons, links, and interactive elements
- Type into input fields, search boxes, and text areas
- Select dropdown options
- Check/uncheck boxes
- Scroll to find content
- Handle multi-step forms and wizards

### Intelligence
- Summarize long documentation into actionable briefs
- Compare information across multiple pages
- Identify relevant sections in large docs
- Extract structured data from unstructured pages
- Map out site structure and navigation paths

## Execution

### Step 1: Understand the task

Ask the user:
1. **What URL or site?** — where to navigate
2. **What's the goal?** — read, extract, fill, click, or multi-step workflow
3. **What output do you need?** — summary, data file, screenshot, confirmation

If the user gives a vague request like "check this site," clarify: *"What specifically should I look for? Content, pricing, functionality, errors?"*

### Step 2: Plan the browser session

Before touching the browser, output a numbered plan:

```
Browser Session Plan:
1. Navigate to [URL]
2. [Action 1 — e.g., "Read the API authentication section"]
3. [Action 2 — e.g., "Extract endpoint list into a table"]
4. [Action 3 — e.g., "Save summary to references/"]
Expected output: [what the user gets]
```

Ask: *"This is my plan. Proceed?"*

### Step 3: Execute the browser actions

Execute each step sequentially. For each step:
- **Navigate** to the target URL or element
- **Wait** for the page to fully load (including dynamic content)
- **Read** the relevant content
- **Act** on the content (extract, summarize, interact)
- **Verify** the action succeeded before moving to the next step

**Error handling:**
- Page not loading → retry once, then report the error with screenshot
- Element not found → try alternative selectors, then ask user for guidance
- CAPTCHA / login required → stop and ask user to handle manually
- Unexpected content → screenshot + describe what was found vs. expected

### Step 4: Deliver the output

Based on the task type, deliver one of:

| Task Type | Output Format |
|-----------|---------------|
| Documentation research | Markdown summary saved to `references/{tool}-api.md` |
| Data extraction | Structured table or JSON in chat |
| Form filling | Confirmation with screenshot |
| Site verification | Status report with any issues found |
| Multi-step workflow | Step-by-step completion log |

### Step 5: Log and learn

After every session:
1. **Log the action** to `decisions/log.md` if it was a meaningful research or setup task
2. **Save reusable knowledge** — if API docs were read, save to `references/{tool}-api.md`
3. **Suggest automation** — if this is a repeatable task, suggest creating a dedicated skill via `/level-up`

## Trust Ramp Phases (from the ARISE Method)

| Phase | Browser Tool Behavior |
|-------|----------------------|
| **Phase 1 — Training wheels** | Shows plan before every action. Asks permission for each click/type. User watches everything. |
| **Phase 2 — Guided** | Shows plan, executes after approval. Reports results. User reviews output. |
| **Phase 3 — Watched** | Executes autonomously. Logs all actions. Alerts on errors or unexpected states. |
| **Phase 4 — Hands-off** | Full autonomous operation. Weekly activity summary. |

**Default: Phase 1.** The user must explicitly advance phases after proving lower levels work.

## Integration with other skills

### With `/level-up`
When `/level-up` Phase 2 identifies a new automation that requires API integration:
1. `/level-up` scopes the automation
2. `/browser-tool` researches the API documentation
3. The AIOS generates the integration script
4. Knowledge saved to `references/{tool}-api.md`

### With `/audit`
When `/audit` identifies missing connections:
1. `/audit` flags "Domain X not connected"
2. `/browser-tool` researches integration options
3. Results inform the next `/level-up` session

### With `/onboard`
During Day 2 (connection wiring):
1. User picks a tool from `connections.md`
2. `/browser-tool` navigates to the tool's API docs
3. Extracts auth flow, endpoints, and common queries
4. Saves to `references/{tool}-api.md`

## Common workflows

### 1. API Documentation Research
```
User: "Read the Notion API docs and create a reference guide"
→ Navigate to developers.notion.com
→ Read authentication, databases, pages, blocks endpoints
→ Extract: auth flow, key endpoints, rate limits, common patterns
→ Save to references/notion-api.md
```

### 2. Competitive Analysis
```
User: "Check the pricing pages of [Competitor A] and [Competitor B]"
→ Navigate to each pricing page
→ Extract: tiers, features per tier, prices
→ Create comparison table in chat
→ Log insights to decisions/log.md
```

### 3. Form Automation
```
User: "Fill out the client intake form at [URL] with data from context/"
→ Read context/about-business.md for relevant data
→ Navigate to the form URL
→ Map form fields to context data
→ Fill each field, verify, submit (or draft for review)
```

## Critical implementation rules

1. **Trust Ramp default is Phase 1.** Always ask before acting on first use.
2. **Never store passwords or sensitive credentials.** If login is needed, ask the user to handle it.
3. **Screenshot on errors.** Visual proof of what went wrong.
4. **Save knowledge, not just actions.** Every doc read = potential `references/` file.
5. **Suggest skill creation for repeating tasks.** If the user runs the same browser workflow 3+ times, recommend creating a dedicated skill.
6. **Respect rate limits and ToS.** Don't spam-refresh or bypass access controls.
7. **Read-first, act-second.** Always read and understand page content before interacting with elements.
8. **Announce navigation.** Tell the user where you're going before you go there.

## Verification (for the implementer)

- **Navigation test:** Ask to read a public API doc page. Expected: navigates, extracts key info, formats as markdown.
- **Form test:** Ask to fill a demo form. Expected: shows plan, fills fields with user approval at Phase 1, confirms completion.
- **Error test:** Navigate to a broken URL. Expected: reports error with details, doesn't retry infinitely.
- **Knowledge save test:** Read API docs. Expected: offers to save to `references/{tool}-api.md`, formatted and structured.
- **Trust Ramp test:** Try to skip to Phase 4. Expected: refuses, explains the phases, asks to prove lower phases first.

---

> *Part of Arise OS™. The ARISE Method™ is a trademark of Shubham Gunjal. © 2026 Shubham Gunjal.*
