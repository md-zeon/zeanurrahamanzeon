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

/** Local display font (Brockmann) with the weights actually used preloaded. */
export const brockmann = localFont({
  src: [
    {
      path: "./fonts/brockmann/brockmann-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/brockmann/brockmann-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/brockmann/brockmann-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-brockmann",
  display: "swap",
  preload: true,
});

/** Mono font used for labels/captions, preloaded via next/font/google. */
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-roboto-mono",
  display: "swap",
  preload: true,
});

import { siteMeta } from "@/data/site";

/** Site-wide metadata (title template, description, keywords, social cards). */
export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  alternates: { canonical: "/" },
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: siteMeta.keywords,
  authors: [{ name: siteMeta.author }],
  creator: siteMeta.creator,
  applicationName: siteMeta.applicationName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteMeta.siteUrl,
    siteName: siteMeta.applicationName,
    title: siteMeta.title.default,
    description: siteMeta.description,
    images: [{ url: siteMeta.ogImage, width: 1200, height: 630, alt: siteMeta.author }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title.default,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
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
      className={`${brockmann.variable} ${robotoMono.variable} w-mod-js scrollbar-thin`}
    >
      <body>
        <noscript>
          <style>{".is-gsap-hidden { visibility: visible !important; }"}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
