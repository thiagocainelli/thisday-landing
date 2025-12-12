import { useState } from "react";
import {
  useCustomers,
  useDeleteCustomer,
  useCustomer,
} from "@/hooks/useCustomers";
import useFilterData from "@/hooks/useFilterData";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ListCustomerDto } from "@/types/customers.dto";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
import { formatDateBR, formatDateTimeFullBR } from "@/utils/dateFormatters";
import CustomerForm from "@/components/admin/CustomerForm";
import PageHeader from "@/components/admin/PageHeader";
import PageFilters from "@/components/admin/PageFilters";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import CreateEditDialog from "@/components/admin/CreateEditDialog";
import EditDialog from "@/components/admin/EditDialog";
import ViewDialog from "@/components/admin/ViewDialog";
import ActionButtons from "@/components/admin/ActionButtons";
import DetailField from "@/components/admin/DetailField";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: customers = [], isLoading } = useCustomers();
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
  } = useAdminPage<ListCustomerDto>();

  const { data: selectedCustomer } = useCustomer(selectedId || undefined);
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  const filteredCustomers = useFilterData<ListCustomerDto>({
    data: customers,
    searchValue,
    startDate,
    endDate,
    searchFields: ["fullName", "email", "phone", "document"],
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
      deleteCustomer(id, callbacks);
    },
  });

  const confirmDelete = () => {
    if (!selectedId) return;
    deleteCustomer(selectedId, {
      onSuccess: closeDeleteDialog,
    });
  };

  const columns = [
    {
      key: "fullName",
      header: "Nome",
    },
    {
      key: "email",
      header: "E-mail",
    },
    {
      key: "phone",
      header: "Telefone",
    },
    {
      key: "totalEvents",
      header: "Eventos",
    },
    {
      key: "totalSpent",
      header: "Total Gasto",
      render: (item: ListCustomerDto) => formatCurrencyBRL(item.totalSpent),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ListCustomerDto) => (
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
          { label: "Clientes" },
        ]}
      />
      <PageHeader
        title="Clientes"
        description="Gerencie os clientes da plataforma"
        action={
          <CreateEditDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            triggerLabel="Novo Cliente"
            title="Criar Cliente"
            description="Preencha os dados para criar um novo cliente"
            scrollable={false}
          >
            <CustomerForm
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
        searchPlaceholder="Buscar por nome, e-mail, telefone ou documento..."
      />

      <DataTable
        data={filteredCustomers}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum cliente encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
      />

      <ViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        title="Detalhes do Cliente"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <DetailField
                label="Nome Completo"
                value={
                  <span className="font-medium">
                    {selectedCustomer.fullName}
                  </span>
                }
              />
              <DetailField label="E-mail" value={selectedCustomer.email} />
              <DetailField label="Telefone" value={selectedCustomer.phone} />
              {selectedCustomer.document && (
                <DetailField
                  label="Documento (CPF/CNPJ)"
                  value={selectedCustomer.document}
                />
              )}
              <DetailField
                label="Total de Eventos"
                value={
                  <span className="font-medium">
                    {selectedCustomer.totalEvents}
                  </span>
                }
              />
              <DetailField
                label="Total Gasto"
                value={
                  <span className="font-medium text-primary">
                    {formatCurrencyBRL(selectedCustomer.totalSpent)}
                  </span>
                }
              />
              <DetailField
                label="Cadastrado em"
                value={formatDateTimeFullBR(selectedCustomer.createdAt)}
              />
              {selectedCustomer.lastEventAt && (
                <DetailField
                  label="Último Evento"
                  value={formatDateBR(selectedCustomer.lastEventAt)}
                />
              )}
            </div>

            {selectedCustomer.events && selectedCustomer.events.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Eventos
                </p>
                <div className="space-y-2">
                  {selectedCustomer.events.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg bg-muted/30"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {event.eventName}
                          </p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{formatDateBR(event.eventDate)}</span>
                            <span>{event.planName}</span>
                            <span className="capitalize">{event.status}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-primary">
                          {formatCurrencyBRL(event.totalSpent)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ViewDialog>

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Editar Cliente"
        description="Atualize as informações do cliente"
        scrollable={false}
      >
        {selectedId && (
          <CustomerForm
            customerId={selectedId}
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
        itemName="cliente"
      />

      <DeleteConfirmDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        isDeleting={isDeleting}
        itemName="cliente"
        count={selectedIdsForBulkDelete.length}
      />
    </div>
  );
};

export default Customers;
