# 03 — Information architecture

> Every screen we are building, the flow between them, and the user journeys they serve.

---

## 1. Three product surfaces

| Surface | Purpose | Primary users |
|---------|---------|---------------|
| **Mobile app (iOS + Android)** | The shopping experience. The product. | Gen-Z buyers, 18–32, urban India. |
| **Web app (klydo.in/shop)** | Browser shopping for users who don't have the app yet, or are at a desktop. Shareable product URLs. | First-touch users, desktop shoppers, gift-buyers, link-from-WhatsApp visitors. |
| **Landing page (klydo.in)** | Brand surface, app-download driver, press / careers / about. | Press, partners, recruits, first-time visitors. |

The three share a single design system, a single brand voice, and a single React/HTML codebase. They are not three projects; they are one product expressed three ways.

---

## 2. Mobile app — sitemap

### Tab bar (5 tabs, bottom)

1. **Feed** — vertical-scroll discovery. The home.
2. **Drops** — today's curated drops, with countdowns.
3. **Stylist** — AI stylist chat. Conversational.
4. **Bag** — try-on basket + cart + orders in progress.
5. **You** — profile, orders, saved, wallet, addresses, settings.

### Full screen list

**Onboarding (first launch)**
- Splash → 3 value-prop cards (Speed / Try / Curation) → Phone OTP → Style quiz (5–7 cards) → Permission asks (location, notifications) → Land on Feed.

**Feed**
- Feed home (vertical scroll, full-bleed product cards with model imagery)
- Filter sheet (size, price, brand, color, occasion)
- Product detail (hero gallery, swatches, sizes, "Try it on" sticky CTA, similar drops, brand info)
- Brand profile (drops from one brand)

**Drops**
- Drops home (today's drops grid, countdowns, ink-black mood)
- Single drop view (curated set, "Add all to try-on")
- Past drops archive

**Stylist**
- Chat home (suggested prompts: "Outfit for tonight," "Office casual," "Brunch tomorrow")
- Chat conversation (text + image attachments + AI-generated outfit cards)
- Outfit card → tap → product detail or "Try the whole look"

**Bag**
- Try-on basket (items going out for try-on; max 6)
- Order in progress (live tracking, ETA, courier's face/phone)
- Try-on session screen (active when courier arrives — 15-min trial timer, "Keep" / "Return" per item)
- Receipt / kept items
- Empty state (with one suggested drop)

**You**
- Profile (avatar, name, style profile summary)
- Orders (history, status, returns)
- Saved (private wishlist)
- Wallet (credit balance, refunds)
- Addresses (home, work, custom — with delivery ETA per address)
- Style profile (the quiz answers — editable)
- Settings (notifications, language, payment methods, sign-out)
- Help & support (WhatsApp-first, then in-app chat)

---

## 3. Web app — sitemap

Desktop and mobile-web. Path: `klydo.in/shop/*`. Authenticated.

- `/shop` — Feed (single-column on mobile-web, 2-up editorial on desktop)
- `/shop/drops` — Drops index + single drop
- `/shop/p/[slug]` — Product detail (the shareable URL)
- `/shop/c/[category]` — Category browse
- `/shop/b/[brand]` — Brand profile
- `/shop/stylist` — AI stylist (works in browser too)
- `/shop/bag` — Bag
- `/shop/orders` — Orders + try-on tracking
- `/shop/you` — Profile + settings
- `/shop/checkout` — Single-page checkout

Critical: every product page is a first-class shareable URL with rich previews for WhatsApp, Instagram, X. Open Graph image is the product hero.

---

## 4. Landing page — sitemap

`klydo.in` is **not** a download wall. It is the brand statement.

- `/` — Hero (the manifesto + drop-of-the-day preview + app download)
- `/how-it-works` — Three steps (Pick → Try → Keep). Big, beautiful, animated.
- `/drops` — Public drops gallery (the same content as the app's drops, mirrored)
- `/about` — Who we are, why we exist, where we operate
- `/press` — Coverage, brand assets, contact
- `/careers` — We're hiring
- `/help` — FAQ + WhatsApp support
- `/legal/[doc]` — Privacy, terms, returns, shipping

Anonymous browsing on `/`, `/drops`. Sign-in lifts the user into `/shop/*` (the web app).

---

## 5. Five user journeys

The journeys we design for explicitly. If a journey isn't on this list, we don't build for it — we don't add the feature.

### J1 — First-time discover → first try-on (the activation loop)

WhatsApp link from friend →
`klydo.in/shop/p/oversized-tee-cobalt` (web product page, no app needed) →
"Try it on in 30 min" CTA →
Phone OTP →
Address (with live ETA: "trying at 6:42pm") →
Choose UPI or COD →
"Order placed" with courier card →
*30 min later* →
Try-on session screen → Keep / Return →
Receipt + "Today's drop" upsell.

**Success metric:** time from link-click to order-placed < 4 minutes.

### J2 — Returning user impulse buy

App open → Feed → 4 swipes → tap **Try it on** → sticky bottom sheet ("Going out for try at 7:15pm?") → confirm → done.

**Success metric:** ≤ 7 taps from app-open to order.

### J3 — AI stylist consultation → outfit ships

Stylist tab → "Outfit for tonight, dinner, smart casual" → AI returns 3 outfit cards → tap **Try this look** → all items added to try-on basket → confirm.

**Success metric:** ≥ 30% of stylist sessions end in an order.

### J4 — Multi-item try-on, partial keep

Order arrives → try-on screen → mark 2 of 5 items **Keep** → checkout for kept items (UPI/COD) → courier walks away with 3 returns.

**Success metric:** keep-rate ≥ 50% (anything lower means we recommend badly).

### J5 — Friend share → group decision

User on product detail → **Share to WhatsApp** → WhatsApp opens with image + 1-line copy + link → friend taps → web product page → **Try it on** / "Order for them" / "Get it for myself."

**Success metric:** ≥ 15% of shared links convert to an order within 48h.

---

## 6. What we are explicitly not building

To enforce restraint (Principle 8), the following are out-of-scope for the redesign. We say no, on purpose:

- Live shopping / video shopping channels.
- User-generated reviews (deferred to v2).
- Social feed (follow friends, see their saves).
- In-app games / scratch cards / spin-the-wheel.
- "Mall" mode (every brand has its own micro-store).
- Coupons. We don't run a coupon book.

We can revisit any of these later. We do not lose discipline to add them today.
