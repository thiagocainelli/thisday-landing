import { z } from "zod";
import { EVENT_TYPES, type EventTypeValue } from "@/constants/eventTypes";
import { removePhoneMask } from "@/utils/phoneMask";
import { removeCpfMask } from "@/utils/cpfMask";
import { removeCnpjMask } from "@/utils/cnpjMask";

export const eventSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Nome completo deve ter pelo menos 3 caracteres"),
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
    durationDays: z
      .number()
      .min(1, "Duração deve ser de pelo menos 1 dia")
      .max(365, "Duração não pode exceder 365 dias"),
    eventType: z.enum(
      EVENT_TYPES.map((type) => type.value) as [
        EventTypeValue,
        ...EventTypeValue[]
      ],
      {
        message: "Selecione o tipo do evento",
      }
    ),
    planId: z.string().optional(),
    customerOption: z.enum(["existing", "new"], {
      required_error: "Selecione uma opção de cliente",
    }),
    customerUuid: z.string().optional(),
    document: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.customerOption === "new") {
      if (!data.document || data.document.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Documento é obrigatório para novo cliente",
          path: ["document"],
        });
      } else {
        const digits = data.document
          ? data.document.length === 14
            ? removeCpfMask(data.document)
            : data.document.length === 18
            ? removeCnpjMask(data.document)
            : data.document
          : "";
        if (digits.length !== 11 && digits.length !== 14) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Documento deve ter 11 ou 14 dígitos",
            path: ["document"],
          });
        }
      }
    } else if (data.customerOption === "existing") {
      if (!data.customerUuid || data.customerUuid.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione um cliente existente",
          path: ["customerUuid"],
        });
      }
    }
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
  document: z.string().optional(),
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
  eventDescription: z.string().optional(),
});

export type EventFormPublicData = z.infer<typeof eventFormSchema>;
