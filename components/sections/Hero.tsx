"use client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Scramble from "../animations/Scramble";

const Hero = () => {

    return (
        <section id="hero" className="relative min-h-screen pt-24 mb-8 px-16 max-w-[1440px] mx-auto font-mono z-10 overflow-hidden">
            <div className="hero-content-up pr-16">
                <div className="px-14 flex flex-col lg:flex-row gap-4 justify-center items-end">
                    <p className="max-lg:self-center text-xl">Hi, I&apos;m Zeanur Rahaman Zeon</p>
                    <h1 className="uppercase text-8xl font-primary font-medium">Str<em>a</em>tegic</h1>
                </div>
                <div className="flex justify-center items-end">
                    <h1 className="uppercase text-8xl font-primary font-medium"><em className="mr-2">W</em>eb Designer</h1>
                </div>
                <div className="flex justify-end items-end">
                    <h1 className="uppercase text-8xl font-primary font-medium">& De<em className="mr-1 -ml-4">v</em>loper</h1>
                </div>
            </div>
            <div className="hero-content-bottom grid grid-cols-2 gap-8">
                {/* Left Photo */}
                <div className="relative -top-16 overflow-hidden w-fit h-fit">
                    <Image src="/images/frame.svg" width={600} height={600} className="z-10" alt="Frame" />
                </div>
                {/* Right Content */}
                <div className="flex flex-col mt-8">
                    <div className="flex items-center gap-4">
                        <Image className="invert" src="/icons/flower.svg" width={24} height={24} alt="Flower Icon" />
                        {/* <Separator /> */}
                        <div className="h-px bg-white flex-1" />
                        <p className="flex-1">From polished UI to complex backend systems</p>
                    </div>
                    <div className="grow flex gap-8">
                        <Separator className="mt-4 ml-2" orientation="vertical" />
                        {/* Content */}
                        <div className="py-20 pl-10 space-y-12">
                            <p className="mt-4 text-xl">
                                I am a passionate web designer and developer with a knack for creating visually stunning and user-friendly websites. With a strong foundation in both design principles and coding languages, I bring ideas to life on the web.
                            </p>
                            <div>
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