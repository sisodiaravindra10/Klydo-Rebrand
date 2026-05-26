"use client";

import { useEffect, useState } from "react";

// Next 7pm IST. IST = UTC+5:30, so 7pm IST = 13:30 UTC.
function nextDropTimeMs(now = Date.now()): number {
  const d = new Date(now);
  const drop = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 13, 30, 0, 0),
  );
  if (now >= drop.getTime()) drop.setUTCDate(drop.getUTCDate() + 1);
  return drop.getTime();
}

function format(ms: number) {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  return {
    h: String(Math.floor(totalSec / 3600)).padStart(2, "0"),
    m: String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0"),
    s: String(totalSec % 60).padStart(2, "0"),
  };
}

export function LiveTimer({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    let raf = 0;
    const target = nextDropTimeMs();
    const tick = () => {
      setRemaining(target - Date.now());
      raf = window.setTimeout(tick, 1000) as unknown as number;
    };
    setMounted(true);
    tick();
    return () => clearTimeout(raf);
  }, []);

  const t = mounted ? format(remaining) : { h: "00", m: "00", s: "00" };

  return (
    <div
      className={`font-mono tabnum text-[40px] leading-[0.95] tracking-[-0.02em] md:text-[56px] lg:text-[64px] ${className ?? ""}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{t.h}</span>
      <span className="mx-0.5 text-ink-quiet">:</span>
      <span>{t.m}</span>
      <span className="mx-0.5 text-ink-quiet">:</span>
      <span>{t.s}</span>
    </div>
  );
}
