export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  version: "v1",
  timeout: 30000,
  endpoints: {
    auth: "/api/v1/auth",
    users: "/api/v1/users",
    customers: "/api/v1/customers",
    events: "/api/v1/events",
    plans: "/api/v1/plans",
    subscriptions: "/api/v1/subscriptions",
    paymentOrders: "/api/v1/paymentOrders",
    paymentTransactions: "/api/v1/paymentTransactions",
    storage: "/api/v1/storage",
    audits: "/api/v1/audits",
    errorLogs: "/api/v1/errorLogs",
    settings: "/api/v1/settings",
    checkout: "/api/v1/checkout",
    dashboard: "/api/v1/dashboard",
  },
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
