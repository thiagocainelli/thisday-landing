import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileWithPreview } from "@/types/upload";
import FilePreviewItem from "@/components/upload/FilePreviewItem";

interface GalleryGridProps {
  files: FileWithPreview[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onView: (file: FileWithPreview) => void;
  onRemove: (id: string) => void;
}

const GalleryGrid = ({
  files,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onView,
  onRemove,
}: GalleryGridProps) => {
  const allSelected = files.length > 0 && selectedIds.size === files.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < files.length;

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Galeria ({files.length} arquivo{files.length !== 1 ? "s" : ""})
          </h3>
          <div className="flex items-center gap-2">
            {someSelected && (
              <Button
                variant="outline"
                size="sm"
                onClick={onDeselectAll}
                className="text-xs"
              >
                Desmarcar
              </Button>
            )}
            <Button
              variant={allSelected ? "default" : "outline"}
              size="sm"
              onClick={allSelected ? onDeselectAll : onSelectAll}
              className="text-xs"
            >
              {allSelected ? "Desmarcar todos" : "Selecionar todos"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {files.map((file) => (
            <FilePreviewItem
              key={file.id}
              file={file}
              isSelected={selectedIds.has(file.id)}
              showCheckbox
              showRemove
              onRemove={onRemove}
              onToggleSelect={onToggleSelect}
              onView={onView}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryGrid;
