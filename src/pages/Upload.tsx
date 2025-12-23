import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { FileWithPreview } from "@/types/upload";
import { useEventData } from "@/hooks/useEventData";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useFileView } from "@/hooks/useFileView";
import { revokeFileUrls } from "@/utils/fileUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFilesToEvent } from "@/services/storage.service";
import { useToast } from "@/hooks/useToast";
import EventBanner from "@/components/upload/EventBanner";
import UploadArea from "@/components/upload/UploadArea";
import ProcessingIndicator from "@/components/upload/ProcessingIndicator";
import FilePreviewGrid from "@/components/upload/FilePreviewGrid";
import FileViewModal from "@/components/upload/FileViewModal";
import UploadProgress from "@/components/upload/UploadProgress";
import UploadStatus from "@/components/upload/UploadStatus";
import FileInfo from "@/components/upload/FileInfo";
import UploadSkeleton from "@/components/upload/UploadSkeleton";

const UploadPage = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { eventName, isLoading, event } = useEventData(eventId);
  const { isProcessing, processingProgress, processFiles } =
    useFileProcessing();
  const { selectedFileIndex, viewFile, navigateFile, closeView } =
    useFileView();
  const queryClient = useQueryClient();

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const handleFileSelect = async (files: FileList | null) => {
    const processedFiles = await processFiles(files);
    if (processedFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...processedFiles]);
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        revokeFileUrls(fileToRemove);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  // Mutation para upload de arquivos
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      if (!event?.uuid) {
        throw new Error("Event UUID é obrigatório");
      }
      return await uploadFilesToEvent(event.uuid, files, (progress) => {
        setUploadProgress(progress);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["storage", "event", event?.uuid],
      });
      queryClient.invalidateQueries({
        queryKey: ["event", "details", eventId],
      });
      setUploadState("success");
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Upload concluído!",
        description: "Arquivos enviados com sucesso.",
      });
      // Redirecionar para a galeria após 2 segundos
      setTimeout(() => {
        if (event?.shareCode) {
          navigate(`/galeria/${event.shareCode}`);
        }
      }, 2000);
    },
    onError: (error: Error) => {
      setUploadState("error");
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Erro no upload",
        description:
          error.message || "Ocorreu um erro ao fazer upload dos arquivos.",
        variant: "destructive",
      });
    },
  });

  const handleUpload = async () => {
    if (!event?.uuid || selectedFiles.length === 0) return;

    const files = selectedFiles
      .map((f) => f.file)
      .filter((f): f is File => f !== null);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadState("uploading");
    setUploadProgress(0);

    try {
      await uploadMutation.mutateAsync(files);
      selectedFiles.forEach(revokeFileUrls);
    } catch (error) {
      // Erro já tratado no onError do mutation
    }
  };

  const handleReset = () => {
    selectedFiles.forEach(revokeFileUrls);
    setSelectedFiles([]);
    setUploadState("idle");
    setUploadProgress(0);
    setIsUploading(false);
    closeView();
  };

  const handleViewFile = (file: FileWithPreview) =>
    viewFile(file, selectedFiles);
  const handleNavigateFile = (index: number) =>
    navigateFile(index, selectedFiles.length);

  return (
    <>
      <SEO
        title="Enviar fotos e vídeos - shareday"
        description="Envie suas fotos e vídeos para o evento usando este link. Simples, rápido e sem necessidade de cadastro."
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <EventBanner eventName={eventName} />

        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl -mt-8 md:-mt-12">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <UploadSkeleton />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <AnimatePresence>
                {isProcessing && (
                  <ProcessingIndicator progress={processingProgress} />
                )}
              </AnimatePresence>

              {(uploadState === "idle" ||
                uploadState === "success" ||
                uploadState === "error") &&
                !isProcessing &&
                !isUploading && <UploadArea onFileSelect={handleFileSelect} />}

              <AnimatePresence>
                {selectedFiles.length > 0 &&
                  uploadState === "idle" &&
                  !isProcessing &&
                  !isUploading && (
                    <FilePreviewGrid
                      files={selectedFiles}
                      onRemove={removeFile}
                      onView={handleViewFile}
                      onUpload={handleUpload}
                    />
                  )}
              </AnimatePresence>

              <AnimatePresence>
                {isUploading && uploadState === "uploading" && (
                  <UploadProgress progress={uploadProgress} />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {(uploadState === "success" || uploadState === "error") && (
                  <UploadStatus
                    state={uploadState}
                    fileCount={selectedFiles.length}
                    onReset={handleReset}
                  />
                )}
              </AnimatePresence>

              {uploadState === "idle" &&
                selectedFiles.length === 0 &&
                !isProcessing && <FileInfo />}
            </motion.div>
          )}
        </main>

        {selectedFileIndex !== null && (
          <FileViewModal
            files={selectedFiles}
            currentIndex={selectedFileIndex}
            onClose={closeView}
            onNavigate={handleNavigateFile}
          />
        )}
      </div>
    </>
  );
};

export default UploadPage;
