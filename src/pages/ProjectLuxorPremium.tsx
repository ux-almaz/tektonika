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

const photoPath = (folder: string, filename: string) =>
  `/photos/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

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
    "/luxor2.jpg",
    "/luxor2.jpg",
  ],
  landscaping: [
    photoPath("Благоустройство", "2026-04-30_14-55-50.png"),
    photoPath("Благоустройство", "2026-04-30_14-56-31.png"),
    photoPath("Благоустройство", "2026-04-30_14-56-56.png"),
  ],
  vestibule: [
    photoPath("Вестибюль", "Вестибюль 1.jpg"),
    photoPath("Вестибюль", "Вестибюль 2.jpg"),
    photoPath("Вестибюль", "Вестибюль 3.jpg"),
    photoPath("Вестибюль", "Вестибюль 4.jpg"),
    photoPath("Вестибюль", "Вестибюль 5.jpg"),
    photoPath("Вестибюль", "Вестибюль 6.jpg"),
    photoPath("Вестибюль", "Вестибюль 7.jpg"),
    photoPath("Вестибюль", "Вестибюль 8.jpg"),
  ],
  stroller: [
    photoPath("Колясочная", "Колясочная 1.jpg"),
    photoPath("Колясочная", "Колясочная 2.jpg"),
    photoPath("Колясочная", "Колясочная 3.jpg"),
    photoPath("Колясочная", "Колясочная 4.jpg"),
  ],
  elevator: [
    photoPath("Лифтовый холл", "Лифт_1этаж 1.jpg"),
    photoPath("Лифтовый холл", "Лифт_1этаж 2.jpg"),
    photoPath("Лифтовый холл", "Лифт_1этаж 3.jpg"),
  ],
  bathroom: [
    photoPath("Санузел", "photo_2026-03-17_10-56-45.jpg"),
    photoPath("Санузел", "photo_2026-03-17_10-56-451.jpg"),
    photoPath("Санузел", "photo_2026-03-17_10-56-4511.jpg"),
    photoPath("Санузел", "photo_2026-03-17_10-56-45111.jpg"),
  ],
  hall: [
    photoPath("Холл", "photo_2026-03-27_16-55-38.jpg"),
    photoPath("Холл", "photo_2026-03-27_16-55-39.jpg"),
    photoPath("Холл", "photo_2026-03-27_16-55-39 (2).jpg"),
    photoPath("Холл", "photo_2026-03-27_16-55-39 (3).jpg"),
  ],
};

const luxorPremiumGalleryImages = {
  ...luxorHeroGalleryBySections,
  architecture: ["/luxor2.jpg", ...luxorHeroGalleryBySections.architecture.slice(1)],
};

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
            heroImageOverride="/luxor2.jpg"
            titleOverride="ЛЮКСОР"
            galleryCategoriesOverride={luxorHeroGallerySections}
            galleryImagesOverride={luxorPremiumGalleryImages}
          />
          <ProjectLuxorPremiumAbout />
          <LuxorPremiumAdvantages
            eyebrow="Особенности ЖК"
            headline="Современный дизайн, светлые подъезды, лифты в малоэтажной застройке и комфорт с первого шага"
            photoOverrides={{
              ecology: "/private.png",
              landscaping: "/blagoustroistvo.png",
              infrastructure: "/apteka.png",
            }}
          />
          <LuxorPremiumGenplan imageOverride="/luxor2.jpg" />
          <LuxorPremiumLocation
            eyebrow="Всё рядом. Ничто не давит."
            description="ЛЮКСОР находится в Центральном районе Симферополя и сочетает редкий для города баланс: приватная тишина и быстрая доступность ключевых точек. Ужин в центре — и через несколько минут вы уже в другом мире, дома."
            galleryOverrides={[
              "/landscapedesign.png",
              "/dvor.png",
              "/private.png",
              "/blagoustroistvo.png",
            ]}
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
