import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listPaymentOrders,
  getPaymentOrderByUuid,
  createPaymentOrder,
  updatePaymentOrder,
  deletePaymentOrder,
} from "@/services/payment-orders.service";
import {
  CreatePaymentOrdersDto,
  UpdatePaymentOrdersDto,
  ReadPaymentOrdersDto,
} from "@/types/payment-orders.dto";
import { ApiListParams } from "@/lib/api-utils";
import { useToast } from "./useToast";
import { getToastErrorMessage } from "@/utils/api-error-handler";

export const usePaymentOrders = (params: ApiListParams) => {
  return useQuery({
    queryKey: ["paymentOrders", params],
    queryFn: () =>
      listPaymentOrders({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
      }),
  });
};

export const usePaymentOrder = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["paymentOrders", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getPaymentOrderByUuid(uuid);
    },
    enabled: !!uuid,
  });
};

export const useCreatePaymentOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePaymentOrdersDto) => createPaymentOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentOrders"] });
      toast({
        title: "Pedido de pagamento criado!",
        description: "O pedido foi criado com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível criar o pedido",
      );
      toast({
        title: "Erro ao criar pedido",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useUpdatePaymentOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    ReadPaymentOrdersDto,
    unknown,
    { uuid: string; data: UpdatePaymentOrdersDto }
  >({
    mutationFn: ({ uuid, data }) => updatePaymentOrder(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentOrders"] });
      toast({
        title: "Pedido atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível atualizar o pedido",
      );
      toast({
        title: "Erro ao atualizar pedido",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useDeletePaymentOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deletePaymentOrder(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentOrders"] });
      toast({
        title: "Pedido excluído!",
        description: "O pedido foi removido com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível excluir o pedido",
      );
      toast({
        title: "Erro ao excluir pedido",
        description,
        variant: "destructive",
      });
    },
  });
};
