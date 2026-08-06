import type { Metadata } from "next";
import WorkHeader from "@/components/sections/WorkHeader";
import WorkProjects from "@/components/sections/WorkProjects";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import WorkLabSection from "@/components/sections/WorkLabSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Full-stack projects built with Next.js, React, TypeScript, and Node.js — from developer tools and health marketplaces to real-time campus networks.",
};

/** Work page: hero, project grid, CTA, and "from the labs" slider. */
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
