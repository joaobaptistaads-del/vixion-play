/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // App Router (app directory) is enabled by default in Next 14+.
  // Removed deprecated experimental flag.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
}

module.exports = nextConfig
