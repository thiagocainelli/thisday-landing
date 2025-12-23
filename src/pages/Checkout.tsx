import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Copy,
  Check,
  CreditCard,
  QrCode,
  Clock,
  CheckCircle2,
  Mail,
  MessageCircle,
  FileText,
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
import SEO from "@/components/seo/SEO";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import PageBanner from "@/components/ui/PageBanner";
import PageContainer from "@/components/ui/PageContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import { useSettings } from "@/hooks/useSettings";
import { applyPhoneMask } from "@/utils/phoneMask";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatStorage } from "@/utils/storageFormatter";
import CreditCard3D from "@/components/ui/CreditCard3D";
import { cardFormSchema, type CardFormData } from "@/schemas/payment.schema";
import {
  processCheckout,
  processCheckoutAdditionalStorage,
} from "@/services/checkout.service";
import { removePhoneMask } from "@/utils/phoneMask";
import { ReadPlansDto } from "@/types/plans.dto";
import { EventFormPublicData } from "@/schemas/event.schema";
import {
  CheckoutAdditionalStorageResponseDto,
  CheckoutResponseDto,
} from "@/types/checkout.dto";
import { applyCpfMask, removeCpfMask } from "@/utils/cpfMask";
import { applyCepMask, removeCepMask } from "@/utils/cepMask";
import { getAddressByCep } from "@/services/viacep.service";

type PaymentMethod = "pix" | "credit" | "boleto";

interface CheckoutData {
  eventData: EventFormPublicData;
  planUuid: string;
  plan: ReadPlansDto;
}

interface AdditionalStoragePurchase {
  eventUuid: string;
  storageGB: number;
  eventName: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { data: settings } = useSettings();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [installments, setInstallments] = useState<string>("1");
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [additionalStoragePurchase, setAdditionalStoragePurchase] =
    useState<AdditionalStoragePurchase | null>(null);
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [checkoutResponse, setCheckoutResponse] = useState<
    CheckoutResponseDto | CheckoutAdditionalStorageResponseDto | null
  >(null);
  const [focusedField, setFocusedField] = useState<
    "cardNumber" | "cardName" | "cardExpiry" | "cardCvv" | null
  >(null);

  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [city, setCity] = useState("");
  const [stateUf, setStateUf] = useState("");

  const isAdditionalStorageCheckout =
    searchParams.get("type") === "additionalStorage";

  const eventId = searchParams.get("eventId");

