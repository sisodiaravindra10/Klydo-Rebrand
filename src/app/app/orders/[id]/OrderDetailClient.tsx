"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { products, formatINR } from "@/components/app/products";
import { IconBack } from "@/components/app/icons";
import { cn } from "@/lib/cn";

const stages = [
  { id: "accepted", label: "order accepted", sub: "6:09pm" },
  { id: "assembling", label: "pieces pulled from store", sub: "6:14pm" },
  { id: "picked-up", label: "courier picked up", sub: "6:23pm" },
  { id: "on-the-way", label: "on the way to indiranagar", sub: "now" },
  { id: "at-door", label: "at your door", sub: "in 8 min" },
] as const;

const currentStage = 3;

const items = [
  { product: products[0], size: "M" },
  { product: products[1], size: "30" },
  { product: products[3], size: "S" },
];

function arrivingInMs(now = Date.now()): number {
  // Eight minutes from page mount.
  return 8 * 60 * 1000;
}

export default function OrderDetailClient({ id }: { id: string }) {
  const [endsAt] = useState(() => Date.now() + arrivingInMs());
  const [remaining, setRemaining] = useState(arrivingInMs());

  useEffect(() => {
    const intv = setInterval(() => {
      setRemaining(Math.max(0, endsAt - Date.now()));
    }, 1000);
    return () => clearInterval(intv);
  }, [endsAt]);

  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const subtotal = items.reduce((sum, it) => sum + it.product.price, 0);

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Header */}
      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/app/orders"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
          >
            <IconBack size={20} />
          </Link>
          <div className="flex items-center gap-2 label text-pink">
            <span className="block h-1.5 w-1.5 rounded-full bg-pink pulse" aria-hidden />
            <span>live</span>
          </div>
        </div>
        <div className="mt-3 label text-ink-quiet font-mono tabnum">
          #{id}
        </div>
        <h1 className="display mt-1 font-extrabold text-[28px] leading-[1] tracking-[-0.035em] text-ink">
          on the way<span className="text-pink">.</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* ETA card */}
        <div className="mx-5 bg-ink p-5 text-paper">
          <div className="label text-paper/55">arriving in</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-mono tabnum text-[64px] font-medium leading-[0.9] tracking-[-0.03em]">
              {String(m).padStart(2, "0")}
              <span className="text-paper/40">:</span>
              {String(s).padStart(2, "0")}
            </div>
            <div className="label text-paper/55 self-end pb-1.5">min</div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-paper/65">
            <span>by 6:42pm</span>
            <span aria-hidden>·</span>
            <span>2.4 km away</span>
          </div>

          {/* Courier card */}
          <div className="mt-5 flex items-center gap-3 border-t border-paper/12 pt-4">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-paper/15">
              <Image
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&h=120&fit=crop&q=80"
                alt="Courier"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-paper">arjun k.</div>
              <div className="mt-0.5 text-[11px] text-paper/60">
                4.9 ★ · 312 trips
              </div>
            </div>
            <a
              href="https://wa.me/919999999999"
              aria-label="WhatsApp courier"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-ink active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.5 14.6c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stage timeline */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">progress</div>
          <ol className="mt-4 relative ml-1.5">
            {/* Vertical line */}
            <span className="absolute left-[5px] top-2 bottom-2 w-px bg-paper-line" aria-hidden />
            {stages.map((stage, i) => {
              const done = i < currentStage;
              const current = i === currentStage;
              return (
                <li key={stage.id} className="relative flex items-start gap-4 py-2.5">
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-1.5 block h-2.5 w-2.5 rounded-full",
                      current
                        ? "bg-pink"
                        : done
                        ? "bg-ink"
                        : "bg-paper-soft border border-ink/15",
                    )}
                  >
                    {current && (
                      <span className="absolute inset-0 -m-1 rounded-full bg-pink/30 pulse" aria-hidden />
                    )}
                  </span>
                  <div className="flex flex-1 items-center justify-between">
                    <div
                      className={cn(
                        "text-[13px] leading-tight",
                        current
                          ? "font-semibold text-ink"
                          : done
                          ? "text-ink-soft"
                          : "text-ink-quiet",
                      )}
                    >
                      {stage.label}
                    </div>
                    <div className="font-mono tabnum text-[10px] text-ink-quiet">
                      {stage.sub}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Items */}
        <div className="mt-7 px-5">
          <div className="flex items-center justify-between">
            <div className="label text-ink-quiet">
              {items.length} pieces on the way
            </div>
            <div className="font-mono tabnum text-[14px] font-semibold text-ink">
              {formatINR(subtotal)}
            </div>
          </div>
          <ul className="mt-3 divide-y divide-paper-line border-y border-paper-line">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-12 overflow-hidden bg-paper-soft">
                  <Image
                    src={item.product.photo}
                    alt={item.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="label text-ink-quiet">{item.product.brand}</div>
                  <div className="mt-0.5 text-[13px] font-semibold leading-tight text-ink">
                    {item.product.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-ink-soft">size {item.size}</div>
                </div>
                <div className="font-mono tabnum text-[13px] font-semibold text-ink">
                  {formatINR(item.product.price)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="mt-6 mx-5 flex items-center justify-between bg-paper-soft p-4">
          <div>
            <div className="text-[13px] font-semibold text-ink">need help?</div>
            <div className="mt-0.5 text-[11px] text-ink-soft">
              we reply on whatsapp under a minute.
            </div>
          </div>
          <a
            href="https://wa.me/919999999999"
            className="rounded-full bg-ink px-3 py-2 text-[12px] font-semibold text-paper transition-colors hover:bg-ink-soft active:scale-[0.96]"
          >
            chat
          </a>
        </div>

        <div className="mt-7 mb-2 px-5 label text-ink-quiet">
          payment held · charged after you keep
        </div>
      </div>

      {/* Sticky try-on entry */}
      <div className="relative z-30 border-t border-paper-line bg-paper px-4 py-3">
        <Link
          href="/app/try"
          className="flex items-center justify-between gap-3 rounded-full bg-lime px-5 py-4 text-ink transition-colors hover:bg-lime-deep active:scale-[0.99]"
        >
          <span className="flex flex-col items-start">
            <span className="text-[15px] font-semibold leading-none">
              ready to try
            </span>
            <span className="mt-0.5 text-[11px] font-medium opacity-70">
              opens when courier arrives
            </span>
          </span>
          <span aria-hidden className="text-[18px]">→</span>
        </Link>
      </div>
    </PhoneFrame>
  );
}
