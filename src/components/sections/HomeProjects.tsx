"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { featuredProjects } from "@/data/home";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

/**
 * Home page "featured projects" pinned 3D carousel.
 *
 * While the section is pinned, the project cards tilt back and forth on the
 * X axis (a "cards fan" effect), the track and background animate between
 * dark and brand colors, and a floating banner is scramble-text updated to
 * match whichever card is currently centered. The right-hand nav thumbnails
 * let the visitor jump straight to a specific card.
 */
export default function HomeProjects() {
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
      const text = el.querySelector(
        ".home-projects_banner-component .text-size-regular",
      );
      const buttons = el.querySelectorAll(
        ".home-projects_banner-component .btn:not(.btn-secondary)",
      );
      const navButtons = el.querySelectorAll(".home-projects_nav-wrapper");
      const track = el.querySelector(".home-projects_track");
      const section = el;

      // Project cards live in one grid cell, so they stack. `preserve-3d`
      // + a shared perspective makes the rotationX fan look dimensional.
      gsap.set(projects, {
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      });
      // The "middle" cards start below the viewport, rotated away.
      gsap.set(
        projects.filter((p) => p.classList.contains("middle")),
        {
          transformOrigin: "center top",
          y: window.innerHeight,
          rotationX: 40,
          scale: 1.1,
        },
      );
      // Pre-paint the (dark) background so there's no flash of white before
      // the first scrub tween fires.
      gsap.set(
        [
          track,
          section,
          document.querySelector('[data-projects-section="second"]'),
        ],
        { backgroundColor: "#0A090F" },
      );
      // First card is hidden until its scroll-in trigger.
      gsap.set(el.querySelector(".home-projects_project.first"), {
        transformOrigin: "center top",
        yPercent: 20,
        opacity: 0,
      });

      // Fade the first card up when the section scrolls into view.
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

      // The core pinned scroll. Pins the section for 300% of scroll; as you
      // scrub, cards fan from front to back. Background shifts to brand
      // purple while pinned and back when leaving.
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

      // Fan sequence: the current card tips away (back), the next cards
      // stand up, then they all tip forward again so the next one leads.
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

      // During scrubbing, derive which project is "active" from scroll
      // progress and update the banner (title/description via scramble,
      // button href, and the active nav thumbnail) whenever it changes.
      let lastActiveIndex = -1;
      const updateActiveProject = () => {
        const st = ScrollTrigger.getById("projectsScroll");
        if (!st || !projects.length) return;
        const progress = st.progress;
        const activeIndex = Math.min(
          projects.length - 1,
          Math.round(progress * projects.length),
        );
        if (activeIndex !== lastActiveIndex && featuredProjects[activeIndex]) {
          lastActiveIndex = activeIndex;
          gsap.to(heading, {
            duration: 1.2,
            scrambleText: {
              text: featuredProjects[activeIndex].title,
              chars: "10",
              speed: 0.2,
            },
            ease: "expo.out",
          });
          gsap.to(text, {
            duration: 1.2,
            scrambleText: {
              text: featuredProjects[activeIndex].description,
              chars: "10",
              speed: 0.2,
            },
            ease: "expo.out",
          });
          buttons.forEach((button) => {
            (button as HTMLAnchorElement).setAttribute(
              "href",
              featuredProjects[activeIndex].link,
            );
          });
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

      // Slide the floating banner in/out as the pinned section is entered
      // and left.
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
      // Nav thumbnails slide in from the right once, when scrolled to.
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

  // Jump to a specific project card from the nav thumbnails. The pinned
  // section lives inside ScrollTrigger's generated `.pin-spacer`, so we
  // compute the target scroll position from that spacer's offset plus an
  // estimated per-card distance.
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
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.5 });
    } else {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: targetScrollY,
        ease: "expo.out",
      });
    }
  };

  return (
    <section
      className="relative z-2 min-h-screen max-h-screen w-full overflow-hidden"
      ref={ref}
    >
      <div className="home-projects_track relative h-[600vh] w-full overflow-hidden">
        <div className="relative grid h-full w-full max-h-screen auto-cols-fr grid-cols-1 grid-rows-1 content-start items-center justify-center justify-items-center gap-0 py-8 transform-3d max-[767px]:pb-32">
          {featuredProjects.map((project, i) => (
            <div
              key={project.index}
              data-index={i + 1}
              className={`home-projects_project ${i === 0 ? "first" : "middle"} relative z-2 flex h-[54vw] w-[90%] [grid-area:1/1/2/2] origin-[50%_0] transform-3d desktop:h-full desktop:transform-[perspective(100vh)]`}
            >
              <div className="absolute left-[-2.7rem] top-1/2 transform-[rotate(-90deg)_translateY(-50%)] max-[767px]:left-[-2.3rem] max-[479px]:-left-8">
                <div className="text-caption-2">PROJECT_{project.index}</div>
              </div>
              <div className="relative inset-0 z-2 aspect-16/9.5 h-full w-full max-h-[93.5vh] overflow-hidden rounded-lg max-[767px]:rounded w-embed">
                <AutoVideo src={project.video} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-[-7rem] z-3 hidden -translate-y-1/2 flex-col items-stretch justify-end gap-2 desktop:flex wide:right-[-6rem]">
        {featuredProjects.map((project, i) => (
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
                <AutoVideo src={project.navVideo} />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="home-projects_banner-component absolute bottom-8 left-8 z-3 flex w-full max-w-fit flex-col gap-4 rounded border border-white-20 bg-black-30 p-6 shadow-[inset_0_0_0_1000px_#0a090e33] backdrop-blur-[100px] max-[767px]:bottom-16 max-[767px]:gap-6 max-[767px]:p-4 max-[479px]:bottom-[12%] max-[479px]:left-[4%] max-[479px]:w-[90%]">
        <div className="flex-none">
          <div className="heading-style-h3 block max-w-full max-h-24 overflow-hidden whitespace-normal wrap-break-word min-[992px]:max-h-16">
            Smart NUB Campus
          </div>
          <div className="text-size-regular block max-w-100 max-h-24 overflow-hidden whitespace-normal wrap-break-word min-[992px]:max-h-16">
            A real-time academic collaboration network — messaging, study
            groups, gamified learning, and an AI assistant for campus life.
          </div>
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
