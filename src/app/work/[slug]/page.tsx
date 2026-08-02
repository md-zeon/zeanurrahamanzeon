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

export function generateStaticParams() {
  return [{ slug: "plus-x-innovation" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };
  return { title: study.metaTitle, description: study.metaDescription };
}

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
