import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/hooks/useToast";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import PageBanner from "@/components/ui/PageBanner";
import PageContainer from "@/components/ui/PageContainer";
import NameField from "@/components/forms/NameField";
import EmailField from "@/components/forms/EmailField";
import PhoneField from "@/components/forms/PhoneField";
import FormFieldWrapper from "@/components/forms/FormFieldWrapper";
import { contactSchema, type ContactFormData } from "@/schemas/contact.schema";

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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
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

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    reset();
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
                onSubmit={handleSubmit(onSubmit)}
                className="bg-shareday-white rounded-2xl border border-border/50 p-8 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <NameField
                      control={control}
                      name="name"
                      label="Nome"
                      placeholder="Seu nome"
                      error={errors.name?.message}
                      disabled={isSubmitting}
                      required={true}
                    />

                    <EmailField
                      control={control}
                      name="email"
                      label="E-mail"
                      placeholder="seu@email.com"
                      error={errors.email?.message}
                      disabled={isSubmitting}
                      required={true}
                    />
                  </div>

                  <PhoneField
                    control={control}
                    name="phone"
                    label="Celular"
                    placeholder="(11) 98765-4321"
                    error={errors.phone?.message}
                    disabled={isSubmitting}
                    required={false}
                  />

                  <FormFieldWrapper
                    label="Assunto"
                    htmlFor="subject"
                    required={true}
                    error={errors.subject?.message}
                  >
                    <Controller
                      name="subject"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="subject"
                          placeholder="Como podemos ajudar?"
                          className={errors.subject ? "border-destructive" : ""}
                          disabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    label="Mensagem"
                    htmlFor="message"
                    required={true}
                    error={errors.message?.message}
                  >
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          id="message"
                          placeholder="Escreva sua mensagem aqui..."
                          rows={5}
                          className={`resize-none ${errors.message ? "border-destructive" : ""}`}
                          disabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />
                  </FormFieldWrapper>

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
