import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/types';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { Badge, BadgeContext } from '@/components/badge';
import { CountryFlag } from '@/components/country-flag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';

interface CouponDetailsUsersProps {
  users: Array<User>;
}
export function CouponDetailsUsers({ users }: CouponDetailsUsersProps) {
  const table = useReactTable({
    data: users,
    columns: couponDetailsUsersColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    enableSorting: true,
    manualSorting: false,
  });
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>Applied Users</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={couponDetailsUsersColumns} table={table} />
      </CardContent>
    </Card>
  );
}

const couponDetailsUsersColumns: Array<ColumnDef<User>> = [
  {
    accessorKey: 'fullName',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge context={BadgeContext.USER_STATUS} value={row.original.status} />,
  },
  {
    accessorKey: 'countryCode',
    header: 'Country',
    cell: ({ getValue }) => <CountryFlag countryCode={getValue() as string} />,
  },
];
