import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products, productsByBrand, formatINR } from "@/components/app/products";
import { IconBack, IconShare } from "@/components/app/icons";
import { cn } from "@/lib/cn";

// Static brand metadata (would normally come from a brand table)
type BrandMeta = {
  name: string;
  tagline: string;
  about: string;
  ships: string;
  rating: number;
  keepRate: number;
  yearFounded: string;
  bg: "ink" | "lime" | "pink" | "cobalt" | "sunset";
};

const brandMeta: Record<string, BrandMeta> = {
  snitch: {
    name: "snitch",
    tagline: "tight, bold, gen-z.",
    about: "Men's fast-fashion done right. Vertically integrated, ships from a warehouse in Indiranagar. Best for sharp basics with a streetwear bend.",
    ships: "indiranagar",
    rating: 4.7,
    keepRate: 68,
    yearFounded: "2019",
    bg: "ink",
  },
  bewakoof: {
    name: "bewakoof",
    tagline: "playful, printed, indian.",
    about: "Affordable Gen-Z streetwear with a playful Indian sensibility. Print-heavy graphic tees, baggy cargos, and oversized hoodies.",
    ships: "mumbai",
    rating: 4.4,
    keepRate: 62,
    yearFounded: "2012",
    bg: "pink",
  },
  "the souled store": {
    name: "the souled store",
    tagline: "merch + casual.",
    about: "Licensed pop-culture merch alongside everyday casual. Marvel, F.R.I.E.N.D.S, Naruto plus their own outerwear line.",
    ships: "mumbai",
    rating: 4.5,
    keepRate: 65,
    yearFounded: "2013",
    bg: "ink",
  },
  urbanic: {
    name: "urbanic",
    tagline: "fast, european, online-first.",
    about: "Online-first fashion brand. Tightly-fitted basics and trending silhouettes at fast-fashion prices.",
    ships: "delhi",
    rating: 4.6,
    keepRate: 71,
    yearFounded: "2019",
    bg: "cobalt",
  },
  "house of masaba": {
    name: "house of masaba",
    tagline: "print-on-print, masaba gupta.",
    about: "Masaba Gupta's namesake label. Bold prints, contemporary Indian silhouettes, designer prices.",
    ships: "mumbai",
    rating: 4.8,
    keepRate: 58,
    yearFounded: "2009",
    bg: "sunset",
  },
  fabindia: {
    name: "fabindia",
    tagline: "handloom, hand-block.",
    about: "Three decades of Indian artisan-made textiles. Hand-block, handloom, slow-fashion in modern silhouettes.",
    ships: "delhi",
    rating: 4.5,
    keepRate: 73,
    yearFounded: "1960",
    bg: "lime",
  },
  "h&m": {
    name: "h&m",
    tagline: "fast-fashion, swedish.",
    about: "Swedish fast-fashion at scale. Trend-led drops at accessible prices, present in every Indian metro.",
    ships: "delhi",
    rating: 4.3,
    keepRate: 60,
    yearFounded: "1947",
    bg: "ink",
  },
};

const tintMap: Record<string, string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  cobalt: "bg-cobalt",
  sunset: "bg-sunset",
  clay: "bg-clay",
};

const cardBg: Record<string, string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  cobalt: "bg-cobalt text-paper",
  sunset: "bg-sunset text-ink",
  clay: "bg-clay text-paper",
};

const headerBg: Record<string, string> = {
  ink: "bg-ink text-paper",
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  cobalt: "bg-cobalt text-paper",
  sunset: "bg-sunset text-ink",
};

export function generateStaticParams() {
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  return brands.map((b) => ({ brand: b }));
}

