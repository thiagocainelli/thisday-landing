import { FileWithPreview } from "@/types/upload";
import { DOWNLOAD_DELAY_MS } from "@/constants/upload";

/**
 * Baixa um arquivo individual
 */
export const downloadFile = async (
  fileWithPreview: FileWithPreview
): Promise<void> => {
  try {
    const url =
      fileWithPreview.type === "video" && fileWithPreview.videoUrl
        ? fileWithPreview.videoUrl
        : fileWithPreview.preview;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileWithPreview.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Erro ao baixar arquivo:", error);
    throw error;
  }
};

/**
 * Baixa múltiplos arquivos como ZIP
 * Nota: Em produção, isso deveria ser feito no backend
 */
export const downloadMultipleFiles = async (
  files: FileWithPreview[]
): Promise<void> => {
  if (files.length === 0) return;

  // Se for apenas um arquivo, baixar diretamente
  if (files.length === 1) {
    await downloadFile(files[0]);
    return;
  }

  // Para múltiplos arquivos, baixar um por vez
  // (Em produção, o backend deveria criar um ZIP)
  for (let i = 0; i < files.length; i++) {
    await downloadFile(files[i]);
    // Pequeno delay para evitar bloqueio do navegador
    if (i < files.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, DOWNLOAD_DELAY_MS));
    }
  }
};
