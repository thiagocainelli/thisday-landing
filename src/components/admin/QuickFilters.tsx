import { Button } from "@/components/ui/button";

export type QuickFilterPeriod =
  | "today"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "all";

interface QuickFiltersProps {
  selectedPeriod: QuickFilterPeriod | null;
  onPeriodChange: (period: QuickFilterPeriod) => void;
  onCustomDateRange?: () => void;
}

const QuickFilters = ({
  selectedPeriod,
  onPeriodChange,
  onCustomDateRange,
}: QuickFiltersProps) => {
  const periods: Array<{ value: QuickFilterPeriod; label: string }> = [
    { value: "today", label: "Hoje" },
    { value: "week", label: "Esta Semana" },
    { value: "month", label: "Este Mês" },
    { value: "quarter", label: "Este Trimestre" },
    { value: "year", label: "Este Ano" },
    { value: "all", label: "Todos" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={selectedPeriod === period.value ? "default" : "outline"}
          size="sm"
          onClick={() => onPeriodChange(period.value)}
          className="text-xs"
        >
          {period.label}
        </Button>
      ))}
      {onCustomDateRange && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCustomDateRange}
          className="text-xs"
        >
          Período Personalizado
        </Button>
      )}
    </div>
  );
};

export default QuickFilters;
