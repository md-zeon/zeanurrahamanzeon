import type { Metadata } from "next";
import WorkHeader from "@/components/sections/WorkHeader";
import WorkProjects from "@/components/sections/WorkProjects";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import WorkLabSection from "@/components/sections/WorkLabSection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "I build real world applications that solve real problems — from a developer Q&A platform and a medicine marketplace to a real-time campus network and a micro-task economy.",
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
