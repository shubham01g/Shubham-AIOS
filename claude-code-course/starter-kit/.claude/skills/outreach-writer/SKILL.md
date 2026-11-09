---
name: outreach-writer
description: Write short, personalised cold email DRAFTS for leads from the Lead Finder database. Use when I say "write outreach", "draft emails for my top leads", or "/outreach-writer top 10". Drafts only, never sends.
---

# outreach-writer

Writes one personalised cold email draft per lead. **Never sends anything.** I read and send every email myself.

## Input
- `top N` → the N highest-scoring leads with status `new` or `researched`
- or a business name / lead ID

## Steps
1. Load the lead(s) from the Lead Finder database.
2. If `lead-researcher` results exist for the lead, use them. If not, read the lead's website and Google reviews yourself.
3. Pick **one specific, true detail** about their business (from their site or reviews). Not a compliment, an observation.
4. Pick **one problem** that detail points to that I can solve (see `context/offer.md`).
5. Write the email using the rules below.
6. Save it to `clients/drafts/{lead-slug}.md` with the subject line on top.
7. Set the lead's status to `drafted` in the database.
8. At the end, list the drafts written plus anything you weren't sure about.

## Email rules
- Under 90 words. Plain text. No links, no images, no attachments.
- First line is about THEM, not me.
- One problem, one outcome, one ask: "Worth a 15-minute call?" or "Want me to send a 2-minute video showing how?"
- Subject: 2–5 words, lowercase is fine, no clickbait.
- Sound like a human who did their homework. Short sentences.
- Never: "I hope this finds you well", "I came across your website", "revolutionise", "leverage", "game-changer".
- Only claim results I've actually delivered (see `context/about-me.md`). For a new niche, offer "what I'd build for you". If unsure, ask me instead of guessing.

## Learned from feedback
<!-- Add one line every time I correct a draft. -->
- 
