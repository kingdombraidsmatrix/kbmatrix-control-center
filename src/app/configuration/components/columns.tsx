import { Pencil } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Settings } from '@/types';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';

export const ConfigurationColumns: Array<ColumnDef<Settings>> = [
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    enableSorting: true,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    enableSorting: false,
  },
  {
    accessorKey: 'key',
    header: '',
    cell: () => <Pencil className="size-4 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 text-muted-foreground" />,
  },
];
