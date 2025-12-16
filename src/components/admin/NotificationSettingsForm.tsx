import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  notificationSettingsSchema,
  type NotificationSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import EmailField from "@/components/forms/EmailField";
import { Bell, Mail } from "lucide-react";

interface NotificationSettingsFormProps {
  onSuccess?: () => void;
}

const NotificationSettingsForm = ({
  onSuccess,
}: NotificationSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    values: settings?.notifications
      ? {
          sendEventCreatedEmail: settings.notifications.sendEventCreatedEmail,
          sendPaymentConfirmationEmail:
            settings.notifications.sendPaymentConfirmationEmail,
          sendEventExpiredEmail: settings.notifications.sendEventExpiredEmail,
          emailFrom: settings.notifications.emailFrom,
        }
      : undefined,
  });

  const sendEventCreatedEmail = watch("sendEventCreatedEmail");
  const sendPaymentConfirmationEmail = watch("sendPaymentConfirmationEmail");
  const sendEventExpiredEmail = watch("sendEventExpiredEmail");

  const onSubmit = (data: NotificationSettingsFormData) => {
    updateSettings(
      {
        notifications: {
          sendEventCreatedEmail: data.sendEventCreatedEmail,
          sendPaymentConfirmationEmail: data.sendPaymentConfirmationEmail,
          sendEventExpiredEmail: data.sendEventExpiredEmail,
          emailFrom: data.emailFrom,
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
          <Bell className="h-5 w-5" />
          Configurações de Notificações
        </CardTitle>
        <CardDescription>
          Configure os emails automáticos enviados pela plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <EmailField
            control={control}
            name="emailFrom"
            label="Email Remetente"
            error={errors.emailFrom?.message}
            disabled={isPending}
            showIcon={true}
            required={true}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="sendEventCreatedEmail"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email de Evento Criado
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enviar email quando um novo evento for criado
                </p>
              </div>
              <Switch
                id="sendEventCreatedEmail"
                checked={sendEventCreatedEmail}
                onCheckedChange={(checked) =>
                  setValue("sendEventCreatedEmail", checked)
                }
                disabled={isPending}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="sendPaymentConfirmationEmail"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email de Confirmação de Pagamento
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enviar email quando um pagamento for confirmado
                </p>
              </div>
              <Switch
                id="sendPaymentConfirmationEmail"
                checked={sendPaymentConfirmationEmail}
                onCheckedChange={(checked) =>
                  setValue("sendPaymentConfirmationEmail", checked)
                }
                disabled={isPending}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="sendEventExpiredEmail"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email de Evento Expirado
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enviar email quando um evento expirar
                </p>
              </div>
              <Switch
                id="sendEventExpiredEmail"
                checked={sendEventExpiredEmail}
                onCheckedChange={(checked) =>
                  setValue("sendEventExpiredEmail", checked)
                }
                disabled={isPending}
              />
            </div>
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

export default NotificationSettingsForm;
