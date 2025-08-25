import type { ColumnDef } from '@tanstack/react-table';
import type { Stylist } from '@/types';
import { formatDate } from '@/lib/utils.ts';
import { StarRating } from '@/components/star-rating';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';

export const StylistsColumns: Array<ColumnDef<Stylist>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'averageRating',
    header: 'Average Rating',
    cell: ({ row }) => <StarRating averageRating={row.original.averageRating} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
