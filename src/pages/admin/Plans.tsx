import { useState, useEffect } from "react";
import { usePlans, useDeletePlan, usePlan } from "@/hooks/usePlans";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ReadPlansDto } from "@/types/plans.dto";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { getStatusFromBoolean } from "@/utils/statusUtils";
import { formatDateTimeFullBR } from "@/utils/dateFormatters";
import PlanForm from "@/components/admin/PlanForm";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import CreateEditDialog from "@/components/admin/CreateEditDialog";
import EditDialog from "@/components/admin/EditDialog";
import ViewDialog from "@/components/admin/ViewDialog";
import ActionButtons from "@/components/admin/ActionButtons";
import StatusBadge from "@/components/admin/StatusBadge";
import DetailField from "@/components/admin/DetailField";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { formatStorage } from "@/utils/storageFormatter";

const Plans = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: plansData, isLoading } = usePlans({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const plans = plansData?.data || [];
  const {
    selectedId,
    isCreateDialogOpen,
    isEditDialogOpen,
    isViewDialogOpen,
    isDeleteDialogOpen,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsViewDialogOpen,
    setIsDeleteDialogOpen,
    handleEdit,
    handleView,
    handleDelete,
    closeEditDialog,
    closeViewDialog,
    closeDeleteDialog,
    closeCreateDialog,
  } = useAdminPage<ReadPlansDto>();

  const { data: selectedPlan } = usePlan(selectedId || undefined);
  const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();

  const {
    isBulkDeleteDialogOpen,
    selectedIdsForBulkDelete,
    handleBulkDeleteClick,
    confirmBulkDelete,
    setIsBulkDeleteDialogOpen,
  } = useBulkDelete({
    onDelete: (id, callbacks) => {
      deletePlan(id, callbacks);
    },
  });

  const confirmDelete = () => {
    if (!selectedId) return;
    deletePlan(selectedId, {
      onSuccess: closeDeleteDialog,
    });
  };

  const columns = [
    {
      key: "name",
      header: "Nome",
    },
    {
      key: "capacityGB",
      header: "Armazenamento (GB)",
      render: (item: ReadPlansDto) => `${item.capacityGB} GB`,
    },
    {
      key: "durationDays",
      header: "Duração (dias)",
    },
    {
      key: "price",
      header: "Preço",
      render: (item: ReadPlansDto) => formatCurrencyBRL(Number(item.price)),
    },
    {
      key: "active",
      header: "Status",
      render: (item: ReadPlansDto) => (
        <StatusBadge
          status={getStatusFromBoolean(item.active)}
          variant="plan"
        />
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ReadPlansDto) => (
        <ActionButtons
          item={item}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Planos" },
        ]}
      />
      <PageHeader
        title="Planos"
        description="Gerencie os planos disponíveis na plataforma"
        action={
          <CreateEditDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            triggerLabel="Novo Plano"
            title="Criar Plano"
            description="Preencha os dados para criar um novo plano"
          >
            <PlanForm
              onSuccess={closeCreateDialog}
              onCancel={closeCreateDialog}
            />
          </CreateEditDialog>
        }
      />

      <PageFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Buscar por nome ou descrição..."
      />

      <DataTable
        data={plans}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum plano encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
        page={page}
        itemsPerPage={itemsPerPage}
        total={plansData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      <ViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        title="Detalhes do Plano"
      >
        {selectedPlan && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <DetailField
                label="Nome"
                value={<span className="font-medium">{selectedPlan.name}</span>}
              />
              <DetailField
                label="Preço"
                value={
                  <span className="font-medium text-primary">
                    {formatCurrencyBRL(Number(selectedPlan.price))}
                  </span>
                }
              />
              <DetailField
                label="Armazenamento (GB)"
                value={`${selectedPlan.capacityGB} GB`}
              />
              <DetailField
                label="Duração (dias)"
                value={selectedPlan.durationDays}
              />
              <DetailField
                label="Eventos Permitidos"
                value={selectedPlan.allowedEvents || "Ilimitado"}
              />
              <DetailField
                label="Status"
                value={
                  <StatusBadge
                    status={getStatusFromBoolean(selectedPlan.active)}
                    variant="plan"
                  />
                }
              />
              <DetailField
                label="Criado em"
                value={formatDateTimeFullBR(selectedPlan.createdAt.toString())}
              />
              <DetailField
                label="Atualizado em"
                value={formatDateTimeFullBR(selectedPlan.updatedAt.toString())}
              />
            </div>

            {selectedPlan.description && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Descrição
                </p>
                <p className="text-sm text-foreground">
                  {selectedPlan.description}
                </p>
              </div>
            )}
          </div>
        )}
      </ViewDialog>

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Editar Plano"
        description="Atualize as informações do plano"
      >
        {selectedId && (
          <PlanForm
            planId={selectedId}
            onSuccess={closeEditDialog}
            onCancel={closeEditDialog}
          />
        )}
      </EditDialog>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        itemName="plano"
      />

      <DeleteConfirmDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        isDeleting={isDeleting}
        itemName="plano"
        count={selectedIdsForBulkDelete.length}
      />
    </div>
  );
};

export default Plans;
