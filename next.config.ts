import nextPWA from "next-pwa";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

(async () => {
  if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
  }
})();

const nextConfig = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disble: process.env.NODE_ENV === "development",
});

const config = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
};

export default config;
