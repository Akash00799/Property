import React from "react";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import PromotionsTicker from "@/components/promotions/PromotionsTicker";
import UpcomingCountdownBanner from "@/components/promotions/UpcomingCountdownBanner";
import FeaturedPlots from "@/components/home/FeaturedPlots";
import CategorySection from "@/components/home/CategorySection";
import PromotionsCarousel from "@/components/promotions/PromotionsCarousel";
import ProjectsCatalogueSection from "@/components/home/ProjectsCatalogueSection";
import CinematicPromoBanner from "@/components/promotions/CinematicPromoBanner";
import InvestmentTeaser from "@/components/home/InvestmentTeaser";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ImageSpotlightSection from "@/components/promotions/ImageSpotlightSection";
import ProcessSteps from "@/components/home/ProcessSteps";
import FeaturedProjectSpotlight from "@/components/home/FeaturedProjectSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTA from "@/components/home/FinalCTA";
import SmoothReveal from "@/components/common/SmoothReveal";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* Above-the-fold Hero & Trust signals (No scroll delay) */}
      <Hero />
      <TrustBar />
      <PromotionsTicker />

      {/* Subsequent sections with smooth GPU-accelerated entrance & content-visibility */}
      <SmoothReveal className="section-contained">
        <UpcomingCountdownBanner />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <FeaturedPlots />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <CategorySection />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <PromotionsCarousel />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <ProjectsCatalogueSection />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <CinematicPromoBanner />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <InvestmentTeaser />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <WhyChooseUs />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <ImageSpotlightSection />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <ProcessSteps />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <FeaturedProjectSpotlight />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <TestimonialsSection />
      </SmoothReveal>

      <SmoothReveal className="section-contained">
        <FinalCTA />
      </SmoothReveal>
    </main>
  );
}

