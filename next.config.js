/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/ktv', destination: '/karaoke', permanent: true },
      { source: '/ktv/:path*', destination: '/karaoke/:path*', permanent: true },
    ]
  },
}

module.exports = nextConfig
