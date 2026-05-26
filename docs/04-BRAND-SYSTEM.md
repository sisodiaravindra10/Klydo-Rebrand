# 04 — Brand & design system

> The tokens, type, color, and motion that every Klydo surface inherits. Change a value here, every screen changes.

> **v2 — graphic-poster direction.** This doc was rewritten after iteration 1 was rejected as too editorial / Vogue-restrained. Live in the codebase at `web/src/app/globals.css`. See `klydo-direction-pivot` memory for the why.

---

## 1. Brand essence

- **One sentence.** Klydo is the fashion app you scroll between meetings, try at your door, and wear before 8pm.
- **Three words.** Fast. Loud. Honest.
- **The verb.** *try.*

---

## 2. Voice

We sound like a friend who works in fashion, not a brand that sells fashion. Short. Lowercase. Direct.

| | Do | Don't |
|---|----|----|
| Length | One sentence beats three. Four words beats one sentence. | "Discover the latest collection of..." |
| Case | Lowercase for hero headlines, drop names, section heads. Sentence case for body. | All Caps everywhere. Title Case for hero. |
| Tense | Present. "Drops at 7." | "Will be dropping soon!" |
| Energy | Confident, not eager. | "OMG you have to see this 🔥🔥🔥" |
| Honesty | Direct about price, fit, timing. | "Up to 80% off! Hurry!" |
| Punctuation | The hot-pink full stop is a signature accent. End hero phrases with one. | Three exclamation marks. Or any. |

**Sample copy in voice.**
- Push: *"7pm drop. eight pieces. they go fast."*
- Empty cart: *"nothing in your bag yet. tonight's drop in 2h 14m."*
- Try-on confirm: *"trying at 6:42pm. pay only for what you keep."*
- Return: *"all five going back. refund hits your upi by morning."*
- Hero: *"fits, in thirty."* / *"wear it tonight."*

---

## 3. Color tokens

Multi-accent palette. Surfaces stay restrained (cream + ink) so the brand colors can be **used in big blocks** without becoming chaos.

```css
/* Surfaces */
--paper:        #FAF7F2;  /* warm cream — primary canvas */
--paper-soft:   #F0EDE7;  /* cards, secondary canvas */
--paper-line:   rgba(15, 15, 15, 0.08);  /* 1px hairlines */

/* Ink */
--ink:          #0E0E0E;  /* primary text, dark hero panels */
--ink-soft:     #2A2A2A;
--ink-quiet:    #7A7A7A;

/* Brand colors — used as color-blocks, not as quiet accents */
--lime:         #D8FF3D;  /* the CTA / brand mark / try verb */
--lime-deep:    #B5E600;
--pink:         #FF3D7F;  /* hot pink — urgency, drop energy, signature full stop */
--pink-deep:    #E02368;
--cobalt:       #2D6EFF;  /* electric cobalt — keep / interactive */
--cobalt-deep:  #1F56E0;
--sunset:       #FF6B35;  /* warm sunset — try-on action, accent */
--clay:         #C2452D;  /* clay — earthy red, secondary urgency */

/* Signals */
--mint:         #1F7A4C;
--amber:        #B8860B;
```

### Where each color goes

| Color | Role | Examples |
|-------|------|----------|
| **paper** | Canvas of light sections | Landing body, Today's Drop, footer |
| **ink** | Canvas of dark sections + primary text | How-it-works panel, hero right-half, body text |
| **lime** | Primary CTA, brand mark dot, "try" verb, drop-card live indicator, color-block hero panels | Get the app pill, "try" emphasis |
| **pink** | Hot urgency, the **signature full stop** accent, "live" pulse | Period after "fits, in thirty." |
| **cobalt** | Interactive accents, the "keep" verb in How-it-works | Step 3 in How-it-works |
| **sunset** | Try-on action accent (rare) | Stamp graphic, occasional cards |
| **clay** | Earthy secondary urgency (rare) | Color-swatch placeholder cards |

### Color-block discipline

