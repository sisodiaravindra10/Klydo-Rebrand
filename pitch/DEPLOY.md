# Deploy guide: GitHub + Vercel

The Next.js app lives at the repo root. Vercel and Next.js are the same family, so deploys are one-click.

## 1. Push to GitHub

```bash
cd "/Users/zop.dev/Downloads/klydo redesign"

git status
git add .
git commit -m "Update"
git push
```

The repo is already at https://github.com/sisodiaravindra10/Klydo-Rebrand.

> **Before pushing, scan for secrets** if you've added anything new:
> `grep -rni "api[_-]key\|secret\|token" --include="*.ts" --include="*.tsx" --include="*.env*" .`

## 2. Connect to Vercel

### Dashboard (recommended)

1. Open [vercel.com/new](https://vercel.com/new), sign in with your GitHub account.
2. Click **Import** next to the `Klydo-Rebrand` repo.
3. **Root Directory:** leave as-is (the Next.js app is at the repo root now).
4. **Framework Preset:** Vercel auto-detects Next.js. Leave defaults.
5. **Environment variables:** none required. The project has zero env dependencies.
6. Click **Deploy**.

You should have a live URL in about 2 minutes. It'll look like `klydo-rebrand-[hash].vercel.app`.

### CLI

```bash
npm i -g vercel
cd "/Users/zop.dev/Downloads/klydo redesign"
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
