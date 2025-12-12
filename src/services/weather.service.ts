interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  city?: string;
}

/**
 * Mapeia o código de ícone do OpenWeatherMap para emoji
 */
const getWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    "01d": "☀️", // clear sky day
    "01n": "🌙", // clear sky night
    "02d": "⛅", // few clouds day
    "02n": "☁️", // few clouds night
    "03d": "☁️", // scattered clouds
    "03n": "☁️",
    "04d": "☁️", // broken clouds
    "04n": "☁️",
    "09d": "🌧️", // shower rain
    "09n": "🌧️",
    "10d": "🌦️", // rain day
    "10n": "🌧️", // rain night
    "11d": "⛈️", // thunderstorm
    "11n": "⛈️",
    "13d": "❄️", // snow
    "13n": "❄️",
    "50d": "🌫️", // mist
    "50n": "🌫️",
  };
  return iconMap[iconCode] || "🌤️";
};

/**
 * Traduz a condição do clima para português
 */
const translateCondition = (condition: string): string => {
  const translations: Record<string, string> = {
    Clear: "Ensolarado",
    Clouds: "Nublado",
    Rain: "Chuvoso",
    Drizzle: "Garoa",
    Thunderstorm: "Tempestade",
    Snow: "Nevando",
    Mist: "Neblina",
    Fog: "Neblina",
    Haze: "Neblina",
  };
  return translations[condition] || condition;
};

/**
 * Obtém dados do clima usando a API do OpenWeatherMap
 * @param lat - Latitude (opcional, usa geolocalização se não fornecido)
 * @param lon - Longitude (opcional, usa geolocalização se não fornecido)
 * @returns Dados do clima formatados
 */
export const getWeather = async (
  lat?: number,
  lon?: number
): Promise<WeatherData> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("API key do OpenWeatherMap não configurada");
  }

  let url: string;

  if (lat && lon) {
    // Usar coordenadas fornecidas
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
  } else {
    // Tentar obter localização do usuário
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não suportada"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Erro na API: ${response.status}`);
            }

            const data: OpenWeatherResponse = await response.json();
            resolve({
              temperature: Math.round(data.main.temp),
              condition: translateCondition(data.weather[0].main),
              icon: getWeatherIcon(data.weather[0].icon),
              city: data.name,
            });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(new Error("Não foi possível obter a localização"));
        }
      );
    });
  }

  // Se lat e lon foram fornecidos diretamente
  const response = await fetch(url!);
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  const data: OpenWeatherResponse = await response.json();
  return {
    temperature: Math.round(data.main.temp),
    condition: translateCondition(data.weather[0].main),
    icon: getWeatherIcon(data.weather[0].icon),
    city: data.name,
  };
};
