/**
 * ONE store for every portal. Persisted to localStorage and synced across tabs,
 * so an action in the app shows up instantly in the business dashboard (and on /live).
 *
 * Replace the example entities (Booking) with the domain from PROTOTYPE_SPEC.md.
 * Pattern for every important action: mutate entity -> notify counterpart -> audit -> toast.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seed, type Seed, type Booking } from './seed'

export const STORE_KEY = '{{brand}}-demo-v1' // bump the version to reset everyone's demo data

export type Lang = 'en' | '{{LANG2}}'
export type Theme = 'dark' | 'light'

type Toast = { id: string; text: string; tone?: 'ok' | 'info' | 'warn' }

type State = Seed & {
  lang: Lang
  theme: Theme
  signedIn: boolean
  toasts: Toast[]
  // UI
  setLang: (l: Lang) => void
  toggleTheme: () => void
  toast: (text: string, tone?: Toast['tone']) => void
  dismissToast: (id: string) => void
  reset: () => void
  // Domain (signature flow) — rename to fit the client
  requestBooking: (b: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void
  acceptBooking: (id: string) => void
  proposeTime: (id: string, date: string, time: string) => void
  declineBooking: (id: string) => void
  markNotificationsRead: (userId: string) => void
}

const uid = () => Math.random().toString(36).slice(2, 10)
const now = () => new Date().toISOString()

export const useStore = create<State>()(
  persist(
    (set, get) => {
      const audit = (actor: string, actorRole: string, action: string, target: string, severity: 'info' | 'warn' = 'info') =>
        set((s) => ({ audit: [{ id: uid(), actor, actorRole, action, target, severity, at: now() }, ...s.audit].slice(0, 200) }))
      const notify = (userId: string, title: string, body: string, kind = 'booking') =>
        set((s) => ({ notifications: [{ id: uid(), userId, kind, title, body, at: now(), read: false }, ...s.notifications] }))

      return {
        ...seed(),
        lang: 'en',
        theme: '{{DEFAULT_THEME}}' as Theme,
        signedIn: true,
        toasts: [],

        setLang: (lang) => set({ lang }),
        toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
        toast: (text, tone = 'ok') => {
          const id = uid()
          set((s) => ({ toasts: [...s.toasts, { id, text, tone }] }))
          setTimeout(() => get().dismissToast(id), 3200)
        },
        dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
        reset: () => set({ ...seed(), toasts: [] }),

        requestBooking: (b) => {
          const booking: Booking = { ...b, id: uid(), status: 'requested', createdAt: now() }
          set((s) => ({ bookings: [booking, ...s.bookings] }))
          audit(b.customerName, 'customer', 'requested booking', b.serviceName)
          get().toast('Request sent')
        },
        acceptBooking: (id) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b) return
          set((s) => ({ bookings: s.bookings.map((x) => (x.id === id ? { ...x, status: 'confirmed' } : x)) }))
          notify(b.customerId, 'Booking confirmed ✓', `${b.serviceName} · ${b.date} ${b.time}`)
          audit('{{BIZ_USER}}', 'business', 'accepted booking', b.serviceName)
          get().toast('Accepted, customer notified')
        },
        proposeTime: (id, date, time) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b) return
          set((s) => ({ bookings: s.bookings.map((x) => (x.id === id ? { ...x, status: 'rescheduled', date, time } : x)) }))
          notify(b.customerId, 'New time proposed', `${b.serviceName} · ${date} ${time}`)
          audit('{{BIZ_USER}}', 'business', 'proposed new time', b.serviceName)
          get().toast('New time proposed')
        },
        declineBooking: (id) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b) return
          set((s) => ({ bookings: s.bookings.map((x) => (x.id === id ? { ...x, status: 'declined' } : x)) }))
          notify(b.customerId, 'Request declined', b.serviceName)
          audit('{{BIZ_USER}}', 'business', 'declined booking', b.serviceName, 'warn')
          get().toast('Declined', 'warn')
        },
        markNotificationsRead: (userId) =>
          set((s) => ({ notifications: s.notifications.map((n) => (n.userId === userId ? { ...n, read: true } : n)) })),
      }
    },
    { name: STORE_KEY, partialize: ({ toasts, ...rest }) => rest as unknown as State },
  ),
)

// Cross-tab live sync: another tab wrote the store -> rehydrate this one.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORE_KEY) useStore.persist.rehydrate()
  })
}
