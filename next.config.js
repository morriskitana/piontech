/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig