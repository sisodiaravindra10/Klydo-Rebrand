import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&h=1200&fit=crop&q=80",
    alt: "Klydo customer wearing a hand-picked drop in Bengaluru",
    aspect: "aspect-[3/4]",
    span: "col-span-12 md:col-span-5 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=600&fit=crop&q=80",
    alt: "Worn in Bengaluru, brunch fit",
    aspect: "aspect-[4/3]",
    span: "col-span-6 md:col-span-4",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop&q=80",
    alt: "Worn in Bengaluru, street fit",
    aspect: "aspect-[4/5]",
    span: "col-span-6 md:col-span-3 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop&q=80",
    alt: "Worn in Bengaluru, evening fit",
    aspect: "aspect-[4/3]",
    span: "col-span-12 md:col-span-4",
  },
];

export function WornInBengaluru() {
  return (
    <section className="bg-paper-soft">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 label text-ink-quiet">
              <span className="h-px w-8 bg-ink-quiet" aria-hidden />
              <span>worn · bengaluru</span>
            </div>
            <h2 className="display mt-6 font-extrabold text-[44px] leading-[0.92] tracking-[-0.04em] text-ink md:mt-8 md:text-[80px] lg:text-[104px]">
              worn in
              <br />
              bengaluru<span className="text-cobalt">.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-4 md:col-span-5">
            <p className="max-w-[40ch] text-[16px] leading-[1.5] text-ink-soft md:text-[18px]">
              Real people. Real fits. Tag your Klydo on Instagram for a chance
              to land on the home screen.
            </p>
            <Link
              href="https://instagram.com/klydo.official"
              className="inline-flex items-center gap-1.5 self-start rounded-full border-2 border-ink bg-transparent px-5 py-3 text-sm font-semibold text-ink transition-all hover:bg-ink hover:text-paper active:scale-[0.98]"
            >
              follow on instagram
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Bento photo grid */}
        <div className="mt-14 grid grid-cols-12 grid-rows-[auto] gap-3 md:mt-20 md:gap-4">
          {photos.map((photo, i) => (
            <figure
              key={i}
              className={`tilt-hover relative overflow-hidden ${photo.aspect} ${photo.span} bg-ink/5`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>

        {/* Hashtag strip */}
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 label text-ink-quiet md:mt-20">
          <span className="text-ink">#klydobengaluru</span>
          <span aria-hidden>·</span>
          <span>342 fits this week</span>
          <span aria-hidden>·</span>
          <span>updated daily</span>
        </div>
      </div>
    </section>
  );
}
