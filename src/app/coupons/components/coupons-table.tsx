import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Filter } from '@/components/filter';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { useCouponsFilterConfig } from '@/app/coupons/hooks/use-coupons-filter-config.ts';
import { CouponColumns } from '@/app/coupons/components/columns.tsx';
import { useGetCouponsService } from '@/services/coupons/use-get-coupons-service.ts';
import { useTransformCouponsFilter } from '@/app/coupons/hooks/use-transform-coupons-filter.ts';

export function CouponsTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const mappedFilters = useTransformCouponsFilter(columnFilters);

  const { data, isLoading } = useGetCouponsService({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    ...mappedFilters,
  });

  const filterConfig = useCouponsFilterConfig();

  const table = useReactTable({
    data: data?.content ?? [],
    columns: CouponColumns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      columnFilters,
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
          <CardTitle>All Coupons</CardTitle>
          <div className="flex gap-2">
            <Filter config={filterConfig} table={table} columnFiltersState={columnFilters} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={CouponColumns} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
