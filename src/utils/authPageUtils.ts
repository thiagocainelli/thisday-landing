/**
 * Classes CSS comuns para páginas de autenticação
 */
export const AUTH_PAGE_CLASSES = {
  container:
    "min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4",
  cardWrapper: "w-full max-w-md",
  card: "shadow-xl border-border/50",
  iconWrapper:
    "w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center",
  icon: "h-8 w-8 text-white",
  successIconWrapper:
    "w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto",
  successIcon: "h-8 w-8 text-green-600 dark:text-green-400",
} as const;
