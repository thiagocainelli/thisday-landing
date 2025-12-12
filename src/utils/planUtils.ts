/**
 * Retorna o nome do plano baseado no ID
 * @param planId - ID do plano
 * @returns Nome do plano formatado
 */
export const getPlanName = (planId: string): string => {
  const planNames: Record<string, string> = {
    basic: "Básico",
    event: "Evento",
    premium: "Premium",
  };

  return planNames[planId] || planId;
};
