import { formatCurrencyBRL } from "@/utils/currencyBRL";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    dataKey?: string;
    color?: string;
  }>;
  label?: string;
  formatter?: (value: number) => string;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  formatter = (value) => value.toString(),
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.name || entry.dataKey}:
            </span>
            <span className="text-sm font-medium">
              {formatter(entry.value || 0)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default ChartTooltip;

