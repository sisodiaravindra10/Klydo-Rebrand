"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, formatINR, type Product } from "@/components/app/products";
import { cn } from "@/lib/cn";

type Filter =
  | "all"
  | "tops"
  | "bottoms"
  | "co-ords"
  | "₹0-1k"
  | "₹1-2k"
  | "₹2k+";

const filters: Filter[] = [
  "all",
  "tops",
  "bottoms",
  "co-ords",
  "₹0-1k",
  "₹1-2k",
  "₹2k+",
];

const cardBg: Record<string, string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  cobalt: "bg-cobalt text-paper",
  sunset: "bg-sunset text-ink",
  clay: "bg-clay text-paper",
};

const tintMap: Record<string, string> = {
  lime: "bg-lime",
  pink: "bg-pink",
  cobalt: "bg-cobalt",
  sunset: "bg-sunset",
  clay: "bg-clay",
};

function matches(p: Product, f: Filter) {
  if (f === "all") return true;
  if (f === "tops") return p.category === "tops";
  if (f === "bottoms") return p.category === "bottoms";
  if (f === "co-ords") return p.category === "co-ords";
  if (f === "₹0-1k") return p.price < 1000;
  if (f === "₹1-2k") return p.price >= 1000 && p.price < 2000;
  if (f === "₹2k+") return p.price >= 2000;
  return true;
}

export function DropsGrid() {
  const [active, setActive] = useState<Filter>("all");
  const visible = useMemo(() => products.filter((p) => matches(p, active)), [active]);
  const subtotal = visible.reduce((s, p) => s + p.price, 0);

  return (
    <>
      {/* Filter chips */}
      <nav
        aria-label="Filter drops"
        className="relative z-20 mt-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex w-max gap-2 px-5 pb-3">
          {filters.map((f) => (
            <button
              key={f}
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all active:scale-[0.96]",
                active === f
                  ? "bg-paper text-ink"
                  : "border border-paper/20 bg-transparent text-paper/70 hover:border-paper/45 hover:text-paper",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </nav>

      {/* Count + result line */}
      <div className="px-5 pb-2 label text-paper/55">
        {visible.length === products.length
          ? `${products.length} pieces tonight`
          : `${visible.length} ${visible.length === 1 ? "piece" : "pieces"} match`}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-2.5 px-5">
        {visible.map((p, i) => (
          <Link
            key={p.slug}
            href={`/app/p/${p.slug}`}
            className={cn(
              "tilt-hover group relative flex aspect-[3/4.4] flex-col overflow-hidden",
              p.tint ? cardBg[p.tint] : "bg-paper-soft text-ink",
            )}
          >
            <div className="relative h-[62%] overflow-hidden">
              <Image
                src={p.photo}
                alt={`${p.brand} ${p.name}`}
                fill
                sizes="(max-width: 768px) 50vw, 180px"
                className="object-cover"
              />
              {p.tint && (
                <div
                  aria-hidden
                  className={cn("absolute inset-0", tintMap[p.tint] ?? "")}
                  style={{ mixBlendMode: "multiply", opacity: 0.62 }}
                />
              )}
              <span className="absolute top-2 left-2 rounded-full bg-ink/40 px-2 py-0.5 text-[9px] font-mono tabnum font-semibold text-paper backdrop-blur-sm">
                {String(products.indexOf(p) + 1).padStart(2, "0")} /{" "}
                {String(products.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-3">
              <div>
                <div className="label opacity-75 text-[10px]">{p.brand}</div>
                <div className="mt-1 display text-[13px] font-semibold leading-[1.15] tracking-[-0.015em]">
                  {p.name}
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono tabnum text-[13px] font-semibold">
                  {formatINR(p.price)}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-semibold opacity-90 group-hover:opacity-100">
                  try
                  <span aria-hidden>↗</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
        {visible.length === 0 && (
          <div className="col-span-2 flex flex-col items-center gap-2 py-12 text-center">
            <div className="display text-[28px] font-extrabold leading-none tracking-[-0.03em] text-paper">
              nothing here.
            </div>
            <p className="text-[12px] text-paper/55">
              try a different filter.
            </p>
            <button
              onClick={() => setActive("all")}
              className="mt-3 rounded-full bg-lime px-4 py-2 text-[12px] font-semibold text-ink"
            >
              show all
            </button>
          </div>
        )}
      </div>

      {visible.length > 0 && (
        <div className="mx-5 mt-5 flex items-center justify-between gap-3 border border-paper/15 bg-paper/[0.04] p-4">
          <div>
            <div className="label text-paper/55">
              {visible.length === products.length ? "whole drop" : "filtered total"}
            </div>
            <div className="mt-1 font-mono tabnum text-[20px] font-semibold text-paper">
              {formatINR(subtotal)}
            </div>
          </div>
          <Link
            href="/app/bag"
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-lime-deep active:scale-[0.98]"
          >
            try {visible.length === 1 ? "this one" : `all ${visible.length}`}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      )}
    </>
  );
}