- A section is either **paper**, **ink**, or **lime**. Never striped or gradient.
- Hero may **split** into two color-blocks (lime + ink) — a deliberate move, not the default.
- Pink, cobalt, sunset, clay appear as **content elements** inside color-blocks (cards, periods, stamps), not as section backgrounds.

---

## 4. Typography

Three families, distinct jobs.

```css
--font-display: "Bricolage Grotesque" (variable), "Inter", system-ui, sans-serif;
--font-sans:    "Inter Variable", "Inter", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace;
```

- **Bricolage Grotesque** — chunky, slightly playful, has variable weight (200–800) and an optical-size axis. Used for headlines, drop names, section heads, brand mark. **800 weight for hero / poster sizes.**
- **Inter** — UI workhorse. Body, buttons, labels, navigation.
- **JetBrains Mono** — prices, timers, addresses, order IDs, drop numbering (01 / 08). Numbers want monospace.

### Mobile type scale

| Token | Size / line-height | Weight | Use |
|-------|---|---|---|
| `poster-xl` | 72 / 64 | 800 | Mobile hero ("fits, in thirty.") |
| `poster-lg` | 56 / 52 | 800 | Section heads ("today's drop.") |
| `display-md` | 44 / 42 | 700 | Drop name, brand statement |
| `display-sm` | 32 / 36 | 700 | Card titles in dense layouts |
| `title-lg` | 24 / 30 | 600 | Screen titles |
| `title-md` | 20 / 28 | 600 | Subhead |
| `body-lg` | 16 / 24 | 400 | Body |
| `body` | 14 / 22 | 400 | UI body |
| `body-sm` | 13 / 20 | 400 | Caption secondary |
| `label` | 11 / 16 | 500 | UPPERCASE, +0.1em tracking — labels, tabs |
| `mono-price` | 18 / 22 | 600 | Prices |
| `mono-timer` | 44 / 44 | 400 | Live timer (drop, ETA) |

### Desktop type scale

| Token | Size / line-height | Use |
|-------|---|---|
| `poster-xl` | 208 / 192 | Desktop hero |
| `poster-lg` | 112 / 100 | Section heads |
| `display-md` | 80 / 76 | Drop name |
| `mono-timer` | 80 / 76 | Live timer |

Body sizes stay at 16/14 across breakpoints.

### Letter-spacing discipline

- Display/poster: **-0.04em** tracking (tight; chunky letters need it).
- Body: 0 default.
- Labels (uppercase): **+0.1em**.

---

## 5. Spacing scale

4-base. Use these values; nothing in between.

```
0, 4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 120, 160
```

**Defaults.**
- Horizontal screen padding: **20** (mobile), **48** (md), **80** (lg)
- Section vertical rhythm: **80** (mobile), **112** (md), **128** (lg)
- Card padding: **16** (mobile), **20** (md)
- Stacked content gap inside cards: **8**

---

## 6. Radius

Mostly sharp. Editorial sharpness still serves us — only buttons, chips, and avatars round.

```css
--r-0:    0;        /* default — cards, surfaces, color-blocks */
--r-1:    4px;      /* small chips */
--r-2:    12px;     /* sheets / modals */
--r-3:    20px;     /* large floating panels */
--r-pill: 999px;    /* buttons, pills, avatars */
```

---

## 7. Elevation

Hairlines over shadows. The product is flat.

```css
--e-0: none;
--e-1: inset 0 -1px 0 var(--paper-line);    /* divider style */
--e-2: 0 8px 24px rgba(10, 10, 10, 0.06);   /* floating toasts only */
--e-3: 0 24px 60px rgba(10, 10, 10, 0.10);  /* modal lift only */
```

Most surfaces use `--e-0` or `--e-1`. Heavy shadow = mall-app energy. Avoid.

---

## 8. Motion

