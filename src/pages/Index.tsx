import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import UseCases from "@/components/landing/UseCases";
import Benefits from "@/components/landing/Benefits";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <HowItWorks />
        <ProblemSection />
        <SolutionSection />
        <UseCases />
        <Benefits />
        <Pricing />
        <Security />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
