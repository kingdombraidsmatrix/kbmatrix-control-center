import type { ColumnDef } from '@tanstack/react-table';
import type { AdminUser } from '@/types';
import { formatDate } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

export const AdminUsersColumns: Array<ColumnDef<AdminUser>> = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'user.fullName',
    header: 'Full Name',
    accessorFn: (row) => row.user?.fullName || '-',
  },
  {
    accessorKey: 'role.name',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge context={BadgeContext.ADMIN_STATUS} value={row.original.status} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Invited On',
    accessorFn: (row) => formatDate(row.createdAt),
  },
];
