import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Zap, Smartphone, Clock, Timer, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Fotos de todos reunidas",
    detail: "Convidados e equipes no mesmo lugar, sem perder nenhum clique.",
    gradient: "from-blue-500 to-cyan-500",
    pulse: true,
  },
  {
    icon: Zap,
    title: "Rápido e fácil de usar",
    detail: "Crie, compartilhe o QR e pronto. Zero fricção para quem envia.",
    gradient: "from-yellow-500 to-orange-500",
    pulse: true,
  },
  {
    icon: Smartphone,
    title: "Nenhum app para instalar",
    detail: "Funciona no navegador. Escaneou, enviou, acabou.",
    gradient: "from-purple-500 to-pink-500",
    pulse: false,
  },
  {
    icon: Clock,
    title: "Funciona no momento do evento",
    detail: "Uploads ao vivo para marketing, social e telões.",
    gradient: "from-green-500 to-emerald-500",
    pulse: true,
  },
  {
    icon: Timer,
    title: "As fotos expiram automaticamente",
    detail: "Galeria temporária para privacidade e segurança dos convidados.",
    gradient: "from-indigo-500 to-blue-500",
    pulse: false,
  },
];

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-section bg-gradient-to-br from-[#e8f1ff] via-[#f2f7ff] to-[#e4f0ff]">
      {/* Animated background elements */}
      <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div
        className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-primary/70 mb-4"
          >
            <Sparkles className="h-4 w-4" />
            Benefícios
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher thisday
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais engajamento, menos trabalho manual e privacidade garantida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
                />

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-border/40 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
                  />

                  {/* Icon with pulse animation */}
                  <motion.div
                    className={`relative mb-4 inline-flex items-center justify-center`}
                    animate={
                      benefit.pulse
                        ? {
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-xl opacity-20 blur-md`}
                      animate={
                        isHovered
                          ? {
                              scale: [1, 1.5, 1],
                              opacity: [0.2, 0.4, 0.2],
                            }
                          : {}
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <motion.h3
                      className="text-xl font-bold text-foreground"
                      animate={isHovered ? { x: 4 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {benefit.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-muted-foreground leading-relaxed"
                      animate={isHovered ? { opacity: 0.9 } : { opacity: 0.7 }}
                    >
                      {benefit.detail}
                    </motion.p>
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ skewX: -20 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
