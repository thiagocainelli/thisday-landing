import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Puzzle,
  AlertCircle,
  TrendingDown,
  Users,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const ProblemSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const problems = [
    {
      icon: MessageSquare,
      title: "Memórias perdidas",
      description:
        "As melhores fotos e vídeos ficam espalhados em dezenas de celulares",
      stat: "73%",
      statLabel: "das fotos e vídeos nunca são compartilhados",
      color: "from-blue-600 to-cyan-500",
      delay: 0,
    },
    {
      icon: Search,
      title: "Busca sem fim",
      description: "Ninguém reúne tudo depois do evento",
      stat: "2h+",
      statLabel: "tempo gasto procurando fotos e vídeos",
      color: "from-indigo-600 to-blue-500",
      delay: 0.1,
    },
    {
      icon: Puzzle,
      title: "História fragmentada",
      description: "Cada pessoa fica com um pedaço do dia",
      stat: "85%",
      statLabel: "dos eventos têm fotos e vídeos incompletos",
      color: "from-cyan-500 to-blue-500",
      delay: 0.2,
    },
  ];

  return (
    <section className="relative py-section overflow-hidden bg-shareday-gradient text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/30 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_40%)]" />
      </div>

      <div className="container relative z-10">
        <SectionHeader
          label="O problema"
          icon={AlertCircle}
          title={
            <>
              Você conhece essa{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                história?
              </span>
            </>
          }
          description="Depois de todo evento, as melhores fotos e vídeos ficam espalhados em dezenas de celulares e a maioria nunca são compartilhados."
          labelClassName="text-white/80"
          titleClassName="text-white leading-tight"
          descriptionClassName="text-white/90"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: problem.delay }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-900"
                >
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon - centered at top */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center shadow-md`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>
                    </div>

                    {/* Stat - large and prominent with gradient */}
                    <div className="text-center mb-4">
                      <motion.div
                        className={`text-6xl font-bold bg-gradient-to-r ${problem.color} bg-clip-text text-transparent mb-2`}
                        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                      >
                        {problem.stat}
                      </motion.div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                        {problem.statLabel}
                      </p>
                    </div>

                    {/* Title and description */}
                    <div className="space-y-2 mt-auto">
                      <motion.h3
                        className="text-lg font-bold text-gray-900 text-center"
                        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                      >
                        {problem.title}
                      </motion.h3>
                      <motion.p
                        className="text-sm text-gray-600 leading-relaxed text-center"
                        animate={
                          isHovered ? { opacity: 0.9 } : { opacity: 0.8 }
                        }
                      >
                        {problem.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Subtle shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"
                    style={{ skewX: -20 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/80 text-lg">Mas existe uma solução... 👇</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
