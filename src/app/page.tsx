import HeroSection from "@/components/sections/HeroSection";
import HomeProjects from "@/components/sections/HomeProjects";
import LogosBanner from "@/components/LogosBanner";
import WhySection from "@/components/sections/WhySection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LabSection from "@/components/sections/LabSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="main-wrapper background-color-black">
      <HeroSection />
      <HomeProjects />
      <LogosBanner />
      <WhySection />
      <ServicesSection />
      <TestimonialsSection />
      <LabSection />
      <CtaSection />
    </main>
  );
}
