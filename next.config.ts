import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
    webpackBuildWorker: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    qualities: [70, 85],
    formats: ["image/webp", "image/avif"],
  },
  typedRoutes: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Reduce unused JavaScript by optimizing bundle
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
