import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageBannerProps {
  title: string;
  backTo: string;
  backLabel?: string;
  description?: string;
}

const PageBanner = ({
  title,
  backTo,
  backLabel = "Voltar",
  description,
}: PageBannerProps) => {
  return (
    <div className="relative overflow-hidden bg-shareday-gradient text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_35%)]" />
      <div className="absolute inset-0 opacity-25 bg-shareday-gradient-soft" />

      <div className="relative container mx-auto px-6 py-16">
        <div className="absolute top-4 left-4">
          <Button
            variant="secondary"
            size="sm"
            asChild
            className="bg-white/15 text-white border-white/30 hover:bg-white/25"
          >
            <Link to={backTo}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backLabel}
            </Link>
          </Button>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-sm">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-white/85 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
