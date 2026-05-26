# Klydo design system

Living tokens at `web/src/app/globals.css`. Canonical longform in `docs/04-BRAND-SYSTEM.md`. This file is the short reference impeccable needs.

## Color strategy

**Committed multi-accent.** Cream + ink anchor the canvas. Lime carries the brand. Pink, cobalt, sunset, and clay each own a specific role and never bleed into the others'. Sections fully commit to one color block at a time (lime panel, ink panel, paper panel). Never sprinkled.

| Token | Hex | Role |
|---|---|---|
| `--paper` | #FAF7F2 | Warm cream canvas (light sections) |
| `--paper-soft` | #F0EDE7 | Card / secondary canvas |
| `--paper-line` | rgba(15,15,15,0.08) | 1px hairlines |
| `--ink` | #0E0E0E | Primary text + dark color-block panels |
| `--ink-soft` | #2A2A2A | Secondary text |
| `--ink-quiet` | #7A7A7A | Tertiary, captions, placeholder |
| `--lime` | #D8FF3D | Primary CTA, brand mark, "try" verb |
| `--lime-deep` | #B5E600 | Lime hover / active |
| `--pink` | #FF3D7F | Urgency, signature full-stop accent, "live" pulse |
| `--cobalt` | #2D6EFF | Interactive accents, "keep" verb |
| `--sunset` | #FF6B35 | Occasional accent (rare) |
| `--clay` | #C2452D | Secondary urgency (rare) |

(OKLCH migration is on the polish list. Current values are hex; visual chroma already harmonized.)

## Theme

Light is the default canvas (paper-cream). Ink-black sections are deliberate color-block moments inside the same theme — not theme switches.

**Physical scene:** Gen Z user, scrolling Klydo at 6:42pm in an auto-rickshaw on Outer Ring Road, Bengaluru. Phone screen at 80% brightness against ambient daylight. Cream feels like paper they could touch. The brand pops because the canvas is warm, not white.

## Typography

```css
--font-display: "Bricolage Grotesque" (variable, 400–800)
--font-sans:    "Inter Variable"
--font-mono:    "JetBrains Mono"
```

- **Display (Bricolage):** chunky, modern, has variable weight + optical-size axis. 800 weight for hero / poster sizes. Letter-spacing `-0.04em` at display sizes.
- **Sans (Inter):** UI workhorse. Body, buttons, labels, navigation.
- **Mono (JetBrains):** prices, timers, addresses, order IDs, drop numbering (`01 / 08`).

### Scale (mobile / desktop)

| Token | Mobile | Desktop |
|---|---|---|
| `poster-xl` | 72/64 | 208/192 |
| `poster-lg` | 56/52 | 112/100 |
| `display-md` | 44/42 | 80/76 |
| `title-lg` | 24/30 | 32/40 |
| `body-lg` | 16/24 | 18/28 |
| `body` | 14/22 | 14/22 |
| `label` | 11/16 UPPER `+0.1em` | same |
| `mono-price` | 18/22 600w | 18/22 600w |
| `mono-timer` | 44/44 | 80/76 |

## Elevation

Hairlines over shadows. Most surfaces flat. `inset 0 -1px 0 var(--paper-line)` for dividers; heavy shadow only on transient floats (toasts, modals).

## Radius

Sharp by default. Radius 0 for cards, panels, color-block sections. Round only:
- buttons, chips, pills: `999px`
- sheets / modals: `12–20px`

## Components shipped (web/src/components/)

- `Mark` — wordmark (lime square + "klydo" Bricolage extra-bold)
- `Nav` — sticky paper nav, dark marquee ticker above
- `Marquee` — scrolling text strip, slow/base/fast
- `Stamp` — circular sticker badge with rotating SVG ring text
- `LiveTimer` — counts down to next 7pm IST
- `Hero` — lime/ink color-block split + drop card
- `TodaysDrop` — 8-card photo grid with color-tint multiply
- `WornInBengaluru` — editorial photo bento
- `Brands` — lime panel + 2-row marquee
- `HowItWorks` — ink panel, 3-step (pick / *try* / keep)
- `Footer` — get-the-app + sitemap

## Motion

- Tap feedback: scale 0.97 → 1 with spring (stiffness 380, damping 30).
- Reveal on mount: `rise` keyframe — translateY(14px) + opacity, 720ms ease-out-quint.
- Marquee: 22s / 38s / 60s linear infinite, pause on hover.
- Stamp ring spin: 18s linear infinite.
- Reduced-motion: all transforms collapse to opacity fades. Marquees and spins disabled.

## Photography direction

Real fashion / lifestyle photography from Unsplash (curated by photo ID). Color-tint multiply overlay on product cards (mix-blend-multiply at 0.78 opacity) keeps the brand palette while preserving garment imagery. Aspect: 4:5 vertical for product feed, 3:4 / 4:3 / 4:5 mixed for editorial bento.

No stock "happy shoppers." No mannequin shots. No green-screen lifestyle.

## Absolute bans (impeccable + Klydo)

- ❌ Em dashes (`—` / `–`) anywhere visible.
- ❌ Side-stripe colored borders on cards.
- ❌ Gradient text (background-clip: text + gradient).
- ❌ Glassmorphism as default.
- ❌ Hero-metric template (big-number-small-label-gradient).
- ❌ Identical card grids repeated.
- ❌ Modal as first thought.
- ❌ Editorial display serif (rejected v1 direction).
- ❌ Soft luxury pastel gradients ("AI startup" tell).
- ❌ Stock "happy shoppers" photography.
- ❌ Title Case hero headlines. Lowercase is the voice.
- ❌ Fake MRP strikethrough.

## See also

- `docs/04-BRAND-SYSTEM.md` — full token reference + voice rules
- `web/src/app/globals.css` — live CSS variables
