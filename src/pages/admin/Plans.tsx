import { useState } from "react";
import { usePlans, useDeletePlan, usePlan } from "@/hooks/usePlans";
import useFilterData from "@/hooks/useFilterData";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ListPlanDto } from "@/types/plans.dto";
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

const Plans = () => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: plans = [], isLoading } = usePlans();
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
  } = useAdminPage<ListPlanDto>();

  const { data: selectedPlan } = usePlan(selectedId || undefined);
  const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();

  const filteredPlans = useFilterData<ListPlanDto>({
    data: plans,
    searchValue,
    startDate,
    endDate,
    searchFields: ["name", "description"],
    dateField: "createdAt",
  });

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
      key: "photos",
      header: "Fotos",
    },
    {
      key: "duration",
      header: "Duração (dias)",
    },
    {
      key: "price",
      header: "Preço",
      render: (item: ListPlanDto) => formatCurrencyBRL(item.price),
    },
    {
      key: "isActive",
      header: "Status",
      render: (item: ListPlanDto) => (
        <StatusBadge
          status={getStatusFromBoolean(item.isActive)}
          variant="plan"
        />
      ),
    },
    {
      key: "totalSubscriptions",
      header: "Assinaturas",
    },
    {
      key: "totalRevenue",
      header: "Receita Total",
      render: (item: ListPlanDto) => formatCurrencyBRL(item.totalRevenue),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ListPlanDto) => (
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
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        searchPlaceholder="Buscar por nome ou descrição..."
      />

      <DataTable
        data={filteredPlans}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum plano encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
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
                    {formatCurrencyBRL(selectedPlan.price)}
                  </span>
                }
              />
              <DetailField
                label="Número de Fotos"
                value={selectedPlan.photos}
              />
              <DetailField
                label="Duração (dias)"
                value={selectedPlan.duration}
              />
              <DetailField
                label="Status"
                value={
                  <StatusBadge
                    status={getStatusFromBoolean(selectedPlan.isActive)}
                    variant="plan"
                  />
                }
              />
              <DetailField
                label="Total de Assinaturas"
                value={
                  <span className="font-medium">
                    {selectedPlan.totalSubscriptions}
                  </span>
                }
              />
              <DetailField
                label="Receita Total"
                value={
                  <span className="font-medium text-primary">
                    {formatCurrencyBRL(selectedPlan.totalRevenue)}
                  </span>
                }
              />
              <DetailField
                label="Cadastrado em"
                value={formatDateTimeFullBR(selectedPlan.createdAt)}
              />
              {selectedPlan.updatedAt && (
                <DetailField
                  label="Atualizado em"
                  value={formatDateTimeFullBR(selectedPlan.updatedAt)}
                />
              )}
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

            {selectedPlan.features && selectedPlan.features.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Funcionalidades
                </p>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
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
