/**
 * Aplica máscara de telefone celular brasileiro no formato (XX) XXXXX-XXXX
 * @param value - Valor do input
 * @returns Valor formatado com máscara
 */
export const applyPhoneMask = (value: string): string => {
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, "");

  // Limita a 11 dígitos (DDD + 9 dígitos do celular)
  const limitedDigits = digits.slice(0, 11);

  // Aplica a máscara conforme o tamanho
  if (limitedDigits.length <= 2) {
    return `(${limitedDigits}`;
  } else if (limitedDigits.length <= 7) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
  } else {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(
      2,
      7
    )}-${limitedDigits.slice(7, 11)}`;
  }
};

/**
 * Remove a máscara do telefone, retornando apenas os dígitos
 * @param value - Valor com máscara
 * @returns Apenas os dígitos
 */
export const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Valida se o telefone está completo (11 dígitos)
 * @param value - Valor com ou sem máscara
 * @returns true se o telefone está completo
 */
export const isPhoneComplete = (value: string): boolean => {
  const digits = removePhoneMask(value);
  return digits.length === 11;
};
