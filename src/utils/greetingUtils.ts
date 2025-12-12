/**
 * Retorna a saudação apropriada baseada no horário do dia
 * @returns "Bom dia", "Boa tarde" ou "Boa noite"
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};
