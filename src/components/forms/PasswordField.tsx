import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";

interface PasswordFieldProps<T extends FieldValues> {
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

const PasswordField = <T extends FieldValues>({
  control,
  name,
  label = "Senha",
  placeholder = "••••••••",
  error,
  disabled = false,
  showIcon = false,
  required = true,
  className = "",
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

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
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              id={String(name)}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className={cn(
                error && "border-destructive",
                showIcon ? "pl-10 pr-10" : "pr-10"
              )}
              disabled={disabled}
              {...field}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      />
    </FormFieldWrapper>
  );
};

export default PasswordField;
