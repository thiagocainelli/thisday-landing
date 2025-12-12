import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subMonths,
  subWeeks,
  subDays,
} from "date-fns";

export type QuickFilterPeriod =
  | "today"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "all";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export const getPeriodDateRange = (
  period: QuickFilterPeriod
): DateRange | null => {
  const now = new Date();

  switch (period) {
    case "today":
      return {
        startDate: startOfDay(now),
        endDate: endOfDay(now),
      };
    case "week":
      return {
        startDate: startOfWeek(now, { weekStartsOn: 1 }),
        endDate: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case "month":
      return {
        startDate: startOfMonth(now),
        endDate: endOfMonth(now),
      };
    case "quarter":
      return {
        startDate: startOfQuarter(now),
        endDate: endOfQuarter(now),
      };
    case "year":
      return {
        startDate: startOfYear(now),
        endDate: endOfYear(now),
      };
    case "all":
      return null;
    default:
      return null;
  }
};

export const getPreviousPeriodDateRange = (
  period: QuickFilterPeriod
): DateRange | null => {
  const now = new Date();

  switch (period) {
    case "today": {
      const yesterday = subDays(now, 1);
      return {
        startDate: startOfDay(yesterday),
        endDate: endOfDay(yesterday),
      };
    }
    case "week": {
      const lastWeek = subWeeks(now, 1);
      return {
        startDate: startOfWeek(lastWeek, { weekStartsOn: 1 }),
        endDate: endOfWeek(lastWeek, { weekStartsOn: 1 }),
      };
    }
    case "month": {
      const lastMonth = subMonths(now, 1);
      return {
        startDate: startOfMonth(lastMonth),
        endDate: endOfMonth(lastMonth),
      };
    }
    case "quarter": {
      const lastQuarter = subMonths(now, 3);
      return {
        startDate: startOfQuarter(lastQuarter),
        endDate: endOfQuarter(lastQuarter),
      };
    }
    case "year": {
      const lastYear = new Date(now.getFullYear() - 1, 0, 1);
      return {
        startDate: startOfYear(lastYear),
        endDate: endOfYear(lastYear),
      };
    }
    case "all":
      return null;
    default:
      return null;
  }
};

export const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Calcula uma data futura adicionando dias à data atual
 * @param days - Número de dias a adicionar
 * @returns String ISO da data futura
 */
export const getFutureISOString = (days: number): string => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate.toISOString();
};
