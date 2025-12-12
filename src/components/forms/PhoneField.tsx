import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { applyPhoneMask } from "@/utils/phoneMask";
import FormFieldWrapper from "./FormFieldWrapper";

interface PhoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const PhoneField = <T extends FieldValues>({
  control,
  name,
  label = "Telefone",
  placeholder = "(00) 00000-0000",
  error,
  disabled = false,
  required = true,
  className = "",
}: PhoneFieldProps<T>) => {
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
          <Input
            id={String(name)}
            type="tel"
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(e) => {
              const maskedValue = applyPhoneMask(e.target.value);
              field.onChange(maskedValue);
            }}
            onBlur={field.onBlur}
            className={error ? "border-destructive" : ""}
            disabled={disabled}
            maxLength={15}
          />
        )}
      />
    </FormFieldWrapper>
  );
};

export default PhoneField;

