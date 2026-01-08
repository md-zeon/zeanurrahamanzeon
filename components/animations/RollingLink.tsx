"use client"
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";

interface RollingLinkProps {
    href: string;
    children: React.ReactNode;
}

const RollingLink = ({ href, children }: RollingLinkProps) => {
    const containerRef = useRef(null);

    const onMouseEnter = () => {
        gsap.to(containerRef.current, {
            y: "-50%",
            duration: 0.4,
            ease: "power2.inOut",
        });
    };

    const onMouseLeave = () => {
        gsap.to(containerRef.current, {
            y: "0%",
            duration: 0.4,
            ease: "power2.inOut",
        });
    };

    return (
        <Link
            href={href}
            className="relative block overflow-hidden h-[1.1em] leading-[1.1em]"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div ref={containerRef} className="flex flex-col">
                {/* Layer 1: Original */}
                <span className="block h-[1.1em]">{children}</span>
                {/* Layer 2: The "Hover" version that comes from below */}
                <span className="block h-[1.1em]">{children}</span>
            </div>
        </Link>
    );
};

export default RollingLink;