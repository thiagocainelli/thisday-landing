import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import PageHeader from "@/components/admin/PageHeader";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import StatCard from "@/components/admin/StatCard";
import DashboardAlerts from "@/components/admin/DashboardAlerts";
import ChartTooltip from "@/components/admin/ChartTooltip";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useDashboard();

  const stats = dashboardData?.stats || {
    totalEvents: 0,
    activeEvents: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  };

  const upcomingEvents = dashboardData?.upcomingEvents || [];
  const pendingPayments = dashboardData?.pendingPayments || [];
  const eventsByMonth = dashboardData?.eventsByMonth || [];
  const revenueByMonth = dashboardData?.revenueByMonth || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Dashboard" }]} />
      <PageHeader
        title="Dashboard"
        description="Visão geral da plataforma shareday"
      />

      <DashboardAlerts
        upcomingEvents={upcomingEvents}
        pendingPayments={pendingPayments}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Total de Eventos"
            value={stats.totalEvents}
            subtitle={`${stats.activeEvents} ativos`}
            icon={Calendar}
            href="/admin/events"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Clientes"
            value={stats.totalCustomers}
            subtitle="Total cadastrados"
            icon={Users}
            href="/admin/customers"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Receita Total"
            value={formatCurrencyBRL(stats.totalRevenue)}
            subtitle={formatCurrencyBRL(stats.monthlyRevenue) + " este mês"}
            icon={DollarSign}
            href="/admin/payments"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="Receita Mensal"
            value={formatCurrencyBRL(stats.monthlyRevenue)}
            subtitle="Últimos 30 dias"
            icon={TrendingUp}
            href="/admin/payments"
          />
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Eventos por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="eventos" fill="hsl(var(--primary))" />
                  <Brush dataKey="month" height={30} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Receita por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    formatter={(value) => formatCurrencyBRL(Number(value))}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="receita"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Brush dataKey="month" height={30} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
