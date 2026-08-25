import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 828],
  },
  reactStrictMode: true,
  /* The portfolio section is now called Work; the two renamed categories keep
     their old links alive too. */
  async redirects() {
    return [
      { source: "/clients", destination: "/", permanent: true },
      {
        source: "/contact",
        destination: "/start-a-project",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/capabilities",
        permanent: true,
      },
      {
        source: "/quote",
        destination: "/start-a-project",
        permanent: true,
      },
      { source: "/portfolio", destination: "/work", permanent: true },
      {
        source: "/portfolio/gift-and-utility-boxes",
        destination: "/work/product-and-gift-boxes",
        permanent: true,
      },
      { source: "/portfolio/real-estate", destination: "/work", permanent: true },
      {
        source: "/portfolio/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
