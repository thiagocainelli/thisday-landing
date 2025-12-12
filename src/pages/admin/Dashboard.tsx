import { useState, useMemo, useEffect } from "react";
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
import { useEvents } from "@/hooks/useEvents";
import { useCustomers } from "@/hooks/useCustomers";
import { usePayments } from "@/hooks/usePayments";
import useFilterData from "@/hooks/useFilterData";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import StatCard from "@/components/admin/StatCard";
import QuickFilters, {
  QuickFilterPeriod,
} from "@/components/admin/QuickFilters";
import DashboardAlerts from "@/components/admin/DashboardAlerts";
import ChartTooltip from "@/components/admin/ChartTooltip";
import {
  getPeriodDateRange,
  getPreviousPeriodDateRange,
  calculateTrend,
} from "@/utils/dateUtils";
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
import { MONTHS_ABBREVIATED } from "@/utils/dateConstants";

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [quickFilter, setQuickFilter] = useState<QuickFilterPeriod | null>(
    "month"
  );

  const { data: events = [], isLoading: eventsLoading } = useEvents();
  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const { data: payments = [], isLoading: paymentsLoading } = usePayments();

  // Apply quick filter on mount and when quickFilter changes
  useEffect(() => {
    if (quickFilter) {
      const range = getPeriodDateRange(quickFilter);
      if (range) {
        setStartDate(range.startDate);
        setEndDate(range.endDate);
      } else {
        setStartDate(undefined);
        setEndDate(undefined);
      }
    }
  }, [quickFilter]);

  const filteredEvents = useFilterData({
    data: events,
    searchValue,
    startDate,
    endDate,
    searchFields: ["eventName", "fullName"],
    dateField: "createdAt",
  });

  const filteredCustomers = useFilterData({
    data: customers,
    searchValue,
    startDate,
    endDate,
    searchFields: ["fullName", "email"],
    dateField: "createdAt",
  });

  const filteredPayments = useFilterData({
    data: payments,
    searchValue,
    startDate,
    endDate,
    searchFields: ["eventName", "customerName"],
    dateField: "createdAt",
  });

  // Calculate stats for current period
  const currentStats = useMemo(() => {
    const totalEvents = filteredEvents.length;
    const activeEvents = filteredEvents.filter(
      (e) => e.status === "active"
    ).length;
    const totalCustomers = filteredCustomers.length;
    const totalRevenue = filteredPayments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const monthlyRevenue = filteredPayments
      .filter((p) => p.status === "paid" && p.paidAt)
      .filter((p) => {
        const paidDate = new Date(p.paidAt!);
        const now = new Date();
        return (
          paidDate.getMonth() === now.getMonth() &&
          paidDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, p) => sum + p.amount, 0);

    return {
      totalEvents,
      activeEvents,
      totalCustomers,
      totalRevenue,
      monthlyRevenue,
    };
  }, [filteredEvents, filteredCustomers, filteredPayments]);

  // Calculate stats for previous period
  const previousStats = useMemo(() => {
    if (!quickFilter || quickFilter === "all") {
      return {
        totalEvents: 0,
        activeEvents: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
      };
    }

    const previousRange = getPreviousPeriodDateRange(quickFilter);
    if (!previousRange) {
      return {
        totalEvents: 0,
        activeEvents: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
      };
    }

    const prevEvents = events.filter((event) => {
      const eventDate = new Date(event.createdAt);
      return (
        eventDate >= previousRange.startDate &&
        eventDate <= previousRange.endDate
      );
    });

    const prevCustomers = customers.filter((customer) => {
      const customerDate = new Date(customer.createdAt);
      return (
        customerDate >= previousRange.startDate &&
        customerDate <= previousRange.endDate
      );
    });

    const prevPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.createdAt);
      return (
        paymentDate >= previousRange.startDate &&
        paymentDate <= previousRange.endDate &&
        payment.status === "paid"
      );
    });

    return {
      totalEvents: prevEvents.length,
      activeEvents: prevEvents.filter((e) => e.status === "active").length,
      totalCustomers: prevCustomers.length,
      totalRevenue: prevPayments.reduce((sum, p) => sum + p.amount, 0),
      monthlyRevenue: prevPayments.reduce((sum, p) => sum + p.amount, 0),
    };
  }, [events, customers, payments, quickFilter]);

  // Calculate trends
  const trends = useMemo(() => {
    return {
      events: calculateTrend(
        currentStats.totalEvents,
        previousStats.totalEvents
      ),
      customers: calculateTrend(
        currentStats.totalCustomers,
        previousStats.totalCustomers
      ),
      revenue: calculateTrend(
        currentStats.totalRevenue,
        previousStats.totalRevenue
      ),
      monthlyRevenue: calculateTrend(
        currentStats.monthlyRevenue,
        previousStats.monthlyRevenue
      ),
    };
  }, [currentStats, previousStats]);

  // Get upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return events
      .filter((event) => {
        const eventDate = new Date(event.eventDate);
        return (
          eventDate >= today &&
          eventDate <= nextWeek &&
          event.status === "active"
        );
      })
      .sort((a, b) => {
        return (
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
      })
      .slice(0, 5);
  }, [events]);

  // Get pending payments
  const pendingPayments = useMemo(() => {
    return payments.filter((p) => p.status === "pending");
  }, [payments]);

  // Dados para gráfico de eventos por mês
  const eventsByMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const data = MONTHS_ABBREVIATED.slice(
      Math.max(0, currentMonth - 5),
      currentMonth + 1
    ).map((month) => ({
      month,
      eventos: 0,
    }));

    filteredEvents.forEach((event) => {
      const eventDate = new Date(event.createdAt);
      const monthIndex = eventDate.getMonth();
      const dataIndex = Math.max(0, currentMonth - 5) + monthIndex;
      if (dataIndex >= 0 && dataIndex < data.length) {
        data[dataIndex].eventos += 1;
      }
    });

    return data;
  }, [filteredEvents]);

  // Dados para gráfico de receita
  const revenueByMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const data = MONTHS_ABBREVIATED.slice(
      Math.max(0, currentMonth - 5),
      currentMonth + 1
    ).map((month) => ({
      month,
      receita: 0,
    }));

    filteredPayments
      .filter((p) => p.status === "paid" && p.paidAt)
      .forEach((payment) => {
        const paidDate = new Date(payment.paidAt!);
        const monthIndex = paidDate.getMonth();
        const dataIndex = Math.max(0, currentMonth - 5) + monthIndex;
        if (dataIndex >= 0 && dataIndex < data.length) {
          data[dataIndex].receita += payment.amount;
        }
      });

    return data;
  }, [filteredPayments]);

  const isLoading = eventsLoading || customersLoading || paymentsLoading;

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

      <QuickFilters
        selectedPeriod={quickFilter}
        onPeriodChange={(period) => {
          setQuickFilter(period);
        }}
        onCustomDateRange={() => {
          setQuickFilter(null);
        }}
      />

      <PageFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(date) => {
          setStartDate(date);
          setQuickFilter(null);
        }}
        onEndDateChange={(date) => {
          setEndDate(date);
          setQuickFilter(null);
        }}
        searchPlaceholder="Buscar por evento, cliente ou pagamento..."
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
            value={currentStats.totalEvents}
            subtitle={`${currentStats.activeEvents} ativos`}
            icon={Calendar}
            href="/admin/events"
            trend={
              quickFilter && quickFilter !== "all"
                ? {
                    value: trends.events,
                    label: "vs período anterior",
                  }
                : undefined
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Clientes"
            value={currentStats.totalCustomers}
            subtitle="Total cadastrados"
            icon={Users}
            href="/admin/customers"
            trend={
              quickFilter && quickFilter !== "all"
                ? {
                    value: trends.customers,
                    label: "vs período anterior",
                  }
                : undefined
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Receita Total"
            value={formatCurrencyBRL(currentStats.totalRevenue)}
            subtitle={
              formatCurrencyBRL(currentStats.monthlyRevenue) + " este mês"
            }
            icon={DollarSign}
            href="/admin/payments"
            trend={
              quickFilter && quickFilter !== "all"
                ? {
                    value: trends.revenue,
                    label: "vs período anterior",
                  }
                : undefined
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="Receita Mensal"
            value={formatCurrencyBRL(currentStats.monthlyRevenue)}
            subtitle="Últimos 30 dias"
            icon={TrendingUp}
            href="/admin/payments"
            trend={
              quickFilter && quickFilter !== "all"
                ? {
                    value: trends.monthlyRevenue,
                    label: "vs período anterior",
                  }
                : undefined
            }
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
