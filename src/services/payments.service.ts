import { ListPaymentDto, ReadPaymentDto } from "@/types/payments.dto";
import { delay } from "@/utils/delay";
import { createNotFoundError } from "@/utils/errorUtils";
import { findById } from "@/utils/arrayUtils";

const mockPayments: ReadPaymentDto[] = [
  {
    id: "1",
    eventId: "1",
    eventName: "Casamento Ana & Pedro",
    customerName: "Ana Silva",
    customerEmail: "ana@example.com",
    planName: "Evento",
    amount: 49.0,
    paymentMethod: "pix",
    status: "paid",
    paidAt: "2024-11-01T10:05:00Z",
    createdAt: "2024-11-01T10:00:00Z",
    transactionId: "PIX-20241101-001",
  },
  {
    id: "2",
    eventId: "2",
    eventName: "Aniversário 30 anos",
    customerName: "Carlos Santos",
    customerEmail: "carlos@example.com",
    planName: "Básico",
    amount: 29.0,
    paymentMethod: "credit",
    status: "paid",
    installments: 1,
    paidAt: "2024-10-15T08:05:00Z",
    createdAt: "2024-10-15T08:00:00Z",
    transactionId: "CC-20241015-002",
    cardLastDigits: "1234",
  },
  {
    id: "3",
    eventId: "3",
    eventName: "Evento Corporativo Q4",
    customerName: "Mariana Costa",
    customerEmail: "mariana@example.com",
    planName: "Premium",
    amount: 89.0,
    paymentMethod: "credit",
    status: "paid",
    installments: 3,
    paidAt: "2024-11-10T14:05:00Z",
    createdAt: "2024-11-10T14:00:00Z",
    transactionId: "CC-20241110-003",
    cardLastDigits: "5678",
  },
  {
    id: "4",
    eventId: "4",
    eventName: "Formatura 2024",
    customerName: "João Silva",
    customerEmail: "joao@example.com",
    planName: "Evento",
    amount: 49.0,
    paymentMethod: "pix",
    status: "pending",
    createdAt: "2024-11-20T09:00:00Z",
    pixCode:
      "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000",
  },
];

export const listPayments = async (): Promise<ListPaymentDto[]> => {
  await delay(500);

  return mockPayments.map((payment) => ({
    id: payment.id,
    eventId: payment.eventId,
    eventName: payment.eventName,
    customerName: payment.customerName,
    customerEmail: payment.customerEmail,
    planName: payment.planName,
    amount: payment.amount,
    paymentMethod: payment.paymentMethod,
    status: payment.status,
    installments: payment.installments,
    paidAt: payment.paidAt,
    createdAt: payment.createdAt,
    transactionId: payment.transactionId,
  }));
};

export const readPaymentById = async (id: string): Promise<ReadPaymentDto> => {
  await delay(400);

  const payment = findById(mockPayments, id);
  if (!payment) {
    throw createNotFoundError("Pagamento");
  }

  return payment;
};
