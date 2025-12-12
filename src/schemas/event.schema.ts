import { z } from "zod";
import { EVENT_TYPES, type EventTypeValue } from "@/constants/eventTypes";
import { removePhoneMask } from "@/utils/phoneMask";

export const eventSchema = z.object({
  fullName: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (value) => removePhoneMask(value).length === 11,
      "Telefone deve ter 11 dígitos"
    ),
  eventName: z
    .string()
    .min(3, "Nome do evento deve ter pelo menos 3 caracteres"),
  eventDate: z.string().min(1, "Data do evento é obrigatória"),
  eventType: z.enum(
    EVENT_TYPES.map((type) => type.value) as [
      EventTypeValue,
      ...EventTypeValue[]
    ],
    {
      message: "Selecione o tipo do evento",
    }
  ),
  planId: z.string().min(1, "Plano é obrigatório"),
});

export type EventFormData = z.infer<typeof eventSchema>;

// Schema para criação de evento público (sem planId no schema, validado separadamente)
export const eventFormSchema = z.object({
  fullName: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (value) => removePhoneMask(value).length === 11,
      "Telefone deve ter 11 dígitos (DDD + número)"
    ),
  eventName: z
    .string()
    .min(3, "Nome do evento deve ter pelo menos 3 caracteres"),
  eventDate: z.string().min(1, "Data do evento é obrigatória"),
  eventType: z.enum(
    EVENT_TYPES.map((type) => type.value) as [
      EventTypeValue,
      ...EventTypeValue[]
    ],
    {
      message: "Selecione o tipo do evento",
    }
  ),
});

export type EventFormPublicData = z.infer<typeof eventFormSchema>;