export default async function BrandPage(props: PageProps<"/app/b/[brand]">) {
  const { brand: brandSlug } = await props.params;
  const brand = decodeURIComponent(brandSlug);
  const meta = brandMeta[brand];
  const items = productsByBrand(brand);

  if (!meta || items.length === 0) notFound();

  const onInk = meta.bg === "ink" || meta.bg === "cobalt";

  return (
    <PhoneFrame surface={onInk ? "ink" : "paper"}>
      <StatusBar onInk={onInk} />

      {/* Top app bar */}
      <div className={cn("relative z-30 flex items-center justify-between px-3 pt-1 pb-2", onInk ? "text-paper" : "text-ink")}>
        <Link
          href="/app"
          aria-label="Back"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full active:scale-95",
            onInk ? "bg-paper/10" : "bg-ink/5",
          )}
        >
          <IconBack size={20} />
        </Link>
        <div className="flex items-center gap-2 label opacity-65">
          <span>brand</span>
          <span aria-hidden>·</span>
          <span>verified</span>
        </div>
        <button
          aria-label="Share"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full active:scale-95",
            onInk ? "bg-paper/10" : "bg-ink/5",
          )}
        >
          <IconShare size={18} />
        </button>
      </div>

      {/* Brand hero */}
      <div className={cn("px-5 pb-5", headerBg[meta.bg])}>
        <div className="label opacity-65">est. {meta.yearFounded} · ships from {meta.ships}</div>
        <h1 className="display mt-3 font-extrabold text-[56px] leading-[0.92] tracking-[-0.04em]">
          {meta.name}
          <span className={onInk ? "text-lime" : "text-ink"}>.</span>
        </h1>
        <p className="mt-2 text-[14px] leading-[1.5] opacity-75">
          {meta.tagline}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Stats trio */}
        <div className="grid grid-cols-3 gap-2 px-5 pt-5">
          <div className="bg-lime p-3 text-ink">
            <div className="font-mono tabnum text-[22px] font-medium leading-none tracking-[-0.02em]">
              {items.length}
            </div>
            <div className="mt-2 label">tonight</div>
          </div>
          <div className="bg-paper-soft p-3 text-ink">
            <div className="font-mono tabnum text-[22px] font-medium leading-none tracking-[-0.02em]">
              {meta.rating}<span className="text-ink-quiet">★</span>
            </div>
            <div className="mt-2 label text-ink-quiet">avg rating</div>
          </div>
          <div className="bg-ink p-3 text-paper">
            <div className="font-mono tabnum text-[22px] font-medium leading-none tracking-[-0.02em]">
              {meta.keepRate}%
            </div>
            <div className="mt-2 label text-paper/55">keep rate</div>
          </div>
        </div>

        {/* In tonight's drop */}
        <div className="mt-7 px-5">
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="block h-1.5 w-1.5 rounded-full bg-pink pulse" aria-hidden />
            <span>in tonight&apos;s drop</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 px-5">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/app/p/${p.slug}`}
              className={cn(
                "tilt-hover group relative flex aspect-[3/4.4] flex-col overflow-hidden",
                p.tint ? cardBg[p.tint] : "bg-paper-soft text-ink",
              )}
            >
              <div className="relative h-[62%] overflow-hidden">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 180px"
                  className="object-cover"
                />
                {p.tint && (
                  <div
                    aria-hidden
                    className={cn("absolute inset-0", tintMap[p.tint] ?? "")}
                    style={{ mixBlendMode: "multiply", opacity: 0.55 }}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <div className="label opacity-75 text-[10px]">{p.brand}</div>
                  <div className="mt-1 display text-[13px] font-semibold leading-[1.15] tracking-[-0.015em]">
                    {p.name}
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono tabnum text-[13px] font-semibold">
                    {formatINR(p.price)}
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-semibold opacity-90 group-hover:opacity-100">
                    try
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* About */}
        <div className="mt-9 px-5">
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
            <span>about</span>
          </div>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.55] text-ink-soft">
            {meta.about}
          </p>
        </div>

        {/* What people kept */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">what people kept</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["true to size", "good fabric", "ships fast", "right oversize", "wears well", "great price"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-[12px] text-ink-soft"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        {/* All time */}
        <div className="mt-9 px-5">
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
            <span>all time · {items.length * 24}+ pieces</span>
          </div>
          <p className="mt-2 max-w-[60ch] text-[13px] text-ink-soft">
            We pull from {meta.name}&apos;s catalog every day. New pieces in
            curated drops. Check back at 7pm.
          </p>
        </div>

        <div className="mt-7 mb-2 px-5 label text-ink-quiet">
          klydo · brand profile · {meta.name}
        </div>
      </div>

      <TabBar onInk={false} />
    </PhoneFrame>
  );
}
