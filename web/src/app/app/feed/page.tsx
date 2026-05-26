import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products, formatINR } from "@/components/app/products";
import { IconHeart, IconShare, IconBack } from "@/components/app/icons";
import { cn } from "@/lib/cn";

const tintMap: Record<string, string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  cobalt: "bg-cobalt",
  sunset: "bg-sunset",
  clay: "bg-clay",
};

export default function FeedPage() {
  return (
    <PhoneFrame surface="ink">
      <StatusBar onInk />

      {/* Brand strip */}
      <div className="relative z-30 flex items-center justify-between gap-3 px-5 pb-2 pt-1 text-paper">
        <Link href="/app" aria-label="Back" className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/10 active:scale-95">
          <IconBack size={16} />
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="block h-2 w-2 bg-lime" aria-hidden />
          <span className="display text-[18px] font-extrabold tracking-[-0.04em] leading-none">
            feed
          </span>
        </div>
        <Link
          href="/app/drops"
          className="inline-flex items-center gap-1 rounded-full border border-paper/20 bg-paper/[0.04] px-2.5 py-1 text-[11px] font-medium text-paper/85 transition-colors hover:border-paper/40 hover:bg-paper/10"
        >
          <span className="font-mono tabnum">{products.length}</span>
          <span>·</span>
          <span>grid</span>
          <span aria-hidden>↗</span>
        </Link>
      </div>

      {/* Sub-status line */}
      <div className="relative z-30 flex items-center justify-between px-5 pb-2">
        <div className="flex items-center gap-2 label text-pink">
          <span className="block h-1.5 w-1.5 rounded-full bg-pink pulse" aria-hidden />
          <span>live · 7pm drop</span>
        </div>
        <span className="label text-paper/45">swipe to browse</span>
      </div>

      <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
        {products.map((p, i) => (
          <article
            key={p.slug}
            className="relative block h-[88%] min-h-[480px] w-full snap-start overflow-hidden"
          >
            <Link
              href={`/app/p/${p.slug}`}
              aria-label={`${p.brand} ${p.name}`}
              className="absolute inset-0 z-0 block active:scale-[0.99] transition-transform"
            >
              <Image
                src={p.photo}
                alt={`${p.brand} ${p.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 390px"
                className="object-cover"
                priority={i === 0}
              />
              {p.tint && (
                <span
                  aria-hidden
                  className={cn("absolute inset-0", tintMap[p.tint] ?? "")}
                  style={{ mixBlendMode: "color", opacity: 0.16 }}
                />
              )}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/55 to-transparent" />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            </Link>

            <div className="pointer-events-none absolute right-3.5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-4">
              <button aria-label="Save" className="pointer-events-auto text-paper/95 transition-colors hover:text-pink active:scale-90">
                <IconHeart size={26} />
              </button>
              <button aria-label="Share" className="pointer-events-auto text-paper/95 transition-colors hover:text-lime active:scale-90">
                <IconShare size={24} />
              </button>
            </div>

            <div className="pointer-events-none absolute left-4 top-3 z-10 flex items-center gap-1.5 label text-paper/80">
              <span className="font-mono tabnum">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden className="text-paper/45">/</span>
              <span className="font-mono tabnum text-paper/55">08</span>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 pb-6 text-paper">
              <div className="label text-paper/75">{p.brand}</div>
              <h2 className="display mt-2 font-extrabold text-[30px] leading-[0.96] tracking-[-0.03em]">
                {p.name}
              </h2>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono tabnum text-[20px] font-semibold leading-none">
                    {formatINR(p.price)}
                  </span>
                  <span className="label text-paper/55">by 6:42pm</span>
                </div>
                <Link
                  href={`/app/p/${p.slug}`}
                  className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-lime-deep active:scale-[0.97]"
                >
                  try it on
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>

            {i === 0 && (
              <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-10 flex justify-center pb-2">
                <span className="rounded-full bg-paper/12 px-2.5 py-1 label text-paper/75 backdrop-blur-sm">
                  swipe up · {products.length - 1} more
                </span>
              </div>
            )}
          </article>
        ))}

        <div className="snap-start flex h-[88%] min-h-[480px] w-full items-center justify-center bg-ink p-8 text-center text-paper">
          <div>
            <div className="label text-paper/55">that&apos;s the feed.</div>
            <h3 className="display mt-3 font-extrabold text-[36px] leading-[0.95] tracking-[-0.03em]">
              see them all
              <br />
              <span className="text-lime">at once.</span>
            </h3>
            <Link
              href="/app/drops"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-lime-deep active:scale-[0.98]"
            >
              tonight&apos;s drop · grid view
              <span aria-hidden>↗</span>
            </Link>
            <div className="mt-6 label text-paper/45">
              new drop every day · 7pm IST
            </div>
          </div>
        </div>
      </div>

      <TabBar onInk />
    </PhoneFrame>
  );
}
