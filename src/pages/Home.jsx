import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstagramSection from "@/components/home/InstagramSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <BeforeAfterSection />
      <AboutSection />
      <TestimonialsSection />
      <InstagramSection />
      <CTASection />
    </>
  );
}
