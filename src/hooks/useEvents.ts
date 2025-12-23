import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  updateEvent,
  getEventByUuid,
  listEvents,
  deleteEvent,
} from "@/services/events.service";
import {
  CreateEventsDto,
  UpdateEventsDto,
  ReadEventsDto,
} from "@/types/events.dto";
import { ApiListParams } from "@/lib/api-utils";
import { useToast } from "./useToast";
import { getToastErrorMessage } from "@/utils/api-error-handler";

export const useEvents = (params: ApiListParams) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () =>
      listEvents({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search,
      }),
  });
};

export const useEvent = (uuid: string | undefined) => {
  return useQuery({
    queryKey: ["events", uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error("UUID é obrigatório");
      }
      return getEventByUuid(uuid);
    },
    enabled: !!uuid,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateEventsDto) => createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Evento criado!",
        description: "O evento foi criado com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível criar o evento",
      );
      toast({
        title: "Erro ao criar evento",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<
    ReadEventsDto,
    unknown,
    { uuid: string; data: UpdateEventsDto }
  >({
    mutationFn: ({ uuid, data }) => updateEvent(uuid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Evento atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível atualizar o evento",
      );
      toast({
        title: "Erro ao atualizar evento",
        description,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (uuid: string) => deleteEvent(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Evento excluído!",
        description: "O evento foi removido com sucesso.",
      });
    },
    onError: (error: unknown) => {
      const { description } = getToastErrorMessage(
        error,
        "Não foi possível excluir o evento",
      );
      toast({
        title: "Erro ao excluir evento",
        description,
        variant: "destructive",
      });
    },
  });
};
