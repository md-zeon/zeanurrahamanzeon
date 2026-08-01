"use client";

import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

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

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}
