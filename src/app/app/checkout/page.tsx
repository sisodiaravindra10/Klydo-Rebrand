"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { products, formatINR } from "@/components/app/products";
import { IconBack } from "@/components/app/icons";
import { cn } from "@/lib/cn";

// Stand-in: keeping 2 of 3 from the try-on session.
const kept = [
  { product: products[0], size: "M" },
  { product: products[1], size: "30" },
];

const subtotal = kept.reduce((s, it) => s + it.product.price, 0);

type Method = "upi" | "cod" | "card";

export default function CheckoutPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("upi");
  const [upi, setUpi] = useState("kavya@upi");
  const [phase, setPhase] = useState<"form" | "processing" | "done">("form");

  const startPayment = () => {
    setPhase("processing");
    window.setTimeout(() => setPhase("done"), 1500);
  };

  if (phase === "done") {
    return (
      <PhoneFrame surface="lime">
        <StatusBar />
        <div className="flex flex-1 flex-col justify-between p-6 text-ink">
          <div className="pt-6">
            <div className="label text-ink/55">payment confirmed</div>
            <h1 className="display mt-3 font-extrabold text-[56px] leading-[0.9] tracking-[-0.04em]">
              done<span className="text-pink">.</span>
            </h1>
            <p className="mt-4 text-[15px] leading-[1.5] text-ink/80">
              <span className="font-semibold">{formatINR(subtotal)}</span> paid
              via {method.toUpperCase()}. Courier walked away with the rest.
              Refund hits {method === "upi" ? "your UPI" : "your card"} by
              morning.
            </p>

            <div className="mt-7">
              <div className="label text-ink/55">what stays on</div>
              <ul className="mt-3 divide-y divide-ink/12 border-y border-ink/15">
                {kept.map((it, i) => (
                  <li key={i} className="flex items-center gap-3 py-3">
                    <div className="relative h-12 w-10 overflow-hidden bg-ink/10">
                      <Image
                        src={it.product.photo}
                        alt={it.product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-[13px]">
                      <div className="font-semibold leading-tight">{it.product.name}</div>
                      <div className="mt-0.5 text-[11px] text-ink/55">size {it.size}</div>
                    </div>
                    <span className="font-mono tabnum text-[13px] font-semibold">
                      {formatINR(it.product.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/app/orders"
              className="flex items-center justify-between rounded-full bg-ink px-5 py-4 text-paper transition-colors hover:bg-ink-soft active:scale-[0.99]"
            >
              <span className="text-[14px] font-semibold">see this order</span>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/app"
              className="flex items-center justify-center rounded-full border-2 border-ink py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper active:scale-[0.99]"
            >
              back to the feed
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/app/try"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
          >
            <IconBack size={20} />
          </Link>
          <div className="label text-ink-quiet">step 3 / 3</div>
        </div>
        <h1 className="display mt-3 font-extrabold text-[30px] leading-[0.98] tracking-[-0.035em] text-ink">
          pay for what
          <br />
          you keep<span className="text-pink">.</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Items */}
        <div className="px-5">
          <div className="label text-ink-quiet">keeping {kept.length}</div>
          <ul className="mt-3 divide-y divide-paper-line border-y border-paper-line">
            {kept.map((it, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-12 overflow-hidden bg-paper-soft">
                  <Image
                    src={it.product.photo}
                    alt={it.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="label text-ink-quiet">{it.product.brand}</div>
                  <div className="mt-0.5 text-[13px] font-semibold leading-tight text-ink">
                    {it.product.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-ink-soft">size {it.size}</div>
                </div>
                <span className="font-mono tabnum text-[13px] font-semibold text-ink">
                  {formatINR(it.product.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Method */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">pay with</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(["upi", "cod", "card"] as Method[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                aria-pressed={method === m}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 transition-all active:scale-[0.97]",
                  method === m
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/12 bg-paper text-ink hover:border-ink/30",
                )}
              >
                <span className="display text-[14px] font-semibold uppercase tracking-wider">
                  {m}
                </span>
                <span className="text-[10px] opacity-70">
                  {m === "upi" ? "instant" : m === "cod" ? "on door" : "3 days"}
                </span>
              </button>
            ))}
          </div>

          {/* Method input */}
          {method === "upi" && (
            <div className="mt-3">
              <label className="label text-ink-quiet" htmlFor="upi">
                upi id
              </label>
              <input
                id="upi"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="mt-2 w-full rounded-full border border-ink/12 bg-paper-soft px-4 py-3 text-[14px] text-ink focus:border-ink/40 focus:outline-none"
              />
            </div>
          )}
          {method === "cod" && (
            <div className="mt-3 bg-paper-soft p-3 text-[12px] leading-[1.45] text-ink-soft">
              Pay the courier in cash. ₹5 service fee added.
            </div>
          )}
          {method === "card" && (
            <div className="mt-3 bg-paper-soft p-3 text-[12px] leading-[1.45] text-ink-soft">
              We&apos;ll redirect to the payment gateway after you tap pay.
            </div>
          )}
        </div>

        {/* Address */}
        <div className="mt-7 px-5">
          <div className="flex items-center justify-between">
            <div className="label text-ink-quiet">delivering to</div>
            <button className="text-[11px] font-medium text-ink underline-offset-2 hover:underline">
              change
            </button>
          </div>
          <div className="mt-3 bg-paper-soft p-3 text-[12px] leading-[1.45] text-ink-soft">
            home · 4th cross, 12th main, indiranagar · 560038
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-7 mx-5 border border-paper-line p-4">
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-ink-soft">{kept.length} pieces</span>
              <span className="font-mono tabnum font-semibold text-ink">
                {formatINR(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">delivery</span>
              <span className="font-mono tabnum text-ink">free</span>
            </div>
            {method === "cod" && (
              <div className="flex justify-between">
                <span className="text-ink-soft">cod fee</span>
                <span className="font-mono tabnum text-ink">₹5</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-baseline justify-between border-t border-paper-line pt-3">
            <span className="label text-ink-quiet">total</span>
            <span className="font-mono tabnum text-[20px] font-semibold text-ink">
              {formatINR(subtotal + (method === "cod" ? 5 : 0))}
            </span>
          </div>
        </div>

        <div className="mt-5 mb-2 px-5 label text-ink-quiet">
          paying for what stays on · the rest goes back with the courier
        </div>
      </div>

      {/* Sticky pay */}
      <div className="relative z-30 border-t border-paper-line bg-paper px-4 py-3">
        <button
          onClick={startPayment}
          disabled={phase === "processing"}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-full px-5 py-4 transition-all",
            phase === "processing"
              ? "bg-ink text-paper"
              : "bg-lime text-ink hover:bg-lime-deep active:scale-[0.99]",
          )}
        >
          <span className="flex flex-col items-start">
            <span className="text-[15px] font-semibold leading-none">
              {phase === "processing" ? "processing..." : `pay ${formatINR(subtotal + (method === "cod" ? 5 : 0))}`}
            </span>
            <span className="mt-0.5 text-[11px] font-medium opacity-70">
              {phase === "processing" ? "do not close" : `via ${method.toUpperCase()}`}
            </span>
          </span>
          <span aria-hidden className="text-[18px]">
            {phase === "processing" ? "⏳" : "→"}
          </span>
        </button>
      </div>
    </PhoneFrame>
  );
}
