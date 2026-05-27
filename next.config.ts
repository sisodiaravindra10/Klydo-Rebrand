import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // GitHub Pages static export config.
  // In dev, output is undefined so `next dev` runs normally.
  output: isProd ? "export" : undefined,
  basePath: isProd ? "/Klydo-Rebrand" : "",
  assetPrefix: isProd ? "/Klydo-Rebrand/" : "",
  trailingSlash: true,
  images: {
    // GitHub Pages doesn't run the Next image optimizer.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
