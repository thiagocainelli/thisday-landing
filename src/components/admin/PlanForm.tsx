import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import PriceInput from "@/components/ui/PriceInput";
import { X } from "lucide-react";
import { useCreatePlan, useUpdatePlan, usePlan } from "@/hooks/usePlans";
import { CreatePlanDto, UpdatePlanDto } from "@/types/plans.dto";
import { planSchema, type PlanFormData } from "@/schemas/plan.schema";
import { getSubmitButtonLabel } from "@/utils/formUtils";
import { cn } from "@/lib/utils";

interface PlanFormProps {
  planId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PlanForm = ({ planId, onSuccess, onCancel }: PlanFormProps) => {
  const { data: plan } = usePlan(planId);
  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();
  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();
  const [newFeature, setNewFeature] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      storage: 0,
      duration: 0,
      price: 0,
      description: "",
      features: [] as string[],
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as never,
  });

  useEffect(() => {
    if (plan) {
      reset({
        name: plan.name,
        storage: plan.storage,
        duration: plan.duration,
        price: plan.price,
        description: plan.description,
        features: plan.features,
        isActive: plan.isActive,
      });
    }
  }, [plan, reset]);

  const addFeature = () => {
    if (newFeature.trim()) {
      append(newFeature.trim());
      setNewFeature("");
    }
  };

  const onSubmit = (data: PlanFormData) => {
    if (planId) {
      const updateData: UpdatePlanDto = {
        id: planId,
        ...data,
      };
      updatePlan(updateData, { onSuccess });
    } else {
      const createData: CreatePlanDto = data as CreatePlanDto;
      createPlan(createData, { onSuccess });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            {...register("name")}
            className={cn(errors.name && "border-destructive")}
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="storage">Armazenamento (GB) *</Label>
          <Input
            id="storage"
            type="number"
            min="1"
            {...register("storage", { valueAsNumber: true })}
            className={cn(errors.storage && "border-destructive")}
            disabled={isPending}
          />
          <p className="text-xs text-muted-foreground">
            Armazenamento disponível em GB (ex: 50, 100, 500, 1000)
          </p>
          {errors.storage && (
            <p className="text-sm text-destructive">{errors.storage.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duração (dias) *</Label>
          <Input
            id="duration"
            type="number"
            {...register("duration", { valueAsNumber: true })}
            className={cn(errors.duration && "border-destructive")}
            disabled={isPending}
          />
          {errors.duration && (
            <p className="text-sm text-destructive">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$) *</Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <PriceInput
                id="price"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setValue("price", value, { shouldValidate: true });
                }}
                error={!!errors.price}
                disabled={isPending}
              />
            )}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2 col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register("description")}
            disabled={isPending}
          />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Funcionalidades *</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Adicionar funcionalidade"
                disabled={isPending}
              />
              <Button type="button" onClick={addFeature} disabled={isPending}>
                Adicionar
              </Button>
            </div>
            <div className="space-y-1">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    {...register(`features.${index}` as const)}
                    disabled={isPending}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={isPending}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {errors.features && (
              <p className="text-sm text-destructive">
                {errors.features.message ||
                  "Adicione pelo menos uma funcionalidade"}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="isActive">Status</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              {...register("isActive")}
              disabled={isPending}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Ativo
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="hero" disabled={isPending}>
          {getSubmitButtonLabel(isPending, planId)}
        </Button>
      </div>
    </form>
  );
};

export default PlanForm;
