import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

const FormFieldWrapper = ({
  label,
  htmlFor,
  required = false,
  error,
  children,
  className = "",
}: FormFieldWrapperProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={htmlFor}>
        {label} {required && "*"}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default FormFieldWrapper;

