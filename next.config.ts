import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  async redirects() {
    return [
      {
        source: "/Protfolio",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/protfolio",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/Services",
        destination: "/services",
        permanent: true,
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  // turbopack: {
  //   rules: {
  //     "*.css": {
  //       loaders: ["@tailwindcss/turbopack"],
  //       as: "*.css",
  //     },
  //   },
  // },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
