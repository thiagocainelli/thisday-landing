import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileWithPreview } from "@/types/upload";
import FilePreviewItem from "@/components/upload/FilePreviewItem";

interface FilePreviewGridProps {
  files: FileWithPreview[];
  onRemove: (id: string) => void;
  onView: (file: FileWithPreview) => void;
  onUpload: () => void;
}

const FilePreviewGrid = ({
  files,
  onRemove,
  onView,
  onUpload,
}: FilePreviewGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-6"
    >
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Arquivos selecionados ({files.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                files.forEach((f) => onRemove(f.id));
              }}
              className="text-gray-600"
            >
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {files.map((file) => (
              <FilePreviewItem
                key={file.id}
                file={file}
                showRemove
                onRemove={onRemove}
                onView={onView}
              />
            ))}
          </div>

          <Button
            onClick={onUpload}
            variant="default"
            size="lg"
            className="w-full mt-6"
          >
            <Upload className="h-4 w-4 mr-2" />
            Confirmar Upload ({files.length} arquivo
            {files.length !== 1 ? "s" : ""})
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilePreviewGrid;
