import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Filter } from '@/components/filter';
import { CustomersColumns } from '@/app/customers/columns.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { useGetCustomersService } from '@/services/customers';
import { useExportUsers } from '@/services/export';
import { ExportButton } from '@/components/export-button';
import { useCustomersFilterConfig } from '@/app/customers/hooks/use-customers-filter-config';
import { useTransformCustomersFilter } from '@/app/customers/hooks/use-transform-customers-filter.ts';



export function CustomersTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });


  const mappedFilters = useTransformCustomersFilter(columnFilters);

  console.log(mappedFilters);

  const serviceParams = {
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    ...mappedFilters,
  };

  const { data, isLoading } = useGetCustomersService(serviceParams);

  const { exportUsers } = useExportUsers();
  const filterConfig = useCustomersFilterConfig();

  const table = useReactTable({
    data: data?.content ?? [],
    columns: CustomersColumns,
    state: { sorting, pagination: { pageIndex, pageSize }, columnFilters },
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
          <CardTitle>All Customers</CardTitle>
          <div className="flex gap-2">
            <Filter config={filterConfig} table={table} columnFiltersState={columnFilters} />
            <ExportButton triggerFn={exportUsers} filePrefix="customers" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={CustomersColumns} 
        table={table} 
        isLoading={isLoading} 
        classNames={{ row: 'cursor-pointer' }}
        />
      </CardContent>
    </Card>
  );
}
