import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/data/caseStudies";
import CaseStudyHeader from "@/components/sections/CaseStudyHeader";
import CaseStudyBlocks from "@/components/sections/CaseStudyBlocks";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import CaseStudyFeatured from "@/components/sections/CaseStudyFeatured";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Statically pre-renders the known case study slugs at build time. */
export function generateStaticParams() {
  return [
    { slug: "smart-nub-campus" },
    { slug: "devqna" },
    { slug: "oshudpati-marketplace" },
    { slug: "microearn" },
  ];
}

/** Page metadata comes from the matched case study. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };
  return { title: study.metaTitle, description: study.metaDescription };
}

/**
 * Case study detail page: header, content blocks, testimonials, CTA, and a
 * featured-projects slider. Renders a 404 for unknown slugs.
 */
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="main-wrapper background-color-black">
      <CaseStudyHeader
        title={study.header.title}
        result={study.header.result}
        resultLabel={study.header.resultLabel}
        tags={study.header.tags}
        paragraph={study.header.paragraph}
        buttonLabel={study.header.buttonLabel}
        buttonHref={study.header.buttonHref}
        badge={study.header.badge}
        badgeLink={study.header.badgeLink}
      />
      <CaseStudyBlocks study={study} />
      <TestimonialsSection />
      <WorkCtaSection />
      <CaseStudyFeatured />
    </main>
  );
}
