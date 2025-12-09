import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Copy,
  Check,
  CreditCard,
  QrCode,
  Clock,
  CheckCircle2,
  Mail,
  MessageCircle,
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
import { useToast } from "@/hooks/use-toast";
import { applyPhoneMask } from "@/utils/phoneMask";
import CreditCard3D from "@/components/ui/CreditCard3D";

const cardFormSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Número do cartão inválido")
    .refine(
      (val) =>
        val.replace(/\s/g, "").length >= 13 &&
        val.replace(/\s/g, "").length <= 19,
      "Número do cartão inválido"
    ),
  cardName: z.string().min(3, "Nome no cartão é obrigatório"),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, "Data inválida (MM/AA)"),
  cardCvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
});

type CardFormData = z.infer<typeof cardFormSchema>;

type PaymentMethod = "pix" | "credit";

interface EventData {
  fullName: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  plan: {
    id: string;
    name: string;
    photos: string;
    duration: string;
    price: number;
    priceFormatted: string;
  };
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [installments, setInstallments] = useState<string>("1");
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<
    "cardNumber" | "cardName" | "cardExpiry" | "cardCvv" | null
  >(null);

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
    // Carregar dados do evento do localStorage
    const stored = localStorage.getItem("eventData");
    if (!stored) {
      navigate("/criar-evento");
      return;
    }
    setEventData(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    if (isPixModalOpen && paymentMethod === "pix") {
      // Gerar código Pix simulado (em produção, viria da API)
      setPixCode(
        "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913thisday EVENTO6009SAO PAULO62070503***6304"
      );
      setTimeLeft(600);
    }
  }, [isPixModalOpen, paymentMethod]);

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
    if (!eventData) return 0;
    const basePrice = eventData.plan.price;
    if (installmentCount <= 3) {
      return basePrice / installmentCount;
    }
    // Juros de 2.5% ao mês após 3x (compostos)
    const interestRate = 0.025;
    const totalWithInterest =
      basePrice * Math.pow(1 + interestRate, installmentCount - 3);
    return totalWithInterest / installmentCount;
  };

  const getTotalWithInstallments = () => {
    if (!eventData) return 0;
    const count = parseInt(installments);
    if (count <= 3) {
      return eventData.plan.price;
    }
    const installmentValue = calculateInstallmentValue(count);
    return installmentValue * count;
  };

  const simulatePaymentApproval = () => {
    // Simular processamento de pagamento
    setTimeout(() => {
      setIsPaymentApproved(true);
      setIsPaymentModalOpen(true);
      // Limpar dados após mostrar modal
      setTimeout(() => {
        localStorage.removeItem("eventData");
      }, 100);
    }, 2000);
  };

  const onCardSubmit = (data: CardFormData) => {
    // Simular processamento de pagamento
    simulatePaymentApproval();
  };

  const onPixSubmit = () => {
    setIsPixModalOpen(true);
  };

  const handlePixPaymentApproval = () => {
    // Simular aprovação do pagamento Pix após o usuário "pagar"
    setIsPixModalOpen(false);
    simulatePaymentApproval();
  };

  if (!eventData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const installmentValue = calculateInstallmentValue(parseInt(installments));
  const totalWithInstallments = getTotalWithInstallments();

  return (
    <>
      <SEO
        title="Checkout - thisday | Finalize seu pagamento"
        description="Finalize o pagamento do seu evento. Aceitamos Pix e cartão de crédito com parcelamento em até 10x."
        keywords="checkout plataforma, pagamento evento, pix evento, cartão crédito evento"
        url="https://thisday.app/checkout"
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/criar-evento")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <span className="text-xl font-bold text-foreground">thisday</span>
            </div>
          </div>
        </header>

        <main className="container px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Formulário de Pagamento */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Finalizar pagamento
                </h1>
                <p className="text-muted-foreground">
                  Complete seu pagamento para criar o evento
                </p>
              </div>

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
                                    value.slice(0, 2) + "/" + value.slice(2, 4);
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
                            {Array.from({ length: 10 }, (_, i) => {
                              const count = i + 1;
                              const value = calculateInstallmentValue(count);
                              const total = value * count;
                              const hasInterest = count > 3;
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
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Processando..."
                          : "Finalizar pagamento"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Botão Pix */}
              {paymentMethod === "pix" && (
                <Button
                  onClick={onPixSubmit}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  Gerar código Pix
                  <QrCode className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Resumo Lateral */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plano</span>
                      <span className="font-medium">{eventData.plan.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fotos</span>
                      <span className="font-medium">
                        {eventData.plan.photos}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duração</span>
                      <span className="font-medium">
                        {eventData.plan.duration}
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
                            {installmentValue.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-foreground">
                            Total
                          </span>
                          <span className="text-xl font-bold text-foreground">
                            {totalWithInstallments.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                        {parseInt(installments) > 3 && (
                          <p className="text-xs text-muted-foreground">
                            * Juros aplicados após 3x
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">
                          Total
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          {eventData.plan.priceFormatted}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>

        {/* Modal Pix */}
        <Dialog open={isPixModalOpen} onOpenChange={setIsPixModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Pagamento via Pix</DialogTitle>
              <DialogDescription>
                Escaneie o QR Code ou copie o código para pagar
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
                <div className="flex justify-center p-4 bg-thisday-white rounded-lg border border-border">
                  <div className="w-full max-w-[200px] aspect-square bg-thisday-white flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                    <QrCode className="h-24 w-24 text-muted-foreground/30" />
                    {/* Em produção, aqui seria uma imagem real do QR Code */}
                  </div>
                </div>
              </div>

              {/* Código Pix */}
              <div className="space-y-2">
                <Label>Código Pix (copiar e colar)</Label>
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
                  Após o pagamento, seu evento será criado automaticamente. Você
                  receberá um e-mail de confirmação.
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
                Seu evento foi criado com sucesso
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Informações do evento */}
              {eventData && (
                <div className="bg-secondary/30 rounded-lg p-3 space-y-1">
                  <p className="font-semibold text-foreground text-sm">
                    {eventData.eventName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Plano {eventData.plan.name} • {eventData.plan.photos} fotos
                    • {eventData.plan.duration}
                  </p>
                </div>
              )}

              {/* Informações de envio em 2 colunas */}
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
                        {eventData?.email}
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
                        {applyPhoneMask(eventData?.phone || "")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Próximos passos */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm font-medium text-foreground mb-1.5">
                  Próximos passos:
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  <li>Verifique seu e-mail e WhatsApp</li>
                  <li>Compartilhe o QR Code com seus convidados</li>
                  <li>As fotos começarão a aparecer na galeria</li>
                </ul>
              </div>

              <Button
                variant="hero"
                className="w-full"
                size="lg"
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  navigate("/");
                }}
              >
                Entendi, obrigado!
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
