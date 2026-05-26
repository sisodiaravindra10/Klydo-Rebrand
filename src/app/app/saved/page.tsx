import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { EmptyState } from "@/components/app/EmptyState";
import { products, formatINR } from "@/components/app/products";
import { IconBack, IconHeart } from "@/components/app/icons";
import { cn } from "@/lib/cn";

// Stand-in saved set: 6 picks across different brands.
const savedIndices = [0, 2, 4, 1, 6, 3];
const inBagIndices = new Set([0, 1]);

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

const filters = ["all", "this week", "in your size", "under ₹1k"];

export default async function SavedPage(props: PageProps<"/app/saved">) {
  const params = await props.searchParams;
  const empty = params.empty === "1";

  if (empty) {
    return (
      <PhoneFrame surface="paper">
        <StatusBar />
        <div className="relative z-30 px-5 pt-1 pb-3">
          <div className="flex items-center justify-between">
            <Link
              href="/app/you"
              aria-label="Back"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
            >
              <IconBack size={20} />
            </Link>
            <div className="label text-ink-quiet">saved</div>
          </div>
        </div>
        <EmptyState
          title="nothing saved yet"
          subtitle="tap the heart on any piece in the feed to save it here. we'll ping you when it's back in a drop."
          ctaLabel="open the feed"
          ctaHref="/app/feed"
          secondaryLabel="see tonight's drop"
          secondaryHref="/app/drops"
          accent="pink"
        />
        <TabBar />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Header */}
      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-center justify-between">
          <Link
            href="/app/you"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
          >
            <IconBack size={20} />
          </Link>
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="font-mono tabnum text-ink">{savedIndices.length}</span>
            <span>saved</span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="label text-ink-quiet">your wishlist</div>
            <h1 className="display mt-1 font-extrabold text-[34px] leading-[0.98] tracking-[-0.035em] text-ink">
              saved<span className="text-pink">.</span>
            </h1>
          </div>
          <div className="text-pink">
            <IconHeart size={28} filled />
          </div>
        </div>

        <p className="mt-3 max-w-[36ch] text-[13px] leading-[1.55] text-ink-soft">
          Pieces you hearted, kept around for later. We&apos;ll ping you when they
          go back in a drop.
        </p>
      </div>

      {/* Filter chips */}
      <div
        className="relative z-20 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex w-max gap-2 px-5 pb-3">
          {filters.map((f, i) => (
            <button
              key={f}
              aria-pressed={i === 0}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors active:scale-[0.97]",
                i === 0
                  ? "bg-ink text-paper"
                  : "border border-ink/15 bg-paper text-ink-soft hover:border-ink/35 hover:text-ink",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {savedIndices.map((idx, i) => {
            const p = products[idx];
            const inBag = inBagIndices.has(i);
            return (
              <Link
                key={p.slug}
                href={`/app/p/${p.slug}`}
                className={cn(
                  "tilt-hover group relative flex aspect-[3/4.2] flex-col overflow-hidden",
                  p.tint ? cardBg[p.tint] : "bg-paper-soft text-ink",
                )}
              >
                {/* Photo */}
                <div className="relative h-[64%] overflow-hidden">
                  <Image
                    src={p.photo}
                    alt={`${p.brand} ${p.name}`}
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
                  {/* Hearted indicator */}
                  <span className="absolute top-2 left-2 text-pink">
                    <IconHeart size={16} filled />
                  </span>
                  {inBag && (
                    <span className="absolute right-2 top-2 rounded-full bg-lime px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink">
                      in bag
                    </span>
                  )}
                </div>

                {/* Text */}
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
                    <span className="inline-flex items-center gap-0.5 rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-semibold opacity-90">
                      try
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Move all to bag */}
        <div className="mt-6 flex items-center justify-between border border-paper-line bg-paper-soft p-4">
          <div>
            <div className="text-[13px] font-semibold text-ink">
              try them all tonight
            </div>
            <div className="mt-0.5 text-[11px] text-ink-soft">
              add all {savedIndices.length} to the try-on basket
            </div>
          </div>
          <Link
            href="/app/bag"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-paper transition-colors hover:bg-ink-soft active:scale-[0.97]"
          >
            move to bag
            <span aria-hidden className="text-lime">→</span>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-7">
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
            <span>you may also like</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[products[5], products[7]].map((p) => (
              <Link
                key={p.slug}
                href={`/app/p/${p.slug}`}
                className="relative aspect-[3/4] overflow-hidden bg-paper-soft"
              >
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 120px"
                  className="object-cover"
                />
              </Link>
            ))}
            <div className="flex aspect-[3/4] items-center justify-center bg-ink/5 text-[11px] text-ink-quiet">
              see more →
            </div>
          </div>
        </div>

        <div className="mt-7 mb-2 label text-ink-quiet">
          based on your last 12 keeps
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
