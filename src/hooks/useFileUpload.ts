import { useState, useCallback } from "react";
import { UploadState } from "@/types/upload";
import { useToast } from "@/hooks/useToast";

interface UseFileUploadReturn {
  uploadState: UploadState;
  uploadProgress: number;
  uploadFiles: (fileCount: number) => Promise<void>;
  resetUpload: () => void;
}

/**
 * Hook para gerenciar o estado de upload de arquivos
 */
export const useFileUpload = (): UseFileUploadReturn => {
  const { toast } = useToast();
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFiles = useCallback(
    async (fileCount: number): Promise<void> => {
      if (fileCount === 0) {
        toast({
          title: "Nenhum arquivo selecionado",
          description: "Selecione pelo menos um arquivo para fazer upload.",
          variant: "destructive",
        });
        return;
      }

      setUploadState("uploading");
      setUploadProgress(0);

      try {
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        // Simular chamada à API
        await new Promise((resolve) => setTimeout(resolve, 2000));

        clearInterval(progressInterval);
        setUploadProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 500));

        setUploadState("success");

        toast({
          title: "Upload concluído!",
          description: `${fileCount} arquivo(s) enviado(s) com sucesso.`,
        });
      } catch (error) {
        setUploadState("error");
        toast({
          title: "Erro no upload",
          description:
            "Ocorreu um erro ao fazer upload dos arquivos. Tente novamente.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const resetUpload = useCallback(() => {
    setUploadState("idle");
    setUploadProgress(0);
  }, []);

  return {
    uploadState,
    uploadProgress,
    uploadFiles,
    resetUpload,
  };
};
