/** Small building blocks. Hue = 'brand' | 'coral' | 'sun' | 'berry' | 'sky' | 'sage' | 'plum'. */
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Sparkline } from './charts'

export const IconTile = ({ icon: I, hue = 'brand', size = 36 }: { icon: LucideIcon; hue?: string; size?: number }) => (
  <span className={`grid shrink-0 place-items-center rounded-xl bg-${hue}-soft text-${hue}`} style={{ width: size, height: size }}><I size={size * 0.48} /></span>
)

export const Chip = ({ children, hue = 'brand', dot }: { children: ReactNode; hue?: string; dot?: boolean }) => (
  <span className={`inline-flex items-center gap-1 rounded-full bg-${hue}-soft px-2 py-0.5 text-[11px] font-medium text-${hue}`}>{dot && <i className={`h-1.5 w-1.5 rounded-full bg-${hue}`} />}{children}</span>
)

export const Avatar = ({ label, hue = 'brand', size = 40, rounded = 'rounded-xl' }: { label: ReactNode; hue?: string; size?: number; rounded?: string }) => (
  <span className={`grid shrink-0 place-items-center ${rounded} bg-${hue}-soft text-${hue} font-semibold`} style={{ width: size, height: size, fontSize: size * 0.4 }}>{label}</span>
)

export function KpiCard({ label, value, delta, context, icon, hue = 'brand', spark }: { label: string; value: string; delta?: number; context?: string; icon: LucideIcon; hue?: string; spark?: number[] }) {
  const up = (delta ?? 0) >= 0
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between"><p className="text-[13px] text-ink-2">{label}</p><IconTile icon={icon} hue={hue} /></div>
      <p className="mt-1 font-display text-[30px] font-semibold leading-none">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-ink-3">
        {delta !== undefined && <Chip hue={up ? 'sage' : 'berry'}>{up ? '▲' : '▼'} {Math.abs(delta)}%</Chip>}{context}
      </div>
      {spark && <div className={`mt-3 text-${hue}`}><Sparkline data={spark} /></div>}
    </div>
  )
}

export const PageHeader = ({ eyebrow, title, sub, actions }: { eyebrow?: string; title: string; sub?: string; actions?: ReactNode }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1 className="mt-1 text-[34px] font-semibold leading-tight">{title}</h1>{sub && <p className="mt-1 max-w-2xl text-sm text-ink-2">{sub}</p>}</div>
    {actions && <div className="flex gap-2">{actions}</div>}
  </div>
)

export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex rounded-xl border border-line bg-muted p-1 text-xs font-medium">
      {options.map((o) => <button key={o.value} onClick={() => onChange(o.value)} className={`rounded-lg px-3 py-1.5 ${o.value === value ? 'bg-surface text-ink shadow-sm' : 'text-ink-3'}`}>{o.label}</button>)}
    </div>
  )
}

export const Toggle = ({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) => (
  <button onClick={() => onChange(!on)} className={`relative h-6 w-10 rounded-full transition ${on ? 'bg-brand' : 'bg-line'}`}><i className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} /></button>
)

export const Callout = ({ icon: I, hue = 'sun', children }: { icon: LucideIcon; hue?: string; children: ReactNode }) => (
  <div className={`flex items-center gap-2 rounded-xl bg-${hue}-soft px-4 py-3 text-sm text-${hue}`}><I size={16} />{children}</div>
)
