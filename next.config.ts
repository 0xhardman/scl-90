import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Enable static image imports
  images: {
    disableStaticImages: false,
  },
  // Configure environment variables
  env: {
    // Add any environment variables you need here
    NEXT_PUBLIC_DEEPSEEK_API_KEY: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
  },
};

export default nextConfig;
