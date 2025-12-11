import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como funciona a plataforma?",
    answer:
      "Crie um evento e receba um QR Code único. Convidados escaneiam e enviam fotos e vídeos direto do celular, sem app ou cadastro. As fotos ficam em uma galeria temporária que expira automaticamente conforme o plano (7, 15 ou 30 dias).",
  },
  {
    question: "Os convidados precisam baixar algum aplicativo?",
    answer:
      "Não. Basta escanear o QR Code com a câmera do celular e enviar pelo navegador. Funciona em qualquer smartphone, sem download.",
  },
  {
    question: "O que acontece com os arquivos após o término do período?",
    answer:
      "Os arquivos são automaticamente e permanentemente excluídas após o término do período contratado. Não mantemos cópias ou backups. Recomendamos baixar o que precisar antes do prazo.",
  },
  {
    question: "Posso usar a plataforma para eventos corporativos?",
    answer:
      "Sim. Use em ativações de marca, convenções e lançamentos. O QR pode estar em totens, crachás ou telas. Ideal para times de marketing/RP coletarem fotos rápido para redes sociais e relatórios.",
  },
  {
    question: "Como funciona o pagamento e posso cancelar?",
    answer: (
      <>
        Pagamento via Pix (aprovação imediata) ou cartão de crédito (até 10x,
        com juros após 3x). Reembolso em até 7 dias se o evento ainda não
        ocorreu. Após o início do período, não há reembolso. Veja nossos{" "}
        <Link to="/termos" className="text-primary hover:underline font-medium">
          Termos de Uso
        </Link>
        .
      </>
    ),
  },
];

const FaqSection = () => {
  return (
    <section className="py-section bg-gradient-to-br from-[#f5f7ff] via-shareday-white to-[#eef4ff]">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium tracking-wide uppercase text-primary/70">
              Perguntas frequentes
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Dúvidas comuns
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas rápidas sobre como usar a plataforma em eventos
            pessoais e corporativos.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-shareday-white rounded-xl border border-border/50 px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
