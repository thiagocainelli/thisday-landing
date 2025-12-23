import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listPlans,
  getPlanByUuid,
  createPlan,
  updatePlan,
  deletePlan,
} from "@/services/plans.service";
import {
  CreatePlansDto,
  UpdatePlansDto,
  ReadPlansDto,
} from "@/types/plans.dto";
import { ApiListParams } from "@/lib/api-utils";
import { useToast } from "./useToast";

export const usePlans = (params: ApiListParams) => {
  return useQuery({
    queryKey: ["plans", params],
    queryFn: () =>
      listPlans({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
      }),
  });
};

export const usePlan = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["plans", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getPlanByUuid(uuid);
    },
    enabled: !!uuid,
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePlansDto) => createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Plano criado!",
        description: "O plano foi criado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar plano",
        description: error.message || "Não foi possível criar o plano",
        variant: "destructive",
      });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    ReadPlansDto,
    Error,
    { uuid: string; data: UpdatePlansDto }
  >({
    mutationFn: ({ uuid, data }) => updatePlan(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Plano atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar plano",
        description: error.message || "Não foi possível atualizar o plano",
        variant: "destructive",
      });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deletePlan(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Plano excluído!",
        description: "O plano foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir plano",
        description: error.message || "Não foi possível excluir o plano",
        variant: "destructive",
      });
    },
  });
};
