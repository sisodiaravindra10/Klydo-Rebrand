# 02 — Design principles

> Ten rules we govern by. When two conflict, the lower-numbered one wins.

These are not aspirations. They are the constitution of the redesign. Every screen, every interaction, every line of copy is checked against this list. If we cannot defend a decision against these principles, the decision is wrong.

> **History note.** Iteration 1 of this doc framed Principle 2 as "editorial taste" (Vogue-restrained: editorial serif, whitespace, single accent). That was rejected in user review as too quiet for the Gen-Z audience. Principle 2 is now reframed as **graphic-poster taste** — chunky bold sans, color-block sections, density, marquees, lowercase voice. See `klydo-direction-pivot` memory for context.

---

## 1. Feed-native, not grid-native

**Do.** Vertical, full-bleed, one product at a time, big imagery, scroll-snap.
**Don't.** 2-column infinite grid of tiny tiles.
**Why.** Gen Z's eye is trained by Instagram, TikTok, and Reels. The grid is e-commerce muscle memory; the feed is how they actually look at clothes. Grids exist only where the user has narrowed intent (a category, a search result).

## 2. Graphic-poster taste, quick-commerce speed

**Do.** Chunky bold sans (Bricolage Grotesque) at poster sizes. Color-block sections — full-bleed lime, ink, hot pink. Layered stickers, stamps, and tags. Marquees as live signals. Lowercase telegraphic copy. Paired with sub-300ms tap response and instant CTAs.
**Don't.** Editorial restraint, magazine-display serif, generous-whitespace luxury layouts. Anything that reads "minimalist tech startup" or "high-end print magazine."
**Why.** Gen Z's aesthetic ceiling is set by TikTok, Snitch's IG feed, Glossier's later loud era, Coperni's futurism — not by *Vogue* print. The speed floor is set by Blinkit. We pull bold graphic posters and 30-minute delivery into the same product.

## 3. Speed is the brand. Surface it on every screen.

**Do.** Show ETA on every product card. Live countdown on drops. Driver's face on tracking. "Trying on by 6:42pm" instead of "Estimated delivery 2–4 hours." Use the marquee ticker to repeat speed messages.
**Don't.** Hide speed inside checkout. Treat 30-minute delivery as a spec line in a feature list.
**Why.** Our unfair advantage decays if the user has to dig for it. Make it impossible to miss.

## 4. Try-before-pay is the hero verb, not a feature toggle.

**Do.** The primary CTA on every product is **"try"** — not "Add to bag." Buying is what happens after try. Set "try" in the brand's lime accent whenever it stands alone. Italics + lime for emphasis.
**Don't.** Bury try-on as a checkbox in checkout. Mention it once in onboarding and never again.
**Why.** 60% of fashion returns in India are size-fit. Try-before-pay removes the risk that kills conversion. It is also our hardest habit to build — repetition reinforces it.

## 5. One thumb. Everything within reach.

**Do.** Primary actions in the bottom third. Tap targets ≥ 48px. Lock the most important verb to a bottom-sticky on mobile.
**Don't.** Put the buy button in the top-right because "that's where iOS puts done."
**Why.** Indian Gen Z shops on the train, in the autorickshaw, in bed, in the bathroom. One hand. Right thumb. We design for that posture or we lose.

## 6. India built in, not retrofitted.

**Do.** COD as a first-class payment option on the same level as UPI. WhatsApp share on every product. Localizable strings from day one. Pricing in ₹ with proper Indian grouping ("1,29,999" not "129,999"). Address picker that knows "opposite the Domino's, near the Cafe Coffee Day."
**Don't.** Build a global app and add "India features" later as a settings toggle.
**Why.** India is the home market. Retrofits always look retrofitted.

## 7. Motion must mean something.

**Do.** Animate to signal state change, hierarchy, or causality. Marquee tickers signal "live." Color-block transitions on tap. Tap responses in <100ms.
**Don't.** Decorative confetti, parallax for parallax's sake, infinite bounce easing.
**Why.** Motion is a language. Misused, it's noise. Used well, it makes the app feel alive and trustworthy.

## 8. Restraint over feature creep.

**Do.** Ship five features that work like a knife. Cut the home screen down to one job per surface.
**Don't.** Ship 47 features that all degrade each other. Add a "trending" rail because a competitor has one.
**Why.** The competition's home screen has nine modules and the user remembers none of them. Our home screen has one — and they remember.

> **Important clarification.** "Restraint over feature creep" does **not** mean "visual restraint." We are visually loud (Principle 2). We are *featurally* restrained — fewer things on the screen, each one doing more.

## 9. Show the product, not the chrome.

**Do.** Photography fills 80%+ of the product page. UI recedes. Type and chrome are quiet supports — even when type is huge (Principle 2), it gets out of the way of the garment.
**Don't.** Floating action buttons that overlap the model's face. Bottom sheets that hide the garment.
**Why.** People buy clothes by looking at clothes. Every pixel of UI we add is a pixel of clothing they don't see.

## 10. The price is the price.

**Do.** Show the final price clearly. If there's a discount, show what was paid most recently — not a fake inflated MRP. Prices in JetBrains Mono, tabular numerals.
**Don't.** Write "₹2,999 ~~₹9,999~~" when the real shelf price has been ₹2,999 for six months. Don't manipulate.
**Why.** Trust compounds. India has been burned by every marketplace's fake-MRP theatre. Klydo is the one that doesn't do it.

---

## How to use this list

In every review:
1. Name which principle the change reinforces.
2. Name which principle, if any, it tensions against.
3. If two principles tension, the lower-numbered one wins. (Feed-native beats Graphic-poster. Graphic-poster beats Speed-as-brand. And so on.)

The rank is on purpose. The product makes sense in this order.
