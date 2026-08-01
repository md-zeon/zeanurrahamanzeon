import type { Metadata } from "next";
import WorkHeader from "@/components/sections/WorkHeader";
import WorkProjects from "@/components/sections/WorkProjects";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import WorkLabSection from "@/components/sections/WorkLabSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A curated collection of web design and Webflow development projects crafted with strategy, design, and development in one process.",
};

export default function Work() {
  return (
    <main className="main-wrapper background-color-black">
      <WorkHeader />
      <WorkProjects />
      <WorkCtaSection />
      <WorkLabSection />
    </main>
  );
}
