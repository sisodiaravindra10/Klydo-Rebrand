import Link from "next/link";
import { cn } from "@/lib/cn";

type Accent = "pink" | "lime" | "cobalt" | "sunset";

export function EmptyState({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  accent = "pink",
  onInk = false,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  accent?: Accent;
  onInk?: boolean;
}) {
  const accentText = {
    pink: "text-pink",
    lime: "text-lime",
    cobalt: "text-cobalt",
    sunset: "text-sunset",
  }[accent];

  const body = onInk ? "text-paper/65" : "text-ink-soft";
  const ctaPrimary = onInk
    ? "bg-lime text-ink hover:bg-lime-deep"
    : "bg-ink text-paper hover:bg-ink-soft";
  const ctaSecondary = onInk
    ? "border-paper/30 text-paper hover:bg-paper/10"
    : "border-ink/20 text-ink hover:bg-ink/5";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <div
        className={cn(
          "display font-extrabold leading-[0.92] tracking-[-0.035em]",
          "text-[44px] md:text-[52px]",
          onInk ? "text-paper" : "text-ink",
        )}
      >
        {title}
        <span className={accentText}>.</span>
      </div>
      <p
        className={cn(
          "mt-4 max-w-[32ch] text-[14px] leading-[1.5]",
          body,
        )}
      >
        {subtitle}
      </p>
      <div className="mt-7 flex flex-col gap-2.5 w-full max-w-[280px]">
        <Link
          href={ctaHref}
          className={cn(
            "flex items-center justify-between gap-3 rounded-full px-5 py-3.5 text-[14px] font-semibold transition-all active:scale-[0.98]",
            ctaPrimary,
          )}
        >
          {ctaLabel}
          <span aria-hidden>→</span>
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className={cn(
              "flex items-center justify-center rounded-full border-2 py-3 text-[13px] font-semibold transition-all active:scale-[0.99]",
              ctaSecondary,
            )}
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
