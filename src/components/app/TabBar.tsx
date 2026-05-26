"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconDrops, IconStylist, IconBag, IconYou } from "./icons";
import { cn } from "@/lib/cn";

type TabItem = {
  href: string;
  label: string;
  Icon: typeof IconHome;
  match: (path: string) => boolean;
};

const tabs: TabItem[] = [
  {
    href: "/app",
    label: "home",
    Icon: IconHome,
    match: (p) =>
      p === "/app" ||
      p === "/app/feed" ||
      p.startsWith("/app/p/") ||
      p.startsWith("/app/b/") ||
      p === "/app/search",
  },
  {
    href: "/app/drops",
    label: "drops",
    Icon: IconDrops,
    match: (p) => p.startsWith("/app/drops"),
  },
  {
    href: "/app/stylist",
    label: "stylist",
    Icon: IconStylist,
    match: (p) => p.startsWith("/app/stylist"),
  },
  {
    href: "/app/bag",
    label: "bag",
    Icon: IconBag,
    match: (p) =>
      p.startsWith("/app/bag") ||
      p.startsWith("/app/try") ||
      p.startsWith("/app/checkout"),
  },
  {
    href: "/app/you",
    label: "you",
    Icon: IconYou,
    match: (p) =>
      p.startsWith("/app/you") ||
      p.startsWith("/app/orders") ||
      p.startsWith("/app/saved") ||
      p.startsWith("/app/notifications"),
  },
];

export function TabBar({ onInk = false }: { onInk?: boolean }) {
  const path = usePathname();

  return (
    <nav
      aria-label="App navigation"
      className={cn(
        "relative z-40 flex items-stretch justify-around border-t",
        onInk
          ? "border-paper/15 bg-ink/95 backdrop-blur-md text-paper"
          : "border-paper-line bg-paper/95 backdrop-blur-md text-ink",
      )}
    >
      {tabs.map((tab) => {
        const active = tab.match(path);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="group flex flex-1 flex-col items-center gap-1 py-2.5 active:scale-[0.96] transition-transform"
          >
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center transition-colors",
                active
                  ? onInk
                    ? "text-lime"
                    : "text-ink"
                  : onInk
                  ? "text-paper/55"
                  : "text-ink-quiet",
              )}
            >
              <tab.Icon size={22} />
            </span>
            <span
              className={cn(
                "text-[10px] font-medium tracking-[0.04em]",
                active
                  ? onInk
                    ? "text-lime"
                    : "text-ink"
                  : onInk
                  ? "text-paper/55"
                  : "text-ink-quiet",
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
