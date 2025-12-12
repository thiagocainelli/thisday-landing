import { CreditCard, QrCode } from "lucide-react";

interface PaymentMethodBadgeProps {
  method: "pix" | "credit";
  installments?: number;
}

const PaymentMethodBadge = ({
  method,
  installments,
}: PaymentMethodBadgeProps) => {
  const isPix = method === "pix";
  const Icon = isPix ? QrCode : CreditCard;
  const label = isPix ? "Pix" : "Cartão";

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" />
      <span className="capitalize">{label}</span>
      {installments && installments > 1 && (
        <span className="text-xs text-muted-foreground">({installments}x)</span>
      )}
    </div>
  );
};

export default PaymentMethodBadge;
