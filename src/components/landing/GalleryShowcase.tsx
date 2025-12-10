import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Clock,
  Users,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";

const galleryItems = [
  {
    event: "Casamento Ana & Pedro",
    type: "Evento Social",
    photos: 980,
    time: "2h",
    participants: 120,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    highlight: "Convidados enviaram em tempo real",
  },
  {
    event: "Festival Tech 2024",
    type: "Ativação de Marca",
    photos: 2450,
    time: "4h",
    participants: 800,
    image:
      "https://images.unsplash.com/photo-1508606572321-901ea443707f?auto=format&fit=crop&w=1200&q=80",
    highlight: "QR nos totens + crachás",
  },
  {
    event: "Summit Corporativo",
    type: "Evento B2B",
    photos: 1560,
    time: "6h",
    participants: 350,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    highlight: "Marketing aprovando ao vivo",
  },
];

const GalleryShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-section overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-secondary/15 to-[#e6f3ff]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary/70 mb-4"
          >
            <ImageIcon className="h-4 w-4" />
            Resultados reais
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Centenas de fotos e vídeos em{" "}
            <span className="text-gradient-primary">minutos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Veja como nossos clientes reúnem memórias coletivas de forma rápida
            e organizada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galleryItems.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full rounded-3xl bg-white shadow-xl hover:shadow-2xl overflow-hidden border border-border/30"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.event}
                      className="w-full h-full object-cover"
                      animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary shadow-md">
                        {item.type}
                      </span>
                    </div>

                    {/* Main metric overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end gap-3">
                        <div>
                          <motion.div
                            className="text-5xl font-bold text-white mb-1"
                            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                          >
                            {item.photos.toLocaleString()}
                          </motion.div>
                          <p className="text-xs text-white/80 uppercase tracking-wider">
                            fotos e vídeos coletados
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Event name */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {item.event}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {item.highlight}
                      </p>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {item.time}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tempo total
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {item.participants}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Participantes
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Performance indicator */}
                    <div className="flex items-center gap-2 pt-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">
                        Média de {Math.round(item.photos / item.participants)}{" "}
                        arquivos por pessoa
                      </span>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
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

export default GalleryShowcase;
