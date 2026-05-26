import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { LiveTimer } from "@/components/LiveTimer";
import { products, formatINR, productsByBrand } from "@/components/app/products";
import {
  IconBell,
  IconSearch,
  IconStylist,
  IconHeart,
  IconBag,
  IconArrowRight,
} from "@/components/app/icons";
import { cn } from "@/lib/cn";

const tintMap: Record<string, string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  cobalt: "bg-cobalt",
  sunset: "bg-sunset",
  clay: "bg-clay",
};

const categories = [
  { key: "tops", label: "tops", photo: products[0].photo, tint: "lime" },
  { key: "bottoms", label: "bottoms", photo: products[1].photo, tint: "pink" },
  { key: "co-ords", label: "co-ords", photo: products[4].photo, tint: "sunset" },
  { key: "outerwear", label: "outerwear", photo: products[2].photo, tint: null },
  { key: "indian", label: "indian", photo: products[5].photo, tint: null },
  { key: "denim", label: "denim", photo: products[7].photo, tint: "lime" },
];

const wornPhotos = [
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=520&fit=crop&q=80",
];

const pastDrops = [
  { title: "gallery night", date: "yesterday", photo: products[4].photo, tint: "sunset" },
  { title: "grocery run", date: "wed", photo: products[5].photo, tint: null },
  { title: "first day, new place", date: "tue", photo: products[2].photo, tint: null },
  { title: "rain delay", date: "sun", photo: products[6].photo, tint: "clay" },
  { title: "open mic", date: "sat", photo: products[3].photo, tint: "cobalt" },
];

