/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/fifa/ranking",
          destination: `https://www.fifa.com/api/ranking-overview?locale=en&dateId=id13603`,
        },
      ],
    };
  },
}

module.exports = nextConfig
