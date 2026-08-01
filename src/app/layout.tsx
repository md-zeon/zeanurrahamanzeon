import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const brockmann = localFont({
  src: [
    { path: "./fonts/brockmann/brockmann-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/brockmann/brockmann-400i.woff2", weight: "400", style: "italic" },
    { path: "./fonts/brockmann/brockmann-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/brockmann/brockmann-500i.woff2", weight: "500", style: "italic" },
    { path: "./fonts/brockmann/brockmann-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/brockmann/brockmann-600i.woff2", weight: "600", style: "italic" },
    { path: "./fonts/brockmann/brockmann-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/brockmann/brockmann-700i.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-brockmann",
  display: "swap",
  preload: true,
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Zeanur Rahaman Zeon | Software Engineer",
    template: "%s | Zeanur Rahaman Zeon",
  },
  description:
    "Software Engineer specializing in Next.js, React, TypeScript, Node.js, and scalable web applications. Explore my projects, experience, and technical expertise.",
  keywords: [
    "Zeanur Rahaman Zeon",
    "Software Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Portfolio",
    "Web Developer",
    "GSAP",
    "motion",
  ],
  authors: [{ name: "Zeanur Rahaman Zeon" }],
  creator: "Zeanur Rahaman Zeon",
  applicationName: "Zeanur Rahaman Zeon Portfolio",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a090f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${brockmann.variable} ${robotoMono.variable} w-mod-js`}
    >
      <body>{children}</body>
    </html>
  );
}
