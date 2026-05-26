import { cn } from "@/lib/cn";

const DOT = (
  <span
    aria-hidden
    className="mx-5 inline-block h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-current opacity-70 md:mx-8"
  />
);

export function Marquee({
  items,
  speed = "base",
  className,
  ariaLabel,
}: {
  items: string[];
  speed?: "slow" | "base" | "fast";
  className?: string;
  ariaLabel?: string;
}) {
  const trackClass =
    speed === "fast"
      ? "marquee-track-fast"
      : speed === "slow"
      ? "marquee-track-slow"
      : "marquee-track";

  // Duplicate for seamless loop
  const repeated = [...items, ...items];

  return (
    <div
      role="marquee"
      aria-label={ariaLabel}
      className={cn("marquee relative overflow-hidden", className)}
    >
      <div className={cn("flex w-max items-center whitespace-nowrap", trackClass)}>
        {repeated.map((text, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="px-1">{text}</span>
            {DOT}
          </span>
        ))}
      </div>
    </div>
  );
}
