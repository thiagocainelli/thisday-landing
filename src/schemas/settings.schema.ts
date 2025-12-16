import { z } from "zod";

export const paymentSettingsSchema = z.object({
  maxInstallments: z
    .number()
    .min(1, "Mínimo de 1 parcela")
    .max(24, "Máximo de 24 parcelas"),
  interestRate: z
    .number()
    .min(0, "Taxa de juros não pode ser negativa")
    .max(0.1, "Taxa de juros máxima é 10%"),
  freeInstallments: z
    .number()
    .min(1, "Mínimo de 1 parcela sem juros")
    .max(12, "Máximo de 12 parcelas sem juros"),
});

export const generalSettingsSchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório"),
  contactEmail: z.string().email("Email inválido"),
  contactPhone: z.string().min(1, "Telefone é obrigatório"),
  supportEmail: z.string().email("Email inválido"),
});

export const uploadSettingsSchema = z.object({
  maxFileSize: z
    .number()
    .min(1, "Tamanho mínimo de 1 MB")
    .max(500, "Tamanho máximo de 500 MB"),
  allowedFormats: z
    .array(z.string())
    .min(1, "Pelo menos um formato deve ser permitido"),
  maxFilesPerEvent: z
    .number()
    .min(1, "Mínimo de 1 arquivo")
    .max(10000, "Máximo de 10000 arquivos"),
});

export const notificationSettingsSchema = z.object({
  sendEventCreatedEmail: z.boolean(),
  sendPaymentConfirmationEmail: z.boolean(),
  sendEventExpiredEmail: z.boolean(),
  emailFrom: z.string().email("Email inválido"),
});

export const eventSettingsSchema = z.object({
  defaultDuration: z
    .number()
    .min(1, "Duração mínima de 1 dia")
    .max(365, "Duração máxima de 365 dias"),
  defaultStatus: z.enum(["active", "pending"]),
  autoExpireAfterDays: z
    .number()
    .min(1, "Mínimo de 1 dia")
    .max(365, "Máximo de 365 dias"),
});

export type PaymentSettingsFormData = z.infer<typeof paymentSettingsSchema>;
export type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;
export type UploadSettingsFormData = z.infer<typeof uploadSettingsSchema>;
export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;
export const emailSettingsSchema = z.object({
  smtpHost: z.string().min(1, "Host SMTP é obrigatório"),
  smtpPort: z
    .number()
    .min(1, "Porta deve ser maior que 0")
    .max(65535, "Porta inválida"),
  smtpUser: z.string().email("Email inválido"),
  smtpPassword: z.string().min(1, "Senha é obrigatória"),
  smtpSecure: z.boolean(),
  smtpFromName: z.string().min(1, "Nome do remetente é obrigatório"),
});

export const securitySettingsSchema = z.object({
  sessionTimeout: z
    .number()
    .min(5, "Tempo mínimo de 5 minutos")
    .max(1440, "Tempo máximo de 24 horas"),
  maxLoginAttempts: z
    .number()
    .min(3, "Mínimo de 3 tentativas")
    .max(10, "Máximo de 10 tentativas"),
  lockoutDuration: z
    .number()
    .min(5, "Duração mínima de 5 minutos")
    .max(1440, "Duração máxima de 24 horas"),
  requirePasswordChange: z.boolean(),
  passwordChangeInterval: z
    .number()
    .min(30, "Intervalo mínimo de 30 dias")
    .max(365, "Intervalo máximo de 365 dias"),
});

export const integrationSettingsSchema = z.object({
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  instagramUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  linkedinUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  webhookUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  apiKey: z.string().optional(),
});

export const businessRulesSettingsSchema = z.object({
  minPurchaseValue: z
    .number()
    .min(0, "Valor mínimo não pode ser negativo"),
  maxDiscountPercentage: z
    .number()
    .min(0, "Desconto mínimo é 0%")
    .max(100, "Desconto máximo é 100%"),
  refundPeriodDays: z
    .number()
    .min(0, "Período mínimo é 0 dias")
    .max(90, "Período máximo é 90 dias"),
  allowRefunds: z.boolean(),
  maintenanceMode: z.boolean(),
  maintenanceMessage: z.string().optional(),
});

export type PaymentSettingsFormData = z.infer<typeof paymentSettingsSchema>;
export type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;
export type UploadSettingsFormData = z.infer<typeof uploadSettingsSchema>;
export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;
export type EventSettingsFormData = z.infer<typeof eventSettingsSchema>;
export type EmailSettingsFormData = z.infer<typeof emailSettingsSchema>;
export type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;
export type IntegrationSettingsFormData = z.infer<
  typeof integrationSettingsSchema
>;
export type BusinessRulesSettingsFormData = z.infer<
  typeof businessRulesSettingsSchema
>;

