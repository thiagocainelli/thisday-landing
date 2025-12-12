import { useState } from "react";

interface UseBulkDeleteOptions {
  onDelete: (id: string, callbacks?: { onSuccess?: () => void }) => void;
  onAllDeleteSuccess?: () => void;
}

/**
 * Hook para gerenciar exclusão em lote de itens
 * @param onDelete - Função que executa a exclusão de um item (recebe id e callbacks)
 * @param onAllDeleteSuccess - Callback executado após todas as exclusões
 * @returns Estado e handlers para exclusão em lote
 */
const useBulkDelete = ({
  onDelete,
  onAllDeleteSuccess,
}: UseBulkDeleteOptions) => {
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [selectedIdsForBulkDelete, setSelectedIdsForBulkDelete] = useState<
    string[]
  >([]);

  const handleBulkDeleteClick = (selectedIds: string[]) => {
    setSelectedIdsForBulkDelete(selectedIds);
    setIsBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    const deletePromises = selectedIdsForBulkDelete.map(
      (id) =>
        new Promise<void>((resolve) => {
          onDelete(id, {
            onSuccess: () => {
              resolve();
            },
          });
        })
    );

    await Promise.all(deletePromises);
    setIsBulkDeleteDialogOpen(false);
    setSelectedIdsForBulkDelete([]);
    onAllDeleteSuccess?.();
  };

  const closeBulkDeleteDialog = () => {
    setIsBulkDeleteDialogOpen(false);
    setSelectedIdsForBulkDelete([]);
  };

  return {
    isBulkDeleteDialogOpen,
    selectedIdsForBulkDelete,
    handleBulkDeleteClick,
    confirmBulkDelete,
    closeBulkDeleteDialog,
    setIsBulkDeleteDialogOpen,
  };
};

export default useBulkDelete;
