import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

type DropItem = {
  brand: string;
  name: string;
  price: string;
  bg: "lime" | "pink" | "cobalt" | "sunset" | "ink" | "clay" | "paper-soft";
  photo: string;
};

const items: DropItem[] = [
  {
    brand: "snitch",
    name: "Oversized cotton tee",
    price: "₹999",
    bg: "lime",
    photo: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "bewakoof",
    name: "Wide-leg cargos",
    price: "₹1,299",
    bg: "pink",
    photo: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "the souled store",
    name: "Bomber jacket",
    price: "₹2,499",
    bg: "ink",
    photo: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "urbanic",
    name: "Ribbed tank, 2-pack",
    price: "₹699",
    bg: "cobalt",
    photo: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "house of masaba",
    name: "Linen co-ord",
    price: "₹3,299",
    bg: "sunset",
    photo: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "fabindia",
    name: "Block-print shirt",
    price: "₹1,499",
    bg: "paper-soft",
    photo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "h&m",
    name: "Pleated mini skirt",
    price: "₹1,199",
    bg: "clay",
    photo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=750&fit=crop&q=75",
  },
  {
    brand: "snitch",
    name: "Cropped denim",
    price: "₹1,599",
    bg: "lime",
    photo: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=750&fit=crop&q=75",
  },
];

const bgClass: Record<DropItem["bg"], string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  cobalt: "bg-cobalt text-paper",
  sunset: "bg-sunset text-ink",
  ink: "bg-ink text-paper",
  clay: "bg-clay text-paper",
  "paper-soft": "bg-paper-soft text-ink",
};

const tintClass: Record<DropItem["bg"], string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  cobalt: "bg-cobalt",
  sunset: "bg-sunset",
  ink: "bg-ink",
  clay: "bg-clay",
  "paper-soft": "bg-paper-soft",
};

export function TodaysDrop() {
  return (
    <section id="today" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        {/* Section header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <div className="flex items-center gap-2 label text-ink-quiet">
              <span className="h-px w-8 bg-ink-quiet" aria-hidden />
              <span>tonight · 7pm</span>
            </div>
            <h2 className="display mt-6 font-extrabold text-[44px] leading-[0.92] tracking-[-0.04em] text-ink md:mt-8 md:text-[80px] lg:text-[112px]">
              today&apos;s drop<span className="text-pink">.</span>
            </h2>
            <p className="mt-5 max-w-[44ch] text-[16px] text-ink-soft md:mt-7 md:text-[18px]">
              Eight pieces. Hand-picked by stylists who know your feed.
              Try them all. Pay only for what stays on.
            </p>
          </div>

          <Link
            href="#get-app"
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition-all hover:bg-lime-deep active:scale-[0.98] md:self-end"
          >
            open in app
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
          {items.map((item, i) => (
            <article
              key={`${item.brand}-${i}`}
              className={cn(
                "tilt-hover group relative flex aspect-[4/5] cursor-pointer flex-col overflow-hidden",
                bgClass[item.bg],
              )}
            >
              {/* Photo (top 65%) with color-tint multiply */}
              <div className="relative h-[64%] overflow-hidden">
                <Image
                  src={item.photo}
                  alt={`${item.brand} ${item.name}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div
                  className={cn("absolute inset-0", tintClass[item.bg])}
                  style={{ mixBlendMode: "multiply", opacity: 0.78 }}
                />
              </div>

              {/* Text block (bottom 36%) */}
              <div className="flex h-[36%] flex-col justify-between p-3.5 md:p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono tabnum text-[10px] opacity-70">
                    {String(i + 1).padStart(2, "0")} / 08
                  </span>
                  <span className="label text-[10px] opacity-80">{item.brand}</span>
                </div>

                <div>
                  <div className="display text-[15px] leading-[1.1] tracking-[-0.02em] font-semibold md:text-[17px]">
                    {item.name}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono tabnum text-[15px] font-semibold md:text-[17px]">
                      {item.price}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-semibold opacity-90 transition-opacity group-hover:opacity-100">
                      try
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center md:mt-20">
          <span className="label text-ink-quiet">
            new drop every day · 7pm sharp
          </span>
        </div>
      </div>
    </section>
  );
}
