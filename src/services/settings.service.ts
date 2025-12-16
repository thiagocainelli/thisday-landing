import { SettingsDto, UpdateSettingsDto } from "@/types/settings.dto";
import { delay } from "@/utils/delay";
import { getCurrentISOString } from "@/utils/idUtils";

// Mock de configurações iniciais
const mockSettings: SettingsDto = {
  id: "settings-1",
  payment: {
    maxInstallments: 10,
    interestRate: 0.025, // 2.5% ao mês
    freeInstallments: 3,
  },
  general: {
    companyName: "ShareDay",
    contactEmail: "contato@shareday.com.br",
    contactPhone: "(11) 98765-4321",
    supportEmail: "suporte@shareday.com.br",
  },
  upload: {
    maxFileSize: 50, // MB
    allowedFormats: ["jpg", "jpeg", "png", "mp4", "mov"],
    maxFilesPerEvent: 1000,
  },
  notifications: {
    sendEventCreatedEmail: true,
    sendPaymentConfirmationEmail: true,
    sendEventExpiredEmail: true,
    emailFrom: "noreply@shareday.com.br",
  },
  events: {
    defaultDuration: 15,
    defaultStatus: "active",
    autoExpireAfterDays: 30,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@shareday.com.br",
    smtpPassword: "",
    smtpSecure: true,
    smtpFromName: "ShareDay",
  },
  security: {
    sessionTimeout: 480, // 8 horas
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    requirePasswordChange: false,
    passwordChangeInterval: 90,
  },
  integrations: {
    googleAnalyticsId: "",
    facebookPixelId: "",
    instagramUrl: "https://www.instagram.com/shareday",
    linkedinUrl: "https://www.linkedin.com/company/shareday",
    webhookUrl: "",
    apiKey: "",
  },
  businessRules: {
    minPurchaseValue: 0,
    maxDiscountPercentage: 50,
    refundPeriodDays: 7,
    allowRefunds: true,
    maintenanceMode: false,
    maintenanceMessage: "",
  },
  updatedAt: "2024-01-01T00:00:00Z",
};

export const getSettings = async (): Promise<SettingsDto> => {
  await delay(400);
  return { ...mockSettings };
};

export const updateSettings = async (
  data: UpdateSettingsDto
): Promise<SettingsDto> => {
  await delay(600);

  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");

  // Atualizar apenas os campos fornecidos
  if (data.payment) {
    mockSettings.payment = {
      ...mockSettings.payment,
      ...data.payment,
    };
  }

  if (data.general) {
    mockSettings.general = {
      ...mockSettings.general,
      ...data.general,
    };
  }

  if (data.upload) {
    mockSettings.upload = {
      ...mockSettings.upload,
      ...data.upload,
    };
  }

  if (data.notifications) {
    mockSettings.notifications = {
      ...mockSettings.notifications,
      ...data.notifications,
    };
  }

  if (data.events) {
    mockSettings.events = {
      ...mockSettings.events,
      ...data.events,
    };
  }

  if (data.email) {
    mockSettings.email = {
      ...mockSettings.email,
      ...data.email,
    };
  }

  if (data.security) {
    mockSettings.security = {
      ...mockSettings.security,
      ...data.security,
    };
  }

  if (data.integrations) {
    mockSettings.integrations = {
      ...mockSettings.integrations,
      ...data.integrations,
    };
  }

  if (data.businessRules) {
    mockSettings.businessRules = {
      ...mockSettings.businessRules,
      ...data.businessRules,
    };
  }

  mockSettings.updatedAt = getCurrentISOString();
  mockSettings.updatedBy = authUser.name || authUser.email;

  return { ...mockSettings };
};

