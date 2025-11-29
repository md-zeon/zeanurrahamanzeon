"use client";

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react";

const Logo = () => {
    const logoRef = useRef<HTMLHeadingElement>(null);
    const onRef = useRef<HTMLSpanElement>(null);
    useGSAP(() => {
        const logo = logoRef.current;
        if (logo) {
            logo.addEventListener("mouseenter", () => {
                if (!gsap.isTweening(".hiddenText")) {
                    onRef.current?.classList.add("hidden");
                    gsap.to(".hiddenText", {
                        duration: 0.5,
                        scrambleText: {
                            text: "anurRahamanZeon",
                            chars: "01",
                            speed: 0.3,
                        },
                        ease: "power2.inOut",
                    });
                }
            });

            logo.addEventListener("mouseleave", () => {
                onRef.current?.classList.remove("hidden");

                gsap.to(".hiddenText", {
                    duration: 0.5,
                    scrambleText: {
                        text: "",
                        chars: "01",
                        speed: 0.3,
                    },
                    ease: "power2.inOut",
                    yoyo: true,
                })
            })
        }
    })
    return (
        <h1 ref={logoRef} className="text-2xl w-68">Ze<span ref={onRef}>on</span><span className="hiddenText"></span></h1>
    )
}

export default Logo;