import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
 * @param date - Data a ser formatada
 * @returns Data formatada (dd/MM/yyyy)
 */
export const formatDateBR = (date: string | Date): string => {
  return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
};

/**
 * Formata uma data para o padrão brasileiro com hora completa
 * @param date - Data a ser formatada
 * @returns Data formatada (dd/MM/yyyy 'às' HH:mm)
 */
export const formatDateTimeFullBR = (date: string | Date): string => {
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};
