/** Global chrome: Logo, PortalSwitcher, LangToggle, ThemeToggle, DemoGuide, Toasts. */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, Moon, Sun, Check, X, RotateCcw, LayoutGrid, Smartphone, Building2, ShieldCheck, Umbrella, Columns2, FileText, Tag, Compass, PawPrint, type LucideIcon } from 'lucide-react'
import { useStore } from '../lib/store'

export function Logo({ sub }: { sub?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-brand text-brand-fg"><PawPrint size={18} /></span>{/* {{LOGO_ICON}} */}
      <span className="leading-none"><span className="font-display text-lg font-semibold">{'{{BRAND}}'}</span>
        {sub && <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-3">{sub}</span>}</span>
    </Link>
  )
}

/** Edit to match PROTOTYPE_SPEC portals. */
export const PORTALS: { to: string; label: string; icon: LucideIcon; hue: string }[] = [
  { to: '/', label: 'Overview', icon: LayoutGrid, hue: 'brand' },
  { to: '/app', label: '{{APP_LABEL}}', icon: Smartphone, hue: 'brand' },
  { to: '/{{biz}}', label: '{{BIZ_LABEL}}', icon: Building2, hue: 'sky' },
  { to: '/admin', label: 'Admin console', icon: ShieldCheck, hue: 'coral' },
  { to: '/{{partner}}', label: '{{PARTNER_LABEL}}', icon: Umbrella, hue: 'plum' },
  { to: '/live', label: 'Live side-by-side', icon: Columns2, hue: 'sun' },
  { to: '/proposal', label: 'Proposal', icon: FileText, hue: 'sage' },
  { to: '/pricing', label: 'Pricing', icon: Tag, hue: 'berry' },
]

export function PortalSwitcher({ current }: { current?: string }) {
  const [open, setOpen] = useState(false), go = useNavigate()
  const cur = PORTALS.find((p) => p.to === current) ?? PORTALS[0]
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="btn-secondary h-9 px-3 text-xs"><cur.icon size={14} />{cur.label}<ChevronDown size={14} /></button>
      {open && (<>
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
        <div className="card absolute right-0 z-50 mt-2 w-56 p-2 shadow-2xl">
          <p className="eyebrow px-2 pb-1 pt-1">Switch portal</p>
          {PORTALS.map((p) => (
            <button key={p.to} onClick={() => { go(p.to); setOpen(false) }} className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-muted">
              <span className={`grid h-6 w-6 place-items-center rounded-md bg-${p.hue}-soft text-${p.hue}`}><p.icon size={13} /></span>{p.label}</button>))}
        </div></>)}
    </div>
  )
}

export function LangToggle() {
  const { lang, setLang } = useStore()
  return (
    <div className="flex rounded-lg border border-line bg-surface p-0.5 text-[11px] font-semibold">
      {(['{{LANG2}}', 'en'] as const).map((l) => (
        <button key={l} onClick={() => setLang(l as never)} className={`rounded-md px-2 py-1 uppercase ${lang === l ? 'bg-brand text-brand-fg' : 'text-ink-3'}`}>{l}</button>))}
    </div>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore()
  return <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface">{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</button>
}

/** Steps auto-complete from store state. Edit to follow the signature flow. */
export function DemoGuide() {
  const [open, setOpen] = useState(false)
  const s = useStore()
  const steps: { label: string; done: boolean; to: string }[] = [
    { label: 'Open the {{APP_LABEL}}', done: true, to: '/app' },
    { label: '{{STEP_2}}', done: s.bookings.some((b) => b.status === 'requested'), to: '/app' },
    { label: '{{STEP_3}}', done: s.bookings.some((b) => b.status === 'confirmed' || b.status === 'rescheduled'), to: '/{{biz}}' },
    { label: '{{STEP_4}}', done: s.notifications.some((n) => n.read), to: '/app' },
    { label: 'Find it in the admin audit log', done: false, to: '/admin' },
  ]
  const n = steps.filter((x) => x.done).length
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="card mb-3 w-80 p-4 shadow-2xl">
          <div className="flex items-start justify-between"><div><p className="eyebrow">Guided demo</p><p className="mt-1 font-display text-lg font-semibold">See the whole platform work together</p></div><button onClick={() => setOpen(false)}><X size={16} /></button></div>
          <div className="mt-3 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${(n / steps.length) * 100}%` }} /></div>
          <ol className="mt-3 space-y-1">{steps.map((st, i) => (
            <li key={i}><Link to={st.to} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-muted">
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${st.done ? 'bg-brand text-brand-fg' : 'bg-muted text-ink-3'}`}>{st.done ? <Check size={12} /> : i + 1}</span>
              <span className={st.done ? 'text-ink-3 line-through' : ''}>{st.label}</span></Link></li>))}</ol>
          <div className="mt-3 flex justify-between border-t border-line pt-3 text-xs"><Link to="/live" className="font-medium text-brand">Open live side-by-side →</Link><button onClick={s.reset} className="flex items-center gap-1 text-ink-3"><RotateCcw size={12} />Reset</button></div>
        </div>)}
      <button onClick={() => setOpen((o) => !o)} className="ml-auto flex items-center gap-2 rounded-full border border-line bg-surface py-2 pl-2 pr-3 text-sm font-medium shadow-xl">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-coral text-white"><Compass size={14} /></span>Demo guide<span className="rounded-full bg-muted px-2 text-[11px] text-ink-2">{n}/{steps.length}</span>
      </button>
    </div>
  )
}

export function Toasts() {
  const toasts = useStore((s) => s.toasts)
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => <div key={t.id} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-canvas shadow-xl"><Check size={14} />{t.text}</div>)}
    </div>
  )
}
