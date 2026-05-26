import { cn } from "@/lib/cn";

type Step = {
  num: string;
  verb: string;
  copy: string;
  accent: "pink" | "lime" | "cobalt";
  tag: string;
};

const steps: Step[] = [
  {
    num: "01",
    verb: "Pick",
    copy: "Scroll the drop. Tap any piece. Sizes, swatches, instant ETA on your address.",
    accent: "pink",
    tag: "in 30s",
  },
  {
    num: "02",
    verb: "Try",
    copy: "Courier shows up in 30. Try every piece in your room. Fifteen free minutes, no awkward.",
    accent: "lime",
    tag: "in 30 min",
  },
  {
    num: "03",
    verb: "Keep",
    copy: "Tap keep on what works. Returns walk out with the courier. Refund hits your UPI by morning.",
    accent: "cobalt",
    tag: "or send back",
  },
];

const tagClass = {
  pink: "bg-pink text-ink",
  lime: "bg-lime text-ink",
  cobalt: "bg-cobalt text-paper",
};

const accentText = {
  pink: "text-pink",
  lime: "text-lime",
  cobalt: "text-cobalt",
};

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="flex items-center gap-2 label text-paper/60">
          <span className="h-px w-8 bg-paper/40" aria-hidden />
          <span>how it works</span>
        </div>

        <h2 className="display mt-8 max-w-[18ch] font-extrabold text-[44px] leading-[0.92] tracking-[-0.04em] md:mt-12 md:text-[88px] lg:text-[120px]">
          three steps.
          <br />
          one thumb<span className="text-lime">.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-6 lg:gap-10">
          {steps.map((step) => (
            <article
              key={step.num}
              className="border-t border-paper/20 pt-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono tabnum text-[14px] text-paper/50">
                  {step.num}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 label text-[10px]",
                    tagClass[step.accent],
                  )}
                >
                  {step.tag}
                </span>
              </div>

              <div
                className={cn(
                  "mt-8 display font-extrabold text-[88px] leading-[0.88] tracking-[-0.05em] md:text-[112px]",
                  accentText[step.accent],
                )}
              >
                {step.verb.toLowerCase()}<span className="text-paper">.</span>
              </div>

              <p className="mt-6 max-w-[30ch] text-[16px] leading-[1.5] text-paper/75 md:text-[17px]">
                {step.copy}
              </p>
            </article>
          ))}
        </div>

        {/* Closer block */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-paper/15 pt-12 md:mt-32 md:grid-cols-12 md:gap-8 md:pt-16">
          <p className="display max-w-[20ch] text-[28px] leading-[1.05] tracking-[-0.02em] md:col-span-7 md:text-[44px]">
            no banner stacks. no fake mrps. no coupon theatre.
            <br />
            <span className="text-lime">the price is the price.</span>
          </p>
          <div className="md:col-span-5">
            <p className="text-[14px] text-paper/60 md:text-[15px]">
              We're not a marketplace running on inflated discounts. The
              number on the tag is the number you pay. Refunds in 24
              hours. Direct from the brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
