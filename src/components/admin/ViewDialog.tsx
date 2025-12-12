import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DIALOG_MAX_WIDTH_CLASSES,
  type DialogMaxWidth,
} from "@/utils/dialogUtils";

interface ViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  maxWidth?: DialogMaxWidth;
  scrollable?: boolean;
}

const ViewDialog = ({
  open,
  onOpenChange,
  title,
  children,
  maxWidth = "2xl",
  scrollable = true,
}: ViewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${DIALOG_MAX_WIDTH_CLASSES[maxWidth]} ${
          scrollable ? "max-h-[90vh] overflow-y-auto" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