export default function HomePage() {
  // "For your vibe" mock personalized strip
  const forYou = [products[1], products[4], products[6], products[7], products[2], products[3]];
  const featuredBrand = "snitch";
  const featuredBrandPieces = productsByBrand(featuredBrand);

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between gap-3 px-5 pt-1 pb-3">
        <div className="flex items-baseline gap-2">
          <span className="block h-2.5 w-2.5 bg-lime" aria-hidden />
          <span className="display text-[22px] font-extrabold tracking-[-0.04em] leading-none text-ink">
            klydo
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            href="/app/search"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink active:scale-95"
          >
            <IconSearch size={18} />
          </Link>
          <Link
            href="/app/notifications"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink active:scale-95"
          >
            <IconBell size={18} />
            <span
              aria-hidden
              className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-pink ring-2 ring-paper"
            />
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Greeting */}
        <div className="px-5 pb-4">
          <div className="label text-ink-quiet">good evening, kavya</div>
          <h1 className="display mt-2 font-extrabold text-[30px] leading-[1] tracking-[-0.035em] text-ink">
            drop o&apos;clock<span className="text-pink">.</span>
          </h1>
        </div>

        {/* Hero: tonight's drop */}
        <Link
          href="/app/drops"
          className="relative mx-5 block overflow-hidden bg-ink p-5 text-paper transition-transform active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 label text-lime">
              <span className="block h-1.5 w-1.5 rounded-full bg-lime pulse" aria-hidden />
              <span>live · 7pm tonight</span>
            </div>
            <span className="label text-paper/55">
              <span className="font-mono tabnum text-paper">8</span> pieces
            </span>
          </div>

          <h2 className="display mt-3 font-extrabold text-[44px] leading-[0.95] tracking-[-0.035em]">
            the brunch
            <br />
            <span className="text-lime">edit.</span>
          </h2>

          <p className="mt-3 text-[13px] leading-[1.5] text-paper/70">
            Eight pieces, curated for sunday brunch in jayanagar. Linen, denim,
            one knit.
          </p>

          <div className="mt-5">
            <div className="label text-paper/55">opens in</div>
            <LiveTimer className="!text-[40px] mt-1 !text-paper" />
          </div>

          {/* Mini collage */}
          <div className="mt-5 grid grid-cols-4 gap-1">
            {products.slice(0, 4).map((p, i) => (
              <div key={i} className="relative aspect-square overflow-hidden">
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                {p.tint && (
                  <div
                    aria-hidden
                    className={cn("absolute inset-0", tintMap[p.tint])}
                    style={{ mixBlendMode: "multiply", opacity: 0.55 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-paper/15 pt-4">
            <span className="text-[12px] text-paper/65">see all 8 pieces</span>
            <span aria-hidden className="text-lime">→</span>
          </div>
        </Link>

        {/* Quick action chips */}
        <div className="mt-6 grid grid-cols-4 gap-2 px-5">
          {[
            { href: "/app/stylist", label: "stylist", icon: IconStylist, bg: "bg-cobalt text-paper" },
            { href: "/app/saved", label: "saved", icon: IconHeart, bg: "bg-pink text-ink" },
            { href: "/app/orders", label: "orders", icon: IconBag, bg: "bg-ink text-paper" },
            { href: "/app/feed", label: "feed", icon: IconArrowRight, bg: "bg-lime text-ink" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex aspect-square flex-col items-start justify-between p-3 transition-transform active:scale-[0.96]",
                item.bg,
              )}
            >
              <span className="opacity-80">
                <item.icon size={22} />
              </span>
              <span className="label leading-none">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Category strip */}
        <div className="mt-9">
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center gap-2 label text-ink-quiet">
              <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
              <span>browse</span>
            </div>
            <Link
              href="/app/search"
              className="text-[12px] font-medium text-ink underline-offset-2 hover:underline"
            >
              all categories
            </Link>
          </div>
          <div
            className="mt-4 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex w-max gap-3 px-5">
              {categories.map((c) => (
                <Link
                  key={c.key}
                  href={`/app/drops`}
                  className="group flex w-[88px] flex-col items-center gap-2"
                >
                  <div
                    className={cn(
                      "relative aspect-[4/5] w-full overflow-hidden transition-transform group-active:scale-[0.97]",
                      c.tint ? tintMap[c.tint] : "bg-paper-soft",
                    )}
                  >
                    <Image
                      src={c.photo}
                      alt={c.label}
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                    {c.tint && (
                      <div
                        aria-hidden
                        className={cn("absolute inset-0", tintMap[c.tint])}
                        style={{ mixBlendMode: "multiply", opacity: 0.4 }}
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-ink">
                    {c.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* For your vibe */}
        <div className="mt-9">
          <div className="flex items-baseline justify-between px-5">
            <div>
              <div className="label text-ink-quiet">for your vibe</div>
              <h3 className="display mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-ink">
                minimal + earth tones
              </h3>
            </div>
            <Link
              href="/app/feed"
              className="text-[12px] font-medium text-ink underline-offset-2 hover:underline"
            >
              see more
            </Link>
          </div>

          <div
            className="mt-4 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex w-max gap-2.5 px-5">
              {forYou.map((p) => (
                <Link
                  key={p.slug}
                  href={`/app/p/${p.slug}`}
                  className={cn(
                    "group flex w-[148px] flex-col overflow-hidden transition-transform active:scale-[0.98]",
                    p.tint ? `bg-${p.tint} text-ink` : "bg-paper-soft text-ink",
                  )}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={p.photo}
                      alt={p.name}
                      fill
                      sizes="148px"
                      className="object-cover"
                    />
                    {p.tint && (
                      <div
                        aria-hidden
                        className={cn("absolute inset-0", tintMap[p.tint])}
                        style={{ mixBlendMode: "multiply", opacity: 0.55 }}
                      />
                    )}
                  </div>
                  <div className="p-2.5">
                    <div className="label opacity-70 text-[9px]">{p.brand}</div>
                    <div className="mt-1 text-[12px] font-semibold leading-[1.15]">
                      {p.name}
                    </div>
                    <div className="mt-1 font-mono tabnum text-[12px] font-semibold">
                      {formatINR(p.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured brand */}
        <Link
          href={`/app/b/${featuredBrand}`}
          className="mx-5 mt-9 block overflow-hidden bg-ink p-5 text-paper transition-transform active:scale-[0.99]"
        >
          <div className="label text-paper/55">this week</div>
          <h3 className="display mt-2 font-extrabold text-[48px] leading-[0.95] tracking-[-0.04em]">
            snitch<span className="text-lime">.</span>
          </h3>
          <p className="mt-2 text-[13px] leading-[1.5] text-paper/65">
            Tight, bold, Gen-Z. {featuredBrandPieces.length} pieces in tonight&apos;s
            drop. ships from indiranagar.
          </p>

          <div className="mt-4 flex items-center gap-1">
            {featuredBrandPieces.slice(0, 3).map((p, i) => (
              <div
                key={i}
                className="relative h-16 w-14 overflow-hidden bg-paper/10"
              >
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="ml-1 flex items-center gap-1 label text-paper/55">
              <span aria-hidden>+</span>
              <span className="font-mono tabnum">
                {featuredBrandPieces.length - 3 > 0
                  ? `${featuredBrandPieces.length - 3} more`
                  : "all"}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-paper/15 pt-3">
            <span className="text-[12px] text-paper/65">see all snitch</span>
            <span aria-hidden className="text-lime">→</span>
          </div>
        </Link>

        {/* Worn in bengaluru */}
        <div className="mt-9 px-5">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="label text-ink-quiet">worn · bengaluru</div>
              <h3 className="display mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-ink">
                real fits this week
              </h3>
            </div>
            <Link
              href="https://instagram.com/klydo.official"
              className="text-[12px] font-medium text-ink underline-offset-2 hover:underline"
            >
              tag #klydo
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {wornPhotos.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden bg-paper-soft"
              >
                <Image
                  src={src}
                  alt={`Worn in Bengaluru ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Past drops */}
        <div className="mt-9">
          <div className="flex items-baseline justify-between px-5">
            <div>
              <div className="label text-ink-quiet">past drops</div>
              <h3 className="display mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-ink">
                missed something?
              </h3>
            </div>
            <Link
              href="/app/drops"
              className="text-[12px] font-medium text-ink underline-offset-2 hover:underline"
            >
              archive
            </Link>
          </div>
          <div
            className="mt-4 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex w-max gap-2 px-5">
              {pastDrops.map((d, i) => (
                <Link
                  key={i}
                  href="/app/drops"
                  className={cn(
                    "group relative flex w-[120px] aspect-[3/4] flex-col justify-end overflow-hidden p-2.5 transition-transform active:scale-[0.97]",
                    d.tint ? tintMap[d.tint] : "bg-paper-soft",
                  )}
                >
                  <Image
                    src={d.photo}
                    alt={d.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
                  />
                  <div className="relative text-paper">
                    <div className="label text-paper/65 font-mono tabnum">
                      {d.date}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold leading-tight">
                      {d.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Feed CTA */}
        <Link
          href="/app/feed"
          className="mx-5 mt-9 flex items-center justify-between gap-3 border border-paper-line bg-paper-soft p-4 transition-colors hover:border-ink/25 active:scale-[0.99]"
        >
          <div>
            <div className="label text-ink-quiet">still scrolling?</div>
            <div className="mt-1.5 display text-[20px] font-extrabold tracking-[-0.025em] text-ink">
              try the feed.
            </div>
            <div className="mt-1 text-[12px] text-ink-soft">
              one piece at a time. swipe through.
            </div>
          </div>
          <span aria-hidden className="text-[18px] text-ink">→</span>
        </Link>

        {/* Footer ribbon */}
        <div className="mt-9 mb-2 px-5 label text-ink-quiet">
          made in bengaluru · drops at 7pm IST · v1.0
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
