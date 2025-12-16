import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  storage: z.number().min(1, "Armazenamento deve ser maior que 0 GB"),
  duration: z.number().min(1, "Duração deve ser maior que 0"),
  price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
  description: z.string().optional(),
  features: z.array(z.string().min(1, "Feature não pode estar vazia")),
  isActive: z.boolean(),
});

export type PlanFormData = z.infer<typeof planSchema>;

