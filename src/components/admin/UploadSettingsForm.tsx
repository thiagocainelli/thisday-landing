import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  uploadSettingsSchema,
  type UploadSettingsFormData,
} from "@/schemas/settings.schema";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { getLoadingButtonLabel } from "@/utils/formUtils";
import { Upload, File, HardDrive } from "lucide-react";

interface UploadSettingsFormProps {
  onSuccess?: () => void;
}

const ALLOWED_FORMATS = [
  { value: "jpg", label: "JPG" },
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "mp4", label: "MP4" },
  { value: "mov", label: "MOV" },
  { value: "webp", label: "WEBP" },
  { value: "gif", label: "GIF" },
];

const UploadSettingsForm = ({ onSuccess }: UploadSettingsFormProps) => {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<UploadSettingsFormData>({
    resolver: zodResolver(uploadSettingsSchema),
    values: settings?.upload
      ? {
          maxFileSize: settings.upload.maxFileSize,
          allowedFormats: settings.upload.allowedFormats,
          maxFilesPerEvent: settings.upload.maxFilesPerEvent,
        }
      : undefined,
  });

  const allowedFormats = watch("allowedFormats") || [];

  const toggleFormat = (format: string) => {
    const current = allowedFormats || [];
    if (current.includes(format)) {
      setValue(
        "allowedFormats",
        current.filter((f) => f !== format),
        { shouldValidate: true }
      );
    } else {
      setValue("allowedFormats", [...current, format], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: UploadSettingsFormData) => {
    updateSettings(
      {
        upload: {
          maxFileSize: data.maxFileSize,
          allowedFormats: data.allowedFormats,
          maxFilesPerEvent: data.maxFilesPerEvent,
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
          <Upload className="h-5 w-5" />
          Configurações de Upload
        </CardTitle>
        <CardDescription>
          Configure limites e formatos permitidos para upload de arquivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="maxFileSize" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Tamanho Máximo por Arquivo (MB)
            </Label>
            <Input
              id="maxFileSize"
              type="number"
              min="1"
              max="500"
              {...register("maxFileSize", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Tamanho máximo permitido para cada arquivo (1-500 MB)
            </p>
            {errors.maxFileSize && (
              <p className="text-sm text-destructive">
                {errors.maxFileSize.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="maxFilesPerEvent"
              className="flex items-center gap-2"
            >
              <File className="h-4 w-4" />
              Máximo de Arquivos por Evento
            </Label>
            <Input
              id="maxFilesPerEvent"
              type="number"
              min="1"
              max="10000"
              {...register("maxFilesPerEvent", { valueAsNumber: true })}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              Número máximo de arquivos que podem ser enviados por evento
              (1-10000)
            </p>
            {errors.maxFilesPerEvent && (
              <p className="text-sm text-destructive">
                {errors.maxFilesPerEvent.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <File className="h-4 w-4" />
              Formatos Permitidos
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ALLOWED_FORMATS.map((format) => (
                <div key={format.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`format-${format.value}`}
                    checked={allowedFormats.includes(format.value)}
                    onCheckedChange={() => toggleFormat(format.value)}
                    disabled={isPending}
                  />
                  <Label
                    htmlFor={`format-${format.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {format.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.allowedFormats && (
              <p className="text-sm text-destructive">
                {errors.allowedFormats.message}
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

export default UploadSettingsForm;
