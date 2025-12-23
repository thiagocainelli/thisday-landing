import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useRoutes } from "react-router-dom";
import useScrollToTop from "./hooks/useScrollToTop";
import { routes } from "./routes";
import PageLoader from "./components/ui/PageLoader";
import { queryClient } from "@/lib/react-query.config";

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
