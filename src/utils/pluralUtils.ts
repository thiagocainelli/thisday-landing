/**
 * Retorna o texto pluralizado baseado na quantidade
 * @param count - Quantidade de itens
 * @param singular - Texto no singular
 * @param plural - Texto no plural (opcional, usa singular + 's' se não fornecido)
 * @returns Texto formatado com quantidade e pluralização
 */
export const getPluralizedText = (
  count: number,
  singular: string,
  plural?: string
): string => {
  const pluralText = plural || `${singular}s`;
  return count === 1 ? singular : pluralText;
};

/**
 * Retorna texto formatado com quantidade e pluralização
 * @param count - Quantidade de itens
 * @param singular - Texto no singular
 * @param plural - Texto no plural (opcional)
 * @returns String formatada: "X item" ou "X itens"
 */
export const formatPluralizedCount = (
  count: number,
  singular: string,
  plural?: string
): string => {
  return `${count} ${getPluralizedText(count, singular, plural)}`;
};
