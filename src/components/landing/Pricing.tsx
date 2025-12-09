import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

interface PricingCardProps {
  name: string;
  photos: string;
  duration: string;
  price: string;
  featured?: boolean;
  index: number;
}

const PricingCard = ({ name, photos, duration, price, featured = false, index }: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className={`relative p-6 rounded-2xl transition-all duration-300 ${
      featured
        ? "bg-primary text-primary-foreground shadow-xl scale-105"
        : "bg-thisday-white border border-border/50 hover:border-primary/30 hover:shadow-lg"
    }`}
  >
    {featured && (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full"
      >
        Popular
      </motion.span>
    )}
    
    <div className="text-center mb-6">
      <h3 className={`text-lg font-semibold mb-2 ${featured ? "text-primary-foreground" : "text-foreground"}`}>
        {name}
      </h3>
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-4xl font-bold ${featured ? "text-primary-foreground" : "text-foreground"}`}>
          {price}
        </span>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-2">
        <Check className={`h-4 w-4 ${featured ? "text-primary-foreground/80" : "text-primary"}`} />
        <span className={`text-sm ${featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
          Até {photos} fotos
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Check className={`h-4 w-4 ${featured ? "text-primary-foreground/80" : "text-primary"}`} />
        <span className={`text-sm ${featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
          Disponível por {duration}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Check className={`h-4 w-4 ${featured ? "text-primary-foreground/80" : "text-primary"}`} />
        <span className={`text-sm ${featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
          QR Code personalizado
        </span>
      </div>
    </div>

    <Button
      variant={featured ? "secondary" : "outline"}
      className="w-full"
      size="lg"
    >
      Escolher plano
    </Button>
  </motion.div>
);

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      photos: "100",
      duration: "7 dias",
      price: "R$ 29",
    },
    {
      name: "Evento",
      photos: "200",
      duration: "15 dias",
      price: "R$ 49",
      featured: true,
    },
    {
      name: "Premium",
      photos: "500",
      duration: "30 dias",
      price: "R$ 89",
    },
  ];

  return (
    <section id="precos" className="py-section bg-thisday-white">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            Planos e preços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simples e transparente
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Escolha o plano ideal para o tamanho do seu evento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-center">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button variant="cta" size="xl">
            Criar evento agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
