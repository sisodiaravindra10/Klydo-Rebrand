import Link from "next/link";
import { Mark } from "./Mark";

const cols = [
  {
    label: "shop",
    links: [
      { href: "/drops", text: "Today's drop" },
      { href: "/brands", text: "Brands" },
      { href: "/stylist", text: "AI stylist" },
    ],
  },
  {
    label: "company",
    links: [
      { href: "/about", text: "About" },
      { href: "/press", text: "Press" },
      { href: "/careers", text: "Careers" },
    ],
  },
  {
    label: "help",
    links: [
      { href: "/help/returns", text: "Returns" },
      { href: "/help/faq", text: "FAQ" },
      { href: "https://wa.me/", text: "WhatsApp" },
    ],
  },
  {
    label: "legal",
    links: [
      { href: "/legal/privacy", text: "Privacy" },
      { href: "/legal/terms", text: "Terms" },
      { href: "/legal/shipping", text: "Shipping" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="get-app" className="bg-paper">
      {/* Get-the-app block */}
      <div className="border-t border-paper-line">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-28 lg:px-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 label text-ink-quiet">
                <span className="h-1.5 w-1.5 rounded-full bg-pink pulse" aria-hidden />
                <span>get the app</span>
              </div>
              <h2 className="display mt-6 font-extrabold text-[44px] leading-[0.92] tracking-[-0.04em] md:mt-8 md:text-[88px] lg:text-[120px]">
                wear it tonight<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 max-w-[36ch] text-[16px] text-ink-soft md:mt-8 md:text-[18px]">
                Live in Bengaluru. Coming soon to Mumbai, Delhi, Hyderabad.
                iOS and Android.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:col-span-5 md:items-end md:justify-center">
              <Link
                href="https://apps.apple.com/in/app/klydo-fashion-in-minutes/id6752856397"
                className="inline-flex items-center justify-between gap-6 rounded-full bg-ink px-6 py-4 text-paper transition-all hover:bg-ink-soft active:scale-[0.98] md:min-w-[280px]"
              >
                <span className="text-[15px] font-semibold">App Store</span>
                <span aria-hidden className="text-lime text-lg">↓</span>
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.klydo.app"
                className="inline-flex items-center justify-between gap-6 rounded-full bg-ink px-6 py-4 text-paper transition-all hover:bg-ink-soft active:scale-[0.98] md:min-w-[280px]"
              >
                <span className="text-[15px] font-semibold">Google Play</span>
                <span aria-hidden className="text-lime text-lg">↓</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap + meta */}
      <div className="border-t border-paper-line">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-12 md:py-16 lg:px-20">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <Mark size="lg" />
              <p className="mt-6 max-w-[26ch] text-[14px] text-ink-soft">
                Fashion in thirty. Drop. Try. Keep what fits.
              </p>
            </div>

            {cols.map((col) => (
              <div key={col.label} className="md:col-span-2">
                <div className="label text-ink-quiet">{col.label}</div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-ink transition-colors hover:text-ink-soft"
                      >
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-paper-line pt-6 text-[12px] text-ink-quiet md:flex-row md:items-center md:justify-between md:gap-8">
            <span>made in bengaluru.</span>
            <span>© {new Date().getFullYear()} vibio tech pvt ltd</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
