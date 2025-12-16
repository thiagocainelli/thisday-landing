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
  generalSettingsSchema,
  type GeneralSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import EmailField from "@/components/forms/EmailField";
import { Building2, Mail, Phone } from "lucide-react";

interface GeneralSettingsFormProps {
  onSuccess?: () => void;
}

const GeneralSettingsForm = ({ onSuccess }: GeneralSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<GeneralSettingsFormData>({
    resolver: zodResolver(generalSettingsSchema),
    values: settings?.general
      ? {
          companyName: settings.general.companyName,
          contactEmail: settings.general.contactEmail,
          contactPhone: settings.general.contactPhone,
          supportEmail: settings.general.supportEmail,
        }
      : undefined,
  });

  const onSubmit = (data: GeneralSettingsFormData) => {
    updateSettings(
      {
        general: {
          companyName: data.companyName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          supportEmail: data.supportEmail,
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
          <Building2 className="h-5 w-5" />
          Configurações Gerais
        </CardTitle>
        <CardDescription>
          Informações gerais da empresa e contato
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Nome da Empresa
            </Label>
            <Input
              id="companyName"
              {...register("companyName")}
              disabled={isPending}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefone de Contato
            </Label>
            <Input
              id="contactPhone"
              {...register("contactPhone")}
              disabled={isPending}
              placeholder="(11) 98765-4321"
            />
            {errors.contactPhone && (
              <p className="text-sm text-destructive">
                {errors.contactPhone.message}
              </p>
            )}
          </div>

          <EmailField
            control={control}
            name="contactEmail"
            label="Email de Contato"
            error={errors.contactEmail?.message}
            disabled={isPending}
            showIcon={true}
            required={true}
          />

          <EmailField
            control={control}
            name="supportEmail"
            label="Email de Suporte"
            error={errors.supportEmail?.message}
            disabled={isPending}
            showIcon={true}
            required={true}
          />

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

export default GeneralSettingsForm;
