import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import type { BookingsFilter } from '@/types/bookings.types.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { BookingsColumns } from '@/components/shared/bookings/columns.tsx';
import { useGetBookings } from '@/services/bookings';
import { ExportButton } from '@/components/export-button';
import { useExportBookings } from '@/services/export';

interface BookingsTableProps {
  filters?: Partial<BookingsFilter>;
}
export function BookingsTable({ filters = {} }: BookingsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetBookings({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    ...filters,
  });

  const { exportBookings } = useExportBookings(filters);

  const table = useReactTable({
    data: data?.content ?? [],
    columns: BookingsColumns,
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
    <Card>
      <CardHeader>
        <div className="flex gap-4 items-center justify-between">
          <CardTitle>All Bookings</CardTitle>
          <ExportButton triggerFn={exportBookings} filePrefix="bookings" />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={BookingsColumns} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
