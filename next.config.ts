import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ To pozwala na deploy z błędami ESLinta
  },
};

export default nextConfig;
