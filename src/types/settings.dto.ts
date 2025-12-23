export interface PaymentSettingsDto {
  maxInstallments: number;
  interestRate: number;
  freeInstallments: number;
  pricePerGB: number;
}

export interface GeneralSettingsDto {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  supportEmail: string;
}

export interface UploadSettingsDto {
  maxFileSize: number; // em MB
  allowedFormats: string[]; // ['jpg', 'jpeg', 'png', 'mp4', 'mov']
  maxFilesPerEvent: number;
}

export interface NotificationSettingsDto {
  sendEventCreatedEmail: boolean;
  sendPaymentConfirmationEmail: boolean;
  sendEventExpiredEmail: boolean;
  emailFrom: string;
}

export interface EventSettingsDto {
  defaultDuration: number; // dias
  defaultStatus: "active" | "pending";
  autoExpireAfterDays: number;
}

export interface EmailSettingsDto {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean; // SSL/TLS
  smtpFromName: string;
}

export interface SecuritySettingsDto {
  sessionTimeout: number; // minutos
  maxLoginAttempts: number;
  lockoutDuration: number; // minutos
  requirePasswordChange: boolean;
  passwordChangeInterval: number; // dias
}

export interface IntegrationSettingsDto {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  webhookUrl?: string;
  apiKey?: string;
}

export interface BusinessRulesSettingsDto {
  minPurchaseValue: number;
  maxDiscountPercentage: number;
  refundPeriodDays: number;
  allowRefunds: boolean;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
}

export interface SettingsDto {
  uuid: string;
  payment: PaymentSettingsDto;
  general: GeneralSettingsDto;
  upload: UploadSettingsDto;
  notifications: NotificationSettingsDto;
  events: EventSettingsDto;
  email: EmailSettingsDto;
  security: SecuritySettingsDto;
  integrations: IntegrationSettingsDto;
  businessRules: BusinessRulesSettingsDto;
  updatedAt: string;
  updatedBy?: string;
}

export interface UpdateSettingsDto {
  payment?: Partial<PaymentSettingsDto>;
  general?: Partial<GeneralSettingsDto>;
  upload?: Partial<UploadSettingsDto>;
  notifications?: Partial<NotificationSettingsDto>;
  events?: Partial<EventSettingsDto>;
  email?: Partial<EmailSettingsDto>;
  security?: Partial<SecuritySettingsDto>;
  integrations?: Partial<IntegrationSettingsDto>;
  businessRules?: Partial<BusinessRulesSettingsDto>;
}
