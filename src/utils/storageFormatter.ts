/**
 * Formata armazenamento em GB para exibição (GB ou TB)
 * @param storageGB - Armazenamento em GB
 * @returns String formatada (ex: "50 GB", "1 TB")
 */
export const formatStorage = (storageGB: number): string => {
  if (storageGB >= 1000) {
    const tb = storageGB / 1000;
    return `${tb % 1 === 0 ? tb : tb.toFixed(1)} TB`;
  }
  return `${storageGB} GB`;
};

/**
 * Converte string de armazenamento para GB
 * @param storage - String no formato "50 GB" ou "1 TB"
 * @returns Número em GB
 */
export const parseStorageToGB = (storage: string): number => {
  const match = storage.match(/(\d+(?:\.\d+)?)\s*(GB|TB)/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  if (unit === "TB") {
    return value * 1000;
  }
  return value;
};
