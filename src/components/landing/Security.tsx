import { motion } from "framer-motion";
import { Shield, Clock, Trash2, Eye, CheckCircle2 } from "lucide-react";

const Security = () => {
  const points = [
    {
      icon: Shield,
      title: "Fotos e vídeos pertencem ao evento",
      description: "Acesso restrito apenas a quem tem o link.",
    },
    {
      icon: Clock,
      title: "Conteúdo temporário",
      description: "Definido pelo plano escolhido.",
    },
    {
      icon: Trash2,
      title: "Remoção automática",
      description: "Arquivos deletados após o prazo.",
    },
    {
      icon: Eye,
      title: "Transparência total",
      description: "Você sabe exatamente o que acontece.",
    },
  ];

  return (
    <section className="py-section bg-gradient-to-br from-[#f5f7ff] via-background to-[#eef5ff]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            Segurança e privacidade
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Seus dados, sua tranquilidade
          </h2>
        </motion.div>

        <div className="space-y-4">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-shareday-white/60 border-l-4 border-primary/30 hover:border-primary/60 hover:bg-shareday-white/80 transition-all duration-300"
              >
                <div className="mt-0.5 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 text-base">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-primary/40 shrink-0 mt-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Security;
