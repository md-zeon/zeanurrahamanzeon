import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText,
  TextPlugin
);

export { gsap, ScrollTrigger, SplitText, Observer };
