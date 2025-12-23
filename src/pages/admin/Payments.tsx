import { useState, useMemo, useEffect } from "react";
import { usePaymentOrders } from "@/hooks/usePayments";
import DataTable from "@/components/admin/DataTable";
import { ReadPaymentOrdersDto } from "@/types/payment-orders.dto";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatDateTimeBR } from "@/utils/dateFormatters";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const Payments = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: paymentsData, isLoading } = usePaymentOrders({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const payments = paymentsData?.data;

  const columns = [
    {
      key: "description",
      header: "Descrição",
      render: (item: ReadPaymentOrdersDto) => item.description || "-",
    },
    {
      key: "amount",
      header: "Valor",
      render: (item: ReadPaymentOrdersDto) =>
        formatCurrencyBRL(Number(item.amount)),
    },
    {
      key: "gateway",
      header: "Gateway",
    },
    {
      key: "status",
      header: "Status",
      render: (item: ReadPaymentOrdersDto) => (
        <StatusBadge status={item.status} variant="payment" />
      ),
    },
    {
      key: "gatewayOrderId",
      header: "ID Gateway",
      render: (item: ReadPaymentOrdersDto) => item.gatewayOrderId || "-",
    },
    {
      key: "createdAt",
      header: "Criado em",
      render: (item: ReadPaymentOrdersDto) =>
        formatDateTimeBR(item.createdAt.toString()),
    },
  ];

  const totalRevenue = useMemo(
    () =>
      (payments || [])
        .filter((p) => p.status === "PAID")
        .reduce((sum, p) => sum + Number(p.amount), 0),
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
        searchPlaceholder="Buscar por descrição, status ou gateway..."
      />

      <DataTable
        data={payments || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum pagamento encontrado"
        page={page}
        itemsPerPage={itemsPerPage}
        total={paymentsData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default Payments;
