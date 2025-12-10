import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { copyToClipboard } from "@/utils/clipboard";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const ShareButtons = ({ url, title, description = "" }: ShareButtonsProps) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const shareToInstagram = async () => {
    // Instagram não permite compartilhamento direto via URL
    // Copiar link para área de transferência
    await copyToClipboard(url);
    toast({
      title: "Link copiado!",
      description: "Cole o link no Instagram para compartilhar.",
    });
  };

  const shareToWhatsApp = () => {
    const text = `${title}${description ? ` - ${description}` : ""}\n\n${url}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      <Button
        onClick={shareToFacebook}
        variant="outline"
        size="sm"
        className="flex-1 md:flex-initial"
      >
        <Facebook className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      <Button
        onClick={shareToInstagram}
        variant="outline"
        size="sm"
        className="flex-1 md:flex-initial"
      >
        <Instagram className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Instagram</span>
      </Button>
      <Button
        onClick={shareToWhatsApp}
        variant="outline"
        size="sm"
        className="flex-1 md:flex-initial"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>
    </div>
  );
};

export default ShareButtons;
