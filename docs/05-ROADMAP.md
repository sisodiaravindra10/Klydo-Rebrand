# 05 — Roadmap

> The order we ship in. Foundation first, then code, then polish.

---

## Phase 0 — Foundation

**Status:** shipped.

- Competitive audit
- Design principles (v1 → v2 after user review)
- Information architecture
- Brand & design system (v1 → v2 after user review)
- Roadmap

These docs are the design constitution. Every decision cites them.

---

## Phase 1 — Codebase bootstrap

**Status:** shipped.

- ✅ Next.js 16 + TypeScript + Tailwind v4 in `web/`
- ✅ Brand tokens wired as CSS variables in `web/src/app/globals.css`
- ✅ Self-hosted fonts: Bricolage Grotesque + Inter + JetBrains Mono
- ✅ `clsx` + `tailwind-merge` + `motion` installed
- ✅ Component scaffolding: `Mark`, `Nav`, `Marquee`, `Stamp`, `Hero`, `LiveTimer`, `TodaysDrop`, `Brands`, `HowItWorks`, `Footer`
- ✅ Preview running at `http://localhost:3000`

### Pending in Phase 1

- ⏳ Screenshot audit of the existing Klydo app from App Store / Play Store (carry over to before Phase 3)
- ⏳ `/_lab` route exposing every primitive for visual QA (carry over to Phase 5)

---

## Phase 2 — Landing page (klydo.in)

**Status:** v1 shipped (rejected). v2 mostly shipped, polish pending.

### v1 — editorial direction (rejected)

Shipped: Nav, Hero, How-it-works, Footer. Direction was Instrument Serif + single-lime-accent + whitespace-heavy editorial. User flagged as too quiet / too Vogue. Pivoted.

### v2 — graphic-poster direction (current)

Shipped:
1. ✅ **Top marquee ticker** — scrolling brand-voice messages
2. ✅ **Nav** — sticky, lowercase wordmark, lime CTA
3. ✅ **Hero** — lime/ink color-block split, 208px Bricolage display, live drop card with timer, mini color-swatch preview
4. ✅ **Today's Drop** — 8-card numbered color-swatch grid (lime / pink / ink / cobalt / sunset / paper / clay)
5. ✅ **Brands marquee strip** — lime panel + 2-row marquee of 24 brand names
6. ✅ **How it works** — ink panel, 88–112px pick / *try* / keep with pink / lime / cobalt accents
7. ✅ **Footer (Get-the-app + sitemap)** — "wear it tonight." + App Store / Play Store + Made in Bengaluru

### Pending in Phase 2

- ⏳ Polish pass — see Phase 2.5 below
- ⏳ Press / about story block
- ⏳ Customer quotes section
- ⏳ Real photography integration (once available)

### Phase 2.5 — Polish

Targeted refinements informed by user review of v2 screenshots. Specifics in the next session's punch list.

---

## Phase 3 — Mobile app screens

**Goal.** Every critical app screen designed as a coded React component, viewable on `klydo.in/preview/*` in a phone-frame mockup. Real interactions, real motion.

Order:
1. **Feed** — vertical scroll discovery (Principle 1)
2. **Product detail** — try-it-on CTA, sticky bottom
3. **Try-on session** — the moment the courier arrives, 15-min timer
4. **Drops**
5. **AI Stylist chat**
6. **Bag + checkout**
7. **Order tracking**
8. **Onboarding + style quiz**
9. **You / profile / orders / wallet**

---

## Phase 4 — Web app shopping (klydo.in/shop/*)

**Goal.** Browse, share, and buy in a browser — first-class peer to the mobile app.

1. `/shop` — desktop feed + mobile-web mirror
2. `/shop/p/[slug]` — product detail, beautifully shareable
3. `/shop/drops`, `/shop/c`, `/shop/b` — browse surfaces
4. `/shop/stylist` — AI stylist in browser
5. `/shop/bag`, `/shop/checkout` — cart + single-page checkout
6. `/shop/orders`, `/shop/you` — account

Same components, web-adapted layouts.

---

## Phase 5 — Motion + polish + accessibility

- Page transitions across all surfaces
- Reduced-motion alternates
- Color contrast AA pass, focus rings, keyboard nav
- LCP < 2.0s on 4G, TTI < 3.0s
- Image pipeline: AVIF + WebP, blur-up
- Empty / error / offline states for every screen
- Push-notification templates
- App-store screenshots + listing copy
- `/_lab` primitives route

---

## Phase 6 — Cuts & out-of-scope

Deferred. We say no on purpose.

- Live-shopping video
- User reviews
- Social graph
- In-app games / spin-wheel
- Brand micro-stores
- Coupons

(See `03-INFORMATION-ARCHITECTURE.md §6`.)

---

## Cadence

| Step | Sessions | Status |
|---|---|---|
| Foundation | 1 | ✅ done |
| Phase 1 bootstrap | 1 | ✅ done |
| Phase 2 v1 (rejected) | 1 | ✅ done |
| Phase 2 v2 pivot | 1 | ✅ done (this session) |
| Phase 2.5 polish | 1 | ⏳ next |
| Phase 2 finishing (press, about, photos) | 1–2 | ⏳ |
| Phase 3 mobile app | 5–7 | ⏳ |
| Phase 4 web app | 3–4 | ⏳ |
| Phase 5 polish | 2 | ⏳ |
| **Total to launch-ready** | **~15–18 sessions** | |
