import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { SortingState } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { StylistsColumns } from '@/app/stylists/columns.tsx';
import { useGetStylistsService } from '@/services/stylists';
import { transformSorting } from '@/lib/utils.ts';

export function StylistsTable() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetStylistsService({
    page: pageIndex,
    size: pageSize,
    sort: transformSorting(sorting),
  });

  const navigate = useNavigate();

  const table = useReactTable({
    data: data?.content ?? [],
    columns: StylistsColumns,
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
        <CardTitle>All Stylists</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          table={table}
          columns={StylistsColumns}
          isLoading={isLoading}
          classNames={{ row: 'cursor-pointer' }}
          onRowClick={(row) =>
            navigate({ to: '/stylists/$stylistId/{-$tab}/{-$section}', params: { stylistId: String(row.id) } })
          }
        />
      </CardContent>
    </Card>
  );
}
