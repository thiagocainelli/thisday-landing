import { useState, useEffect } from "react";
import { getWeather, type WeatherData } from "@/services/weather.service";

/**
 * Hook para obter dados do clima usando OpenWeatherMap
 * Obtém a localização do usuário automaticamente
 */
const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const weatherData = await getWeather();
        setWeather(weatherData);
      } catch (err) {
        console.error("Erro ao obter dados do clima:", err);
        setError("Não foi possível carregar o clima");
        // Em caso de erro, não definir weather para não mostrar dados incorretos
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    // Atualizar a cada 30 minutos
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { weather, isLoading, error };
};

export default useWeather;
