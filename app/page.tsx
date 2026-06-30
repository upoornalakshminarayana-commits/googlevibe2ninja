import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import AlertShowcase from "@/components/landing/AlertShowcase";
import AgentsCarousel from "@/components/landing/AgentsCarousel";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import MotivationSection from "@/components/landing/MotivationSection";
import FAQSection from "@/components/landing/FAQSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#03060f" }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <FeaturesGrid />
      <AlertShowcase />
      <AgentsCarousel />
      <TestimonialsSection />
      <MotivationSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
