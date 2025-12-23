import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listCustomers,
  getCustomerByUuid,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/services/customers.service";
import {
  CreateCustomersDto,
  UpdateCustomersDto,
  ReadCustomersDto,
} from "@/types/customers.dto";
import { ApiListParams } from "@/lib/api-utils";
import { useToast } from "./useToast";
import { getToastErrorMessage } from "@/utils/api-error-handler";

export const useCustomers = (params: ApiListParams) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () =>
      listCustomers({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
      }),
  });
};

export const useCustomer = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["customers", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getCustomerByUuid(uuid);
    },
    enabled: !!uuid,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateCustomersDto) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente criado!",
        description: "O cliente foi criado com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível criar o cliente"
      );
      toast({
        title: "Erro ao criar cliente",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    ReadCustomersDto,
    unknown,
    { uuid: string; data: UpdateCustomersDto }
  >({
    mutationFn: ({ uuid, data }) => updateCustomer(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível atualizar o cliente"
      );
      toast({
        title: "Erro ao atualizar cliente",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deleteCustomer(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente excluído!",
        description: "O cliente foi removido com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível excluir o cliente"
      );
      toast({
        title: "Erro ao excluir cliente",
        description,
        variant: "destructive",
      });
    },
  });
};
