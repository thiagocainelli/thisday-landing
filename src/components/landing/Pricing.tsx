import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { PLANS } from "@/constants/plans";

interface PricingCardProps {
  name: string;
  photos: string;
  duration: string;
  price: number;
  featured?: boolean;
  index: number;
}

const PricingCard = ({
  name,
  photos,
  duration,
  price,
  featured = false,
  index,
}: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className={`relative p-6 rounded-2xl transition-all duration-300 ${
      featured
        ? "bg-gradient-to-br from-primary via-[#1f4fd8] to-[#38bdf8] text-primary-foreground shadow-xl scale-105"
        : "bg-gradient-to-br from-white via-[#f7f9ff] to-white border border-border/50 hover:border-primary/30 hover:shadow-lg"
    }`}
  >
    {featured && (
      <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-1 bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#7c3aed] text-white text-xs font-semibold rounded-full shadow-md whitespace-nowrap"
        >
          Popular
        </motion.span>
      </div>
    )}

    <div className="text-center mb-6">
      <h3
        className={`text-lg font-semibold mb-2 ${
          featured ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {name}
      </h3>
      <div className="flex items-baseline justify-center gap-1">
        <span
          className={`text-4xl font-bold ${
            featured ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {formatCurrencyBRL(price)}
        </span>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-2">
        <Check
          className={`h-4 w-4 ${
            featured ? "text-primary-foreground/80" : "text-primary"
          }`}
        />
        <span
          className={`text-sm ${
            featured ? "text-primary-foreground/90" : "text-muted-foreground"
          }`}
        >
          Até {photos} fotos
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Check
          className={`h-4 w-4 ${
            featured ? "text-primary-foreground/80" : "text-primary"
          }`}
        />
        <span
          className={`text-sm ${
            featured ? "text-primary-foreground/90" : "text-muted-foreground"
          }`}
        >
          Disponível por {duration}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Check
          className={`h-4 w-4 ${
            featured ? "text-primary-foreground/80" : "text-primary"
          }`}
        />
        <span
          className={`text-sm ${
            featured ? "text-primary-foreground/90" : "text-muted-foreground"
          }`}
        >
          QR Code personalizado
        </span>
      </div>
    </div>

    <Button
      variant={featured ? "secondary" : "outline"}
      className="w-full"
      size="lg"
      asChild
    >
      <Link to={`/criar-evento?plan=${name.toLowerCase()}`}>
        Escolher plano
      </Link>
    </Button>
  </motion.div>
);

const Pricing = () => {
  return (
    <section
      id="precos"
      className="py-section bg-gradient-to-br from-[#eef4ff] via-white to-[#e8f0ff]"
    >
      <div className="container">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PLANS.map((plan, index) => (
            <PricingCard key={plan.id} {...plan} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button variant="cta" size="xl" asChild>
            <Link to="/criar-evento">
              Criar evento agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
