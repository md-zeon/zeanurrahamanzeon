import LogosBanner from "../LogosBanner";

/**
 * Thin full-width divider with the animated marquee banner, used to break
 * up the About page ("Career story" strip).
 */
export default function AboutDivider() {
  return (
    <section className="relative z-2 overflow-hidden">
      <LogosBanner text="Career story" number="CRS_gjx1_30731" />
    </section>
  );
}
