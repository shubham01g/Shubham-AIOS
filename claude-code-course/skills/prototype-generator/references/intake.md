# Intake: brief → Prototype Spec

The user may give a full client brief, a job post, call notes, or just "a gym booking app for India, owner +
trainer + admin". Extract what's there, infer the rest from the industry, and write the spec below.

## Extraction checklist
| Field | Look for | If missing, infer |
|---|---|---|
| Brand name | Explicit name | Invent a short, ownable 1-2 syllable name (Lodgr, Fitto, Petly). Ask only if the user seems to have one. |
| One-line value prop | "app that lets X do Y" | Write it: `<Brand> gives <end users> <benefit> and gives <businesses> <benefit>.` |
| Market / locale | Country, city, language | Default English. Non-English market → bilingual (local + EN), localized names, currency, date format, address style, regulations. |
| End user | Who downloads/uses it | The person with the pain. |
| Business side | Who pays / operates | Clinic, restaurant, landlord, school, salon… |
| Extra roles | Admin, partners, couriers, insurers, teachers | Always add an **Admin console** ("our addition"). Add a partner portal only if the brief hints at it ("later we want insurers/brands/suppliers"). |
| Platform | iOS/Android, web, both | Consumer-facing → mobile (phone frame). B2B-only → web app. |
| Phase scope | "Phase 1 / MVP / later" | Mark later-phase portals with phase chips; still build them (it's what wins the deal). |
| Core features | Bullet list in brief | Group into 6 to 10 primary-app screens. |
| Signature flow | The handoff between roles | Request → accept → notify is the default shape. |
| Compliance | GDPR, HIPAA, PCI, KYC, DPDP | Derive from market + data type; becomes trust section, privacy center, audit log, legal drafts. |
| Integrations | Existing software, payments, maps | Shown on an "Integrations" dashboard page and the proposal's architecture. |
| Monetization | Subscription, commission, ads, freemium | Drives pricing page projection plans. |
| Client's questions | "Which stack? Timeline? Cost?" | Each becomes a proposal section. Answer every one explicitly. |
| Look & feel | Brand colors, references, "calm", "premium" | Pick a theme preset in `adaptation.md`. |
| Budget / timeline | Numbers | Default: fixed price, 6 weekly milestones. Scale by portal count. |

## Prototype Spec template (write to PROTOTYPE_SPEC.md)
```md
# <Brand> prototype spec
Value prop: ...
Market: <country> · Languages: <xx, en> · Currency: <...> · Compliance: <...>
Theme: <preset or custom> · Fonts: <display> + <ui> · Default mode: <dark|light>

## Portals
| Key | Route | Role | Form factor | Accent | Phase chip |
| app | /app | <end user> | phone | brand | Phase 1 · iOS & Android |
| biz | /<biz> | <business> | web dashboard | brand | Phase 2 · Web |
| admin | /admin | operator | web dashboard | coral | Our addition |
| partner | /<partner> | <partner> | web dashboard | plum | <...>-ready |

## Primary app screens (6-10)
1. Home: ...

## Dashboard pages per portal
biz: Overview, <Inbox>, Calendar/..., ...
admin: Overview, Users, <Businesses>, Plans & revenue, Audit log, System health

## Signature flow (drives /live and the demo guide)
1. <end user> does X on phone  2. appears in <biz> inbox  3. <biz> accepts  4. push lands on phone  5. audit entry in admin

## Entities (seed)
<entity>: fields... (count)

## KPIs per dashboard
biz: ... · admin: ... · partner: ...

## Sales layer
Proposal sections: stack, architecture, milestones, add/cut/change, works/fails, risks, retention, handover
Pricing: build price $..., milestones N, plans for projection: ..., running costs: ...
Legal drafts: <privacy, terms, DPA,...> or none
```

## When to ask (max 4 questions, one round)
Ask only when the answer changes the build and the brief gives no hint:
- Brand name (if the user likely has one)
- Which portals are in scope (if the brief is ambiguous about the business side)
- Target market/language (if nothing hints at it)
- Whether to include proposal/pricing pages (if the user only wants the product demo)
Everything else: decide, note it in the spec, move on.
