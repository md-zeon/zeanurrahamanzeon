"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";
import { aboutStory } from "@/data/about";

/**
 * Career story section with scroll-scrubbed effects:
 *  - the story text's words brighten progressively while scrolling
 *  - the left column (big year number + stacked photos/quote) is pinned
 *  - the year counter scrambles between milestone years at set scroll points
 *
 * `StoryBody` renders the body text, turning any `aboutStory.links` fragment
 * found in the text into an inline external link.
 */

/** Renders body text as paragraphs, splicing in the defined links. */
function StoryBody() {
  const { body, links } = aboutStory;
  const paragraphs: React.ReactNode[] = [];
  let linkIdx = 0;

  body.forEach((para, pi) => {
    const parts: React.ReactNode[] = [];
    const text = para;
    let cursor = 0;
    let link = links[linkIdx];

    // Walk the paragraph, replacing each occurrence of a link's text with an
    // <a> tag and keeping the plain text chunks in between.
    while (linkIdx < links.length) {
      const idx = text.indexOf(link.text, cursor);
      if (idx === -1) break;
      if (idx > cursor) parts.push(text.slice(cursor, idx));
      parts.push(
        <a
          key={`${pi}-${linkIdx}`}
          href={link.href}
          target="_blank"
          className="cursor-pointer border-b-2 border-white-30 no-underline transition-all duration-200 hover:border-brand-white"
        >
          {link.text}
        </a>,
      );
      cursor = idx + link.text.length;
      linkIdx++;
      link = links[linkIdx];
    }
    parts.push(text.slice(cursor));

    paragraphs.push(
      <span key={`p-${pi}`}>
        {parts.map((part, i) => (
          <span key={i}>{part}</span>
        ))}
        {pi < body.length - 1 ? (
          <>
            <br />
            <br />
          </>
        ) : null}
      </span>,
    );
  });

  return <>{paragraphs}</>;
}

export default function AboutStory() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const element = el.querySelector<HTMLElement>("#highlighted-text");
      if (element) {
        // Split into words then characters (chars are easier to stagger
        // across a scrub), and brighten each char from 20% to 100% as the
        // text scrolls through the viewport.
        const splitWords = new SplitText(element, { type: "words" });
        const allChars: Element[] = [];
        splitWords.words.forEach((word) => {
          const wrapper = document.createElement("span");
          wrapper.style.display = "inline-block";
          const wordClone = word.cloneNode(true);
          wrapper.appendChild(wordClone);
          word.parentNode?.replaceChild(wrapper, word);
          const splitChars = new SplitText(wordClone as HTMLElement, {
            type: "chars",
          });
          allChars.push(...splitChars.chars);
        });
        gsap.fromTo(
          allChars,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 0.3,
            },
          },
        );
      }

      // Keep the year number in place while the section scrolls.
      ScrollTrigger.create({
        trigger: ".about-story_grid",
        start: "top 85%",
        end: "bottom bottom",
        pin: ".about-story_year",
        pinSpacing: false,
        scrub: true,
      });

      // Keep the photo/quote stack on the left pinned while the story text
      // scrolls beside it.
      ScrollTrigger.create({
        trigger: ".about-story_left",
        start: "top top",
        end: "bottom bottom",
        pin: ".about-story_cards-component",
        pinSpacing: false,
        scrub: true,
      });

      // Scramble the year counter between milestones as the page scrolls.
      // Each ScrollTrigger fires `scrambleTo` on enter/enter-back.
      const yearEl = el.querySelector<HTMLElement>("#career-year");
      if (yearEl) {
        const yearSequence = [
          { year: 2018, start: "top 70%" },
          { year: 2019, start: "top 65%" },
          { year: 2021, start: "top 55%" },
          { year: 2022, start: "top 35%" },
          { year: 2023, start: "top 10%" },
          { year: 2026, start: "top 0%" },
        ];

        let currentTween: gsap.core.Tween | null = null;
        // Animate the numeric display from its current value to `newValue`
        // (killing any in-flight scramble so rapid triggers stay smooth).
        const scrambleTo = (newValue: number) => {
          if (currentTween) currentTween.kill();
          const oldValue = parseInt(yearEl.textContent || "0", 10) || 0;
          const scrambleObj = { val: oldValue };
          currentTween = gsap.to(scrambleObj, {
            val: newValue,
            duration: 1.2,
            ease: "expo.out",
            onUpdate: () => {
              yearEl.textContent = Math.floor(scrambleObj.val).toString();
            },
          });
        };

        yearSequence.forEach((entry, i) => {
          ScrollTrigger.create({
            trigger: element ?? ".about-story_grid",
            start: entry.start,
            end:
              i < yearSequence.length - 1
                ? yearSequence[i + 1].start
                : "bottom 20%",
            onEnter: () => scrambleTo(entry.year),
            onEnterBack: () => scrambleTo(entry.year),
          });
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section data-parallax-type="section" className="relative z-2" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="relative z-2 grid w-full auto-cols-fr grid-cols-1 items-center justify-center border-l border-white-20 max-[767px]:pb-12 max-[479px]:border-l-0 max-[479px]:pb-0">
            <div className="about-story_grid relative grid auto-cols-fr grid-cols-[0.5fr_1fr] items-start justify-items-stretch justify-between gap-x-6 gap-y-20 border-b border-white-20 max-[991px]:flex max-[991px]:flex-col max-[991px]:min-h-0">
              <div className="about-story_left relative h-full w-full max-[991px]:hidden">
                <div className="about-story_year z-10 w-auto self-start">
                  <div id="career-year" className="heading-style-h0 is-career">
                    {aboutStory.year}
                  </div>
                </div>
                <div className="about-story_cards-component absolute right-4 top-24 w-[80%] max-[767px]:hidden">
                  <div className="relative aspect-2/3">
                    <div className="absolute inset-0 z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                      <img
                        src={aboutStory.images[0].src}
                        alt={aboutStory.images[0].alt}
                        loading="lazy"
                        className="h-full w-full max-w-full flex-none object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                      <div className="flex h-full w-full flex-col justify-between rounded-lg border border-white-20 bg-[#efefe60d] p-6 backdrop-blur-[100px] max-[991px]:p-4">
                        <div className="relative">
                          <div className="absolute left-[-0.6rem] top-0">
                            <div className="text-size-medium">&quot;</div>
                          </div>
                          <div className="text-size-medium">
                            {aboutStory.quote}
                          </div>
                        </div>
                        <div>
                          <div className="text-size-regular text-weight-medium">
                            {aboutStory.quoteName}
                          </div>
                          <div className="text-size-regular text-color-secondary">
                            {aboutStory.quoteRole}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                      <img
                        src={aboutStory.images[1].src}
                        alt={aboutStory.images[1].alt}
                        loading="lazy"
                        className="h-full w-full max-w-full flex-none object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-1 flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                      <img
                        src={aboutStory.images[2].src}
                        alt={aboutStory.images[2].alt}
                        loading="lazy"
                        className="h-full w-full max-w-full flex-none object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute left-[-2.7rem] bottom-[1.9rem] -rotate-90">
                    <div className="text-caption-2 text-color-teritary">
                      {aboutStory.misc}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex max-w-214.5 flex-col items-start justify-start gap-8 wide:max-w-262">
                <div className="border-l border-r border-white-20 px-4 py-28 max-[991px]:px-12 max-[991px]:py-20 max-[767px]:px-8 max-[767px]:py-12 max-[479px]:px-6">
                  <div id="highlighted-text" className="heading-style-h4">
                    <StoryBody />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
