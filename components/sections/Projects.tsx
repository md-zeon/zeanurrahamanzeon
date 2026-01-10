"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const projectSectionRef = useRef<HTMLElement>(null);
    useGSAP(() => {
        gsap.to(projectSectionRef.current, {
            backgroundColor: "#F8FF31",
            scrollTrigger: {
                trigger: projectSectionRef.current,
                start: "top top",
                end: "+=300%",
                toggleActions: "play reverse play reverse",
            },
        });

        const videos = gsap.utils.toArray<HTMLVideoElement>(".video");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectSectionRef.current,
                start: "top top",
                end: `+=${videos.length * 100}%`,
                scrub: true,
                pin: true,
            },
        });

        videos.forEach((video, i) => {
            // initial state
            gsap.set(video, {
                scale: 1,
                rotateX: 0,
                yPercent: i === 0 ? 0 : 100, // first video starts on screen, others below
                opacity: 1,
            });

            // Animate current video back
            tl.to(video, {
                scale: 0.95,
                rotateX: -45,
                y: i * 50,
                z: -300,
                opacity: 1,
                ease: "none",
                duration: 2,
            });

            // Animate next video up from bottom at the same time
            if (i + 1 < videos.length) {
                tl.to(
                    videos[i + 1],
                    { yPercent: 0, rotateX: 0, ease: "none", duration: 2 },
                    "<"
                );
            }
        });


    }, { scope: projectSectionRef });


    return (
        <section ref={projectSectionRef} className="relative overflow-hidden perspective-distant px-8 min-h-screen py-20 transition-colors duration-300">
            <video className="video absolute inset-0 w-full h-screen object-cover transform-3d will-change-transform origin-top" src="/videos/appetite-thumb.mp4" autoPlay muted loop></video>
            <video className="video absolute inset-0 w-full h-screen object-cover transform-3d will-change-transform origin-top" src="/videos/pickaxe-thumb.mp4" autoPlay muted loop></video>
            <video className="video absolute inset-0 w-full h-screen object-cover transform-3d will-change-transform origin-top" src="/videos/upkeep-thumb.mp4" autoPlay muted loop></video>
        </section>
    )
}

export default Projects;