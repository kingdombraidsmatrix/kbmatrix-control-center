import type { ColumnDef } from '@tanstack/react-table';
import type { Stylist } from '@/types';
import { formatDate } from '@/lib/utils.ts';
import { StarRating } from '@/components/star-rating';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { formatPhoneNumber } from '@/utils';
import { CountryFlag } from '@/components/country-flag';
import { Badge, BadgeContext } from '@/components/badge';

export const StylistsColumns: Array<ColumnDef<Stylist>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    accessorFn: (row) => row.contact.email || '-',
  },
  {
    accessorKey: 'contact.phoneNumber',
    header: 'Phone Number',
    accessorFn: (row) => formatPhoneNumber(row.contact.phoneNumber) || '-',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge context={BadgeContext.STYLIST_STATUS} value={row.original.status} />,
  },
  {
    accessorKey: 'countryCode',
    header: 'Country',
    cell: ({ getValue }) => <CountryFlag countryCode={getValue() as string} />,
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
