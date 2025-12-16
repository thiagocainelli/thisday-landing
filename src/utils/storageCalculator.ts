/**
 * Converte bytes para GB
 */
export const bytesToGB = (bytes: number): number => {
  return bytes / (1024 * 1024 * 1024);
};

/**
 * Converte GB para bytes
 */
export const gbToBytes = (gb: number): number => {
  return gb * 1024 * 1024 * 1024;
};

/**
 * Calcula o tamanho total de uma lista de arquivos em GB
 */
export const calculateTotalStorage = (files: File[]): number => {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  return bytesToGB(totalBytes);
};

/**
 * Formata tamanho de arquivo para exibição
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

