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
  securitySettingsSchema,
  type SecuritySettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import { Shield, Clock, Lock, AlertTriangle } from "lucide-react";

interface SecuritySettingsFormProps {
  onSuccess?: () => void;
}

const SecuritySettingsForm = ({ onSuccess }: SecuritySettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<SecuritySettingsFormData>({
    resolver: zodResolver(securitySettingsSchema),
    values: settings?.security
      ? {
          sessionTimeout: settings.security.sessionTimeout,
          maxLoginAttempts: settings.security.maxLoginAttempts,
          lockoutDuration: settings.security.lockoutDuration,
          requirePasswordChange: settings.security.requirePasswordChange,
          passwordChangeInterval: settings.security.passwordChangeInterval,
        }
      : undefined,
  });

  const requirePasswordChange = watch("requirePasswordChange");

  const onSubmit = (data: SecuritySettingsFormData) => {
    updateSettings(
      {
        security: {
          sessionTimeout: data.sessionTimeout,
          maxLoginAttempts: data.maxLoginAttempts,
          lockoutDuration: data.lockoutDuration,
          requirePasswordChange: data.requirePasswordChange,
          passwordChangeInterval: data.passwordChangeInterval,
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
          <Shield className="h-5 w-5" />
          Configurações de Segurança
        </CardTitle>
        <CardDescription>
          Configure políticas de segurança e autenticação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tempo de Expiração de Sessão (minutos)
            </Label>
            <Input
              id="sessionTimeout"
              type="number"
              min="5"
              max="1440"
              {...register("sessionTimeout", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Tempo de inatividade antes de expirar a sessão (5-1440 minutos)
            </p>
            {errors.sessionTimeout && (
              <p className="text-sm text-destructive">
                {errors.sessionTimeout.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="maxLoginAttempts"
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Máximo de Tentativas de Login
              </Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                min="3"
                max="10"
                {...register("maxLoginAttempts", { valueAsNumber: true })}
                disabled={isPending}
              />
              {errors.maxLoginAttempts && (
                <p className="text-sm text-destructive">
                  {errors.maxLoginAttempts.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lockoutDuration"
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Duração do Bloqueio (minutos)
              </Label>
              <Input
                id="lockoutDuration"
                type="number"
                min="5"
                max="1440"
                {...register("lockoutDuration", { valueAsNumber: true })}
                disabled={isPending}
              />
              {errors.lockoutDuration && (
                <p className="text-sm text-destructive">
                  {errors.lockoutDuration.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="requirePasswordChange"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Exigir Troca de Senha Periódica
                </Label>
                <p className="text-sm text-muted-foreground">
                  Forçar usuários a alterarem senha periodicamente
                </p>
              </div>
              <Switch
                id="requirePasswordChange"
                checked={requirePasswordChange}
                onCheckedChange={(checked) =>
                  setValue("requirePasswordChange", checked)
                }
                disabled={isPending}
              />
            </div>

            {requirePasswordChange && (
              <div className="space-y-2 pl-6 border-l-2">
                <Label htmlFor="passwordChangeInterval">
                  Intervalo de Troca de Senha (dias)
                </Label>
                <Input
                  id="passwordChangeInterval"
                  type="number"
                  min="30"
                  max="365"
                  {...register("passwordChangeInterval", {
                    valueAsNumber: true,
                  })}
                  disabled={isPending}
                />
                <p className="text-xs text-muted-foreground">
                  Intervalo em dias para exigir troca de senha (30-365 dias)
                </p>
                {errors.passwordChangeInterval && (
                  <p className="text-sm text-destructive">
                    {errors.passwordChangeInterval.message}
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

export default SecuritySettingsForm;

