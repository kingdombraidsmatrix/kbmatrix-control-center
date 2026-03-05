import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { useGetServices } from '@/services/services/use-get-services.ts';
import { transformSorting } from '@/lib/utils.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { ServiceColumns } from '@/app/stylist-overview/components/settings/services/service-columns.tsx';

interface StylistSettingsServiceProps {
  stylistId: number;
}
export function StylistServices({ stylistId }: StylistSettingsServiceProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetServices({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    stylistId,
  });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: ServiceColumns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
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
        <CardTitle>Service</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={ServiceColumns} table={table} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
