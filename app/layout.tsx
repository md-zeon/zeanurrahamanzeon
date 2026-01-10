import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

export const metadata: Metadata = {
  title: "Zeanur Rahaman Zeon - Portfolio",
  description: "Portfolio of Zeanur Rahaman Zeon, a passionate web developer. I specialize in creating dynamic and responsive web applications using the latest technologies.",
};

// fonts
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
})

export const Brockman = localFont({
  src: './fonts/BrockmannVF.ttf',
  variable: '--font-primary',
  weight: '500',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-[#0A090E] ${Brockman.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html >
  );
}
