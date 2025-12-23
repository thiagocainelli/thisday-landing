import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Control, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ArrowRight,
  FileText,
  Shield,
  AlertCircle,
  Package,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/useToast";
import { usePlans } from "@/hooks/usePlans";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatStorage } from "@/utils/storageFormatter";
import { ReadPlansDto } from "@/types/plans.dto";
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import PageBanner from "@/components/ui/PageBanner";
import PageContainer from "@/components/ui/PageContainer";
import EventFormFields, {
  EventFormFieldsData,
} from "@/components/forms/EventFormFields";
import {
  eventFormSchema,
  type EventFormPublicData,
} from "@/schemas/event.schema";

type EventFormData = EventFormPublicData;

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedPlanUuid, setSelectedPlanUuid] = useState<string | null>(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingEventData, setPendingEventData] =
    useState<EventFormData | null>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const previousPlanUuidRef = useRef<string | null>(null);

  // Buscar planos da API
  const { data: plansData, isLoading: isLoadingPlans } = usePlans({
    page: 1,
    itemsPerPage: 100,
    search: undefined,
  });

  const activePlans = plansData?.data?.filter((plan) => plan.active);
  const hasInitializedPlanRef = useRef(false);

  // Pré-selecionar plano se vier da query string (apenas uma vez)
  useEffect(() => {
    if (!hasInitializedPlanRef.current && activePlans?.length > 0) {
      const planParam = searchParams.get("plan");
      if (planParam) {
        // Tentar encontrar plano por nome ou UUID
        const plan = activePlans.find(
          (p) =>
            p.name.toLowerCase() === planParam.toLowerCase() ||
            p.uuid === planParam
        );
        if (plan) {
          setSelectedPlanUuid(plan.uuid);
        }
      }
      hasInitializedPlanRef.current = true;
    }
  }, [searchParams, activePlans]);

  // Focar e scrollar para o primeiro campo quando um plano for selecionado
  useEffect(() => {
    // Só faz scroll/focus se o plano mudou de null para um valor (usuário selecionou)
    if (
      selectedPlanUuid &&
      previousPlanUuidRef.current !== selectedPlanUuid &&
      formCardRef.current
    ) {
      // Pequeno delay para garantir que o DOM esteja atualizado
      setTimeout(() => {
        formCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Focar no primeiro input após o scroll
        setTimeout(() => {
          const firstInput = document.getElementById(
            "fullName"
          ) as HTMLInputElement;
          if (firstInput) {
            firstInput.focus();
          }
        }, 300);
      }, 100);
    }

    // Atualizar a referência do plano anterior
    previousPlanUuidRef.current = selectedPlanUuid;
  }, [selectedPlanUuid]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
  });

  const onSubmit = (data: EventFormData) => {
    if (!selectedPlanUuid) {
      toast({
        title: "Plano não selecionado",
        description: "Por favor, escolha um plano antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    const plan = activePlans.find((p) => p.uuid === selectedPlanUuid);
    if (!plan) {
      toast({
        title: "Plano não encontrado",
        description: "O plano selecionado não foi encontrado.",
        variant: "destructive",
      });
      return;
    }

    // Salvar dados temporariamente e abrir modal de termos
    setPendingEventData(data);
    setIsTermsModalOpen(true);
  };

  const handleConfirmTerms = () => {
    if (!pendingEventData || !selectedPlanUuid) return;

    const plan = activePlans.find((p) => p.uuid === selectedPlanUuid);
    if (!plan) return;

    // Navegar para checkout com dados na URL ou state
    // Por enquanto, vamos passar via state do navigate
    const checkoutData = {
      planUuid: selectedPlanUuid,
      plan,
      eventData: { ...pendingEventData },
    };

    navigate("/checkout", {
      state: { checkoutData },
    });
  };

  const selectedPlanData =
    activePlans?.find((p) => p.uuid === selectedPlanUuid) || null;

  return (
    <>
      <SEO
        title="Criar Evento - shareday | Escolha seu plano e crie seu evento"
        description="Crie seu evento em poucos passos. Escolha o plano ideal, preencha os dados do evento e comece a coletar fotos com QR Code."
        keywords="criar evento, plano evento, QR code evento, coletar fotos evento"
        url="https://shareday.app/criar-evento"
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        <PageBanner title="Criar evento" backTo="/" />

        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
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
                    {isLoadingPlans ? (
                      <div className="text-center py-8 text-muted-foreground">
                        Carregando planos...
                      </div>
                    ) : activePlans.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4">
                        <div className="rounded-full bg-muted p-4 mb-4">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Nenhum plano disponível
                        </h3>
                        <p className="text-sm text-muted-foreground text-center max-w-md">
                          Não há planos ativos disponíveis no momento. Entre em
                          contato conosco para mais informações.
                        </p>
                      </div>
                    ) : (
                      <RadioGroup
                        value={selectedPlanUuid || undefined}
                        onValueChange={setSelectedPlanUuid}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {activePlans.map((plan) => (
                          <div key={plan.uuid}>
                            <RadioGroupItem
                              value={plan.uuid}
                              id={plan.uuid}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={plan.uuid}
                              className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-semibold">
                                  {plan.name}
                                </span>
                                {selectedPlanUuid === plan.uuid && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-foreground mb-1">
                                  {formatCurrencyBRL(plan.price)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {formatStorage(plan.capacityGB)} de
                                  armazenamento
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {plan.durationDays} dias
                                </div>

                                {plan.description && (
                                  <div className="text-sm text-muted-foreground mt-5 flex items-start gap-2">
                                    <Info className="min-h-4 min-w-4 text-muted-foreground" />
                                    {plan.description}
                                  </div>
                                )}
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </CardContent>
                </Card>

                {/* Dados do Evento */}
                <Card ref={formCardRef}>
                  <CardHeader>
                    <CardTitle>Dados do evento</CardTitle>
                    <CardDescription>
                      Informações sobre você e seu evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EventFormFields
                      control={control as Control<EventFormFieldsData>}
                      errors={errors as FieldErrors<EventFormFieldsData>}
                      disabled={isSubmitting}
                      showPlanSelection={false}
                    />
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
                            {formatStorage(selectedPlanData.capacityGB)} de
                            armazenamento • {selectedPlanData.durationDays} dias
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
                    disabled={
                      isSubmitting || !selectedPlanUuid || isLoadingPlans
                    }
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
        </PageContainer>
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
