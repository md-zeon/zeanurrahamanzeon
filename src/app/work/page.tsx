import type { Metadata } from "next";
import WorkHeader from "@/components/sections/WorkHeader";
import WorkProjects from "@/components/sections/WorkProjects";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import WorkLabSection from "@/components/sections/WorkLabSection";

import { workMeta } from "@/data/work";

export const metadata: Metadata = {
  title: workMeta.title,
  description: workMeta.description,
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
