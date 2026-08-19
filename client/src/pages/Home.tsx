import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { ThreeDShowcase } from "@/components/sections/ThreeDShowcase";
import { Reveal } from "@/components/Reveal";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { VisitMapSection } from "@/components/sections/VisitMapSection";
import { Footer } from "@/components/sections/Footer";
import { ContactDialog } from "@/components/modals/Dialogs";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export default function Home() {
  const [dialOpen, setDialOpen] = useState(false);
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden antialiased selection:bg-primary selection:text-primary-foreground">
        {/* Navigation */}
        <Navbar
          onOpenContact={() => setDialOpen(true)}
        />

        {/* Main Content Sections */}
        <main>
          <Hero
            onOpenContact={() => setDialOpen(true)}
          />

          <Reveal><MarqueeTicker /></Reveal>

          <Reveal delay={0.04}><ThreeDShowcase /></Reveal>

          <Reveal delay={0.04}><PortfolioSection /></Reveal>

          <Reveal delay={0.04}><ServicesSection onOpenContact={() => setDialOpen(true)} /></Reveal>

          <Reveal delay={0.04}><ProcessSection /></Reveal>

          <Reveal delay={0.04}><FAQSection /></Reveal>

          <Reveal delay={0.04}><VisitMapSection onOpenContact={() => setDialOpen(true)} /></Reveal>
        </main>

        {/* Footer */}
        <Footer />

        {/* Dialog Modals */}
        <ContactDialog open={dialOpen} onOpenChange={setDialOpen} />

        {/* Floating WhatsApp Button */}
        <WhatsAppFloatingButton />
      </div>
    </ErrorBoundary>
  );
}
