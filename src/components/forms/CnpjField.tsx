import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { applyCnpjMask } from "@/utils/cnpjMask";
import FormFieldWrapper from "./FormFieldWrapper";

interface CnpjFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const CnpjField = <T extends FieldValues>({
  control,
  name,
  label = "CNPJ",
  placeholder = "00.000.000/0000-00",
  error,
  disabled = false,
  required = false,
  className = "",
}: CnpjFieldProps<T>) => {
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
              const maskedValue = applyCnpjMask(e.target.value);
              field.onChange(maskedValue);
            }}
            onBlur={field.onBlur}
            className={error ? "border-destructive" : ""}
            disabled={disabled}
            maxLength={18}
          />
        )}
      />
    </FormFieldWrapper>
  );
};

export default CnpjField;

