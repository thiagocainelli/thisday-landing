import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { applyCpfMask } from "@/utils/cpfMask";
import FormFieldWrapper from "./FormFieldWrapper";

interface CpfFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const CpfField = <T extends FieldValues>({
  control,
  name,
  label = "CPF",
  placeholder = "000.000.000-00",
  error,
  disabled = false,
  required = false,
  className = "",
}: CpfFieldProps<T>) => {
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
            type="text"
            placeholder={placeholder}
            value={field.value || ""}
            onChange={(e) => {
              const maskedValue = applyCpfMask(e.target.value);
              field.onChange(maskedValue);
            }}
            onBlur={field.onBlur}
            className={error ? "border-destructive" : ""}
            disabled={disabled}
            maxLength={14}
          />
        )}
      />
    </FormFieldWrapper>
  );
};

export default CpfField;

