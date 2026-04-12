import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { PushNotificationColumns } from '@/app/crm/components/push/columns.tsx';
import { useGetCrmPushMessages } from '@/services/crm';

export function PushNotificationCRMTable() {
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const { data, isLoading } = useGetCrmPushMessages({ page: pageIndex, size: pageSize });

  const table = useReactTable({
    data: data?.content ?? [],
    columns: PushNotificationColumns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    pageCount: data?.totalPages,
    rowCount: data?.totalElements,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Broadcast Push Notification</CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable columns={PushNotificationColumns} table={table} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
