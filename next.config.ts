/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This enables static export
  basePath: "/product-description-generator", // Replace with your GitHub repo name
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
