import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { FileWithPreview } from "@/types/upload";
import { useEventData } from "@/hooks/useEventData";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFileView } from "@/hooks/useFileView";
import { revokeFileUrls } from "@/utils/fileUtils";
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
  const { eventName, isLoading } = useEventData(eventId);
  const { isProcessing, processingProgress, processFiles } =
    useFileProcessing();
  const { uploadState, uploadProgress, uploadFiles, resetUpload } =
    useFileUpload();
  const { selectedFileIndex, viewFile, navigateFile, closeView } =
    useFileView();

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

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

  const handleUpload = async () => {
    await uploadFiles(selectedFiles.length);
    selectedFiles.forEach(revokeFileUrls);
  };

  const handleReset = () => {
    selectedFiles.forEach(revokeFileUrls);
    setSelectedFiles([]);
    resetUpload();
    closeView();
  };

  const handleViewFile = (file: FileWithPreview) =>
    viewFile(file, selectedFiles);
  const handleNavigateFile = (index: number) =>
    navigateFile(index, selectedFiles.length);

  return (
    <>
      <SEO
        title="Enviar fotos e vídeos - thisday"
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

              {uploadState === "idle" && !isProcessing && (
                <UploadArea onFileSelect={handleFileSelect} />
              )}

              <AnimatePresence>
                {selectedFiles.length > 0 &&
                  uploadState === "idle" &&
                  !isProcessing && (
                    <FilePreviewGrid
                      files={selectedFiles}
                      onRemove={removeFile}
                      onView={handleViewFile}
                      onUpload={handleUpload}
                    />
                  )}
              </AnimatePresence>

              <AnimatePresence>
                {uploadState === "uploading" && (
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
