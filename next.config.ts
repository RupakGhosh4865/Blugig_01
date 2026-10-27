import type { NextConfig } from "next";

/** Canonical host (matches PRODUCTION_URL in content/site.ts). */
const PRODUCTION_URL = "https://www.avantratechnologies.com";
/** Railway's generated domain for the production service: it must not serve a second copy of the site. */
const RAILWAY_HOST = "avantra-tech-production.up.railway.app";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  /** Don't advertise the framework (`x-powered-by: Next.js`). */
  poweredByHeader: false,
  async redirects() {
    return [
      /** The Railway host → the same path on www (308, which search engines treat as permanent). */
      {
        source: "/:path*",
        has: [{ type: "host", value: RAILWAY_HOST }],
        destination: `${PRODUCTION_URL}/:path*`,
        permanent: true,
      },
      /** Old Blugig service pages → the Avantra services overview. */
      { source: "/services/:slug", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Start at 1 day; raise to 31536000 (1 year) once a week passes without problems.
          { key: "Strict-Transport-Security", value: "max-age=86400" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Only framing for now; a full policy needs allowances for Calendly and the WebGL canvas.
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
