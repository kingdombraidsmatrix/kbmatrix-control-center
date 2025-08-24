import type { ColumnDef } from '@tanstack/react-table';
import type { Stylist } from '@/types';
import { formatDate } from '@/lib/utils.ts';
import { StarRating } from '@/components/star-rating';

export const StylistsColumns: Array<ColumnDef<Stylist>> = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'averageRating',
    header: 'Average Rating',
    cell: ({ row }) => <StarRating averageRating={row.original.averageRating} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
