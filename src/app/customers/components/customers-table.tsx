import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { CustomersColumns } from '@/app/customers/columns.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { useGetCustomersService } from '@/services/customers';
import { UserStatus } from '@/types';
import { useExportUsers } from '@/services/export';
import { ExportButton } from '@/components/export-button';

export function CustomersTable() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetCustomersService({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    userStatus: [UserStatus.ACTIVE],
  });

  const { exportUsers } = useExportUsers();

  const table = useReactTable({
    data: data?.content ?? [],
    columns: CustomersColumns,
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
          <CardTitle>All Customers</CardTitle>
          <ExportButton triggerFn={exportUsers} filePrefix="customers" />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={CustomersColumns} table={table} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
