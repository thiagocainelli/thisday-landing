import { useState } from "react";

interface UseAdminPageOptions {
  onDeleteSuccess?: () => void;
}

const useAdminPage = <T extends { id: string }>(
  options?: UseAdminPageOptions
) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEdit = (item: T) => {
    setSelectedId(item.id);
    setIsEditDialogOpen(true);
  };

  const handleView = (item: T) => {
    setSelectedId(item.id);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (item: T) => {
    setSelectedId(item.id);
    setIsDeleteDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedId(null);
  };

  const closeViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedId(null);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedId(null);
    options?.onDeleteSuccess?.();
  };

  return {
    // States
    isCreateDialogOpen,
    isEditDialogOpen,
    isViewDialogOpen,
    isDeleteDialogOpen,
    selectedId,

    // Setters
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsViewDialogOpen,
    setIsDeleteDialogOpen,
    setSelectedId,

    // Handlers
    handleEdit,
    handleView,
    handleDelete,

    // Close handlers
    closeEditDialog,
    closeViewDialog,
    closeCreateDialog,
    closeDeleteDialog,
  } as const;
};

export default useAdminPage;

