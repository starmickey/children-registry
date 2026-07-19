import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Infancia y Aadolescencia Misionera",
    short_name: "IAM",
    start_url: "/children",
    display: "standalone",
    background_color: "#FFF7E6",
    theme_color: "#FFF7E6",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
