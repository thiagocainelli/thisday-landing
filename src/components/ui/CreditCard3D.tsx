import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

interface CreditCard3DProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  focusedField: "cardNumber" | "cardName" | "cardExpiry" | "cardCvv" | null;
}

const CreditCard3D = ({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvv,
  focusedField,
}: CreditCard3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Vira o cartão quando está digitando número ou CVV
    if (focusedField === "cardCvv") {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [focusedField]);

  // Formatar número do cartão (adicionar espaços a cada 4 dígitos)
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(" ").substring(0, 19);
  };

  // Formatar nome (máximo de caracteres visíveis)
  const formatCardName = (value: string) => {
    return value.toUpperCase().substring(0, 20) || "SEU NOME";
  };

  // Formatar validade
  const formatExpiry = (value: string) => {
    if (!value) return "MM/AA";
    return value.substring(0, 5);
  };

  // Formatar CVV (mostrar apenas quando no verso)
  const formatCvv = (value: string) => {
    return value || "•••";
  };

  return (
    <div
      className="w-full max-w-sm mx-auto mb-6"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full h-56"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente do Cartão */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <div className="relative w-full h-full bg-shareday-gradient rounded-xl p-6 text-white overflow-hidden">
            {/* Padrão de fundo decorativo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24" />
            </div>

            {/* Conteúdo da frente */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Logo/Chip */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="text-xs font-medium opacity-80">shareday</div>
              </div>

              {/* Número do cartão */}
              <div>
                <div className="text-xs text-white/70 mb-1">
                  Número do cartão
                </div>
                <div className="text-xl font-mono tracking-wider font-semibold">
                  {formatCardNumber(cardNumber) || "0000 0000 0000 0000"}
                </div>
              </div>

              {/* Nome e Validade */}
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <div className="text-xs text-white/70 mb-1">
                    Nome do titular
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wide">
                    {formatCardName(cardName)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/70 mb-1">Validade</div>
                  <div className="text-sm font-semibold">
                    {formatExpiry(cardExpiry)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verso do Cartão */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full bg-shareday-gradient rounded-xl p-6 text-white overflow-hidden">
            {/* Padrão de fundo decorativo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full -mr-24 -mb-24" />
            </div>

            {/* Faixa magnética */}
            <div className="absolute top-8 left-0 right-0 h-12 bg-black/40" />

            {/* Conteúdo do verso */}
            <div className="relative z-10 h-full flex flex-col justify-end">
              {/* CVV */}
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-xs text-white/70 mb-2">CVV</div>
                <div className="text-right">
                  <div className="text-lg font-mono font-semibold tracking-wider">
                    {formatCvv(cardCvv)}
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="mt-4 text-xs font-medium opacity-80 text-right">
                shareday
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditCard3D;
