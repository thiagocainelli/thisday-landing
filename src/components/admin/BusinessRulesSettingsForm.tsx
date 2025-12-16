import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PriceInput from "@/components/ui/PriceInput";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  businessRulesSettingsSchema,
  type BusinessRulesSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import {
  DollarSign,
  Percent,
  RefreshCw,
  Wrench,
  AlertCircle,
} from "lucide-react";

interface BusinessRulesSettingsFormProps {
  onSuccess?: () => void;
}

const BusinessRulesSettingsForm = ({
  onSuccess,
}: BusinessRulesSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BusinessRulesSettingsFormData>({
    resolver: zodResolver(businessRulesSettingsSchema),
    values: settings?.businessRules
      ? {
          minPurchaseValue: settings.businessRules.minPurchaseValue,
          maxDiscountPercentage: settings.businessRules.maxDiscountPercentage,
          refundPeriodDays: settings.businessRules.refundPeriodDays,
          allowRefunds: settings.businessRules.allowRefunds,
          maintenanceMode: settings.businessRules.maintenanceMode,
          maintenanceMessage: settings.businessRules.maintenanceMessage || "",
        }
      : undefined,
  });

  const allowRefunds = watch("allowRefunds");
  const maintenanceMode = watch("maintenanceMode");

  const onSubmit = (data: BusinessRulesSettingsFormData) => {
    updateSettings(
      {
        businessRules: {
          minPurchaseValue: data.minPurchaseValue,
          maxDiscountPercentage: data.maxDiscountPercentage,
          refundPeriodDays: data.refundPeriodDays,
          allowRefunds: data.allowRefunds,
          maintenanceMode: data.maintenanceMode,
          maintenanceMessage: data.maintenanceMessage || undefined,
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
          <DollarSign className="h-5 w-5" />
          Regras de Negócio
        </CardTitle>
        <CardDescription>
          Configure valores mínimos, descontos, reembolsos e modo de manutenção
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="minPurchaseValue"
                className="flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" />
                Valor Mínimo de Compra (R$)
              </Label>
              <Controller
                name="minPurchaseValue"
                control={control}
                render={({ field }) => (
                  <PriceInput
                    id="minPurchaseValue"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("minPurchaseValue", value, {
                        shouldValidate: true,
                      });
                    }}
                    error={!!errors.minPurchaseValue}
                    disabled={isPending}
                  />
                )}
              />
              {errors.minPurchaseValue && (
                <p className="text-sm text-destructive">
                  {errors.minPurchaseValue.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="maxDiscountPercentage"
                className="flex items-center gap-2"
              >
                <Percent className="h-4 w-4" />
                Desconto Máximo (%)
              </Label>
              <Input
                id="maxDiscountPercentage"
                type="number"
                min="0"
                max="100"
                {...register("maxDiscountPercentage", {
                  valueAsNumber: true,
                })}
                disabled={isPending}
              />
              {errors.maxDiscountPercentage && (
                <p className="text-sm text-destructive">
                  {errors.maxDiscountPercentage.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="allowRefunds"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Permitir Reembolsos
                </Label>
                <p className="text-sm text-muted-foreground">
                  Permitir solicitação de reembolso pelos clientes
                </p>
              </div>
              <Switch
                id="allowRefunds"
                checked={allowRefunds}
                onCheckedChange={(checked) => setValue("allowRefunds", checked)}
                disabled={isPending}
              />
            </div>

            {allowRefunds && (
              <div className="space-y-2 pl-6 border-l-2">
                <Label htmlFor="refundPeriodDays">
                  Período para Reembolso (dias)
                </Label>
                <Input
                  id="refundPeriodDays"
                  type="number"
                  min="0"
                  max="90"
                  {...register("refundPeriodDays", { valueAsNumber: true })}
                  disabled={isPending}
                />
                <p className="text-xs text-muted-foreground">
                  Número de dias após a compra para permitir reembolso (0-90)
                </p>
                {errors.refundPeriodDays && (
                  <p className="text-sm text-destructive">
                    {errors.refundPeriodDays.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="maintenanceMode"
                  className="flex items-center gap-2"
                >
                  <Wrench className="h-4 w-4" />
                  Modo de Manutenção
                </Label>
                <p className="text-sm text-muted-foreground">
                  Bloquear acesso público durante manutenção
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={maintenanceMode}
                onCheckedChange={(checked) =>
                  setValue("maintenanceMode", checked)
                }
                disabled={isPending}
              />
            </div>

            {maintenanceMode && (
              <div className="space-y-2 pl-6 border-l-2">
                <Label
                  htmlFor="maintenanceMessage"
                  className="flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  Mensagem de Manutenção
                </Label>
                <Textarea
                  id="maintenanceMessage"
                  placeholder="Estamos em manutenção. Voltaremos em breve!"
                  {...register("maintenanceMessage")}
                  disabled={isPending}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Mensagem exibida aos usuários durante a manutenção
                </p>
                {errors.maintenanceMessage && (
                  <p className="text-sm text-destructive">
                    {errors.maintenanceMessage.message}
                  </p>
                )}
              </div>
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

export default BusinessRulesSettingsForm;
