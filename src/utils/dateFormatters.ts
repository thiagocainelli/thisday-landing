import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Cria uma data local a partir de uma string ISO, extraindo apenas a parte da data
 * para evitar problemas de timezone
 */
const createLocalDate = (date: string | Date): Date => {
  if (date instanceof Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Se for string ISO, extrai apenas a parte da data (YYYY-MM-DD)
  const dateStr =
    typeof date === "string" ? date : (date as Date).toISOString();
  const dateOnly = dateStr.split("T")[0]; // Pega apenas YYYY-MM-DD
  const [year, month, day] = dateOnly.split("-").map(Number);

  // Cria uma data local (sem componente de hora/timezone)
  return new Date(year, month - 1, day);
};

/**
 * Formata uma data para o padrão brasileiro com hora
 * @param date - Data a ser formatada
 * @returns Data formatada (dd/MM/yyyy HH:mm)
 */
export const formatDateTimeBR = (date: string | Date): string => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
};

/**
 * Formata uma data para o padrão brasileiro sem hora
 * Trata a data como local para evitar problemas de timezone
 * @param date - Data a ser formatada
 * @returns Data formatada (dd/MM/yyyy)
 */
export const formatDateBR = (date: string | Date): string => {
  const localDate = createLocalDate(date);
  return format(localDate, "dd/MM/yyyy", { locale: ptBR });
};

/**
 * Formata uma data para o padrão brasileiro com hora completa
 * @param date - Data a ser formatada
 * @returns Data formatada (dd/MM/yyyy 'às' HH:mm)
 */
export const formatDateTimeFullBR = (date: string | Date): string => {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};
