import { useState, useCallback } from "react";
import { FileWithPreview } from "@/types/upload";
import { ALLOWED_TYPES } from "@/constants/fileTypes";
import { createPreview } from "@/utils/filePreview";
import { createFileWithPreview } from "@/utils/fileUtils";
import { useToast } from "@/hooks/useToast";

interface UseFileProcessingReturn {
  isProcessing: boolean;
  processingProgress: number;
  processFiles: (files: FileList | null) => Promise<FileWithPreview[]>;
}

/**
 * Hook para processar arquivos selecionados (validação, preview, etc)
 */
export const useFileProcessing = (): UseFileProcessingReturn => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const isValidFileType = useCallback((file: File): boolean => {
    return ALLOWED_TYPES.includes(file.type);
  }, []);

  const processFiles = useCallback(
    async (files: FileList | null): Promise<FileWithPreview[]> => {
      if (!files || files.length === 0) return [];

      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      Array.from(files).forEach((file) => {
        if (isValidFileType(file)) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      });

      if (invalidFiles.length > 0) {
        toast({
          title: "Arquivos inválidos",
          description: `Os seguintes arquivos não são permitidos: ${invalidFiles.join(
            ", "
          )}. Apenas fotos e vídeos são aceitos.`,
          variant: "destructive",
        });
      }

      if (validFiles.length === 0) return [];

      setIsProcessing(true);
      setProcessingProgress(0);

      const filesWithPreview: FileWithPreview[] = [];
      const totalFiles = validFiles.length;

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const fileWithPreview = await createFileWithPreview(
          file,
          i,
          createPreview
        );
        filesWithPreview.push(fileWithPreview);

        const progress = Math.round(((i + 1) / totalFiles) * 100);
        setProcessingProgress(progress);
      }

      setIsProcessing(false);
      setProcessingProgress(0);

      return filesWithPreview;
    },
    [toast, isValidFileType]
  );

  return {
    isProcessing,
    processingProgress,
    processFiles,
  };
};
