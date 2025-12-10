export interface FileWithPreview {
  file: File;
  preview: string;
  videoUrl?: string;
  id: string;
  type: "image" | "video";
  isExceededLimit?: boolean;
  watermarkedPreview?: string;
}

export type UploadState = "idle" | "uploading" | "success" | "error";
