import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  updateEvent,
  readEventById,
  listEvents,
  deleteEvent,
} from "@/services/events.service";
import { CreateEventDto, UpdateEventDto } from "@/types/events.dto";
import { useToast } from "./useToast";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
  });
};

export const useEvent = (id: string | undefined) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => (id ? readEventById(id) : Promise.reject(new Error("ID inválido"))),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateEventDto) => createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Evento criado!",
        description: "O evento foi criado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar evento",
        description: error.message || "Não foi possível criar o evento",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateEventDto) => updateEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Evento atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar evento",
        description: error.message || "Não foi possível atualizar o evento",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Evento excluído!",
        description: "O evento foi removido com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir evento",
        description: error.message || "Não foi possível excluir o evento",
        variant: "destructive",
      });
    },
  });
};

