import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
}

const UploadProgress = ({ progress }: UploadProgressProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-6 w-6 text-primary animate-spin mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Enviando arquivos...
            </h3>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-center text-sm text-gray-600 mt-3">
            {progress}% concluído
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UploadProgress;
