import { useEffect, useState } from "react";
import { useErrorLogs } from "@/hooks/useErrorLogs";
import DataTable from "@/components/admin/DataTable";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { ReadErrorLogDto } from "@/types/error-logs.dto";
import { formatDateTimeBR } from "@/utils/dateFormatters";

const ErrorLogs = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: errorLogsData, isLoading } = useErrorLogs({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const errorLogs = errorLogsData?.data || [];

  const columns = [
    {
      key: "createdAt",
      header: "Data",
      render: (item: ReadErrorLogDto) =>
        formatDateTimeBR(item.createdAt.toString()),
    },
    {
      key: "statusCode",
      header: "Status",
    },
    {
      key: "error",
      header: "Erro",
    },
    {
      key: "message",
      header: "Mensagem",
    },
    {
      key: "method",
      header: "Método",
    },
    {
      key: "url",
      header: "URL",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Logs de Erro" },
        ]}
      />
      <PageHeader
        title="Logs de Erro"
        description="Monitore erros registrados pela API"
      />

      <PageFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Buscar por mensagem, URL, status..."
      />

      <DataTable
        data={errorLogs}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum log de erro encontrado"
        page={page}
        itemsPerPage={itemsPerPage}
        total={errorLogsData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default ErrorLogs;


