import { MessageSquare, Search, Puzzle } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      text: "Fotos se perdem no WhatsApp",
    },
    {
      icon: <Search className="h-5 w-5" />,
      text: "Ninguém reúne tudo depois do evento",
    },
    {
      icon: <Puzzle className="h-5 w-5" />,
      text: "Cada pessoa fica com um pedaço do dia",
    },
  ];

  return (
    <section className="py-section bg-secondary/30">
      <div className="container px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary/70 mb-4">
            O problema
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Você conhece essa história?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Depois de todo evento, as melhores fotos ficam espalhadas 
            em dezenas de celulares. E a maioria nunca é compartilhada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-foreground/80"
              >
                <div className="w-10 h-10 rounded-lg bg-thisday-white flex items-center justify-center text-primary">
                  {problem.icon}
                </div>
                <span className="text-sm font-medium">{problem.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
