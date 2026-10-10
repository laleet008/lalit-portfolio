import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deployable to GitHub Pages (see CNAME) or Vercel unchanged.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
