import { useState } from "react";

interface UseAdminPageOptions {
  onDeleteSuccess?: () => void;
}

const useAdminPage = <T extends { id?: string; uuid?: string }>(
  options?: UseAdminPageOptions
) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getItemId = (item: T): string => {
    return (item as { id?: string; uuid?: string }).id || (item as { id?: string; uuid?: string }).uuid || "";
  };

  const handleEdit = (item: T) => {
    setSelectedId(getItemId(item));
    setIsEditDialogOpen(true);
  };

  const handleView = (item: T) => {
    setSelectedId(getItemId(item));
    setIsViewDialogOpen(true);
  };

  const handleDelete = (item: T) => {
    setSelectedId(getItemId(item));
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

