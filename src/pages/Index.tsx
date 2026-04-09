import { useState, useCallback, lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureCardsSection from "@/components/FeatureCardsSection";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";

const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const MortgageCalculator = lazy(() => import("@/components/MortgageCalculator"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));

// Module-level flag: resets on page reload, survives SPA navigation
let introHasPlayed = false;

const Index = () => {
  const alreadyPlayed = introHasPlayed;
  const [introDone, setIntroDone] = useState(alreadyPlayed);
  const handleIntroDone = useCallback(() => {
    introHasPlayed = true;
    setIntroDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!alreadyPlayed && <PageIntro onComplete={handleIntroDone} />}
      <Header introDone={introDone} />
      <main className="pt-20">
        <div className="flex flex-col [@media(min-height:830px)]:h-[calc(100dvh-5rem)]">
          <div className="flex-1 flex flex-col [@media(max-height:829px)]:min-h-[calc(100dvh-5rem)] [@media(max-height:829px)]:pb-3">
            <HeroSection introDone={introDone} />
          </div>
          <SpecialOffersSection />
        </div>
        <Suspense fallback={null}>
          <ProjectsSection />
          {/* <ProjectsSection /> */}
          {/* <MortgageCalculator /> */}
          <AboutSection />
          <NewsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
