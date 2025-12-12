import {
  CreatePlanDto,
  UpdatePlanDto,
  ListPlanDto,
  ReadPlanDto,
} from "@/types/plans.dto";
import { delay } from "@/utils/delay";
import { generateId, getCurrentISOString } from "@/utils/idUtils";
import { validateIndex, createNotFoundError } from "@/utils/errorUtils";
import { findById, findIndexById } from "@/utils/arrayUtils";

const mockPlans: ReadPlanDto[] = [
  {
    id: "basic",
    name: "Básico",
    photos: 100,
    duration: 7,
    price: 29.0,
    description: "Ideal para eventos pequenos e íntimos",
    isActive: true,
    totalSubscriptions: 45,
    totalRevenue: 1305.0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
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
    photos: 200,
    duration: 15,
    price: 49.0,
    description: "O mais popular para a maioria dos eventos",
    isActive: true,
    totalSubscriptions: 120,
    totalRevenue: 5880.0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
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
    photos: 500,
    duration: 30,
    price: 89.0,
    description: "Para eventos grandes e corporativos",
    isActive: true,
    totalSubscriptions: 35,
    totalRevenue: 3115.0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
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

export const createPlan = async (data: CreatePlanDto): Promise<ReadPlanDto> => {
  await delay(800);

  const newPlan: ReadPlanDto = {
    id: generateId(),
    name: data.name,
    photos: data.photos,
    duration: data.duration,
    price: data.price,
    description: data.description,
    features: data.features,
    isActive: data.isActive,
    totalSubscriptions: 0,
    totalRevenue: 0,
    createdAt: getCurrentISOString(),
    updatedAt: getCurrentISOString(),
  };

  mockPlans.push(newPlan);
  return newPlan;
};

export const updatePlan = async (data: UpdatePlanDto): Promise<ReadPlanDto> => {
  await delay(600);

  const planIndex = findIndexById(mockPlans, data.id);
  validateIndex(planIndex, "Plano");

  const updatedPlan: ReadPlanDto = {
    ...mockPlans[planIndex],
    ...data,
    updatedAt: getCurrentISOString(),
  };

  mockPlans[planIndex] = updatedPlan;
  return updatedPlan;
};

export const readPlanById = async (id: string): Promise<ReadPlanDto> => {
  await delay(400);

  const plan = findById(mockPlans, id);
  if (!plan) {
    throw createNotFoundError("Plano");
  }

  return plan;
};

export const listPlans = async (): Promise<ListPlanDto[]> => {
  await delay(500);

  return mockPlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    photos: plan.photos,
    duration: plan.duration,
    price: plan.price,
    description: plan.description,
    isActive: plan.isActive,
    totalSubscriptions: plan.totalSubscriptions,
    totalRevenue: plan.totalRevenue,
    createdAt: plan.createdAt,
  }));
};

export const deletePlan = async (id: string): Promise<void> => {
  await delay(400);

  const planIndex = findIndexById(mockPlans, id);
  validateIndex(planIndex, "Plano");

  mockPlans.splice(planIndex, 1);
};
