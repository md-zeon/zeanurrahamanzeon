"use client";

import NAV_LINKS from "@/constants/navlinks"
import NavLink from "./NavLink"
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

const NavLinks = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrambleTextPlugin);
    }, []);

    const scrambleEffect = (text: HTMLElement) => {
        if (!gsap.isTweening(text)) {
            gsap.to(text, {
                delay: 0.1,
                duration: 0.5,
                scrambleText: {
                    text: text.innerText,
                    chars: "01",
                    speed: 0.3,
                },
                ease: "power2.inOut",
                repeat: 1,
                yoyo: true,
            });
        }
    }
    return (
        <nav className="text-sm md:flex gap-2 items-center uppercase hidden mx-auto">
            {NAV_LINKS.map((link) => {
                return (
                    <NavLink key={link.title} title={link.title} path={link.path} scrambleEffect={scrambleEffect} />
                )
            })}
        </nav>
    )
}

export default NavLinks