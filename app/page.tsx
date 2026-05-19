import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { PlansSection } from "@/components/landing/plans-section";
import { CalculatorSection } from "@/components/landing/calculator-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { ChatWidget } from "@/components/landing/chat-widget";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PlansSection />
      <CalculatorSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
