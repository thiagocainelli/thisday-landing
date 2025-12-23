import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listStorage,
  getStorageByUuid,
  uploadFiles,
  uploadProfileImage,
  deleteStorage,
  restoreStorage,
} from "@/services/storage.service";
import { ApiListParams } from "@/lib/api-utils";
import { useToast } from "./useToast";

export const useStorage = (params: ApiListParams) => {
  return useQuery({
    queryKey: ["storage", params],
    queryFn: () =>
      listStorage({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
      }),
  });
};

export const useStorageItem = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["storage", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getStorageByUuid(uuid);
    },
    enabled: !!uuid,
  });
};

export const useUploadFiles = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      files,
      onUploadProgress,
    }: {
      files: File[];
      onUploadProgress?: (progress: number) => void;
    }) => uploadFiles(files, onUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storage"] });
      toast({
        title: "Arquivos enviados!",
        description: "Os arquivos foram enviados com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar arquivos",
        description: error.message || "Não foi possível enviar os arquivos",
        variant: "destructive",
      });
    },
  });
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      file,
      onUploadProgress,
    }: {
      file: File;
      onUploadProgress?: (progress: number) => void;
    }) => uploadProfileImage(file, onUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storage"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      toast({
        title: "Imagem enviada!",
        description: "A imagem de perfil foi atualizada com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message || "Não foi possível enviar a imagem",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteStorage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deleteStorage(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storage"] });
      toast({
        title: "Arquivo excluído!",
        description: "O arquivo foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir arquivo",
        description: error.message || "Não foi possível excluir o arquivo",
        variant: "destructive",
      });
    },
  });
};

export const useRestoreStorage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => restoreStorage(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storage"] });
      toast({
        title: "Arquivo restaurado!",
        description: "O arquivo foi restaurado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao restaurar arquivo",
        description: error.message || "Não foi possível restaurar o arquivo",
        variant: "destructive",
      });
    },
  });
};
