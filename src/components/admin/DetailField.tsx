import { ReactNode } from "react";

interface DetailFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const DetailField = ({ label, value, className }: DetailFieldProps) => {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
};

export default DetailField;

