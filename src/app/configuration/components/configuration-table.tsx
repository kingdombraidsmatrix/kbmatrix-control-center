import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import type { Settings } from '@/types';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { useGetSettings } from '@/services/settings';
import { ConfigurationColumns } from '@/app/configuration/components/columns.tsx';
import { ConfigurationDialog } from '@/app/configuration/components/configuration-dialog.tsx';

export function ConfigurationTable() {
  const [selectedSettings, setSelectedSettings] = useState<Settings | undefined>();
  const { data, isLoading } = useGetSettings();

  const table = useReactTable({
    data: data ?? [],
    columns: ConfigurationColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    manualSorting: false,
    manualPagination: false,
  });

  return (
    <>
      <DataTable
        columns={ConfigurationColumns}
        table={table}
        isLoading={isLoading}
        classNames={{ row: 'cursor-pointer' }}
        onRowClick={setSelectedSettings}
      />
      <ConfigurationDialog data={selectedSettings} onClose={() => setSelectedSettings(undefined)} />
    </>
  );
}
