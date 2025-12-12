# Configuração do OpenWeatherMap

## Como configurar a API Key

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione sua API key do OpenWeatherMap:

```env
VITE_OPENWEATHER_API_KEY=sua_api_key_aqui
```

3. Reinicie o servidor de desenvolvimento (`npm run dev`)

## Como obter a API Key

1. Acesse: https://openweathermap.org/api
2. Crie uma conta gratuita
3. Vá em "API keys"
4. Gere uma nova chave
5. Copie e cole no arquivo `.env`

## Funcionalidades

- Obtém automaticamente a localização do usuário via geolocalização
- Exibe temperatura em Celsius
- Traduz condições do clima para português
- Atualiza a cada 30 minutos
- Mostra ícones emoji baseados nas condições climáticas

## Nota

A API gratuita do OpenWeatherMap tem limite de 60 chamadas por minuto. Para uso em produção, considere implementar cache ou usar um plano pago.
