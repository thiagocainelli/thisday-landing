import { useQuery } from "@tanstack/react-query";
import {
  getEventWithDetails,
  getEventByShareCode,
} from "@/services/events.service";
import { EventWithDetailsDto } from "@/types/event-with-details.dto";

interface UseEventDataReturn {
  eventName: string;
  storageLimit: number; // em GB
  storageUsedGB: number; // em GB
  isLoading: boolean;
  event?: {
    uuid: string;
    name: string;
    shareCode: string;
    customerUuid: string;
  };
  plan?: {
    uuid: string;
    name: string;
    capacityGB: number;
    durationDays: number;
  };
}

/**
 * Hook para buscar dados do evento via API com detalhes completos
 */
export const useEventData = (
  eventId?: string,
  shareCode?: string
): UseEventDataReturn => {
  // Se tiver shareCode, buscar por shareCode primeiro para obter o UUID
  // Depois buscar detalhes completos
  const identifier = shareCode || eventId;

  const { data: eventDetails, isLoading } = useQuery<EventWithDetailsDto>({
    queryKey: ["event", "details", identifier],
    queryFn: async () => {
      if (!identifier) {
        throw new Error("EventId ou ShareCode é obrigatório");
      }

      // Se tiver shareCode, buscar primeiro o evento básico para obter UUID
      if (shareCode) {
        const basicEvent = await getEventByShareCode(shareCode);
        return await getEventWithDetails(basicEvent.uuid);
      }

      // Se tiver UUID, buscar diretamente os detalhes
      return await getEventWithDetails(identifier);
    },
    enabled: !!identifier,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    eventName: eventDetails?.name || "",
    storageLimit:
      eventDetails?.storageLimitGB || eventDetails?.plan?.capacityGB || 0,
    storageUsedGB: eventDetails?.storageUsedGB || 0,
    isLoading,
    event: eventDetails
      ? {
          uuid: eventDetails.uuid,
          name: eventDetails.name,
          shareCode: eventDetails.shareCode,
          customerUuid: eventDetails.customerUuid,
        }
      : undefined,
    plan: eventDetails?.plan,
  };
};
