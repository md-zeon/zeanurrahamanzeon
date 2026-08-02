"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { experimentsStack } from "@/data/experiments";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

function ArrowIcon() {
  return (
    <div className="button-icon w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
        <path d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677" stroke="currentColor" />
      </svg>
    </div>
  );
}

export default function ExperimentsProjects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const projects = gsap.utils.toArray<HTMLElement>(".home-projects_project");
      const heading = el.querySelector(".home-projects_banner-component .heading-style-h3");
      const button = el.querySelector(".home-projects_banner-component .button");
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
          pin: ".section_home-projects",
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
        if (activeIndex !== lastActiveIndex && experimentsStack[activeIndex]) {
          lastActiveIndex = activeIndex;
          gsap.to(heading, { duration: 1.2, scrambleText: { text: experimentsStack[activeIndex].title, chars: "10", speed: 0.2 }, ease: "expo.out" });
          if (button) button.setAttribute("href", experimentsStack[activeIndex].href);
          navButtons.forEach((b, index) => {
            gsap.to(b, { duration: 0.05, ease: "expo.out", marginLeft: index === activeIndex ? "-0.7rem" : "0rem", opacity: index === activeIndex ? 1 : 0.9 });
            const imgWrap = b.querySelector(".home-projects_nav-image-wrapper");
            if (imgWrap) gsap.to(imgWrap, { duration: 0.05, ease: "expo.out", borderColor: index === activeIndex ? "#EFEFE6" : "transparent" });
          });
        }
      };

      const bannerTrigger = ScrollTrigger.create({
        trigger: ".section_home-projects",
        start: "top top",
        end: "+=280%",
        scrub: 1,
        onUpdate: () => {
          const st = ScrollTrigger.getById("projectsScroll");
          if (st) updateActiveProject();
        },
      });

      gsap.set(".home-projects_banner-component", { opacity: 0, yPercent: 20 });
      gsap.set(navButtons, { x: "100%", opacity: 0, visibility: "hidden" });
      gsap.fromTo(
        navButtons,
        { x: "100%", opacity: 0, visibility: "hidden" },
        {
          x: "0%",
          opacity: 0.9,
          visibility: "visible",
          stagger: 0.05,
          ease: "expo.out",
          duration: 0.4,
          scrollTrigger: { trigger: ".section_home-projects", start: "top 60%", once: true },
          onComplete: () => gsap.to(navButtons[0], { opacity: 1 }),
        }
      );

      const bannerFade = (state: "in" | "out") => {
        gsap.to(".home-projects_banner-component", {
          opacity: state === "in" ? 1 : 0,
          yPercent: state === "in" ? 0 : 20,
          ease: state === "in" ? "expo.out" : "expo.in",
          duration: 0.3,
        });
      };
      bannerTrigger.vars.onEnter = () => bannerFade("in");
      bannerTrigger.vars.onLeave = () => bannerFade("out");
      bannerTrigger.vars.onEnterBack = () => bannerFade("in");
      bannerTrigger.vars.onLeaveBack = () => bannerFade("out");
    }, el);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    const projectHeight = window.innerHeight * 0.7;
    window.scrollTo({ top: el.offsetTop + index * projectHeight, behavior: "smooth" });
  };

  return (
    <section header-content-type="border" className="section_home-projects" ref={ref}>
      <div className="home-projects_track">
        <div className="home-projects_layout">
          {experimentsStack.map((project, i) => (
            <div key={project.index} data-index={i + 1} className={`home-projects_project ${i === 0 ? "first" : "middle"}`}>
              <div className="home-projects_text-wrapper">
                <div className="text-caption-2">{project.index}</div>
              </div>
              <div className="home-projects_video w-embed">
                <AutoVideo src={project.video} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-projects_nav-component">
        {experimentsStack.map((project, i) => (
          <a key={project.index} data-audio={audio.secondaryHover} data-project={i + 1} href="#" className={`home-projects_nav-wrapper is-${i + 1} w-inline-block`} onClick={(e) => handleNavClick(e, i)}>
            <div className="text-caption-2">[0{i + 1}]</div>
            <div className="home-projects_nav-image-wrapper">
              <div className="home-projects_nav-image w-embed">
                <AutoVideo src={project.video} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="home-projects_banner-component is-experiments">
        <div className="home-projects_banner-header">
          <div className="heading-style-h3">{experimentsStack[0].title}</div>
        </div>
        <div className="button-group">
          <a data-audio={audio.hover} href={experimentsStack[0].href} target="_blank" rel="noopener noreferrer" className="button is-icon is-small w-inline-block">
            <div className="button-text">View clonable</div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
