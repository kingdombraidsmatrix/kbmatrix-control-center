import type { ColumnDef } from '@tanstack/react-table';
import type { Role } from '@/types';
import { Badge } from '@/components/ui/badge.tsx';

export const RolesColumns: Array<ColumnDef<Role>> = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className="max-w-xs line-clamp-2">{row.original.description}</div>,
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => {
      const permissions = row.original.permissions;
      return (
        <div className="flex items-center gap-1 flex-wrap">
          {permissions.slice(0, 3).map((permission) => (
            <Badge key={permission} variant="secondary">{permission}</Badge>
          ))}
          {permissions.length > 3 && <Badge>+{permissions.length - 3}</Badge>}
        </div>
      );
    },
  },
];
