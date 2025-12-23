import { useState, useEffect } from "react";
import {
  useCustomers,
  useDeleteCustomer,
  useCustomer,
} from "@/hooks/useCustomers";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ReadCustomersDto } from "@/types/customers.dto";
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
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: customersData, isLoading } = useCustomers({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const customers = customersData?.data || [];
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
  } = useAdminPage<ReadCustomersDto>();

  const { data: selectedCustomer } = useCustomer(selectedId || undefined);
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

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
      key: "phoneNumber",
      header: "Telefone",
      render: (item: ReadCustomersDto) => item.phoneNumber || "-",
    },
    {
      key: "document",
      header: "Documento",
      render: (item: ReadCustomersDto) => item.document || "-",
    },
    {
      key: "subscriptionStatus",
      header: "Status Assinatura",
    },
    {
      key: "createdAt",
      header: "Criado em",
      render: (item: ReadCustomersDto) =>
        formatDateBR(item.createdAt.toString()),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ReadCustomersDto) => (
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
        searchPlaceholder="Buscar por telefone ou documento..."
      />

      <DataTable
        data={customers}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum cliente encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
        page={page}
        itemsPerPage={itemsPerPage}
        total={customersData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
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
                label="Telefone"
                value={selectedCustomer.phoneNumber || "-"}
              />
              <DetailField
                label="Documento"
                value={selectedCustomer.document || "-"}
              />
              <DetailField
                label="Status da Assinatura"
                value={selectedCustomer.subscriptionStatus}
              />
              <DetailField
                label="UUID do Cliente"
                value={selectedCustomer.uuid}
              />
              <DetailField
                label="UUID do Usuário"
                value={selectedCustomer.userUuid}
              />
              <DetailField
                label="Criado em"
                value={formatDateTimeFullBR(
                  selectedCustomer.createdAt.toString()
                )}
              />
              <DetailField
                label="Atualizado em"
                value={formatDateTimeFullBR(
                  selectedCustomer.updatedAt.toString()
                )}
              />
            </div>
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
