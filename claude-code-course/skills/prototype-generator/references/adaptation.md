# Adaptation: making every prototype different

The reference *structure* is reusable. Its *content, palette, fonts, metrics and flows* are not. For each new brief,
make a decision in every row below, and write it into the spec.

## 1. Portal mapping by industry (examples, not limits)
| Industry | End-user app | Business dashboard | Partner portal | Signature flow |
|---|---|---|---|---|
| Pet health | Owner app | Clinic | Insurer | Book → accept → push |
| Human clinic / telehealth | Patient app | Practice | Pharmacy / Lab | Book → confirm → video link |
| Restaurant / food | Diner app | Restaurant | Courier | Order → accept → live tracking |
| Fitness / studio | Member app | Studio | Trainer | Book class → waitlist → spot freed |
| Real estate / rentals | Tenant app | Landlord / property manager | Contractor | Report issue → assign → fixed |
| Education | Student/parent app | School | Tutor | Submit homework → grade → notify |
| Salon / beauty | Client app | Salon | Stylist | Book → confirm → reminder |
| Logistics | Shipper app | Carrier | Driver | Request quote → quote → accept |
| Fintech / lending | Applicant app | Lender | Underwriter / KYC | Apply → review → approve |
| Events | Attendee app | Organizer | Vendor/sponsor | Buy ticket → check-in scan |
| Home services | Customer app | Provider company | Technician | Request → dispatch → job done |
| SaaS B2B (no consumer) | Web app (browser frame) | Team admin | Integrations/API | Create → approve → webhook |

Rules: 2 to 5 portals. Always include Admin. Primary app = phone frame if consumer, browser frame if B2B.
If there is no third party, drop the partner portal rather than inventing a weak one.

## 2. Dashboard content: derive from the business's real metrics
Each Overview gets: greeting + summary line, 2 action buttons, 4 KPI cards (number, delta, context, sparkline),
1 primary list (today/queue), 1 "waiting for you" list, 1 chart. Choose KPIs the client actually cares about:
- Booking businesses: appointments today, open requests, no-show rate, phone calls saved, utilization
- Commerce/food: orders today, avg prep time, revenue, rating, repeat customers
- Rentals: occupancy, open tickets, rent collected, avg resolution time
- Lending: applications, approval rate, avg decision time, default rate
- Education: active students, submissions pending, avg grade, attendance
- Admin (all): registered users, active <core entity>, businesses live, MRR/GMV, MAU, plan mix, delivery rate,
  live activity feed, top cities/regions, growth chart
- Partner: linked records, active consents/integrations, processed items, avg decision time

Pick secondary pages that match workflows (inbox, calendar, customers, messages, catalog/services, hours,
payouts, integrations, team & compliance). 3 to 8 per portal.

## 3. Theme presets (pick one, or blend; then generate light + dark channel values)
| Preset | Mood / fits | Brand (light / dark) | Accents | Display + UI font | Radius |
|---|---|---|---|---|---|
| **Calm Care** | health, wellness, trust | deep teal 15 92 85 / 62 184 166 | coral, sun, plum | Fraunces + Inter | 16px |
| **Clinical Blue** | medical, insurance, fintech trust | 29 78 216 / 96 150 250 | teal, amber, rose | Instrument Serif + Inter | 12px |
| **Midnight Pro** | B2B SaaS, analytics, dev tools | 99 102 241 / 129 140 248 | cyan, lime, pink | Space Grotesk + Inter | 10px |
| **Warm Hospitality** | food, hotels, events | 194 65 12 / 251 146 60 | olive, gold, berry | DM Serif Display + DM Sans | 18px |
| **Fresh Fitness** | sport, energy, youth | 22 163 74 / 74 222 128 | electric blue, orange | Archivo Black / Archivo + Inter | 14px |
| **Luxe Noir** | beauty, fashion, real estate premium | 120 90 50 (bronze) / 214 180 120 | rose, sage | Playfair Display + Manrope | 6px |
| **Playful Learn** | education, kids, community | 124 58 237 / 167 139 250 | yellow, coral, sky | Bricolage Grotesque + Nunito | 22px |
| **Industrial** | logistics, construction, B2B ops | 234 88 12 / 251 146 60 on slate | steel blue, yellow | Barlow Condensed + Barlow | 8px |

If the client has brand colors, use them as `--c-brand` and derive the rest. Check contrast: brand on surface
and brand-fg on brand must be ≥ 4.5:1. Each portal gets an accent from the secondary hues.
Default mode: dark for "wow" pitches and tech, light for medical/legal/finance conservative clients.

## 4. Copy voice
Write the hero headline as a promise from the end user's pain ("Every appointment, every reminder. Never missed
again."). Persona pain cards quote a real sentence each side would say. Avoid buzzwords. Short sentences.
Localize fully: names, streets, phone formats, currency, dates, regulations (GDPR/AVV in DE, DPDP in India,
HIPAA in US, LGPD in Brazil).

## 5. Feature variety (don't make every prototype identical)
Pick 1-3 "delight" mechanics fitting the domain: health score ring, streaks, progress meters, live map with
pins, QR passport/ticket, timeline, chat with attachments, AI suggestion card, scan/OCR mock, kanban, calendar
drag, rating stars, loyalty points, countdown, stepper wizard, receipt/invoice preview.

## 6. Sales layer tuning
- Proposal: stack recommendation fits the platform (Expo/React Native for mobile + Next.js web; Next.js only
  for B2B web; Flutter only if the client asks). Backend: Supabase by default (pick region by market).
- Pricing: scale build price by portals (rough: primary mobile app 40-55%, business dashboard 25-30%, admin
  15-20%, partner 10-15%, often given as a "free bonus"). Milestones = weeks. Revenue model from the
  monetization field with 3 scenarios and explicit assumptions. Running costs = real third-party prices.
- Make all prices/currency fit the market. These are pitch numbers; the user can edit them.
