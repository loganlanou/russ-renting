import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization for external images
  images: {
    unoptimized: true,
  },

  // Generate trailing slashes for cleaner URLs
  trailingSlash: true,

  // Disable powered by header
  poweredByHeader: false,
};

export default nextConfig;
