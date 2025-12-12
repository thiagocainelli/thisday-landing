/**
 * Encontra um item em um array pelo ID
 * @param array - Array de itens com propriedade id
 * @param id - ID do item a ser encontrado
 * @returns O item encontrado ou undefined
 */
export const findById = <T extends { id: string }>(
  array: T[],
  id: string
): T | undefined => {
  return array.find((item) => item.id === id);
};

/**
 * Encontra o índice de um item em um array pelo ID
 * @param array - Array de itens com propriedade id
 * @param id - ID do item a ser encontrado
 * @returns O índice do item ou -1 se não encontrado
 */
export const findIndexById = <T extends { id: string }>(
  array: T[],
  id: string
): number => {
  return array.findIndex((item) => item.id === id);
};
