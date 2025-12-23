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
import { planSchema, type PlanFormData } from "@/schemas/plan.schema";
import { getSubmitButtonLabel } from "@/utils/formUtils";
import { cn } from "@/lib/utils";
import { CreatePlansDto } from "@/types/plans.dto";

interface PlanFormProps {
  planId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PlanForm = ({ planId, onSuccess, onCancel }: PlanFormProps) => {
  const { data: plan } = usePlan(planId);
  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();
  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();

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
      capacityGB: 0,
      durationDays: 0,
      price: 0,
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    if (plan) {
      reset({
        name: plan.name,
        capacityGB: plan.capacityGB,
        durationDays: plan.durationDays,
        price: plan.price,
        description: plan.description,
        active: plan.active,
      });
    }
  }, [plan, reset]);

  const onSubmit = (data: PlanFormData) => {
    if (planId) {
      updatePlan({ uuid: planId, data }, { onSuccess });
    } else {
      const createData: CreatePlansDto = data as CreatePlansDto;
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
          <Label htmlFor="capacityGB">Armazenamento (GB) *</Label>
          <Input
            id="capacityGB"
            type="number"
            min="1"
            {...register("capacityGB", { valueAsNumber: true })}
            className={cn(errors.capacityGB && "border-destructive")}
            disabled={isPending}
          />
          <p className="text-xs text-muted-foreground">
            Armazenamento disponível em GB (ex: 50, 100, 500, 1000)
          </p>
          {errors.capacityGB && (
            <p className="text-sm text-destructive">
              {errors.capacityGB.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duração (dias) *</Label>
          <Input
            id="duration"
            type="number"
            {...register("durationDays", { valueAsNumber: true })}
            className={cn(errors.durationDays && "border-destructive")}
            disabled={isPending}
          />
          {errors.durationDays && (
            <p className="text-sm text-destructive">
              {errors.durationDays.message}
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

        <div className="space-y-2">
          <Label htmlFor="active">Status</Label>
          <div className="flex items-center space-x-2">
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <Switch
                  id="active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              )}
            />
            <Label htmlFor="active" className="cursor-pointer">
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
