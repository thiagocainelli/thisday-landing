import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Camila Duarte",
    role: "Noiva | Evento 250 convidados",
    quote:
      "Em 15 minutos tínhamos um álbum inteiro, sem ninguém pedindo foto e vídeo no grupo.",
  },
  {
    name: "Lucas Fernandes",
    role: "Marketing | Summit corporativo",
    quote:
      "Coletamos 1.2k fotos e vídeos do público para o pós-evento em 1 dia. Zero fricção.",
  },
  {
    name: "Bia Moretti",
    role: "Produtora de eventos",
    quote:
      "QR no crachá, fotos e vídeos fluindo. Cliente aprovou as melhores em tempo real.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-section bg-gradient-to-br from-[#f9fbff] via-thisday-white to-[#eef4ff]">
      <div className="container">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary/70 mb-3">
              <Quote className="h-4 w-4" />
              Depoimentos reais
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Veja e confira as opiniões de quem já conhece
            </h2>
            <p className="text-muted-foreground mt-4">
              Histórias de quem já reuniu todas as fotos e vídeos do seu evento
              sem estresse.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="h-full rounded-2xl border border-border/50 bg-background shadow-sm p-5"
            >
              <div className="flex items-center gap-2 mb-3 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground font-medium leading-relaxed mb-4">
                “{item.quote}”
              </p>
              <div className="flex flex-col text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">
                  {item.name}
                </span>
                <span>{item.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
