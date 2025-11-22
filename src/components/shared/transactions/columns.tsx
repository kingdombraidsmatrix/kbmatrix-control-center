import type { ColumnDef } from '@tanstack/react-table';
import type { Transaction } from '@/types/transactions.types.ts';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { cn, formatDate, formatMoney } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

export const TransactionsColumns: Array<ColumnDef<Transaction>> = [
  {
    accessorKey: 'reference',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reference" />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
  },
  {
    accessorKey: 'to',
    header: 'User / Stylist',
    cell: ({ row: { original: transaction } }) => (
      <span className={cn(transaction.user ? 'text-indigo-600' : 'text-emerald-500')}>
        {transaction.user?.fullName || transaction.stylist?.name}
      </span>
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    accessorFn: (row) => formatMoney(row.totalAmount, row.currency?.symbol ?? ''),
  },
  {
    accessorKey: 'transactionFlow',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Flow" />,
    cell: ({ row }) => (
      <Badge context={BadgeContext.TRANSACTION_FLOW} value={row.original.transactionFlow} />
    ),
  },
  {
    accessorKey: 'transactionType',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <Badge context={BadgeContext.TRANSACTION_TYPE} value={row.original.transactionType} />
    ),
  },
  {
    accessorKey: 'transactionStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge context={BadgeContext.TRANSACTION_STATUS} value={row.original.transactionStatus} />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
