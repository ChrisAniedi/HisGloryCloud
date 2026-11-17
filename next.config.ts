import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Sermon thumbnails from the church's YouTube channel.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  turbopack: {
    // Pin the workspace root so a parent folder's configs are never picked up.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
