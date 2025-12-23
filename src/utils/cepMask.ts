/**
 * Aplica máscara de CEP no formato 00000-000
 */
export const applyCepMask = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 5) return digits;

  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};

/**
 * Remove a máscara de CEP, retornando apenas os dígitos
 */
export const removeCepMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Verifica se o CEP está completo (8 dígitos)
 */
export const isCepComplete = (value: string): boolean => {
  return removeCepMask(value).length === 8;
};


