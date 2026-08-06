import type { Metadata } from "next";
import AboutHeader from "@/components/sections/AboutHeader";
import AboutDivider from "@/components/sections/AboutDivider";
import AboutStory from "@/components/sections/AboutStory";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AboutFun from "@/components/sections/AboutFun";
import LabSection from "@/components/sections/LabSection";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm Zeanur Rahaman Zeon — a full-stack software engineer from Bangladesh building scalable, interactive, and user-friendly web applications.",
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
