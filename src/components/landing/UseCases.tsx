import { motion } from "framer-motion";
import { Cake, Heart, Briefcase, Camera } from "lucide-react";

interface UseCaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const UseCaseCard = ({ icon, title, description, index }: UseCaseCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="group p-6 bg-thisday-white rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-xl transition-shadow duration-300"
  >
    <motion.div 
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4"
    >
      {icon}
    </motion.div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

const UseCases = () => {
  const cases = [
    {
      icon: <Cake className="h-6 w-6" />,
      title: "Aniversários e festas",
      description: "Reúna as fotos de todos os convidados em um só lugar.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Casamentos e noivados",
      description: "Capture cada momento especial visto por diferentes olhares.",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Eventos corporativos",
      description: "Documentação fácil de conferências e encontros de equipe.",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Fotógrafos e buffets",
      description: "Ofereça como serviço extra para seus clientes.",
    },
  ];

  return (
    <section className="py-section bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            Para quem é
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Perfeito para qualquer evento
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {cases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
