"use client";

import Image from "next/image";
import { useState, useRef, type TouchEvent } from "react";
import { cn } from "@/lib/cn";

export function ProductGallery({
  photos,
  alt,
}: {
  photos: string[];
  alt: string;
}) {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0 && idx < photos.length - 1) setIdx(idx + 1);
    if (dx > 0 && idx > 0) setIdx(idx - 1);
    touchStartX.current = null;
  };

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden bg-paper-soft"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {photos.map((src, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            i === idx ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={src}
            alt={`${alt} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 390px"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Prev / next arrows (desktop only) */}
      {idx > 0 && (
        <button
          aria-label="Previous photo"
          onClick={() => setIdx(idx - 1)}
          className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink shadow-sm backdrop-blur-sm transition-all active:scale-95 hover:bg-paper md:flex"
        >
          <span aria-hidden>‹</span>
        </button>
      )}
      {idx < photos.length - 1 && (
        <button
          aria-label="Next photo"
          onClick={() => setIdx(idx + 1)}
          className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink shadow-sm backdrop-blur-sm transition-all active:scale-95 hover:bg-paper md:flex"
        >
          <span aria-hidden>›</span>
        </button>
      )}

      {/* Index pill */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium text-paper backdrop-blur-sm">
        <span className="font-mono tabnum">{idx + 1}</span>{" "}
        <span className="opacity-65">/</span>{" "}
        <span className="font-mono tabnum opacity-65">{photos.length}</span>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1">
        {photos.map((_, i) => (
          <button
            key={i}
            aria-label={`Photo ${i + 1}`}
            onClick={() => setIdx(i)}
            className={cn(
              "block h-1.5 rounded-full transition-all",
              i === idx ? "w-6 bg-paper" : "w-1.5 bg-paper/45",
            )}
          />
        ))}
      </div>
    </div>
  );
}
