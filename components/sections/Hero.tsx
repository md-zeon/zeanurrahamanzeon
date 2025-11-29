"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top 100px",
                end: "bottom top",
                scrub: true,
            },
        });
    });
    return (
        <section id="hero" className="relative min-h-screen pt-24 px-16 max-w-[1440px] mx-auto font-mono">
            <div className="hero-content-up py-14">
                <div className="px-14 flex flex-col lg:flex-row gap-4 justify-center items-end">
                    <p className="max-lg:self-center text-xl">Hi, I&apos;m Zeanur Rahaman Zeon</p>
                    <h1 className="uppercase text-8xl font-ibm!">Str<em>a</em>tegic</h1>
                </div>
                <div className="flex justify-center items-end">
                    <h1 className="uppercase text-8xl font-roboto-mono"><em className="mr-2">W</em>eb Designer</h1>
                </div>
                <div className="flex justify-end items-end">
                    <h1 className="uppercase text-8xl font-primary">& De<em>v</em>loper</h1>
                </div>
            </div>
            <div className="hero-content-bottom"></div>
            {/* Border */}
            <div className="absolute inset-0 border-b border-r border-l z-1" />
        </section>
    )
}

export default Hero