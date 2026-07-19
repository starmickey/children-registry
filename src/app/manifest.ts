import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Infancia y Adolescencia Misionera",
    short_name: "IAM",
    description:
      "A registry of children participating in the Infancia Misionera program.",
    start_url: "/children",
    scope: "/",
    id: "/children",
    display: "standalone",
    background_color: "#FFF7E6",
    theme_color: "#FFF7E6",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
