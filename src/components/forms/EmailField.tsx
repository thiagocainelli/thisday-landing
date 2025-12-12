import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";

interface EmailFieldProps<T extends FieldValues> {
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

const EmailField = <T extends FieldValues>({
  control,
  name,
  label = "E-mail",
  placeholder = "seu@email.com",
  error,
  disabled = false,
  showIcon = false,
  required = true,
  className = "",
}: EmailFieldProps<T>) => {
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
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              id={String(name)}
              type="email"
              placeholder={placeholder}
              className={cn(error && "border-destructive", showIcon && "pl-10")}
              disabled={disabled}
              {...field}
            />
          </div>
        )}
      />
    </FormFieldWrapper>
  );
};

export default EmailField;
