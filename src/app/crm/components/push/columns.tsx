import pluralize from 'pluralize';
import type { ColumnDef } from '@tanstack/react-table';
import type { BroadcastPushListItem } from '@/types/crm.ts';
import { formatDate, formatNumber } from '@/lib/utils.ts';
import { BadgeContext, Badge as CustomBadge } from '@/components/badge';
import { Badge } from '@/components/ui/badge.tsx';
import { PushNotificationActionCell } from '@/app/crm/components/push/action-cell.tsx';

export const PushNotificationColumns: Array<ColumnDef<BroadcastPushListItem>> = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'target',
    header: 'Target',
    cell: ({ row }) => {
      const msg = row.original;
      return (
        <div className="flex gap-1 flex-wrap">
          <Badge variant="secondary">
            {msg.allUsers
              ? 'All Users'
              : `${formatNumber(msg.userCount)} ${pluralize('user', msg.userCount)}`}
          </Badge>
          <Badge variant="secondary">
            {msg.allStylists
              ? 'All Stylists'
              : `${formatNumber(msg.stylistCount)} ${pluralize('stylist', msg.stylistCount)}`}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'scheduled',
    header: 'Scheduled',
    cell: ({ row }) => (
      <CustomBadge context={BadgeContext.BOOLEAN} value={row.original.scheduled} />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <CustomBadge context={BadgeContext.BROADCAST_PUSH_STATUS} value={row.original.status} />
    ),
  },
  {
    accessorKey: 'scheduledTime',
    header: 'Scheduled Time',
    cell: ({ row }) => (row.original.scheduledTime ? formatDate(row.original.scheduledTime) : '-'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: 'actions',
    header: () => null,
    cell: ({ row }) => <PushNotificationActionCell row={row.original} />,
  },
];
