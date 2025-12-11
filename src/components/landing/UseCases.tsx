import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cake,
  Heart,
  Briefcase,
  Camera,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const cases = [
  {
    icon: <Cake className="h-6 w-6" />,
    title: "Aniversários e festas",
    description:
      "QR nos convites, fotos e vídeos fluindo em tempo real para você curtir depois.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Casamentos e noivados",
    description: "Todos os registros de amigos e família reunidos sem esforço.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Eventos corporativos",
    description:
      "Ativações, convenções e lançamentos com coleta rápida para marketing.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Fotógrafos e buffets",
    description:
      "Ofereça como add-on e entregue um fluxo de fotos e vídeos colaborativas.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Festivais e shows",
    description: "Engaje o público com QR em totens, telões e pulseiras.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: <PartyPopper className="h-6 w-6" />,
    title: "Feiras e estandes",
    description: "Leads + conteúdo gerado na hora para redes e pós-evento.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  },
];

const UseCases = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="relative overflow-hidden py-section bg-gradient-to-br from-[#f7f9ff] via-shareday-white to-[#eef4ff]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-12 w-72 h-72 bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-secondary/15 blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            Para quem é
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Perfeito para qualquer evento
          </h2>
          <p className="text-muted-foreground mt-3">
            De celebrações íntimas a ativações de marca, o shareday adapta-se a
            cada formato.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {cases.map((useCase, index) => (
                <CarouselItem
                  key={useCase.title}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-2xl border border-border/40 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={useCase.image}
                        alt={useCase.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm text-primary flex items-center justify-center shadow-md">
                          {useCase.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-foreground">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {useCase.description}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/90 backdrop-blur-sm border-border/50 hover:bg-white shadow-lg" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/90 backdrop-blur-sm border-border/50 hover:bg-white shadow-lg" />
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
