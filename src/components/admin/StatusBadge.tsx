import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "event" | "payment" | "user" | "plan";
  className?: string;
}

const StatusBadge = ({
  status,
  variant = "default",
  className,
}: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (variant) {
      case "event":
        return {
          active: {
            label: "Ativo",
            className:
              "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
          },
          expired: {
            label: "Expirado",
            className:
              "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
          },
          cancelled: {
            label: "Cancelado",
            className:
              "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          },
        };
      case "payment":
        return {
          pending: {
            label: "Pendente",
            className:
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
          },
          paid: {
            label: "Pago",
            className:
              "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
          },
          failed: {
            label: "Falhou",
            className:
              "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          },
          refunded: {
            label: "Reembolsado",
            className:
              "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
          },
        };
      case "user":
      case "plan":
      default:
        return {
          active: {
            label: "Ativo",
            className:
              "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
          },
          inactive: {
            label: "Inativo",
            className:
              "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
          },
        };
    }
  };

  const statusMap = getStatusConfig();
  const statusConfig =
    statusMap[status as keyof typeof statusMap] ||
    statusMap[Object.keys(statusMap)[0] as keyof typeof statusMap];

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        statusConfig.className,
        className
      )}
    >
      {statusConfig.label}
    </span>
  );
};

export default StatusBadge;
