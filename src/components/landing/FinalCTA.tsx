import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-section bg-primary">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Um dia.{" "}
            <span className="opacity-80">Todas as fotos.</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-md mx-auto">
            Comece agora e crie a memória coletiva do seu próximo evento.
          </p>
          <Button
            variant="secondary"
            size="xl"
            className="shadow-lg hover:shadow-xl"
          >
            Criar meu evento
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
