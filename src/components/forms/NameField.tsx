import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormFieldWrapper from "./FormFieldWrapper";

interface NameFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const NameField = <T extends FieldValues>({
  control,
  name,
  label = "Nome",
  placeholder = "Seu nome",
  error,
  disabled = false,
  required = true,
  className = "",
}: NameFieldProps<T>) => {
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
            placeholder={placeholder}
            className={error ? "border-destructive" : ""}
            disabled={disabled}
            {...field}
          />
        )}
      />
    </FormFieldWrapper>
  );
};

export default NameField;
