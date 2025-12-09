import { Users, Zap, Smartphone, Clock, Timer } from "lucide-react";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
}

const Benefit = ({ icon, title }: BenefitProps) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-thisday-white border border-border/30">
    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <span className="font-medium text-foreground">{title}</span>
  </div>
);

const Benefits = () => {
  const benefits = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Fotos de todos reunidas",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Rápido e fácil de usar",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Nenhum app para instalar",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Funciona no momento do evento",
    },
    {
      icon: <Timer className="h-5 w-5" />,
      title: "As fotos expiram automaticamente",
    },
  ];

  return (
    <section className="py-section bg-secondary/20">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
              Benefícios
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Por que escolher THISDAY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Benefit key={index} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
