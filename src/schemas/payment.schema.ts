import { z } from "zod";

export const cardFormSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Número do cartão inválido")
    .refine(
      (val) =>
        val.replace(/\s/g, "").length >= 13 &&
        val.replace(/\s/g, "").length <= 19,
      "Número do cartão inválido"
    ),
  cardName: z.string().min(3, "Nome no cartão é obrigatório"),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, "Data inválida (MM/AA)"),
  cardCvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
});

export type CardFormData = z.infer<typeof cardFormSchema>;
