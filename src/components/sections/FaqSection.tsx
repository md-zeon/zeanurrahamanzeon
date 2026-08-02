"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { faq } from "@/data/contact";
import { audio } from "@/data/site";
import { useSectionHeadings } from "@/lib/useHeaderReveal";
import LogosElement from "../LogosElement";

function PlusIcon() {
  return (
    <div className="icon-embed-small w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 33" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M15.6165 23.8055V9.7998H16.3892V23.8055H15.6165ZM9 17.189V16.4163H23.0057V17.189H9Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function Answer({ answer }: { answer: string[] }) {
  const lines: string[] = [];
  answer.forEach((p) => lines.push(...p.split("\n")));

  const elements: React.ReactNode[] = [];
  const bullets: string[] = [];
  let key = 0;
  let started = false;

  const flushBullets = () => {
    if (!bullets.length) return;
    elements.push(
      <ul key={`ul-${key++}`} role="list">
        {bullets.map((b, i) => (
          <li key={i}>{b.replace(/^-\s*/, "")}</li>
        ))}
      </ul>
    );
    bullets.length = 0;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      bullets.push(trimmed);
      started = true;
    } else if (trimmed === "") {
      flushBullets();
      started = false;
    } else {
      flushBullets();
      elements.push(<p key={`p-${key++}`}>{trimmed}</p>);
      started = true;
    }
  });
  flushBullets();
  if (!started) elements.push(<p key={`p-${key++}`}>&#8203;</p>);

  return <>{elements}</>;
}

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null);

  useSectionHeadings(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(".faq_answer", { height: 0, overflow: "hidden" });
      gsap.set(".faq_icon-wrapper .icon-embed-small", { rotate: 0 });

      const handleClick = (e: MouseEvent) => {
        const question = (e.currentTarget as HTMLElement).closest(".faq_question") as HTMLElement;
        const wrapper = question.closest(".faq_wrapper") as HTMLElement;
        const scope = (question.closest(".faq_content, .faq_component") ?? el) as HTMLElement;
        const currentAnswer = wrapper.querySelector<HTMLElement>(".faq_answer");
        const currentIcon = question.querySelector<HTMLElement>(".faq_icon-wrapper .icon-embed-small");
        if (!currentAnswer || !currentIcon) return;

        gsap.killTweensOf([currentAnswer, currentIcon]);
        const isOpen = currentAnswer.classList.contains("open");

        if (isOpen) {
          currentAnswer.classList.remove("open");
          currentAnswer.setAttribute("aria-hidden", "true");
          question.setAttribute("aria-expanded", "false");
          gsap.to(currentAnswer, { height: 0, duration: 0.5, ease: "expo.inOut" });
          gsap.to(currentIcon, { rotate: 0, duration: 0.5, ease: "expo.inOut" });
        } else {
          scope.querySelectorAll<HTMLElement>(".faq_answer.open").forEach((openAnswer) => {
            const openIcon = openAnswer.closest(".faq_wrapper")?.querySelector<HTMLElement>(".faq_icon-wrapper .icon-embed-small");
            if (openIcon) {
              gsap.killTweensOf([openAnswer, openIcon]);
              gsap.to(openIcon, { rotate: 0, duration: 0.5, ease: "expo.inOut" });
            }
            openAnswer.classList.remove("open");
            openAnswer.setAttribute("aria-hidden", "true");
            openAnswer.closest(".faq_question")?.setAttribute("aria-expanded", "false");
            gsap.to(openAnswer, { height: 0, duration: 0.5, ease: "expo.inOut" });
          });

          gsap.set(currentAnswer, { height: "auto" });
          const fullHeight = currentAnswer.scrollHeight;
          gsap.set(currentAnswer, { height: 0 });

          currentAnswer.classList.add("open");
          currentAnswer.setAttribute("aria-hidden", "false");
          question.setAttribute("aria-expanded", "true");

          gsap.to(currentAnswer, {
            height: fullHeight,
            duration: 0.5,
            ease: "expo.inOut",
            onComplete: () => gsap.set(currentAnswer, { height: "auto" }),
          });
          gsap.to(currentIcon, { rotate: 135, duration: 0.5, ease: "expo.inOut" });
        }
      };

      const questions = el.querySelectorAll<HTMLElement>(".faq_question");
      questions.forEach((q) => {
        q.addEventListener("click", handleClick);
        if (window.matchMedia("(min-width: 1280px)").matches) {
          const handleEnter = () => gsap.to(q.querySelector(".faq_question-wrapper"), { marginLeft: "1.5rem", duration: 0.3, ease: "expo.inOut" });
          const handleLeave = () => gsap.to(q.querySelector(".faq_question-wrapper"), { marginLeft: 0, duration: 0.3, ease: "expo.inOut" });
          q.addEventListener("mouseenter", handleEnter);
          q.addEventListener("mouseleave", handleLeave);
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq-section" className="section_faq" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="faq_component">
            <div header-animation-type="container" className="faq_header">
              <div className="faq_header-wrapper">
                <div className="faq_header-top">
                  <h2 id="faq-h1" header-animation-type="heading-1" className="heading-style-h0 is-faq">
                    {faq.header[0]}
                  </h2>
                </div>
                <div className="faq_header-middle">
                  <h2 id="faq-h2" header-animation-type="heading-2" className="heading-style-h0 is-faq">
                    {faq.header[1]}
                  </h2>
                </div>
                <div className="faq_header-bottom">
                  <div id="faq-h3" header-animation-type="heading-3" className="heading-style-h0 is-faq">
                    {faq.header[2]}
                  </div>
                </div>
              </div>
              <LogosElement caption={faq.caption} extraClasses="is-faq" />
            </div>
            <div className="faq_layout">
              <div className="faq_content">
                {faq.items.map((item, i) => (
                  <div key={i} className="faq_wrapper">
                    <a data-audio-click={audio.closeMenu} data-audio={audio.secondaryHover} href="#" className="faq_question w-inline-block" onClick={(e) => e.preventDefault()}>
                      <div className="faq_question-wrapper">
                        <div className="heading-style-h5">{item.question}</div>
                      </div>
                      <div className="faq_icon-wrapper">
                        <PlusIcon />
                      </div>
                    </a>
                    <div className="faq_answer" aria-hidden="true">
                      <div className="margin-bottom margin-medium">
                        <div className="text-size-regular text-color-secondary">
                          <Answer answer={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="faq_contact">
                  <div className="text-size-regular">{faq.contactText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
