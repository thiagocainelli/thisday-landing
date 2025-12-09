import { Check } from "lucide-react";

const SolutionSection = () => {
  const features = [
    "Sem login para convidados",
    "Funciona direto pelo celular",
    "Sem bagunça de grupos",
    "Temporário por design",
    "Tudo em um só lugar",
  ];

  return (
    <section className="py-section bg-thisday-white">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div>
              <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
                A solução
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                THISDAY resolve isso.
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Uma forma simples de reunir todas as fotos do seu evento. 
                Sem apps para baixar, sem cadastros complicados.
              </p>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center p-8">
                <div className="w-full max-w-xs bg-thisday-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-secondary rounded-xl flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <rect x="7" y="7" width="3" height="3" />
                        <rect x="14" y="7" width="3" height="3" />
                        <rect x="7" y="14" width="3" height="3" />
                        <rect x="14" y="14" width="3" height="3" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Escaneie para enviar fotos
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Casamento Ana & Pedro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
