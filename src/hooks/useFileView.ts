import { useState, useCallback } from "react";
import { FileWithPreview } from "@/types/upload";

interface UseFileViewReturn {
  selectedFileIndex: number | null;
  viewFile: (file: FileWithPreview, files: FileWithPreview[]) => void;
  navigateFile: (index: number, filesLength: number) => void;
  closeView: () => void;
}

/**
 * Hook para gerenciar visualização de arquivos no modal
 */
export const useFileView = (): UseFileViewReturn => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );

  const viewFile = useCallback(
    (file: FileWithPreview, files: FileWithPreview[]) => {
      const index = files.findIndex((f) => f.id === file.id);
      setSelectedFileIndex(index >= 0 ? index : null);
    },
    []
  );

  const navigateFile = useCallback((index: number, filesLength: number) => {
    if (index >= 0 && index < filesLength) {
      setSelectedFileIndex(index);
    }
  }, []);

  const closeView = useCallback(() => {
    setSelectedFileIndex(null);
  }, []);

  return {
    selectedFileIndex,
    viewFile,
    navigateFile,
    closeView,
  };
};
