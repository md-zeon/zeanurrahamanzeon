import LogosBanner from "../LogosBanner";
import { aboutDivider } from "@/data/about";

/**
 * Thin full-width divider with the animated marquee banner, used to break
 * up the About page ("Career story" strip).
 */
export default function AboutDivider() {
  return (
    <section className="relative z-2 overflow-hidden">
      <LogosBanner text={aboutDivider.text} number={aboutDivider.caption} />
    </section>
  );
}
