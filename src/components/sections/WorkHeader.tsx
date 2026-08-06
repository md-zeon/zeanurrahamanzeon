"use client";

import { useRef } from "react";
import { usePageHeaderEntrance } from "@/lib/useHeaderReveal";
import { workHeader } from "@/data/work";
import { audio } from "@/data/site";
import { Asterisk, CredentialIcon } from "../shared";

/**
 * Work page hero: oversized title (with italic word), intro paragraph, a
 * primary CTA to /contact, and the badge link. `header-content-type`
 * attributes drive the load-in entrance (via usePageHeaderEntrance);
 * `data-projects-section="first"` marks it as the first projects-style
 * section on the page (the pinned carousel below is the second).
 */
export default function WorkHeader() {
  const ref = useRef<HTMLElement>(null);
  usePageHeaderEntrance(ref);

  return (
    <header data-projects-section="first" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center">
            <div className="padding-top padding-section-large max-width-full">
              <div className="relative flex min-w-full flex-col gap-8 pb-12 max-[991px]:pt-12">
                <div className="grid min-w-full grid-cols-[1.1fr_1fr] items-start gap-4 max-[991px]:grid-cols-1 max-[991px]:grid-flow-row max-[991px]:items-start max-[991px]:justify-items-center max-[991px]:gap-12 max-[767px]:gap-6 max-[479px]:max-w-[97%]">
                  {/* Left: title */}
                  <div className="relative z-2 flex w-full flex-col gap-8 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6">
                      <div className="pl-4 max-[991px]:pl-0">
                        <h1
                          id="home-hero-header-1"
                          header-content-type="heading-1"
                          className="heading-style-h1"
                        >
                          {workHeader.title1}{" "}
                          <span className="header_italic-word">
                            {workHeader.title2}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* Right: paragraph, CTA, and badge link */}
                  <div className="relative z-1 flex w-full justify-between gap-x-[4vw] gap-y-[4vw] max-[991px]:flex-col max-[991px]:gap-12 max-[991px]:px-16 max-[767px]:px-8 max-[479px]:px-[1.3rem]">
                    <div className="relative flex flex-wrap items-start justify-start gap-[3.7rem] desktop:pr-16 max-[991px]:gap-12">
                      <div className="flex w-full flex-col gap-10 pl-8 desktop:pl-16 max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6">
                        <div
                          id="home-header-p"
                          header-content-type="paragraph"
                          className="text-size-large text-color-secondary"
                        >
                          {workHeader.paragraph}
                        </div>
                        <div className="btn-group btn-group--grid">
                          <a
                            id="home-header-button-1"
                            data-audio={audio.hover}
                            header-content-type="button"
                            href="/contact"
                            className="btn"
                          >
                            <div className="btn__text">
                              {workHeader.buttonLabel}
                            </div>
                          </a>
                        </div>
                      </div>
                      {/* Vertical divider between text and badge */}
                      <div
                        header-content-type="border"
                        className="absolute inset-y-0 left-0 z-2 h-full w-px bg-white-20 max-[991px]:hidden"
                      />
                      {/* Badge with animated asterisk */}
                      <div className="badge">
                        <div className="badge__icon-wrapper">
                          <div
                            id="home-hero-asterisk"
                            header-content-type="asterisk"
                            className="badge__icon w-embed"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="badge__line">
                          <div
                            header-content-type="line-bg"
                            className="badge__line-bg"
                          />
                        </div>
                        <a
                          data-audio={audio.scramble}
                          href={workHeader.badgeLink}
                          target="_blank"
                          className="badge-link"
                        >
                          <CredentialIcon />
                          <div className="text-caption-1">
                            {workHeader.badge}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bottom frame lines */}
                <div header-content-type="border" className="frame" />
                <div header-content-type="border" className="frame is-right" />
                <div header-content-type="border" className="frame is-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
