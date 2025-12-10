import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy loading de todas as páginas para code splitting
const Index = lazy(() => import("./pages/Index"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Upload = lazy(() => import("./pages/Upload"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Configuração centralizada de rotas
 * Em produção, pode ser expandido com rotas protegidas, layouts, etc.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/termos",
    element: <Terms />,
  },
  {
    path: "/privacidade",
    element: <Privacy />,
  },
  {
    path: "/contato",
    element: <Contact />,
  },
  {
    path: "/criar-evento",
    element: <CreateEvent />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/upload/:eventId",
    element: <Upload />,
  },
  {
    path: "/galeria/:eventId",
    element: <Gallery />,
  },
  // Rota catch-all deve ser a última
  {
    path: "*",
    element: <NotFound />,
  },
];
