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

const ProjectLuxor = () => {
  return (
    <div className="luxor-theme min-h-screen bg-background text-foreground">
      <Header introDone />
      <ProjectSubNav />
      <main className="pt-20">
        <ProjectHero heroImageOverride="/luxor2.jpg" titleOverride="ЛЮКСОР" />
        <ProjectInfoBar titleOverride="ЛЮКСОР" />
        <ProjectFilter />
        <ProjectAbout />
        <ProjectAdvantages />
        <ProjectGenplan />
        <ProjectLocationLandscaping />
        <ProjectPlans />
        <ProjectCTA />
        <ProjectFinishing />
        <ProjectAssetsSection />
        <ProjectConstruction />
        <ProjectCTANewsletter />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectLuxor;
