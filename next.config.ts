import type { NextConfig } from "next";

// GitHub Pages serves from /Klydo-Rebrand/. Vercel and other hosts serve from /.
// The workflow at .github/workflows/deploy.yml sets DEPLOY_TARGET=pages, so:
//   - Pages build → basePath = /Klydo-Rebrand, static export
//   - Vercel / local dev → basePath = "", normal Next.js build
const isPages = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/Klydo-Rebrand" : "",
  assetPrefix: isPages ? "/Klydo-Rebrand/" : "",
  trailingSlash: isPages ? true : undefined,
  images: {
    // Pages can't run the optimizer. On Vercel the optimizer is available.
    unoptimized: isPages,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
