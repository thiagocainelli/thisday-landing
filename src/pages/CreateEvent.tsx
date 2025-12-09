import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Check,
  ArrowRight,
  FileText,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PLANS, getPlanById } from "@/constants/plans";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { applyPhoneMask, removePhoneMask } from "@/utils/phoneMask";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const eventFormSchema = z.object({
  fullName: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (value) => removePhoneMask(value).length === 11,
      "Telefone deve ter 11 dígitos (DDD + número)"
    ),
  eventName: z
    .string()
    .min(3, "Nome do evento deve ter pelo menos 3 caracteres"),
  eventDate: z.string().min(1, "Data do evento é obrigatória"),
});

type EventFormData = z.infer<typeof eventFormSchema>;

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingEventData, setPendingEventData] =
    useState<EventFormData | null>(null);

  // Pré-selecionar plano se vier da query string
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) {
      // Mapear nome do plano para ID
      const planMap: Record<string, string> = {
        básico: "basic",
        evento: "event",
        premium: "premium",
      };
      const planId = planMap[planParam.toLowerCase()];
      if (planId && PLANS.find((p) => p.id === planId)) {
        setSelectedPlan(planId);
      }
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
  });

  const onSubmit = (data: EventFormData) => {
    if (!selectedPlan) {
      toast({
        title: "Plano não selecionado",
        description: "Por favor, escolha um plano antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    const plan = getPlanById(selectedPlan);
    if (!plan) return;

    // Salvar dados temporariamente e abrir modal de termos
    setPendingEventData(data);
    setIsTermsModalOpen(true);
  };

  const handleConfirmTerms = () => {
    if (!pendingEventData || !selectedPlan) return;

    const plan = getPlanById(selectedPlan);
    if (!plan) return;

    // Salvar dados no localStorage para usar no checkout
    // Remover máscara do telefone antes de salvar
    const eventData = {
      ...pendingEventData,
      phone: removePhoneMask(pendingEventData.phone),
      plan: {
        ...plan,
        priceFormatted: formatCurrencyBRL(plan.price),
      },
    };
    localStorage.setItem("eventData", JSON.stringify(eventData));

    setIsTermsModalOpen(false);
    navigate("/checkout");
  };

  const selectedPlanData = getPlanById(selectedPlan || "");

  return (
    <>
      <SEO
        title="Criar Evento - thisday | Escolha seu plano e crie seu evento"
        description="Crie seu evento em poucos passos. Escolha o plano ideal, preencha os dados do evento e comece a coletar fotos com QR Code."
        keywords="criar evento, plano evento, QR code evento, coletar fotos evento"
        url="https://thisday.app/criar-evento"
        noindex={true}
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

        <main className="container px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Criar evento
              </h1>
              <p className="text-muted-foreground mb-8">
                Preencha os dados abaixo para criar seu evento
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Seleção de Plano */}
                <Card>
                  <CardHeader>
                    <CardTitle>Escolha o plano</CardTitle>
                    <CardDescription>
                      Selecione o plano ideal para o tamanho do seu evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedPlan || undefined}
                      onValueChange={setSelectedPlan}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {PLANS.map((plan) => (
                        <div key={plan.id}>
                          <RadioGroupItem
                            value={plan.id}
                            id={plan.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={plan.id}
                            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-semibold">
                                {plan.name}
                              </span>
                              {selectedPlan === plan.id && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-foreground mb-1">
                                {formatCurrencyBRL(plan.price)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Até {plan.photos} fotos
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {plan.duration}
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Dados do Evento */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do evento</CardTitle>
                    <CardDescription>
                      Informações sobre você e seu evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome completo *</Label>
                        <Input
                          id="fullName"
                          placeholder="Seu nome completo"
                          {...register("fullName")}
                          className={
                            errors.fullName ? "border-destructive" : ""
                          }
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="(00) 00000-0000"
                              value={field.value || ""}
                              onChange={(e) => {
                                const maskedValue = applyPhoneMask(
                                  e.target.value
                                );
                                field.onChange(maskedValue);
                              }}
                              onBlur={field.onBlur}
                              className={
                                errors.phone ? "border-destructive" : ""
                              }
                              maxLength={15}
                            />
                          )}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Data do evento *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          {...register("eventDate")}
                          className={
                            errors.eventDate ? "border-destructive" : ""
                          }
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {errors.eventDate && (
                          <p className="text-sm text-destructive">
                            {errors.eventDate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventName">Nome do evento *</Label>
                      <Input
                        id="eventName"
                        placeholder="Ex: Casamento Ana & Pedro"
                        {...register("eventName")}
                        className={errors.eventName ? "border-destructive" : ""}
                      />
                      {errors.eventName && (
                        <p className="text-sm text-destructive">
                          {errors.eventName.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Resumo do Plano Selecionado */}
                {selectedPlanData && (
                  <Card className="bg-secondary/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            Plano selecionado: {selectedPlanData.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedPlanData.photos} fotos •{" "}
                            {selectedPlanData.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            {formatCurrencyBRL(selectedPlanData.price)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Botão de Submit */}
                <div className="flex justify-end flex-col md:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="h-12"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting || !selectedPlan}
                  >
                    {isSubmitting
                      ? "Processando..."
                      : "Continuar para pagamento"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
        <ScrollToTopButton />

        {/* Modal de Confirmação de Termos */}
        <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    Confirmação de Termos e Políticas
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-1">
                    Leia e confirme sua aceitação antes de continuar
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Aviso Importante */}
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                      Importante
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Ao continuar, você confirma que leu, compreendeu e aceita
                      integralmente nossos Termos de Uso e Política de
                      Privacidade.
                    </p>
                  </div>
                </div>
              </div>

              {/* Texto Principal */}
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Termos de Uso
                  </h3>
                  <p>Ao criar um evento na plataforma, você concorda que:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>
                      Todas as fotos e vídeos enviados serão{" "}
                      <strong className="text-foreground">
                        automaticamente excluídos
                      </strong>{" "}
                      após o término do período contratado (7, 15 ou 30 dias)
                    </li>
                    <li>
                      Você é responsável por todo o conteúdo enviado e garante
                      que possui os direitos necessários
                    </li>
                    <li>
                      O serviço é temporário por design e não mantemos cópias
                      após a exclusão automática
                    </li>
                    <li>
                      Reembolsos podem ser solicitados até 7 dias após a
                      contratação, desde que o evento ainda não tenha ocorrido
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Política de Privacidade
                  </h3>
                  <p>Seus dados pessoais são tratados conforme a LGPD:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>
                      Coletamos apenas os dados necessários para fornecer o
                      serviço
                    </li>
                    <li>
                      Não vendemos, alugamos ou compartilhamos suas informações
                      com terceiros para fins de marketing
                    </li>
                    <li>
                      Implementamos medidas de segurança robustas para proteger
                      seus dados
                    </li>
                    <li>
                      Você pode exercer seus direitos de proteção de dados a
                      qualquer momento
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground font-medium mb-2">
                    Recomendação
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Recomendamos fortemente que você e seus convidados façam
                    backup de todas as fotos e vídeos desejadas antes do término
                    do período contratado, pois a exclusão é permanente e
                    irreversível.
                  </p>
                </div>
              </div>

              {/* Links para documentos */}
              <div className="flex md:flex-row flex-col gap-3 pt-2 border-t">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/termos" target="_blank">
                    <FileText className="h-4 w-4 mr-2" />
                    Ler Termos de Uso
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/privacidade" target="_blank">
                    <Shield className="h-4 w-4 mr-2" />
                    Ler Política de Privacidade
                  </Link>
                </Button>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsTermsModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                variant="hero"
                onClick={handleConfirmTerms}
                className="w-full sm:w-auto"
              >
                <Check className="h-4 w-4 mr-2" />
                Li e concordo com os termos
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateEvent;
