"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import DigitalClock from "../DigitalClock"
import Logo from "../Logo"
import NavLinks from "./NavLinks"
import { LucideMenu } from "lucide-react"
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    useGSAP(() => {
        // Navbar hide on scroll down and show on scroll up
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });
        tl.to("#navbar", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    if (self.direction === 1) {
                        // Scrolling down (hide navbar)
                        gsap.to("#navbar", {
                            scale: 0.96, duration: 0.4, ease: "power1.out", onComplete: () => {
                                gsap.to("#navbar", {
                                    y: "-100%", duration: 0.3, ease: "power1.out", onComplete: () => {
                                        // Show menu icon when navbar is hidden
                                        gsap.to("#menu", { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
                                    }
                                });
                            }
                        });
                    } else {
                        // Scrolling up (show navbar)
                        // Hide menu icon when navbar is shown
                        gsap.to("#menu", {
                            autoAlpha: 0, opacity: 0, duration: 0.3, ease: "power1.out", onComplete: () => {
                                gsap.to("#navbar", {
                                    y: "0%", duration: 0.3, ease: "power1.out", onComplete: () => {
                                        gsap.to("#navbar", {
                                            scale: 1, duration: 0.4, ease: "power1.out"
                                        });
                                    }
                                });
                            }
                        });
                    }
                },
            },
        });

    })
    return (
        <>
            {/* Navbar main */}
            <nav id="navbar" className={`font-roboto-mono fixed top-0 left-0 right-0 z-50 bg-[#0A090E] grid grid-cols-2 md:grid-cols-3 items-center px-6 py-4.5 border rounded`}>
                <Logo />
                <NavLinks />
                <DigitalClock />
            </nav>
            {/* When navbar is hidden */}
            <nav id="menu" className="fixed opacity-0 right-8 top-8 border rounded-full w-fit h-fit p-3 z-40 cursor-pointer">
                <LucideMenu />
            </nav>
        </>
    )
}

export default Navbar