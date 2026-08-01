"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";
import { aboutStory } from "@/data/about";

function StoryBody() {
  const { body, links } = aboutStory;
  const paragraphs: React.ReactNode[] = [];
  let linkIdx = 0;

  body.forEach((para, pi) => {
    const parts: React.ReactNode[] = [];
    const text = para;
    let cursor = 0;
    let link = links[linkIdx];

    while (linkIdx < links.length) {
      const idx = text.indexOf(link.text, cursor);
      if (idx === -1) break;
      if (idx > cursor) parts.push(text.slice(cursor, idx));
      parts.push(
        <a key={`${pi}-${linkIdx}`} href={link.href} target="_blank" className="about-story_link">
          {link.text}
        </a>
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
      </span>
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
        const splitWords = new SplitText(element, { type: "words" });
        const allChars: Element[] = [];
        splitWords.words.forEach((word) => {
          const wrapper = document.createElement("span");
          wrapper.style.display = "inline-block";
          const wordClone = word.cloneNode(true);
          wrapper.appendChild(wordClone);
          word.parentNode?.replaceChild(wrapper, word);
          const splitChars = new SplitText(wordClone as HTMLElement, { type: "chars" });
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
          }
        );
      }

      ScrollTrigger.create({
        trigger: ".about-story_grid",
        start: "top 85%",
        end: "bottom bottom",
        pin: ".about-story_year",
        pinSpacing: false,
        scrub: true,
      });

      ScrollTrigger.create({
        trigger: ".about-story_left",
        start: "top top",
        end: "bottom bottom",
        pin: ".about-story_cards-component",
        pinSpacing: false,
        scrub: true,
      });

      const yearEl = el.querySelector<HTMLElement>("#career-year");
      if (yearEl) {
        const yearSequence = [
          { year: 2018, start: "top 70%" },
          { year: 2019, start: "top 65%" },
          { year: 2021, start: "top 55%" },
          { year: 2022, start: "top 35%" },
          { year: 2023, start: "top 10%" },
          { year: 2025, start: "top 0%" },
        ];

        let currentTween: gsap.core.Tween | null = null;
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
            end: i < yearSequence.length - 1 ? yearSequence[i + 1].start : "bottom 20%",
            onEnter: () => scrambleTo(entry.year),
            onEnterBack: () => scrambleTo(entry.year),
          });
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section data-parallax-type="section" className="section_about-story" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="about-story_component">
            <div className="about-story_grid">
              <div className="about-story_left">
                <div className="about-story_year">
                  <div id="career-year" className="heading-style-h0 is-career">
                    {aboutStory.year}
                  </div>
                </div>
                <div className="about-story_cards-component">
                  <div className="about-story_cards-layout">
                    <div className="about-story_cards-wrapper is-1">
                      <img src={aboutStory.images[0].src} alt={aboutStory.images[0].alt} loading="lazy" className="about-story_cards-image" />
                    </div>
                    <div className="about-story_cards-wrapper is-2">
                      <div className="about-story_testimonial-card">
                        <div className="about-story_testimonial-wrapper">
                          <div className="about-story_testimonial-quote">
                            <div className="text-size-medium">&quot;</div>
                          </div>
                          <div className="text-size-medium">{aboutStory.quote}</div>
                        </div>
                        <div className="about-story_info">
                          <div className="text-size-regular text-weight-medium">{aboutStory.quoteName}</div>
                          <div className="text-size-regular text-color-secondary">{aboutStory.quoteRole}</div>
                        </div>
                      </div>
                    </div>
                    <div className="about-story_cards-wrapper is-3">
                      <img src={aboutStory.images[1].src} alt={aboutStory.images[1].alt} loading="lazy" className="about-story_cards-image" />
                    </div>
                    <div className="about-story_cards-wrapper is-4">
                      <img src={aboutStory.images[2].src} alt={aboutStory.images[2].alt} loading="lazy" className="about-story_cards-image" />
                    </div>
                  </div>
                  <div className="about-story_cards-misc">
                    <div className="text-caption-2 text-color-teritary">{aboutStory.misc}</div>
                  </div>
                </div>
              </div>
              <div className="about-story_content">
                <div className="about-story_wrapper">
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
