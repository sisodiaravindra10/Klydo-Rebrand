import Link from "next/link";
import { cn } from "@/lib/cn";

export function Mark({
  className,
  size = "md",
  href = "/",
  onInk = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  onInk?: boolean;
}) {
  const dot = size === "lg" ? "h-4 w-4" : size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  const text =
    size === "lg"
      ? "text-[44px] md:text-[56px]"
      : size === "sm"
      ? "text-base"
      : "text-[22px] md:text-[26px]";

  const inner = (
    <span className={cn("flex items-center gap-2", className)}>
      <span className={cn(dot, "bg-lime inline-block")} aria-hidden />
      <span
        className={cn(
          "display font-extrabold tracking-[-0.04em] leading-none",
          text,
          onInk ? "text-paper" : "text-ink",
        )}
      >
        klydo
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label="Klydo home" className="inline-flex">
      {inner}
    </Link>
  );
}
