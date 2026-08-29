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
  authors: [{ name: siteMeta.author, url: siteMeta.siteUrl }],
  creator: siteMeta.creator,
  applicationName: siteMeta.applicationName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteMeta.siteUrl,
    siteName: siteMeta.applicationName,
    title: siteMeta.title.default,
    description: siteMeta.description,
    images: [
      { url: siteMeta.ogImage, width: 1200, height: 630, alt: siteMeta.author },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@developer_zeon",
    creator: "@developer_zeon",
    title: siteMeta.title.default,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
  // rel="me" links to social profiles — help Google associate all profiles with the same person
  other: {
    "geo.region": "BD",
    "geo.placename": "Tongi, Gazipur, Bangladesh",
  },
};

/** Responsive viewport + theme color (the site's dark background). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a090f",
};

/** JSON-LD structured data for Google to understand the person and website. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteMeta.siteUrl}/#person`,
      name: siteMeta.author,
      url: siteMeta.siteUrl,
      jobTitle: "Software Engineer",
      description: siteMeta.description,
      image: {
        "@type": "ImageObject",
        url: `${siteMeta.siteUrl}/og.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.linkedin.com/in/zeanur-rahaman-zeon/",
        "https://github.com/md-zeon",
        "https://x.com/developer_zeon",
      ],
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Full Stack Web Development",
        "Software Engineering",
        "REST APIs",
        "GSAP Animation",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Northern University Bangladesh",
        url: "https://nub.ac.bd",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tongi, Gazipur",
        addressCountry: "BD",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteMeta.siteUrl}/#website`,
      url: siteMeta.siteUrl,
      name: siteMeta.author,
      description: `Portfolio of ${siteMeta.author} — Full Stack Software Engineer`,
      author: { "@id": `${siteMeta.siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${brockmann.variable} ${robotoMono.variable} w-mod-js scrollbar-thin`}
    >
      <head>
        {/* rel=me: Verifies this site's identity matches these social profiles */}
        <link
          rel="me"
          href="https://www.linkedin.com/in/zeanur-rahaman-zeon/"
        />
        <link rel="me" href="https://github.com/md-zeon" />
        <link rel="me" href="https://x.com/developer_zeon" />
        <link rel="me" href="mailto:zeon.cse@gmail.com" />
      </head>
      <body>
        {/* JSON-LD: Person + WebSite schema — critical for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{".is-gsap-hidden { visibility: visible !important; }"}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
