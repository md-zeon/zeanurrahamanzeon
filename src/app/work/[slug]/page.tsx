import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudySlugs, getCaseStudyCover } from "@/data/caseStudies";
import { siteMeta } from "@/data/site";
import CaseStudyHeader from "@/components/sections/CaseStudyHeader";
import CaseStudyBlocks from "@/components/sections/CaseStudyBlocks";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WorkCtaSection from "@/components/sections/WorkCtaSection";
import CaseStudyFeatured from "@/components/sections/CaseStudyFeatured";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Statically pre-renders all known case study slugs at build time. */
export function generateStaticParams() {
  return getAllCaseStudySlugs();
}

/** Page metadata comes from the matched case study (with a project cover card). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };

  const image = getCaseStudyCover(slug) ?? siteMeta.ogImage;
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "website",
      url: `${siteMeta.siteUrl}/work/${slug}`,
      title: study.metaTitle,
      description: study.metaDescription,
      images: [{ url: image, alt: study.header.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.metaDescription,
      images: [image],
    },
  };
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
