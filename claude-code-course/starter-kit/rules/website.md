# Website rules

Copy this to `.claude/rules/website.md` and link it from CLAUDE.md.

## Before building
- Read `brand/brand.md`, `brand/logo.*` and any `brand/inspiration*.png` first.
- Ask me questions one at a time until you're 95% sure what I want. Then show a plan.

## Design
- Match the feel of the inspiration screenshot: spacing, type scale, colour use. Don't copy its text or branding.
- One clear call to action, repeated at the top and the bottom.
- Mobile first. Nothing may scroll sideways at 390px.
- Real contrast. Body text at least 16px.
- No stock-photo clutter. If an image doesn't help, leave it out.

## Honesty (non-negotiable)
- No fake testimonials, no fake client logos, no invented stats or "trusted by 500+ businesses".
- If a section needs proof I don't have yet, write "what we'd build for you" instead.
- Only list services I actually offer.

## Verify loop (every change)
1. Open the page with Playwright.
2. Take full-page screenshots at 1440px and 390px.
3. Look at them. Compare with the inspiration. Check: overflow, cropped images, contrast, broken links, placeholder text left in.
4. Fix what's off and repeat until it's right.
5. Only then tell me it's done, and show me the screenshots.

## Shipping
- Work on localhost. Never push unless I say "push".
- After a push, confirm the live URL loads and the change is visible.
