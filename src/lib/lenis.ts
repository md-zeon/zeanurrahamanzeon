"use client";

import Lenis from "lenis";

export function createLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false,
  });
  return lenis;
}
