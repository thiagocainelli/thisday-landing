/**
 * Retorna o texto do botão de submit baseado no estado do formulário
 * @param isPending - Indica se a operação está em andamento
 * @param itemId - ID do item sendo editado (undefined para criação)
 * @returns Texto do botão
 */
export const getSubmitButtonLabel = (
  isPending: boolean,
  itemId?: string | null
): string => {
  if (isPending) return "Salvando...";
  return itemId ? "Atualizar" : "Criar";
};

/**
 * Retorna o texto do botão de loading baseado no estado e ações
 * @param isPending - Indica se a operação está em andamento
 * @param loadingText - Texto a exibir durante o loading
 * @param defaultText - Texto padrão quando não está em loading
 * @returns Texto do botão
 */
export const getLoadingButtonLabel = (
  isPending: boolean,
  loadingText: string,
  defaultText: string
): string => {
  return isPending ? loadingText : defaultText;
};
