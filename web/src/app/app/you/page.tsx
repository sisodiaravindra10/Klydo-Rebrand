import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products, formatINR } from "@/components/app/products";

const orders = [
  { date: "today", status: "trying on", icon: "pulse" as const, value: 4797 },
  { date: "fri", status: "kept 2 of 5", icon: "kept" as const, value: 4198 },
  { date: "wed", status: "all returned · refunded", icon: "return" as const, value: 0 },
];

const menu: { label: string; count: string; href: string }[] = [
  { label: "orders", count: "12", href: "/app/orders" },
  { label: "saved", count: "47", href: "/app/saved" },
  { label: "search", count: "", href: "/app/search" },
  { label: "addresses", count: "2", href: "#" },
  { label: "wallet", count: "₹240", href: "#" },
  { label: "payment methods", count: "", href: "#" },
  { label: "notifications", count: "", href: "#" },
  { label: "settings", count: "", href: "#" },
  { label: "help · whatsapp", count: "", href: "https://wa.me/" },
];

export default function YouPage() {
  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="label text-ink-quiet">style profile</div>
            <h1 className="display mt-1 font-extrabold text-[34px] leading-[0.98] tracking-[-0.035em] text-ink">
              kavya s<span className="text-pink">.</span>
            </h1>
          </div>
          <div className="relative h-14 w-14 overflow-hidden rounded-full bg-ink/10">
            <Image
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=160&h=160&fit=crop&q=85"
              alt="Avatar"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Style tags */}
        <div className="px-5">
          <div className="flex flex-wrap gap-1.5">
            {["minimal-loud", "earth tones", "size m / 28", "indiranagar"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/12 bg-paper-soft px-3 py-1 text-[12px] text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats trio */}
        <div className="mt-6 grid grid-cols-3 gap-3 px-5">
          <div className="bg-lime p-3 text-ink">
            <div className="font-mono tabnum text-[24px] font-medium leading-none tracking-[-0.03em]">
              12
            </div>
            <div className="mt-2 label">orders</div>
          </div>
          <div className="bg-pink p-3 text-ink">
            <div className="font-mono tabnum text-[24px] font-medium leading-none tracking-[-0.03em]">
              47
            </div>
            <div className="mt-2 label">saved</div>
          </div>
          <div className="bg-ink p-3 text-paper">
            <div className="font-mono tabnum text-[24px] font-medium leading-none tracking-[-0.03em]">
              68%
            </div>
            <div className="mt-2 label">keep rate</div>
          </div>
        </div>

        {/* Active orders */}
        <div className="mt-7 px-5">
          <div className="flex items-center gap-2 label text-ink-quiet">
            <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
            <span>active &amp; recent</span>
          </div>
        </div>

        <ul className="mt-3 divide-y divide-paper-line border-y border-paper-line">
          {orders.map((o, i) => (
            <li key={i} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={
                    o.icon === "pulse"
                      ? "block h-2 w-2 rounded-full bg-pink pulse"
                      : o.icon === "kept"
                      ? "block h-2 w-2 rounded-full bg-lime"
                      : "block h-2 w-2 rounded-full bg-ink-quiet"
                  }
                />
                <div>
                  <div className="text-[14px] font-semibold text-ink">
                    {o.status}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-ink-quiet">
                    {o.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono tabnum text-[13px] font-semibold text-ink">
                  {o.value > 0 ? formatINR(o.value) : "0"}
                </span>
                <span aria-hidden className="text-ink-quiet">→</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Wallet card */}
        <Link
          href="#wallet"
          className="mx-5 mt-7 block bg-cobalt p-4 text-paper transition-colors hover:bg-cobalt-deep active:scale-[0.99]"
        >
          <div className="flex items-baseline justify-between">
            <div className="label text-paper/70">klydo wallet</div>
            <span aria-hidden>→</span>
          </div>
          <div className="mt-2 font-mono tabnum text-[28px] font-medium leading-none tracking-[-0.02em]">
            ₹240
          </div>
          <div className="mt-2 text-[12px] text-paper/70">
            from a returned co-ord. use it on tonight&apos;s drop.
          </div>
        </Link>

        {/* Menu list */}
        <ul className="mt-7 border-y border-paper-line">
          {menu.map((m) => (
            <li key={m.label}>
              <Link
                href={m.href}
                className="flex items-center justify-between border-b border-paper-line px-5 py-3.5 transition-colors hover:bg-paper-soft active:scale-[0.998]"
              >
                <span className="text-[14px] text-ink">{m.label}</span>
                <div className="flex items-center gap-3 text-ink-quiet">
                  {m.count && (
                    <span className="font-mono tabnum text-[12px]">{m.count}</span>
                  )}
                  <span aria-hidden>→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign out */}
        <div className="mt-7 px-5">
          <button className="text-[12px] uppercase tracking-[0.1em] text-ink-quiet underline-offset-2 hover:underline">
            sign out
          </button>
        </div>

        <div className="mt-8 mb-2 px-5 label text-ink-quiet">
          klydo v1.0 · made in bengaluru
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
