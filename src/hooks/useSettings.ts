import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/services/settings.service";
import { UpdateSettingsDto } from "@/types/settings.dto";
import { useToast } from "./useToast";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateSettingsDto) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Configurações atualizadas!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar configurações",
        description: error.message || "Não foi possível atualizar as configurações",
        variant: "destructive",
      });
    },
  });
};

