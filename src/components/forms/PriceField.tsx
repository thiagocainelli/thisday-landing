import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { applyPriceMask, removePriceMask } from "@/utils/priceMask";
import FormFieldWrapper from "./FormFieldWrapper";

interface PriceFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  showIcon?: boolean;
  required?: boolean;
  className?: string;
}

const PriceField = <T extends FieldValues>({
  control,
  name,
  label = "Preço",
  placeholder = "R$ 0,00",
  error,
  disabled = false,
  showIcon = false,
  required = false,
  className = "",
}: PriceFieldProps<T>) => {
  return (
    <FormFieldWrapper
      label={label}
      htmlFor={String(name)}
      required={required}
      error={error}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            {showIcon && (
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              id={String(name)}
              type="text"
              placeholder={placeholder}
              value={field.value ? applyPriceMask(field.value) : ""}
              onChange={(e) => {
                const numericValue = removePriceMask(e.target.value);
                field.onChange(numericValue);
              }}
              onBlur={field.onBlur}
              className={cn(error && "border-destructive", showIcon && "pl-10")}
              disabled={disabled}
            />
          </div>
        )}
      />
    </FormFieldWrapper>
  );
};

export default PriceField;

