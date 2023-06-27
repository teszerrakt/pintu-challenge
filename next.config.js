/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/cdn/:path*',
        destination: process.env.NEXT_PUBLIC_CDN_BASE_URL + '/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/cdn/:path*',
        destination: process.env.NEXT_PUBLIC_CDN_BASE_URL + '/:path*',
      },
      {
        source: '/pintu/:path*',
        destination: process.env.NEXT_PUBLIC_PINTU_API_URL + '/:path*',
      },
    ]
  },
}

module.exports = nextConfig
