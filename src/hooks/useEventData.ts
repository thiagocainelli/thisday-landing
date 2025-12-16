import { useState, useEffect } from "react";

interface EventData {
  eventName: string;
  plan?: {
    id: string;
    name: string;
    storage: number; // em GB
    storageFormatted: string;
    duration: string;
    price: number;
  };
}

interface UseEventDataReturn {
  eventName: string;
  storageLimit: number; // em GB
  isLoading: boolean;
}

/**
 * Hook para buscar dados do evento (localStorage ou API)
 */
export const useEventData = (eventId?: string): UseEventDataReturn => {
  const [eventName, setEventName] = useState<string>("");
  const [storageLimit, setStorageLimit] = useState<number>(0);
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
          // Extrair limite de armazenamento do plano (em GB)
          const limit = eventData.plan?.storage || 0;
          setStorageLimit(0.1);
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
        setStorageLimit(0.1); // Valor padrão em GB
        setIsLoading(false);
      }, 1000);
    } else {
      setEventName("Meu Evento");
      setStorageLimit(0.1); // Valor padrão em GB
      setIsLoading(false);
    }
  }, [eventId]);

  return { eventName, storageLimit, isLoading };
};
