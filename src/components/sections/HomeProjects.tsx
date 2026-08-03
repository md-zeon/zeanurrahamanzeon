"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { featuredProjects } from "@/data/home";
import AutoVideo from "../media/AutoVideo";

export default function HomeProjects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const projects = gsap.utils.toArray<HTMLElement>(".home-projects_project");
      const heading = el.querySelector(".home-projects_banner-component .heading-style-h3");
      const text = el.querySelector(".home-projects_banner-component .text-size-regular");
      const buttons = el.querySelectorAll(".home-projects_banner-component .btn:not(.btn-secondary)");
      const navButtons = el.querySelectorAll(".home-projects_nav-wrapper");
      const track = el.querySelector(".home-projects_track");
      const section = el;

      gsap.set(projects, { transformStyle: "preserve-3d", transformPerspective: 800 });
      gsap.set(projects.filter((p) => p.classList.contains("middle")), {
        transformOrigin: "center top",
        y: window.innerHeight,
        rotationX: 40,
        scale: 1.1,
      });
      gsap.set([track, section, document.querySelector('[data-projects-section="second"]')], { backgroundColor: "#0A090F" });
      gsap.set(el.querySelector(".home-projects_project.first"), { transformOrigin: "center top", yPercent: 20, opacity: 0 });

      ScrollTrigger.create({
        trigger: el.querySelector(".home-projects_project.first"),
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el.querySelector(".home-projects_project.first"), { yPercent: 0, opacity: 1, ease: "expo.out", duration: 0.6 });
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "projectsScroll",
          trigger: ".home-projects_track",
          pin: el,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pinSpacing: true,
          onEnter: () => {
            gsap.to([track, section, document.querySelector('[data-projects-section="second"]')], { backgroundColor: "#5542ff", ease: "expo.out", duration: 1 });
          },
          onLeave: () => {
            gsap.to([track, section, document.querySelector('[data-projects-section="second"]')], { backgroundColor: "#0A090F", ease: "expo.out", duration: 1 });
          },
          onEnterBack: () => {
            gsap.to([track, section, document.querySelector('[data-projects-section="second"]')], { backgroundColor: "#5542ff", ease: "expo.out", duration: 1 });
          },
          onLeaveBack: () => {
            gsap.to([track, section, document.querySelector('[data-projects-section="second"]')], { backgroundColor: "#0A090F", ease: "expo.out", duration: 1 });
          },
        },
      });

      timeline
        .to(".home-projects_project.first", { rotationX: -40, y: -6, ease: "expo.in", scale: 0.7 })
        .to(".home-projects_project.middle", { scale: 1, ease: "expo.out", y: (i: number) => 2 * i, rotationX: 0, stagger: { each: 0.5 } }, "-=0.4")
        .to(
          ".home-projects_project.middle",
          {
            rotationX: -40,
            y: (i: number) => 20 * i,
            ease: "expo.in",
            scale: (i: number) => gsap.utils.mapRange(0, projects.length - 1, 0.75, 1)(i),
            stagger: { each: 0.5 },
          },
          "<+=0.5"
        );

      let lastActiveIndex = -1;
      const updateActiveProject = () => {
        const st = ScrollTrigger.getById("projectsScroll");
        if (!st || !projects.length) return;
        const progress = st.progress;
        const activeIndex = Math.min(projects.length - 1, Math.round(progress * projects.length));
        if (activeIndex !== lastActiveIndex && featuredProjects[activeIndex]) {
          lastActiveIndex = activeIndex;
          gsap.to(heading, { duration: 1.2, scrambleText: { text: featuredProjects[activeIndex].title, chars: "10", speed: 0.2 }, ease: "expo.out" });
          gsap.to(text, { duration: 1.2, scrambleText: { text: featuredProjects[activeIndex].description, chars: "10", speed: 0.2 }, ease: "expo.out" });
          buttons.forEach((button) => {
            (button as HTMLAnchorElement).setAttribute("href", featuredProjects[activeIndex].link);
          });
          navButtons.forEach((b, index) => {
            gsap.to(b, { duration: 0.05, ease: "expo.out", marginLeft: index === activeIndex ? "-0.7rem" : "0rem", opacity: index === activeIndex ? 1 : 0.9 });
            const imgWrap = b.querySelector(".home-projects_nav-image-wrapper");
            if (imgWrap) gsap.to(imgWrap, { duration: 0.05, ease: "expo.out", borderColor: index === activeIndex ? "#EFEFE6" : "transparent" });
          });
        }
      };

      const bannerFade = (state: "in" | "out") => {
        gsap.to(".home-projects_banner-component", {
          opacity: state === "in" ? 1 : 0,
          yPercent: state === "in" ? 0 : 20,
          ease: state === "in" ? "expo.out" : "expo.in",
          duration: 0.3,
        });
      };
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=280%",
        scrub: 1,
        onUpdate: () => {
          const st = ScrollTrigger.getById("projectsScroll");
          if (st) updateActiveProject();
        },
        onEnter: () => bannerFade("in"),
        onLeave: () => bannerFade("out"),
        onEnterBack: () => bannerFade("in"),
        onLeaveBack: () => bannerFade("out"),
      });

      gsap.set(".home-projects_banner-component", { opacity: 0, yPercent: 20 });
      gsap.set(navButtons, { x: "100%", opacity: 0, visibility: "hidden" });
      gsap.fromTo(navButtons, { x: "100%", opacity: 0, visibility: "hidden" }, { x: "0%", opacity: 0.9, visibility: "visible", stagger: 0.05, ease: "expo.out", duration: 0.4, scrollTrigger: { trigger: el, start: "top 60%", once: true }, onComplete: () => gsap.to(navButtons[0], { opacity: 1 }) });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    const pinSpacer = document.querySelector<HTMLElement>(".pin-spacer-projectsScroll");
    if (!pinSpacer) return;
    let projectHeight = window.innerHeight * 0.7;
    if (index >= 2) {
      projectHeight -= window.innerHeight * 0.01;
    }
    const targetScrollY = pinSpacer.offsetTop + index * projectHeight;
    gsap.to(window, { duration: 1.5, scrollTo: targetScrollY, ease: "expo.out" });
  };

  return (
    <section className="relative z-[2] min-h-[100vh] max-h-[100vh] w-full overflow-hidden" ref={ref}>
      <div className="home-projects_track relative h-[600vh] w-full overflow-hidden">
        <div className="relative grid h-full w-full max-h-[100vh] auto-cols-fr grid-cols-1 grid-rows-1 content-start items-center justify-center justify-items-center gap-0 py-8 [transform-style:preserve-3d] max-[767px]:pb-32">
          {featuredProjects.map((project, i) => (
            <div key={project.index} data-index={i + 1} className={`home-projects_project ${i === 0 ? "first" : "middle"} relative z-[2] flex h-[54vw] w-[90%] [grid-area:1/1/2/2] [transform-origin:50%_0] [transform-style:preserve-3d] min-[1280px]:h-full min-[1280px]:[transform:perspective(100vh)]`}>
              <div className="absolute left-[-2.7rem] top-1/2 [transform:rotate(-90deg)_translateY(-50%)] max-[767px]:left-[-2.3rem] max-[479px]:left-[-2rem]">
                <div className="text-caption-2">PROJECT_{project.index}</div>
              </div>
              <div className="relative inset-0 z-[2] aspect-[16/9.5] h-full w-full max-h-[93.5vh] overflow-hidden rounded-lg max-[767px]:rounded w-embed">
                <AutoVideo src={project.video} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-[-7rem] z-[3] hidden -translate-y-1/2 flex-col items-stretch justify-end gap-2 min-[1280px]:flex min-[1440px]:right-[-6rem]">
        {featuredProjects.map((project, i) => (
          <a key={project.index} data-audio="https://bjornflow-assets.b-cdn.net/Audio/secondary%20hover%20sound.wav" data-project={i + 1} href="#" className={`home-projects_nav-wrapper is-${i + 1} w-inline-block flex flex-col items-start justify-start gap-1 text-brand-white no-underline`} onClick={(e) => handleNavClick(e, i)}>
            <div className="text-caption-2">[0{i + 1}]</div>
            <div className="home-projects_nav-image-wrapper h-[6.25rem] w-[8.85rem] overflow-hidden rounded min-[1280px]:border min-[1280px]:border-transparent">
              <div className="h-full w-full object-cover w-embed">
                <AutoVideo src={project.navVideo} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="home-projects_banner-component absolute bottom-8 left-8 z-[3] flex w-full max-w-[25rem] flex-col gap-4 rounded border border-white-20 bg-[#0a090e4d] p-6 shadow-[inset_0_0_0_1000px_#0a090e33] backdrop-blur-[100px] max-[767px]:bottom-16 max-[767px]:gap-6 max-[767px]:p-4 max-[479px]:bottom-[12%] max-[479px]:left-[4%] max-[479px]:w-[90%]">
        <div className="flex-none">
          <div className="heading-style-h3 block max-w-full max-h-24 overflow-hidden whitespace-normal break-words min-[992px]:max-h-16">Plus X Innovation</div>
          <div className="text-size-regular block max-w-full max-h-24 overflow-hidden whitespace-normal break-words min-[992px]:max-h-16">Helped the marketing team migrate to Webflow, optimise SEO, and scale their site with a flexible CMS.</div>
        </div>
        <div className="btn-group">
          <a href="#" className="btn btn-small">
            <div className="btn__text">View case study</div>
          </a>
          <Link href="/work" className="btn btn-secondary btn-small">
            <div className="btn__text">See all work</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
