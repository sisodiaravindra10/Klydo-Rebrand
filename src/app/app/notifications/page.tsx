import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { products } from "@/components/app/products";
import { IconBack } from "@/components/app/icons";
import { cn } from "@/lib/cn";

type Notif = {
  kind: "drop" | "order" | "stylist" | "wallet" | "social";
  title: string;
  body: string;
  time: string;
  unread?: boolean;
  href?: string;
  productIdx?: number;
};

type Group = {
  label: string;
  items: Notif[];
};

const groups: Group[] = [
  {
    label: "today",
    items: [
      {
        kind: "drop",
        title: "the brunch edit drops in 1h 14m",
        body: "Eight pieces. Linen, denim, one knit. Tap to peek.",
        time: "5:46pm",
        unread: true,
        href: "/app/drops",
        productIdx: 0,
      },
      {
        kind: "order",
        title: "your courier picked up 3 pieces",
        body: "Arjun is 2.4 km away. Arrives by 6:42pm.",
        time: "5:23pm",
        unread: true,
        href: "/app/orders/klyd-3829",
      },
      {
        kind: "stylist",
        title: "the stylist has a fit for you",
        body: "An open-mic outfit, three pieces, ₹3,200 total.",
        time: "3:11pm",
        unread: true,
        href: "/app/stylist",
        productIdx: 4,
      },
    ],
  },
  {
    label: "yesterday",
    items: [
      {
        kind: "order",
        title: "you kept 2 of 5 from friday",
        body: "₹4,198 paid via UPI. Refund of ₹3,597 hit your wallet.",
        time: "8:14pm",
        href: "/app/orders",
      },
      {
        kind: "drop",
        title: "missed the gallery night edit",
        body: "Six pieces · sold out in 28 minutes.",
        time: "7:00pm",
        href: "/app/drops",
        productIdx: 4,
      },
      {
        kind: "wallet",
        title: "₹240 added to your wallet",
        body: "From your linen co-ord return. Spend it on tonight's drop.",
        time: "11:42am",
        href: "/app/you",
      },
    ],
  },
  {
    label: "earlier this week",
    items: [
      {
        kind: "social",
        title: "tag #klydo to be on the home screen",
        body: "Real fits, real people. Wednesday round-up at 12pm.",
        time: "wed",
        href: "/app",
      },
      {
        kind: "drop",
        title: "first day, new place. 7 pieces",
        body: "An office-casual edit. Linen, ribbed knit, denim.",
        time: "tue · 7:00pm",
        href: "/app/drops",
        productIdx: 2,
      },
    ],
  },
];

const kindAccent: Record<Notif["kind"], string> = {
  drop: "bg-pink",
  order: "bg-lime",
  stylist: "bg-cobalt",
  wallet: "bg-sunset",
  social: "bg-ink",
};

export default function NotificationsPage() {
  const unreadCount = groups.flatMap((g) => g.items).filter((i) => i.unread).length;

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Header */}
      <div className="relative z-30 flex items-center justify-between gap-2 px-3 pt-1 pb-2">
        <Link
          href="/app"
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
        >
          <IconBack size={20} />
        </Link>
        <div className="label text-ink-quiet">
          <span className="font-mono tabnum text-ink">{unreadCount}</span> unread
        </div>
        <button className="text-[12px] font-medium text-ink underline-offset-2 hover:underline">
          mark all read
        </button>
      </div>

      <div className="px-5 pb-3">
        <h1 className="display font-extrabold text-[34px] leading-[0.98] tracking-[-0.035em] text-ink">
          notifications<span className="text-pink">.</span>
        </h1>
      </div>

      {/* Grouped list */}
      <div className="flex-1 overflow-y-auto pb-4">
        {groups.map((g, gi) => (
          <section key={gi} className="mt-4">
            <div className="flex items-center gap-2 px-5 pb-3 label text-ink-quiet">
              <span className="block h-px w-6 bg-ink-quiet" aria-hidden />
              <span>{g.label}</span>
            </div>
            <ul className="divide-y divide-paper-line border-y border-paper-line">
              {g.items.map((n, i) => (
                <li key={i}>
                  <Link
                    href={n.href ?? "#"}
                    className={cn(
                      "flex items-start gap-3 px-5 py-3.5 transition-colors active:scale-[0.998]",
                      n.unread ? "bg-paper" : "bg-paper hover:bg-paper-soft",
                    )}
                  >
                    {/* Photo or icon block */}
                    {n.productIdx !== undefined ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-paper-soft">
                        <Image
                          src={products[n.productIdx].photo}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center",
                          kindAccent[n.kind],
                          n.kind === "social" || n.kind === "stylist" ? "text-paper" : "text-ink",
                        )}
                      >
                        <span className="display text-[15px] font-extrabold">
                          {n.kind[0].toUpperCase()}
                        </span>
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div
                          className={cn(
                            "text-[13.5px] leading-[1.35]",
                            n.unread ? "font-semibold text-ink" : "text-ink-soft",
                          )}
                        >
                          {n.title}
                        </div>
                        <span className="shrink-0 font-mono tabnum text-[10px] text-ink-quiet">
                          {n.time}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] leading-[1.45] text-ink-soft">
                        {n.body}
                      </p>
                    </div>

                    {n.unread && (
                      <span
                        aria-hidden
                        className="mt-1.5 block h-2 w-2 rounded-full bg-pink"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Preferences */}
        <div className="mt-9 mx-5 bg-paper-soft p-4">
          <div className="text-[13px] font-semibold text-ink">notification preferences</div>
          <p className="mt-1 text-[11px] leading-[1.5] text-ink-soft">
            Drop alerts (7pm), order updates, stylist suggestions, wallet activity.
          </p>
          <Link
            href="/app/you"
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-ink underline-offset-2 hover:underline"
          >
            change in settings
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Push notification mock */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">what they look like</div>
          <div className="mt-3 bg-ink text-paper p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-lime text-ink">
                <span className="display text-[14px] font-extrabold">k</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold text-paper">klydo</span>
                  <span className="text-[10px] text-paper/55 font-mono tabnum">now</span>
                </div>
                <div className="mt-1 text-[13px] font-semibold leading-[1.3]">
                  7pm drop in 1h 14m.
                </div>
                <div className="mt-0.5 text-[12px] text-paper/65 leading-[1.45]">
                  Eight pieces, the brunch edit. They go fast.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 mb-2 px-5 label text-ink-quiet">
          tap drops to open, swipe to dismiss
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
