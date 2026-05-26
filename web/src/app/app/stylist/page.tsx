import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products } from "@/components/app/products";

const prompts = [
  { tag: "tonight", text: "outfit for dinner at toit, smart casual" },
  { tag: "office", text: "first day at a startup, light formal" },
  { tag: "brunch", text: "sunday brunch with the new in-laws" },
  { tag: "wedding", text: "south indian wedding, sangeet night" },
  { tag: "monsoon", text: "rain-proof but still cute" },
];

export default function StylistPage() {
  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Header */}
      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="label text-ink-quiet">your stylist</div>
            <h1 className="display mt-1 font-extrabold text-[30px] leading-[0.98] tracking-[-0.035em] text-ink">
              what&apos;s the
              <br />
              <span className="text-cobalt">occasion?</span>
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-lime">
            <span className="display text-[20px] font-extrabold">k</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Greeting card */}
        <div className="mx-5 mt-2 bg-cobalt p-4 text-paper">
          <div className="text-[13px] leading-[1.55]">
            Hey. I&apos;m Klara. Tell me what you&apos;re doing tonight and I&apos;ll put
            together a fit you can try in thirty.
          </div>
        </div>

        {/* Prompts */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">try one of these</div>
        </div>

        <div className="mt-3 space-y-2 px-5">
          {prompts.map((p) => (
            <button
              key={p.text}
              className="flex w-full items-center justify-between gap-3 border border-paper-line bg-paper-soft p-4 text-left transition-colors hover:border-ink/25 active:scale-[0.995]"
            >
              <div className="flex flex-col gap-1">
                <span className="label text-ink-quiet">{p.tag}</span>
                <span className="text-[14px] leading-[1.35] text-ink">
                  {p.text}
                </span>
              </div>
              <span aria-hidden className="text-[16px] text-ink-quiet shrink-0">
                →
              </span>
            </button>
          ))}
        </div>

        {/* Past session preview */}
        <div className="mt-8 px-5">
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
            <span>last session · friday</span>
          </div>
          <h3 className="display mt-3 text-[20px] font-extrabold tracking-[-0.02em] text-ink">
            &ldquo;a fit for an open mic.&rdquo;
          </h3>
          <p className="mt-1 text-[12px] text-ink-soft">
            3 pieces. you kept the linen co-ord. returned the other two.
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[products[4], products[0], products[2]].map((p, i) => (
              <Link
                key={i}
                href={`/app/p/${p.slug}`}
                className="relative aspect-[3/4] overflow-hidden bg-paper-soft"
              >
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 130px"
                  className="object-cover"
                />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-lime px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink">
                    kept
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 mb-2 px-5 label text-ink-quiet">
          ai trained on indian fashion · powered by claude
        </div>
      </div>

      {/* Input bar */}
      <div className="relative z-30 border-t border-paper-line bg-paper p-3">
        <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-paper-soft px-4 py-3">
          <input
            type="text"
            placeholder="what are you doing tonight?"
            className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-ink-quiet focus:outline-none"
          />
          <button
            aria-label="Send"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cobalt text-paper active:scale-95"
          >
            <span aria-hidden className="text-[14px]">↑</span>
          </button>
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
