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
  integrationSettingsSchema,
  type IntegrationSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import {
  Link2,
  BarChart3,
  Facebook,
  Instagram,
  Linkedin,
  Webhook,
  Key,
} from "lucide-react";

interface IntegrationSettingsFormProps {
  onSuccess?: () => void;
}

const IntegrationSettingsForm = ({
  onSuccess,
}: IntegrationSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IntegrationSettingsFormData>({
    resolver: zodResolver(integrationSettingsSchema),
    values: settings?.integrations
      ? {
          googleAnalyticsId: settings.integrations.googleAnalyticsId || "",
          facebookPixelId: settings.integrations.facebookPixelId || "",
          instagramUrl: settings.integrations.instagramUrl || "",
          linkedinUrl: settings.integrations.linkedinUrl || "",
          webhookUrl: settings.integrations.webhookUrl || "",
          apiKey: settings.integrations.apiKey || "",
        }
      : undefined,
  });

  const onSubmit = (data: IntegrationSettingsFormData) => {
    updateSettings(
      {
        integrations: {
          googleAnalyticsId: data.googleAnalyticsId || undefined,
          facebookPixelId: data.facebookPixelId || undefined,
          instagramUrl: data.instagramUrl || undefined,
          linkedinUrl: data.linkedinUrl || undefined,
          webhookUrl: data.webhookUrl || undefined,
          apiKey: data.apiKey || undefined,
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
          <Link2 className="h-5 w-5" />
          Configurações de Integrações
        </CardTitle>
        <CardDescription>
          Configure integrações com serviços externos e redes sociais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="googleAnalyticsId"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Google Analytics ID
            </Label>
            <Input
              id="googleAnalyticsId"
              placeholder="G-XXXXXXXXXX"
              {...register("googleAnalyticsId")}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              ID de medição do Google Analytics (opcional)
            </p>
            {errors.googleAnalyticsId && (
              <p className="text-sm text-destructive">
                {errors.googleAnalyticsId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="facebookPixelId"
              className="flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              Facebook Pixel ID
            </Label>
            <Input
              id="facebookPixelId"
              placeholder="123456789012345"
              {...register("facebookPixelId")}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              ID do Facebook Pixel para rastreamento (opcional)
            </p>
            {errors.facebookPixelId && (
              <p className="text-sm text-destructive">
                {errors.facebookPixelId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                URL do Instagram
              </Label>
              <Input
                id="instagramUrl"
                type="url"
                placeholder="https://www.instagram.com/shareday"
                {...register("instagramUrl")}
                disabled={isPending}
              />
              {errors.instagramUrl && (
                <p className="text-sm text-destructive">
                  {errors.instagramUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                URL do LinkedIn
              </Label>
              <Input
                id="linkedinUrl"
                type="url"
                placeholder="https://www.linkedin.com/company/shareday"
                {...register("linkedinUrl")}
                disabled={isPending}
              />
              {errors.linkedinUrl && (
                <p className="text-sm text-destructive">
                  {errors.linkedinUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookUrl" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              URL do Webhook
            </Label>
            <Input
              id="webhookUrl"
              type="url"
              placeholder="https://api.exemplo.com/webhook"
              {...register("webhookUrl")}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              URL para receber notificações de eventos (opcional)
            </p>
            {errors.webhookUrl && (
              <p className="text-sm text-destructive">
                {errors.webhookUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Chave de API
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="••••••••••••••••"
              {...register("apiKey")}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Chave de API para integrações externas (opcional)
            </p>
            {errors.apiKey && (
              <p className="text-sm text-destructive">
                {errors.apiKey.message}
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

export default IntegrationSettingsForm;

