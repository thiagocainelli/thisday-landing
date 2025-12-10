import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ALLOWED_TYPES } from "@/constants/fileTypes";

interface UploadAreaProps {
  onFileSelect: (files: FileList | null) => void;
}

const UploadArea = ({ onFileSelect }: UploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="my-6 border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 p-4 rounded-full bg-primary/10">
            <Upload className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Arraste e solte ou clique para selecionar
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Apenas fotos e vídeos são permitidos
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_TYPES.join(",")}
            onChange={(e) => onFileSelect(e.target.files)}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="default"
            size="lg"
            className="w-full md:w-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            Selecionar Arquivos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadArea;

