import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { LiveTimer } from "@/components/LiveTimer";
import { DropsGrid } from "@/components/app/DropsGrid";
import { products } from "@/components/app/products";
import { cn } from "@/lib/cn";

const pastDrops = [
  { title: "the gallery night", pieces: 6, date: "yesterday", photo: products[4].photo, accent: "sunset" },
  { title: "weekend grocery run", pieces: 5, date: "wed", photo: products[5].photo, accent: "paper" },
  { title: "first day, new place", pieces: 7, date: "tue", photo: products[2].photo, accent: "ink" },
  { title: "the rain delay", pieces: 4, date: "sun", photo: products[6].photo, accent: "clay" },
];

const pastBg: Record<string, string> = {
  sunset: "bg-sunset",
  paper: "bg-paper-soft",
  ink: "bg-ink/80",
  clay: "bg-clay",
};

export default function DropsPage() {
  return (
    <PhoneFrame surface="ink">
      <StatusBar onInk />

      {/* Header */}
      <header className="relative z-30 px-5 pt-1 pb-3 text-paper">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 label text-paper/55">
            <span>tonight</span>
            <span aria-hidden>·</span>
            <span>7pm sharp</span>
          </div>
          <Link
            href="/app/search"
            className="flex h-8 items-center gap-1.5 rounded-full border border-paper/20 px-3 text-[11px] font-medium text-paper/85 transition-colors hover:border-paper/40 hover:bg-paper/10"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>
            search
          </Link>
        </div>

        <h1 className="display mt-2 font-extrabold text-[32px] leading-[0.98] tracking-[-0.035em]">
          the brunch
          <br />
          <span className="text-lime">edit.</span>
        </h1>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="label text-paper/55">opens in</div>
            <LiveTimer className="!text-[36px] mt-1 !text-paper" />
          </div>
          <div className="text-right">
            <div className="font-mono tabnum text-[20px] font-semibold leading-none">
              {products.length}
            </div>
            <div className="mt-1 label text-paper/55">pieces tonight</div>
          </div>
        </div>

        <p className="mt-5 text-[13px] leading-[1.55] text-paper/70">
          Eight pieces, curated for sunday brunch in jayanagar. Linen, denim,
          one knit. Sized for the bengaluru summer.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto pb-4">
        <DropsGrid />

        <div className="mt-9 px-5">
          <div className="flex items-center gap-2 label text-paper/55">
            <span className="block h-px w-6 bg-paper/25" aria-hidden />
            <span>past drops</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 px-5">
          {pastDrops.map((d) => (
            <article
              key={d.title}
              className={cn(
                "relative aspect-[3/4] overflow-hidden",
                pastBg[d.accent] ?? "bg-ink/60",
              )}
            >
              <Image
                src={d.photo}
                alt={d.title}
                fill
                sizes="(max-width: 768px) 50vw, 180px"
                className="object-cover opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-paper">
                <div className="label text-paper/65">{d.date}</div>
                <div className="mt-1 text-[12px] font-semibold leading-tight">
                  {d.title}
                </div>
                <div className="mt-0.5 text-[10px] text-paper/65">
                  {d.pieces} pieces · sold out
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 mb-2 px-5 label text-paper/40">
          new drop every day · 7pm IST · bengaluru only
        </div>
      </div>

      <TabBar onInk />
    </PhoneFrame>
  );
}
