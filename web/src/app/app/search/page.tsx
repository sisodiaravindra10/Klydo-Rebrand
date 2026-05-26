"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products, formatINR } from "@/components/app/products";
import { IconBack, IconClose } from "@/components/app/icons";

const recents = ["linen co-ord", "oversized tee", "cropped denim", "snitch"];
const trendingBrands = [
  "snitch",
  "bewakoof",
  "h&m",
  "fabindia",
  "house of masaba",
  "urbanic",
  "the souled store",
];
const categories = [
  { label: "tops", count: 5 },
  { label: "bottoms", count: 2 },
  { label: "co-ords", count: 1 },
  { label: "outerwear", count: 2 },
  { label: "indian wear", count: 4 },
  { label: "accessories", count: 9 },
];

export default function SearchPage() {
  const [q, setQ] = useState("");
  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.brand.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Search header */}
      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/app"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
          >
            <IconBack size={20} />
          </Link>
          <div className="relative flex-1">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="brand, piece, vibe"
              className="h-11 w-full rounded-full border border-ink/10 bg-paper-soft pl-4 pr-10 text-[14px] text-ink placeholder:text-ink-quiet focus:border-ink/30 focus:outline-none"
            />
            {q && (
              <button
                aria-label="Clear"
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-quiet hover:text-ink"
              >
                <IconClose size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Results */}
        {q ? (
          <div className="px-5">
            <div className="label text-ink-quiet">
              {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;
            </div>
            {results.length === 0 ? (
              <div className="mt-9 text-center">
                <div className="display text-[28px] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  no match.
                </div>
                <p className="mt-3 text-[13px] text-ink-soft">
                  try a different brand or piece. or let the stylist pick.
                </p>
                <Link
                  href="/app/stylist"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-cobalt px-4 py-2.5 text-[13px] font-semibold text-paper transition-colors hover:bg-cobalt-deep"
                >
                  ask the stylist
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-paper-line border-y border-paper-line">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/app/p/${p.slug}`}
                      className="flex items-center gap-3 py-3 transition-colors hover:bg-paper-soft active:scale-[0.99]"
                    >
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-paper-soft">
                        <Image src={p.photo} alt={p.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="label text-ink-quiet">{p.brand}</div>
                        <div className="mt-0.5 text-[14px] font-semibold leading-tight text-ink">
                          {p.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono tabnum text-[13px] font-semibold text-ink">
                          {formatINR(p.price)}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.08em] text-ink-quiet">
                          tonight
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <>
            {/* Recent */}
            <div className="px-5">
              <div className="flex items-center gap-2 label text-ink-quiet">
                <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
                <span>recent</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {recents.map((r) => (
                  <button
                    key={r}
                    onClick={() => setQ(r)}
                    className="rounded-full border border-ink/12 bg-paper-soft px-3 py-1.5 text-[12px] text-ink-soft transition-colors hover:border-ink/30 hover:text-ink active:scale-[0.96]"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending brands */}
            <div className="mt-7 px-5">
              <div className="flex items-center gap-2 label text-ink-quiet">
                <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
                <span>brands · trending</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {trendingBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setQ(b)}
                    className="display rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-semibold text-paper transition-colors hover:bg-ink-soft active:scale-[0.96]"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mt-7 px-5">
              <div className="flex items-center gap-2 label text-ink-quiet">
                <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
                <span>browse by</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setQ(c.label)}
                    className={
                      i % 2 === 0
                        ? "flex items-center justify-between rounded-full bg-lime px-4 py-3 text-left text-ink transition-colors hover:bg-lime-deep active:scale-[0.98]"
                        : "flex items-center justify-between rounded-full bg-paper-soft px-4 py-3 text-left text-ink transition-colors hover:bg-ink/5 active:scale-[0.98]"
                    }
                  >
                    <span className="text-[13px] font-semibold">{c.label}</span>
                    <span className="font-mono tabnum text-[10px] opacity-70">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI stylist link */}
            <div className="mt-9 mx-5 bg-cobalt p-4 text-paper">
              <div className="label text-paper/65">need help deciding?</div>
              <div className="mt-2 display text-[20px] font-extrabold tracking-[-0.02em]">
                ask the stylist.
              </div>
              <Link
                href="/app/stylist"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-2 text-[12px] font-semibold text-ink active:scale-[0.97]"
              >
                open stylist
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-7 mb-2 px-5 label text-ink-quiet">
              bengaluru · ships in 30 min
            </div>
          </>
        )}
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
