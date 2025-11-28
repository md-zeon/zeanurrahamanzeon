import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const brockmann = localFont({
  src: "./fonts/BrockmannVF.ttf",
  variable: "--font-brockmann",
  weight: "100 200 300 400 500 600 700 800 900",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeanur Rahaman Zeon - Portfolio",
  description: "Portfolio of Zeanur Rahaman Zeon, a passionate web developer. I specialize in creating dynamic and responsive web applications using the latest technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${brockmann.className} ${robotoMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
