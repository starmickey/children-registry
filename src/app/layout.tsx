import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Sans, Playpen_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  variable: "--font-playpen-sans",
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infancia Misionera",
  description:
    "A registry of children who have been part of the Infancia Misionera program.",
  applicationName: "Infancia Misionera",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFF7E6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable,
        playpenSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
