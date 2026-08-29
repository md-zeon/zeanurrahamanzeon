import type { Metadata } from "next";
import WorkHeader from "@/components/sections/WorkHeader";
import WorkProjects from "@/components/sections/WorkProjects";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import WorkLabSection from "@/components/sections/WorkLabSection";

import { workMeta } from "@/data/work";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  workMeta.title,
  workMeta.description,
  "/work",
  { absoluteTitle: true }
);

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
