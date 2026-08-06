import type { Metadata } from "next";
import ExperimentsHeader from "@/components/sections/ExperimentsHeader";
import ExperimentsProjects from "@/components/sections/ExperimentsProjects";
import ExperimentsCards from "@/components/sections/ExperimentsCards";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Experiments & Side Projects",
  description:
    "A growing collection of side projects, open-source tools, and motion experiments exploring engineering patterns, real-time features, and creative interactions.",
};

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
