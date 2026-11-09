# Design system

## Tokens (RGB channels, so Tailwind alpha works)
Define in `src/index.css` on `:root` (light) and `.dark`. Names are fixed; values come from the theme preset.
```
--c-canvas --c-surface --c-muted --c-line            backgrounds & borders
--c-ink --c-ink-2 --c-ink-3                          text: primary / secondary / tertiary
--c-brand --c-brand-strong --c-brand-soft --c-brand-fg
--c-coral --c-sun --c-berry --c-sky --c-sage --c-plum   (+ each "-soft")   accents
```
Light-mode rules: canvas slightly tinted (warm or cool to match mood), surface white, soft = accent at ~12% on white.
Dark-mode rules: canvas very dark tinted toward the brand hue (e.g. teal-black 12 19 17), surface +8 lightness,
muted +16, line +26; brand and accents lighter/more saturated; soft = accent at ~18% on canvas; brand-fg dark.

The Calm Care preset values are in `templates/src/index.css` as the worked example.

## Typography
- Display font (serif or expressive) for: hero, page titles, section headings, card titles, big KPI numbers.
  Weight 500-600, tracking `-0.02em`, line-height 1.05 for hero.
- UI font for everything else. 14px base in dashboards, 15-16px on marketing.
- Eyebrow: 11px, uppercase, `tracking-[0.14em]`, `text-ink-3`, weight 600.
- Scale: hero 44/72, h1 36/48, h2 28/36, h3 18/20, body 14-16, meta 12, micro 11.
- Hero accent: `italic` + `bg-gradient-to-r from-brand via-[sand] to-coral bg-clip-text text-transparent`.

## Components
- **Card**: `rounded-2xl border border-line bg-surface` (dark: border white/5), padding 20-24, no heavy shadows; hover lifts 1px.
- **Button**: primary `bg-brand text-brand-fg rounded-xl h-10 px-4 font-medium shadow-[0_8px_24px_-8px_rgb(var(--c-brand)/.6)]`; secondary `border border-line bg-surface`; ghost; icon-only 36px square.
- **Chip/Badge**: `rounded-full px-2 py-0.5 text-[11px] font-medium bg-<hue>-soft text-<hue>`; status dot variant (`● Confirmed`). Count badge: 18px circle coral.
- **IconTile**: 36-40px `rounded-xl bg-<hue>-soft text-<hue>` with lucide icon 18px.
- **KPI card**: label (ink-2, 13px) + IconTile top-right, number (display 28-32px), delta chip ▲/▼ + context (ink-3), sparkline full-width bottom in card hue with gradient fill.
- **List row**: avatar/tile, title + `· meta` in ink-3, sub line, right side chip/time, chevron.
- **Segmented control**: muted pill container, active item surface (or brand for lang toggle).
- **Avatar**: initials on hue-soft or an emoji/illustration on hue-soft rounded-xl for non-human entities.
- **Sheet/Drawer**: slide from right (desktop) / bottom (phone), backdrop blur.
- **Toast**: bottom-center pill, icon + text, 3s.
- **Callout**: soft-colored rounded box with icon (amber for warnings/drafts, brand for info).
- **Phone frame**: 390×844 design, rounded-[48px], 10px bezel ring, dynamic island, status bar (time, signal, wifi, battery), home indicator; scale via CSS `transform` to fit viewport height.
- **Browser frame**: rounded-2xl, 36px top bar with 3 traffic-light dots and centered URL pill with lock icon.

## Motion
150-250ms ease-out. Page fade/slide 8px. Sheets spring. Number count-up on KPI first render (opt). Push
banner slides in from top of phone, auto-dismiss 4s. Respect `prefers-reduced-motion`.

## Layout
Marketing: `max-w-7xl mx-auto px-4 sm:px-6`, sections `py-20 sm:py-28`.
Dashboard: sidebar 240px fixed, content `max-w-[1400px] px-6 py-6`, grids `gap-4`.
Mobile: must work at 390px; dashboards collapse sidebar to a drawer.

## Imagery
No stock photos. Use emoji/illustrated avatars on soft tiles, SVG maps, gradient glows, and live mini-UIs
as "screenshots". Logo: rounded-square brand tile with a simple glyph (lucide icon or custom SVG) + wordmark in display font.
