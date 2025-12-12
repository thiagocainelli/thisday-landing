import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPluralizedCount } from "@/utils/pluralUtils";

interface SelectionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkDelete?: () => void;
  onBulkDeleteClick?: () => void; // New prop to trigger confirmation dialog
  bulkActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  }>;
}

const SelectionToolbar = ({
  selectedCount,
  onClearSelection,
  onBulkDelete,
  onBulkDeleteClick,
  bulkActions = [],
}: SelectionToolbarProps) => {
  if (selectedCount === 0) return null;

  const getDeleteAction = () => {
    if (!onBulkDelete && !onBulkDeleteClick) return null;

    return {
      label: "Excluir selecionados",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onBulkDeleteClick || onBulkDelete || (() => {}),
      variant: "destructive" as const,
    };
  };

  const deleteAction = getDeleteAction();
  const allActions = [...bulkActions, ...(deleteAction ? [deleteAction] : [])];

  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-primary/5 border-b border-border rounded-t-md">
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="font-medium">
          {formatPluralizedCount(
            selectedCount,
            "item selecionado",
            "itens selecionados"
          )}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="h-7 text-xs"
        >
          <X className="h-3 w-3 mr-1" />
          Limpar seleção
        </Button>
      </div>

      {allActions.length > 0 && (
        <div className="flex items-center gap-2">
          {allActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              size="sm"
              onClick={action.onClick}
              className="h-7 text-xs"
            >
              {action.icon && <span className="mr-1">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionToolbar;
