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
    <section className="section_testimonials" ref={ref}>
      <div className="padding-global is-bigger">
        <div className="container-large">
          <div className="testimonials_component">
            <div header-animation-type="container" className="testimonial_header">
              <div className="testimonial_header-wrapper">
                <div className="testimonial_header-top">
                  <h2 id="testimonial-h1" className="heading-style-h0">
                    Words From
                  </h2>
                </div>
                <div className="testimonial_header-bottom">
                  <div id="testimonial-h2" className="heading-style-h0">
                    collaborators
                  </div>
                </div>
              </div>
              <LogosElement caption="CLI_TES_104" />
            </div>
            <div className="testimonial_layout">
              <div className="testimonial_quote-component">
                <div className="testimonial_quote-layout">
                  <div className="testimonial_quote-wrapper">
                    <div className="testimonial_mark">
                      <div id="testimonial-marks" className="heading-style-h5 is-testimonial">
                        &ldquo;
                      </div>
                    </div>
                    <div id="testimonial-quote" className="heading-style-h5 is-testimonial">
                      {testimonials[0].quote}
                    </div>
                  </div>
                  <div className="testimonial_info-layout">
                    <div className="testimonial_photo-wrapper">
                      <img src={testimonials[0].image} loading="lazy" alt="" className="testimonial_photo" />
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
              <div className="testimonial_nav-component no-scrollbar">
                {testimonials.map((item, i) => (
                  <a key={i} data-audio="https://bjornflow-assets.b-cdn.net/Audio/secondary%20hover%20sound.wav" href="#" className={`testimonial_nav-wrapper ${i === 0 ? "is-first is-active" : i === testimonials.length - 1 ? "is-last" : ""} w-inline-block`}>
                    <img src={item.logo} loading="lazy" alt="" className="testimonial_nav-logo" />
                  </a>
                ))}
              </div>
            </div>
            <div className="testimonial_bottom" />
          </div>
        </div>
      </div>
    </section>
  );
}
