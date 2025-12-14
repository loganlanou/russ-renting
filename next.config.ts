import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for fast, pre-rendered pages
  output: 'export',

  // Disable image optimization for static export (use native img or optimized sources)
  images: {
    unoptimized: true,
  },

  // Generate trailing slashes for cleaner URLs
  trailingSlash: true,

  // Disable powered by header
  poweredByHeader: false,
};

export default nextConfig;
