"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { experimentsStack } from "@/data/experiments";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

/** Arrow glyph used in the banner's "View project" button. */
function ArrowIcon() {
  return (
    <div className="btn__icon w-embed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 14 14"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        <path
          d="M0.823227 13.4736L12.8232 1.47362M12.8232 1.47362V11.3272M12.8232 1.47362H3.17677"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * Full-screen pinned 3D carousel of experiment projects. The stacked
 * projects tilt/flip forward one by one as the user scrolls (GSAP timeline
 * scrubbed over a pinned 300% scroll distance), while a side nav of video
 * thumbnails lets users jump straight to a project. The banner's title
 * scrambles between the active project's title and its link follows along.
 */
export default function ExperimentsProjects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cleanups: Array<() => void> = [];
      const projects = gsap.utils.toArray<HTMLElement>(
        ".home-projects_project",
      );
      const heading = el.querySelector(
        ".home-projects_banner-component .heading-style-h3",
      );
      const button = el.querySelector(".home-projects_banner-component .btn");
      const navButtons = el.querySelectorAll(".home-projects_nav-wrapper");
      const track = el.querySelector(".home-projects_track");
      const section = el;

      // Stack every project in 3D space; the middle ones start "behind" the
      // first (tilted back), the first starts slightly below and faded out.
      gsap.set(projects, {
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      });
      gsap.set(
        projects.filter((p) => p.classList.contains("middle")),
        {
          transformOrigin: "center top",
          y: window.innerHeight,
          rotationX: 40,
          scale: 1.1,
        },
      );
      // Keep the dark backdrop behind the whole pinned section (the section
      // and experiments grid below it share the same bg).
      gsap.set(
        [
          track,
          section,
          document.querySelector('[data-projects-section="second"]'),
        ],
        { backgroundColor: "#0A090F" },
      );
      gsap.set(el.querySelector(".home-projects_project.first"), {
        transformOrigin: "center top",
        yPercent: 20,
        opacity: 0,
      });

      // Fade the first project in once it enters the viewport.
      ScrollTrigger.create({
        trigger: el.querySelector(".home-projects_project.first"),
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el.querySelector(".home-projects_project.first"), {
            yPercent: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 0.6,
          });
        },
      });

      // Pin the section and drive the flip sequence with scroll progress.
      // Background flips to the brand purple while pinned, back to dark on
      // leave.
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
            gsap.to(
              [
                track,
                section,
                document.querySelector('[data-projects-section="second"]'),
              ],
              { backgroundColor: "#5542ff", ease: "expo.out", duration: 1 },
            );
          },
          onLeave: () => {
            gsap.to(
              [
                track,
                section,
                document.querySelector('[data-projects-section="second"]'),
              ],
              { backgroundColor: "#0A090F", ease: "expo.out", duration: 1 },
            );
          },
          onEnterBack: () => {
            gsap.to(
              [
                track,
                section,
                document.querySelector('[data-projects-section="second"]'),
              ],
              { backgroundColor: "#5542ff", ease: "expo.out", duration: 1 },
            );
          },
          onLeaveBack: () => {
            gsap.to(
              [
                track,
                section,
                document.querySelector('[data-projects-section="second"]'),
              ],
              { backgroundColor: "#0A090F", ease: "expo.out", duration: 1 },
            );
          },
        },
      });

      // Flip the front card down/away, then bring the next cards up into
      // place one at a time (staggered), then tilt the set back for the next
      // iteration.
      timeline
        .to(".home-projects_project.first", {
          rotationX: -40,
          y: -6,
          ease: "expo.in",
          scale: 0.7,
        })
        .to(
          ".home-projects_project.middle",
          {
            scale: 1,
            ease: "expo.out",
            y: (i: number) => 2 * i,
            rotationX: 0,
            stagger: { each: 0.5 },
          },
          "-=0.4",
        )
        .to(
          ".home-projects_project.middle",
          {
            rotationX: -40,
            y: (i: number) => 20 * i,
            ease: "expo.in",
            scale: (i: number) =>
              gsap.utils.mapRange(0, projects.length - 1, 0.75, 1)(i),
            stagger: { each: 0.5 },
          },
          "<+=0.5",
        );

      // Keep banner title, CTA href, and the side nav highlight in sync with
      // whichever project is front-and-center during the scrub.
      let lastActiveIndex = -1;
      const updateActiveProject = () => {
        const st = ScrollTrigger.getById("projectsScroll");
        if (!st || !projects.length) return;
        const progress = st.progress;
        const activeIndex = Math.min(
          projects.length - 1,
          Math.round(progress * projects.length),
        );
        if (activeIndex !== lastActiveIndex && experimentsStack[activeIndex]) {
          lastActiveIndex = activeIndex;
          gsap.to(heading, {
            duration: 1.2,
            scrambleText: {
              text: experimentsStack[activeIndex].title,
              chars: "10",
              speed: 0.2,
            },
            ease: "expo.out",
          });
          if (button)
            button.setAttribute("href", experimentsStack[activeIndex].href);
          navButtons.forEach((b, index) => {
            gsap.to(b, {
              duration: 0.05,
              ease: "expo.out",
              marginLeft: index === activeIndex ? "-0.7rem" : "0rem",
              opacity: index === activeIndex ? 1 : 0.9,
            });
            const imgWrap = b.querySelector(".home-projects_nav-image-wrapper");
            if (imgWrap)
              gsap.to(imgWrap, {
                duration: 0.05,
                ease: "expo.out",
                borderColor: index === activeIndex ? "#EFEFE6" : "transparent",
              });
          });
        }
      };

      const bannerTrigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=280%",
        scrub: 1,
        onUpdate: () => {
          const st = ScrollTrigger.getById("projectsScroll");
          if (st) updateActiveProject();
        },
      });

      // Banner and side nav slide/fade in once the section scrolls in.
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
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
          onComplete: () => gsap.to(navButtons[0], { opacity: 1 }),
        },
      );

      // Banner visibility follows the pinned phase (in while pinned, out
      // when the section is fully scrolled past).
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

      // Hover feedback on the thumbnails: brighten the border and indent the
      // thumbnail, restoring the scroll-driven active state on leave.
      navButtons.forEach((b, index) => {
        const imgWrap = b.querySelector(".home-projects_nav-image-wrapper");
        const isActive = () => index === Math.max(0, lastActiveIndex);
        const onEnter = () => {
          gsap.to(b, {
            marginLeft: isActive() ? "-0.7rem" : "-0.35rem",
            opacity: 1,
            duration: 0.25,
            ease: "expo.out",
          });
          if (imgWrap)
            gsap.to(imgWrap, { borderColor: "#EFEFE6", duration: 0.25 });
        };
        const onLeave = () => {
          gsap.to(b, {
            marginLeft: isActive() ? "-0.7rem" : "0rem",
            opacity: isActive() ? 1 : 0.9,
            duration: 0.25,
            ease: "expo.out",
          });
          if (imgWrap)
            gsap.to(imgWrap, {
              borderColor: isActive() ? "#EFEFE6" : "transparent",
              duration: 0.25,
            });
        };
        b.addEventListener("mouseenter", onEnter);
        b.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          b.removeEventListener("mouseenter", onEnter);
          b.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, el);

    return () => ctx.revert();
  }, []);

  // Jump-scroll to a specific project's position within the pinned scrub.
  // Approximates each project's scroll offset by its index within the pin.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pinSpacer = document.querySelector<HTMLElement>(
      ".pin-spacer-projectsScroll",
    );
    if (!pinSpacer) return;
    let projectHeight = window.innerHeight * 0.7;
    if (index >= 2) {
      projectHeight -= window.innerHeight * 0.01;
    }
    const targetScrollY = pinSpacer.offsetTop + index * projectHeight;
    gsap.to(window, {
      duration: 1.5,
      scrollTo: targetScrollY,
      ease: "expo.out",
    });
  };

  return (
    <section
      header-content-type="border"
      className="relative z-2 min-h-screen max-h-screen w-full overflow-hidden"
      ref={ref}
    >
      <div className="home-projects_track relative h-[600vh] w-full overflow-hidden">
        {/* Stacked project frames, all occupying the same grid cell */}
        <div className="relative grid h-full w-full max-h-screen auto-cols-fr grid-cols-1 grid-rows-1 content-start items-center justify-center justify-items-center gap-0 py-8 transform-3d max-[767px]:pb-32">
          {experimentsStack.map((project, i) => (
            <div
              key={project.index}
              data-index={i + 1}
              className={`home-projects_project ${i === 0 ? "first" : "middle"} relative z-2 flex h-[54vw] w-[90%] [grid-area:1/1/2/2] origin-[50%_0] transform-3d desktop:h-full desktop:transform-[perspective(100vh)]`}
            >
              {/* Vertical index label on the left edge */}
              <div className="absolute left-[-2.7rem] top-1/2 transform-[rotate(-90deg)_translateY(-50%)] max-[767px]:left-[-2.3rem] max-[479px]:-left-8">
                <div className="text-caption-2">{project.index}</div>
              </div>
              {/* Project video, fill the frame */}
              <div className="relative inset-0 z-2 aspect-16/9.5 h-full w-full max-h-[93.5vh] overflow-hidden rounded-lg max-[767px]:rounded w-embed">
                <AutoVideo src={project.video} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side nav: video thumbnails to jump to each project (desktop only) */}
      <div className="absolute top-1/2 right-[-7rem] z-3 hidden -translate-y-1/2 flex-col items-stretch justify-end gap-2 desktop:flex wide:right-[-6rem]">
        {experimentsStack.map((project, i) => (
          <a
            key={project.index}
            data-audio={audio.secondaryHover}
            data-project={i + 1}
            href="#"
            className={`home-projects_nav-wrapper is-${i + 1} w-inline-block flex flex-col items-start justify-start gap-1 text-brand-white no-underline`}
            onClick={(e) => handleNavClick(e, i)}
          >
            <div className="text-caption-2">[0{i + 1}]</div>
            <div className="home-projects_nav-image-wrapper h-25 w-[8.85rem] overflow-hidden rounded desktop:border desktop:border-transparent">
              <div className="h-full w-full object-cover w-embed">
                <AutoVideo src={project.video} />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Floating banner: current project title (scrambles on change) + CTA */}
      <div className="home-projects_banner-component is-experiments absolute bottom-8 left-8 z-3 flex w-full max-w-[16rem] max-h-40 flex-col gap-4 rounded border border-white-20 bg-black-30 p-6 shadow-[inset_0_0_0_1000px_#0a090e33] backdrop-blur-[100px] max-[767px]:bottom-16 max-[767px]:gap-6 max-[767px]:p-4 max-[479px]:bottom-[12%] max-[479px]:left-[4%] max-[479px]:w-[90%]">
        <div className="flex-none">
          <div className="heading-style-h3 block max-w-full max-h-24 overflow-hidden whitespace-normal wrap-break-word min-[992px]:max-h-16">
            {experimentsStack[0].title}
          </div>
        </div>
        <div className="btn-group">
          <a
            data-audio={audio.hover}
            href={experimentsStack[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-small btn-icon"
          >
            <div className="btn__text">View project</div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
