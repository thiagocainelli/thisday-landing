import { delay } from "@/utils/delay";
import { getPlanName } from "@/utils/planUtils";
import { generateId, getCurrentISOString } from "@/utils/idUtils";
import { validateIndex, createNotFoundError } from "@/utils/errorUtils";
import { getFutureISOString } from "@/utils/dateUtils";
import { findById, findIndexById } from "@/utils/arrayUtils";
import {
  CreateEventDto,
  UpdateEventDto,
  ListEventDto,
  ReadEventDto,
} from "@/types/events.dto";

// Mock data - em produção viria de uma API real
const mockEvents: ReadEventDto[] = [
  {
    id: "1",
    fullName: "Ana Silva",
    email: "ana@example.com",
    phone: "11999999999",
    eventName: "Casamento Ana & Pedro",
    eventDate: "2024-12-15",
    eventType: "casamento",
    planId: "event",
    planName: "Evento",
    status: "active",
    createdAt: "2024-11-01T10:00:00Z",
    expiresAt: "2024-12-30T23:59:59Z",
    totalFiles: 45,
    totalRevenue: 49.9,
    qrCodeUrl: "/qr-code-1.png",
    shareUrl: "/upload/1",
    filesCount: 45,
    viewsCount: 120,
    lastAccessAt: "2024-11-20T15:30:00Z",
  },
  {
    id: "2",
    fullName: "Carlos Santos",
    email: "carlos@example.com",
    phone: "11988888888",
    eventName: "Aniversário 30 anos",
    eventDate: "2024-11-20",
    eventType: "aniversario",
    planId: "basic",
    planName: "Básico",
    status: "active",
    createdAt: "2024-10-15T08:00:00Z",
    expiresAt: "2024-11-27T23:59:59Z",
    totalFiles: 78,
    totalRevenue: 29.9,
    qrCodeUrl: "/qr-code-2.png",
    shareUrl: "/upload/2",
    filesCount: 78,
    viewsCount: 95,
    lastAccessAt: "2024-11-19T20:00:00Z",
  },
  {
    id: "3",
    fullName: "Mariana Costa",
    email: "mariana@example.com",
    phone: "11977777777",
    eventName: "Evento Corporativo Q4",
    eventDate: "2024-12-01",
    eventType: "corporativo",
    planId: "premium",
    planName: "Premium",
    status: "active",
    createdAt: "2024-11-10T14:00:00Z",
    expiresAt: "2024-12-31T23:59:59Z",
    totalFiles: 234,
    totalRevenue: 89.9,
    qrCodeUrl: "/qr-code-3.png",
    shareUrl: "/upload/3",
    filesCount: 234,
    viewsCount: 456,
    lastAccessAt: "2024-11-20T10:00:00Z",
  },
];

export const createEvent = async (
  data: CreateEventDto
): Promise<ReadEventDto> => {
  await delay(800);

  const newEvent: ReadEventDto = {
    id: generateId(),
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    eventName: data.eventName,
    eventDate: data.eventDate,
    eventType: data.eventType,
    planId: data.planId,
    planName: getPlanName(data.planId),
    status: "active",
    createdAt: getCurrentISOString(),
    expiresAt: getFutureISOString(15),
    totalFiles: 0,
    totalRevenue: 0,
    qrCodeUrl: `/qr-code-${generateId()}.png`,
    shareUrl: `/upload/${generateId()}`,
    filesCount: 0,
    viewsCount: 0,
  };

  mockEvents.push(newEvent);
  return newEvent;
};

export const updateEvent = async (
  data: UpdateEventDto
): Promise<ReadEventDto> => {
  await delay(600);

  const eventIndex = findIndexById(mockEvents, data.id);
  validateIndex(eventIndex, "Evento");

  const updatedEvent: ReadEventDto = {
    ...mockEvents[eventIndex],
    ...data,
    planName: data.planId
      ? getPlanName(data.planId)
      : mockEvents[eventIndex].planName,
  };

  mockEvents[eventIndex] = updatedEvent;
  return updatedEvent;
};

export const readEventById = async (id: string): Promise<ReadEventDto> => {
  await delay(400);

  const event = findById(mockEvents, id);
  if (!event) {
    throw createNotFoundError("Evento");
  }

  return event;
};

export const listEvents = async (): Promise<ListEventDto[]> => {
  await delay(500);

  return mockEvents.map((event) => ({
    id: event.id,
    fullName: event.fullName,
    email: event.email,
    phone: event.phone,
    eventName: event.eventName,
    eventDate: event.eventDate,
    eventType: event.eventType,
    planId: event.planId,
    planName: event.planName,
    status: event.status,
    createdAt: event.createdAt,
    expiresAt: event.expiresAt,
    totalFiles: event.totalFiles,
    totalRevenue: event.totalRevenue,
  }));
};

export const deleteEvent = async (id: string): Promise<void> => {
  await delay(400);

  const eventIndex = findIndexById(mockEvents, id);
  validateIndex(eventIndex, "Evento");

  mockEvents.splice(eventIndex, 1);
};
