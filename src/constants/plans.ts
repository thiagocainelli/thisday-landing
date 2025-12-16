import { formatStorage } from "@/utils/storageFormatter";

export interface Plan {
  id: string;
  name: string;
  storage: number; // em GB
  storageFormatted: string; // formatado para exibição
  duration: string;
  price: number;
  featured?: boolean;
  description?: string;
  features: string[];
}

/**
 * Simulação de dados vindos do backend
 * Em produção, isso viria de uma API
 */
export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    storage: 50,
    storageFormatted: formatStorage(50),
    duration: "7 dias",
    price: 29.9,
    description: "Ideal para eventos pequenos e íntimos",
    features: [
      "50 GB de armazenamento",
      "Disponível por 7 dias",
      "QR Code personalizado",
      "Suporte por e-mail",
    ],
  },
  {
    id: "event",
    name: "Evento",
    storage: 100,
    storageFormatted: formatStorage(100),
    duration: "15 dias",
    price: 49.9,
    featured: true,
    description: "O mais popular para a maioria dos eventos",
    features: [
      "100 GB de armazenamento",
      "Disponível por 15 dias",
      "QR Code personalizado",
      "Suporte prioritário",
      "Estatísticas de acesso",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    storage: 500,
    storageFormatted: formatStorage(500),
    duration: "30 dias",
    price: 89.9,
    description: "Para eventos grandes e corporativos",
    features: [
      "500 GB de armazenamento",
      "Disponível por 30 dias",
      "QR Code personalizado",
      "Suporte prioritário 24/7",
      "Estatísticas detalhadas",
      "Exportação de dados",
      "Marca branca (opcional)",
    ],
  },
];

/**
 * Buscar plano por ID
 */
export const getPlanById = (id: string): Plan | undefined => {
  return PLANS.find((plan) => plan.id === id);
};
