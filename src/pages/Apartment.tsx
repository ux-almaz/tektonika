import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApartmentHero from "@/components/apartment/ApartmentHero";
import ProjectAdvantages from "@/components/project/ProjectAdvantages";
import MortgageCalculator from "@/components/MortgageCalculator";
import ApartmentSimilar from "@/components/apartment/ApartmentSimilar";

const Apartment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header introDone />
      <main className="pt-20">
        <ApartmentHero />
        <ProjectAdvantages />
        <MortgageCalculator />
        <ApartmentSimilar />
      </main>
      <Footer />
    </div>
  );
};

export default Apartment;
