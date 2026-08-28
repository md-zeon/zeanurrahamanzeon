import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import HomeProjects from "@/components/sections/HomeProjects";
import LogosBanner from "@/components/LogosBanner";
import WhySection from "@/components/sections/WhySection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LabSection from "@/components/sections/LabSection";
import CtaSection from "@/components/sections/CtaSection";

import { siteMeta } from "@/data/site";

/** Home page metadata: pins the canonical URL and social card to root. */
export const metadata: Metadata = {
  title: siteMeta.title.default,
  alternates: { canonical: "/" },
  openGraph: {
    url: siteMeta.siteUrl,
    images: [{ url: siteMeta.ogImage, width: 1200, height: 630, alt: siteMeta.author }],
  },
  twitter: { title: siteMeta.title.default, images: [siteMeta.ogImage] },
};

/**
 * Home page: composes the landing sections in order — hero, project
 * carousel, marquee, why, services, testimonials, labs, and final CTA.
 */
export default function Home() {
  return (
    <main className="main-wrapper background-color-black">
      <HeroSection />
      <HomeProjects />
      <LogosBanner />
      <WhySection />
      <ServicesSection />
      <TestimonialsSection />
      <LabSection />
      <CtaSection />
    </main>
  );
}
