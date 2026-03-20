import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import type { CouponUsage } from '@/types/coupons.ts';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { formatDate, formatMoney } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

export const CouponUsageColumns: Array<ColumnDef<CouponUsage>> = [
  {
    accessorKey: 'user.fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'booking',
    header: 'Booking',
    cell: ({ row }) => {
      const booking = row.original.booking;
      if (booking) {
        return <Link to="/coupons">#{booking.bookingNumber}</Link>;
      }
      return '-';
    },
  },
  {
    accessorKey: 'originalAmount',
    header: 'Original Amount',
    cell: ({ row }) =>
      formatMoney(row.original.originalAmount, row.original.coupon.country.currency.symbol),
  },
  {
    accessorKey: 'discountAmount',
    header: 'Discount Amount',
    cell: ({ row }) =>
      formatMoney(row.original.discountAmount, row.original.coupon.country.currency.symbol),
  },
  {
    accessorKey: 'finalAmount',
    header: 'Final Amount',
    cell: ({ row }) =>
      formatMoney(row.original.finalAmount, row.original.coupon.country.currency.symbol),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge context={BadgeContext.COUPON_USAGE_STATUS} value={row.original.status} />
    ),
  },
  {
    accessorKey: 'usedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Used At" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
    size: 60,
  },
];
