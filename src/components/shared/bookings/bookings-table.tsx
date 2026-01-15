import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import type { BookingsFilter } from '@/types/bookings.types.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { BookingsColumns } from '@/components/shared/bookings/columns.tsx';
import { useGetBookings } from '@/services/bookings';
import { ExportButton } from '@/components/export-button';
import { useExportBookings } from '@/services/export';
import { useTransformBookingsFilter } from '@/components/shared/bookings/hooks/use-transform-bookings-filter.ts';
import { Filter } from '@/components/filter';
import { useBookingsFilterConfig } from '@/components/shared/bookings/hooks/use-bookings-filter-config.ts';

interface BookingsTableProps {
  filters?: Partial<BookingsFilter>;
}
export function BookingsTable({ filters = {} }: BookingsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const mappedFilters = useTransformBookingsFilter(columnFilters);

  const mergedFilters = { ...mappedFilters, ...filters };

  const { data, isLoading } = useGetBookings({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    ...mergedFilters,
  });

  const filterConfig = useBookingsFilterConfig();
  const { exportBookings } = useExportBookings(mergedFilters);

  const table = useReactTable({
    data: data?.content ?? [],
    columns: BookingsColumns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      columnFilters,
      columnVisibility: {
        startTimeFrom: false,
        startTimeTo: false,
        endTimeFrom: false,
        endTimeTo: false,
        createdTimeFrom: false,
        createdTimeTo: false,
      },
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
          <div className="flex gap-2">
            <Filter config={filterConfig} table={table} columnFiltersState={columnFilters} />
            <ExportButton triggerFn={exportBookings} filePrefix="bookings" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={BookingsColumns} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
