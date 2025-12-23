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
import { formatStorage } from "@/utils/storageFormatter";
import { useSettings } from "@/hooks/useSettings";

interface AdditionalStoragePurchaseProps {
  additionalStorageGB: number;
  onPurchase: (storageGB: number) => void;
}

const AdditionalStoragePurchase = ({
  additionalStorageGB,
  onPurchase,
}: AdditionalStoragePurchaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [storageGB, setStorageGB] = useState(1);
  const { data: settings } = useSettings();

  if (additionalStorageGB === 0) return null;

  const minStorageGB = Math.ceil(additionalStorageGB);
  const pricePerGB = settings?.payment.pricePerGB || 2.5;
  const totalPrice = storageGB * pricePerGB;

  const handlePurchase = () => {
    if (storageGB >= minStorageGB) {
      onPurchase(storageGB);
      setIsOpen(false);
      setStorageGB(minStorageGB);
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
                    Armazenamento adicional necessário
                  </h3>
                  <p className="text-sm text-gray-600">
                    Você está usando <strong>{formatStorage(additionalStorageGB)}</strong>{" "}
                    além do limite do seu plano. Os arquivos que excedem o limite estão com marca d'água.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Compre armazenamento adicional por{" "}
                    {formatCurrencyBRL(pricePerGB)} por GB.
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
                Comprar armazenamento adicional
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Comprar armazenamento adicional</DialogTitle>
            <DialogDescription>
              Escolha quantos GB de armazenamento adicional deseja comprar para remover a marca d'água dos arquivos.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="storageGB">
                Armazenamento (mínimo {formatStorage(minStorageGB)})
              </Label>
              <Input
                id="storageGB"
                type="number"
                min={minStorageGB}
                step={1}
                value={storageGB}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= minStorageGB) {
                    setStorageGB(value);
                  }
                }}
                className="text-lg font-semibold"
              />
              <p className="text-xs text-muted-foreground">
                Você precisa de pelo menos {formatStorage(minStorageGB)} para cobrir o armazenamento adicional usado.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  {formatStorage(storageGB)} × {formatCurrencyBRL(pricePerGB)}/GB
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

export default AdditionalStoragePurchase;
