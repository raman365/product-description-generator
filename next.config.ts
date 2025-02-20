/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This enables static export
  basePath: "/product-description-generator", // Replace with your GitHub repo name
  trailingSlash: true, // Ensures proper linking of pages
};

module.exports = nextConfig;
