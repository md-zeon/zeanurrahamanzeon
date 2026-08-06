"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { testimonials } from "@/data/home";
import { audio } from "@/data/site";
import LogosElement from "../LogosElement";

/**
 * Client testimonials: quote, marks, name/role and photo, plus a strip of
 * client logos used as navigation.
 *
 * On scroll the quote reveals line-by-line (each line wrapped in an
 * overflow-hidden box), the photo/name/role scramble-fade in, and the nav
 * slides up. Clicking a logo tile, the prev/next arrows, or letting the
 * 6s auto-advance tick swaps the quote/name/role/photo with a slide-out +
 * slide-in transition.
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
        wrapLines(quoteElement);
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
      gsap.set(".testimonial_nav-wrapper", { y: 50, opacity: 0 });
      gsap.to(".testimonial_nav-wrapper", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".testimonial_nav-component",
          start: "top 90%",
          once: true,
        },
      });

      // Swap to testimonial `index`: slide the current quote out (re-wrapped
      // to match the new text length), swap content, slide the new one in,
      // and highlight the active nav logo.
      const switchTo = (index: number) => {
        if (currentIndexRef.current === index || !quoteElement) return;
        currentIndexRef.current = index;
        const { quote, name, role, image } = testimonials[index];
        const split = wrapLines(quoteElement);
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
            quoteElement.textContent = quote;
            if (nameElement) nameElement.textContent = name;
            if (roleElement) roleElement.textContent = role;
            if (photoElement) photoElement.src = image;
            const newSplit = wrapLines(quoteElement);
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
        el.querySelectorAll(".testimonial_nav-wrapper").forEach((nav, i) => {
          gsap.to(nav, {
            opacity: i === index ? 1 : 0.5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      };

      el.querySelectorAll(".testimonial_nav-wrapper").forEach((nav, index) => {
        const onClick = (event: Event) => {
          event.preventDefault();
          if (index !== currentIndexRef.current) {
            switchTo(index);
            resetTimer();
          }
        };
        nav.addEventListener("click", onClick);
        cleanups.push(() => nav.removeEventListener("click", onClick));
        // Hover feedback: brighten the logo tile, restoring the active state
        // on leave.
        const onEnter = () =>
          gsap.to(nav, {
            opacity: 1,
            borderColor: "#efefe680",
            duration: 0.25,
            ease: "power2.out",
          });
        const onLeave = () =>
          gsap.to(nav, {
            opacity: index === currentIndexRef.current ? 1 : 0.5,
            borderColor: "rgba(239, 239, 230, 0.2)",
            duration: 0.25,
            ease: "power2.out",
          });
        nav.addEventListener("mouseenter", onEnter);
        nav.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          nav.removeEventListener("mouseenter", onEnter);
          nav.removeEventListener("mouseleave", onLeave);
        });
      });

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

      // Auto-advance every 6s, paused while the section is hovered.
      let timer = window.setInterval(() => goTo(1), 6000);
      const resetTimer = () => {
        window.clearInterval(timer);
        timer = window.setInterval(() => goTo(1), 6000);
      };
      const pause = () => window.clearInterval(timer);
      const resume = () => resetTimer();
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", resume);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", resume);
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
                    Words From
                  </h2>
                </div>
                <div className="flex items-stretch justify-start -mt-2 pl-[7.3vw] desktop:pl-24 max-[991px]:pl-[10.7vw] max-[767px]:mt-[-0.2rem] max-[767px]:pl-0">
                  <div id="testimonial-h2" className="heading-style-h0">
                    collaborators
                  </div>
                </div>
              </div>
              <LogosElement caption="CLI_TES_104" />
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
                    <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-full max-[767px]:h-10 max-[767px]:w-10">
                      <img
                        src={testimonials[0].image}
                        loading="lazy"
                        alt=""
                        className="testimonial_photo h-full w-full"
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
                        <div className="icon-embed-medium w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            viewBox="0 0 48 49"
                            fill="none"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                            role="img"
                          >
                            <path
                              d="M38 24.7002H10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M24 38.7002L10 24.7002L24 10.7002"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </a>
                      <a
                        data-testimonial-next
                        data-audio={audio.hover}
                        href="#"
                        aria-label="Next testimonial"
                        className="w-inline-block"
                      >
                        <div className="icon-embed-medium w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            viewBox="0 0 48 49"
                            fill="none"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                            role="img"
                          >
                            <path
                              d="M10 24.7002H38"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M24 10.7002L38 24.7002L24 38.7002"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial_nav-component no-scrollbar hidden max-[991px]:flex max-[991px]:overflow-auto max-[991px]:rounded-r max-[991px]:border-r max-[991px]:border-white-20">
                {testimonials.map((item, i) => (
                  <a
                    key={i}
                    data-audio={audio.secondaryHover}
                    href="#"
                    className={`testimonial_nav-wrapper flex aspect-[1.3] items-center justify-center border border-white-20 bg-[#efefe600] backdrop-blur-[100px] transition-all duration-200 max-[991px]:min-h-28 max-[767px]:min-h-24 max-[479px]:min-h-[30vw] ${i === 0 ? "rounded-l is-first is-active" : i === testimonials.length - 1 ? "rounded-r is-last" : ""} w-inline-block`}
                  >
                    <img
                      src={item.logo}
                      loading="lazy"
                      alt=""
                      className="testimonial_nav-logo h-full max-h-[2.2rem] wide:max-h-10 max-[991px]:max-h-[1.7rem] max-[479px]:max-h-[8vw]"
                    />
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden h-28 border-l border-white-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
