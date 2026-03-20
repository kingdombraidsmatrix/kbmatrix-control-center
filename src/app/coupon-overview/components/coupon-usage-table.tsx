import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import type { CouponUsagesFilter } from '@/services/coupons';
import { useGetCouponUsagesService } from '@/services/coupons';
import { transformSorting } from '@/lib/utils.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Filter } from '@/components/filter';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { CouponUsageColumns } from '@/app/coupon-overview/components/coupon-usage-columns.tsx';
import { useCouponUsagesFilterConfig } from '@/app/coupon-overview/hooks/use-coupon-usages-filter-config.ts';
import { useTransformCouponUsagesFilter } from '@/app/coupon-overview/hooks/use-transform-coupon-usages-filter.ts';

interface CouponUsageTableProps extends Partial<CouponUsagesFilter> {
  couponId: number;
}
export function CouponUsageTable({ couponId }: CouponUsageTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const mappedFilters = useTransformCouponUsagesFilter(columnFilters);

  const { data, isLoading } = useGetCouponUsagesService({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    ...mappedFilters,
    couponId,
  });

  const filterConfig = useCouponUsagesFilterConfig();

  const table = useReactTable({
    data: data?.content ?? [],
    columns: CouponUsageColumns,
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
    <Card className="gap-2">
      <CardHeader>
        <div className="flex gap-4 items-center justify-between">
          <CardTitle>Coupon Usages</CardTitle>
          <div className="flex gap-2">
            <Filter config={filterConfig} table={table} columnFiltersState={columnFilters} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={CouponUsageColumns} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
