/**
 * Central GSAP setup for the site.
 *
 * Imports and registers every GSAP plugin used across the codebase so that
 * consumer modules can import `gsap` (and the helper exports below) from a
 * single place instead of re-registering plugins on every import.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

// Register all plugins once so they are available globally through `gsap`.
gsap.registerPlugin(
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText,
  TextPlugin
);

// Re-export the most commonly used GSAP APIs for convenience.
export { gsap, ScrollTrigger, SplitText, Observer };
