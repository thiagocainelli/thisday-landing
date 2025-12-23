import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Package, Info } from "lucide-react";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatStorage } from "@/utils/storageFormatter";
import { usePlans } from "@/hooks/usePlans";
import { ReadPlansDto } from "@/types/plans.dto";
import SectionHeader from "./SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";

interface PricingCardProps {
  plan: ReadPlansDto;
  featured?: boolean;
  index: number;
}

const PricingCard = ({ plan, featured = false, index }: PricingCardProps) => {
  const storageFormatted = formatStorage(plan.capacityGB);
  const duration = `${plan.durationDays} ${
    plan.durationDays === 1 ? "dia" : "dias"
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`relative p-6 rounded-2xl transition-all duration-300 ${
        featured
          ? "bg-shareday-gradient text-primary-foreground shadow-xl scale-105"
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
          {plan.name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span
            className={`text-4xl font-bold ${
              featured ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {formatCurrencyBRL(plan.price)}
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
            {storageFormatted} de armazenamento
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

        {plan.description && (
          <div className="flex items-center gap-2">
            <Info
              className={`h-4 w-4 ${
                featured
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              }`}
            />
            <span
              className={`text-sm ${
                featured
                  ? "text-primary-foreground/90"
                  : "text-muted-foreground"
              }`}
            >
              {plan.description}
            </span>
          </div>
        )}
      </div>

      <Button
        variant={featured ? "secondary" : "outline"}
        className="w-full"
        size="lg"
        asChild
      >
        <Link to={`/criar-evento?plan=${plan.uuid}`}>Escolher plano</Link>
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  const { data: plansData, isLoading } = usePlans({
    page: 1,
    itemsPerPage: 100,
    search: undefined,
  });

  const activePlans = plansData?.data?.filter((plan) => plan.active) || [];

  if (isLoading) {
    return (
      <section
        id="precos"
        className="py-section bg-gradient-to-br from-[#eef4ff] via-white to-[#e8f0ff]"
      >
        <div className="container">
          <SectionHeader
            label="Planos e preços"
            title="Simples e transparente"
            description="Escolha o plano ideal para o tamanho do seu evento."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activePlans.length === 0) {
    return (
      <section
        id="precos"
        className="py-section bg-gradient-to-br from-[#eef4ff] via-white to-[#e8f0ff]"
      >
        <div className="container">
          <SectionHeader
            label="Planos e preços"
            title="Simples e transparente"
            description="Escolha o plano ideal para o tamanho do seu evento."
            className="mb-12"
          />
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border bg-background">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum plano disponível no momento
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Não há planos ativos disponíveis. Entre em contato conosco para
              mais informações.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="precos"
      className="py-section bg-gradient-to-br from-[#eef4ff] via-white to-[#e8f0ff]"
    >
      <div className="container">
        <SectionHeader
          label="Planos e preços"
          title="Simples e transparente"
          description="Escolha o plano ideal para o tamanho do seu evento."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {activePlans.map((plan, index) => (
            <PricingCard
              key={plan.uuid}
              plan={plan}
              featured={index === 1}
              index={index}
            />
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
