/**
 * Aplica máscara de CPF no formato 000.000.000-00
 */
export const applyCpfMask = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}`;

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9
  )}-${digits.slice(9, 11)}`;
};

/**
 * Remove a máscara de CPF, retornando apenas os dígitos
 */
export const removeCpfMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

/**
 * Verifica se o CPF está completo (11 dígitos)
 */
export const isCpfComplete = (value: string): boolean => {
  return removeCpfMask(value).length === 11;
};
