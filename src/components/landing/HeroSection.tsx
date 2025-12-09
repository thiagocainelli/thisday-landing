import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-background overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-secondary/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-6 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="animate-fade-in mb-8">
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary/70">
              THISDAY
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-in-up text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
            Um dia.{" "}
            <span className="text-primary">Todas as fotos.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-delay-1 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Centralize todas as fotos do seu evento em um único lugar, 
            usando apenas um QR Code.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Criar evento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Ver como funciona
            </Button>
          </div>

          {/* Trust indicator */}
          <p className="animate-fade-in-delay-3 mt-12 text-sm text-muted-foreground">
            Simples. Rápido. Sem complicação.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
