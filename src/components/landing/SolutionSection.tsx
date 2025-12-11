import { motion } from "framer-motion";
import { Check } from "lucide-react";

const solutionImageUrl =
  "https://images.unsplash.com/photo-1682072155213-856c2ab9d629?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
    <section className="py-section bg-gradient-to-br from-[#f7f9ff] via-shareday-white to-[#eef4ff] overflow-hidden">
      <div className="container">
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
              Resolvemos isso.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Uma forma simples de reunir todas as fotos e vídeos do seu evento.
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
            <div className="rounded-3xl bg-shareday-gradient flex items-center justify-center p-8 overflow-hidden">
              <motion.div
                whileHover={{ rotate: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-full max-w-xs bg-shareday-white rounded-2xl shadow-xl p-4 transform"
              >
                <img
                  src={solutionImageUrl}
                  alt="Ilustração de evento"
                  className="w-full h-[270px] rounded-lg mb-4 object-cover"
                />
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Escaneie para enviar
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
    </section>
  );
};

export default SolutionSection;
