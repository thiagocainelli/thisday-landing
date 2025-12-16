import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  emailSettingsSchema,
  type EmailSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import EmailField from "@/components/forms/EmailField";
import { Mail, Server, Lock, User } from "lucide-react";
import { Controller } from "react-hook-form";

interface EmailSettingsFormProps {
  onSuccess?: () => void;
}

const EmailSettingsForm = ({ onSuccess }: EmailSettingsFormProps) => {
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
  } = useForm<EmailSettingsFormData>({
    resolver: zodResolver(emailSettingsSchema),
    values: settings?.email
      ? {
          smtpHost: settings.email.smtpHost,
          smtpPort: settings.email.smtpPort,
          smtpUser: settings.email.smtpUser,
          smtpPassword: settings.email.smtpPassword,
          smtpSecure: settings.email.smtpSecure,
          smtpFromName: settings.email.smtpFromName,
        }
      : undefined,
  });

  const smtpSecure = watch("smtpSecure");

  const onSubmit = (data: EmailSettingsFormData) => {
    updateSettings(
      {
        email: {
          smtpHost: data.smtpHost,
          smtpPort: data.smtpPort,
          smtpUser: data.smtpUser,
          smtpPassword: data.smtpPassword,
          smtpSecure: data.smtpSecure,
          smtpFromName: data.smtpFromName,
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
          <Mail className="h-5 w-5" />
          Configurações de Email (SMTP)
        </CardTitle>
        <CardDescription>
          Configure o servidor SMTP para envio de emails automáticos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="smtpHost" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Servidor SMTP
            </Label>
            <Input
              id="smtpHost"
              placeholder="smtp.gmail.com"
              {...register("smtpHost")}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Endereço do servidor SMTP (ex: smtp.gmail.com, smtp.outlook.com)
            </p>
            {errors.smtpHost && (
              <p className="text-sm text-destructive">
                {errors.smtpHost.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpPort">Porta SMTP</Label>
              <Input
                id="smtpPort"
                type="number"
                min="1"
                max="65535"
                placeholder="587"
                {...register("smtpPort", { valueAsNumber: true })}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                Porta padrão: 587 (TLS) ou 465 (SSL)
              </p>
              {errors.smtpPort && (
                <p className="text-sm text-destructive">
                  {errors.smtpPort.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtpSecure" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                SSL/TLS
              </Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="smtpSecure"
                  checked={smtpSecure}
                  onCheckedChange={(checked) => setValue("smtpSecure", checked)}
                  disabled={isPending}
                />
                <Label htmlFor="smtpSecure" className="text-sm">
                  {smtpSecure ? "Habilitado" : "Desabilitado"}
                </Label>
              </div>
            </div>
          </div>

          <EmailField
            control={control}
            name="smtpUser"
            label="Usuário SMTP"
            error={errors.smtpUser?.message}
            disabled={isPending}
            showIcon={true}
            required={true}
          />

          <div className="space-y-2">
            <Label htmlFor="smtpPassword" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha SMTP
            </Label>
            <Input
              id="smtpPassword"
              type="password"
              {...register("smtpPassword")}
              disabled={isPending}
            />
            {errors.smtpPassword && (
              <p className="text-sm text-destructive">
                {errors.smtpPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtpFromName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome do Remetente
            </Label>
            <Input
              id="smtpFromName"
              placeholder="ShareDay"
              {...register("smtpFromName")}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Nome que aparecerá como remetente nos emails
            </p>
            {errors.smtpFromName && (
              <p className="text-sm text-destructive">
                {errors.smtpFromName.message}
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

export default EmailSettingsForm;

