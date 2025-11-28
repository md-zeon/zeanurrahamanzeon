"use client";

import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Logo = () => {
    useGSAP(() => {
        const logo = document.querySelector(".logo");
        if (logo) {
            logo.addEventListener("mouseenter", () => {
                if (!gsap.isTweening(".hiddenText")) {
                    document.querySelector(".on")?.classList.add("hidden");
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
                document.querySelector(".on")?.classList.remove("hidden");

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
        <h1 className="text-2xl w-72 logo">Ze<span className="on">on</span><span className="hiddenText"></span></h1>
    )
}

export default Logo;