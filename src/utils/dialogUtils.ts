/**
 * Mapeamento de tamanhos máximos para dialogs
 */
export const DIALOG_MAX_WIDTH_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
} as const;

export type DialogMaxWidth = keyof typeof DIALOG_MAX_WIDTH_CLASSES;
