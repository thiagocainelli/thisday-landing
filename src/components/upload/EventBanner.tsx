import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface EventBannerProps {
  eventName: string;
}

const EventBanner = ({ eventName }: EventBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-shareday-gradient text-white"
    >
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"
        />
      </div>

      {/* Conteúdo do banner */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Camera className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {eventName || "Carregando..."}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base md:text-lg text-white/90 max-w-2xl mx-auto"
          >
            Compartilhe suas memórias conosco! Envie fotos e vídeos do evento.
          </motion.p>

          {/* Decoração inferior */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="mt-8 h-1 bg-white/30 rounded-full max-w-md mx-auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default EventBanner;
