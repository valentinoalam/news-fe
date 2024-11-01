import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { domains: ["images.unsplash.com"], unoptimized: true },
};

export default nextConfig;
