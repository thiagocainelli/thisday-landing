import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { ADDITIONAL_PHOTO_PRICE } from "@/constants/pricing";

interface AdditionalPhotosPurchaseProps {
  additionalPhotosCount: number;
  onPurchase: (quantity: number) => void;
}

const AdditionalPhotosPurchase = ({
  additionalPhotosCount,
  onPurchase,
}: AdditionalPhotosPurchaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (additionalPhotosCount === 0) return null;

  const maxQuantity = additionalPhotosCount;
  const totalPrice = quantity * ADDITIONAL_PHOTO_PRICE;

  const handlePurchase = () => {
    if (quantity > 0 && quantity <= maxQuantity) {
      onPurchase(quantity);
      setIsOpen(false);
      setQuantity(1);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="border-orange-500 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-orange-500">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Arquivos adicionais detectadas
                  </h3>
                  <p className="text-sm text-gray-600">
                    Você tem <strong>{additionalPhotosCount} arquivo(s)</strong>{" "}
                    (fotos e vídeos) acima do limite do seu plano. Os arquivos
                    adicionais estão com marca d'água.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Remova a marca d'água comprando arquivos adicionais por{" "}
                    {formatCurrencyBRL(ADDITIONAL_PHOTO_PRICE)} cada.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                variant="default"
                size="lg"
                className="w-full md:w-auto"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Comprar arquivos adicionais
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comprar arquivos adicionais</DialogTitle>
            <DialogDescription>
              Escolha quantos arquivos adicionais (fotos e vídeos) deseja
              comprar para remover a marca d'água das fotos.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">
                Quantidade (1 a {maxQuantity} arquivo
                {maxQuantity !== 1 ? "s" : ""})
              </Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={maxQuantity}
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
                    setQuantity(value);
                  }
                }}
                className="text-lg font-semibold"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  {quantity} arquivo{quantity !== 1 ? "s" : ""} ×{" "}
                  {formatCurrencyBRL(ADDITIONAL_PHOTO_PRICE)}
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatCurrencyBRL(totalPrice)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrencyBRL(totalPrice)}
                </span>
              </div>
              <Button
                onClick={handlePurchase}
                variant="default"
                size="lg"
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ir para pagamento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdditionalPhotosPurchase;
