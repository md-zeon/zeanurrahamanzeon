"use client";

import { useRef } from "react";
import { linesFor, useHeaderReveal } from "@/lib/useHeaderReveal";

type LogosElementProps = {
  caption: string;
  /** Show the caption before (above/left of) the line grid instead of after it. */
  captionFirst?: boolean;
  /** Extra classes appended to the root for layout positioning. */
  extraClasses?: string;
};

/**
 * A small header unit: a caption + decorative line grid + a horizontal rule.
 *
 * The `header-animation-type` attributes tell `useHeaderReveal` which
 * entrance animation each part should get, so the grid lines rise up and the
 * rule grows out when scrolled into view.
 */
export default function LogosElement({
  caption,
  captionFirst = false,
  extraClasses = "",
}: LogosElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  useHeaderReveal(ref);

  // Decorative vertical lines, slightly rotated, repeated in a grid.
  const line = "h-3 w-[0.094rem] rotate-[15deg] bg-brand-white max-[767px]:h-2";
  const row = "flex gap-[0.3rem] overflow-hidden max-[767px]:gap-[0.2rem]";

  return (
    <div
      ref={ref}
      className={`flex w-full max-w-104 flex-col justify-end gap-1 pr-[0.2rem] max-[991px]:w-[28vw] ${extraClasses}`}
    >
      <div className="flex flex-wrap gap-[0.6rem] max-[991px]:justify-start max-[991px]:items-center max-[767px]:gap-[0.3rem]">
        {captionFirst ? (
          <>
            <div header-animation-type="text" className="text-caption-2">
              {caption}
            </div>
            <div className={row}>
              {linesFor().map((cls, i) => (
                <div
                  key={i}
                  header-animation-type="lines-grid"
                  className={`${line} ${cls}`}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={row}>
              {linesFor().map((cls, i) => (
                <div
                  key={i}
                  header-animation-type="lines-grid"
                  className={`${line} ${cls}`}
                />
              ))}
            </div>
            <div header-animation-type="text" className="text-caption-2">
              {caption}
            </div>
          </>
        )}
      </div>
      <div className="relative h-px w-full overflow-hidden">
        <div
          header-animation-type="line"
          className="absolute inset-0 bg-brand-white"
        />
      </div>
    </div>
  );
}
