import { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import TablePagination from "@/components/admin/TablePagination";
import SelectionToolbar from "@/components/admin/SelectionToolbar";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  enableSelection?: boolean;
  onBulkDelete?: (selectedIds: string[]) => void;
  onBulkDeleteClick?: (selectedIds: string[]) => void;
  bulkActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedIds: string[]) => void;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  }>;
  // Pagination props (server-side)
  page?: number;
  itemsPerPage?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
}

function DataTable<T extends { id?: string; uuid?: string }>({
  data,
  columns,
  isLoading = false,
  onRowClick,
  emptyMessage = "Nenhum registro encontrado",
  enableSelection = false,
  onBulkDelete,
  onBulkDeleteClick,
  bulkActions = [],
  page = 1,
  itemsPerPage = 10,
  total = 0,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 20, 50, 100],
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const totalPages = total > 0 ? Math.ceil(total / itemsPerPage) : 0;

  const getItemId = (item: T): string => {
    return (
      (item as { id?: string; uuid?: string }).id ||
      (item as { id?: string; uuid?: string }).uuid ||
      ""
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(data.map((item) => getItemId(item))));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected =
    data.length > 0 && data.every((item) => selectedIds.has(getItemId(item)));
  const isIndeterminate = selectedIds.size > 0 && !isAllSelected;

  const handleBulkDelete = () => {
    if (onBulkDelete && selectedIds.size > 0) {
      onBulkDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handleBulkDeleteClick = () => {
    if (onBulkDeleteClick && selectedIds.size > 0) {
      onBulkDeleteClick(Array.from(selectedIds));
    }
  };

  const handleBulkAction = (action: (selectedIds: string[]) => void) => {
    if (selectedIds.size > 0) {
      action(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handlePageChange = (newPage: number) => {
    setSelectedIds(new Set()); // Clear selection on page change
    onPageChange?.(newPage);
  };

  const handlePageSizeChange = (newItemsPerPage: number) => {
    setSelectedIds(new Set()); // Clear selection on page size change
    onItemsPerPageChange?.(newItemsPerPage);
    onPageChange?.(1); // Reset to first page when changing page size
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground rounded-md border">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {enableSelection && (
        <SelectionToolbar
          selectedCount={selectedIds.size}
          onClearSelection={() => setSelectedIds(new Set())}
          onBulkDelete={onBulkDelete ? handleBulkDelete : undefined}
          onBulkDeleteClick={
            onBulkDeleteClick ? handleBulkDeleteClick : undefined
          }
          bulkActions={bulkActions.map((action) => ({
            ...action,
            onClick: () => handleBulkAction(action.onClick),
          }))}
        />
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {enableSelection && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = isIndeterminate;
                      }
                    }}
                    className={cn(
                      "h-4 w-4 rounded-sm border border-primary ring-offset-background",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      "cursor-pointer"
                    )}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={String(column.key)}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const itemId = getItemId(item);
              return (
                <TableRow
                  key={itemId}
                  onClick={() => !enableSelection && onRowClick?.(item)}
                  className={
                    onRowClick && !enableSelection ? "cursor-pointer" : ""
                  }
                  data-selected={selectedIds.has(itemId)}
                >
                  {enableSelection && (
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="w-12"
                    >
                      <Checkbox
                        checked={selectedIds.has(itemId)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(itemId, checked as boolean)
                        }
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {onPageChange && onItemsPerPageChange && (
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={itemsPerPage}
          totalItems={total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}

export default DataTable;
