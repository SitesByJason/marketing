/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sitesbyjason.com",
        port: "",
        pathname: "/jason/**",
      },
    ],
  },
};

module.exports = nextConfig;
