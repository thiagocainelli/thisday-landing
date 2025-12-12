import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps<T> {
  item: T;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const ActionButtons = <T,>({
  item,
  onView,
  onEdit,
  onDelete,
}: ActionButtonsProps<T>) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    handler?: (item: T) => void
  ) => {
    e.stopPropagation();
    if (handler) {
      handler(item);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleClick(e, onView)}
          title="Visualizar"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleClick(e, onEdit)}
          title="Editar"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleClick(e, onDelete)}
          title="Excluir"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;

