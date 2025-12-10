import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileWithPreview } from "@/types/upload";
import { formatFileSize } from "@/utils/fileSize";

interface FileViewModalProps {
  files: FileWithPreview[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const FileViewModal = ({
  files,
  currentIndex,
  onClose,
  onNavigate,
}: FileViewModalProps) => {
  const isValid =
    files.length > 0 && currentIndex >= 0 && currentIndex < files.length;
  const hasPrevious = isValid && currentIndex > 0;
  const hasNext = isValid && currentIndex < files.length - 1;

  // Navegação por teclado
  useEffect(() => {
    if (!isValid) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrevious) {
        e.preventDefault();
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && hasNext) {
        e.preventDefault();
        onNavigate(currentIndex + 1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext, onNavigate, onClose, isValid]);

  if (!isValid) {
    return null;
  }

  const file = files[currentIndex];
  const isVideo = file.type === "video";

  const handlePrevious = () => hasPrevious && onNavigate(currentIndex - 1);
  const handleNext = () => hasNext && onNavigate(currentIndex + 1);

  return (
    <Dialog open={isValid} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 gap-0 bg-black/95">
        <div className="relative w-full">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 active:bg-black/80 text-white transition-colors touch-manipulation"
            aria-label="Fechar"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Botão anterior */}
          {hasPrevious && (
            <button
              onClick={handlePrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/70 active:bg-black/80 text-white transition-colors touch-manipulation"
              aria-label="Arquivo anterior"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          )}

          {/* Botão próximo */}
          {hasNext && (
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/70 active:bg-black/80 text-white transition-colors touch-manipulation"
              aria-label="Próximo arquivo"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          )}

          {/* Conteúdo do modal */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {!isVideo ? (
                  <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px] max-h-[85vh] p-4">
                    <img
                      src={file.watermarkedPreview || file.preview}
                      alt={file.file.name}
                      className="max-w-full max-h-[85vh] object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-black">
                    <video
                      key={file.id}
                      src={file.videoUrl || file.preview}
                      controls
                      className="w-full h-full"
                      autoPlay
                    >
                      Seu navegador não suporta a reprodução de vídeos.
                    </video>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Indicador de posição */}
            {files.length > 1 && (
              <div className="absolute top-4 left-4 z-40 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs md:text-sm font-medium">
                {currentIndex + 1} / {files.length}
              </div>
            )}
          </div>

          {/* Informações do arquivo */}
          <div className="p-4 bg-black/50 border-t border-white/10">
            <p className="text-white text-sm font-medium truncate">
              {file.file.name}
            </p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-white/70 text-xs">
                {formatFileSize(file.file.size)}
              </p>
              {files.length > 1 && (
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <button
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    className="px-2 py-1 rounded bg-black/30 hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-white/90">
                    {currentIndex + 1} / {files.length}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={!hasNext}
                    className="px-2 py-1 rounded bg-black/30 hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewModal;
