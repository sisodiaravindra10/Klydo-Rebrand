import Link from "next/link";
import { Mark } from "./Mark";
import { Marquee } from "./Marquee";

const tickerItems = [
  "free try-on at the door",
  "delivered in 30 min",
  "200+ verified brands",
  "drops at 7pm tonight",
  "pay only for what you keep",
  "no fake mrp · no coupon theatre",
  "made in bengaluru",
];

export function Nav() {
  return (
    <>
      {/* Top ticker */}
      <div className="bg-ink text-paper">
        <Marquee
          items={tickerItems}
          speed="base"
          className="label py-2.5"
          ariaLabel="Klydo updates"
        />
      </div>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 border-b border-paper-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:h-16 md:px-12 lg:px-20">
          <Mark />

          <div className="flex items-center gap-1">
            <Link
              href="/app"
              className="hidden items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/[0.12] md:inline-flex"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-lime pulse" aria-hidden />
              open the app
            </Link>
            <Link
              href="#today"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink md:inline-flex"
            >
              tonight&apos;s drop
            </Link>
            <Link
              href="#how"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink md:inline-flex"
            >
              how it works
            </Link>

            <span className="hidden h-4 w-px bg-paper-line md:mx-3 md:inline-block" aria-hidden />

            <Link
              href="#get-app"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-lime-deep md:px-5"
            >
              get the app
              <span aria-hidden>↓</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
