/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  transpilePackages: ["undici", "firebase"],
};

module.exports = nextConfig;
