"use client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Scramble from "../animations/Scramble";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(SplitText, ScrambleTextPlugin);
import { useGSAP } from "@gsap/react";
import { LucideLinkedin } from "lucide-react";
import Link from "next/link";
import FramedMedia from "../FramedMedia";

const Hero = () => {
    useGSAP(() => {
        // GSAP Animations
        const tl = gsap.timeline();

        // Hero content up animation
        tl.to(".name", {
            scrambleText: {
                text: "Zeanur Rahaman Zeon",
                chars: "01",
                speed: 0.3
            },
            duration: 0.5,
            ease: "power1.inOut",
        });

        const header1 = new SplitText(".hero-header-1", { type: "chars" });
        const header2 = new SplitText(".hero-header-2", { type: "chars" });
        const header3 = new SplitText(".hero-header-3", { type: "chars" });
        gsap.set([header1.chars, header2.chars, header3.chars], { x: -100 });
        tl.to(header1.chars, {
            x: 0,
            stagger: 0.01,
            duration: 0.4,
            autoAlpha: 1,
            ease: "power2.out"
        });
        tl.to(".hero-header-1", { opacity: 1 }, "<");
        tl.to(header2.chars, {
            x: 0,
            stagger: 0.01,
            duration: 0.6,
            autoAlpha: 1,
            ease: "power2.out"
        }, "<");
        tl.to(".hero-header-2", { opacity: 1 }, "<");
        tl.to(header3.chars, {
            x: 0,
            stagger: 0.01,
            duration: 0.8,
            autoAlpha: 1,
            ease: "power2.out"
        }, "<");
        tl.to(".hero-header-3", { opacity: 1 }, "<");

        // Hero content bottom animation
        tl.to(".hero-tagline", {
            x: 0,
            autoAlpha: 1,
            duration: 0.6,
        });

        tl.to(".hero-content-bottom-main", {
            autoAlpha: 1,
            duration: 0.6,
        });

        tl.to(".hero-content-description", {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
        }, "<+=0.3");
        tl.to(".hero-buttons", {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
        }, "<+=0.2");

        tl.to(".hero-photo", {
            autoAlpha: 1,
            duration: 0.6
        }, "<");

        tl.to("#navbar", {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out"
        }, "<");
    });

    return (
        <section id="hero" className="relative min-h-screen pt-24 mb-8 px-16 max-w-[1440px] mx-auto font-mono z-10 overflow-hidden">
            <div className="hero-content-up">
                <div className="flex flex-col xl:flex-row gap-4 justify-center items-end">
                    <p className="max-lg:self-center text-xl hero-name sm:px-14">Hi, I&apos;m <span className="name">Zeanur Rahaman Zeon</span></p>
                    <h1 className="px-14 uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-primary font-medium hero-header-1 opacity-0">Str<em>a</em>tegic</h1>
                </div>
                <div className="flex justify-center items-end">
                    <h1 className="uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-primary font-medium hero-header-2 opacity-0"><em className="mr-2">W</em>eb Designer</h1>
                </div>
                <div className="flex justify-end items-end">
                    <h1 className="uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-primary font-medium hero-header-3 opacity-0">& De<em className="mr-1 -ml-4">v</em>loper</h1>
                </div>
            </div>
            <div className="hero-content-bottom grid lg:grid-cols-2 gap-8">
                {/* Left Photo */}
                <div className="relative -xl:top-16 overflow-hidden w-fit h-fit hero-photo pb-10 opacity-0 max-lg:hidden">
                    <FramedMedia isVideo={false} src="/images/zeon.webp" className="z-10 w-full h-full" alt="Zeanur Rahaman Zeon" />
                </div>
                {/* Right Content */}
                <div className="flex flex-col mt-8">
                    <div className="flex items-center gap-4 hero-tagline opacity-0 -translate-x-12">
                        <Image className="invert" src="/icons/flower.svg" width={24} height={24} alt="Flower Icon" />
                        {/* <Separator /> */}
                        <div className="h-px bg-white flex-1" />
                        {/* <p className="flex-1">From polished UI to complex backend systems</p> */}
                        <Link href="https://www.linkedin.com/in/zeanur-rahaman-zeon" className="flex items-center gap-1 font-bold hover:underline" target="_blank w_full"><LucideLinkedin className="inline-block size-4" />/zeanur-rahaman-zeon</Link>
                    </div>
                    <div className="grow flex gap-8 hero-content-bottom-main h_full opacity-0">
                        <Separator className="mt-4 ml-2" orientation="vertical" />
                        {/* Content */}
                        <div className="sm:py-5 md:py-10 xl:py-20 sm:pl-5 md:pl-10 xl:pl-20 space-y-12">
                            <p className="mt-4 text-xl hero-content-description opacity-0 translate-y-12">
                                I am a passionate web designer and developer with a knack for creating visually stunning and user-friendly websites. With a strong foundation in both design principles and coding languages, I bring ideas to life on the web.
                            </p>
                            <div className="flex items-center gap-2 hero-buttons opacity-0 translate-y-12">
                                <Scramble>
                                    <Button className="text-xl cursor-pointer">
                                        Get in Touch
                                    </Button>
                                </Scramble>
                                <Scramble>
                                    <Button variant="outline" className="text-xl ml-4 cursor-pointer">See My Work</Button>
                                </Scramble>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Border */}
            <div className="absolute inset-0 border-b border-r border-l -z-1" />
        </section >
    )
}

export default Hero
