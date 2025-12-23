import { useEffect, useState } from "react";
import { useAudits } from "@/hooks/useAudits";
import DataTable from "@/components/admin/DataTable";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { ReadAuditDto } from "@/types/audits.dto";
import { formatDateTimeBR } from "@/utils/dateFormatters";

const Audits = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: auditsData, isLoading } = useAudits({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const audits = auditsData?.data || [];

  const columns = [
    {
      key: "createdAt",
      header: "Data",
      render: (item: ReadAuditDto) =>
        formatDateTimeBR(item.createdAt.toString()),
    },
    {
      key: "ip",
      header: "IP",
    },
    {
      key: "method",
      header: "Método",
    },
    {
      key: "url",
      header: "URL",
    },
    {
      key: "entity",
      header: "Entidade",
    },
    {
      key: "event",
      header: "Evento",
    },
    {
      key: "userAgent",
      header: "User-Agent",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Auditoria" },
        ]}
      />
      <PageHeader
        title="Auditoria"
        description="Visualize os registros de auditoria da plataforma"
      />

      <PageFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Buscar por URL, entidade, evento, IP..."
      />

      <DataTable
        data={audits}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhuma auditoria encontrada"
        page={page}
        itemsPerPage={itemsPerPage}
        total={auditsData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default Audits;
