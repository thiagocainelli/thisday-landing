import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  progress: number;
}

const ProcessingIndicator = ({ progress }: ProcessingIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="my-6"
    >
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 md:h-10 md:w-10 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Processando arquivos...
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Aguarde enquanto preparamos os previews dos seus arquivos
            </p>
            <div className="w-full max-w-md">
              <Progress value={progress} className="h-3" />
              <p className="text-center text-sm text-gray-600 mt-2">
                {progress}% concluído
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProcessingIndicator;

