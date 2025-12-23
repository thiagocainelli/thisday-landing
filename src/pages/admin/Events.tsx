import { useState, useEffect } from "react";
import { useEvents, useDeleteEvent, useEvent } from "@/hooks/useEvents";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ReadEventsDto } from "@/types/events.dto";
import { formatDateBR } from "@/utils/dateFormatters";
import EventForm from "@/components/admin/EventForm";
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

const Events = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const { data: eventsData, isLoading } = useEvents({
    page,
    itemsPerPage,
    search: searchValue,
  });

  const events = eventsData?.data || [];
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
  } = useAdminPage<ReadEventsDto>();

  const { data: selectedEvent } = useEvent(selectedId || undefined);
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();

  const {
    isBulkDeleteDialogOpen,
    selectedIdsForBulkDelete,
    handleBulkDeleteClick,
    confirmBulkDelete,
    setIsBulkDeleteDialogOpen,
  } = useBulkDelete({
    onDelete: (id, callbacks) => {
      deleteEvent(id, callbacks);
    },
  });

  const confirmDelete = () => {
    if (!selectedId) return;
    deleteEvent(selectedId, {
      onSuccess: closeDeleteDialog,
    });
  };

  const columns = [
    {
      key: "name",
      header: "Evento",
    },
    {
      key: "startDate",
      header: "Data Início",
      render: (item: ReadEventsDto) => formatDateBR(item.startDate.toString()),
    },
    {
      key: "endDate",
      header: "Data Fim",
      render: (item: ReadEventsDto) => formatDateBR(item.endDate.toString()),
    },
    {
      key: "status",
      header: "Status",
      render: (item: ReadEventsDto) => (
        <StatusBadge status={item.status} variant="event" />
      ),
    },
    {
      key: "shareCode",
      header: "Código",
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ReadEventsDto) => (
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
          { label: "Eventos" },
        ]}
      />
      <PageHeader
        title="Eventos"
        description="Gerencie todos os eventos da plataforma"
        action={
          <CreateEditDialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            triggerLabel="Novo Evento"
            title="Criar Evento"
            description="Preencha os dados para criar um novo evento"
          >
            <EventForm
              onSuccess={closeCreateDialog}
              onCancel={closeCreateDialog}
            />
          </CreateEditDialog>
        }
      />

      <PageFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Buscar por evento..."
      />

      <DataTable
        data={events}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum evento encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
        page={page}
        itemsPerPage={itemsPerPage}
        total={eventsData?.total || 0}
        onPageChange={setPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Editar Evento"
        description="Atualize as informações do evento"
      >
        {selectedId && (
          <EventForm
            eventId={selectedId}
            onSuccess={closeEditDialog}
            onCancel={closeEditDialog}
          />
        )}
      </EditDialog>

      <ViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        title="Detalhes do Evento"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DetailField label="Nome do Evento" value={selectedEvent.name} />
              <DetailField
                label="Descrição"
                value={selectedEvent.description || "-"}
              />
              <DetailField
                label="Data de Início"
                value={formatDateBR(selectedEvent.startDate.toString())}
              />
              <DetailField
                label="Data de Término"
                value={formatDateBR(selectedEvent.endDate.toString())}
              />
              <DetailField
                label="Status"
                value={
                  <StatusBadge status={selectedEvent.status} variant="event" />
                }
              />
              <DetailField
                label="Código de Compartilhamento"
                value={selectedEvent.shareCode}
              />
              <DetailField
                label="QR Code URL"
                value={selectedEvent.qrCodeUrl || "-"}
              />
              <DetailField
                label="Criado em"
                value={formatDateBR(selectedEvent.createdAt.toString())}
              />
            </div>
          </div>
        )}
      </ViewDialog>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        itemName="evento"
      />

      <DeleteConfirmDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        isDeleting={isDeleting}
        itemName="evento"
        count={selectedIdsForBulkDelete.length}
      />
    </div>
  );
};

export default Events;
