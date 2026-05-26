"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Renders a brief confirmation toast when ?added={slug} or ?confirmed=1 is in the URL.
// Used to acknowledge "Try it on" tap from product detail.
export function ConfirmToast({
  defaultMessage = "added to bag",
  sub = "try at 6:42pm",
}: {
  defaultMessage?: string;
  sub?: string;
}) {
  const params = useSearchParams();
  const added = params.get("added");
  const confirmed = params.get("confirmed");
  const triggered = added || confirmed;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(id);
  }, [triggered]);

  if (!triggered) return null;

  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed left-1/2 z-[60] -translate-x-1/2 transition-all duration-500 ease-out md:absolute ${
        visible
          ? "top-12 opacity-100"
          : "-top-2 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink px-4 py-2.5 text-paper shadow-[0_12px_36px_-8px_rgba(0,0,0,0.35)]">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime text-ink">
          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
            <path d="M2 6.5l2.5 2.5L10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <div className="text-[13px] font-semibold leading-none">{defaultMessage}</div>
          <div className="mt-0.5 text-[11px] text-paper/60">{sub}</div>
        </div>
      </div>
    </div>
  );
}
