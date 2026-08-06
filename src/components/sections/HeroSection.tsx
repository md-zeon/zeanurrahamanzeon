"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { brand, socials } from "@/data/site";
import { HERO_ENTRANCE_COMPLETE } from "@/lib/utils";
import { Button, CredentialBadge, Asterisk } from "../shared";
import AutoVideo from "../media/AutoVideo";

// Blocks animated by the final fade-in step. The header text is deliberately
// NOT hidden here — its characters (and the name scramble) are animated
// individually, so hiding these wrappers would mask that animation.
const HEADER_FADE = '[data-hero-fade="video"],[data-hero-fade="cta"]';

// Responsive layout wrappers for the three hero headline lines. The exact
// offsets/padding are tuned to make the three lines interlock across
// breakpoints (a Webflow template pattern).
const headerWrapperBase =
  "flex flex-col items-center gap-4 desktop:flex-row desktop:items-end desktop:justify-center max-[991px]:relative max-[991px]:items-end max-[991px]:justify-start max-[991px]:pr-[24.5vw] max-[767px]:gap-y-2";
const headerWrapperFirst = `${headerWrapperBase} gap-0 desktop:pr-[1.8rem] max-[991px]:pt-8`;
const headerWrapperMiddle = `${headerWrapperBase} -mt-2 -mr-[0.2rem] pr-[17vw] desktop:pr-[0.6rem] max-[991px]:pl-0 max-[991px]:pr-[34vw] max-[767px]:-mt-[0.3rem] max-[479px]:-mt-[0.3rem]`;
const headerWrapperLast = `${headerWrapperBase} -mt-2 pl-[23vw] desktop:pl-[32.6rem] desktop:pr-0 max-[991px]:justify-end max-[991px]:pr-[7vw] max-[767px]:-mt-[0.3rem] max-[479px]:-mt-[0.3rem]`;

