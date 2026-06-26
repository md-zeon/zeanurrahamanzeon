import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
})

export const Brockman = localFont({
  src: './fonts/BrockmannVF.ttf',
  // variable: '--font-primary',
  // weight: '500',
  // display: 'swap',
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
    "Computer Science and Engineering",
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
    "motion"
  ],

  authors: [
    {
      name: "Zeanur Rahaman Zeon",
    },
  ],

  creator: "Zeanur Rahaman Zeon",

  applicationName: "Zeanur Rahaman Zeon Portfolio",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Brockman.className} ${robotoMono.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
