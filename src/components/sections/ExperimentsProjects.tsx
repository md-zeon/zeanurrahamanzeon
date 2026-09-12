"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { experimentsStack, experimentsHeader } from "@/data/experiments";
import { audio } from "@/data/site";
import AutoVideo from "../media/AutoVideo";

/**
 * The experiment "card": a looped video box plus a rotated index label.
 * Shared by the desktop pinned fan and the mobile stacked list so the media
 * markup is defined once.
 */
function ExperimentMedia({
  index,
  video,
  title,
}: {
  index: string;
  video: string;
  title: string;
}) {
  return (
    <>
      <div className="absolute left-[-2.7rem] top-1/2 transform-[rotate(-90deg)_translateY(-50%)] max-[767px]:left-[-2.3rem] max-[479px]:-left-8">
        <div className="text-caption-2">{index}</div>
      </div>
      <div className="relative inset-0 z-2 aspect-16/9.5 h-full w-full max-h-[93.5vh] overflow-hidden rounded-lg max-[767px]:rounded w-embed">
        <AutoVideo src={video} label={title} />
      </div>
    </>
  );
}

/**
 * Experiments page: full-screen pinned 3D carousel of side projects.
 *
 * Desktop/tablet (≥768px): the stacked projects tilt/flip forward one by one
 * as the user scrolls (GSAP timeline scrubbed over a pinned 400% scroll
 * distance), while a side nav of video thumbnails lets users jump straight to
 * a project. The banner's title scrambles between the active project's title
 * and its link follows along.
 *
 * Mobile (≤767px): per GSAP's guidance the pinned fan is dropped entirely and
 * the projects become an ordinary vertical list — nothing is hidden behind a
 * swipe/carousel and the phone keeps its native vertical scroll. Only the
 * card currently on screen decodes its video (AutoVideo pauses off-screen via
 * its IO observer), so a phone never runs more than one project at a time.
 */
