/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "_static",
  images: {
    unoptimized: true,
  },
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
