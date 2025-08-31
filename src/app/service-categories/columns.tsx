import type { ColumnDef } from '@tanstack/react-table';
import type { ServiceCategory } from '@/types';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { Badge, BadgeContext } from '@/components/badge';
import { ServiceCategoryActionCell } from '@/app/service-categories/service-category-action-cell.tsx';
import { formatDate } from '@/lib/utils.ts';

export const ServiceCategoriesColumns: Array<ColumnDef<ServiceCategory>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'global',
    header: ({ column }) => <DataTableColumnHeader column={column} title="General" />,
    cell: ({ row }) => <Badge context={BadgeContext.BOOLEAN} value={row.original.global} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => <p className="line-clamp-1">{getValue() as string}</p>,
    size: 80,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => <ServiceCategoryActionCell category={row.original} />,
  },
];
