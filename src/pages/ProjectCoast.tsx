import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectSubNav from "@/components/project/ProjectSubNav";
import ProjectAbout from "@/components/project/ProjectAbout";
import ProjectAdvantages from "@/components/project/ProjectAdvantages";
import ProjectGenplan from "@/components/project/ProjectGenplan";
import ProjectPlans from "@/components/project/ProjectPlans";
import ProjectLocationLandscaping from "@/components/project/ProjectLocationLandscaping";
import ProjectCTA from "@/components/project/ProjectCTA";

const ProjectCoast = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <ProjectSubNav />
      <main className="pt-20">
        <ProjectHero />
        <ProjectAbout />
        <ProjectAdvantages />
        <ProjectGenplan />
        <ProjectLocationLandscaping />
        <ProjectPlans />
        <ProjectCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectCoast;
