import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Send,
  Instagram,
  Linkedin,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  content: string;
  href?: string;
  isExternal?: boolean;
}

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  href?: string;
  isExternal?: boolean;
}

const ContactInfoCard = ({
  icon: Icon,
  title,
  content,
  href,
  isExternal = false,
}: ContactInfoCardProps) => {
  const contentElement = href ? (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="text-primary hover:underline"
    >
      {content}
    </a>
  ) : (
    <p className="text-muted-foreground">{content}</p>
  );

  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        {contentElement}
      </div>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      title: "E-mail",
      content: "contato@thisday.com.br",
      href: "mailto:contato@thisday.com.br",
    },
    {
      icon: MessageSquare,
      title: "Tempo de resposta",
      content: "Geralmente respondemos em até 24 horas úteis",
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: "@thisday",
      href: "https://www.instagram.com/thisday",
      isExternal: true,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "/company/thisday",
      href: "https://www.linkedin.com/company/thisday",
      isExternal: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <SEO
        title="Contato - thisday | Fale conosco"
        description="Entre em contato com a equipe thisday. Tire suas dúvidas, envie sugestões ou solicite ajuda. Respondemos em até 24 horas úteis."
        keywords="contato thisday, suporte thisday, ajuda thisday, dúvidas thisday"
        url="https://thisday.app/contato"
      />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <span className="text-xl font-bold text-foreground">thisday</span>
            </div>
          </div>
        </header>

        <main className="container px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Fale conosco
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui
                para ajudar. Envie sua mensagem e responderemos em breve.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <ContactInfoCard key={index} {...item} />
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-thisday-white rounded-2xl border border-border/50 p-8 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Como podemos ajudar?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Escreva sua mensagem aqui..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar mensagem
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Contact;
