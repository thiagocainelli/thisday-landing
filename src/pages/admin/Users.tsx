import { useState, useEffect } from "react";
import { useUsers, useDeleteUser, useUser } from "@/hooks/useUsers";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ReadUserDto } from "@/types/users.dto";
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
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: usersData, isLoading } = useUsers({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const users = usersData?.data || [];
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
  } = useAdminPage<ReadUserDto>();

  const { data: selectedUser } = useUser(selectedId || undefined);
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

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
      key: "type",
      header: "Função",
      render: (item: ReadUserDto) => getRoleLabel(item.type),
    },
    {
      key: "active",
      header: "Status",
      render: (item: ReadUserDto) => (
        <StatusBadge
          status={getStatusFromBoolean(item.active)}
          variant="user"
        />
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ReadUserDto) => (
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
        searchPlaceholder="Buscar por nome, e-mail ou função..."
      />

      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum usuário encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
        page={page}
        itemsPerPage={itemsPerPage}
        total={usersData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
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
                value={getRoleLabel(selectedUser.type)}
              />
              <DetailField
                label="Status"
                value={
                  <StatusBadge
                    status={getStatusFromBoolean(selectedUser.active)}
                    variant="user"
                  />
                }
              />
              <DetailField
                label="Imagem de Perfil"
                value={selectedUser.profileImageUrl || "-"}
              />
              <DetailField
                label="Cadastrado em"
                value={formatDateTimeFullBR(selectedUser.createdAt.toString())}
              />
              <DetailField
                label="Atualizado em"
                value={formatDateTimeFullBR(selectedUser.updatedAt.toString())}
              />
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
