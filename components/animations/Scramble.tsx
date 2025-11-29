"use client";

import { useRef, useEffect, ReactElement, cloneElement } from "react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

interface ScrambleProps {
    children: ReactElement;
    chars?: string;
    duration?: number;
    ease?: string;
}

export default function Scramble({
    children,
    chars = "01",
    duration = 0.5,
    ease = "power1.inOut",
}: ScrambleProps) {
    const elRef = useRef<HTMLElement | null>(null);
    const tlRef = useRef<gsap.core.Tween | null>(null);
    const isHoveredRef = useRef(false);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        // Capture innerText at mount
        const text = el.innerText;

        tlRef.current = gsap.to(el, {
            duration,
            scrambleText: { text, chars, speed: 0.3 },
            ease,
            paused: true,
            onComplete: () => {
                // Reverse only if mouse has left after animation
                if (!isHoveredRef.current) {
                    tlRef.current?.reverse();
                }
            },
        });
    }, [chars, duration, ease]);

    const handleEnter = () => {
        isHoveredRef.current = true;
        tlRef.current?.play();
    };

    const handleLeave = () => {
        isHoveredRef.current = false;
        // Reverse only if animation already finished
        if (tlRef.current?.progress() === 1) {
            tlRef.current.reverse();
        }
        // Otherwise, onComplete will handle reverse after finishing
    };

    // eslint-disable-next-line react-hooks/refs
    return cloneElement(children, {
        ref: elRef,
        onMouseEnter: handleEnter,
        onMouseLeave: handleLeave,
    });
}
