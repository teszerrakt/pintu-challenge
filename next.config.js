/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cdn/:path*',
        destination: process.env.NEXT_PUBLIC_CDN_BASE_URL + '/:path*',
      },
    ]
  },
}

module.exports = nextConfig
