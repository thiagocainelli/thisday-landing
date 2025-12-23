import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  paymentSettingsSchema,
  type PaymentSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/useToast";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import { CreditCard, Percent, Calendar, HardDrive } from "lucide-react";

interface PaymentSettingsFormProps {
  onSuccess?: () => void;
}

const PaymentSettingsForm = ({ onSuccess }: PaymentSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentSettingsFormData>({
    resolver: zodResolver(paymentSettingsSchema),
    values: settings?.payment
      ? {
          maxInstallments: settings.payment.maxInstallments,
          interestRate: settings.payment.interestRate,
          freeInstallments: settings.payment.freeInstallments,
          pricePerGB: settings.payment.pricePerGB,
        }
      : undefined,
  });

  const onSubmit = (data: PaymentSettingsFormData) => {
    updateSettings(
      {
        payment: {
          maxInstallments: data.maxInstallments,
          interestRate: data.interestRate,
          freeInstallments: data.freeInstallments,
          pricePerGB: data.pricePerGB,
        },
      },
      {
        onSuccess: () => {
          reset(data);
          onSuccess?.();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Configurações de Pagamento
        </CardTitle>
        <CardDescription>
          Configure as opções de parcelamento e taxas de juros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="maxInstallments"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Máximo de Parcelas
            </Label>
            <Input
              id="maxInstallments"
              type="number"
              min="1"
              max="24"
              {...register("maxInstallments", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Número máximo de parcelas disponíveis no checkout (1-24)
            </p>
            {errors.maxInstallments && (
              <p className="text-sm text-destructive">
                {errors.maxInstallments.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="freeInstallments"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Parcelas Sem Juros
            </Label>
            <Input
              id="freeInstallments"
              type="number"
              min="1"
              max="12"
              {...register("freeInstallments", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Número de parcelas sem cobrança de juros (1-12)
            </p>
            {errors.freeInstallments && (
              <p className="text-sm text-destructive">
                {errors.freeInstallments.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Taxa de Juros Mensal (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.001"
              min="0"
              max="0.1"
              {...register("interestRate", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Taxa de juros aplicada por mês após as parcelas sem juros (0-10%)
            </p>
            {errors.interestRate && (
              <p className="text-sm text-destructive">
                {errors.interestRate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerGB" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Preço por GB de Armazenamento (R$)
            </Label>
            <Input
              id="pricePerGB"
              type="number"
              step="0.1"
              min="0.1"
              max="100"
              {...register("pricePerGB", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Preço cobrado por cada GB de armazenamento adicional (R$ 0,10 - R$
              100,00)
            </p>
            {errors.pricePerGB && (
              <p className="text-sm text-destructive">
                {errors.pricePerGB.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" variant="hero" disabled={isPending}>
              {getLoadingButtonLabel(
                isPending,
                "Salvando...",
                "Salvar Configurações"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentSettingsForm;
