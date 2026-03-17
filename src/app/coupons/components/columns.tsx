import type { ColumnDef } from '@tanstack/react-table';
import type { Coupon } from '@/types/coupons.ts';
import { CouponDiscountType } from '@/types/coupons.ts';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { formatDate, formatMoney } from '@/lib/utils.ts';
import { BadgeContext, Badge as CustomBadge } from '@/components/badge';
import { Badge } from '@/components/ui/badge.tsx';

export const CouponColumns: Array<ColumnDef<Coupon>> = [
  {
    accessorKey: 'code',
    header: 'Code',
    enableSorting: false,
    size: 60,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'discountValue',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Discount" />,
    cell: ({ row }) => {
      const coupon = row.original;
      if (coupon.discountType === CouponDiscountType.PERCENTAGE) {
        return (
          <p className="text-sm">
            <span>{coupon.discountValue}%</span>{' '}
            <Badge>
              Capped: {formatMoney(coupon.discountAmountCap, coupon.country.currency.symbol)}
            </Badge>
          </p>
        );
      }
      return formatMoney(coupon.discountValue, coupon.country.currency.symbol);
    },
  },
  {
    accessorKey: 'systemGenerated',
    header: 'System Generated',
    cell: ({ row }) => (
      <CustomBadge context={BadgeContext.BOOLEAN} value={row.original.systemGenerated} />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <CustomBadge context={BadgeContext.COUPON_STATUS} value={row.original.status} />
    ),
    size: 40,
  },
  {
    accessorKey: 'totalUsageLimit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total Usage Limit" />,
  },
  {
    accessorKey: 'usagePerCustomerLimit',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Per Customer Limit" />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
    size: 60,
  },
];
