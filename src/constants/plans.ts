export interface Plan {
  id: string;
  name: string;
  photos: string;
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
    photos: "100",
    duration: "7 dias",
    price: 29,
    description: "Ideal para eventos pequenos e íntimos",
    features: [
      "Até 100 fotos e vídeos",
      "Disponível por 7 dias",
      "QR Code personalizado",
      "Suporte por e-mail",
    ],
  },
  {
    id: "event",
    name: "Evento",
    photos: "200",
    duration: "15 dias",
    price: 49,
    featured: true,
    description: "O mais popular para a maioria dos eventos",
    features: [
      "Até 200 fotos e vídeos",
      "Disponível por 15 dias",
      "QR Code personalizado",
      "Suporte prioritário",
      "Estatísticas de acesso",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    photos: "500",
    duration: "30 dias",
    price: 89,
    description: "Para eventos grandes e corporativos",
    features: [
      "Até 500 fotos e vídeos",
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
