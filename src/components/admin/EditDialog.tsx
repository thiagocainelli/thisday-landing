import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DIALOG_MAX_WIDTH_CLASSES,
  type DialogMaxWidth,
} from "@/utils/dialogUtils";

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  maxWidth?: DialogMaxWidth;
  scrollable?: boolean;
}

const EditDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = "2xl",
  scrollable = true,
}: EditDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

export default EditDialog;
