import Link from "next/link";
import { cn } from "@/lib/cn";

// Phone-frame wrapper.
// Desktop: 390x844 framed mockup, centered on paper-soft canvas.
// Mobile: full-bleed (the user is already on a phone, don't double-frame).
export function PhoneFrame({
  children,
  surface = "paper",
}: {
  children: React.ReactNode;
  surface?: "paper" | "ink" | "lime";
}) {
  const screenBg =
    surface === "ink" ? "md:bg-ink" : surface === "lime" ? "md:bg-lime" : "md:bg-paper";
  const mobileBg =
    surface === "ink" ? "bg-ink" : surface === "lime" ? "bg-lime" : "bg-paper";

  return (
    <div className="relative min-h-[100dvh] md:bg-paper-soft md:py-12">
      {/* Back-to-landing on desktop, top-left corner of the canvas */}
      <Link
        href="/"
        className="absolute left-6 top-6 z-50 hidden items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-paper transition-colors hover:bg-ink-soft md:inline-flex"
      >
        <span aria-hidden>←</span>
        <span>klydo.in</span>
      </Link>

      <div className="md:mx-auto md:flex md:items-center md:justify-center">
        {/* Phone shell */}
        <div
          className={cn(
            "relative w-full md:w-[390px] md:h-[844px] md:max-h-[calc(100vh-96px)] md:bg-ink md:rounded-[48px] md:p-[10px] md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.28)]",
            mobileBg,
          )}
        >
          {/* Screen */}
          <div
            className={cn(
              "relative h-full w-full md:rounded-[38px] md:overflow-hidden",
              screenBg,
              mobileBg,
            )}
          >
            {/* Dynamic Island (desktop only) */}
            <div
              aria-hidden
              className="absolute left-1/2 top-2 z-50 hidden h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-ink md:block"
            />

            {/* App content fills the screen */}
            <div className="relative flex h-full min-h-[100dvh] w-full flex-col md:min-h-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
