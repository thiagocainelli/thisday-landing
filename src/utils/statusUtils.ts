/**
 * Converte um valor booleano para string de status
 * @param isActive - Valor booleano indicando se está ativo
 * @returns "active" ou "inactive"
 */
export const getStatusFromBoolean = (
  isActive: boolean
): "active" | "inactive" => {
  return isActive ? "active" : "inactive";
};
