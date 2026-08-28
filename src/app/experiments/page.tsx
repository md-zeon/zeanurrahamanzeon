import type { Metadata } from "next";
import ExperimentsHeader from "@/components/sections/ExperimentsHeader";
import ExperimentsProjects from "@/components/sections/ExperimentsProjects";
import ExperimentsCards from "@/components/sections/ExperimentsCards";
import CtaSection from "@/components/sections/CtaSection";

import { experimentsMeta } from "@/data/experiments";
import { pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata(
  experimentsMeta.title,
  experimentsMeta.description,
  "/experiments"
);

/**
 * Experiments page: hero, pinned 3D carousel of side projects, side-project
 * grid, and closing CTA.
 */
export default function Experiments() {
  return (
    <main className="main-wrapper background-color-black">
      <ExperimentsHeader />
      <ExperimentsProjects />
      <ExperimentsCards />
      <CtaSection />
    </main>
  );
}
