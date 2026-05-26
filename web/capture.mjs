import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "../pitch/screenshots";
await mkdir(OUT, { recursive: true });

const HOST = "http://localhost:3000";

// App screens captured at desktop with phone-frame visible.
// Each entry: [URL path, output filename, optional scroll-to selector]
const shots = [
  // Landing
  { url: "/", file: "01-landing-hero.png", scroll: 0, viewport: { width: 1440, height: 900 } },
  { url: "/", file: "02-landing-todays-drop.png", scroll: 950, viewport: { width: 1440, height: 900 } },
  { url: "/", file: "03-landing-worn-bengaluru.png", scroll: 2700, viewport: { width: 1440, height: 900 } },
  { url: "/", file: "04-landing-how-it-works.png", scroll: 4900, viewport: { width: 1440, height: 900 } },

  // App screens (phone-frame visible on desktop)
  { url: "/app", file: "10-app-home.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/feed", file: "11-app-feed.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/drops", file: "12-app-drops.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/p/snitch-oversized-cotton-tee", file: "13-app-product-detail.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/bag", file: "14-app-bag.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/try", file: "15-app-try-on.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/checkout", file: "16-app-checkout.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/orders/klyd-3829", file: "17-app-order-tracking.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/welcome", file: "18-app-onboarding.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/b/snitch", file: "19-app-brand-profile.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/notifications", file: "20-app-notifications.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/search", file: "21-app-search.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/stylist", file: "22-app-stylist.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/you", file: "23-app-you.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/saved", file: "24-app-saved.png", viewport: { width: 1440, height: 1000 } },
  { url: "/app/bag?empty=1", file: "25-app-bag-empty.png", viewport: { width: 1440, height: 1000 } },
];

const browser = await chromium.launch();

for (const shot of shots) {
  const context = await browser.newContext({
    viewport: shot.viewport ?? { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();
  try {
    await page.goto(`${HOST}${shot.url}`, { waitUntil: "networkidle", timeout: 30_000 });
  } catch {
    // Some pages have continuous timers; fall back to domcontentloaded
    await page.goto(`${HOST}${shot.url}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
  }
  // Let fonts + first image paint
  await page.waitForTimeout(900);
  if (shot.scroll !== undefined) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), shot.scroll);
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `${OUT}/${shot.file}`, type: "png", fullPage: false });
  console.log("✓", shot.file);
  await context.close();
}

await browser.close();
console.log("done.", shots.length, "screenshots →", OUT);
