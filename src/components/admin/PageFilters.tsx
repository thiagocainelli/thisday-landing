import { useState } from "react";
import { Search, Calendar as CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR, pt } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface PageFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  searchPlaceholder?: string;
}

const PageFilters = ({
  searchValue,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  searchPlaceholder = "Buscar...",
}: PageFiltersProps) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const clearFilters = () => {
    onSearchChange("");
    onStartDateChange(undefined);
    onEndDateChange(undefined);
  };

  const hasActiveFilters = searchValue || startDate || endDate;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Date Filters */}
      <div className="flex gap-2 flex-wrap">
        {/* Start Date */}
        <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[200px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span>Data início</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                onStartDateChange(date);
                setIsStartDateOpen(false);
              }}
              locale={pt}
              disabled={(date) => {
                if (endDate) {
                  return date > endDate;
                }
                return false;
              }}
            />
          </PopoverContent>
        </Popover>

        {/* End Date */}
        <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? (
                format(endDate, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span>Data fim</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                onEndDateChange(date);
                setIsEndDateOpen(false);
              }}
              locale={pt}
              disabled={(date) => {
                if (startDate) {
                  return date < startDate;
                }
                return false;
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFilters}
            className="w-full sm:w-auto"
            title="Limpar filtros"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageFilters;
