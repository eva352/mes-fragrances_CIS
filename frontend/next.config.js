/** @type {import('next').NextConfig} */
const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN || "http://localhost:8000").replace(/\/$/, "")

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/site",
        destination: "/",
        permanent: true,
      },
      {
        source: "/site/quiz-parfum",
        destination: "/test-personnalite-olfactif",
        permanent: true,
      },
      {
        source: "/site/recherche",
        destination: "/recherche",
        permanent: true,
      },
      {
        source: "/site/parfum/:slug",
        destination: "/parfum/:slug",
        permanent: true,
      },
      {
        source: "/site/mentions-legales",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/site/confidentialite",
        destination: "/confidentialite",
        permanent: true,
      },
      {
        source: "/site/cookies",
        destination: "/cookies",
        permanent: true,
      },
    ]
  },
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
