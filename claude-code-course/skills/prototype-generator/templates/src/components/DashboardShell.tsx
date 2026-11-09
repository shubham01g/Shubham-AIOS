/** Sidebar + topbar + Ctrl/Cmd-K palette. Every business/admin/partner portal uses this with its own config. */
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, Search, type LucideIcon } from 'lucide-react'
import { PortalSwitcher, LangToggle, ThemeToggle, Logo } from './chrome'

export type NavItem = { to: string; label: string; icon: LucideIcon; badge?: number; section?: string; end?: boolean }
export type ShellConfig = {
  portalLabel: string            // "CLINIC", "ADMIN", ...
  accent: string                 // tailwind hue name for active state, e.g. 'brand' | 'coral' | 'plum'
  nav: NavItem[]
  user: { initials: string; name: string; role: string }
  footerCard?: ReactNode         // compliance/status card
  bell?: number
}

export function DashboardShell({ config, children }: { config: ShellConfig; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) } if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])
  let lastSection: string | undefined
  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line px-3 py-4 md:flex">
        <div className="px-2"><Logo sub={config.portalLabel} /></div>
        <nav className="mt-6 flex-1 space-y-0.5 text-sm">
          {config.nav.map((n) => {
            const header = n.section && n.section !== lastSection ? <p className="eyebrow px-3 pb-1 pt-4">{n.section}</p> : null
            lastSection = n.section ?? lastSection
            return (
              <div key={n.to}>{header}
                <NavLink to={n.to} end={n.end} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 transition ${isActive ? 'border border-line bg-surface font-medium text-ink' : 'text-ink-2 hover:bg-muted'}`}>
                  <n.icon size={16} /> <span className="flex-1">{n.label}</span>
                  {!!n.badge && <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-coral px-1 text-[10px] font-semibold text-white">{n.badge}</span>}
                </NavLink>
              </div>
            )
          })}
        </nav>
        {config.footerCard}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-line p-3">
          <span className={`grid h-9 w-9 place-items-center rounded-full bg-${config.accent}-soft text-xs font-semibold text-${config.accent}`}>{config.user.initials}</span>
          <div className="min-w-0"><p className="truncate text-sm font-medium">{config.user.name}</p><p className="truncate text-xs text-ink-3">{config.user.role}</p></div>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-canvas/80 px-6 backdrop-blur-xl">
          <button onClick={() => setOpen(true)} className="flex h-9 w-80 max-w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-ink-3">
            <Search size={14} /> Search or jump to… <kbd className="ml-auto rounded border border-line px-1.5 text-[10px]">Ctrl K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2"><PortalSwitcher /><LangToggle /><ThemeToggle />
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-line"><Bell size={16} />{!!config.bell && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[9px] text-white">{config.bell}</span>}</button>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] px-6 py-6">{children}</main>
      </div>
      {open && <CommandPalette items={config.nav} onClose={() => setOpen(false)} />}
    </div>
  )
}

function CommandPalette({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  const [q, setQ] = useState(''), [i, setI] = useState(0), go = useNavigate()
  const list = useMemo(() => items.filter((x) => x.label.toLowerCase().includes(q.toLowerCase())), [q, items])
  const pick = (n?: NavItem) => { if (n) { go(n.to); onClose() } }
  return (
    <div className="fixed inset-0 z-50 grid place-items-start justify-center bg-black/40 pt-24 backdrop-blur-sm" onClick={onClose}>
      <div className="card w-[520px] max-w-[92vw] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-line px-4"><Search size={16} className="text-ink-3" />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setI(0) }} placeholder="Search pages, records, actions…" className="h-12 flex-1 bg-transparent text-sm outline-none"
            onKeyDown={(e) => { if (e.key === 'ArrowDown') setI((v) => Math.min(v + 1, list.length - 1)); if (e.key === 'ArrowUp') setI((v) => Math.max(v - 1, 0)); if (e.key === 'Enter') pick(list[i]) }} />
          <kbd className="rounded border border-line px-1.5 text-[10px] text-ink-3">Esc</kbd></div>
        <ul className="max-h-80 overflow-auto p-2">{list.map((n, k) => (
          <li key={n.to}><button onMouseEnter={() => setI(k)} onClick={() => pick(n)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${k === i ? 'bg-muted' : ''}`}><n.icon size={15} className="text-ink-3" />{n.label}<span className="ml-auto text-[11px] text-ink-3">Go to</span></button></li>))}
        </ul>
      </div>
    </div>
  )
}
