export const EVENT_TYPES = [
  { value: "ANIVERSARIO", label: "Aniversário" },
  { value: "CASAMENTO", label: "Casamento" },
  { value: "CONFRATERNIZACAO", label: "Confraternização" },
  { value: "CORPORATIVO", label: "Evento corporativo" },
  { value: "FORMATURA", label: "Formatura" },
  { value: "CHA_DE_BEBÊ", label: "Chá de bebê" },
  { value: "CHA_DE_PANELA", label: "Chá de panela" },
  { value: "NOIVADO", label: "Noivado" },
  { value: "RELIGIOSO", label: "Celebração religiosa" },
  { value: "INFANTIL", label: "Festa infantil" },
  { value: "WORKSHOP", label: "Workshop / treinamento" },
  { value: "SUMMIT", label: "Summit / conferência" },
  { value: "LANCAMENTO", label: "Lançamento de produto" },
  { value: "SHOW_FESTIVAL", label: "Show / festival" },
  { value: "FEIRA", label: "Feira / estande" },
  { value: "OUTRO", label: "Outro" },
] as const;

export type EventTypeValue = (typeof EVENT_TYPES)[number]["value"];
