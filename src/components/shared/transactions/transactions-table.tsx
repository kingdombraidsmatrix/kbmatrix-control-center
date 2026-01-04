import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import type { Transaction, TransactionsFilter } from '@/types/transactions.types.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { transformSorting } from '@/lib/utils.ts';
import { useGetTransactions } from '@/services/transactions';
import { TransactionsColumns } from '@/components/shared/transactions/columns.tsx';
import { ExportButton } from '@/components/export-button';
import { useExportTransactions } from '@/services/export';
import { Filter } from '@/components/filter';
import { useTransactionFilterConfig } from '@/components/shared/transactions/hooks/use-transaction-filter-config.ts';
import { useTransformTransactionsFilters } from '@/components/shared/transactions/hooks/use-transform-transactions-filters.ts';

type ColumnKey = keyof Transaction | (string & 'to');

interface TransactionsTableProps {
  filters?: Partial<TransactionsFilter>;
  title?: string;
  exclude?: Array<ColumnKey>;
}

export function TransactionsTable({ filters = {}, title, exclude = [] }: TransactionsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const mappedColumnFilters = useTransformTransactionsFilters(columnFilters);

  const { data, isLoading } = useGetTransactions({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
    ...mappedColumnFilters,
    ...filters,
  });

  const hiddenColumns = useMemo(
    () => exclude.reduce((agg, curr) => ({ ...agg, [curr]: false }), {}),
    [exclude],
  );

  const { exportTransactions } = useExportTransactions(filters);
  const filterConfig = useTransactionFilterConfig();

  const table = useReactTable({
    data: data?.content ?? [],
    columns: TransactionsColumns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      columnVisibility: hiddenColumns,
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
          <CardTitle>{title || 'All Transactions'}</CardTitle>
          <div className="flex gap-2">
            <Filter config={filterConfig} table={table} columnFiltersState={columnFilters} />
            <ExportButton triggerFn={exportTransactions} filePrefix="transactions" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable table={table} columns={TransactionsColumns} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
