import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCog,
  CreditCard,
  Package,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { getGreeting } from "@/utils/greetingUtils";
import useCurrentTime from "@/hooks/useCurrentTime";
import useWeather from "@/hooks/useWeather";
import logoLight from "@/assets/logo_light_without_bg.png";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Eventos",
    icon: Calendar,
    path: "/admin/events",
  },
  {
    title: "Clientes",
    icon: Users,
    path: "/admin/customers",
  },
  {
    title: "Usuários",
    icon: UserCog,
    path: "/admin/users",
  },
  {
    title: "Recebimentos",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    title: "Planos",
    icon: Package,
    path: "/admin/plans",
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    queryClient.clear();

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });

    navigate("/admin/login");
  };

  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  const greeting = getGreeting();
  const currentTime = useCurrentTime();
  const {
    weather,
    isLoading: isLoadingWeather,
    error: weatherError,
  } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-primary/5 dark:from-slate-950 dark:via-background dark:to-primary/10">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-gradient-to-b from-slate-100/80 via-slate-50/90 to-slate-50/80 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95 border-r border-slate-200/60 dark:border-slate-800/60 shadow-xl backdrop-blur-sm transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 px-6 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5">
            <img src={logoLight} alt="Logo" className="w-32" />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-slate-600 dark:text-slate-400"
                    )}
                  />
                  <span className="flex-1 text-left">{item.title}</span>
                  {!isActive && (
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200/60 dark:border-slate-800/60 p-4 space-y-2 bg-gradient-to-t from-slate-100/50 to-transparent dark:from-slate-900/50">
            <div className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20 dark:border-primary/30">
              <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {authUser.name}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {authUser.email}
              </p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-700 dark:text-slate-300 hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-background/80 dark:bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 dark:supports-[backdrop-filter]:bg-background/70 px-4 lg:px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Mensagem de Boas-vindas e Informações */}
          <div className="flex-1 flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 border border-primary/20 dark:border-primary/30">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                  {greeting}!
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  {authUser.name?.split(" ")[0] || "Usuário"}
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 ml-auto">
              {/* Horário */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">
                  {currentTime}
                </span>
              </div>

              {/* Clima */}
              {isLoadingWeather && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Carregando...
                  </span>
                </div>
              )}
              {weather && !isLoadingWeather && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-lg">{weather.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {weather.temperature}°C
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {weather.condition}
                    </span>
                  </div>
                </div>
              )}
              {weatherError && !isLoadingWeather && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Clima indisponível
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/profile")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            {authUser.name?.charAt(0)?.toUpperCase() || "U"}
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
