import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { useGetTransactions } from '@/services/transactions';
import { TransactionsColumns } from '@/app/transactions/components/columns.tsx';

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetTransactions({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
  });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: TransactionsColumns,
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
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={TransactionsColumns} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
