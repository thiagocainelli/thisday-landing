/**
 * Simula um delay de API
 * @param ms - Milissegundos para aguardar
 * @returns Promise que resolve após o delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
