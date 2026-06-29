import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Three Fiber's <Canvas> creates a WebGL context in a mount effect.
  // Strict Mode's intentional mount→unmount→remount in dev disposes that
  // context (and can leave it "lost"), so we disable it. Production is
  // unaffected — Strict Mode only double-invokes in development.
  reactStrictMode: false,
};

export default nextConfig;
