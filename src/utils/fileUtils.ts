import { FileWithPreview } from "@/types/upload";

/**
 * Revoga URLs criadas para evitar memory leaks
 */
export const revokeFileUrls = (file: FileWithPreview): void => {
  if (file.type === "video" && file.videoUrl) {
    URL.revokeObjectURL(file.videoUrl);
  }
  if (file.preview?.startsWith("blob:")) {
    URL.revokeObjectURL(file.preview);
  }
};

/**
 * Cria um FileWithPreview a partir de um File
 */
export const createFileWithPreview = async (
  file: File,
  index: number,
  createPreview: (file: File) => Promise<string>
): Promise<FileWithPreview> => {
  const isVideo = file.type.startsWith("video/");
  const preview = await createPreview(file);
  const videoUrl = isVideo ? URL.createObjectURL(file) : undefined;

  return {
    file,
    preview,
    videoUrl,
    id: `${Date.now()}-${Math.random()}-${index}`,
    type: isVideo ? "video" : "image",
  };
};

