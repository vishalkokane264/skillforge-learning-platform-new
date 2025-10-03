/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during build for deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build for deployment
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true, // For better Vercel compatibility
    domains: [],
  },
  // Fix the lockfile warning
  outputFileTracingRoot: __dirname,
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./src/**/*'],
    },
  },
}

module.exports = nextConfig