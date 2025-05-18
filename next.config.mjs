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
      {
        protocol: "https",
        hostname: "img-c.udemycdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
