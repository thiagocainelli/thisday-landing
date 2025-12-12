import { ReactNode, useState, useMemo, useEffect } from "react";
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
  pageSize?: number;
  pageSizeOptions?: number[];
}

function DataTable<T extends { id: string }>({
  data,
  columns,
  isLoading = false,
  onRowClick,
  emptyMessage = "Nenhum registro encontrado",
  enableSelection = false,
  onBulkDelete,
  onBulkDeleteClick,
  bulkActions = [],
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedData.map((item) => item.id)));
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
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.has(item.id));
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds(new Set()); // Clear selection on page change
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    setSelectedIds(new Set()); // Clear selection on page size change
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

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
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => !enableSelection && onRowClick?.(item)}
                className={
                  onRowClick && !enableSelection ? "cursor-pointer" : ""
                }
                data-selected={selectedIds.has(item.id)}
              >
                {enableSelection && (
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                    className="w-12"
                  >
                    <Checkbox
                      checked={selectedIds.has(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(item.id, checked as boolean)
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
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={data.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}

export default DataTable;
