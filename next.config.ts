import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shadcnstudio.com',
      },
      {
        protocol: 'https',
        hostname: 'srb-images-202689043192-ap-southeast-1-an.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
