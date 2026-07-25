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
};

export default nextConfig;
