import { motion } from "framer-motion";
import { Check } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const SolutionSection = () => {
  const features = [
    "Sem login para convidados",
    "Funciona direto pelo celular",
    "Sem bagunça de grupos",
    "Temporário por design",
    "Tudo em um só lugar",
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-section bg-thisday-white overflow-hidden">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
                A solução
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                THISDAY resolve isso.
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Uma forma simples de reunir todas as fotos do seu evento. 
                Sem apps para baixar, sem cadastros complicados.
              </p>

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </motion.div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center p-8 overflow-hidden">
                <motion.div 
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-full max-w-xs bg-thisday-white rounded-2xl shadow-xl p-4 transform rotate-3"
                >
                  <img
                    src={heroImage}
                    alt="Ilustração de evento"
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      Escaneie para enviar fotos
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Casamento Ana & Pedro
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
