import { motion } from "framer-motion";
import { X, Video, Check, AlertTriangle, Lock } from "lucide-react";
import { FileWithPreview } from "@/types/upload";

interface FilePreviewItemProps {
  file: FileWithPreview;
  isSelected?: boolean;
  showRemove?: boolean;
  showCheckbox?: boolean;
  onRemove?: (id: string) => void;
  onToggleSelect?: (id: string) => void;
  onView: (file: FileWithPreview) => void;
}

const FilePreviewItem = ({
  file,
  isSelected = false,
  showRemove = false,
  showCheckbox = false,
  onRemove,
  onToggleSelect,
  onView,
}: FilePreviewItemProps) => {
  const isVideo = file.type === "video";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative group"
    >
      <div
        className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all ${
          isSelected
            ? "ring-4 ring-primary ring-offset-2"
            : file.isExceededLimit
            ? "cursor-not-allowed"
            : "hover:opacity-90"
        }`}
        onClick={() => {
          if (file.isExceededLimit) return;
          onView(file);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onView(file);
          }
        }}
        aria-label={`Visualizar ${file.file.name}`}
      >
        {!isVideo ? (
          <img
            src={file.watermarkedPreview || file.preview}
            alt={file.file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
            <img
              src={file.preview}
              alt={file.file.name}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                <Video className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        )}

        {showCheckbox && onToggleSelect && !file.isExceededLimit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect(file.id);
            }}
            className={`absolute top-2 left-2 z-10 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all touch-manipulation ${
              isSelected
                ? "bg-primary text-white"
                : `bg-white/80 hover:bg-white text-gray-600 border ${
                    !isSelected ? "border-2 border-[#2563eb]" : ""
                  }`
            }`}
            aria-label={isSelected ? "Desmarcar" : "Selecionar arquivo"}
          >
            {isSelected && <Check className="h-4 w-4 md:h-5 md:w-5" />}
          </button>
        )}

        {showRemove && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(file.id);
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Remover arquivo"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {/* Overlay e badges para arquivo excedente */}
        {file.isExceededLimit && (
          <>
            {/* Overlay escuro com padrão diagonal */}
            <div className="absolute inset-0 bg-transparent z-10 pointer-events-none" />
            <div
              className="absolute inset-0 opacity-20 z-10 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255, 255, 255, 0.1) 10px,
                  rgba(255, 255, 255, 0.1) 20px
                )`,
              }}
            />

            {/* Badge centralizado grande */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="relative">
                {/* Efeito de pulso de fundo */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-transparent rounded-full blur-2xl -z-10"
                />
                {/* Badge principal */}
                <div className="relative bg-gradient-to-br from-primary via-[#1f4fd8] to-[#38bdf8] text-white px-4 py-3 rounded-xl shadow-2xl border-2 border-white/40 backdrop-blur-md">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="h-5 w-5" />
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Limite Excedido
                      </p>
                      <p className="text-[10px] opacity-90 mt-0.5">
                        Compra necessária
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
        {isVideo && (
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
            <Video className="h-3 w-3 inline mr-1" />
            Vídeo
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-600 truncate">{file.file.name}</p>
    </motion.div>
  );
};

export default FilePreviewItem;