/**
 * Home page hero: intro animation on load.
 *
 * The greeting name decodes in with a binary scramble, then the three
 * headline lines slide in character-by-character from the left (each line a
 * little slower than the last, so the wave accelerates top-to-bottom), and
 * finally the video + badge + CTA blocks fade in. Everything runs off a
 * single timeline with relative positions so the sequence is easy to retime,
 * and it plays once on mount.
 *
 * Reduced-motion users get a calm branch (everything visible, no movement)
 * that still signals the navbar so it never waits on an event that won't
 * fire.
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Rebuild the entrance whenever the user's motion preference changes;
    // gsap.matchMedia auto-reverts whichever branch was matching before.
    const mm = gsap.matchMedia();

    // Calm branch: no movement, everything visible immediately. Still
    // dispatches the completion event so the navbar can enter.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(HEADER_FADE, { autoAlpha: 1, y: 0 });
      window.dispatchEvent(new CustomEvent(HERO_ENTRANCE_COMPLETE));
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const name = el.querySelector<HTMLElement>("#home-hero-name");
      if (!name) return;

      // Everything hidden until its tween starts. The page-wrapper fade-in
      // in SiteShell covers the first frames, so nothing flashes.
      gsap.set(HEADER_FADE, { autoAlpha: 0, y: 40 });

      const split1 = new SplitText("#home-hero-header-1", { type: "chars" });
      const split2 = new SplitText("#home-hero-header-2", { type: "chars" });
      const split3 = new SplitText("#home-hero-header-3", { type: "chars" });
      gsap.set([split1.chars, split2.chars, split3.chars], {
        xPercent: -100,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () =>
          window.dispatchEvent(new CustomEvent(HERO_ENTRANCE_COMPLETE)),
      });

      // Name decodes in first — binary scramble, matching the site's
      // terminal/binary identity. revealDelay holds it in full scramble
      // briefly so the decode is actually perceptible (and it lands after
      // the page-wrapper fade starts lifting).
      tl.to(name, {
        scrambleText: {
          text: brand.heroName,
          chars: "01",
          speed: 0.2,
          revealDelay: 0.2,
        },
        duration: 0.8,
        ease: "power1.inOut",
      });

      // Headline lines slide in char-by-char from the left, each line a bit
      // slower than the last so the wave accelerates as it reads down.
      tl.to(
        split1.chars,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2",
      );
      tl.to(
        split2.chars,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.6",
      );
      tl.to(
        split3.chars,
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Video, badge and CTA fade in once the headline has settled. When
      // this final step finishes the timeline signals the navbar.
      tl.to(
        HEADER_FADE,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.6",
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <header
      data-projects-section="first"
      data-parallax-type="section"
      className="relative z-2 overflow-hidden"
      ref={ref}
    >
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative flex w-full items-center justify-center border-b border-white-20">
            <div className="padding-section-large max-width-full">
              <div className="relative z-2 min-w-full text-brand-white desktop:pb-12 max-[991px]:flex max-[991px]:flex-col max-[991px]:items-center max-[991px]:pt-12">
                <div className="grid min-w-full grid-cols-1 place-items-start-center gap-16 desktop:place-items-start-stretch max-[991px]:gap-12 max-[767px]:gap-6 max-[479px]:max-w-[97%]">
                  <div className="relative z-2 flex w-full flex-col gap-8 desktop:gap-4 max-[991px]:gap-4 max-[767px]:gap-2">
                    <div className="flex w-full flex-col gap-6">
                      <div>
                        <div
                          data-hero-fade="header"
                          className={headerWrapperFirst}
                        >
                          <div className="flex items-center justify-start gap-4 mb-[0.8rem] max-[991px]:absolute max-[991px]:inset-x-0 max-[991px]:top-0 max-[991px]:mb-0 max-[991px]:w-full max-[991px]:justify-center max-[991px]:pl-[3.5vw] max-[767px]:mr-[-26.5vw]">
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
                  <div className="relative z-1 flex w-full flex-col justify-between gap-x-[4vw] gap-y-[4vw] pl-13 pr-[4.2rem] desktop:mt-[-6.7rem] desktop:grid desktop:grid-cols-2 desktop:gap-16 max-[991px]:gap-x-12 max-[991px]:gap-y-12 max-[991px]:pr-13 max-[767px]:gap-y-6 max-[479px]:pl-4 max-[479px]:pr-4">
                    <div
                      data-hero-fade="video"
                      className="relative z-2 flex aspect-square w-full max-w-full flex-none items-end justify-center overflow-visible desktop:max-w-xl wide:max-w-none max-[991px]:mr-auto max-[991px]:max-w-none"
                    >
                      <div
                        className="pointer-events-none absolute inset-0 z-3 flex h-full w-full flex-col items-center justify-center"
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
                          className="z-2 flex-none bg-neutral-dark-grey object-cover h-full w-full ultrawide:ml-8 ultrawide:mt-12"
                        >
                          <AutoVideo src={brand.heroVideo} />
                        </div>
                      </div>
                      <div className="absolute -rotate-90 bottom-[3.2rem] left-[-2.7rem] max-[991px]:bottom-[7.9vw] max-[991px]:-left-10 max-[767px]:bottom-[9.9vw] max-[767px]:left-[-2.1rem] max-[479px]:bottom-[10.2vw] max-[479px]:left-[-1.9rem]">
                        <div className="text-caption-2 text-color-teritary">
                          {brand.heroVideoCaption}
                        </div>
                      </div>
                    </div>
                    <div className="relative flex flex-wrap items-start justify-start gap-6 desktop:pt-16 max-[991px]:pt-0">
                      <div className="badge">
                        <div className="badge__icon-wrapper">
                          <div
                            id="home-hero-asterisk"
                            className="badge__icon"
                          >
                            <Asterisk />
                          </div>
                        </div>
                        <div className="badge__line">
                          <div className="badge__line-bg" />
                        </div>
                        <CredentialBadge href={socials.github} />
                      </div>
                      <div
                        data-hero-fade="cta"
                        className="flex w-full max-w-148 flex-col gap-10 desktop:pl-16 max-[991px]:mt-0 max-[991px]:max-w-none max-[991px]:gap-8 max-[991px]:pl-0 max-[767px]:gap-6"
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
                      <div className="absolute bottom-0 left-2 top-8 z-2 hidden h-[170%] w-px bg-white-20 desktop:block desktop:top-24 max-[991px]:hidden" />
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
