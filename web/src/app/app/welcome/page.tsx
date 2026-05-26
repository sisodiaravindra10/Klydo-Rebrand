"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { cn } from "@/lib/cn";

type Step = "splash" | "intro" | "phone" | "otp" | "style";

const intros = [
  {
    accent: "lime",
    big: "30 min.",
    small: "delivered",
    title: "fashion in thirty.",
    body: "We deliver across Bengaluru in 30 minutes. Not three days. Not next week. Tonight.",
  },
  {
    accent: "pink",
    big: "free try.",
    small: "at your door",
    title: "try every piece.",
    body: "Courier waits. Wear them in your room. Move in them. Pay only for what stays on.",
  },
  {
    accent: "cobalt",
    big: "7pm sharp.",
    small: "one drop a day",
    title: "eight pieces, hand-picked.",
    body: "One curated edit every day. Linen mornings, denim weekends, knit nights. They go fast.",
  },
];

const styles = [
  { id: "minimal", label: "minimal", emoji: "▮" },
  { id: "loud", label: "loud", emoji: "★" },
  { id: "earth", label: "earth tones", emoji: "◐" },
  { id: "street", label: "streetwear", emoji: "◢" },
  { id: "fusion", label: "indian fusion", emoji: "✦" },
  { id: "office", label: "office casual", emoji: "▤" },
  { id: "athleisure", label: "athleisure", emoji: "▷" },
  { id: "vintage", label: "vintage", emoji: "◬" },
  { id: "evening", label: "evening", emoji: "◯" },
];

