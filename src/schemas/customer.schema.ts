import { z } from "zod";
import { removePhoneMask } from "@/utils/phoneMask";

export const customerSchema = z.object({
  fullName: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (value) => removePhoneMask(value).length === 11,
      "Telefone deve ter 11 dígitos"
    ),
  document: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

