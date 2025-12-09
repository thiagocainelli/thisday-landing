import { Shield, Clock, Trash2, Eye } from "lucide-react";

const Security = () => {
  const points = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Fotos pertencem ao evento",
      description: "Acesso restrito apenas a quem tem o link.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Conteúdo temporário",
      description: "Definido pelo plano escolhido.",
    },
    {
      icon: <Trash2 className="h-5 w-5" />,
      title: "Remoção automática",
      description: "Arquivos deletados após o prazo.",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Transparência total",
      description: "Você sabe exatamente o que acontece.",
    },
  ];

  return (
    <section className="py-section bg-background">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
              Segurança e privacidade
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Seus dados, sua tranquilidade
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-xl bg-thisday-white border border-border/30"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
