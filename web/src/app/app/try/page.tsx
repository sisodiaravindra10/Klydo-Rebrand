"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
// Link is rendered for both keep and empty states
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { products, formatINR } from "@/components/app/products";

type Decision = "pending" | "keep" | "return";

const tryOnItems = [
  { product: products[0], size: "M" },
  { product: products[1], size: "30" },
  { product: products[3], size: "S" },
];

function format(ms: number) {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  return {
    m: String(Math.floor(totalSec / 60)).padStart(2, "0"),
    s: String(totalSec % 60).padStart(2, "0"),
  };
}

export default function TryOnSession() {
  // 15 minutes from page mount.
  const [endsAt] = useState(() => Date.now() + 15 * 60 * 1000);
  const [remaining, setRemaining] = useState(15 * 60 * 1000);
  const [decisions, setDecisions] = useState<Decision[]>(() =>
    tryOnItems.map(() => "pending"),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, endsAt - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const t = format(remaining);
  const expired = remaining <= 0;

  const kept = decisions.filter((d) => d === "keep").length;
  const total = useMemo(
    () =>
      tryOnItems.reduce(
        (sum, item, i) => sum + (decisions[i] === "keep" ? item.product.price : 0),
        0,
      ),
    [decisions],
  );
  const allDecided = decisions.every((d) => d !== "pending");

  return (
    <PhoneFrame surface="ink">
      <StatusBar onInk />

      {/* Header */}
      <div className="relative z-30 flex items-center justify-between px-5 pt-1 pb-2 text-paper">
        <Link
          href="/app/bag"
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 active:scale-95"
        >
          <span aria-hidden className="text-[18px]">←</span>
        </Link>
        <div className="flex items-center gap-2 label text-paper/70">
          <span className="block h-1.5 w-1.5 rounded-full bg-lime pulse" aria-hidden />
          <span>at your door</span>
        </div>
      </div>

      {/* Timer hero */}
      <div className="px-5 pb-4 text-paper">
        <div className="label text-paper/55">free try-on ends in</div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="font-mono tabnum text-[88px] font-medium leading-[0.9] tracking-[-0.04em] text-paper">
            {t.m}
            <span className="text-paper/40">:</span>
            {t.s}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-paper/55">
          <span>fifteen minutes, no awkward.</span>
        </div>
      </div>

      {/* Scrollable items */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="label text-paper/55">{tryOnItems.length} pieces to try</div>

        <ul className="mt-4 space-y-3">
          {tryOnItems.map((item, i) => {
            const decision = decisions[i];
            return (
              <li
                key={i}
                className="flex items-stretch gap-3 border border-paper/12 bg-paper/5 p-3"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-paper/10">
                  <Image
                    src={item.product.photo}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-1">
                  <div>
                    <div className="label text-paper/55">{item.product.brand}</div>
                    <div className="mt-0.5 text-[14px] font-semibold leading-tight text-paper">
                      {item.product.name}
                    </div>
                    <div className="mt-1 text-[11px] text-paper/55">
                      size {item.size} · {formatINR(item.product.price)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setDecisions((d) => d.map((v, idx) => (idx === i ? "return" : v)))
                      }
                      aria-pressed={decision === "return"}
                      className={
                        decision === "return"
                          ? "flex-1 rounded-full bg-paper px-3 py-2 text-[12px] font-semibold text-ink active:scale-[0.98]"
                          : "flex-1 rounded-full border border-paper/25 bg-transparent px-3 py-2 text-[12px] font-medium text-paper/70 transition-colors hover:border-paper/50 hover:text-paper active:scale-[0.98]"
                      }
                    >
                      send back
                    </button>
                    <button
                      onClick={() =>
                        setDecisions((d) => d.map((v, idx) => (idx === i ? "keep" : v)))
                      }
                      aria-pressed={decision === "keep"}
                      className={
                        decision === "keep"
                          ? "flex-1 rounded-full bg-lime px-3 py-2 text-[12px] font-semibold text-ink active:scale-[0.98]"
                          : "flex-1 rounded-full border border-lime/40 bg-transparent px-3 py-2 text-[12px] font-medium text-lime transition-colors hover:border-lime hover:bg-lime/10 active:scale-[0.98]"
                      }
                    >
                      keep
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Tip */}
        <div className="mt-6 flex items-start gap-3 border border-paper/10 bg-paper/[0.04] p-3">
          <span className="display text-[20px] font-extrabold leading-none text-lime">
            ✓
          </span>
          <p className="text-[12px] leading-[1.45] text-paper/70">
            The courier waits with the pieces you send back. Refund hits your
            UPI by tomorrow morning. Cards take 3 days.
          </p>
        </div>
      </div>

      {/* Sticky checkout */}
      <div className="relative z-30 border-t border-paper/15 bg-ink px-4 py-3 text-paper">
        <div className="mb-2 flex items-center justify-between px-1 text-[12px]">
          <span className="text-paper/55">
            {kept > 0
              ? `keeping ${kept} piece${kept > 1 ? "s" : ""}`
              : expired
              ? "time's up · sending all back"
              : "pick keep or send back"}
          </span>
          <span className="font-mono tabnum font-semibold text-paper">
            {formatINR(total)}
          </span>
        </div>
        <Link
          href={
            (allDecided || expired) && kept > 0
              ? "/app/checkout"
              : (allDecided || expired) && kept === 0
              ? "/app"
              : "#"
          }
          aria-disabled={!allDecided && !expired}
          className={
            (allDecided || expired) && kept > 0
              ? "flex w-full items-center justify-between gap-3 rounded-full bg-lime px-5 py-4 text-ink transition-colors hover:bg-lime-deep active:scale-[0.99]"
              : (allDecided || expired) && kept === 0
              ? "flex w-full items-center justify-between gap-3 rounded-full bg-paper px-5 py-4 text-ink active:scale-[0.99]"
              : "pointer-events-none flex w-full items-center justify-between gap-3 rounded-full bg-paper/15 px-5 py-4 text-paper/40"
          }
        >
          <span className="flex flex-col items-start">
            <span className="text-[15px] font-semibold leading-none">
              {kept === 0 && (allDecided || expired)
                ? "send everything back"
                : kept === 0
                ? "decide on each piece"
                : `checkout · ${kept} piece${kept > 1 ? "s" : ""}`}
            </span>
            <span className="mt-0.5 text-[11px] font-medium opacity-70">
              {kept > 0
                ? `${formatINR(total)} · pay by upi / cod`
                : "courier walks away with all of them"}
            </span>
          </span>
          <span aria-hidden className="text-[18px]">→</span>
        </Link>
      </div>
    </PhoneFrame>
  );
}
