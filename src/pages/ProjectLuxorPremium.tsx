import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuxorPremiumCTA from "@/components/project/premium/LuxorPremiumCTA";
import ProjectLuxorPremiumSubNav, {
  LUXOR_PREMIUM_HEADER_H,
  LUXOR_PREMIUM_SUBNAV_H,
} from "@/components/project/ProjectLuxorPremiumSubNav";
import ProjectLuxorPremiumAbout from "@/components/project/ProjectLuxorPremiumAbout";
import LuxorPremiumHero from "@/components/project/premium/LuxorPremiumHero";
import LuxorPremiumAdvantages from "@/components/project/premium/LuxorPremiumAdvantages";
import LuxorPremiumGenplan from "@/components/project/premium/LuxorPremiumGenplan";
import LuxorPremiumLocation from "@/components/project/premium/LuxorPremiumLocation";
import LuxorPremiumPlans from "@/components/project/premium/LuxorPremiumPlans";
import LuxorPremiumConstruction from "@/components/project/premium/LuxorPremiumConstruction";
import { LuxorPremiumMotionProvider } from "@/contexts/LuxorPremiumMotionContext";

const presentationPath = (n: number) =>
  `/photos/presentation/${encodeURIComponent(`иллюстративный материал (${n}).png`)}`;

const luxorHeroGallerySections = [
  { key: "architecture", label: "Архитектура" },
  { key: "landscaping", label: "Благоустройство" },
  { key: "vestibule", label: "Вестибюль" },
  { key: "stroller", label: "Колясочная" },
  { key: "elevator", label: "Лифтовый холл" },
  { key: "bathroom", label: "Санузел" },
  { key: "hall", label: "Холл" },
] as const;

const luxorHeroGalleryBySections = {
  architecture: [
    presentationPath(38),
    presentationPath(1),
    presentationPath(3),
    presentationPath(8),
    presentationPath(36),
  ],
  landscaping: [
    presentationPath(29),
    presentationPath(2),
    presentationPath(27),
    presentationPath(28),
  ],
  vestibule: [
    presentationPath(16),
    presentationPath(17),
    presentationPath(25),
    presentationPath(37),
    presentationPath(13),
  ],
  stroller: [presentationPath(26)],
  elevator: [presentationPath(31)],
  bathroom: [presentationPath(5)],
  hall: [presentationPath(33), presentationPath(7), presentationPath(15)],
};

const luxorPremiumGalleryImages = luxorHeroGalleryBySections;

const ProjectLuxorPremium = () => {
  const [headerRevealed, setHeaderRevealed] = useState(true);

  useEffect(() => {
    const onReveal = (e: Event) => {
      const d = (e as CustomEvent<{ revealed?: boolean }>).detail;
      setHeaderRevealed(d?.revealed !== false);
    };
    window.addEventListener("tektonika:header-reveal", onReveal);
    return () => window.removeEventListener("tektonika:header-reveal", onReveal);
  }, []);

  const stickyScrollOffset = headerRevealed
    ? LUXOR_PREMIUM_HEADER_H + LUXOR_PREMIUM_SUBNAV_H
    : LUXOR_PREMIUM_SUBNAV_H;

  return (
    <LuxorPremiumMotionProvider>
      <div className="min-h-screen bg-background">
        <Header introDone />
        <ProjectLuxorPremiumSubNav stickyScrollOffset={stickyScrollOffset} />
        <main style={{ paddingTop: LUXOR_PREMIUM_HEADER_H }}>
          <LuxorPremiumHero
            heroImageOverride={presentationPath(38)}
            titleOverride="ЛЮКСОР"
            galleryCategoriesOverride={luxorHeroGallerySections}
            galleryImagesOverride={luxorPremiumGalleryImages}
          />
          <ProjectLuxorPremiumAbout />
          <LuxorPremiumAdvantages
            eyebrow="Особенности ЖК"
            headline="Современный дизайн, светлые подъезды, лифты в малоэтажной застройке и комфорт с первого шага"
            slideImageOverrides={{
              ecology: presentationPath(8),
              education: presentationPath(19),
              landscaping: presentationPath(29),
              transport: presentationPath(34),
              infrastructure: presentationPath(14),
            }}
          />
          <LuxorPremiumGenplan imageOverride={presentationPath(32)} />
          <LuxorPremiumLocation
            eyebrow="О резиденции"
            description="Резиденция — это атмосфера с первого шага: лобби с консьерж-сервисом, светлые лифтовые холлы, продуманные планировки и террасы для жизни на высоте."
            galleryOverrides={[
              presentationPath(25),
              presentationPath(17),
              presentationPath(33),
              presentationPath(27),
            ]}
            galleryCaptions={[
              "Лобби и входная группа",
              "Лифтовые холлы и подъезды",
              "Интерьеры квартир",
              "Террасы и патио",
            ]}
            heroImageObjectPosition="center 88%"
          />
          <LuxorPremiumPlans
            eyebrow="Планировки"
            headline="Подберите квартиру в ЛЮКСОР: студии, одно-, двух- и трёхкомнатные планировки с продуманной эргономикой. Площади, стоимость и ипотека — у менеджера."
          />
          <LuxorPremiumConstruction />
          <LuxorPremiumCTA />
        </main>
        <Footer />
      </div>
    </LuxorPremiumMotionProvider>
  );
};

export default ProjectLuxorPremium;
