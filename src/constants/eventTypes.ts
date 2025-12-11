export const EVENT_TYPES = [
  { value: "aniversario", label: "Aniversário" },
  { value: "casamento", label: "Casamento" },
  { value: "confraternizacao", label: "Confraternização" },
  { value: "corporativo", label: "Evento corporativo" },
  { value: "formatura", label: "Formatura" },
  { value: "chá-de-bebê", label: "Chá de bebê" },
  { value: "chá-de-panela", label: "Chá de panela" },
  { value: "noivado", label: "Noivado" },
  { value: "religioso", label: "Celebração religiosa" },
  { value: "infantil", label: "Festa infantil" },
  { value: "workshop", label: "Workshop / treinamento" },
  { value: "summit", label: "Summit / conferência" },
  { value: "lancamento", label: "Lançamento de produto" },
  { value: "show-festival", label: "Show / festival" },
  { value: "feira", label: "Feira / estande" },
  { value: "outro", label: "Outro" },
] as const;

export type EventTypeValue = (typeof EVENT_TYPES)[number]["value"];

