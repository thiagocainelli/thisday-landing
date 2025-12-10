import { BYTES_PER_MB, FILE_SIZE_DECIMALS } from "@/constants/upload";

export const formatFileSize = (bytes: number): string => {
  return `${(bytes / BYTES_PER_MB).toFixed(FILE_SIZE_DECIMALS)} MB`;
};
