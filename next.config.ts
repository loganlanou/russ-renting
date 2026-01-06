import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Base path for GitHub Pages deployment
  basePath: '/russ-renting',
  assetPrefix: '/russ-renting/',

  // Disable image optimization for external images
  images: {
    unoptimized: true,
  },

  // Generate trailing slashes for cleaner URLs
  trailingSlash: true,

  // Disable powered by header
  poweredByHeader: false,

  // Static export for GitHub Pages
  output: 'export',
};

export default nextConfig;
