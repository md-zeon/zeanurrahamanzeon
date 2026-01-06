"use client";
import { useRef, useEffect, ReactElement, cloneElement } from "react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

interface ScrambleProps {
    children: ReactElement;
    chars?: string;
    text?: string;
    duration?: number;
    ease?: string;
}

export default function Scramble({
    children,
    text,
    chars = "01",
    duration = 0.5,
    ease = "power2.inOut",
}: ScrambleProps) {
    const elRef = useRef<HTMLElement | null>(null);
    const tlRef = useRef<gsap.core.Tween | null>(null);
    const isHoveredRef = useRef(false); // track if mouse is still over element

    useEffect(() => {
        if (!elRef.current) return;

        const currentText = elRef.current.innerText;

        tlRef.current = gsap.to(elRef.current, {
            duration,
            scrambleText: {
                text: text || currentText,
                chars,
                speed: 0.3,
            },
            ease,
            paused: true,
            onComplete: () => {
                // When animation finishes, reverse only if mouse already left
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
        // Only reverse if animation is already complete
        if (tlRef.current?.progress() === 1) {
            tlRef.current.reverse();
        }
        // Otherwise, onComplete will handle reversing
    };

    return cloneElement(children, {
        ref: elRef as any,
        onMouseEnter: handleEnter,
        onMouseLeave: handleLeave,
    } as any);
}
