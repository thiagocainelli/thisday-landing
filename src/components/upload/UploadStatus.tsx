import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadState } from "@/types/upload";

interface UploadStatusProps {
  state: UploadState;
  fileCount: number;
  onReset: () => void;
}

const UploadStatus = ({ state, fileCount, onReset }: UploadStatusProps) => {
  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="mb-6"
      >
        <Card className="border-green-500 bg-green-50">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-green-500">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload realizado com sucesso!
            </h3>
            <p className="text-gray-600 mb-6">
              Seus arquivos foram enviados e estão disponíveis na galeria do
              evento.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onReset} variant="outline" size="lg">
                Enviar mais arquivos
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (state === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="mb-6"
      >
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-red-500">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Erro no upload
            </h3>
            <p className="text-gray-600 mb-6">
              Ocorreu um erro ao fazer upload dos arquivos. Tente novamente.
            </p>
            <Button onClick={onReset} variant="default" size="lg">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return null;
};

export default UploadStatus;
