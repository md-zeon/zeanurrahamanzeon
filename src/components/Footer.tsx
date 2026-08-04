"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { audio, brand, footer, socials } from "@/data/site";
import Clock from "./Clock";

/**
 * Site footer: link columns, logo, Webflow badge, copyright + live clock.
 *
 * Two behaviours live here: the copyright year is kept current, and every
 * `.footer_link` label scrambles between binary text on hover (left-to-right
 * on enter, right-to-left on leave) — same effect family as the buttons.
 */

/** Inline Webflow "w" logo mark (local copy used by the badge). */
function WebflowLogo() {
  return (
    <div className="icon-embed-xxsmall" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 16 10"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0004 0L10.9622 10H6.22988L8.33836 5.85558H8.24379C6.50429 8.14825 3.90892 9.6575 0.210938 10V5.91292C0.210938 5.91292 2.57662 5.77108 3.96735 4.2865H0.210938V7.51019e-05H4.43273V3.52558L4.5275 3.52525L6.25266 7.51019e-05H9.44554V3.50325L9.54027 3.50308L11.3302 0H16.0004Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  // Keep the copyright year current without hardcoding it in markup.
  useEffect(() => {
    const year = document.querySelector(".footer_year");
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  // Binary scramble hover effect on each footer link label.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>(".footer_link").forEach((link) => {
        const textElement = link.querySelector<HTMLElement>(".text-size-small");
        if (!textElement) return;

        const originalText = textElement.textContent ?? "";
        // Reveal step budget: 7 iterations × 2 passes over the string.
        const iterations = 7;
        const totalDuration = 0.3;
        const stepDuration = totalDuration / (iterations * 2);
        let currentTimeline: gsap.core.Timeline | null = null;

        // Builds a variant of the label where positions matching `predicate`
        // show random bits and everything else keeps its real character.
        const scramble = (predicate: (index: number) => boolean) =>
          originalText
            .split("")
            .map((char, index) =>
              predicate(index) ? (Math.random() > 0.5 ? "1" : "0") : char,
            )
            .join("");

        const textTween = (text: () => string): gsap.TweenVars => ({
          duration: stepDuration,
          text: text as unknown as string,
          ease: "expo.out",
        });

        // On enter: scramble one more character per step, left to right,
        // then restore the real text exactly.
        link.addEventListener("mouseenter", () => {
          if (currentTimeline) currentTimeline.kill();
          currentTimeline = gsap.timeline();
          for (let i = 0; i < originalText.length; i++) {
            currentTimeline.to(
              textElement,
              textTween(() => scramble((index) => index <= i)),
              `+=${stepDuration}`,
            );
          }
          currentTimeline.to(textElement, {
            duration: 0.1,
            text: originalText,
          });
        });

        // On leave: scramble back right-to-left, then restore again.
        link.addEventListener("mouseleave", () => {
          if (currentTimeline) currentTimeline.kill();
          currentTimeline = gsap.timeline();
          for (let i = originalText.length - 1; i >= 0; i--) {
            currentTimeline.to(
              textElement,
              textTween(() => scramble((index) => index >= i)),
              `+=${stepDuration}`,
            );
          }
          for (let i = originalText.length - 1; i >= 0; i--) {
            currentTimeline.to(
              textElement,
              textTween(() => scramble((index) => index < i)),
              `+=${stepDuration}`,
            );
          }
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Column index ranges for the [nn] numbering on each group of links.
  const columns = [
    { title: "Overview", links: footer.overview, start: 1 },
    { title: "Case Studies", links: footer.caseStudies, start: 5 },
  ];

  return (
    <footer className="footer_component overflow-hidden" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="footer_comp relative border-t border-white-20 px-4 pb-8 pt-[3.3rem]">
          <div className="container-large">
            <div className="flex flex-col justify-between gap-[3.38rem] max-[767px]:gap-12">
              <div>
                <div className="flex w-full flex-col items-start justify-between gap-[3.38rem] max-[767px]:gap-12">
                  <div className="flex w-full flex-none items-end justify-between gap-16 border-b border-white-20 max-[767px]:gap-8 max-[479px]:flex-wrap max-[479px]:gap-4">
                    <div className="mb-[0.8rem] overflow-hidden">
                      <Link
                        href="/"
                        className="navbar_logo-link flex w-nav-brand flex-row pl-0"
                        data-audio={audio.scramble}
                      >
                        <div className="navbar_logo font-brockmann text-[1.5rem] font-normal leading-[100%] text-brand-white no-underline">
                          {brand.logoStart}
                        </div>
                        <div className="navbar_logo is-animation font-brockmann text-[1.5rem] font-normal leading-[100%] text-brand-white no-underline">
                          {brand.logoEnd}
                        </div>
                      </Link>
                    </div>
                    <div className="flex w-full max-w-104 flex-col items-stretch justify-end gap-1 pr-[0.2rem] max-[991px]:w-[28vw] max-[767px]:w-auto max-[767px]:max-w-none">
                      <div className="text-right">
                        <a
                          href={socials.webflowPartner}
                          target="_blank"
                          className="badge-link w-inline-block"
                          data-audio={audio.scramble}
                        >
                          <WebflowLogo />
                          <div className="text-size-small text-weight-medium text-style-allcaps">
                            Webflow Certified Partner
                          </div>
                        </a>
                      </div>
                      <div className="relative h-px w-full overflow-hidden">
                        <div className="absolute inset-0 bg-brand-white" />
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-[minmax(auto,10rem)_minmax(200px,14rem)_.7fr] items-start justify-between gap-x-12 gap-y-4 max-[991px]:grid-cols-2 max-[991px]:justify-start max-[991px]:[place-items:start_stretch] max-[991px]:gap-24 max-[991px]:flex-wrap max-[767px]:gap-6 max-[479px]:flex max-[479px]:flex-wrap max-[479px]:items-start max-[479px]:justify-start max-[479px]:gap-12">
                      {columns.map((col) => (
                        <div
                          key={col.title}
                          className="footer_link-column flex w-full flex-col gap-4 max-[991px]:w-auto max-[767px]:gap-2"
                        >
                          <div className="overflow-hidden">
                            <div className="heading-style-h6 text-color-teritary">
                              {col.title}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            {col.links.map((link, i) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="footer_link flex gap-1 overflow-hidden py-2 text-[0.875rem] leading-[150%] text-brand-white no-underline"
                                data-audio={audio.scramble}
                              >
                                <div className="text-caption-2 text-color-teritary">
                                  [{String(col.start + i).padStart(2, "0")}]
                                </div>
                                <div className="text-size-small text-style-allcaps">
                                  {link.label}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="footer_link-column is-connect flex w-full flex-col gap-4 max-[991px]:w-auto max-[767px]:gap-2">
                        <div className="overflow-hidden">
                          <div className="heading-style-h6 text-color-teritary">
                            Connect
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-[auto_auto] gap-12 max-[991px]:grid-cols-2 max-[991px]:gap-16 wide:gap-20 max-[767px]:gap-6 max-[479px]:flex max-[479px]:flex-wrap max-[479px]:justify-between max-[479px]:gap-12">
                          <div className="flex flex-col">
                            {footer.connect.map((link, i) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                className="footer_link flex gap-1 overflow-hidden py-2 text-[0.875rem] leading-[150%] text-brand-white no-underline"
                                data-audio={audio.scramble}
                              >
                                <div className="text-caption-2 text-color-teritary">
                                  [{String(9 + i).padStart(2, "0")}]
                                </div>
                                <div className="text-size-small text-style-allcaps">
                                  {link.label}
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="flex flex-col">
                            {footer.connectMore.map((link, i) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                className="footer_link flex gap-1 overflow-hidden py-2 text-[0.875rem] leading-[150%] text-brand-white no-underline"
                                data-audio={audio.scramble}
                              >
                                <div className="text-caption-2 text-color-teritary">
                                  [{String(13 + i).padStart(2, "0")}]
                                </div>
                                <div className="text-size-small text-style-allcaps">
                                  {link.label}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-white-20" />
                <div className="grid grid-cols-3 items-center justify-between gap-8 overflow-hidden max-[991px]:grid-cols-2 max-[767px]:flex max-[767px]:flex-col max-[767px]:items-start max-[767px]:justify-between max-[767px]:gap-6 max-[767px]:pb-4 max-[479px]:flex max-[479px]:flex-col max-[479px]:grid-cols-[auto]">
                  <div className="text-size-small text-color-teritary">
                    © <span className="footer_year">2024</span>{" "}
                    {brand.logoStart}
                    {brand.logoEnd}. All rights reserved.
                  </div>
                  <div className="footer_local-time flex items-center justify-center gap-2 max-[767px]:w-full max-[767px]:items-center max-[767px]:justify-start max-[479px]:order-1">
                    <div
                      id="footer-time"
                      className="text-size-small text-color-teritary"
                    >
                      <Clock />
                    </div>
                  </div>
                  <div className="flex justify-end gap-6 max-[767px]:w-full max-[767px]:justify-start max-[767px]:gap-8 max-[479px]:order-2">
                    <Link
                      href="/privacy-policy"
                      className="text-brand-white no-underline"
                    >
                      <div className="text-size-small text-color-teritary">
                        Privacy Policy
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-y-0 left-0 -ml-6 -mt-0.5 flex h-183.5 w-6.5 flex-col items-center justify-center text-white-20"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 26 734"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M1 734C1.00001 458.764 1.00002 304.451 1.00003 29.2154L25 1"
                  stroke="currentColor"
                />
              </svg>
            </div>
            <div
              className="absolute inset-y-0 right-0 mr-[-1.3rem] -mt-0.5 flex h-183.5 w-6.5 flex-col items-center justify-center text-white-20"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 18 734"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M17.0001 734L17 19.6102L1 1" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
