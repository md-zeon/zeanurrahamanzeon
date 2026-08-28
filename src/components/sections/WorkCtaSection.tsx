"use client";

import CtaSection from "./CtaSection";
import { workCta } from "@/data/work";

/**
 * Work page CTA section. Reuses the shared `CtaSection` (video + chat widget
 * + structure) with work-page-specific heading and button copy, on the brand
 * primary background.
 */
export default function WorkCtaSection() {
  return (
    <CtaSection
      sectionClassName="background-color-primary relative z-2"
      buttonLabel={workCta.buttonLabel}
      heading={
        <div className="flex flex-col items-start justify-start pb-6 pl-4 pt-28 max-[991px]:pt-20 max-[767px]:pt-12">
          <h2
            id="cta-h1"
            header-animation-type="heading-1"
            className="heading-style-h2"
          >
            {workCta.line1}{" "}
            <span className="header_italic-word">{workCta.italicWord}</span>
          </h2>
        </div>
      }
    />
  );
}
