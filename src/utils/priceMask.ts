/**
 * Aplica máscara de preço BRL no formato R$ 1.234,56
 * Quando recebe um número, apenas formata.
 * Quando recebe uma string (entrada do usuário), trata como dígitos e divide por 100.
 * @param value - Valor numérico ou string
 * @returns Valor formatado com máscara BRL
 */
export const applyPriceMask = (value: string | number): string => {
  // Se for número, apenas formatar
  if (typeof value === "number") {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Se for string (entrada do usuário), tratar como dígitos
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  // Converter para número e dividir por 100 para ter centavos
  const numericValue = parseInt(digits, 10) / 100;

  // Formatar como BRL
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Remove a máscara do preço, retornando apenas o número
 * @param value - Valor com máscara BRL (ex: "R$ 1.234,56")
 * @returns Número (ex: 1234.56)
 */
export const removePriceMask = (value: string): number => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, "");

  if (!digits) return 0;

  // Divide por 100 para ter centavos
  return parseInt(digits, 10) / 100;
};

/**
 * Formata valor numérico para exibição BRL
 * @param value - Valor numérico
 * @returns String formatada (ex: "R$ 1.234,56")
 */
export const formatPriceBRL = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
