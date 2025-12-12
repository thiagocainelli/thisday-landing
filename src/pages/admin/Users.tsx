import { useState } from "react";
import { useUsers, useDeleteUser, useUser } from "@/hooks/useUsers";
import useFilterData from "@/hooks/useFilterData";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ListUserDto } from "@/types/users.dto";
import { formatDateTimeFullBR } from "@/utils/dateFormatters";
import { getRoleLabel } from "@/utils/roleMapping";
import { getStatusFromBoolean } from "@/utils/statusUtils";
import UserForm from "@/components/admin/UserForm";
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

const Users = () => {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: users = [], isLoading } = useUsers();
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
  } = useAdminPage<ListUserDto>();

  const { data: selectedUser } = useUser(selectedId || undefined);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const filteredUsers = useFilterData<ListUserDto>({
    data: users,
    searchValue,
    startDate,
    endDate,
    searchFields: ["name", "email", "role"],
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
      deleteUser(id, callbacks);
    },
  });

  const confirmDelete = () => {
    if (!selectedId) return;
    deleteUser(selectedId, {
      onSuccess: closeDeleteDialog,
    });
  };

  const columns = [
    {
      key: "name",
      header: "Nome",
    },
    {
      key: "email",
      header: "E-mail",
    },
    {
      key: "role",
      header: "Função",
      render: (item: ListUserDto) => getRoleLabel(item.role),
    },
    {
      key: "isActive",
      header: "Status",
      render: (item: ListUserDto) => (
        <StatusBadge
          status={getStatusFromBoolean(item.isActive)}
          variant="user"
        />
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ListUserDto) => (
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
          { label: "Usuários" },
        ]}
      />
      <PageHeader
        title="Usuários"
        description="Gerencie os usuários internos da plataforma"
        action={
          <CreateEditDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            triggerLabel="Novo Usuário"
            title="Criar Usuário"
            description="Preencha os dados para criar um novo usuário"
            scrollable={false}
          >
            <UserForm
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
        searchPlaceholder="Buscar por nome, e-mail ou função..."
      />

      <DataTable
        data={filteredUsers}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum usuário encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
      />

      <ViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        title="Detalhes do Usuário"
        scrollable={false}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DetailField
                label="Nome"
                value={<span className="font-medium">{selectedUser.name}</span>}
              />
              <DetailField label="E-mail" value={selectedUser.email} />
              <DetailField
                label="Função"
                value={getRoleLabel(selectedUser.role)}
              />
              <DetailField
                label="Status"
                value={
                  <StatusBadge
                    status={getStatusFromBoolean(selectedUser.isActive)}
                    variant="user"
                  />
                }
              />
              <DetailField
                label="Cadastrado em"
                value={formatDateTimeFullBR(selectedUser.createdAt)}
              />
              {selectedUser.lastLoginAt && (
                <DetailField
                  label="Último acesso"
                  value={formatDateTimeFullBR(selectedUser.lastLoginAt)}
                />
              )}
              {selectedUser.updatedAt && (
                <DetailField
                  label="Atualizado em"
                  value={formatDateTimeFullBR(selectedUser.updatedAt)}
                />
              )}
            </div>
          </div>
        )}
      </ViewDialog>

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Editar Usuário"
        description="Atualize as informações do usuário"
        scrollable={false}
      >
        {selectedId && (
          <UserForm
            userId={selectedId}
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
        itemName="usuário"
      />

      <DeleteConfirmDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        isDeleting={isDeleting}
        itemName="usuário"
        count={selectedIdsForBulkDelete.length}
      />
    </div>
  );
};

export default Users;
