import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ListCustomerDto,
  ReadCustomerDto,
} from "@/types/customers.dto";
import { delay } from "@/utils/delay";
import { generateId, getCurrentISOString } from "@/utils/idUtils";
import { validateIndex, createNotFoundError } from "@/utils/errorUtils";
import { findById, findIndexById } from "@/utils/arrayUtils";

const mockCustomers: ReadCustomerDto[] = [
  {
    id: "1",
    fullName: "Ana Silva",
    email: "ana@example.com",
    phone: "11999999999",
    document: "12345678900",
    totalEvents: 2,
    totalSpent: 78.0,
    createdAt: "2024-10-01T00:00:00Z",
    lastEventAt: "2024-11-01T10:00:00Z",
    events: [
      {
        id: "1",
        eventName: "Casamento Ana & Pedro",
        eventDate: "2024-12-15",
        planName: "Evento",
        status: "active",
        totalSpent: 49.0,
      },
    ],
  },
  {
    id: "2",
    fullName: "Carlos Santos",
    email: "carlos@example.com",
    phone: "11988888888",
    document: "98765432100",
    totalEvents: 1,
    totalSpent: 29.0,
    createdAt: "2024-10-15T00:00:00Z",
    lastEventAt: "2024-10-15T08:00:00Z",
    events: [
      {
        id: "2",
        eventName: "Aniversário 30 anos",
        eventDate: "2024-11-20",
        planName: "Básico",
        status: "active",
        totalSpent: 29.0,
      },
    ],
  },
  {
    id: "3",
    fullName: "Mariana Costa",
    email: "mariana@example.com",
    phone: "11977777777",
    totalEvents: 1,
    totalSpent: 89.0,
    createdAt: "2024-11-10T00:00:00Z",
    lastEventAt: "2024-11-10T14:00:00Z",
    events: [
      {
        id: "3",
        eventName: "Evento Corporativo Q4",
        eventDate: "2024-12-01",
        planName: "Premium",
        status: "active",
        totalSpent: 89.0,
      },
    ],
  },
];

export const createCustomer = async (
  data: CreateCustomerDto
): Promise<ReadCustomerDto> => {
  await delay(800);

  const newCustomer: ReadCustomerDto = {
    id: generateId(),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    document: data.document,
    totalEvents: 0,
    totalSpent: 0,
    createdAt: getCurrentISOString(),
    events: [],
  };

  mockCustomers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = async (
  data: UpdateCustomerDto
): Promise<ReadCustomerDto> => {
  await delay(600);

  const customerIndex = findIndexById(mockCustomers, data.id);
  validateIndex(customerIndex, "Cliente");

  const updatedCustomer: ReadCustomerDto = {
    ...mockCustomers[customerIndex],
    ...data,
  };

  mockCustomers[customerIndex] = updatedCustomer;
  return updatedCustomer;
};

export const readCustomerById = async (
  id: string
): Promise<ReadCustomerDto> => {
  await delay(400);

  const customer = findById(mockCustomers, id);
  if (!customer) {
    throw createNotFoundError("Cliente");
  }

  return customer;
};

export const listCustomers = async (): Promise<ListCustomerDto[]> => {
  await delay(500);

  return mockCustomers.map((customer) => ({
    id: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone,
    document: customer.document,
    totalEvents: customer.totalEvents,
    totalSpent: customer.totalSpent,
    createdAt: customer.createdAt,
    lastEventAt: customer.lastEventAt,
  }));
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await delay(400);

  const customerIndex = findIndexById(mockCustomers, id);
  validateIndex(customerIndex, "Cliente");

  mockCustomers.splice(customerIndex, 1);
};
