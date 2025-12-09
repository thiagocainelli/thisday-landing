import { motion } from "framer-motion";
import { MessageSquare, Search, Puzzle } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      text: "Fotos se perdem no WhatsApp",
    },
    {
      icon: <Search className="h-5 w-5" />,
      text: "Ninguém reúne tudo depois do evento",
    },
    {
      icon: <Puzzle className="h-5 w-5" />,
      text: "Cada pessoa fica com um pedaço do dia",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-section bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            O problema
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Você conhece essa história?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Depois de todo evento, as melhores fotos ficam espalhadas 
            em dezenas de celulares. E a maioria nunca é compartilhada.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 text-foreground/80"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 rounded-lg bg-thisday-white flex items-center justify-center text-primary shadow-sm"
                >
                  {problem.icon}
                </motion.div>
                <span className="text-sm font-medium">{problem.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
