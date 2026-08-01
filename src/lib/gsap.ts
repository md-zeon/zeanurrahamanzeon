import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  ScrambleTextPlugin,
  SplitText,
  TextPlugin,
  InertiaPlugin,
  Draggable
);

export { gsap, ScrollTrigger, SplitText };
