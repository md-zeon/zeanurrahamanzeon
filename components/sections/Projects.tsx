"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useRef, useState } from "react";
import Scramble from "../animations/Scramble";
import { Button } from "../ui/button";
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const projects = [
    {
        title: "Plus X Innovation",
        description:
            "Helped the marketing team migrate to Webflow, optimise SEO, and scale their site.",
    },
    {
        title: "Pickaxe Studio",
        description:
            "Built a performant landing page with smooth animations and CMS integration.",
    },
    {
        title: "Upkeep App",
        description:
            "Designed and developed a SaaS dashboard with scalable UI patterns.",
    },
];


const Projects = () => {
    const projectSectionRef = useRef<HTMLElement>(null);
    const projectBannerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const updateBanner = (index: number) => {
        setActiveIndex(index);

        gsap.killTweensOf([
            ".project-banner-header",
            ".project-banner-description",
        ]);

        gsap.to(".project-banner-header", {
            scrambleText: {
                text: projects[index].title,
                chars: "01",
                speed: 0.3,
            },
            duration: 0.5,
            ease: "power1.inOut",
        });

        gsap.to(".project-banner-description", {
            scrambleText: {
                text: projects[index].description,
                chars: "01",
                speed: 0.3,
            },
            duration: 0.5,
            ease: "power1.inOut",
        });
    };


    useGSAP(() => {
        gsap.to(projectSectionRef.current, {
            backgroundColor: "#F8FF31",
            scrollTrigger: {
                trigger: projectSectionRef.current,
                start: "top top",
                end: "+=600%",
                toggleActions: "play reverse play reverse",
            },
            color: "#000000",
        });

        const videos = gsap.utils.toArray<HTMLVideoElement>(".video");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectSectionRef.current,
                start: "top top",
                end: `+=${videos.length * 200}%`,
                scrub: true,
                pin: true,
            },
        });

        videos.forEach((video, i) => {
            // initial state
            gsap.set(video, {
                yPercent: i === 0 ? 0 : 100, // first video starts on screen, others below
                rotateX: 0,
                scale: 1,
            });

            // Video comes into focus
            tl.to(video, {
                scale: 1,
                rotateX: 0,
                yPercent: 0,
                duration: 1,
                ease: "none",
            });

            // HOLD the video in focus
            tl.to(
                {},
                {
                    duration: 1.5, // hold duration
                }
            );

            // Animate current video back
            tl.to(video, {
                scale: 0.95,
                rotateX: -45,
                y: i * 50,
                z: -300,
                duration: 1,
                ease: "none",
            });

            // Animate next video up from bottom at the same time
            if (i + 1 < videos.length) {
                tl.to(
                    videos[i + 1],
                    { yPercent: 0, rotateX: 0, ease: "none", duration: 1 },
                    "<"
                );
            }
            if (i === videos.length - 1) {
                // remove the banner after last video goes off
                tl.to(projectBannerRef.current, {
                    autoAlpha: 0,
                    duration: 0.5,
                }, "-=0.8");
            }
        });

        let lastIndex = -1;

        ScrollTrigger.create({
            trigger: projectSectionRef.current,
            start: "top top",
            end: `+=${videos.length * 200}%`,
            scrub: true,

            onUpdate: (self) => {
                const index = Math.min(
                    projects.length - 1,
                    Math.floor(self.progress * projects.length)
                );

                if (index !== lastIndex) {
                    lastIndex = index;
                    updateBanner(index);
                }
            },
        });



    }, { scope: projectSectionRef });


    return (
        <section ref={projectSectionRef} className="relative overflow-hidden perspective-distant min-h-screen py-20 transition-colors duration-300">
            <video className="video absolute inset-0 w-[95vw] mx-auto h-screen object-cover transform-3d will-change-transform origin-top" src="/videos/appetite-thumb.mp4" autoPlay muted loop></video>
            <video className="video absolute inset-0 w-[95vw] mx-auto h-screen object-cover transform-3d will-change-transform origin-top" src="/videos/pickaxe-thumb.mp4" autoPlay muted loop></video>
            <video className="video absolute inset-0 w-[95vw] mx-auto h-screen object-cover transform-3d will-change-transform origin-top" src="/videos/upkeep-thumb.mp4" autoPlay muted loop></video>
            {/* Project Banner Component */}
            <div ref={projectBannerRef} className="absolute bottom-10 left-10 max-w-md backdrop-blur-xl z-50 p-4 transition-all duration-500">
                <h2 className="project-banner-header text-3xl font-bold mb-2 text-dark">
                    {projects[activeIndex].title}
                </h2>

                <p className="text-dark project-banner-description">
                    {projects[activeIndex].description}
                </p>

                <div className="flex items-center gap-2 mt-4">
                    <Scramble>
                        <Button className="text-xl">Live Link</Button>
                    </Scramble>
                    <Scramble>
                        <Button className="text-xl bg-black text-white">
                            See My Code
                        </Button>
                    </Scramble>
                </div>
            </div>

        </section>
    )
}

export default Projects;