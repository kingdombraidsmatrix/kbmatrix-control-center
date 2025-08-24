import type { ColumnDef } from '@tanstack/react-table';
import type {User} from '@/types';
import { formatDate } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

export const CustomersColumns: Array<ColumnDef<User>> = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'enabled',
    header: 'Enabled',
    cell: ({ row }) => <Badge context={BadgeContext.BOOLEAN} value={row.original.enabled} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge context={BadgeContext.USER_STATUS} value={row.original.status} />,
  },
  {
    accessorKey: 'signupType',
    header: 'Signup Type',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
