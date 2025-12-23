import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { applyCpfMask } from "@/utils/cpfMask";
import { applyCnpjMask } from "@/utils/cnpjMask";
import FormFieldWrapper from "./FormFieldWrapper";

interface DocumentFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const DocumentField = <T extends FieldValues>({
  control,
  name,
  label = "Documento (CPF/CNPJ)",
  placeholder = "000.000.000-00 ou 00.000.000/0000-00",
  error,
  disabled = false,
  required = false,
  className = "",
}: DocumentFieldProps<T>) => {
  const applyDocumentMask = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    
    // Se tiver até 11 dígitos, assume CPF, senão CNPJ
    if (digits.length <= 11) {
      return applyCpfMask(value);
    } else {
      return applyCnpjMask(value);
    }
  };

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
              const maskedValue = applyDocumentMask(e.target.value);
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

export default DocumentField;

