import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Building2,
  Upload,
  Bell,
  Calendar,
  Mail,
  Shield,
  Link2,
  DollarSign,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import PageHeader from "@/components/admin/PageHeader";
import PaymentSettingsForm from "@/components/admin/PaymentSettingsForm";
import GeneralSettingsForm from "@/components/admin/GeneralSettingsForm";
import UploadSettingsForm from "@/components/admin/UploadSettingsForm";
import NotificationSettingsForm from "@/components/admin/NotificationSettingsForm";
import EventSettingsForm from "@/components/admin/EventSettingsForm";
import EmailSettingsForm from "@/components/admin/EmailSettingsForm";
import SecuritySettingsForm from "@/components/admin/SecuritySettingsForm";
import IntegrationSettingsForm from "@/components/admin/IntegrationSettingsForm";
import BusinessRulesSettingsForm from "@/components/admin/BusinessRulesSettingsForm";
import { useSettings } from "@/hooks/useSettings";
import { formatDateTimeFullBR } from "@/utils/dateFormatters";

const Settings = () => {
  const { data: settings, isLoading } = useSettings();
  const [activeTab, setActiveTab] = useState("payment");

  const handleSuccess = () => {
    // Pode adicionar feedback adicional se necessário
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded w-48" />
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Configurações" },
        ]}
      />
      <PageHeader
        title="Configurações"
        description="Gerencie as configurações gerais da plataforma"
      />

      {settings?.updatedAt && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Última atualização: {formatDateTimeFullBR(settings.updatedAt)}
              {settings.updatedBy && ` por ${settings.updatedBy}`}
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="overflow-x-auto px-6 bg-muted rounded-lg">
          <TabsList className="flex justify-between w-full h-auto p-1">
            <TabsTrigger
              value="payment"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <CreditCard className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Pagamento</span>
            </TabsTrigger>
            <TabsTrigger
              value="general"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Building2 className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Geral</span>
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Upload className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Upload</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Bell className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Notificações</span>
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Eventos</span>
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Email</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Shield className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Segurança</span>
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <Link2 className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Integrações</span>
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4"
            >
              <DollarSign className="h-4 w-4 shrink-0" />
              <span className="text-xs sm:text-sm">Regras</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="payment" className="space-y-4">
            <PaymentSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <GeneralSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <UploadSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <EventSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <EmailSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <SecuritySettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <IntegrationSettingsForm onSuccess={handleSuccess} />
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <BusinessRulesSettingsForm onSuccess={handleSuccess} />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
};

export default Settings;
