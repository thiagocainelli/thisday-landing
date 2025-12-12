import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  updateUser,
  readUserById,
  listUsers,
  deleteUser,
} from "@/services/users.service";
import { CreateUserDto, UpdateUserDto } from "@/types/users.dto";
import { useToast } from "./useToast";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
  });
};

export const useUser = (id: string | undefined) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => (id ? readUserById(id) : Promise.reject(new Error("ID inválido"))),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateUserDto) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário criado!",
        description: "O usuário foi criado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar usuário",
        description: error.message || "Não foi possível criar o usuário",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar usuário",
        description: error.message || "Não foi possível atualizar o usuário",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário excluído!",
        description: "O usuário foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir usuário",
        description: error.message || "Não foi possível excluir o usuário",
        variant: "destructive",
      });
    },
  });
};

