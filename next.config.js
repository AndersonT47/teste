/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx"],
  compiler: {
    styledComponents:
      true | { ssr: true, displayName: true, preprocess: false },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  output: "standalone",
};

module.exports = nextConfig;