  // Mutation para checkout de evento
  const checkoutMutation = useMutation({
    mutationFn: processCheckout,
    onSuccess: (data) => {
      setCheckoutResponse(data);
      setPixCode(data.paymentOrder.gatewayPaymentUrl || "");
      if (paymentMethod === "pix") {
        setIsPixModalOpen(true);
      } else {
        setIsPaymentApproved(true);
        setIsPaymentModalOpen(true);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao processar checkout",
        description: error.message || "Não foi possível processar o pagamento",
        variant: "destructive",
      });
    },
  });

  // Mutation para checkout de armazenamento adicional
  const additionalStorageMutation = useMutation({
    mutationFn: processCheckoutAdditionalStorage,
    onSuccess: (data) => {
      setCheckoutResponse(data);
      setPixCode(data.paymentOrder.gatewayPaymentUrl || "");
      if (paymentMethod === "pix") {
        setIsPixModalOpen(true);
      } else {
        setIsPaymentApproved(true);
        setIsPaymentModalOpen(true);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao processar checkout",
        description: error.message || "Não foi possível processar o pagamento",
        variant: "destructive",
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
  });

  const cardNumber = watch("cardNumber") || "";
  const cardName = watch("cardName") || "";
  const cardExpiry = watch("cardExpiry") || "";
  const cardCvv = watch("cardCvv") || "";

  useEffect(() => {
    if (isAdditionalStorageCheckout) {
      // Carregar dados da compra de armazenamento adicional do state
      const state = location.state as {
        additionalStorage?: AdditionalStoragePurchase;
      };
      if (!state?.additionalStorage) {
        toast({
          title: "Dados não encontrados",
          description: "Redirecionando...",
          variant: "destructive",
        });
        navigate(eventId ? `/galeria/${eventId}` : "/");
        return;
      }
      setAdditionalStoragePurchase(state.additionalStorage);
    } else {
      // Carregar dados do evento do state
      const state = location.state as { checkoutData?: CheckoutData };
      if (!state?.checkoutData) {
        toast({
          title: "Dados não encontrados",
          description: "Redirecionando para criar evento...",
          variant: "destructive",
        });
        navigate("/criar-evento");
        return;
      }
      setCheckoutData(state.checkoutData);
    }
  }, [navigate, isAdditionalStorageCheckout, eventId, location.state, toast]);

  useEffect(() => {
    if (isPixModalOpen && paymentMethod === "pix" && checkoutResponse) {
      // Código Pix vem da resposta da API
      setTimeLeft(600);
    }
  }, [isPixModalOpen, paymentMethod, checkoutResponse]);

  useEffect(() => {
    if (isPixModalOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPixModalOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código copiado!",
      description: "Cole o código Pix no app do seu banco",
    });
  };

  const calculateInstallmentValue = (installmentCount: number) => {
    if (!settings) return 0;

    // Determinar o preço base dependendo do tipo de checkout
    const basePrice = isAdditionalStorageCheckout
      ? (additionalStoragePurchase?.storageGB || 0) *
        (settings?.payment.pricePerGB || 2.5)
      : checkoutData?.plan.price || 0;

    if (basePrice === 0) return 0;

    const freeInstallments = settings.payment.freeInstallments;
    const interestRate = settings.payment.interestRate;

    if (installmentCount <= freeInstallments) {
      return basePrice / installmentCount;
    }
    // Juros compostos após as parcelas sem juros
    const totalWithInterest =
      basePrice *
      Math.pow(1 + interestRate, installmentCount - freeInstallments);
    return totalWithInterest / installmentCount;
  };

  const getTotalWithInstallments = () => {
    if (!settings) return 0;

    // Determinar o preço base dependendo do tipo de checkout
    const basePrice = isAdditionalStorageCheckout
      ? (additionalStoragePurchase?.storageGB || 0) *
        (settings.payment.pricePerGB || 2.5)
      : checkoutData?.plan.price || 0;

    if (basePrice === 0) return 0;

    const count = parseInt(installments);
    const freeInstallments = settings.payment.freeInstallments;

    if (count <= freeInstallments) {
      return basePrice;
    }
    const installmentValue = calculateInstallmentValue(count);
    return installmentValue * count;
  };

  const onCardSubmit = async (data: CardFormData) => {
    const document = removeCpfMask(cpf);
    if (!document) {
      toast({
        title: "CPF obrigatório",
        description: "Informe o CPF do comprador para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (isAdditionalStorageCheckout) {
      if (!additionalStoragePurchase) return;
      await additionalStorageMutation.mutateAsync({
        eventUuid: additionalStoragePurchase.eventUuid,
        storageGB: additionalStoragePurchase.storageGB,
        paymentMethod: "credit",
        installments: parseInt(installments),
        cardNumber: data.cardNumber.replace(/\s/g, ""),
        cardHolderName: data.cardName,
        cardExpiry: data.cardExpiry,
        cardCvv: data.cardCvv,
      });
    } else {
      if (!checkoutData) return;
      const eventDate = new Date(checkoutData.eventData.eventDate);
      const endDate = new Date(eventDate);
      endDate.setDate(endDate.getDate() + checkoutData.plan.durationDays);

      await checkoutMutation.mutateAsync({
        name: checkoutData.eventData.fullName,
        email: checkoutData.eventData.email,
        phone: removePhoneMask(checkoutData.eventData.phone),
        document,
        zipCode: removeCepMask(cep) || undefined,
        address: address || undefined,
        district: district || undefined,
        addressNumber: addressNumber || undefined,
        city: city || undefined,
        state: stateUf || undefined,
        eventName: checkoutData.eventData.eventName,
        eventDescription: checkoutData.eventData.eventDescription,
        eventType: checkoutData.eventData.eventType,
        eventStartDate: eventDate,
        eventEndDate: endDate,
        planUuid: checkoutData.planUuid,
        paymentMethod: "credit",
        installments: parseInt(installments),
        cardNumber: data.cardNumber.replace(/\s/g, ""),
        cardHolderName: data.cardName,
        cardExpiry: data.cardExpiry,
        cardCvv: data.cardCvv,
      });
    }
  };

  const onPixSubmit = async () => {
    const method = paymentMethod;

    const document = removeCpfMask(cpf);
    if (!document) {
      toast({
        title: "CPF obrigatório",
        description: "Informe o CPF do comprador para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (isAdditionalStorageCheckout) {
      if (!additionalStoragePurchase) return;
      await additionalStorageMutation.mutateAsync({
        eventUuid: additionalStoragePurchase.eventUuid,
        storageGB: additionalStoragePurchase.storageGB,
        paymentMethod: method,
      });
    } else {
      if (!checkoutData) return;
      const eventDate = new Date(checkoutData.eventData.eventDate);
      const endDate = new Date(eventDate);
      endDate.setDate(endDate.getDate() + checkoutData.plan.durationDays);

      await checkoutMutation.mutateAsync({
        name: checkoutData.eventData.fullName,
        email: checkoutData.eventData.email,
        phone: removePhoneMask(checkoutData.eventData.phone),
        document,
        zipCode: removeCepMask(cep) || undefined,
        address: address || undefined,
        district: district || undefined,
        addressNumber: addressNumber || undefined,
        city: city || undefined,
        state: stateUf || undefined,
        eventName: checkoutData.eventData.eventName,
        eventDescription: checkoutData.eventData.eventDescription,
        eventType: checkoutData.eventData.eventType,
        eventStartDate: eventDate,
        eventEndDate: endDate,
        planUuid: checkoutData.planUuid,
        paymentMethod: method,
      });
    }
  };

  const handlePixPaymentApproval = () => {
    // Simular aprovação do pagamento Pix após o usuário "pagar"
    setIsPixModalOpen(false);
    setIsPaymentApproved(true);
    setIsPaymentModalOpen(true);
  };

  if (!checkoutData && !isAdditionalStorageCheckout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const installmentValue = calculateInstallmentValue(parseInt(installments));
  const totalWithInstallments = getTotalWithInstallments();
  const isSubmittingCheckout =
    checkoutMutation.isPending || additionalStorageMutation.isPending;

  return (
    <>
      <SEO
        title="Checkout - shareday | Finalize seu pagamento"
        description="Finalize o pagamento do seu evento. Aceitamos Pix e cartão de crédito com parcelamento em até 10x."
        keywords="checkout plataforma, pagamento evento, pix evento, cartão crédito evento"
        url="https://shareday.app/checkout"
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen bg-background">
        <PageBanner
          title="Finalizar pagamento"
          backTo="/criar-evento"
          description={
            isAdditionalStorageCheckout
              ? "Compre armazenamento adicional para liberar seus arquivos com pagamento rápido e seguro."
              : "Complete o pagamento para concluir a criação do evento."
          }
        />

        <PageContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Dados do Comprador */}
            <div className="space-y-6 md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dados do comprador</CardTitle>
                  <CardDescription>
                    Informe seus dados para emissão do pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(applyCpfMask(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => setCep(applyCepMask(e.target.value))}
                      onBlur={async () => {
                        try {
                          const digits = removeCepMask(cep);
                          if (digits.length !== 8) return;
                          const data = await getAddressByCep(digits);
                          setAddress(data.logradouro || "");
                          setDistrict(data.bairro || "");
                          setCity(data.localidade || "");
                          setStateUf(data.uf || "");
                        } catch (error) {
                          toast({
                            title: "Erro ao buscar CEP",
                            description:
                              (error as Error).message ||
                              "Não foi possível buscar o endereço",
                            variant: "destructive",
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      placeholder="Rua, avenida, etc."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">Bairro</Label>
                    <Input
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressNumber">Número</Label>
                    <Input
                      id="addressNumber"
                      value={addressNumber}
                      onChange={(e) => setAddressNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stateUf">Estado</Label>
                    <Input
                      id="stateUf"
                      placeholder="UF"
                      value={stateUf}
                      onChange={(e) => setStateUf(e.target.value.toUpperCase())}
                      maxLength={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Formulário de Pagamento */}
              <div className="space-y-6">
                {/* Método de Pagamento */}
                <Card>
                  <CardHeader>
                    <CardTitle>Método de pagamento</CardTitle>
                    <CardDescription>Escolha como deseja pagar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) =>
                        setPaymentMethod(value as PaymentMethod)
                      }
                      className="space-y-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="pix"
                          id="pix"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="pix"
                          className="flex items-center gap-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <QrCode className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <p className="font-semibold">Pix</p>
                            <p className="text-sm text-muted-foreground">
                              Aprovação imediata
                            </p>
                          </div>
                          {paymentMethod === "pix" && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="credit"
                          id="credit"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="credit"
                          className="flex items-center gap-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <CreditCard className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <p className="font-semibold">Cartão de crédito</p>
                            <p className="text-sm text-muted-foreground">
                              Parcele em até 10x
                            </p>
                          </div>
                          {paymentMethod === "credit" && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="boleto"
                          id="boleto"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="boleto"
                          className="flex items-center gap-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <FileText className="h-6 w-6 text-primary" />
                          <div className="flex-1">
                            <p className="font-semibold">Boleto bancário</p>
                            <p className="text-sm text-muted-foreground">
                              Linha digitável para pagamento
                            </p>
                          </div>
                          {paymentMethod === "boleto" && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Formulário de Cartão */}
                {paymentMethod === "credit" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Dados do cartão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Cartão 3D */}
                      <CreditCard3D
                        cardNumber={cardNumber}
                        cardName={cardName}
                        cardExpiry={cardExpiry}
                        cardCvv={cardCvv}
                        focusedField={focusedField}
                      />

                      <form
                        onSubmit={handleSubmit(onCardSubmit)}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do cartão</Label>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            {...register("cardNumber", {
                              onChange: (e) => {
                                const value = e.target.value.replace(/\s/g, "");
                                const formatted =
                                  value.match(/.{1,4}/g)?.join(" ") || value;
                                setValue("cardNumber", formatted, {
                                  shouldValidate: true,
                                });
                              },
                            })}
                            className={
                              errors.cardNumber ? "border-destructive" : ""
                            }
                            onFocus={() => setFocusedField("cardNumber")}
                            onBlur={() => setFocusedField(null)}
                          />
                          {errors.cardNumber && (
                            <p className="text-sm text-destructive">
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no cartão</Label>
                          <Input
                            id="cardName"
                            placeholder="NOME COMPLETO"
                            {...register("cardName")}
                            className={
                              errors.cardName ? "border-destructive" : ""
                            }
                            onFocus={() => setFocusedField("cardName")}
                            onBlur={() => setFocusedField(null)}
                          />
                          {errors.cardName && (
                            <p className="text-sm text-destructive">
                              {errors.cardName.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Validade</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/AA"
                              maxLength={5}
                              {...register("cardExpiry", {
                                onChange: (e) => {
                                  let value = e.target.value.replace(/\D/g, "");
                                  if (value.length >= 2) {
                                    value =
                                      value.slice(0, 2) +
                                      "/" +
                                      value.slice(2, 4);
                                  }
                                  setValue("cardExpiry", value, {
                                    shouldValidate: true,
                                  });
                                },
                              })}
                              className={
                                errors.cardExpiry ? "border-destructive" : ""
                              }
                              onFocus={() => setFocusedField("cardExpiry")}
                              onBlur={() => setFocusedField(null)}
                            />
                            {errors.cardExpiry && (
                              <p className="text-sm text-destructive">
                                {errors.cardExpiry.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              placeholder="123"
                              maxLength={4}
                              {...register("cardCvv")}
                              className={
                                errors.cardCvv ? "border-destructive" : ""
                              }
                              onFocus={() => setFocusedField("cardCvv")}
                              onBlur={() => setFocusedField(null)}
                            />
                            {errors.cardCvv && (
                              <p className="text-sm text-destructive">
                                {errors.cardCvv.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select
                            value={installments}
                            onValueChange={setInstallments}
                          >
                            <SelectTrigger id="installments">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                {
                                  length:
                                    settings?.payment.maxInstallments ?? 10,
                                },
                                (_, i) => {
                                  const count = i + 1;
                                  const value =
                                    calculateInstallmentValue(count);
                                  const total = value * count;
                                  const hasInterest =
                                    count >
                                    (settings?.payment.freeInstallments ?? 3);
                                  return (
                                    <SelectItem
                                      key={count}
                                      value={count.toString()}
                                    >
                                      {count}x de{" "}
                                      {value.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                      {hasInterest && " (c/ juros)"} ={" "}
                                      {total.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting || isSubmittingCheckout}
                        >
                          {isSubmitting || isSubmittingCheckout
                            ? "Processando..."
                            : "Finalizar pagamento"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Botão Pix / Boleto */}
                {(paymentMethod === "pix" || paymentMethod === "boleto") && (
                  <Button
                    onClick={onPixSubmit}
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmittingCheckout}
                  >
                    {isSubmittingCheckout
                      ? "Processando..."
                      : paymentMethod === "pix"
                      ? "Gerar código Pix"
                      : "Gerar boleto bancário"}
                    {paymentMethod === "pix" ? (
                      <QrCode className="ml-2 h-4 w-4" />
                    ) : (
                      <FileText className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Resumo Lateral */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAdditionalStorageCheckout &&
                  additionalStoragePurchase &&
                  eventId ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Evento</span>
                          <span className="font-medium">
                            {additionalStoragePurchase.eventName}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Armazenamento adicional
                          </span>
                          <span className="font-medium">
                            {formatStorage(
                              additionalStoragePurchase?.storageGB || 0
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Preço por GB
                          </span>
                          <span className="font-medium">
                            {formatCurrencyBRL(
                              settings?.payment.pricePerGB || 2.5
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        {paymentMethod === "credit" &&
                        parseInt(installments) > 1 ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {installments}x de
                              </span>
                              <span className="font-medium">
                                {formatCurrencyBRL(installmentValue)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-foreground">
                                Total
                              </span>
                              <span className="text-xl font-bold text-foreground">
                                {formatCurrencyBRL(totalWithInstallments)}
                              </span>
                            </div>
                            {parseInt(installments) >
                              (settings?.payment.freeInstallments ?? 3) && (
                              <p className="text-xs text-muted-foreground">
                                * Juros aplicados após{" "}
                                {settings?.payment.freeInstallments ?? 3}x
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="font-semibold text-foreground">
                              Total
                            </span>
                            <span className="text-xl font-bold text-foreground">
                              {formatCurrencyBRL(
                                (additionalStoragePurchase?.storageGB || 0) *
                                  (settings?.payment.pricePerGB || 2.5)
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Plano</span>
                          <span className="font-medium">
                            {checkoutData?.plan.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Armazenamento
                          </span>
                          <span className="font-medium">
                            {checkoutData
                              ? formatStorage(checkoutData.plan.capacityGB)
                              : ""}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duração</span>
                          <span className="font-medium">
                            {checkoutData?.plan.durationDays} dias
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        {paymentMethod === "credit" &&
                        parseInt(installments) > 1 ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {installments}x de
                              </span>
                              <span className="font-medium">
                                {formatCurrencyBRL(installmentValue)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold text-foreground">
                                Total
                              </span>
                              <span className="text-xl font-bold text-foreground">
                                {formatCurrencyBRL(totalWithInstallments)}
                              </span>
                            </div>
                            {parseInt(installments) >
                              (settings?.payment.freeInstallments ?? 3) && (
                              <p className="text-xs text-muted-foreground">
                                * Juros aplicados após{" "}
                                {settings?.payment.freeInstallments ?? 3}x
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <span className="font-semibold text-foreground">
                              Total
                            </span>
                            <span className="text-xl font-bold text-foreground">
                              {formatCurrencyBRL(checkoutData?.plan.price || 0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </PageContainer>

        {/* Modal Pix */}
        <Dialog open={isPixModalOpen} onOpenChange={setIsPixModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {paymentMethod === "pix"
                  ? "Pagamento via Pix"
                  : "Pagamento via boleto"}
              </DialogTitle>
              <DialogDescription>
                {paymentMethod === "pix"
                  ? "Escaneie o QR Code ou copie o código para pagar"
                  : "Use o código abaixo para pagar seu boleto no internet banking ou aplicativo do banco"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Temporizador e QR Code em 2 colunas */}
              <div className="grid grid-cols-1 gap-4">
                {/* Temporizador */}
                <div className="flex items-center justify-center gap-2 p-4 bg-secondary/50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-lg font-mono font-semibold text-foreground">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* QR Code */}
                {paymentMethod === "pix" && (
                  <div className="flex justify-center p-4 bg-shareday-white rounded-lg border border-border">
                    <div className="w-full max-w-[200px] aspect-square bg-shareday-white flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                      <QrCode className="h-24 w-24 text-muted-foreground/30" />
                      {/* Em produção, aqui seria uma imagem real do QR Code */}
                    </div>
                  </div>
                )}
              </div>

              {/* Código Pix / Linha digitável */}
              <div className="space-y-2">
                <Label>
                  {paymentMethod === "pix"
                    ? "Código Pix (copiar e colar)"
                    : "Linha digitável do boleto"}
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={pixCode}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyPixCode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-secondary/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  {isAdditionalStorageCheckout
                    ? "Após o pagamento, o armazenamento adicional será liberado automaticamente e os arquivos ficarão sem marca d'água."
                    : "Após o pagamento, seu evento será criado automaticamente. Você receberá um e-mail de confirmação."}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsPixModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={handlePixPaymentApproval}
                >
                  Já paguei
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Confirmação de Pagamento Aprovado */}
        <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
                >
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </motion.div>
              </div>
              <DialogTitle className="text-center text-2xl">
                Pagamento aprovado!
              </DialogTitle>
              <DialogDescription className="text-center">
                {isAdditionalStorageCheckout
                  ? "Armazenamento adicional adquirido com sucesso"
                  : "Seu evento foi criado com sucesso"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Informações do evento */}
              {checkoutResponse && (
                <div className="bg-secondary/30 rounded-lg p-3 space-y-1">
                  <p className="font-semibold text-foreground text-sm">
                    {checkoutResponse.event?.name || "Evento criado"}
                  </p>
                  {checkoutResponse.event?.shareCode && (
                    <p className="text-xs text-muted-foreground">
                      Código: {checkoutResponse.event.shareCode}
                    </p>
                  )}
                </div>
              )}

              {/* Informações de envio em 2 colunas */}
              {!isAdditionalStorageCheckout && (
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-1 text-sm">
                        E-mail enviado
                      </p>
                      <p className="text-xs text-muted-foreground break-words">
                        Enviamos todas as informações do seu evento, incluindo o
                        QR Code, para{" "}
                        <span className="font-medium text-foreground">
                          {checkoutData?.eventData.email ||
                            (checkoutResponse &&
                              "user" in checkoutResponse &&
                              checkoutResponse.user?.email)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-1 text-sm">
                        WhatsApp enviado
                      </p>
                      <p className="text-xs text-muted-foreground break-words">
                        Também enviamos um link rápido via WhatsApp para{" "}
                        <span className="font-medium text-foreground">
                          {applyPhoneMask(checkoutData?.eventData.phone || "")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Próximos passos */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium text-foreground mb-1.5">
                  {isAdditionalStorageCheckout && eventId
                    ? "O que fazer agora:"
                    : "Próximos passos:"}
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  {isAdditionalStorageCheckout && eventId ? (
                    <>
                      <li>
                        O armazenamento adicional foi adicionado ao seu evento
                      </li>
                      <li>Os arquivos agora estão sem marca d'água</li>
                      <li>Você pode baixar os arquivos em alta qualidade</li>
                      <li>Volte para a galeria para visualizar as mudanças</li>
                    </>
                  ) : (
                    <>
                      <li>Verifique seu e-mail e WhatsApp</li>
                      <li>Compartilhe o QR Code com seus convidados</li>
                      <li>As fotos começarão a aparecer na galeria</li>
                    </>
                  )}
                </ul>
              </div>

              <Button
                variant="hero"
                className="w-full"
                size="lg"
                onClick={() => {
                  setIsPaymentModalOpen(false);

                  if (isAdditionalStorageCheckout && eventId) {
                    navigate(`/galeria/${eventId}`);
                  } else if (checkoutResponse?.event?.shareCode) {
                    navigate(`/galeria/${checkoutResponse.event.shareCode}`);
                  } else {
                    navigate("/");
                  }
                }}
              >
                {isAdditionalStorageCheckout && eventId
                  ? "Ir para a galeria"
                  : "Entendi, obrigado!"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Checkout;
