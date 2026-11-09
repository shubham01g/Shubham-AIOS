/** Tokens are RGB channels defined in src/index.css (:root = light, .dark = dark). */
const c = (n) => `rgb(var(--c-${n}) / <alpha-value>)`
const accents = ['coral', 'sun', 'berry', 'sky', 'sage', 'plum']
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Portal accents / entity hues are passed as strings (bg-${hue}-soft), so safelist them.
  safelist: [{ pattern: /^(bg|text|border|from|to|ring)-(brand|coral|sun|berry|sky|sage|plum)(-soft)?$/ }],
  theme: {
    extend: {
      colors: {
        canvas: c('canvas'), surface: c('surface'), muted: c('muted'), line: c('line'),
        ink: { DEFAULT: c('ink'), 2: c('ink-2'), 3: c('ink-3') },
        brand: { DEFAULT: c('brand'), strong: c('brand-strong'), soft: c('brand-soft'), fg: c('brand-fg') },
        ...Object.fromEntries(accents.map((a) => [a, { DEFAULT: c(a), soft: c(`${a}-soft`) }])),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],      // {{UI_FONT}}
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],   // {{DISPLAY_FONT}}
      },
      borderRadius: { card: '16px' },                                        // {{RADIUS}}
    },
  },
  plugins: [],
}
