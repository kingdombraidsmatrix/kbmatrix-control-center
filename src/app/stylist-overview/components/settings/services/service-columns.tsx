import type { ColumnDef } from '@tanstack/react-table';
import type { Service } from '@/types';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { Badge, BadgeContext } from '@/components/badge';
import { formatDate, formatDuration, formatMoney } from '@/lib/utils.ts';
import { StarRating } from '@/components/star-rating';

export const ServiceColumns: Array<ColumnDef<Service>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => <p className="line-clamp-1 text-sm">{getValue() as string}</p>,
    size: 80,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => formatMoney(row.original.price, row.original.currency.symbol),
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
    cell: ({ row }) => formatDuration(row.original.duration),
  },
  {
    accessorKey: 'averageRating',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Average Rating" />,
    cell: ({ row }) => <StarRating averageRating={row.original.averageRating} />,
  },
  {
    accessorKey: 'published',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Published" />,
    cell: ({ row }) => <Badge context={BadgeContext.BOOLEAN} value={row.original.published} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
