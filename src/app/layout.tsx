import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

/**
 * Root layout: loads the two typefaces (local Brockmann + Google Roboto
 * Mono) as CSS variables, sets global metadata/viewport, and wraps all
 * pages in SiteShell (preloader, cursor, navbar, footer, audio).
 */

/** Local display font (Brockmann) with its weights/italics preloaded. */
export const brockmann = localFont({
  src: [
    {
      path: "./fonts/brockmann/brockmann-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/brockmann/brockmann-400i.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/brockmann/brockmann-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/brockmann/brockmann-500i.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/brockmann/brockmann-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/brockmann/brockmann-600i.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/brockmann/brockmann-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/brockmann/brockmann-700i.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-brockmann",
  display: "swap",
  preload: true,
});

/** Mono font used for labels/captions, preloaded via next/font/google. */
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto-mono",
  display: "swap",
  preload: true,
});

/** Site-wide metadata (title template, description, keywords). */
export const metadata: Metadata = {
  title: {
    default: "Zeanur Rahaman Zeon | Software Engineer",
    template: "%s | Zeanur Rahaman Zeon",
  },
  description:
    "Software Engineer who solves real problems end-to-end with clean architecture and solid fundamentals — comfortable across stacks and quick to adapt. Explore projects, case studies, and open source.",
  keywords: [
    "Zeanur Rahaman Zeon",
    "Software Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Problem Solver",
    "Web Developer",
    "Portfolio",
    "Open to Work",
    "JavaScript",
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

/** Responsive viewport + theme color (the site's dark background). */
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
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
