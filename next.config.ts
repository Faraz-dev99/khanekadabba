import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],  // ← add 100 here
  },
};

export default nextConfig;
