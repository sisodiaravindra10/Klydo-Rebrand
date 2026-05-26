# Deploy guide: GitHub + Vercel

The Next.js project lives in `web/`. Vercel and Next.js are the same family, so deploys are one-click once the repo is on GitHub.

## 1. Create the GitHub repo

```bash
cd "/Users/zop.dev/Downloads/klydo redesign"

# If git isn't initialised yet:
git init -b main

# Add and commit everything
git add .
git commit -m "Klydo speculative rebrand: foundation + landing + 32-route app"

# Create the GitHub repo and push. Either:

# Option A: with the gh CLI (easiest)
gh repo create klydo-rebrand --public --source=. --remote=origin --push

# Option B: if you don't have gh
# 1. Create an empty repo at github.com/new (name it klydo-rebrand)
# 2. Then:
git remote add origin https://github.com/[your-username]/klydo-rebrand.git
git push -u origin main
```

If the CEO is the audience, **public repo** is better — they can browse code directly without a permission ask.

> **One thing to double-check before pushing:** there are no secrets in the repo. There shouldn't be any (the project has no API keys, no `.env`), but run `grep -rni "api[_-]key\|secret\|token" --include="*.ts" --include="*.tsx" --include="*.env*"` from the root if you want to be sure.

## 2. Connect to Vercel

Two ways. **The dashboard way is more reliable for first-time setup.**

### Dashboard (recommended)

1. Open [vercel.com/new](https://vercel.com/new), sign in with your GitHub account.
2. Click **Import** next to the `klydo-rebrand` repo.
3. **Root directory:** click "Edit" and set it to `web` (the Next.js app lives in `web/`, not the repo root).
4. **Framework Preset:** Vercel auto-detects Next.js. Leave defaults.
5. **Environment variables:** none required. The project has zero env dependencies.
6. Click **Deploy**.

You should have a live URL in about 2 minutes. It'll look like `klydo-rebrand-[hash].vercel.app`.

### CLI

```bash
npm i -g vercel
cd "/Users/zop.dev/Downloads/klydo redesign/web"
vercel
# Answer the prompts: link to your account, name the project, deploy.
```

## 3. Wire a friendlier URL (optional, recommended for the CEO)

The default `vercel.app` URL has a hash in it. Two ways to make it cleaner:

### Rename in Vercel dashboard

1. Vercel project → Settings → Domains
2. Add `klydo-rebrand.vercel.app` (or whatever's available)
3. Set it as the production domain

### Use a real domain you own

Same Domains screen. Add `klydo.[yourdomain].com`, follow the DNS instructions Vercel shows.

## 4. Smoke test the deployed URL

Once Vercel says deployed, hit these in order in a real browser:

- `[your-url]/` — landing page
- `[your-url]/app` — homepage (the new portal)
- `[your-url]/app/feed` — TikTok-style scroll feed
- `[your-url]/app/drops` — product listing with filter chips
- `[your-url]/app/p/snitch-oversized-cotton-tee` — product detail with multi-image gallery
- `[your-url]/app/try` — try-on session (15-min countdown should be ticking)
- `[your-url]/app/welcome` — onboarding (5-step)
- `[your-url]/app/b/snitch` — brand profile
- `[your-url]/app/notifications` — push notification mock
- `[your-url]/app/bag?empty=1` — empty-state demo

Every one should return a real screen. If any 404 or look broken, ping me before sending the email.

## 5. Things to know before the CEO opens it

- **The phone-frame mockup** shows up on desktop. On mobile the app fills the screen edge-to-edge (correct behavior).
- **The countdown timers are real** — both the 7pm drop timer (across multiple screens) and the 15-min try-on timer. The CEO will notice if they're ticking. They will be.
- **Photos are from Unsplash**, hot-linked through Next.js Image optimization. If Unsplash ever rate-limits, the photos break — unlikely, but for a high-stakes demo, you can swap them with self-hosted versions later.
- **`/app/try` checkout flow** routes through `/app/checkout` → success state. The whole shopping loop is clickable end-to-end.
- **No real backend.** Phone OTP accepts any 4 digits. Payment is a 1.5-second simulated processing. Data is hardcoded. The deck is upfront about this.

## 6. After-the-fact polish (only if you have time)

If you get traction with the CEO, these are quick wins for v2 of the demo:

- Replace the Unsplash photos with brand-licensed product imagery (if Klydo team gives you any)
- Add a real `next/seo` config for OG-image previews when the URL is shared
- Plug in Plausible / Vercel Analytics so you can see if the CEO opened it 5 times or 0
- Custom domain (klydo-redesign.com is probably available)

## 7. Removing it later

When you're done with the demo, either:
- Pause the Vercel project (Dashboard → Settings → Pause)
- Delete the GitHub repo (or make it private)
- Or leave it as a portfolio piece. It's a strong one.

Good luck. Ship it.
