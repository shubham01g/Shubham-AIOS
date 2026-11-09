---
name: prototype-generator
description: Build a client-pitch interactive prototype (multi-portal web app with landing page, mobile-app presenter, role dashboards, live side-by-side demo, proposal and pricing pages) from a client brief or a few example details. Adapts portals, dashboards, features, theme, fonts, languages and business model to each new client. Use when the user says "/prototype-generator", "build a prototype for my client", "make a pitch prototype/demo for X", "create a clickable demo of my app idea", or pastes a client brief / job post and wants a demo site.
---

# Prototype Generator

Turns a client brief into a **sales-grade, fully clickable prototype**: one Vite + React + Tailwind app where
every role (customer app, business dashboard, admin, partner) is a real route, all sharing one live demo data
model, wrapped in a landing page, a guided demo, a proposal and a pricing page. The goal is that the client
clicks through their future product *and* reads why you should build it, in one link.

The patterns below come from real client-pitch prototypes. Reuse the
structure and quality bar, and derive all content, brand and data from the new brief.

## Files in this skill

| File | Read when |
|---|---|
| `references/intake.md` | Step 1: turning a brief into a Prototype Spec |
| `references/adaptation.md` | Step 2: mapping portals, dashboards, themes, fonts per industry |
| `references/architecture.md` | Step 3: stack, store, routing, cross-tab live sync, i18n, theming |
| `references/page-recipes.md` | Step 4: section-by-section recipes for every page type |
| `references/design-system.md` | Step 4: tokens, type scale, component styling rules |
| `templates/` | Step 3: copy into the new project as the starting scaffold |

## Workflow

### 1. Intake → Prototype Spec
Read `references/intake.md`. Extract from whatever the user gave (brief, job post, call notes, 2 lines of
"examples or details"). Fill gaps with sensible, industry-specific assumptions instead of asking. Ask the
user (AskUserQuestion, max 1 round, max 4 questions) **only** for things that genuinely change the build and
cannot be inferred: usually the brand name (if absent), primary market/language, and which portals are in scope.

Write the spec to `<project>/PROTOTYPE_SPEC.md` and show a short summary (portals, key screens, theme,
languages, pages). Proceed unless the user objects.

### 2. Adapt
Use `references/adaptation.md` to decide, for THIS client:
- **Portals** (2 to 5): which roles exist (e.g. patient/clinic/admin/insurer; diner/restaurant/admin/courier;
  tenant/landlord/admin/contractor). Each gets its own route, accent hue and dashboard.
- **Primary experience**: mobile app (phone-frame presenter) or web app (browser-frame) or both.
- **Signature flow**: the one cross-portal action that makes the "live" demo magical (book → accept → push;
  order → accept → track; apply → approve → notify).
- **Theme**: palette, fonts, radius, mood, dark/light default. Pick from the theme presets or derive a new one.
  Never reuse the example teal/Fraunces preset unless the brief fits it.
- **Dashboards**: KPI cards, charts and lists that match the business's real metrics.
- **Business model** for the pricing page's earnings projection.

### 3. Scaffold
Read `references/architecture.md`. Create the project (default: `./<brand>-prototype/` in the cwd), copy
`templates/` into it, then replace every `{{PLACEHOLDER}}`. Run `npm install` and `npm run dev` in the
background. (The template is verified to build clean with `npm run build`.)

Placeholders: `{{brand}}` (slug), `{{BRAND}}`, `{{TAGLINE}}`, `{{VALUE_PROP}}`, `{{LANG}}`/`{{LANG2}}` (single-language:
remove LangToggle and the second dict), `{{REGION_CODE}}`, `{{CURRENCY}}`, `{{REGION}}`, `{{DEFAULT_THEME}}`/`{{DEFAULT_THEME_CLASS}}`,
`{{biz}}`/`{{partner}}` (route slugs), `{{APP_LABEL}}`/`{{BIZ_LABEL}}`/`{{PARTNER_LABEL}}`, `{{BIZ_USER}}`, `{{LOGO_ICON}}`,
`{{DISPLAY_FONT}}`/`{{UI_FONT}}` (also swap the @fontsource imports + package.json), `{{RADIUS}}`, seed names
(`{{CUSTOMER_NAME}}`, `{{BUSINESS_NAME}}`, `{{CITY}}`, `{{SERVICE_1}}`), demo guide `{{STEP_n}}`, i18n `{{...}}`.
Then replace the theme values in `src/index.css` and rename/extend the example `Booking` entity and actions in
`seed.ts`/`store.ts` to the client's domain. Template components: `components/ui.tsx` (KpiCard, Chip, IconTile,
Avatar, PageHeader, Segmented, Toggle, Callout), `charts.tsx` (Sparkline, AreaChart, BarChart, Ring, Meter),
`frames.tsx` (PhoneFrame, BrowserFrame, Presenter), `DashboardShell.tsx` (sidebar, topbar, Ctrl K palette),
`chrome.tsx` (Logo, PortalSwitcher, LangToggle, ThemeToggle, DemoGuide, Toasts).

### 4. Build pages in this order
Follow `references/page-recipes.md` and `references/design-system.md`:
1. Seed data (`src/lib/seed.ts`): realistic, localized names, places, prices, dates relative to today.
2. Store actions for the signature flow (and 3 to 6 secondary actions).
3. Primary experience (mobile presenter or web app): 6 to 10 screens, all reachable from "Jump to a screen".
4. Each business portal: Overview dashboard + 3 to 8 sidebar pages. Inbox/queue page that receives the
   signature flow is mandatory.
5. Admin console (if in scope): metrics, users, plans/revenue, audit log, compliance/system health.
6. Live side-by-side page.
7. Landing page (written last, when you know what exists).
8. Proposal page, pricing page, legal drafts (optional: include when the client asked about stack, cost or compliance).
9. Demo guide (5 to 7 steps through the signature flow) + portal switcher + command palette.

Every button must do something: mutate the store, navigate, open a sheet, or show a toast. No dead clicks.

### 5. Verify
- `npm run build` must pass with zero TypeScript errors.
- Open the dev server in the browser (browser-check skill or Claude in Chrome). Run the signature flow in two
  tabs (or on `/live`) and confirm it syncs. Check dark + light, both languages, and 390px mobile width.
- Fix everything you find, then re-check.

### 6. Deliver
Report: project path, how to run, route list, the signature flow, and what is mocked. Offer to deploy to
Vercel (`npx vercel --prod`), but **ask first**: deploying publishes the prototype publicly.

## Non-negotiables (the quality bar)
- **One shared store, persisted + synced across tabs**, so action in one portal appears instantly in another.
- **Every portal looks finished**: real-feeling data, no lorem ipsum, no "Coming soon" pages.
- **Presenter chrome explains itself**: "You are viewing" panel + "Jump to a screen" list beside the device.
- **Dark and light mode** from CSS variables; **two languages** if the market is non-English (else one).
- **Display serif/expressive headline font + clean UI sans**, gradient italic accent on the hero.
- **Sales layer**: proposal (stack, architecture, milestones, add/cut/change, risks), pricing (fixed price,
  milestone payments, revenue scenarios, running costs). Tailor all numbers to the brief.
- A visible "Prototype · demo data only" marker and a Reset button.
- No copying of the reference's text, brand, data or palette into a new client's prototype.
