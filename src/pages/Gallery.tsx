import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Upload, Image as ImageIcon, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import SEO from "@/components/seo/SEO";
import { FileWithPreview } from "@/types/upload";
import { useEventData } from "@/hooks/useEventData";
import { useFileProcessing } from "@/hooks/useFileProcessing";
import { useFileView } from "@/hooks/useFileView";
import { downloadMultipleFiles } from "@/utils/downloadFiles";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStorageByEvent,
  uploadFilesToEvent,
} from "@/services/storage.service";
import { ReadStorageDto } from "@/types/storage.dto";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatFileSize } from "@/utils/storageCalculator";
import { formatStorage } from "@/utils/storageFormatter";
import EventBanner from "@/components/upload/EventBanner";
import UploadArea from "@/components/upload/UploadArea";
import ProcessingIndicator from "@/components/upload/ProcessingIndicator";
import GalleryGrid from "@/components/upload/GalleryGrid";
import FileViewModal from "@/components/upload/FileViewModal";
import UploadProgress from "@/components/upload/UploadProgress";
import UploadStatus from "@/components/upload/UploadStatus";
import ShareButtons from "@/components/upload/ShareButtons";
import GallerySkeleton from "@/components/upload/GallerySkeleton";
import AdditionalStoragePurchase from "@/components/upload/AdditionalPhotosPurchase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Gallery = () => {
  const { eventId } = useParams<{ eventId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    eventName,
    storageLimit,
    storageUsedGB,
    isLoading: isLoadingEvent,
    event,
    plan,
  } = useEventData(eventId);
  const { isProcessing, processingProgress, processFiles } =
    useFileProcessing();
  const { selectedFileIndex, viewFile, navigateFile, closeView } =
    useFileView();
  const queryClient = useQueryClient();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Buscar arquivos do evento da API
  const { data: storageData, isLoading: isLoadingFiles } = useQuery({
    queryKey: ["storage", "event", event?.uuid],
    queryFn: () => {
      if (!event?.uuid) {
        throw new Error("Event UUID é obrigatório");
      }
      return getStorageByEvent(event.uuid, 1, 1000);
    },
    enabled: !!event?.uuid,
    staleTime: 30 * 1000, // 30 segundos
  });

  const galleryFiles: FileWithPreview[] = useMemo(() => {
    if (!storageData?.data) return [];

    // Calcular quais arquivos excedem o limite baseado no totalSize
    // Se storageUsedGB > storageLimit, marcar todos como excedidos
    const isExceeded = storageLimit > 0 && storageUsedGB > storageLimit;

    return storageData.data.map((file: ReadStorageDto) => ({
      id: file.uuid,
      file: null as unknown as File, // Arquivo já está no servidor
      preview: file.url,
      videoUrl: file.mimetype?.startsWith("video/") ? file.url : undefined,
      type: file.mimetype?.startsWith("video/") ? "video" : "image",
      isExceededLimit: isExceeded,
    }));
  }, [storageData, storageLimit, storageUsedGB]);

  const isLoading = isLoadingEvent || isLoadingFiles;

  // Usar storageUsedGB da API
  const usedStorageGB = storageUsedGB || 0;

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
      toast({
        title: "Upload concluído!",
        description: "Arquivos enviados com sucesso.",
      });
      setIsUploading(false);
      setUploadProgress(0);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no upload",
        description:
          error.message || "Ocorreu um erro ao fazer upload dos arquivos.",
        variant: "destructive",
      });
      setIsUploading(false);
      setUploadProgress(0);
    },
  });

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0 || !event?.uuid) return;

    const fileArray = Array.from(files);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await uploadMutation.mutateAsync(fileArray);
      setShowUploadArea(false);
    } catch (error) {
      // Erro já tratado no onError do mutation
    }
  };

  const handleRemoveFile = async (id: string) => {
    // TODO: Implementar delete via API quando necessário
    // Por enquanto, apenas remover da lista local
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A remoção de arquivos será implementada em breve.",
    });
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(
      new Set(galleryFiles.filter((f) => !f.isExceededLimit).map((f) => f.id))
    );
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleDownloadSelected = async () => {
    if (selectedIds.size === 0) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Selecione pelo menos um arquivo para baixar.",
        variant: "destructive",
      });
      return;
    }

    const filesToDownload = galleryFiles.filter((f) => selectedIds.has(f.id));

    try {
      await downloadMultipleFiles(filesToDownload);
      toast({
        title: "Download iniciado!",
        description: `${filesToDownload.length} arquivo(s) sendo baixado(s).`,
      });
      setSelectedIds(new Set());
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro ao baixar os arquivos. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleViewFile = (file: FileWithPreview) =>
    viewFile(file, galleryFiles);
  const handleNavigateFile = (index: number) =>
    navigateFile(index, galleryFiles.length);

  // Calcular armazenamento adicional usado (em GB)
  const additionalStorageGB = useMemo(() => {
    if (storageLimit === 0) return 0;
    return Math.max(0, usedStorageGB - storageLimit);
  }, [usedStorageGB, storageLimit]);

  const handlePurchaseAdditionalStorage = (storageGB: number) => {
    if (!event?.uuid) {
      toast({
        title: "Erro",
        description: "Evento não encontrado.",
        variant: "destructive",
      });
      return;
    }

    // Navegar para checkout com dados no state
    navigate("/checkout", {
      state: {
        additionalStorage: {
          eventUuid: event.uuid,
          storageGB,
          eventName,
        },
      },
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = `Galeria do evento: ${eventName}`;
  const shareDescription = "Confira as fotos e vídeos do nosso evento!";

  return (
    <>
      <SEO
        title={`Galeria - ${eventName} - shareday`}
        description={`Visualize todas as fotos e vídeos do evento ${eventName}. Compartilhe suas memórias!`}
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <EventBanner eventName={eventName} />

        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl -mt-8 md:-mt-12">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <GallerySkeleton />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedIds.size > 0 && (
                    <Button
                      onClick={handleDownloadSelected}
                      variant="default"
                      size="sm"
                      className="flex-1 sm:flex-initial"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar ({selectedIds.size})
                    </Button>
                  )}
                  <Button
                    onClick={() => setShowUploadArea(!showUploadArea)}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-initial"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {showUploadArea ? "Ocultar upload" : "Adicionar arquivos"}
                  </Button>
                </div>
                <ShareButtons
                  url={shareUrl}
                  title={shareTitle}
                  description={shareDescription}
                />
              </div>

              <AnimatePresence>
                {isProcessing && (
                  <ProcessingIndicator progress={processingProgress} />
                )}
              </AnimatePresence>

              {!isLoading && additionalStorageGB > 0 && (
                <AdditionalStoragePurchase
                  additionalStorageGB={additionalStorageGB}
                  onPurchase={handlePurchaseAdditionalStorage}
                />
              )}

              <AnimatePresence>
                {showUploadArea && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <UploadArea onFileSelect={handleFileSelect} />
                  </motion.div>
                )}
              </AnimatePresence>

              {galleryFiles.length > 0 ? (
                <GalleryGrid
                  files={galleryFiles}
                  selectedIds={selectedIds}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onView={handleViewFile}
                  onRemove={handleRemoveFile}
                />
              ) : (
                !showUploadArea && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white">
                      <CardContent className="p-8 md:p-16 text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="mb-6"
                        >
                          <div className="relative inline-block">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                            <div className="relative p-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                              <ImageIcon className="h-16 w-16 md:h-20 md:w-20 text-primary" />
                            </div>
                            <motion.div
                              animate={{
                                rotate: [0, 10, -10, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="absolute -top-2 -right-2"
                            >
                              <Sparkles className="h-8 w-8 text-primary/60" />
                            </motion.div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Galeria vazia
                          </h3>
                          <p className="text-gray-600 text-base md:text-lg mb-2 max-w-md mx-auto">
                            Ainda não há fotos ou vídeos na galeria deste
                            evento.
                          </p>
                          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
                            Compartilhe o link com seus convidados ou adicione
                            os primeiros arquivos você mesmo!
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <Button
                            onClick={() => setShowUploadArea(true)}
                            variant="default"
                            size="lg"
                            className="shadow-lg hover:shadow-xl transition-shadow"
                          >
                            <Upload className="h-5 w-5 mr-2" />
                            Adicionar primeiros arquivos
                          </Button>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400"
                        >
                          <ImageIcon className="h-4 w-4" />
                          <span>Fotos e vídeos serão exibidos aqui</span>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              )}

              <AnimatePresence>
                {isUploading && <UploadProgress progress={uploadProgress} />}
              </AnimatePresence>
            </motion.div>
          )}
        </main>

        {selectedFileIndex !== null && (
          <FileViewModal
            files={galleryFiles}
            currentIndex={selectedFileIndex}
            onClose={closeView}
            onNavigate={handleNavigateFile}
          />
        )}
      </div>
    </>
  );
};

export default Gallery;
