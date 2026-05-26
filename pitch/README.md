# pitch/

Everything you need to present the Klydo speculative rebrand to the CEO.

## What's in here

| File | What it is |
|---|---|
| `klydo-rebrand.pdf` | **The main deliverable.** 25-page landscape pitch deck. Cover → why → audit → competitive set → wedge → 10 principles → brand system (color / type / voice) → 12 screen showcases → roadmap → ask → back cover. Brand-color-led, screenshots embedded. |
| `email-to-ceo.md` | Draft email you can copy into Gmail. Fill in `[brackets]` with your name, the Vercel URL, and the GitHub URL. Includes commentary on why each part of the email works. |
| `DEPLOY.md` | Step-by-step deploy guide. Git init → GitHub repo → Vercel import. Includes pre-send smoke-test checklist. |
| `screenshots/` | 20 captured screens (the source images embedded in the PDF). You can use any of these in a LinkedIn post, X thread, follow-up message, or one-pager. |
| `build-deck.py` | The Python script that built the PDF. If you want to tweak the deck (replace the placeholder URLs, change a phrase, reorder slides), edit this and re-run `python3 build-deck.py`. Requires `reportlab` (already installed). |

## Recommended send order

1. **Deploy.** Follow `DEPLOY.md` start-to-finish. ~10 minutes including the smoke test.
2. **Update the PDF** with your live URL and GitHub URL. Open `build-deck.py`, find the `slide_ask` function, replace the `[your-vercel-url]`, `[your-github-url]`, and `[your name · email · phone]` placeholders. Re-run `python3 build-deck.py`.
3. **Smoke-test the live site** against the checklist in `DEPLOY.md §4`.
4. **Personalize the email** (`email-to-ceo.md`). Fill in CEO name, your name, your URLs. Read it out loud once — if it sounds like a script, simplify.
5. **Send.** PDF attached, demo URL in the email body, GitHub URL in the email body. Done.

## What to keep handy in case the CEO replies

- The codebase is at the repo root (src/, public/, package.json). Real Next.js 16, real Tailwind v4, real components. Open to any engineer they introduce you to.
- The strategic docs are in `docs/`. Audit, principles, IA, brand system, roadmap. Self-contained and well-organized.
- `PRODUCT.md` and `DESIGN.md` at the project root summarize the constitution in one page each.

## Re-capturing screenshots

If you change something in the app and want fresh screenshots:

```bash
# Make sure the dev server is running first:
cd "/Users/zop.dev/Downloads/klydo redesign"
npm run dev

# In another terminal:
cd "/Users/zop.dev/Downloads/klydo redesign"
node capture.mjs

# Then rebuild the PDF:
cd pitch
python3 build-deck.py
```

The capture script writes to `pitch/screenshots/`, the build script reads from there.

## One last note

You built this because you cared about the product. That comes through in the work. Don't pre-apologise in the email for "just being a user." A user is the most credible critic of a consumer product, and the CEO knows it.

Good luck.
