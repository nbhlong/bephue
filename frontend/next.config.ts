// frontend/next.config.js
// Next.js configuration for Docker deployment

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    // Avoid Next.js blocking private IPs (dev Strapi on localhost) by disabling optimization in that case
    unoptimized: process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ?? false,
    remotePatterns: [
      // Unsplash (for placeholder images)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Local Strapi
      {
        protocol: "http",
        hostname: "localhost",
        port: "1338",
        pathname: "/uploads/**",
      },
      // Production Strapi
      {
        protocol: "https",
        hostname: "api.bephue.vn",
        pathname: "/uploads/**",
      },
      // Custom domain (update with your actual domain)
      {
        protocol: "https",
        hostname: "yourdomain.com",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Compression
  compress: true,

  // Environment variables available in browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features (optional)
  experimental: {
    // Improve build performance
    optimizeCss: true,
    // Optimize package imports
    optimizePackageImports: ["react-icons", "framer-motion"],
  },
};

module.exports = nextConfig;
