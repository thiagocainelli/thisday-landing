import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer,
  updateCustomer,
  readCustomerById,
  listCustomers,
  deleteCustomer,
} from "@/services/customers.service";
import { CreateCustomerDto, UpdateCustomerDto } from "@/types/customers.dto";
import { useToast } from "./useToast";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: listCustomers,
  });
};

export const useCustomer = (id: string | undefined) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => (id ? readCustomerById(id) : Promise.reject(new Error("ID inválido"))),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateCustomerDto) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente criado!",
        description: "O cliente foi criado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar cliente",
        description: error.message || "Não foi possível criar o cliente",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateCustomerDto) => updateCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar cliente",
        description: error.message || "Não foi possível atualizar o cliente",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente excluído!",
        description: "O cliente foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir cliente",
        description: error.message || "Não foi possível excluir o cliente",
        variant: "destructive",
      });
    },
  });
};

