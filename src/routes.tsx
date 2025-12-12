import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

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

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminForgotPassword = lazy(() => import("./pages/admin/ForgotPassword"));
const AdminResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminEvents = lazy(() => import("./pages/admin/Events"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers"));
const AdminPayments = lazy(() => import("./pages/admin/Payments"));
const AdminPlans = lazy(() => import("./pages/admin/Plans"));
const AdminProfile = lazy(() => import("./pages/admin/Profile"));

/**
 * Configuração centralizada de rotas
 * Em produção, pode ser expandido com rotas protegidas, layouts, etc.
 */
export const routes: RouteObject[] = [
  // Public routes
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
  // Admin auth routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/forgot-password",
    element: <AdminForgotPassword />,
  },
  {
    path: "/admin/reset-password",
    element: <AdminResetPassword />,
  },
  // Admin protected routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "events",
        element: <AdminEvents />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "customers",
        element: <AdminCustomers />,
      },
      {
        path: "payments",
        element: <AdminPayments />,
      },
      {
        path: "plans",
        element: <AdminPlans />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
  // Rota catch-all deve ser a última
  {
    path: "*",
    element: <NotFound />,
  },
];
