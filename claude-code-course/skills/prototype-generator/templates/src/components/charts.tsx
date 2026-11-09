/** Hand-rolled SVG charts (the reference uses no chart library). Colors come from token classes via currentColor. */
import { useId } from 'react'

const path = (pts: number[], w: number, h: number, pad = 2) => {
  const max = Math.max(...pts), min = Math.min(...pts), span = max - min || 1
  return pts.map((v, i) => [(i / (pts.length - 1)) * w, h - pad - ((v - min) / span) * (h - pad * 2)] as const)
}

/** Sparkline with gradient fill. Wrap in a text-<hue> element: <div className="text-coral"><Sparkline .../></div> */
export function Sparkline({ data, height = 44 }: { data: number[]; height?: number }) {
  const id = useId(), w = 300
  const p = path(data, w, height)
  const line = p.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="h-11 w-full">
      <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".25" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
      <path d={`${line} L${w},${height} L0,${height} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

/** Multi-series area chart with y grid + x labels. series[].className sets color, e.g. "text-sky". */
export function AreaChart({ labels, series, height = 240 }: { labels: string[]; series: { name: string; data: number[]; className: string }[]; height?: number }) {
  const w = 640, max = Math.max(...series.flatMap((s) => s.data)) * 1.1, ticks = 4
  const xy = (v: number, i: number) => [40 + (i / (labels.length - 1)) * (w - 50), height - 24 - (v / max) * (height - 40)] as const
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full">
      {Array.from({ length: ticks + 1 }, (_, t) => {
        const y = height - 24 - (t / ticks) * (height - 40)
        return <g key={t}><line x1="40" x2={w - 10} y1={y} y2={y} className="stroke-line" strokeDasharray="3 4" /><text x="0" y={y + 4} className="fill-ink-3 text-[10px]">{Math.round((max * t) / ticks / 1000)}k</text></g>
      })}
      {series.map((s) => {
        const pts = s.data.map(xy), d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')
        return <g key={s.name} className={s.className}><path d={`${d} L${pts.at(-1)![0]},${height - 24} L40,${height - 24} Z`} fill="currentColor" opacity=".15" /><path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" /></g>
      })}
      {labels.map((l, i) => <text key={l + i} x={xy(0, i)[0]} y={height - 6} textAnchor="middle" className="fill-ink-3 text-[10px]">{l}</text>)}
    </svg>
  )
}

/** Grouped/stacked bars. stacked=true stacks series. */
export function BarChart({ labels, series, height = 200, stacked = false }: { labels: string[]; series: { name: string; data: number[]; className: string }[]; height?: number; stacked?: boolean }) {
  const w = 640, inner = height - 24
  const totals = labels.map((_, i) => (stacked ? series.reduce((a, s) => a + s.data[i], 0) : Math.max(...series.map((s) => s.data[i]))))
  const max = Math.max(...totals) * 1.1, slot = (w - 20) / labels.length, bw = stacked ? slot * 0.5 : (slot * 0.6) / series.length
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full">
      {labels.map((l, i) => {
        let acc = 0
        return (
          <g key={l + i}>
            {series.map((s, j) => {
              const h = (s.data[i] / max) * inner
              const x = 10 + i * slot + (stacked ? slot * 0.25 : slot * 0.2 + j * bw)
              const y = stacked ? inner - acc - h : inner - h
              if (stacked) acc += h
              return <rect key={s.name} x={x} y={y} width={bw - 2} height={h} rx="4" className={s.className} fill="currentColor" />
            })}
            <text x={10 + i * slot + slot / 2} y={height - 6} textAnchor="middle" className="fill-ink-3 text-[10px]">{l}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Score ring, e.g. health score 94. */
export function Ring({ value, size = 64, stroke = 6, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeOpacity=".2" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <span className="absolute font-display text-lg font-semibold">{label ?? value}</span>
    </div>
  )
}

/** Thin progress meter, e.g. "due in 9 days". */
export function Meter({ value, className = 'bg-brand' }: { value: number; className?: string }) {
  return <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${className}`} style={{ width: `${Math.min(100, value)}%` }} /></div>
}
