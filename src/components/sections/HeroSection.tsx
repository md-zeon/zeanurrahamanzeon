"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { brand, socials } from "@/data/site";
import { Button, WebflowBadge, Asterisk } from "../shared";
import AutoVideo from "../media/AutoVideo";

const HEADER_FADE =
  '[data-hero-fade="header"],[data-hero-fade="video"],[data-hero-fade="cta"]';

const headerWrapperBase =
  "flex flex-col items-center gap-4 min-[1280px]:flex-row min-[1280px]:items-end min-[1280px]:justify-center max-[991px]:relative max-[991px]:items-end max-[991px]:justify-start max-[991px]:pr-[24.5vw] max-[767px]:gap-y-2";
const headerWrapperFirst = `${headerWrapperBase} gap-0 min-[1280px]:pr-[1.8rem] max-[991px]:pt-8`;
const headerWrapperMiddle = `${headerWrapperBase} -mt-2 -mr-[0.2rem] pr-[17vw] min-[1280px]:pr-[0.6rem] max-[991px]:pl-0 max-[991px]:pr-[34vw] max-[767px]:-mt-[0.3rem] max-[479px]:-mt-[0.3rem]`;
const headerWrapperLast = `${headerWrapperBase} -mt-2 pl-[23vw] min-[1280px]:pl-[32.6rem] min-[1280px]:pr-0 max-[991px]:justify-end max-[991px]:pr-[7vw] max-[767px]:-mt-[0.3rem] max-[479px]:-mt-[0.3rem]`;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(HEADER_FADE, { autoAlpha: 0, y: 40 });

      const name = new SplitText("#home-hero-name", { type: "chars" });
      const split1 = new SplitText("#home-hero-header-1", { type: "chars" });
      const split2 = new SplitText("#home-hero-header-2", { type: "chars" });
      const split3 = new SplitText("#home-hero-header-3", { type: "chars" });

      gsap.from(name.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(split1.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.45,
      });
      gsap.from(split2.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.55,
      });
      gsap.from(split3.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.65,
      });

      gsap.to(HEADER_FADE, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.9,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      data-projects-section="first"
      data-parallax-type="section"
      className="relative z-[2] overflow-hidden"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center border-b border-[#efefe633]">
            <div className="padding-section-large max-width-full">
              <div className="relative z-[2] min-w-full text-brand-white min-[1280px]:pb-12 max-[991px]:flex max-[991px]:flex-col max-[991px]:items-center max-[991px]:pt-12">
                <div className="grid min-w-full grid-cols-1 place-items-start-center gap-16 min-[1280px]:place-items-start-stretch max-[991px]:gap-12 max-[767px]:gap-6 max-[479px]:max-w-[97%]">
                  <div className="relative z-[2] flex w-full flex-col gap-8 min-[1280px]:gap-4 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6">
                      <div>
                        <div
                          data-hero-fade="header"
                          className={headerWrapperFirst}
                        >
                          <div className="flex items-center justify-start gap-4 mb-[0.8rem] max-[991px]:absolute max-[991px]:inset-x-0 max-[991px]:top-0 max-[991px]:mb-0 max-[991px]:w-full max-[991px]:justify-center max-[991px]:pl-[3.5vw] max-[767px]:-mr-[26.5vw]">
                            <div className="flex flex-row">
                              <p
                                id="home-hero-name"
                                className="text-size-medium"
                              >
                                {brand.heroName}
                              </p>
                            </div>
                          </div>
                          <h1
                            id="home-hero-header-1"
                            className="heading-style-h0"
                          >
                            {brand.heroLine1}
                          </h1>
                        </div>
                        <div
                          data-hero-fade="header"
                          className={headerWrapperMiddle}
                        >
                          <div
                            id="home-hero-header-2"
                            className="heading-style-h0"
                          >
                            {brand.heroLine2}
                          </div>
                        </div>
                        <div
                          data-hero-fade="header"
                          className={headerWrapperLast}
                        >
                          <div
                            id="home-hero-header-3"
                            className="heading-style-h0"
                          >
                            {brand.heroLine3}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-[1] flex w-full flex-col justify-between gap-x-[4vw] gap-y-[4vw] pl-[3.25rem] pr-[4.2rem] min-[1280px]:mt-[-6.7rem] min-[1280px]:grid min-[1280px]:grid-cols-2 min-[1280px]:gap-16 max-[991px]:gap-x-12 max-[991px]:gap-y-12 max-[991px]:pr-[3.25rem] max-[767px]:gap-y-6 max-[479px]:pl-4 max-[479px]:pr-4">
                    <div
                      data-hero-fade="video"
                      className="relative z-[2] flex aspect-square h-full w-full max-w-full flex-none items-end justify-center overflow-visible min-[1280px]:max-w-[36rem] min-[1440px]:max-w-none max-[991px]:mr-auto max-[991px]:max-w-none"
                    >
                      <div
                        className="pointer-events-none absolute inset-0 z-[3] flex h-full w-full flex-col items-center justify-center"
                        aria-hidden="true"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 518 518"
                          fill="none"
                        >
                          <path
                            d="M0.5 487.823V0.5H513V31.9941V32.1989L513.144 32.3449L517.5 36.7696V517.5H31.6998L0.5 487.823Z"
                            stroke="#EFEFE6"
                          />
                        </svg>
                      </div>
                      <div className="flex h-full w-full items-center justify-center max-[479px]:[clip-path:polygon(99%_0,99%_6%,100%_7%,100%_100%,6%_100%,0_94%,0_0)]">
                        <div
                          data-parallax-type="video"
                          className="z-[2] bg-neutral-dark-grey min-[1920px]:ml-8 min-[1920px]:mt-12"
                        >
                          <AutoVideo src={brand.heroVideo} />
                        </div>
                      </div>
                      <div className="absolute -rotate-90 bottom-[3.2rem] left-[-2.7rem] max-[991px]:bottom-[7.9vw] max-[991px]:left-[-2.5rem] max-[767px]:bottom-[9.9vw] max-[767px]:left-[-2.1rem] max-[479px]:bottom-[10.2vw] max-[479px]:left-[-1.9rem]">
                        <div className="text-caption-2 text-color-teritary">
                          {brand.heroVideoCaption}
                        </div>
                      </div>
                    </div>
                    <div className="relative flex flex-wrap items-start justify-start gap-6 min-[1280px]:pt-16 max-[991px]:pt-0">
                      <div className="badge">
                        <div className="badge__icon-wrapper">
                          <div
                            id="home-hero-asterisk"
                            className="badge__icon w-embed"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <div className="badge__line">
                              <div className="badge__line-bg" />
                            </div>
                            <WebflowBadge href={socials.webflowPartner} />
                          </div>
                          <div
                            data-hero-fade="cta"
                            className="flex w-full max-w-[37rem] flex-col gap-10 min-[1280px]:pl-16 max-[991px]:mt-0 max-[991px]:max-w-none max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6"
                          >
                            <div id="home-header-p" className="text-size-large">
                              {brand.heroIntro}
                            </div>
                            <div className="btn-group btn-group--grid">
                              <Button href="/contact">Get in touch</Button>
                              <Button href="/work" variant="secondary">
                                See work
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-[0.5rem] top-8 z-[2] hidden h-[170%] w-px bg-[#efefe633] min-[1280px]:block min-[1280px]:top-24 max-[991px]:hidden" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="frame" />
                <div className="frame is-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
