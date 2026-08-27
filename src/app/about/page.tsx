import type { Metadata } from "next";
import AboutHeader from "@/components/sections/AboutHeader";
import AboutDivider from "@/components/sections/AboutDivider";
import AboutStory from "@/components/sections/AboutStory";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AboutFun from "@/components/sections/AboutFun";
import LabSection from "@/components/sections/LabSection";
import CtaSection from "@/components/sections/CtaSection";

import { aboutMeta } from "@/data/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

/**
 * About page: hero, career-story marquee, the story section, testimonials,
 * "fun facts" deck, labs slider, and closing CTA.
 */
export default function About() {
  return (
    <main className="main-wrapper background-color-black">
      <AboutHeader />
      <AboutDivider />
      <AboutStory />
      <TestimonialsSection />
      <AboutFun />
      <LabSection />
      <CtaSection />
    </main>
  );
}
