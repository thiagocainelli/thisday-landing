import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateEvent, useUpdateEvent, useEvent } from "@/hooks/useEvents";
import { usePlans } from "@/hooks/usePlans";
import { useCustomers } from "@/hooks/useCustomers";
import { removePhoneMask } from "@/utils/phoneMask";
import { CreateEventsDto, UpdateEventsDto } from "@/types/events.dto";
import { eventSchema, type EventFormData } from "@/schemas/event.schema";
import { EventTypeValue, EVENT_TYPES } from "@/constants/eventTypes";
import { getSubmitButtonLabel } from "@/utils/formUtils";
import NameField from "@/components/forms/NameField";
import EmailField from "@/components/forms/EmailField";
import PhoneField from "@/components/forms/PhoneField";
import CpfField from "@/components/forms/CpfField";
import { applyCpfMask, removeCpfMask } from "@/utils/cpfMask";
import { applyCnpjMask, removeCnpjMask } from "@/utils/cnpjMask";
import DocumentField from "../forms/DocumentField";
import SearchableSelect from "@/components/forms/SearchableSelect";
import { ReadCustomersDto } from "@/types/customers.dto";
import { ReadPlansDto } from "@/types/plans.dto";
import { formatDateBR } from "@/utils/dateFormatters";

interface EventFormProps {
  eventId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const EventForm = ({ eventId, onSuccess, onCancel }: EventFormProps) => {
  const { data: event } = useEvent(eventId);
  const [customerSearch, setCustomerSearch] = useState("");
  const [planSearch, setPlanSearch] = useState("");

  const { data: plansData, isLoading: isLoadingPlans } = usePlans({
    page: 1,
    itemsPerPage: 15,
    search: planSearch || undefined,
  });
  const { data: customersData, isLoading: isLoadingCustomers } = useCustomers({
    page: 1,
    itemsPerPage: 15,
    search: customerSearch || undefined,
  });

  const plans = plansData?.data || [];
  const customers = customersData?.data || [];
  const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      customerOption: "new",
      durationDays: 1,
    },
  });

  const customerOption = watch("customerOption");
  const eventDate = watch("eventDate");
  const durationDays = watch("durationDays");

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const daysDiff = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      reset({
        fullName: "",
        email: "",
        phone: "",
        eventName: event.name || "",
        eventDate: startDate.toISOString().split("T")[0],
        durationDays: daysDiff || 1,
        eventType:
          (event.type as EventTypeValue) ||
          (EVENT_TYPES[0]?.value as EventTypeValue),
        planId: event.planUuid || "",
        customerOption: "existing",
        customerUuid: event.customerUuid || "",
        document: "",
      });
    }
  }, [event, reset]);

  const onSubmit = (data: EventFormData) => {
    const startDate = new Date(data.eventDate);
    const endDate = new Date(startDate);
    // Se dura 1 dia, termina no mesmo dia; se dura N dias, termina em startDate + (N-1) dias
    endDate.setDate(endDate.getDate() + (data.durationDays || 1) - 1);

    if (eventId) {
      const updateData: UpdateEventsDto = {
        name: data.eventName,
        startDate,
        endDate,
        planUuid: data.planId ?? undefined,
        type: data.eventType,
      };
      updateEvent({ uuid: eventId, data: updateData }, { onSuccess });
    } else {
      const createData: CreateEventsDto = {
        name: data.eventName,
        customer: {
          name: data.fullName,
          email: data.email,
          phoneNumber: data.phone ? removePhoneMask(data.phone) : "",
          document: data.document
            ? data.document.length === 14
              ? removeCpfMask(data.document)
              : data.document.length === 18
              ? removeCnpjMask(data.document)
              : data.document
            : "",
        },
        startDate,
        endDate,
        status: "ACTIVE",
        shareCode: Math.random().toString(36).substring(2, 9),
        planUuid: data.planId ?? undefined,
        type: data.eventType,
        // Se cliente existente selecionado, enviar customerUuid, caso contrário backend cria automaticamente
        ...(data.customerOption === "existing" && data.customerUuid
          ? { customerUuid: data.customerUuid }
          : {}),
      };
      createEvent(createData, { onSuccess });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Seleção de Cliente */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Cliente *</Label>
          <Controller
            name="customerOption"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-6"
                disabled={event && !!event.customerUuid}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing" className="cursor-pointer">
                    Cliente existente
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="cursor-pointer">
                    Novo cliente
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.customerOption && (
            <p className="text-sm text-destructive">
              {errors.customerOption.message}
            </p>
          )}
        </div>

        {customerOption === "existing" && (
          <div className="space-y-2">
            <Label htmlFor="customerUuid">Selecionar Cliente *</Label>
            <Controller
              name="customerUuid"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={customers.map((customer: ReadCustomersDto) => ({
                    value: customer.uuid,
                    label:
                      customer.userName ||
                      customer.document ||
                      customer.phoneNumber ||
                      customer.uuid,
                  }))}
                  placeholder="Selecione um cliente"
                  searchPlaceholder="Buscar cliente..."
                  emptyMessage="Nenhum cliente encontrado"
                  disabled={isPending || (event && !!event.customerUuid)}
                  onSearch={setCustomerSearch}
                  isLoading={isLoadingCustomers}
                  className={errors.customerUuid ? "border-destructive" : ""}
                />
              )}
            />
            {errors.customerUuid && (
              <p className="text-sm text-destructive">
                {errors.customerUuid.message}
              </p>
            )}
          </div>
        )}

        {customerOption === "new" && (
          <div className="space-y-4">
            <NameField
              control={control}
              name="fullName"
              label="Nome completo"
              placeholder="Nome completo do cliente"
              error={errors.fullName?.message}
              disabled={isPending}
              required={true}
            />
            <EmailField
              control={control}
              name="email"
              label="E-mail"
              error={errors.email?.message}
              disabled={isPending}
              required={true}
            />
            <PhoneField
              control={control}
              name="phone"
              label="Telefone"
              error={errors.phone?.message}
              disabled={isPending}
              required={true}
            />
            <DocumentField
              control={control}
              name="document"
              label="CPF/CNPJ"
              error={errors.document?.message}
              disabled={isPending}
              required={true}
            />
          </div>
        )}
      </div>

      {/* Dados do Evento */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  disabled={isPending}
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
                  disabled={isPending}
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
            <Label htmlFor="durationDays">Duração (dias) *</Label>
            <Controller
              name="durationDays"
              control={control}
              render={({ field }) => (
                <Input
                  id="durationDays"
                  type="number"
                  min="1"
                  max="365"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className={errors.durationDays ? "border-destructive" : ""}
                  disabled={isPending}
                />
              )}
            />
            {errors.durationDays && (
              <p className="text-sm text-destructive">
                {errors.durationDays.message}
              </p>
            )}
            {eventDate && durationDays && (
              <p className="text-xs text-muted-foreground">
                Data de término: {formatDateBR(eventDate)}
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
                  disabled={isPending}
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

          <div className="space-y-2">
            <Label htmlFor="planId">Plano</Label>
            <Controller
              name="planId"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={plans.map((plan: ReadPlansDto) => ({
                    value: plan.uuid,
                    label: `${plan.name} - ${plan.capacityGB} GB - ${plan.durationDays} dias`,
                  }))}
                  placeholder="Selecione o plano"
                  searchPlaceholder="Buscar plano..."
                  emptyMessage="Nenhum plano encontrado"
                  disabled={isPending}
                  onSearch={setPlanSearch}
                  isLoading={isLoadingPlans}
                  className={errors.planId ? "border-destructive" : ""}
                />
              )}
            />
            {errors.planId && (
              <p className="text-sm text-destructive">
                {errors.planId.message}
              </p>
            )}
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
          {getSubmitButtonLabel(isPending, eventId)}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
