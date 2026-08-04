import type { Metadata } from "next";
import ExperimentsHeader from "@/components/sections/ExperimentsHeader";
import ExperimentsProjects from "@/components/sections/ExperimentsProjects";
import ExperimentsCards from "@/components/sections/ExperimentsCards";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Experiments & Clonables",
  description:
    "A curated collection of experiments, creative coding, and Webflow clonables where I push the limits of interactions, motion, and the web platform.",
};

/**
 * Experiments page: hero, pinned 3D carousel of experiments, clonables
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
