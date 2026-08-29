"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { testimonials, testimonialsHeader } from "@/data/home";
import { audio } from "@/data/site";
import Image from "next/image";
import LogosElement from "../LogosElement";
import { SliderArrow } from "../shared";

/**
 * Client testimonials: quote, marks, name/role and photo, with prev/next
 * arrows and a 10s auto-advance (paused on hover/focus, skipped for
 * reduced-motion users).
 *
 * On scroll the quote reveals line-by-line (each line wrapped in an
 * overflow-hidden box), the photo/name/role scramble-fade in. The prev/next
 * arrows and the auto-advance swap the quote/name/role/photo with a
 * slide-out + slide-in transition.
 */
export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  // Which testimonial is currently shown (avoids re-triggering on same click).
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cleanups: Array<() => void> = [];
      // Track the current SplitText instance so swaps revert it before the
      // text is replaced (new SplitText restores the element's ORIGINAL text,
      // which would clobber an updated textContent).
      let quoteSplit: SplitText | null = null;
      const quoteElement = el.querySelector<HTMLElement>("#testimonial-quote");
      const marksElement = el.querySelector<HTMLElement>("#testimonial-marks");
      const nameElement = el.querySelector<HTMLElement>("#testimonial-name");
      const roleElement = el.querySelector<HTMLElement>("#testimonial-role");
      const photoElement =
        el.querySelector<HTMLImageElement>(".testimonial_photo");

      // Splits the quote into lines and wraps each in an overflow-hidden div
      // so the line reveal (slide up from below) is masked cleanly.
      const wrapLines = (quote: HTMLElement) => {
        const split = new SplitText(quote, { type: "lines" });
        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.classList.add("line-wrapper");
          wrapper.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
        return split;
      };

      if (quoteElement) {
        // Hide marks + lines, reveal them when scrolled into view.
        gsap.set(marksElement, { opacity: 0, y: 30 });
        gsap.set(quoteElement, { opacity: 0 });
        quoteSplit = wrapLines(quoteElement);
        gsap.set(quoteElement, { opacity: 1 });
        gsap.set(quoteElement.querySelectorAll(".line-wrapper > *"), {
          y: 100,
          opacity: 0,
        });
        gsap.to(marksElement, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".testimonial_quote-layout",
            start: "top 77%",
            once: true,
          },
        });
        gsap.to(quoteElement.querySelectorAll(".line-wrapper > *"), {
          y: 0,
          opacity: 1,
          ease: "expo.out",
          duration: 1,
          stagger: 0.07,
          scrollTrigger: {
            trigger: ".testimonial_quote-layout",
            start: "top 80%",
            once: true,
          },
        });
      }

      // Photo fades in; name and role scramble-reveal on scroll.
      gsap.set(".testimonial_photo", { opacity: 0 });
      gsap.to(".testimonial_photo", {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".testimonial_info-layout",
          start: "top 80%",
          once: true,
        },
      });
      gsap.set([nameElement, roleElement], { opacity: 0 });
      gsap.to(nameElement, {
        opacity: 1,
        scrambleText: {
          text: nameElement?.textContent?.trim() ?? "",
          chars: "10",
          speed: 0.2,
        },
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".testimonial_info-layout",
          start: "top 80%",
          once: true,
        },
      });
      gsap.to(roleElement, {
        opacity: 1,
        scrambleText: {
          text: roleElement?.textContent?.trim() ?? "",
          chars: "10",
          speed: 0.2,
        },
        duration: 1.6,
        ease: "expo.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: ".testimonial_info-layout",
          start: "top 80%",
          once: true,
        },
      });
      // Swap to testimonial `index`: slide the current quote out (re-wrapped
      // to match the new text length), swap content, slide the new one in.
      const switchTo = (index: number) => {
        if (currentIndexRef.current === index || !quoteElement || !quoteSplit)
          return;
        currentIndexRef.current = index;
        const { quote, name, role, image } = testimonials[index];
        const split = quoteSplit;
        gsap.to([marksElement, split.lines[0]], {
          y: 100,
          opacity: 0,
          duration: 0.6,
          ease: "expo.in",
        });
        gsap.to(split.lines, {
          y: 100,
          opacity: 0,
          duration: 0.6,
          ease: "expo.in",
          stagger: 0.07,
          onComplete: () => {
            // Revert the previous split FIRST (this also restores the plain
            // text) so a fresh SplitText captures the NEW quote as its
            // original instead of the stale first one.
            split.revert();
            quoteSplit = null;
            quoteElement.textContent = quote;
            if (nameElement) nameElement.textContent = name;
            if (roleElement) roleElement.textContent = role;
            if (photoElement) {
              photoElement.removeAttribute("srcset");
              photoElement.src = image;
            }
            const newSplit = wrapLines(quoteElement);
            quoteSplit = newSplit;
            gsap.set(newSplit.lines, { y: 100, opacity: 0 });
            gsap.to([marksElement, newSplit.lines[0]], {
              y: 0,
              opacity: 1,
              ease: "expo.out",
              duration: 1,
            });
            gsap.to(newSplit.lines, {
              y: 0,
              opacity: 1,
              ease: "expo.out",
              duration: 1,
              stagger: 0.07,
              delay: 0.1,
            });
          },
        });
      };

      // Prev/next arrows wrap around the testimonial list.
      const total = testimonials.length;
      const prevButton = el.querySelector<HTMLElement>(
        "[data-testimonial-prev]",
      );
      const nextButton = el.querySelector<HTMLElement>(
        "[data-testimonial-next]",
      );
      const goTo = (delta: number) => {
        const next = (currentIndexRef.current + delta + total) % total;
        if (next === currentIndexRef.current) return;
        switchTo(next);
        resetTimer();
      };
      const onPrev = (e: Event) => {
        e.preventDefault();
        goTo(-1);
      };
      const onNext = (e: Event) => {
        e.preventDefault();
        goTo(1);
      };
      prevButton?.addEventListener("click", onPrev);
      nextButton?.addEventListener("click", onNext);
      cleanups.push(() => {
        prevButton?.removeEventListener("click", onPrev);
        nextButton?.removeEventListener("click", onNext);
      });
      // Light hover feedback on the arrows, matching the slider controls.
      [prevButton, nextButton].forEach((btn) => {
        if (!btn) return;
        const onEnter = () =>
          gsap.to(btn, {
            scale: 1.15,
            opacity: 0.8,
            duration: 0.25,
            ease: "expo.out",
          });
        const onLeave = () =>
          gsap.to(btn, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "expo.out",
          });
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });

      // Auto-advance every 10s, paused while the section is hovered or focused
      // (keyboard users / anyone reading get to take their time), and skipped
      // entirely when the user prefers reduced motion.
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let timer: number | undefined;
      const resetTimer = () => {
        if (reducedMotion) return;
        window.clearInterval(timer);
        timer = window.setInterval(() => goTo(1), 10000);
      };
      const pause = () => window.clearInterval(timer);
      const resume = () => resetTimer();
      if (!reducedMotion) resetTimer();
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
      el.addEventListener("focusin", pause);
      el.addEventListener("focusout", resume);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
        el.removeEventListener("focusin", pause);
        el.removeEventListener("focusout", resume);
        window.clearInterval(timer);
      });

      return () => cleanups.forEach((fn) => fn());
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-2" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="grid grid-cols-1">
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-cols-[auto_auto] justify-between gap-0 border-b border-l border-white-20 pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="pt-[7rem] pb-6 pr-6 max-[991px]:pt-20">
                <div className="flex justify-start">
                  <h2 id="testimonial-h1" className="heading-style-h0">
                    {testimonialsHeader.line1}
                  </h2>
                </div>
                <div className="flex items-stretch justify-start -mt-2 pl-[7.3vw] desktop:pl-24 max-[991px]:pl-[10.7vw] max-[767px]:mt-[-0.2rem] max-[767px]:pl-0">
                  <div id="testimonial-h2" className="heading-style-h0">
                    {testimonialsHeader.line2}
                  </div>
                </div>
              </div>
              <LogosElement caption={testimonialsHeader.caption} />
            </div>
            <div className="relative z-2 grid grid-cols-1 items-stretch">
              <div className="flex justify-end border-b border-l border-r border-white-20 px-[7.3vw] py-20 desktop:pl-0 desktop:pr-[6.88rem] max-[767px]:px-6 max-[767px]:py-8">
                <div className="testimonial_quote-layout flex w-full max-w-217.25 flex-col gap-10 max-[991px]:gap-6">
                  <div className="relative pl-[0.7rem] text-color-secondary max-[991px]:pl-[0.6rem] max-[479px]:-ml-2 max-[479px]:pl-2">
                    <div className="absolute left-0 top-0 overflow-hidden">
                      <div
                        id="testimonial-marks"
                        className="heading-style-h5 is-testimonial"
                      >
                        &ldquo;
                      </div>
                    </div>
                    <div
                      id="testimonial-quote"
                      className="heading-style-h5 is-testimonial"
                    >
                      {testimonials[0].quote}
                    </div>
                  </div>
                  <div className="testimonial_info-layout flex items-center justify-start gap-4 pl-[0.8rem] max-[767px]:pl-[0.6rem] max-[479px]:pl-0">
                    <div className="relative flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-full max-[767px]:h-10 max-[767px]:w-10">
                      <Image
                        src={testimonials[0].image}
                        alt=""
                        fill
                        sizes="56px"
                        className="testimonial_photo"
                      />
                    </div>
                    <div className="testimonial_info-wrapper">
                      <div className="testimonial_name">
                        <div
                          id="testimonial-name"
                          className="text-size-medium text-weight-medium"
                        >
                          {testimonials[0].name}
                        </div>
                      </div>
                      <div className="testimonial_role">
                        <div
                          id="testimonial-role"
                          className="text-size-medium text-color-secondary"
                        >
                          {testimonials[0].role}
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <a
                        data-testimonial-prev
                        data-audio={audio.hover}
                        href="#"
                        aria-label="Previous testimonial"
                        className="w-inline-block"
                      >
                        <SliderArrow direction="left" />
                      </a>
                      <a
                        data-testimonial-next
                        data-audio={audio.hover}
                        href="#"
                        aria-label="Next testimonial"
                        className="w-inline-block"
                      >
                        <SliderArrow direction="right" />
                      </a>
                    </div>
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
