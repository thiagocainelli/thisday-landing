import { useMemo } from "react";

interface FilterOptions<T> {
  data: T[];
  searchValue: string;
  startDate?: Date;
  endDate?: Date;
  searchFields: (keyof T)[];
  dateField: keyof T;
}

const useFilterData = <T>({
  data,
  searchValue,
  startDate,
  endDate,
  searchFields,
  dateField,
}: FilterOptions<T>) => {
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search filter
      if (searchValue) {
        const searchLower = searchValue.toLowerCase();
        const matchesSearch = searchFields.some((field) => {
          const value = item[field];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
        if (!matchesSearch) return false;
      }

      // Date filter
      if (startDate || endDate) {
        const dateValue = item[dateField];

        // Se não houver valor de data, mantém o item (não filtra)
        if (!dateValue) return true;

        let itemDate: Date;
        try {
          itemDate = new Date(dateValue as string | number | Date);

          // Verifica se a data é válida
          if (isNaN(itemDate.getTime())) return true;

          itemDate.setHours(0, 0, 0, 0);
        } catch {
          // Se houver erro ao parsear a data, mantém o item
          return true;
        }

        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          if (itemDate < start) return false;
        }

        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          if (itemDate > end) return false;
        }
      }

      return true;
    });
  }, [data, searchValue, startDate, endDate, searchFields, dateField]);

  return filteredData;
};

export default useFilterData;
