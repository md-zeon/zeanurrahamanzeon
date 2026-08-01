"use client";

import { useRef } from "react";
import { linesFor, useHeaderReveal } from "@/lib/useHeaderReveal";

type LogosElementProps = {
  caption: string;
  captionFirst?: boolean;
  extraClasses?: string;
};

export default function LogosElement({ caption, captionFirst = false, extraClasses = "" }: LogosElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  useHeaderReveal(ref);

  return (
    <div ref={ref} className={`logos_element-component ${extraClasses}`}>
      <div className="logos_element-wrapper">
        {captionFirst ? (
          <>
            <div header-animation-type="text" className="text-caption-2">
              {caption}
            </div>
            <div className="logos_banner-wrapper">
              {linesFor().map((cls, i) => (
                <div key={i} header-animation-type="lines-grid" className={`logos_banner-line ${cls}`} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="logos_banner-wrapper">
              {linesFor().map((cls, i) => (
                <div key={i} header-animation-type="lines-grid" className={`logos_banner-line ${cls}`} />
              ))}
            </div>
            <div header-animation-type="text" className="text-caption-2">
              {caption}
            </div>
          </>
        )}
      </div>
      <div className="logos_element-line">
        <div header-animation-type="line" className="logos_line-bg" />
      </div>
    </div>
  );
}
