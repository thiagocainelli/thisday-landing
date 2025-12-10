import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const UploadSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Área de upload skeleton */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
        </CardContent>
      </Card>

      {/* Informações skeleton */}
      <Card className="bg-gray-50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSkeleton;
