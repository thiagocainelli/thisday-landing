import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  href?: string;
  onClick?: () => void;
  className?: string;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  href,
  onClick,
  className,
}: StatCardProps) => {
  const isClickable = href || onClick;

  const getTrendColor = (): string => {
    if (!trend) return "";
    return trend.value >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  const trendColor = getTrendColor();
  const isPositive = trend ? trend.value >= 0 : false;

  const content = (
    <Card
      className={cn(
        "transition-all duration-200",
        isClickable && "cursor-pointer hover:shadow-md hover:border-primary/50",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendColor
              )}
            >
              {isPositive ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              <span>
                {Math.abs(trend.value).toFixed(1)}% {trend.label}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

export default StatCard;
