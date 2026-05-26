"use client";

import { useEffect, useState } from "react";

export function StatusBar({ onInk = false }: { onInk?: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = String(d.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const fg = onInk ? "text-paper" : "text-ink";

  return (
    <div className={`relative z-40 flex h-9 items-center justify-between px-6 ${fg}`}>
      <span className="font-mono text-[13px] tabnum font-semibold">{time || "0:00"}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal dots */}
        <div className="flex items-end gap-[2px]" aria-hidden>
          <span className="block h-[3px] w-[3px] rounded-[1px] bg-current" />
          <span className="block h-[5px] w-[3px] rounded-[1px] bg-current" />
          <span className="block h-[7px] w-[3px] rounded-[1px] bg-current" />
          <span className="block h-[9px] w-[3px] rounded-[1px] bg-current" />
        </div>
        {/* Wifi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path d="M1 4c1.5-1.3 3.5-2 5-2s3.5.7 5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M3 6.2c.9-.8 2.2-1.3 3-1.3s2.1.5 3 1.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="6" cy="8.5" r="0.7" fill="currentColor" />
        </svg>
        {/* Battery */}
        <div className="ml-1 flex items-center" aria-hidden>
          <div className="relative h-[10px] w-[20px] rounded-[2px] border border-current">
            <span className="absolute inset-[1px] right-[6px] block rounded-[1px] bg-current" />
          </div>
          <span className="block h-[4px] w-[1.5px] bg-current ml-[1px]" />
        </div>
      </div>
    </div>
  );
}
