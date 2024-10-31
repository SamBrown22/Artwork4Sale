import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artwork4sale.s3.eu-west-2.amazonaws.com',
        pathname: '/**', // Match all paths
      },
    ],
  },
};

export default nextConfig;
