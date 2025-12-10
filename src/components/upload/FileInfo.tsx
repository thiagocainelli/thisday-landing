import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
} from "@/constants/fileTypes";

const getFileExtension = (mimeType: string): string => {
  return mimeType.split("/")[1]?.toUpperCase() || "";
};

const FileInfo = () => {
  const imageExtensions = ALLOWED_IMAGE_TYPES.map(getFileExtension).join(", ");
  const videoExtensions = ALLOWED_VIDEO_TYPES.map(getFileExtension).join(", ");

  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-1">Formatos aceitos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Imagens:</strong> {imageExtensions}
              </li>
              <li>
                <strong>Vídeos:</strong> {videoExtensions}
              </li>
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              PDFs, documentos e outros tipos de arquivo não são permitidos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileInfo;
