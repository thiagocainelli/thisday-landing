import { useState, useEffect } from "react";

/**
 * Hook para obter o horário atual atualizado a cada segundo
 * @returns String formatada do horário atual (HH:MM:SS)
 */
const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

export default useCurrentTime;
