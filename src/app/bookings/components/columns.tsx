import type { ColumnDef } from '@tanstack/react-table';
import type { Booking } from '@/types/bookings.types.ts';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { formatDate, formatMoney } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

export const BookingsColumns: Array<ColumnDef<Booking>> = [
  {
    accessorKey: 'bookingNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Booking Number" />,
  },
  {
    accessorKey: 'user',
    header: 'Customer',
    accessorFn: (row) => row.user.fullName,
  },
  {
    accessorKey: 'stylist',
    header: 'Stylist',
    accessorFn: (row) => row.items[0]?.service.stylist.name,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge context={BadgeContext.BOOKING_STATUS} value={row.original.status} />,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    accessorFn: (row) => formatMoney(row.total, row.currency.symbol),
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Time" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Time" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