export default function ExperimentsProjects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cleanups: Array<() => void> = [];
        const projects = gsap.utils.toArray<HTMLElement>(
          ".home-projects_project",
        );
        const heading = el.querySelector(
          ".home-projects_banner-component .heading-style-h3",
        );
        const description = el.querySelector(
          ".home-projects_banner-component .text-size-regular",
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
        // Four viewports of scroll (a full viewport per project) so the last
        // card settles before the pin releases. Background flips to the brand
        // purple while pinned, back to dark on leave.
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "projectsScroll",
            trigger: ".home-projects_track",
            pin: el,
            start: "top top",
            end: "+=400%",
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
            if (description)
              gsap.to(description, {
                duration: 1.2,
                scrambleText: {
                  text: experimentsStack[activeIndex].description ?? "",
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
              const imgWrap = b.querySelector(
                ".home-projects_nav-image-wrapper",
              );
              if (imgWrap)
                gsap.to(imgWrap, {
                  duration: 0.05,
                  ease: "expo.out",
                  borderColor:
                    index === activeIndex ? "#EFEFE6" : "transparent",
                });
            });
          }
        };

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

        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=400%",
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

        // Banner and side nav slide/fade in once the section scrolls in.
        gsap.set(".home-projects_banner-component", {
          opacity: 0,
          yPercent: 20,
        });
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
    });

    mm.add("(max-width: 767px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".home-projects_mobile");
        // Gentle stagger reveal as the stacked cards scroll into view — light
        // so it never fights native mobile scrolling.
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
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
    const totalScroll = window.innerHeight * 4;
    const projectHeight = totalScroll / experimentsStack.length;
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
      header-content-type="border"
      className="relative z-2 w-full overflow-hidden min-h-screen max-h-screen max-[767px]:min-h-0 max-[767px]:max-h-none"
      ref={ref}
    >
      {/* Desktop/tablet: pinned 3D fan. Hidden on mobile. */}
      <div className="home-projects_track relative h-[600vh] w-full overflow-hidden max-[767px]:hidden">
        {/* Stacked project frames, all occupying the same grid cell */}
        <div className="relative grid h-full w-full max-h-screen auto-cols-fr grid-cols-1 grid-rows-1 content-start items-center justify-center justify-items-center gap-0 py-8 transform-3d max-[767px]:pb-32">
          {experimentsStack.map((project, i) => (
            <div
              key={project.index}
              data-index={i + 1}
              className={`home-projects_project ${i === 0 ? "first" : "middle"} relative z-2 flex h-[54vw] w-[90%] [grid-area:1/1/2/2] origin-[50%_0] transform-3d desktop:h-full desktop:transform-[perspective(100vh)]`}
            >
              <ExperimentMedia
                index={project.index}
                video={project.video}
                title={project.title}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: experiments as a normal vertical list. No pin, no swipe —
          just scroll. Each card carries its own title/description and a link
          to the project, so nothing important is hidden. */}
      <div className="hidden px-6 py-20 max-[767px]:flex max-[767px]:flex-col max-[767px]:gap-16">
        {experimentsStack.map((project, i) => (
          <article
            key={project.index}
            className="home-projects_mobile flex flex-col gap-6"
          >
            <div className="relative z-2 flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded">
              <ExperimentMedia
                index={project.index}
                video={project.video}
                title={project.title}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="heading-style-h3">{project.title}</h3>
                <div className="text-caption-2 text-color-teritary">
                  0{i + 1}
                </div>
              </div>
              <p className="text-size-regular text-color-teritary">
                {project.description}
              </p>
              <div>
                <a
                  href={project.href}
                  data-audio={audio.hover}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-small"
                >
                  <div className="btn__text">
                    {experimentsHeader.viewProjectLabel ?? "View project"}
                  </div>
                </a>
              </div>
            </div>
          </article>
        ))}
        <div className="flex justify-center">
          <Link
            href="/work"
            data-audio={audio.hover}
            className="btn btn-secondary btn-small"
          >
            <div className="btn__text">
              {experimentsHeader.button2 ?? "See case studies"}
            </div>
          </Link>
        </div>
      </div>

      {/* Side nav: video thumbnails to jump to each project (desktop only) */}
      <div className="absolute top-1/2 right-[-7rem] z-3 hidden -translate-y-1/2 flex-col items-stretch justify-end gap-2 desktop:flex wide:right-[-6rem]">
        {experimentsStack.map((project, i) => (
          <a
            key={project.index}
            aria-label={project.title}
            data-audio={audio.secondaryHover}
            data-audio-click={audio.closeMenu}
            data-project={i + 1}
            href="#"
            className={`home-projects_nav-wrapper is-${i + 1} w-inline-block flex flex-col items-start justify-start gap-1 text-brand-white no-underline`}
            onClick={(e) => handleNavClick(e, i)}
          >
            <div className="text-caption-2">[0{i + 1}]</div>
            <div className="home-projects_nav-image-wrapper h-25 w-[8.85rem] overflow-hidden rounded desktop:border desktop:border-transparent">
              <div className="h-full w-full object-cover w-embed">
                <AutoVideo src={project.video} decorative />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Floating info card: current project title + description (scramble) +
          CTA. Desktop/tablet only (matches the min-width fan gate). */}
      <div className="home-projects_banner-component is-experiments absolute bottom-8 left-8 z-3 hidden w-full max-w-fit flex-col gap-4 rounded border border-white-20 bg-black-30 p-6 shadow-[inset_0_0_0_1000px_#0a090e33] backdrop-blur-[100px] min-[768px]:flex">
        <div className="flex-none">
          <div className="heading-style-h3 block max-w-full max-h-24 overflow-hidden whitespace-normal wrap-break-word min-[992px]:max-h-16">
            {experimentsStack[0].title}
          </div>
          <div className="text-size-regular block max-w-100 max-h-24 overflow-hidden whitespace-normal wrap-break-word min-[992px]:max-h-16">
            {experimentsStack[0].description}
          </div>
        </div>
        <div className="btn-group">
          <a
            data-audio={audio.hover}
            href={experimentsStack[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-small"
          >
            <div className="btn__text">
              {experimentsHeader.viewProjectLabel ?? "View project"}
            </div>
          </a>
          <Link
            href="/work"
            data-audio={audio.hover}
            className="btn btn-secondary btn-small"
          >
            <div className="btn__text">
              {experimentsHeader.button2 ?? "See case studies"}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}