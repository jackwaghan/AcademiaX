import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [75, 85, 95, 100],
  },
};

export default nextConfig;
