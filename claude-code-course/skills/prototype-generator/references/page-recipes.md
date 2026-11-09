# Page recipes

Each recipe lists required sections in order. Swap all content for the
client's domain. Optional sections are marked (opt).

## Landing `/`
1. **Header** sticky, `bg-canvas/75 backdrop-blur-xl border-b`: logo, anchors (Platform, Features, Trust), Proposal, Pricing, lang toggle, theme toggle, primary "Open app →".
2. **Hero** 2-col, `min-h-[80vh]`, radial glows (brand + accent at ~15% opacity, blurred):
   - Pill: `PROTOTYPE` chip + "<Portal A> · <Portal B> · <Portal C>, all connected"
   - Headline 4 lines, display font ~72px desktop / 44px mobile; last 1-2 lines italic with `bg-clip-text` gradient (brand → neutral → accent)
   - Subcopy (value prop, 2-3 lines), primary CTA → primary app, secondary → `/live`
   - Trust row: 4 icon + label chips (hosting/region, compliance, languages, platforms)
   - Right: tilted device mock (live mini Home screen) + 2-3 floating cards (push notification, business "New request" with Accept, a trust fact). Slight float animation.
3. **Persona pain cards** 2-col: eyebrow role, quoted pain (display font), 3 check bullets of what changes.
4. **Portal grid** "One platform · N experiences / Click through every side of <Brand>": cards with pastel gradient top + mini live UI, bottom: tinted icon tile, title, phase chip, description, arrow. Entire card is a link.
5. **Live CTA band**: light gradient card, icon, headline, sub, dark pill button → `/live`.
6. **Feature bento**: eyebrow "Phase 1 scope, fully designed", headline; 1 large card with a live mini component + 5 small cards (tinted icon, title, 2-line copy).
7. **Trust/privacy section** (opt but usually yes): split card, copy + bullet chips, visual on the right (consent graph, security layers, compliance badges).
8. **Proposal teaser** card → `/proposal` (opt).
9. **Footer**: logo, legal links, "Interactive prototype · demo data only".

## Primary mobile app `/app` (05, 06)
Presenter layout (`Presenter.tsx`): left explainer (eyebrow "YOU ARE VIEWING", serif title, paragraph, 2 tips with accent bullets), center `PhoneFrame` (390×844 scaled to fit viewport height), right "JUMP TO A SCREEN" list + dashed tip box ("open the <biz> dashboard in another tab…"). Below 1024px: hide side panels, show the phone full width with a floating screen picker.
Screen registry `screens.ts`: `{ id, title, explainer, tips[], component }` 6-10 entries.
Typical screens: Onboarding/sign-in (Apple/Google/magic link mock), Home (greeting + date, entity switcher, hero card in brand color with score ring/progress, streak or status card, next event card, "Coming up" list with status chips, quick actions 4-grid, tip card, nearby/urgent card), Detail/record, Search + map (SVG map with pins from entity x/y), Multi-step flow (stepper, radio cards, sticky CTA, success state) = signature flow start, Chat (bubbles, attachments, notice banner), Documents/wallet, Share/QR, Privacy & consent center (toggles per party, export, delete account), Settings/notifications.
Tab bar 5 items with a badge. In-app push banner slides from the top when the store receives a notification for this user.

## Business dashboard `/<biz>` (09, 10, 11, 17)
`DashboardShell`: sidebar (logo + portal sub-label, nav with badges, section label, compliance/status card, user card), topbar (search "Search or jump to… Ctrl K", portal switcher, lang, theme, bell with count).
- **Overview**: date eyebrow, greeting, summary line, 2 buttons; 4 KPI cards; today list/timeline (2/3 width) + waiting-for-you (1/3); a chart card.
- **Inbox/queue** (receives signature flow): tabs with counts, request cards (avatar, title, meta, 3-col fact grid, customer note as quote bar, consent/verification line, Accept / Propose alternative / Decline). Accept → status change, notification to app user, toast, audit.
- 2 to 6 more: calendar (week grid with colored blocks), customers/records (table + detail drawer), messages (thread list + chat), catalog/services & hours (editable rows + toggles), integrations (cards with connect state), team & compliance (members, roles, DPA status).

## Admin console `/admin` (12)
Eyebrow "CONTROL ROOM", title, sub, range segmented (7D/30D/12M) + Export. Row of 4 KPI cards + row of 4 stat tiles. Growth area chart (2 series) + Live activity feed (from `audit`, newest first, "Live" dot). Revenue by plan stacked bars + plan breakdown + top regions bar list.
Pages: users (searchable table, status chips, detail drawer), businesses (onboarding status), plans & revenue, partners, bookings/orders, notifications (campaign composer mock), compliance & audit log (filters, severity), roles & permissions (matrix), system health (service status rows, uptime bars).

## Partner portal (13)
Accent hue different from brand. Overview: 4 KPIs, "How data reaches you" numbered step cards + callout, latest records list with expiry/status chips. Pages: shared records, onboarding checklist (steps with check states), API & webhooks (masked keys with copy, event list, sample payload code block).

## Live `/live` (14)
Header with Reset. Instruction strip: 3 numbered steps of the signature flow. Two labeled panes: phone (left) and `BrowserFrame` with URL pill (right) showing the business inbox. Both live components, same store. On narrow screens stack vertically.

## Proposal `/proposal` (16)
Pill "Proposal · <Month Year>", headline "How we'd build <Brand>, and make it better.", sub, 4 fact tiles. Sticky contents nav + numbered sections:
01 Tech stack (cards per layer + "Why not X?" note) · 02 Architecture (clients → region box with services → externals; data-model chips; one access-rule code block) · 03 Milestones (week strip + cards with deliverables) · 04 Add · cut · change · 05 What works / fails · 06 Risks + mitigations (technical / legal / adoption) · 07 Retention ideas tagged "In prototype" · 08 Deliverables & handover · closing CTA (call) with links to pricing, live, app.
Answer every question from the client's brief explicitly in one of these sections.

## Pricing `/pricing` (15)
01 Price: offer card (regular price struck, save chip, big price, scarcity pill, included bullets) + "What you get" line items per portal (one "Free bonus") + milestone payment grid. 02 Earning potential: scenario segmented, 4 stat tiles, stacked bar chart 12 months, revenue at month 12 per plan, year-1 revenue, payback month, assumptions list ("Projection only, not a guarantee"). 03 Running costs (third-party services with real prices) + optional care plan. Closing CTA.
Use the user's own pricing if given; otherwise, mark the numbers as placeholders in the final report.

## Legal `/legal/:doc` (18) (opt)
Left doc list + "Download all (.md)" (Blob download); right markdown-rendered doc with amber "Draft for lawyer review, placeholders in [brackets]" banner. Docs depend on market (Impressum only for DE/AT; DPA/AVV for B2B data processing; store privacy declarations for mobile).

## Demo guide (08)
Floating pill "Demo guide k/N" bottom-right on every page. Panel: title "See the whole platform work together", progress bar, N steps auto-checked by store events (e.g. step 2 checks when a booking exists with status requested), link to `/live`, Reset (confirm in-UI, not `window.confirm`).

## Portal switcher (07) & Command palette (11)
Switcher: dropdown with "SWITCH PORTAL" eyebrow, every portal + Live + Proposal + Pricing, each with a tinted icon tile. Palette: Ctrl/⌘ K, input, grouped results (pages, records, actions), arrow keys + Enter, Esc.