```css
--m-fast:    160ms;   /* tap response */
--m-base:    240ms;   /* default transition */
--m-slow:    400ms;   /* page change, sheet */
--m-deep:    640ms;   /* large reveal */

--ease-out:  cubic-bezier(0.22, 1, 0.36, 1);
--ease-in:   cubic-bezier(0.64, 0, 0.78, 0);
--ease-io:   cubic-bezier(0.83, 0, 0.17, 1);

/* Spring (Framer Motion) */
--spring:        { stiffness: 380, damping: 30 }
```

### Signature motions

- **Marquee ticker.** Two speeds: 22s (fast), 38s (base), 60s (slow). Hover pauses. Use for "live" signals — top promo strip, brand strip.
- **Tap feedback.** Scale to 0.97 in 100ms, return with spring.
- **Page transition.** Slide-and-fade, 400ms.
- **Stamp spin.** 18s linear infinite, for circular stamp graphics in hero / promo areas.
- **Reveal on mount.** `rise` keyframe — translateY(14px) → 0 + opacity, 720ms ease-out.
- **Reduced-motion.** All transforms become opacity-only fades, 240ms. Marquees and spins disabled.

---

## 9. Iconography

Custom set, monoline 1.5px, 24×24 frame. No filled. No emoji.

We need ~20 icons total. Commission them. Don't pull from libraries.

Until the custom set ships: **Phosphor Light (1.5)** as the placeholder. *Never* Lucide or Material — they read as "AI demo app."

---

## 10. Photography direction

- **Subject.** Real model, real garment, real human posture. No floating clothes. No mannequin shots.
- **Light.** Soft, directional, slight warmth (3500–4500K). Avoid hard ringlight.
- **Crop.** Top-of-thigh to top-of-head for feed. Full body for drops. Detail crops for swatches.
- **Background.** Solid paper-cream OR a real interior (café, street, bedroom — cropped tight). Never green-screened lifestyle stock.
- **Color science.** Slight desaturation (-8%), subtle film-grain (1–2%), warm shadow tint. The "Klydo grade."
- **Aspect.** 4:5 vertical for feed. 3:4 for product detail. 16:9 only for editorial blocks.

### Until we have photography

For prototype and pre-launch surfaces, **use solid color-swatch cards** in place of product photos. Each card is a flat brand color (lime / pink / cobalt / sunset / ink / clay) with garment name, brand, price, and "try ↗" pill set on top. Reads as a "mood board" rather than a placeholder.

---

## 11. Graphic elements

The v2 direction introduces three recurring graphic devices.

### Marquee ticker
A horizontal scrolling strip of short phrases. Used at:
- Top of every page (above nav), dark variant, brand-voice messages
- Brand strip section, lime variant, brand names
- Anywhere we need to feel "live"

### Stamp / sticker
A circular badge, slightly rotated, with a big number + small label inside. Optional rotating SVG text around the perimeter. Used at:
- Hero (e.g., "30 MIN DELIVERY")
- Drop announcements
- Press / launch moments

### Numbered cards
Catalog-style numbering on every product / drop / step card: `01 / 08`, `02 / 08`, etc. In JetBrains Mono, small, top-corner. Gives any list a "limited drop" feel.

---

## 12. Don'ts (the v2 list)

The brand fails if any of these slip in:

- ❌ Editorial display serif (Instrument Serif, Tiempos, GT Sectra) — we tried this in v1, it was wrong.
- ❌ Soft "luxury" pastel gradients (purple-blue, pink-orange — "AI startup" tells).
- ❌ Glassmorphism / frosted blur backgrounds.
- ❌ 3D blob illustrations.
- ❌ Stock photography of "happy diverse shoppers."
- ❌ Emoji in headlines.
- ❌ Carousel banners on the home screen.
- ❌ Fake MRP strikethrough.
- ❌ Drop-shadow on text.
- ❌ "Discover" as a verb.
- ❌ Title Case hero headlines. Lowercase is the voice.
- ❌ Three exclamation marks. Or any.

When in doubt, take the boldest, loudest, most-direct move on the table that still serves Principle 10 (honesty). That is the Klydo answer.
