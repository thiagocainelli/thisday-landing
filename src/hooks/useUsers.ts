import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listUsers,
  getUserByUuid,
  getUserByEmail,
  updateUser,
  updateUserPassword,
  deleteUser,
  deleteUserFromDatabase,
  restoreUser,
} from "@/services/users.service";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  ReadUserDto,
} from "@/types/users.dto";
import { ApiListParams } from "@/lib/api-utils";
import { useToast } from "./useToast";
import { getToastErrorMessage } from "@/utils/api-error-handler";

export const useUsers = (params: ApiListParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      listUsers({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
      }),
  });
};

export const useCreateUser = () => {
  const { toast } = useToast();

  return useMutation({
    // Implementação placeholder até termos endpoint de criação de usuário
    mutationFn: async (_data: CreateUserDto) => {
      throw new Error("Criação de usuário ainda não está implementada na API.");
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível criar o usuário"
      );
      toast({
        title: "Erro ao criar usuário",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useUser = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["users", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getUserByUuid(uuid);
    },
    enabled: !!uuid,
  });
};

export const useUserByEmail = (email: string | undefined) => {
  return useQuery({
    queryKey: ["users", "email", email],
    queryFn: () => {
      if (!email) {
        throw new Error("Email é obrigatório");
      }
      return getUserByEmail(email);
    },
    enabled: !!email,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    ReadUserDto,
    unknown,
    { uuid: string; data: UpdateUserDto }
  >({
    mutationFn: ({ uuid, data }) => updateUser(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível atualizar o usuário"
      );
      toast({
        title: "Erro ao atualizar usuário",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateUserPassword = () => {
  const { toast } = useToast();

  return useMutation<
    ReadUserDto,
    unknown,
    { uuid: string; data: UpdateUserPasswordDto }
  >({
    mutationFn: ({ uuid, data }) => updateUserPassword(uuid, data),
    onSuccess: () => {
      toast({
        title: "Senha atualizada!",
        description: "Sua senha foi alterada com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível atualizar a senha"
      );
      toast({
        title: "Erro ao atualizar senha",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deleteUser(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário excluído!",
        description: "O usuário foi removido com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível excluir o usuário"
      );
      toast({
        title: "Erro ao excluir usuário",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteUserFromDatabase = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deleteUserFromDatabase(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário excluído permanentemente!",
        description:
          "O usuário foi removido permanentemente do banco de dados.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível excluir o usuário"
      );
      toast({
        title: "Erro ao excluir usuário",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useRestoreUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => restoreUser(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário restaurado!",
        description: "O usuário foi restaurado com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível restaurar o usuário"
      );
      toast({
        title: "Erro ao restaurar usuário",
        description,
        variant: "destructive",
      });
    },
  });
};
