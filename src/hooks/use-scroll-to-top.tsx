import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook para rolar suavemente para o topo ao trocar de rota.
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
};

export default useScrollToTop;
