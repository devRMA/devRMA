import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const directoryName = path.dirname(filename);

const nextConfig = {
  outputFileTracingRoot: directoryName,
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
};

export default nextConfig;
