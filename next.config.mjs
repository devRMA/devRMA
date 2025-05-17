/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stopwatch.devrma.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