const accentBg: Record<string, string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  cobalt: "bg-cobalt text-paper",
};

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("splash");
  const [introIdx, setIntroIdx] = useState(0);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [picks, setPicks] = useState<Set<string>>(new Set());

  const finish = () => router.push("/app");

  return (
    <PhoneFrame surface="ink">
      <StatusBar onInk />

      {/* SPLASH */}
      {step === "splash" && (
        <div className="flex flex-1 flex-col justify-between p-6 text-paper">
          <div className="pt-8">
            <div className="flex items-baseline gap-2">
              <span className="block h-3 w-3 bg-lime" aria-hidden />
              <span className="display text-[34px] font-extrabold tracking-[-0.04em] leading-none">
                klydo
              </span>
            </div>
            <div className="mt-2 label text-paper/55">bengaluru. 7pm.</div>
          </div>

          <div>
            <h1 className="display text-[56px] font-extrabold leading-[0.9] tracking-[-0.04em]">
              fashion
              <br />
              in thirty<span className="text-lime">.</span>
            </h1>
            <p className="mt-5 max-w-[28ch] text-[15px] leading-[1.5] text-paper/65">
              Drops at 7pm. Delivered by 7:30. Try at the door. Pay only for
              what you keep.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setStep("intro")}
              className="flex items-center justify-between rounded-full bg-lime px-5 py-4 text-ink transition-colors hover:bg-lime-deep active:scale-[0.99]"
            >
              <span className="text-[15px] font-semibold leading-none">
                start here
              </span>
              <span aria-hidden className="text-[18px]">→</span>
            </button>
            <button
              onClick={() => setStep("phone")}
              className="rounded-full py-3 text-[13px] font-medium text-paper/65 underline-offset-2 hover:underline"
            >
              i already have an account
            </button>
          </div>
        </div>
      )}

      {/* INTRO carousel */}
      {step === "intro" && (
        <div className="flex flex-1 flex-col justify-between p-6 text-paper">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 label text-paper/55">
              <span className="font-mono tabnum text-paper">
                {String(introIdx + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span className="font-mono tabnum">
                {String(intros.length).padStart(2, "0")}
              </span>
            </div>
            <button
              onClick={() => setStep("phone")}
              className="text-[12px] font-medium text-paper/55 underline-offset-2 hover:underline hover:text-paper"
            >
              skip
            </button>
          </div>

          {/* Card */}
          <div className={cn("relative -mx-6 px-6 py-10", accentBg[intros[introIdx].accent])}>
            <div className="display text-[88px] font-extrabold leading-[0.85] tracking-[-0.045em]">
              {intros[introIdx].big}
            </div>
            <div className="mt-3 label opacity-65">{intros[introIdx].small}</div>
          </div>

          <div>
            <h2 className="display text-[28px] font-extrabold leading-[1.02] tracking-[-0.03em] text-paper">
              {intros[introIdx].title}
            </h2>
            <p className="mt-3 text-[14px] leading-[1.55] text-paper/70">
              {intros[introIdx].body}
            </p>
          </div>

          {/* Dots + next */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {intros.map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn(
                    "block h-1.5 rounded-full transition-all",
                    i === introIdx ? "w-6 bg-paper" : "w-1.5 bg-paper/30",
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => {
                if (introIdx < intros.length - 1) setIntroIdx(introIdx + 1);
                else setStep("phone");
              }}
              className="rounded-full bg-paper px-5 py-3 text-[13px] font-semibold text-ink active:scale-[0.97]"
            >
              {introIdx < intros.length - 1 ? "next →" : "got it →"}
            </button>
          </div>
        </div>
      )}

      {/* PHONE */}
      {step === "phone" && (
        <div className="flex flex-1 flex-col justify-between p-6 text-paper">
          <div>
            <div className="label text-paper/55">step 1 / 2</div>
            <h2 className="display mt-3 text-[30px] font-extrabold leading-[1] tracking-[-0.035em]">
              your number<span className="text-lime">.</span>
            </h2>
            <p className="mt-3 text-[13px] text-paper/65">
              we&apos;ll text you a 4-digit code. no spam.
            </p>

            <div className="mt-8 flex items-stretch gap-2">
              <div className="flex items-center justify-center rounded-full bg-paper/10 px-4 text-[15px] font-medium text-paper">
                +91
              </div>
              <input
                type="tel"
                autoFocus
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="9876543210"
                className="flex-1 rounded-full border border-paper/20 bg-transparent px-4 py-3 font-mono tabnum text-[18px] text-paper placeholder:text-paper/30 focus:border-paper/50 focus:outline-none"
              />
            </div>

            <p className="mt-4 text-[11px] leading-[1.55] text-paper/45">
              by continuing you accept the{" "}
              <span className="text-paper/75 underline-offset-2">terms</span>{" "}
              and{" "}
              <span className="text-paper/75 underline-offset-2">privacy policy</span>.
            </p>
          </div>

          <button
            onClick={() => phone.length === 10 && setStep("otp")}
            disabled={phone.length !== 10}
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-4 transition-all",
              phone.length === 10
                ? "bg-lime text-ink hover:bg-lime-deep active:scale-[0.99]"
                : "bg-paper/10 text-paper/40",
            )}
          >
            <span className="text-[15px] font-semibold leading-none">continue</span>
            <span aria-hidden className="text-[18px]">→</span>
          </button>
        </div>
      )}

      {/* OTP */}
      {step === "otp" && (
        <div className="flex flex-1 flex-col justify-between p-6 text-paper">
          <div>
            <div className="label text-paper/55">step 2 / 2</div>
            <h2 className="display mt-3 text-[30px] font-extrabold leading-[1] tracking-[-0.035em]">
              code<span className="text-pink">.</span>
            </h2>
            <p className="mt-3 text-[13px] text-paper/65">
              sent to +91 {phone || "9876543210"}.{" "}
              <button
                onClick={() => setStep("phone")}
                className="text-paper underline-offset-2 hover:underline"
              >
                change
              </button>
            </p>

            <div className="mt-9 flex gap-2.5">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  inputMode="numeric"
                  maxLength={1}
                  autoFocus={i === 0}
                  value={otp[i] ?? ""}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    const next = otp.split("");
                    next[i] = v;
                    setOtp(next.join(""));
                    // auto-advance focus
                    const sib = e.target.nextElementSibling as HTMLInputElement | null;
                    if (v && sib) sib.focus();
                  }}
                  className="aspect-square w-14 rounded-2xl border border-paper/20 bg-transparent text-center font-mono tabnum text-[24px] font-medium text-paper focus:border-lime focus:outline-none"
                />
              ))}
            </div>

            <button className="mt-6 text-[12px] font-medium text-paper/55 underline-offset-2 hover:underline">
              resend in 0:24
            </button>
          </div>

          <button
            onClick={() => otp.length === 4 && setStep("style")}
            disabled={otp.length !== 4}
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-4 transition-all",
              otp.length === 4
                ? "bg-lime text-ink hover:bg-lime-deep active:scale-[0.99]"
                : "bg-paper/10 text-paper/40",
            )}
          >
            <span className="text-[15px] font-semibold leading-none">verify</span>
            <span aria-hidden className="text-[18px]">→</span>
          </button>
        </div>
      )}

      {/* STYLE QUIZ */}
      {step === "style" && (
        <div className="flex flex-1 flex-col p-6 text-paper">
          <div>
            <div className="label text-paper/55">last bit</div>
            <h2 className="display mt-3 text-[30px] font-extrabold leading-[1] tracking-[-0.035em]">
              what&apos;s your
              <br />
              vibe<span className="text-cobalt">?</span>
            </h2>
            <p className="mt-3 text-[13px] text-paper/65">
              pick at least 3. we&apos;ll learn the rest from your keeps.
            </p>
          </div>

          <div className="mt-7 grid flex-1 grid-cols-3 gap-2 overflow-y-auto pb-4">
            {styles.map((s) => {
              const on = picks.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() =>
                    setPicks((curr) => {
                      const next = new Set(curr);
                      if (next.has(s.id)) next.delete(s.id);
                      else next.add(s.id);
                      return next;
                    })
                  }
                  aria-pressed={on}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition-all active:scale-[0.96]",
                    on
                      ? "border-lime bg-lime text-ink"
                      : "border-paper/15 bg-paper/[0.04] text-paper hover:border-paper/35",
                  )}
                >
                  <span className="display text-[22px] font-extrabold leading-none">
                    {s.emoji}
                  </span>
                  <span className="text-[10px] font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="label text-paper/55">
              <span className="font-mono tabnum text-paper">{picks.size}</span> /{" "}
              {styles.length} picked
            </span>
            <button
              onClick={finish}
              disabled={picks.size < 3}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-3.5 transition-all",
                picks.size >= 3
                  ? "bg-lime text-ink hover:bg-lime-deep active:scale-[0.99]"
                  : "bg-paper/10 text-paper/40",
              )}
            >
              <span className="text-[14px] font-semibold leading-none">
                {picks.size >= 3 ? "open the feed" : `pick ${3 - picks.size} more`}
              </span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
