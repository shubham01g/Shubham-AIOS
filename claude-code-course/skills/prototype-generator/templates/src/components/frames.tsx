/** PhoneFrame, BrowserFrame and the Presenter layout used by /app and /live. */
import { useEffect, useState, type ReactNode } from 'react'
import { ArrowRight, Lock, Signal, Wifi, BatteryFull } from 'lucide-react'

export function PhoneFrame({ children, tabBar, scaleToFit = true }: { children: ReactNode; tabBar?: ReactNode; scaleToFit?: boolean }) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    if (!scaleToFit) return
    const fit = () => setScale(Math.min(1, (window.innerHeight - 120) / 860))
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit)
  }, [scaleToFit])
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  return (
    <div style={{ width: 390 * scale, height: 844 * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        className="relative h-[844px] w-[390px] overflow-hidden rounded-[52px] border-[10px] border-[#0b0f0e] bg-canvas shadow-2xl ring-1 ring-white/10">
        <div className="absolute left-1/2 top-2.5 z-30 h-8 w-28 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative z-20 flex h-12 items-center justify-between px-7 pt-1 text-[13px] font-semibold">
          <span>{time}</span><span className="flex items-center gap-1"><Signal size={14} /><Wifi size={14} /><BatteryFull size={18} /></span>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-12 flex flex-col">
          <div className="flex-1 overflow-y-auto px-5 pb-4">{children}</div>
          {tabBar && <div className="border-t border-line bg-surface/90 px-3 pb-6 pt-2 backdrop-blur">{tabBar}</div>}
        </div>
        <div className="absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-ink/60" />
      </div>
    </div>
  )
}

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-canvas shadow-2xl">
      <div className="relative flex h-9 items-center gap-1.5 border-b border-line bg-surface px-4">
        <i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-md bg-muted px-3 py-0.5 text-[11px] text-ink-3"><Lock size={10} />{url}</div>
      </div>
      <div className="h-[calc(100%-36px)] overflow-auto">{children}</div>
    </div>
  )
}

export type ScreenDef = { id: string; title: string; explainer: string; tips: string[] }

/** 3-column presenter: "You are viewing" | device | "Jump to a screen". Collapses to device-only under lg. */
export function Presenter({ screens, active, onJump, device, hint }: { screens: ScreenDef[]; active: string; onJump: (id: string) => void; device: ReactNode; hint?: string }) {
  const s = screens.find((x) => x.id === active) ?? screens[0]
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-8 lg:grid-cols-[1fr_auto_1fr]">
      <aside className="hidden lg:block">
        <p className="eyebrow">You are viewing</p>
        <h2 className="mt-2 text-3xl font-semibold">{s.title}</h2>
        <p className="mt-3 text-ink-2">{s.explainer}</p>
        <ul className="mt-4 space-y-2 text-sm text-ink-2">{s.tips.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />{t}</li>)}</ul>
      </aside>
      <div className="mx-auto">{device}</div>
      <aside className="hidden lg:block">
        <p className="eyebrow mb-3">Jump to a screen</p>
        <nav className="space-y-0.5">{screens.map((x) => (
          <button key={x.id} onClick={() => onJump(x.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${x.id === active ? 'bg-muted text-ink' : 'text-ink-2 hover:bg-muted/60'}`}>
            {x.title}<ArrowRight size={14} className="text-ink-3" /></button>))}
        </nav>
        {hint && <p className="mt-6 rounded-xl border border-dashed border-line p-4 text-xs text-ink-3">{hint}</p>}
      </aside>
    </div>
  )
}
