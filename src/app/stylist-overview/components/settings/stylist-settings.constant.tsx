import { BadgePercent, Store, UserRoundCog, Wallet2 } from 'lucide-react';
import type { Subscription } from '@/types/plans.ts';
import type { ColumnDef } from '@tanstack/react-table';
import type { SideTabMenuItemProps } from '@/components/side-tab';
import type { Stylist } from '@/types';
import { StylistSettings } from '@/app/stylist-overview/types.ts';
import { StylistSettingsSubscriptions } from '@/app/stylist-overview/components/settings/stylist-settings-subscriptions.tsx';
import { StylistSettingsBalance } from '@/app/stylist-overview/components/settings/stylist-settings-balance.tsx';
import { StylistSettingsService } from '@/app/stylist-overview/components/settings/stylist-settings-service.tsx';
import { StylistSettingsTeam } from '@/app/stylist-overview/components/settings/stylist-settings-team.tsx';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header.tsx';
import { formatDate } from '@/lib/utils.ts';
import { Badge, BadgeContext } from '@/components/badge';

export const settingsMenuItems: Array<SideTabMenuItemProps<Stylist>> = [
  {
    id: StylistSettings.SUBSCRIPTIONS,
    title: 'Subscriptions',
    subtitle: 'Monitor stylist subscription history',
    icon: BadgePercent,
    component: StylistSettingsSubscriptions,
  },
  {
    id: StylistSettings.BALANCES,
    title: 'Balance',
    subtitle: 'Payment methods and wallet balance',
    icon: Wallet2,
    component: StylistSettingsBalance,
  },
  {
    id: StylistSettings.SERVICES,
    title: 'Services & Categories',
    subtitle: 'Stylist services',
    icon: Store,
    component: StylistSettingsService,
  },
  {
    id: StylistSettings.TEAM_MEMBERS,
    title: 'Team Members',
    subtitle: 'Roles and permissions',
    icon: UserRoundCog,
    component: StylistSettingsTeam,
  },
];

export const SubscriptionsColumns: Array<ColumnDef<Subscription>> = [
  {
    accessorKey: 'currentPlan.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge context={BadgeContext.SUBSCRIPTION_STATUS} value={row.original.status} />
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    enableSorting: true,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Updated" />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const value = getValue() as string | undefined;
      return value ? formatDate(value) : '-';
    },
  },
];
