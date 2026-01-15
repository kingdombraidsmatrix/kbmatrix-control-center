import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { RolesColumns } from '@/app/admin/components/roles/roles-columns.tsx';
import { useGetRolesService } from '@/services/admin';

export function RolesTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetRolesService({ page: pageIndex, size: pageSize });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: RolesColumns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    pageCount: data?.totalPages,
    rowCount: data?.totalElements,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableSorting: true,
    manualSorting: true,
  });

  return (
    <DataTable
      columns={RolesColumns}
      table={table}
      isLoading={isLoading}
    />
  );
}
