/**
 * Aplica marca d'água em uma imagem
 */
export const applyWatermark = (
  imageUrl: string,
  text: string = "shareday"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Não foi possível criar contexto do canvas"));
          return;
        }

        // Desenhar imagem original
        ctx.drawImage(img, 0, 0);

        // Configurar estilo da marca d'água
        ctx.font = `${Math.max(img.width / 15, 18)}px Arial`;
        ctx.fillStyle = "rgba(37, 99, 235)";
        ctx.lineWidth = 2;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "rgba(0, 0, 0)";

        // Calcular posição (centro da imagem)
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        // Desenhar marca d'água com contorno
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);

        // Adicionar marca d'água diagonal repetida
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 4);
        ctx.font = `${Math.max(img.width / 20, 18)}px Arial`;
        ctx.fillStyle = "rgba(37, 99, 235)";
        ctx.strokeStyle = "rgba(0, 0, 0)";

        for (let i = -2; i <= 2; i++) {
          for (let j = -2; j <= 2; j++) {
            if (i !== 0 || j !== 0) {
              ctx.strokeText(text, i * (img.width / 3), j * (img.height / 3));
              ctx.fillText(text, i * (img.width / 3), j * (img.height / 3));
            }
          }
        }
        ctx.restore();

        resolve(canvas.toDataURL("image/png"));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Erro ao carregar imagem"));
    };

    img.src = imageUrl;
  });
};
