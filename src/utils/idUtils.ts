/**
 * Gera um ID único baseado em timestamp
 * @returns ID único como string
 */
export const generateId = (): string => {
  return Date.now().toString();
};

/**
 * Retorna a data/hora atual em formato ISO
 * @returns String ISO da data atual
 */
export const getCurrentISOString = (): string => {
  return new Date().toISOString();
};

