import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectInfoBar from "@/components/project/ProjectInfoBar";
import ProjectSubNav from "@/components/project/ProjectSubNav";
import ProjectAbout from "@/components/project/ProjectAbout";
import ProjectAdvantages from "@/components/project/ProjectAdvantages";
import ProjectGenplan from "@/components/project/ProjectGenplan";
import ProjectFilter from "@/components/project/ProjectFilter";
import ProjectPlans from "@/components/project/ProjectPlans";
import ProjectFinishing from "@/components/project/ProjectFinishing";
import ProjectAssetsSection from "@/components/project/ProjectAssetsSection";
import ProjectLocationLandscaping from "@/components/project/ProjectLocationLandscaping";
import ProjectConstruction from "@/components/project/ProjectConstruction";
import ProjectCTA from "@/components/project/ProjectCTA";
import ProjectCTANewsletter from "@/components/project/ProjectCTANewsletter";

const photoPath = (folder: string, filename: string) =>
  `/photos/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

const luxorGenplanMarkerPositions = {
  sec1: { top: "58%", left: "25%" },
  sec2: { top: "74%", left: "47%" },
  sec3: { top: "54%", left: "64%" },
  parking1: { top: "22%", left: "43%" },
  parking2: { top: "69%", left: "18%" },
  parking3: { top: "40%", left: "80%" },
  school: { top: "35%", left: "54%" },
  kinder1: { top: "44%", left: "34%" },
  kinder2: { top: "31%", left: "69%" },
  park1: { top: "19%", left: "63%" },
  park2: { top: "49%", left: "50%" },
  shop: { top: "61%", left: "36%" },
  sport: { top: "27%", left: "79%" },
  cafe: { top: "65%", left: "57%" },
  bike: { top: "79%", left: "63%" },
  "lbl-parking1": { top: "25%", left: "34%" },
} as const;

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
    photoPath("Архитектура", "luxor1.jpg"),
    photoPath("Архитектура", "luxor2.jpg"),
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

const luxorAboutSlides = [
  { type: "image" as const, src: "/photos/Вестибюль/Вестибюль 3.jpg" },
  { type: "image" as const, src: "/photos/Вестибюль/Вестибюль 6.jpg" },
  { type: "image" as const, src: "/photos/Холл/photo_2026-03-27_16-55-39 (2).jpg" },
  { type: "image" as const, src: "/photos/Колясочная/Колясочная 3.jpg" },
  { type: "image" as const, src: "/photos/Лифтовый холл/Лифт_1этаж 3.jpg" },
];

const ProjectLuxor = () => {
  return (
    <div className="luxor-theme min-h-screen bg-background text-foreground">
      <Header introDone />
      <ProjectSubNav />
      <main className="pt-20">
        <ProjectHero
          heroImageOverride="/luxor2.jpg"
          titleOverride="ЛЮКСОР"
          galleryCategoriesOverride={luxorHeroGallerySections}
          galleryImagesOverride={luxorHeroGalleryBySections}
        />
        <ProjectInfoBar titleOverride="ЛЮКСОР" addressOverride="Артиллерийская, 90" />
        <ProjectFilter />
        <ProjectAbout gallerySlidesOverride={luxorAboutSlides} />
        <ProjectAdvantages
          photoOverrides={{
            ecology: "/private.png",
            landscaping: "/blagoustroistvo.png",
            infrastructure: "/apteka.png",
          }}
        />
        <ProjectGenplan imageOverride="/luxor1.jpg" markerPositionsOverride={luxorGenplanMarkerPositions} />
        <ProjectLocationLandscaping photoCardOverrides={["/landscapedesign.png", "/dvor.png"]} />
        <ProjectPlans />
        <ProjectCTA />
        <ProjectFinishing />
        <ProjectAssetsSection heroImageOverride="/luxor-parking.png" />
        <ProjectConstruction />
        <ProjectCTANewsletter />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectLuxor;
