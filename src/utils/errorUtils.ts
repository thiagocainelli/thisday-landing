/**
 * Cria uma mensagem de erro padronizada para entidade não encontrada
 * @param entityName - Nome da entidade (ex: "Evento", "Cliente")
 * @returns Mensagem de erro formatada
 */
export const createNotFoundError = (entityName: string): Error => {
  return new Error(`${entityName} não encontrado`);
};

/**
 * Verifica se um índice é válido e lança erro se não for
 * @param index - Índice encontrado (-1 se não encontrado)
 * @param entityName - Nome da entidade para mensagem de erro
 * @throws Error se índice for -1
 */
export const validateIndex = (index: number, entityName: string): void => {
  if (index === -1) {
    throw createNotFoundError(entityName);
  }
};

