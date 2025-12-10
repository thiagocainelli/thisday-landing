import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, ShieldCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Header from "./Header";

const heroBgUrl =
  "https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo - scroll no mobile, fixed no desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11,16,32,0.75), rgba(12,30,88,0.70)), url(${heroBgUrl})`,
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-secondary/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_38%)]" />

      <Header />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
            Registre cada momento{" "}
            <span className="text-gradient-primary">
              rápido, fácil e sem complicações.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Você está a um QR Code de distância de tornar o seu evento
            inesquecível e deixar uma memória para sempre.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            <Button variant="hero" size="xl" asChild className="shadow-xl">
              <Link to="/criar-evento">
                Criar evento agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              asChild
              className="bg-white/10 text-white border-white/40 hover:bg-white/15 h-14"
            >
              <a href="#como-funciona">
                <Play className="mr-2 h-4 w-4" />
                Ver demo
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-white/80">
            <span className="inline-flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4 text-white" />
              Seguro, temporário e pronto
            </span>
            <span className="hidden sm:block h-px w-8 bg-white/40" />
            <span>Sem app. Sem cadastro. Só escanear e enviar.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
