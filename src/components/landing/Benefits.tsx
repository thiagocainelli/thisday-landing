import { motion } from "framer-motion";
import { Users, Zap, Smartphone, Clock, Timer } from "lucide-react";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  index: number;
}

const Benefit = ({ icon, title, index }: BenefitProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ scale: 1.02, x: 5 }}
    className="flex items-center gap-4 p-4 rounded-xl bg-thisday-white border border-border/30 hover:shadow-md transition-shadow duration-300"
  >
    <motion.div 
      whileHover={{ rotate: 10 }}
      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0"
    >
      {icon}
    </motion.div>
    <span className="font-medium text-foreground">{title}</span>
  </motion.div>
);

const Benefits = () => {
  const benefits = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Fotos de todos reunidas",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Rápido e fácil de usar",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Nenhum app para instalar",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Funciona no momento do evento",
    },
    {
      icon: <Timer className="h-5 w-5" />,
      title: "As fotos expiram automaticamente",
    },
  ];

  return (
    <section className="py-section bg-secondary/20">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
              Benefícios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Por que escolher THISDAY
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Benefit key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
