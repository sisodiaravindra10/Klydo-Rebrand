import { cn } from "@/lib/cn";

export function Stamp({
  className,
  big,
  small,
  ring,
  bg = "pink",
}: {
  className?: string;
  big: string;
  small: string;
  ring?: string;
  bg?: "pink" | "lime" | "cobalt" | "sunset" | "ink";
}) {
  const bgClass =
    bg === "lime"
      ? "bg-lime text-ink"
      : bg === "cobalt"
      ? "bg-cobalt text-paper"
      : bg === "sunset"
      ? "bg-sunset text-ink"
      : bg === "ink"
      ? "bg-ink text-paper"
      : "bg-pink text-ink";

  const ringText = ring ?? "free try-on · 30 min · free try-on · 30 min · ";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Outer rotating ring (only if `ring` text is provided implicitly) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full stamp-spin"
        aria-hidden
      >
        <defs>
          <path
            id="stamp-circle"
            d="M 100, 100 m -86, 0 a 86,86 0 1,1 172,0 a 86,86 0 1,1 -172,0"
          />
        </defs>
        <text
          fontSize="14"
          fontWeight="600"
          letterSpacing="2"
          fill="currentColor"
          className="text-ink"
        >
          <textPath href="#stamp-circle" startOffset="0">
            {ringText.repeat(2)}
          </textPath>
        </text>
      </svg>

      {/* Inner solid disc */}
      <div
        className={cn(
          "relative flex aspect-square w-[72%] flex-col items-center justify-center rounded-full text-center",
          bgClass,
        )}
      >
        <div className="display font-extrabold leading-none tracking-[-0.04em] text-[34px] md:text-[40px]">
          {big}
        </div>
        <div className="mt-1 label text-[10px] opacity-80">{small}</div>
      </div>
    </div>
  );
}
