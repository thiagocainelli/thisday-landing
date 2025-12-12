import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .optional(),
  role: z.enum(["admin", "manager", "support"]),
  isActive: z.boolean(),
});

export type UserFormData = z.infer<typeof userSchema>;

