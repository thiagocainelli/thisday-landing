import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_TYPES } from "@/constants/eventTypes";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PhoneField from "./PhoneField";

export interface EventFormFieldsData {
  fullName: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventType: string;
}

interface EventFormFieldsProps {
  control: Control<EventFormFieldsData>;
  errors: FieldErrors<EventFormFieldsData>;
  disabled?: boolean;
  showPlanSelection?: boolean;
  planId?: string;
  onPlanChange?: (planId: string) => void;
  plans?: Array<{
    id: string;
    name: string;
    storage: number;
    storageFormatted: string;
    duration: number | string; // Aceita number ou string
    price: number;
  }>;
}

const EventFormFields = ({
  control,
  errors,
  disabled = false,
  showPlanSelection = false,
  planId,
  onPlanChange,
  plans = [],
}: EventFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NameField
          control={control as Control<EventFormFieldsData>}
          name="fullName"
          label="Nome completo"
          placeholder="Seu nome completo"
          error={errors.fullName?.message}
          disabled={disabled}
          required={true}
        />

        <EmailField
          control={control as Control<EventFormFieldsData>}
          name="email"
          label="E-mail"
          error={errors.email?.message}
          disabled={disabled}
          required={true}
        />

        <PhoneField
          control={control as Control<EventFormFieldsData>}
          name="phone"
          label="Telefone"
          error={errors.phone?.message}
          disabled={disabled}
          required={true}
        />

        <div className="space-y-2">
          <Label htmlFor="eventDate">Data do evento *</Label>
          <Controller
            name="eventDate"
            control={control}
            render={({ field }) => (
              <Input
                id="eventDate"
                type="date"
                {...field}
                className={errors.eventDate ? "border-destructive" : ""}
                disabled={disabled}
                min={new Date().toISOString().split("T")[0]}
              />
            )}
          />
          {errors.eventDate && (
            <p className="text-sm text-destructive">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventName">Nome do evento *</Label>
          <Controller
            name="eventName"
            control={control}
            render={({ field }) => (
              <Input
                id="eventName"
                placeholder="Ex: Casamento Ana & Pedro"
                {...field}
                className={errors.eventName ? "border-destructive" : ""}
                disabled={disabled}
              />
            )}
          />
          {errors.eventName && (
            <p className="text-sm text-destructive">
              {errors.eventName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventType">Tipo do evento *</Label>
          <Controller
            name="eventType"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                <SelectTrigger
                  id="eventType"
                  className={errors.eventType ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Selecione o tipo do evento" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && (
            <p className="text-sm text-destructive">
              {errors.eventType.message}
            </p>
          )}
        </div>

        {showPlanSelection && (
          <div className="space-y-2">
            <Label htmlFor="planId">Plano *</Label>
            <Select
              value={planId}
              onValueChange={onPlanChange}
              disabled={disabled}
            >
              <SelectTrigger id="planId">
                <SelectValue placeholder="Selecione o plano" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name} - {plan.storageFormatted} -{" "}
                    {typeof plan.duration === "number"
                      ? `${plan.duration} dias`
                      : plan.duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFormFields;
