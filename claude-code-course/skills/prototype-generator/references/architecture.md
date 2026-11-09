# Architecture

## Stack (matches the reference)
- Vite + React 18 + TypeScript, `react-router-dom` v6
- Tailwind CSS v3 with RGB-channel CSS variables, `darkMode: 'class'`
- `zustand` + `persist` middleware (localStorage), cross-tab sync via `storage` event
- `motion` (framer-motion) for page/sheet transitions, `lucide-react` icons
- `@fontsource-variable/<display>` + `@fontsource-variable/inter` (or the preset's fonts)
- Charts: hand-rolled SVG components in `templates/src/components/charts.tsx` (no chart lib = small bundle, full styling control)
- No backend. Everything is seed data + store actions. Deploy as static SPA on Vercel (`vercel.json` rewrites).

## Project layout
```
<brand>-prototype/
  index.html  vite.config.ts  tailwind.config.js  postcss.config.js  vercel.json  tsconfig.json  package.json
  PROTOTYPE_SPEC.md
  src/
    main.tsx                 # router + theme bootstrap + Splash until hydrated
    index.css                # :root and .dark tokens, base styles, utility classes
    lib/
      store.ts               # zustand store: state, actions, persist, cross-tab sync, reset
      seed.ts                # all demo data (dates relative to today)
      i18n.ts                # dict {en, xx} + useT() hook
      types.ts
      format.ts              # money, dates, relative time in locale
    components/
      ui.tsx                 # Card, Button, Chip, Badge, Avatar, IconTile, Eyebrow, Segmented, Toggle, Sheet, Toast
      charts.tsx             # Sparkline, AreaChart, BarChart, Ring, Meter
      chrome.tsx             # TopBar, PortalSwitcher, LangToggle, ThemeToggle, DemoGuide, Logo
      PhoneFrame.tsx         # device frame + status bar + tab bar slot
      BrowserFrame.tsx       # macOS chrome with URL pill
      Presenter.tsx          # 3-col: "You are viewing" | device | "Jump to a screen"
      DashboardShell.tsx     # sidebar + topbar + Ctrl K palette, takes nav config & accent
      CommandPalette.tsx
    portals/
      app/  (Home.tsx, ... one file per screen, screens.ts registry with title/explainer/tips)
      <biz>/  (Overview.tsx, Inbox.tsx, ...)
      admin/
      <partner>/
    pages/
      Landing.tsx  Live.tsx  Proposal.tsx  Pricing.tsx  Legal.tsx  NotFound.tsx
```

## Store pattern
```ts
// one store, all portals read it. Keep actions domain-named.
type State = Seed & { lang; theme; signedIn; demoStep; toasts; ...actions }
const KEY = '<brand>-demo-v1'          // bump version to force-reset everyone's demo data
create(persist((set,get)=>({...seed(), requestBooking(b){...; audit('requested', ...); notify(...)}, accept(id){...}, reset(){ set(seed()) }}), {name: KEY}))
// cross-tab: window.addEventListener('storage', e => e.key===KEY && useStore.persist.rehydrate())
```
Rules:
- Every important action: mutate entity → push `notifications` for the counterpart → append `audit` entry →
  `toast()` locally. That is what makes all portals feel connected.
- Seed dates relative to `new Date()` so the demo never looks stale ("in 5 days", "4 days overdue").
- Include enough rows for lists to look real (admin users 40-60, business records 8-15, activity 10+).
- Hues on entities (`hue: 'coral'`) give avatars/tiles consistent colors.

## Routing
`/`, `/app`, `/<biz>/*`, `/admin/*`, `/<partner>/*`, `/live`, `/proposal`, `/pricing`, `/legal/:doc?`, `*`.
The mobile app uses internal screen state (`?s=booking` query or store field), not nested routes, so it can be
embedded in `/live` and on the landing page.
Dashboard portals use nested routes; the shell receives `{ key, label, accent, nav: [{to, icon, label, badge?, section?}], user, footerCard }`.

## Embedding for /live
`Live.tsx` renders `<PhoneFrame><AppRoot/></PhoneFrame>` and `<BrowserFrame url="..."><BizPortal embedded initial="/inbox"/></BrowserFrame>`.
Same store ⇒ instant sync within the page; storage event ⇒ sync across tabs. Use a MemoryRouter inside the
browser frame so it doesn't fight the page URL.

## i18n
Flat dictionary per language in `i18n.ts`; `useT()` returns `t(key, vars?)`. Seed data that is user-facing
(services, tips) stores `{en, xx}` objects or keys. Language toggle lives in the store so it syncs across tabs.
Single-language prototypes: keep the hook, drop the toggle.

## Theming
`index.css` defines tokens on `:root` (light) and `.dark`. `main.tsx` applies `.dark` from store theme
(default from spec). Tailwind maps `canvas, surface, muted, line, ink, ink-2, ink-3, brand, brand-strong,
brand-soft, brand-fg` and each accent + `-soft` to `rgb(var(--c-x) / <alpha-value>)`.

## Verification commands
`npm run build` (tsc + vite build) must be clean. `npm run dev` for browser checks.
