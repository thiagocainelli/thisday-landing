import { useEffect, useState } from "react";
import { useForm, Control, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useCreateEvent, useUpdateEvent, useEvent } from "@/hooks/useEvents";
import { usePlans } from "@/hooks/usePlans";
import { removePhoneMask } from "@/utils/phoneMask";
import { CreateEventDto, UpdateEventDto } from "@/types/events.dto";
import EventFormFields, {
  EventFormFieldsData,
} from "@/components/forms/EventFormFields";
import { eventSchema, type EventFormData } from "@/schemas/event.schema";
import { EventTypeValue } from "@/constants/eventTypes";
import { getSubmitButtonLabel } from "@/utils/formUtils";

interface EventFormProps {
  eventId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const EventForm = ({ eventId, onSuccess, onCancel }: EventFormProps) => {
  const { data: event } = useEvent(eventId);
  const { data: plans = [] } = usePlans();
  const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const planId = watch("planId");

  useEffect(() => {
    if (event) {
      reset({
        fullName: event.fullName,
        email: event.email,
        phone: event.phone,
        eventName: event.eventName,
        eventDate: event.eventDate.split("T")[0],
        eventType: event.eventType as EventTypeValue,
        planId: event.planId,
      });
      setSelectedPlanId(event.planId);
    }
  }, [event, reset]);

  const onSubmit = (data: EventFormData) => {
    if (eventId) {
      const updateData: UpdateEventDto = {
        id: eventId,
        fullName: data.fullName,
        email: data.email,
        phone: removePhoneMask(data.phone),
        eventName: data.eventName,
        eventDate: data.eventDate,
        eventType: data.eventType,
        planId: data.planId,
      };
      updateEvent(updateData, { onSuccess });
    } else {
      const createData: CreateEventDto = {
        fullName: data.fullName,
        email: data.email,
        phone: removePhoneMask(data.phone),
        eventName: data.eventName,
        eventDate: data.eventDate,
        eventType: data.eventType,
        planId: data.planId,
      };
      createEvent(createData, { onSuccess });
    }
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlanId(value);
    setValue("planId", value, { shouldValidate: true });
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <EventFormFields
        control={control as Control<EventFormFieldsData>}
        errors={errors as FieldErrors<EventFormFieldsData>}
        disabled={isPending}
        showPlanSelection={true}
        planId={planId || selectedPlanId}
        onPlanChange={handlePlanChange}
        plans={plans}
      />

      {errors.planId && (
        <p className="text-sm text-destructive">{errors.planId.message}</p>
      )}

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
