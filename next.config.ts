/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  images: {
    domains: [
      "samehadaku.mba",
      "ik.imagekit.io",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
