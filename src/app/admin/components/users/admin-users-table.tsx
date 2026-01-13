import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { useGetAdminUsersService } from '@/services/admin';
import { AdminUsersColumns } from '@/app/admin/components/users/admin-users-columns.tsx';

export function AdminUsersTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetAdminUsersService({ page: pageIndex, size: pageSize });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: AdminUsersColumns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    pageCount: data?.totalPages,
    rowCount: data?.totalElements,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableSorting: true,
    manualSorting: true,
  });

  return <DataTable columns={AdminUsersColumns} table={table} isLoading={isLoading} />;
}
