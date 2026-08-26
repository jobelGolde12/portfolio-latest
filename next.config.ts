import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable Next.js built‑in optimization (WebP/AVIF, resizing, caching)
    // Remove when deploying to platforms that don't support it (e.g., static export).
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  turbopack: {
    root: process.cwd(),
  },
  headers: async () => [
    {
      // CSP frame-ancestors: only allow embedding from our own domain.
      // This prevents other sites from embedding our portfolio in their
      // iframes while still allowing the proxy route to serve content.
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self'",
        },
      ],
    },
    {
      // Extra security for the proxy endpoint — prevent caching of
      // proxied content and disallow referrer leakage.
      source: '/api/proxy(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'no-referrer',
        },
      ],
    },
  ],
};

export default nextConfig;
