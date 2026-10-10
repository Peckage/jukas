import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The setup tabs became the walkthrough; old links still land on it.
  async redirects() {
    return [{ source: "/setup", destination: "/learn", permanent: true }];
  },
};

export default nextConfig;
