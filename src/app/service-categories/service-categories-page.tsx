import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { Button } from '@/components/ui/button.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { useGetServiceCategories } from '@/services/services/use-get-service-categories.ts';
import { ServiceCategoriesColumns } from '@/app/service-categories/columns.tsx';
import { ServiceCategoryDialog } from '@/app/service-categories/service-category-dialog.tsx';

export function ServiceCategoriesPage() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetServiceCategories({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
  });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: ServiceCategoriesColumns,
    state: { sorting, pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount: data?.totalPages,
    rowCount: data?.totalElements,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableSorting: true,
    manualSorting: true,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-5">
        <h3 className="font-semibold flex-1">Service Categories</h3>
        <ServiceCategoryDialog trigger={<Button>Add New</Button>} />
      </div>

      <DataTable columns={ServiceCategoriesColumns} table={table} isLoading={isLoading} />
    </div>
  );
}
