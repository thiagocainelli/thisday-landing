/**
 * Cria um preview (thumbnail) para imagens e vídeos
 * @param file - Arquivo a ser processado
 * @returns Promise com a URL do preview (data URL para imagens, canvas para vídeos)
 */
export const createPreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve((e.target?.result as string) || "");
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      const url = URL.createObjectURL(file);
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        video.currentTime = 0.1;
      };
      video.onseeked = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            URL.revokeObjectURL(url);
            resolve("");
            return;
          }
          ctx.drawImage(video, 0, 0);
          const dataUrl = canvas.toDataURL();
          URL.revokeObjectURL(url);
          resolve(dataUrl);
        } catch {
          URL.revokeObjectURL(url);
          resolve("");
        }
      };
      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve("");
      };
      video.src = url;
    } else {
      resolve("");
    }
  });
};
