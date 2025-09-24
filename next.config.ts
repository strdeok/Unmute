import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default withNextVideo(nextConfig);