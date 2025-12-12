import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DIALOG_MAX_WIDTH_CLASSES,
  type DialogMaxWidth,
} from "@/utils/dialogUtils";

interface CreateEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  title: string;
  description: string;
  children: ReactNode;
  maxWidth?: DialogMaxWidth;
  scrollable?: boolean;
}

const CreateEditDialog = ({
  open,
  onOpenChange,
  triggerLabel,
  title,
  description,
  children,
  maxWidth = "2xl",
  scrollable = true,
}: CreateEditDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="hero" className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${DIALOG_MAX_WIDTH_CLASSES[maxWidth]} ${
          scrollable ? "max-h-[90vh] overflow-y-auto" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditDialog;
