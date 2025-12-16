import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import UseCases from "@/components/landing/UseCases";
// import GalleryShowcase from "@/components/landing/GalleryShowcase";
import Testimonials from "@/components/landing/Testimonials";
import Benefits from "@/components/landing/Benefits";
import Pricing from "@/components/landing/Pricing";
import Security from "@/components/landing/Security";
import FaqSection from "@/components/landing/FaqSection";
import Footer from "@/components/landing/Footer";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const Index = () => {
  return (
    <>
      <SEO
        title="shareday - Reúna todas as fotos do seu evento com QR Code | Sem app, sem cadastro"
        description="Centralize todas as fotos e vídeos do seu evento em um único lugar usando apenas um QR Code. Simples, rápido e temporário. Perfeito para casamentos, festas, eventos corporativos e mais."
        keywords="fotos evento, vídeos evento, QR code fotos, compartilhar fotos evento, casamento fotos, festa fotos, evento corporativo fotos, galeria fotos evento"
        url="https://shareday.app/"
      />
      <div className="min-h-screen bg-background">
        <main>
          <HeroSection />
          <HowItWorks />
          <ProblemSection />
          <SolutionSection />
          {/* <GalleryShowcase /> */}
          <UseCases />
          <Benefits />
          <Testimonials />
          <Pricing />
          <Security />
          <FaqSection />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Index;
