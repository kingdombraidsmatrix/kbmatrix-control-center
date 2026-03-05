import { useState } from 'react';
import { getCoreRowModel,  useReactTable } from '@tanstack/react-table';
import type {SortingState} from '@tanstack/react-table';
import { useGetServiceCategories } from '@/services/services/use-get-service-categories.ts';
import { transformSorting } from '@/lib/utils.ts';
import { ServiceCategoriesColumns } from '@/app/service-categories/columns.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';

interface StylistSettingsServiceProps {
  stylistId: number;
}
export function StylistServiceCategories({ stylistId }: StylistSettingsServiceProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetServiceCategories({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    stylistId,
    includeGlobal: false,
  });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: ServiceCategoriesColumns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      columnVisibility: { id: false, global: false },
    },
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
    <Card>
      <CardHeader>
        <CardTitle>Service Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={ServiceCategoriesColumns} table={table} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}