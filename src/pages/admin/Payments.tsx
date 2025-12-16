import { useState, useMemo } from "react";
import { usePayments } from "@/hooks/usePayments";
import useFilterData from "@/hooks/useFilterData";
import DataTable from "@/components/admin/DataTable";
import { ListPaymentDto } from "@/types/payments.dto";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatDateTimeBR } from "@/utils/dateFormatters";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import StatusBadge from "@/components/admin/StatusBadge";
import PaymentMethodBadge from "@/components/admin/PaymentMethodBadge";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const Payments = () => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: payments = [], isLoading } = usePayments();

  const filteredPayments = useFilterData<ListPaymentDto>({
    data: payments,
    searchValue,
    startDate,
    endDate,
    searchFields: [
      "eventName",
      "customerName",
      "planName",
      "paymentMethod",
      "status",
    ],
    dateField: "createdAt",
  });

  const columns = [
    {
      key: "eventName",
      header: "Evento",
    },
    {
      key: "customerName",
      header: "Cliente",
    },
    {
      key: "planName",
      header: "Plano",
    },
    {
      key: "amount",
      header: "Valor",
      render: (item: ListPaymentDto) => formatCurrencyBRL(item.amount),
    },
    {
      key: "paymentMethod",
      header: "Método",
      render: (item: ListPaymentDto) => (
        <PaymentMethodBadge
          method={item.paymentMethod}
          installments={item.installments}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: ListPaymentDto) => (
        <StatusBadge status={item.status} variant="payment" />
      ),
    },
    {
      key: "createdAt",
      header: "Data",
      render: (item: ListPaymentDto) => formatDateTimeBR(item.createdAt),
    },
    {
      key: "paidAt",
      header: "Pago em",
      render: (item: ListPaymentDto) =>
        item.paidAt ? formatDateTimeBR(item.paidAt) : "-",
    },
  ];

  const totalRevenue = useMemo(
    () =>
      payments
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + p.amount, 0),
    [payments]
  );

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Financeiro" },
        ]}
      />
      <PageHeader
        title="Financeiro"
        description="Visualize toda a movimentação financeira da plataforma"
        action={
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Receita Total</p>
            <p className="text-2xl font-bold">
              {formatCurrencyBRL(totalRevenue)}
            </p>
          </div>
        }
      />

      <PageFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        searchPlaceholder="Buscar por evento, cliente, plano ou método..."
      />

      <DataTable
        data={filteredPayments}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum pagamento encontrado"
      />
    </div>
  );
};

export default Payments;
