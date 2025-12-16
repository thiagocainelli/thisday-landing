import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  eventSettingsSchema,
  type EventSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { Controller } from "react-hook-form";

interface EventSettingsFormProps {
  onSuccess?: () => void;
}

const EventSettingsForm = ({ onSuccess }: EventSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<EventSettingsFormData>({
    resolver: zodResolver(eventSettingsSchema),
    values: settings?.events
      ? {
          defaultDuration: settings.events.defaultDuration,
          defaultStatus: settings.events.defaultStatus,
          autoExpireAfterDays: settings.events.autoExpireAfterDays,
        }
      : undefined,
  });

  const onSubmit = (data: EventSettingsFormData) => {
    updateSettings(
      {
        events: {
          defaultDuration: data.defaultDuration,
          defaultStatus: data.defaultStatus,
          autoExpireAfterDays: data.autoExpireAfterDays,
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
          <Calendar className="h-5 w-5" />
          Configurações de Eventos
        </CardTitle>
        <CardDescription>
          Configure valores padrão e regras para eventos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="defaultDuration"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Duração Padrão (dias)
            </Label>
            <Input
              id="defaultDuration"
              type="number"
              min="1"
              max="365"
              {...register("defaultDuration", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Duração padrão de um evento em dias (1-365)
            </p>
            {errors.defaultDuration && (
              <p className="text-sm text-destructive">
                {errors.defaultDuration.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultStatus" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Status Padrão
            </Label>
            <Controller
              name="defaultStatus"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger id="defaultStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-xs text-muted-foreground">
              Status padrão ao criar um novo evento
            </p>
            {errors.defaultStatus && (
              <p className="text-sm text-destructive">
                {errors.defaultStatus.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="autoExpireAfterDays"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Expirar Automaticamente Após (dias)
            </Label>
            <Input
              id="autoExpireAfterDays"
              type="number"
              min="1"
              max="365"
              {...register("autoExpireAfterDays", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Número de dias após os quais um evento será automaticamente
              expirado (1-365)
            </p>
            {errors.autoExpireAfterDays && (
              <p className="text-sm text-destructive">
                {errors.autoExpireAfterDays.message}
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

export default EventSettingsForm;
