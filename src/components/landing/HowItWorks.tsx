import { QrCode, Upload, Images } from "lucide-react";

interface StepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const Step = ({ number, icon, title, description, delay }: StepProps) => (
  <div 
    className="flex flex-col items-center text-center p-6 group"
    style={{ animationDelay: delay }}
  >
    <div className="relative mb-6">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
        {number}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
      {description}
    </p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: <QrCode className="h-7 w-7" />,
      title: "Crie o evento",
      description: "Receba um QR Code único para compartilhar com seus convidados.",
    },
    {
      number: "2",
      icon: <Upload className="h-7 w-7" />,
      title: "Convidados enviam",
      description: "Eles escaneiam e enviam as fotos direto do celular.",
    },
    {
      number: "3",
      icon: <Images className="h-7 w-7" />,
      title: "Tudo reunido",
      description: "Todas as fotos ficam em um só lugar, naquele dia.",
    },
  ];

  return (
    <section id="como-funciona" className="py-section bg-thisday-white">
      <div className="container px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            Como funciona
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Três passos. Zero complicação.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Step
              key={step.number}
              {...step}
              delay={`${index * 100}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
