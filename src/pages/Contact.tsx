import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  Send,
  Instagram,
  Linkedin,
  Phone,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { applyPhoneMask } from "@/utils/phoneMask";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import PageBanner from "@/components/ui/PageBanner";
import PageContainer from "@/components/ui/PageContainer";

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
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      title: "E-mail",
      content: "contato@shareday.com.br",
      href: "mailto:contato@shareday.com.br",
    },
    {
      icon: Phone,
      title: "Celular",
      content: "(11) 98765-4321",
      href: "tel:+5511987654321",
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: "@shareday",
      href: "https://www.instagram.com/shareday",
      isExternal: true,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "/company/shareday",
      href: "https://www.linkedin.com/company/shareday",
      isExternal: true,
    },
    {
      icon: MessageSquare,
      title: "Tempo de resposta",
      content: "Geralmente respondemos em até 24 horas úteis",
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

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
        title="Contato - shareday | Fale conosco"
        description="Entre em contato com a equipe shareday. Tire suas dúvidas, envie sugestões ou solicite ajuda. Respondemos em até 24 horas úteis."
        keywords="contato shareday, suporte shareday, ajuda shareday, dúvidas shareday"
        url="https://shareday.app/contato"
      />
      <div className="min-h-screen bg-background">
        <PageBanner title="Fale conosco" backTo="/" />

        <PageContainer>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                className="bg-shareday-white rounded-2xl border border-border/50 p-8 shadow-sm"
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
                    <Label htmlFor="phone">Celular</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 98765-4321"
                      value={formData.phone}
                      onChange={(e) => {
                        const masked = applyPhoneMask(e.target.value);
                        setFormData((prev) => ({ ...prev, phone: masked }));
                      }}
                      maxLength={15}
                    />
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
        </PageContainer>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Contact;
