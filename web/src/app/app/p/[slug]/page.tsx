import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { StatusBar } from "@/components/app/StatusBar";
import { ProductGallery } from "@/components/app/ProductGallery";
import { findProduct, galleryFor, products, formatINR } from "@/components/app/products";
import { IconBack, IconHeart, IconShare } from "@/components/app/icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail(props: PageProps<"/app/p/[slug]">) {
  const { slug } = await props.params;
  const product = findProduct(slug);
  if (!product) notFound();

  return (
    <PhoneFrame surface="paper">
      <StatusBar />

      {/* Top app bar */}
      <div className="relative z-30 flex items-center justify-between px-3 pt-1 pb-2">
        <Link
          href="/app"
          aria-label="Back to home"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 active:scale-95"
        >
          <IconBack size={20} />
        </Link>
        <div className="flex items-center gap-2">
          <button
            aria-label="Save"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink active:scale-95"
          >
            <IconHeart size={20} />
          </button>
          <button
            aria-label="Share"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink active:scale-95"
          >
            <IconShare size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Gallery */}
        <ProductGallery
          photos={galleryFor(product)}
          alt={`${product.brand} ${product.name}`}
        />

        {/* Brand + name + price */}
        <div className="px-5 pt-5">
          <div className="label text-ink-quiet">{product.brand}</div>
          <h1 className="display mt-2 font-extrabold text-[32px] leading-[1.02] tracking-[-0.03em] text-ink">
            {product.name}
          </h1>
          <div className="mt-3 flex items-baseline justify-between gap-4">
            <span className="font-mono tabnum text-[24px] font-semibold text-ink">
              {formatINR(product.price)}
            </span>
            <div className="flex items-center gap-1.5 label text-ink-quiet">
              <span className="block h-1.5 w-1.5 rounded-full bg-pink pulse" aria-hidden />
              <span>arrives by 6:42pm</span>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-7 px-5">
          <div className="flex items-center justify-between">
            <div className="label text-ink-quiet">size</div>
            <Link href="#size-guide" className="text-[12px] font-medium text-ink-soft underline-offset-2 hover:underline">
              size guide
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s, i) => (
              <button
                key={s}
                aria-pressed={i === 1}
                className={
                  i === 1
                    ? "rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-paper"
                    : "rounded-full border border-ink/15 bg-paper px-4 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-6 px-5">
            <div className="label text-ink-quiet">color · {product.colors[0].name}</div>
            <div className="mt-3 flex items-center gap-2.5">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  aria-pressed={i === 0}
                  className={
                    i === 0
                      ? "relative h-8 w-8 rounded-full ring-2 ring-ink ring-offset-2 ring-offset-paper"
                      : "h-8 w-8 rounded-full ring-1 ring-ink/15"
                  }
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">details</div>
          <p className="mt-3 text-[15px] leading-[1.5] text-ink-soft">
            {product.description}
          </p>
        </div>

        {/* Try-on rules card */}
        <div className="mt-7 mx-5 border border-paper-line bg-paper-soft p-4">
          <div className="flex items-start gap-3">
            <div className="display text-[28px] font-extrabold leading-none tracking-[-0.03em] text-pink">
              30
            </div>
            <div>
              <div className="text-[14px] font-semibold text-ink">free try-on at your door</div>
              <p className="mt-1 text-[13px] leading-[1.45] text-ink-soft">
                Courier arrives in 30 minutes. Try every piece. Pay only for what stays on.
              </p>
            </div>
          </div>
        </div>

        {/* Why people kept it */}
        <div className="mt-7 px-5">
          <div className="label text-ink-quiet">why people kept it</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["true to size", "soft fabric", "good drape", "right oversize", "wears well"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-[12px] text-ink-soft"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Returning section */}
        <div className="mt-9 mb-2 px-5 text-[11px] uppercase tracking-[0.1em] text-ink-quiet">
          fulfilled by klydo · verified by brand
        </div>
      </div>

      {/* Sticky try CTA */}
      <div className="relative z-30 border-t border-paper-line bg-paper px-4 py-3">
        <Link
          href={`/app/bag?added=${product.slug}`}
          className="flex items-center justify-between gap-3 rounded-full bg-lime px-5 py-4 text-ink transition-colors hover:bg-lime-deep active:scale-[0.99]"
        >
          <span className="flex flex-col items-start">
            <span className="text-[15px] font-semibold leading-none">try it on</span>
            <span className="mt-0.5 text-[11px] font-medium opacity-70">
              free · by 6:42pm
            </span>
          </span>
          <span className="font-mono tabnum text-[15px] font-semibold">
            {formatINR(product.price)}
          </span>
        </Link>
      </div>
    </PhoneFrame>
  );
}
