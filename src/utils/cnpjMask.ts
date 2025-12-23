/**
 * Aplica máscara de CNPJ no formato 00.000.000/0000-00
 * @param value - Valor do input
 * @returns Valor formatado com máscara
 */
export const applyCnpjMask = (value: string): string => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, "");

  // Limita a 14 dígitos
  const limitedDigits = digits.slice(0, 14);

  // Aplica a máscara conforme o tamanho
  if (limitedDigits.length <= 2) {
    return limitedDigits;
  } else if (limitedDigits.length <= 5) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(2)}`;
  } else if (limitedDigits.length <= 8) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(
      2,
      5
    )}.${limitedDigits.slice(5)}`;
  } else if (limitedDigits.length <= 12) {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(
      2,
      5
    )}.${limitedDigits.slice(5, 8)}/${limitedDigits.slice(8)}`;
  } else {
    return `${limitedDigits.slice(0, 2)}.${limitedDigits.slice(
      2,
      5
    )}.${limitedDigits.slice(5, 8)}/${limitedDigits.slice(
      8,
      12
    )}-${limitedDigits.slice(12, 14)}`;
  }
};

/**
 * Remove a máscara de CNPJ, retornando apenas os dígitos
 * @param value - Valor com máscara
 * @returns Apenas os dígitos
 */
export const removeCnpjMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Verifica se o CNPJ está completo (14 dígitos)
 * @param value - Valor com ou sem máscara
 * @returns true se o CNPJ está completo
 */
export const isCnpjComplete = (value: string): boolean => {
  const digits = removeCnpjMask(value);
  return digits.length === 14;
};
