import { useState } from "react";
import { useEvents, useDeleteEvent, useEvent } from "@/hooks/useEvents";
import useFilterData from "@/hooks/useFilterData";
import useAdminPage from "@/hooks/useAdminPage";
import useBulkDelete from "@/hooks/useBulkDelete";
import DataTable from "@/components/admin/DataTable";
import { ListEventDto } from "@/types/events.dto";
import { formatCurrencyBRL } from "@/utils/currencyBRL";
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
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: events = [], isLoading } = useEvents();
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
  } = useAdminPage<ListEventDto>();

  const { data: selectedEvent } = useEvent(selectedId || undefined);
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();

  const filteredEvents = useFilterData<ListEventDto>({
    data: events,
    searchValue,
    startDate,
    endDate,
    searchFields: ["eventName", "fullName", "email", "planName"],
    dateField: "eventDate",
  });

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
      key: "eventName",
      header: "Evento",
    },
    {
      key: "fullName",
      header: "Cliente",
    },
    {
      key: "eventDate",
      header: "Data",
      render: (item: ListEventDto) => formatDateBR(item.eventDate),
    },
    {
      key: "planName",
      header: "Plano",
    },
    {
      key: "status",
      header: "Status",
      render: (item: ListEventDto) => (
        <StatusBadge status={item.status} variant="event" />
      ),
    },
    {
      key: "totalRevenue",
      header: "Receita",
      render: (item: ListEventDto) => formatCurrencyBRL(item.totalRevenue),
    },
    {
      key: "actions",
      header: "Ações",
      render: (item: ListEventDto) => (
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
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        searchPlaceholder="Buscar por evento, cliente, e-mail ou plano..."
      />

      <DataTable
        data={filteredEvents}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Nenhum evento encontrado"
        enableSelection
        onBulkDeleteClick={handleBulkDeleteClick}
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
              <DetailField
                label="Nome do Evento"
                value={selectedEvent.eventName}
              />
              <DetailField label="Cliente" value={selectedEvent.fullName} />
              <DetailField label="Email" value={selectedEvent.email} />
              <DetailField label="Telefone" value={selectedEvent.phone} />
              <DetailField
                label="Data do Evento"
                value={formatDateBR(selectedEvent.eventDate)}
              />
              <DetailField label="Plano" value={selectedEvent.planName} />
              <DetailField
                label="Status"
                value={
                  <StatusBadge status={selectedEvent.status} variant="event" />
                }
              />
              <DetailField label="Arquivos" value={selectedEvent.filesCount} />
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
