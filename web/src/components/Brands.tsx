import { Marquee } from "./Marquee";

const row1 = [
  "snitch",
  "bewakoof",
  "the souled store",
  "urbanic",
  "h&m",
  "uniqlo",
  "zara",
  "fabindia",
  "house of masaba",
  "wear and bare",
  "almo",
  "biba",
];

const row2 = [
  "only",
  "vero moda",
  "forever 21",
  "westside",
  "raw mango",
  "kapraha",
  "no nasties",
  "lakmé",
  "anokhi",
  "tjori",
  "péro",
  "good earth",
];

export function Brands() {
  return (
    <section id="brands" className="bg-lime text-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-6 md:px-12 md:pt-20 lg:px-20 lg:pt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label flex items-center gap-2 text-ink/70">
              <span className="h-px w-8 bg-ink/40" aria-hidden />
              <span>200+ brands · verified · no fakes</span>
            </div>
            <h2 className="display mt-5 font-extrabold text-[40px] leading-[0.92] tracking-[-0.04em] md:mt-7 md:text-[72px] lg:text-[96px]">
              everyone you want<span className="text-pink">.</span>
            </h2>
          </div>

          <p className="max-w-[34ch] text-[15px] text-ink/80 md:text-[17px]">
            Every brand is verified by Klydo. No fakes, no resellers. Direct
            from the brand to your door.
          </p>
        </div>
      </div>

      {/* Two-row marquee strip */}
      <div className="border-y border-ink/20 py-6">
        <Marquee
          items={row1}
          speed="slow"
          className="display text-[36px] font-extrabold tracking-[-0.04em] md:text-[60px] lg:text-[72px]"
          ariaLabel="Brand list, row one"
        />
      </div>
      <div className="border-b border-ink/20 py-6">
        <Marquee
          items={row2}
          speed="base"
          className="display text-[36px] font-extrabold tracking-[-0.04em] md:text-[60px] lg:text-[72px]"
          ariaLabel="Brand list, row two"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-12 md:py-12 lg:px-20">
        <div className="flex flex-wrap items-center justify-between gap-4 label text-ink/70">
          <span>direct-from-brand · no middlemen</span>
          <span>+ a new brand every week</span>
        </div>
      </div>
    </section>
  );
}
