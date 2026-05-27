import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { TabBar } from "@/components/app/TabBar";
import { EmptyState } from "@/components/app/EmptyState";
import { products, formatINR } from "@/components/app/products";
import { IconBack } from "@/components/app/icons";

type Status = "live" | "kept" | "returned";

const orders: {
  id: string;
  status: Status;
  statusLabel: string;
  whenLabel: string;
  total: number;
  pieceCount: number;
  thumbs: number[];
  eta?: string;
}[] = [
  {
    id: "klyd-3829",
    status: "live",
    statusLabel: "courier on the way",
    whenLabel: "arriving in 8 min",
    total: 4797,
    pieceCount: 3,
    thumbs: [0, 1, 3],
    eta: "6:42pm",
  },
  {
    id: "klyd-3781",
    status: "kept",
    statusLabel: "kept 2 of 5",
    whenLabel: "fri · 8:14pm",
    total: 4198,
    pieceCount: 5,
    thumbs: [4, 5, 6, 7, 2],
  },
  {
    id: "klyd-3702",
    status: "returned",
    statusLabel: "all returned · refunded",
    whenLabel: "wed · 7:55pm",
    total: 0,
    pieceCount: 4,
    thumbs: [6, 7, 0, 4],
  },
];

const statusDot: Record<Status, string> = {
  live: "bg-pink pulse",
  kept: "bg-lime",
  returned: "bg-ink-quiet",
};

export default function OrdersPage() {
  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      <div className="relative z-30 px-5 pt-1 pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/app/you"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
          >
            <IconBack size={20} />
          </Link>
          <div className="label text-ink-quiet">your activity</div>
        </div>
        <h1 className="display mt-3 font-extrabold text-[34px] leading-[0.98] tracking-[-0.035em] text-ink">
          orders<span className="text-pink">.</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <ul className="space-y-3 px-5">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/app/orders/${o.id}`}
                className="block border border-paper-line bg-paper p-4 transition-all hover:border-ink/25 active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`block h-1.5 w-1.5 rounded-full ${statusDot[o.status]}`} aria-hidden />
                      <span className="text-[13px] font-semibold text-ink">
                        {o.statusLabel}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-ink-quiet">
                      {o.whenLabel}
                    </div>
                    <div className="mt-1 font-mono tabnum text-[10px] text-ink-quiet">
                      #{o.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono tabnum text-[14px] font-semibold text-ink">
                      {o.total > 0 ? formatINR(o.total) : "0"}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-quiet">
                      {o.pieceCount} pieces
                    </div>
                  </div>
                </div>

                {/* Thumb strip */}
                <div className="mt-3 flex items-center gap-1">
                  {o.thumbs.map((idx, i) => (
                    <div key={i} className="relative h-12 w-10 overflow-hidden bg-paper-soft">
                      <Image
                        src={products[idx].photo}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {o.eta && (
                  <div className="mt-3 flex items-center justify-between border-t border-paper-line pt-3">
                    <div className="label text-ink-quiet">arrives by</div>
                    <div className="font-mono tabnum text-[14px] font-semibold text-ink">
                      {o.eta}
                    </div>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-7 mb-2 px-5 label text-ink-quiet">
          showing last 30 days · view all →
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
