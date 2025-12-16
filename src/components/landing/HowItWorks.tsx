import { useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Upload,
  Images,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

interface StepProps {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  delay: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const Step = ({
  number,
  icon: Icon,
  title,
  description,
  gradient,
  delay,
  isHovered,
  onHover,
}: StepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className="group relative"
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <motion.div
      className="relative h-full rounded-3xl bg-white/80 backdrop-blur-sm border border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background gradient effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Number badge */}
      <motion.div
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg z-10"
        animate={
          isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.5 }}
      >
        {number}
      </motion.div>

      {/* Icon container with animations */}
      <div className="relative mb-6 flex justify-center">
        <motion.div
          className="relative inline-block"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Blur glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-30`}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* Icon container */}
          <motion.div
            className={`relative p-6 rounded-full bg-gradient-to-br ${gradient} shadow-xl`}
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-10 w-10 text-white" />
          </motion.div>

          {/* Sparkles animation */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-6 w-6 text-primary/60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <motion.h3
          className="text-xl md:text-2xl font-bold text-foreground"
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-muted-foreground leading-relaxed"
          animate={isHovered ? { opacity: 0.9 } : { opacity: 0.7 }}
        >
          {description}
        </motion.p>

        {/* Arrow indicator */}
        <motion.div
          className="flex items-center gap-2 text-primary mt-4"
          animate={isHovered ? { x: 8, opacity: 1 } : { x: 0, opacity: 0.5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-medium">Passo {number}</span>
        </motion.div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        style={{ skewX: -20 }}
      />
    </motion.div>

    {/* Connecting arrow (only for first two steps) */}
    {number !== "3" && (
      <motion.div
        className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      >
        <ArrowRight className="h-8 w-8 text-primary/40" />
      </motion.div>
    )}
  </motion.div>
);

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      number: "1",
      icon: QrCode,
      title: "Crie o evento",
      description:
        "Receba um QR Code único para compartilhar com seus convidados. Simples, rápido e sem complicações.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "2",
      icon: Upload,
      title: "Convidados enviam",
      description:
        "Eles escaneiam e enviam as fotos e vídeos direto do celular. Sem app, sem cadastro, sem dor de cabeça.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "3",
      icon: Images,
      title: "Tudo reunido",
      description:
        "Todas as fotos e vídeos ficam em um só lugar, organizados e prontos para você aproveitar.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="relative py-section overflow-hidden bg-gradient-to-br from-[#eef4ff] via-shareday-white to-[#e9f7ff]"
    >
      {/* Animated background elements */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div
        className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-pulse"
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

      <div className="container relative z-10">
        <SectionHeader
          label="Como funciona"
          title={
            <>
              Três passos.{" "}
              <span className="text-gradient-primary">Zero complicação.</span>
            </>
          }
          description="Simples, rápido e eficiente. Veja como é fácil reunir todas as memórias do seu evento."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto relative">
          {steps.map((step, index) => (
            <Step
              key={step.number}
              {...step}
              delay={index * 0.2}
              isHovered={hoveredIndex === index}
              onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
