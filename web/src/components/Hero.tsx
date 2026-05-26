import Link from "next/link";
import Image from "next/image";
import { LiveTimer } from "./LiveTimer";
import { Stamp } from "./Stamp";
import { cn } from "@/lib/cn";

// Tonight's drop preview thumbnails. 8 pieces.
const previewThumbs = [
  { src: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=240&h=240&fit=crop&q=70", tint: "bg-lime" },
  { src: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=240&h=240&fit=crop&q=70", tint: "bg-pink" },
  { src: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=240&h=240&fit=crop&q=70", tint: "" },
  { src: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=240&h=240&fit=crop&q=70", tint: "bg-cobalt" },
  { src: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=240&h=240&fit=crop&q=70", tint: "bg-sunset" },
  { src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=240&h=240&fit=crop&q=70", tint: "" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=240&h=240&fit=crop&q=70", tint: "bg-clay" },
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=240&h=240&fit=crop&q=70", tint: "bg-lime" },
];

export function Hero() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[80vh]">
        {/* Left: lime panel, manifesto */}
        <div className="relative col-span-1 bg-lime md:col-span-7 lg:col-span-8">
          {/* Mobile stamp at top-right of lime panel */}
          <Stamp
            big="30"
            small="MIN"
            bg="pink"
            className="tilt-hard-right absolute right-5 top-6 h-[88px] w-[88px] text-ink md:hidden"
          />

          {/* Desktop stamp overlapping headline area, right edge */}
          <Stamp
            big="30"
            small="MIN DELIVERY"
            bg="pink"
            className="tilt-hard-left absolute right-10 top-[42%] hidden h-[160px] w-[160px] text-ink md:flex lg:h-[200px] lg:w-[200px] lg:right-12"
          />

          <div className="relative px-5 pt-14 pb-16 md:px-12 md:pt-20 md:pb-24 lg:px-20 lg:pt-28 lg:pb-32">
            {/* Meta line */}
            <div className="rise flex items-center gap-2 label text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-ink pulse" aria-hidden />
              <span>bengaluru · live now</span>
            </div>

            {/* Headline */}
            <h1
              className="rise display mt-8 text-ink font-extrabold md:mt-12"
              style={{ animationDelay: "60ms" }}
            >
              <span className="block text-[64px] leading-[0.88] tracking-[-0.045em] md:text-[120px] lg:text-[168px] xl:text-[184px]">
                fits,
              </span>
              <span className="block text-[64px] leading-[0.88] tracking-[-0.045em] md:text-[120px] lg:text-[168px] xl:text-[184px]">
                in thirty<span className="text-pink">.</span>
              </span>
            </h1>

            {/* Subhead */}
            <p
              className="rise mt-10 max-w-[36ch] text-[17px] leading-[1.5] text-ink/80 md:mt-12 md:text-[20px]"
              style={{ animationDelay: "160ms" }}
            >
              drops at 7pm. we bring eight pieces by 7:30. try them in
              your room. <span className="font-semibold text-ink">pay only for what you keep.</span>
            </p>

            {/* CTAs */}
            <div
              className="rise mt-9 flex flex-wrap items-center gap-3 md:mt-12"
              style={{ animationDelay: "260ms" }}
            >
              <Link
                href="#get-app"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-paper transition-all hover:bg-ink-soft active:scale-[0.98] md:px-7 md:py-4 md:text-base"
              >
                get the app
                <span
                  aria-hidden
                  className="inline-block text-lime transition-transform group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </Link>
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-transparent px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:bg-ink hover:text-paper active:scale-[0.98] md:px-7 md:py-4 md:text-base"
              >
                preview the app
                <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Tiny meta strip */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 label text-ink/70 md:mt-16">
              <span>★ 4.8 on app store</span>
              <span aria-hidden>·</span>
              <span>200+ verified brands</span>
              <span aria-hidden>·</span>
              <span>cod · upi · card</span>
            </div>
          </div>
        </div>

        {/* Right: ink panel, drop card */}
        <div className="relative col-span-1 bg-ink text-paper md:col-span-5 lg:col-span-4">
          <div className="px-5 py-14 md:px-9 md:py-20 lg:px-12 lg:py-24">
            <div className="flex items-center gap-2 label text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime pulse" aria-hidden />
              <span>live · 7pm drop</span>
            </div>

            <h2 className="display mt-7 font-extrabold text-[40px] leading-[0.95] tracking-[-0.035em] md:mt-10 md:text-[52px] lg:text-[64px]">
              the brunch
              <br />
              <span className="text-lime">edit.</span>
            </h2>

            <p className="mt-5 text-[14px] text-paper/70 md:text-[15px]">
              eight pieces. hand-picked. bengaluru only.
            </p>

            <div className="hairline-on-ink mt-8 md:mt-10" />

            <div className="mt-8 md:mt-10">
              <div className="label text-paper/60">opens in</div>
              <LiveTimer className="mt-3 text-paper" />
            </div>

            <div className="mt-6 flex items-center justify-between label text-paper/50 md:mt-8">
              <span>7:00 PM IST</span>
              <span>tonight</span>
            </div>

            {/* Drop preview thumbnails: one per piece */}
            <div className="mt-10 md:mt-12">
              <div className="label text-paper/50 mb-3">tonight, 8 pieces</div>
              <div className="grid grid-cols-4 gap-1.5">
                {previewThumbs.map((thumb, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden bg-paper-soft"
                  >
                    <Image
                      src={thumb.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {thumb.tint && (
                      <div
                        className={cn("absolute inset-0", thumb.tint)}
                        style={{ mixBlendMode: "multiply", opacity: 0.7 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
