/**
 * All demo data. Replace with the client's domain. Rules:
 * - Dates relative to today (never hard-code a date that will look stale).
 * - Localized names, places, prices. Enough rows that lists look real.
 * - `hue` on entities gives consistent avatar/tile colors.
 */
export type Hue = 'brand' | 'coral' | 'sun' | 'berry' | 'sky' | 'sage' | 'plum'
export type BookingStatus = 'requested' | 'confirmed' | 'rescheduled' | 'declined' | 'done'

export type Customer = { id: string; name: string; email: string; city: string; joined: string; status: 'active' | 'invited' | 'churned'; hue: Hue }
export type Business = { id: string; name: string; city: string; rating: number; hue: Hue; plan: 'Starter' | 'Pro' | 'Group'; x: number; y: number }
export type Service = { id: string; businessId: string; name: string; minutes: number; price: number }
export type Booking = {
  id: string; customerId: string; customerName: string; businessId: string; serviceId: string; serviceName: string
  date: string; time: string; status: BookingStatus; createdAt: string; note?: string
}
export type Notification = { id: string; userId: string; kind: string; title: string; body: string; at: string; read: boolean }
export type AuditEntry = { id: string; actor: string; actorRole: string; action: string; target: string; severity: 'info' | 'warn'; at: string }

export type Seed = {
  customers: Customer[]; businesses: Business[]; services: Service[]; bookings: Booking[]
  notifications: Notification[]; audit: AuditEntry[]
}

const day = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10) }
const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString()

export function seed(): Seed {
  const customers: Customer[] = [
    { id: 'u1', name: '{{CUSTOMER_NAME}}', email: 'demo@example.com', city: '{{CITY}}', joined: day(-120), status: 'active', hue: 'sun' },
    // add 40-60 for the admin users table (generate with a small name list + loop)
  ]
  const businesses: Business[] = [
    { id: 'b1', name: '{{BUSINESS_NAME}}', city: '{{CITY}}', rating: 4.8, hue: 'brand', plan: 'Pro', x: 48, y: 40 },
  ]
  const services: Service[] = [
    { id: 's1', businessId: 'b1', name: '{{SERVICE_1}}', minutes: 30, price: 45 },
  ]
  const bookings: Booking[] = [
    { id: 'k1', customerId: 'u1', customerName: '{{CUSTOMER_NAME}}', businessId: 'b1', serviceId: 's1', serviceName: '{{SERVICE_1}}', date: day(3), time: '10:30', status: 'confirmed', createdAt: ago(3000) },
  ]
  return {
    customers, businesses, services, bookings,
    notifications: [],
    audit: [{ id: 'a1', actor: 'system', actorRole: 'system', action: 'nightly encrypted backup completed', target: '{{REGION}}', severity: 'info', at: ago(240) }],
  }
}
