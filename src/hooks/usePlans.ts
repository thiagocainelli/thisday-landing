import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPlan,
  updatePlan,
  readPlanById,
  listPlans,
  deletePlan,
} from "@/services/plans.service";
import { CreatePlanDto, UpdatePlanDto } from "@/types/plans.dto";
import { useToast } from "./useToast";

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: listPlans,
  });
};

export const usePlan = (id: string | undefined) => {
  return useQuery({
    queryKey: ["plans", id],
    queryFn: () => (id ? readPlanById(id) : Promise.reject(new Error("ID inválido"))),
    enabled: !!id,
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreatePlanDto) => createPlan(data),
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

  return useMutation({
    mutationFn: (data: UpdatePlanDto) => updatePlan(data),
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
    mutationFn: (id: string) => deletePlan(id),
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

