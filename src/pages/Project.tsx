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

const Project = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <ProjectSubNav />
      <main className="pt-20">
        <ProjectHero />
        <ProjectInfoBar />
        <ProjectFilter />
        {/* 1. О локации */}
        <ProjectAbout />
        {/* 2. О проекте, преимущества */}
        <ProjectAdvantages />
        {/* 3. Генплан */}
        <ProjectGenplan />
        {/* 4+7. Благоустройство и расположение */}
        <ProjectLocationLandscaping />
        {/* 5. Квартиры */}
        <ProjectPlans />
        {/* CTA — после планировок */}
        <ProjectCTA />
        {/* Отделка */}
        <ProjectFinishing />
        {/* 6. Входные группы, МОП, паркинг */}
        <ProjectAssetsSection />
        {/* 8. Ход строительства */}
        <ProjectConstruction />
        {/* CTA — конец страницы */}
        <ProjectCTANewsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Project;
