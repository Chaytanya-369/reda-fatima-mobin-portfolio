import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: `npm run build` writes a deployable site to /out.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
