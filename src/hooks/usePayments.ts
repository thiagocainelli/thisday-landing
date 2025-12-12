import { useQuery } from "@tanstack/react-query";
import { listPayments, readPaymentById } from "@/services/payments.service";

export const usePayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: listPayments,
  });
};

export const usePayment = (id: string | undefined) => {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => (id ? readPaymentById(id) : Promise.reject(new Error("ID inválido"))),
    enabled: !!id,
  });
};

