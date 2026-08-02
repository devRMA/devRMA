import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rafael Martins Alves Portfolio",
    short_name: "devRMA",
    description: "Portfolio of Rafael Martins Alves - Full Stack Developer",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#3b82f6",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
