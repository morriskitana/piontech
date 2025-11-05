/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home_software_company',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig