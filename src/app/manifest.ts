import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Infancia y Adolescencia Misionera",
    short_name: "IAM",
    description: "Administración de datos de personas",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#ffefcc",
    theme_color: "#ffefcc",
    lang: "es",
    dir: "ltr",
    categories: ["productivity", "utilities"],
    orientation: "portrait",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // screenshots: [
    //   {
    //     src: "/screenshots/desktop-dashboard.png",
    //     sizes: "1280x720",
    //     type: "image/png",
    //     form_factor: "wide",
    //     label: "Vista de escritorio de IAM",
    //   },
    //   {
    //     src: "/screenshots/mobile-dashboard.png",
    //     sizes: "750x1334",
    //     type: "image/png",
    //     form_factor: "narrow",
    //     label: "Vista móvil de IAM",
    //   },
    // ],
  };
}
