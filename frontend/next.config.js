/** @type {import('next').NextConfig} */
const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN || "http://localhost:8000").replace(/\/$/, "")

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendOrigin}/api/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
