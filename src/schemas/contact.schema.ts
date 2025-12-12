import { z } from "zod";
import { removePhoneMask } from "@/utils/phoneMask";

export const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => !value || removePhoneMask(value).length === 11,
      "Telefone deve ter 11 dígitos (DDD + número)"
    ),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

