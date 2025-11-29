import type { Metadata } from "next";
import { IBM_Plex_Sans, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  variable: '--font-primary',
  src: [
    {
      path: '../public/fonts/brockmann-medium.woff',
      weight: '500',
      style: 'medium',
    }
  ],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${Brockman.className} ${robotoMono.className} antialiased`}>
        {children}
      </body>
    </html >
  );
}
