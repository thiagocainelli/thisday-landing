import { z } from "zod";
import { removePhoneMask } from "@/utils/phoneMask";

export const customerSchema = z.object({
  name: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (value) => !value || removePhoneMask(value).length === 11,
      "Telefone deve ter 11 dígitos"
    ),
  document: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
