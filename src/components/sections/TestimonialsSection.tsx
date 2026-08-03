"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { testimonials } from "@/data/home";
import LogosElement from "../LogosElement";

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const quoteElement = el.querySelector<HTMLElement>("#testimonial-quote");
      const marksElement = el.querySelector<HTMLElement>("#testimonial-marks");
      const nameElement = el.querySelector<HTMLElement>("#testimonial-name");
      const roleElement = el.querySelector<HTMLElement>("#testimonial-role");
      const photoElement = el.querySelector<HTMLImageElement>(".testimonial_photo");

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
        gsap.set(marksElement, { opacity: 0, y: 30 });
        gsap.set(quoteElement, { opacity: 0 });
        wrapLines(quoteElement);
        gsap.set(quoteElement, { opacity: 1 });
        gsap.set(quoteElement.querySelectorAll(".line-wrapper > *"), { y: 100, opacity: 0 });
        gsap.to(marksElement, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", scrollTrigger: { trigger: ".testimonial_quote-layout", start: "top 77%", once: true } });
        gsap.to(quoteElement.querySelectorAll(".line-wrapper > *"), { y: 0, opacity: 1, ease: "expo.out", duration: 1, stagger: 0.07, scrollTrigger: { trigger: ".testimonial_quote-layout", start: "top 80%", once: true } });
      }

      gsap.set(".testimonial_photo", { opacity: 0 });
      gsap.to(".testimonial_photo", { opacity: 1, duration: 1, scrollTrigger: { trigger: ".testimonial_info-layout", start: "top 80%", once: true } });
      gsap.set([nameElement, roleElement], { opacity: 0 });
      gsap.to(nameElement, { opacity: 1, scrambleText: { text: nameElement?.textContent?.trim() ?? "", chars: "10", speed: 0.2 }, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".testimonial_info-layout", start: "top 80%", once: true } });
      gsap.to(roleElement, { opacity: 1, scrambleText: { text: roleElement?.textContent?.trim() ?? "", chars: "10", speed: 0.2 }, duration: 1.6, ease: "expo.out", delay: 0.2, scrollTrigger: { trigger: ".testimonial_info-layout", start: "top 80%", once: true } });
      gsap.set(".testimonial_nav-wrapper", { y: 50, opacity: 0 });
      gsap.to(".testimonial_nav-wrapper", { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ".testimonial_nav-component", start: "top 90%", once: true } });

      const switchTo = (index: number) => {
        if (currentIndexRef.current === index || !quoteElement) return;
        currentIndexRef.current = index;
        const { quote, name, role, image } = testimonials[index];
        const split = wrapLines(quoteElement);
        gsap.to([marksElement, split.lines[0]], { y: 100, opacity: 0, duration: 0.6, ease: "expo.in" });
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
            gsap.to([marksElement, newSplit.lines[0]], { y: 0, opacity: 1, ease: "expo.out", duration: 1 });
            gsap.to(newSplit.lines, { y: 0, opacity: 1, ease: "expo.out", duration: 1, stagger: 0.07, delay: 0.1 });
          },
        });
        el.querySelectorAll(".testimonial_nav-wrapper").forEach((nav, i) => {
          gsap.to(nav, { opacity: i === index ? 1 : 0.5, duration: 0.3, ease: "power2.out" });
        });
      };

      el.querySelectorAll(".testimonial_nav-wrapper").forEach((nav, index) => {
        nav.addEventListener("click", (event) => {
          event.preventDefault();
          switchTo(index);
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-[2]" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="grid grid-cols-1">
            <div
              header-animation-type="container"
              className="grid auto-cols-fr grid-cols-[auto_auto] justify-between gap-0 border-b border-l border-white-20 pl-4 max-[991px]:grid-cols-1 max-[991px]:place-items-start"
            >
              <div className="pt-[7rem] pb-[1.5rem] pr-[1.5rem] max-[991px]:pt-[5rem]">
                <div className="flex justify-start">
                  <h2 id="testimonial-h1" className="heading-style-h0">
                    Words From
                  </h2>
                </div>
                <div className="flex items-stretch justify-start -mt-2 pl-[7.3vw] min-[1280px]:pl-24 max-[991px]:pl-[10.7vw] max-[767px]:-mt-[0.2rem] max-[767px]:pl-0">
                  <div id="testimonial-h2" className="heading-style-h0">
                    collaborators
                  </div>
                </div>
              </div>
              <LogosElement caption="CLI_TES_104" />
            </div>
            <div className="relative z-[2] grid grid-cols-1 items-stretch">
              <div className="flex justify-end border-b border-l border-r border-white-20 px-[7.3vw] py-20 min-[1280px]:pl-0 min-[1280px]:pr-[6.88rem] max-[767px]:px-6 max-[767px]:py-8">
                <div className="testimonial_quote-layout flex w-full max-w-[54.3125rem] flex-col gap-10 max-[991px]:gap-6">
                  <div className="relative pl-[0.7rem] text-color-secondary max-[991px]:pl-[0.6rem] max-[479px]:-ml-2 max-[479px]:pl-2">
                    <div className="absolute left-0 top-0 overflow-hidden">
                      <div id="testimonial-marks" className="heading-style-h5 is-testimonial">
                        &ldquo;
                      </div>
                    </div>
                    <div id="testimonial-quote" className="heading-style-h5 is-testimonial">
                      {testimonials[0].quote}
                    </div>
                  </div>
                  <div className="testimonial_info-layout flex items-center justify-start gap-4 pl-[0.8rem] max-[767px]:pl-[0.6rem] max-[479px]:pl-0">
                    <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-full max-[767px]:h-10 max-[767px]:w-10">
                      <img src={testimonials[0].image} loading="lazy" alt="" className="testimonial_photo h-full w-full" />
                    </div>
                    <div className="testimonial_info-wrapper">
                      <div className="testimonial_name">
                        <div id="testimonial-name" className="text-size-medium text-weight-medium">
                          {testimonials[0].name}
                        </div>
                      </div>
                      <div className="testimonial_role">
                        <div id="testimonial-role" className="text-size-medium text-color-secondary">
                          {testimonials[0].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial_nav-component no-scrollbar hidden max-[991px]:overflow-auto max-[991px]:rounded-r max-[991px]:border-r max-[991px]:border-white-20">
                {testimonials.map((item, i) => (
                  <a key={i} data-audio="https://bjornflow-assets.b-cdn.net/Audio/secondary%20hover%20sound.wav" href="#" className={`testimonial_nav-wrapper flex aspect-[1.3] items-center justify-center border border-white-20 bg-[#efefe600] backdrop-blur-[100px] transition-all duration-200 max-[991px]:min-h-28 max-[767px]:min-h-24 max-[479px]:min-h-[30vw] ${i === 0 ? "rounded-l is-first is-active" : i === testimonials.length - 1 ? "rounded-r is-last" : ""} w-inline-block`}>
                    <img src={item.logo} loading="lazy" alt="" className="testimonial_nav-logo h-full max-h-[2.2rem] min-[1440px]:max-h-10 max-[991px]:max-h-[1.7rem] max-[479px]:max-h-[8vw]" />
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
