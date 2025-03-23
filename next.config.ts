import nextPWA from "next-pwa";

const nextConfig = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disble: false,
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
