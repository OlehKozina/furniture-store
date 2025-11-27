/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  trailingSlash: true, // Optional: Ensures URLs end with a trailing slash
};

export default nextConfig;
