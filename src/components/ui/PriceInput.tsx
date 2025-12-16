import React from "react";
import { Input } from "./input";
import { applyPriceMask, removePriceMask } from "@/utils/priceMask";
import { cn } from "@/lib/utils";

interface PriceInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: number;
  onChange?: (value: number) => void;
  error?: boolean;
}

const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value = 0, onChange, error, className, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(() =>
      applyPriceMask(value)
    );

    React.useEffect(() => {
      // Quando o valor externo muda, atualizar o display
      setDisplayValue(applyPriceMask(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Se o campo estiver vazio ou apenas "R$ ", limpar
      if (!inputValue || inputValue === "R$ " || inputValue === "R$") {
        setDisplayValue("");
        onChange?.(0);
        return;
      }

      // Remover tudo que não é dígito para processar
      const digits = inputValue.replace(/\D/g, "");

      if (!digits) {
        setDisplayValue("");
        onChange?.(0);
        return;
      }

      // Converter para número (dividindo por 100 porque os dígitos são em centavos)
      const numericValue = parseInt(digits, 10) / 100;

      // Aplicar máscara na string de dígitos (passa como string para dividir por 100)
      const masked = applyPriceMask(digits);
      setDisplayValue(masked);

      // Chamar onChange com o valor numérico
      onChange?.(numericValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Garantir que sempre tenha a máscara completa ao perder o foco
      if (displayValue && displayValue !== "R$ " && displayValue !== "R$") {
        const numericValue = removePriceMask(displayValue);
        setDisplayValue(applyPriceMask(numericValue));
      } else {
        setDisplayValue("");
        onChange?.(0);
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="R$ 0,00"
        className={cn(error && "border-destructive", className)}
        {...props}
      />
    );
  }
);

PriceInput.displayName = "PriceInput";

export default PriceInput;
