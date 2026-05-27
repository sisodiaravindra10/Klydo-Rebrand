import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products, formatINR } from "@/components/app/products";
import { IconClose, IconPin } from "@/components/app/icons";
import { ConfirmToast } from "@/components/app/ConfirmToast";

// Stand-in cart: first 3 products + chosen size.
const basket = [
  { product: products[0], size: "M" },
  { product: products[1], size: "30" },
  { product: products[3], size: "S" },
];

const subtotal = basket.reduce((s, item) => s + item.product.price, 0);

export default function BagPage() {
  return (
    <PhoneFrame surface="paper">
      <Suspense fallback={null}>
        <ConfirmToast defaultMessage="added to bag" sub="trying at 6:42pm" />
      </Suspense>
      <StatusBar />

      {/* Header */}
      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="label text-ink-quiet">going out for try-on</div>
            <h1 className="display mt-1 font-extrabold text-[34px] leading-[1] tracking-[-0.035em] text-ink">
              your bag<span className="text-pink">.</span>
            </h1>
          </div>
          <div className="flex items-baseline gap-1.5 font-mono tabnum text-[14px] font-semibold text-ink">
            <span>{basket.length}</span>
            <span className="text-ink-quiet">/ 6</span>
          </div>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pb-2">
        {/* Items */}
        <ul className="divide-y divide-paper-line">
          {basket.map((item, i) => (
            <li key={i} className="flex items-stretch gap-3 px-5 py-4">
              <Link
                href={`/app/p/${item.product.slug}`}
                className="relative h-24 w-20 shrink-0 overflow-hidden bg-paper-soft"
              >
                <Image
                  src={item.product.photo}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-1">
                <div>
                  <div className="label text-ink-quiet">{item.product.brand}</div>
                  <div className="mt-0.5 text-[15px] font-semibold leading-tight text-ink">
                    {item.product.name}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[12px] text-ink-soft">
                    <span>size {item.size}</span>
                    <span aria-hidden>·</span>
                    <span>{item.product.colors?.[0]?.name ?? "default"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono tabnum text-[14px] font-semibold text-ink">
                    {formatINR(item.product.price)}
                  </span>
                  <button
                    aria-label="Remove"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-ink-quiet hover:text-ink active:scale-90"
                  >
                    <IconClose size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Add more */}
        <Link
          href="/app"
          className="mx-5 mt-2 flex items-center justify-between rounded-full border border-dashed border-ink/20 px-4 py-3 text-[13px] font-medium text-ink-quiet transition-colors hover:border-ink/40 hover:text-ink"
        >
          <span>add more · up to 6 pieces</span>
          <span aria-hidden>+</span>
        </Link>

        {/* Address */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">delivering to</div>
          <div className="mt-3 flex items-start gap-3 border border-paper-line bg-paper-soft p-4">
            <div className="mt-0.5 text-ink-quiet">
              <IconPin size={18} />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-semibold text-ink">home</div>
              <div className="mt-0.5 text-[13px] leading-[1.45] text-ink-soft">
                4th cross, 12th main, indiranagar.
                <br />
                opposite the original juice bar.
              </div>
              <div className="mt-2.5 flex items-center gap-2 label text-ink">
                <span className="block h-1.5 w-1.5 rounded-full bg-pink pulse" aria-hidden />
                <span>courier arrives by 6:42pm</span>
              </div>
            </div>
            <button className="self-start text-[12px] font-medium text-ink underline-offset-2 hover:underline">
              change
            </button>
          </div>
        </div>

        {/* Try-rules reminder */}
        <div className="mt-6 mx-5 flex items-start gap-3 bg-lime/55 p-4">
          <div className="display text-[28px] font-extrabold leading-none tracking-[-0.03em] text-ink">
            15
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-ink">
              free 15-minute try-on
            </div>
            <p className="mt-0.5 text-[12.5px] leading-[1.45] text-ink/75">
              We won&apos;t charge a paisa yet. Try every piece. Hand back what
              doesn&apos;t fit. Pay for what stays on.
            </p>
          </div>
        </div>

        <div className="mt-7 mb-2 px-5 label text-ink-quiet">
          payment · upi · cod · card
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="relative z-30 border-t border-paper-line bg-paper px-4 py-3">
        <div className="mb-2 flex items-center justify-between px-1 text-[12px]">
          <span className="text-ink-quiet">to pay now</span>
          <span className="font-mono tabnum font-semibold text-ink">₹0</span>
        </div>
        <Link
          href="/app/try"
          className="flex items-center justify-between gap-3 rounded-full bg-lime px-5 py-4 text-ink transition-colors hover:bg-lime-deep active:scale-[0.99]"
        >
          <span className="flex flex-col items-start">
            <span className="text-[15px] font-semibold leading-none">
              schedule try-on
            </span>
            <span className="mt-0.5 text-[11px] font-medium opacity-70">
              {basket.length} pieces · {formatINR(subtotal)} on hold
            </span>
          </span>
          <span aria-hidden className="text-[18px]">→</span>
        </Link>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
