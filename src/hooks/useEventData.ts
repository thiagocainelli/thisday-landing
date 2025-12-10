import { useState, useEffect } from "react";

interface EventData {
  eventName: string;
  plan?: {
    id: string;
    name: string;
    archives: string;
    duration: string;
    price: number;
  };
}

interface UseEventDataReturn {
  eventName: string;
  archiveLimit: number;
  isLoading: boolean;
}

/**
 * Hook para buscar dados do evento (localStorage ou API)
 */
export const useEventData = (eventId?: string): UseEventDataReturn => {
  const [eventName, setEventName] = useState<string>("");
  const [archiveLimit, setarchiveLimit] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Tentar buscar do localStorage primeiro
    const stored = localStorage.getItem("eventData");
    if (stored) {
      try {
        const eventData: EventData = JSON.parse(stored);
        if (eventData.eventName) {
          setEventName(eventData.eventName);
          // Extrair limite de fotos do plano
          const limit = eventData.plan?.archives
            ? parseInt(eventData.plan.archives, 10)
            : 0;
          setarchiveLimit(limit);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Erro ao ler dados do evento:", error);
      }
    }

    // Simular busca por eventId (em produção, fazer chamada à API)
    if (eventId) {
      setTimeout(() => {
        setEventName(`Evento ${eventId.slice(0, 8)}`);
        setarchiveLimit(3); // Valor padrão
        setIsLoading(false);
      }, 1000);
    } else {
      setEventName("Meu Evento");
      setarchiveLimit(3); // Valor padrão
      setIsLoading(false);
    }
  }, [eventId]);

  return { eventName, archiveLimit, isLoading };
};
