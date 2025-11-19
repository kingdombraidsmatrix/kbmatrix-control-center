import { BadgePercent, Store, UserRoundCog, Wallet2 } from 'lucide-react';
import { type SettingsMenuProps, StylistSettings } from '@/app/stylist-overview/types.ts';
import { StylistSettingsSubscriptions } from '@/app/stylist-overview/components/settings/stylist-settings-subscriptions.tsx';
import { StylistSettingsBalance } from '@/app/stylist-overview/components/settings/stylist-settings-balance.tsx';
import { StylistSettingsService } from '@/app/stylist-overview/components/settings/stylist-settings-service.tsx';
import { StylistSettingsTeam } from '@/app/stylist-overview/components/settings/stylist-settings-team.tsx';

export const settingsMenuItems: Record<StylistSettings, SettingsMenuProps> = {
  [StylistSettings.SUBSCRIPTIONS]: {
    id: StylistSettings.SUBSCRIPTIONS,
    title: 'Subscriptions',
    subtitle: 'Monitor stylist subscription history',
    icon: BadgePercent,
    component: StylistSettingsSubscriptions,
  },
  [StylistSettings.BALANCES]: {
    id: StylistSettings.BALANCES,
    title: 'Balance',
    subtitle: 'Payment methods and wallet balance',
    icon: Wallet2,
    component: StylistSettingsBalance,
  },
  [StylistSettings.SERVICES]: {
    id: StylistSettings.SERVICES,
    title: 'Services & Categories',
    subtitle: 'Stylist services',
    icon: Store,
    component: StylistSettingsService,
  },
  [StylistSettings.TEAM_MEMBERS]: {
    id: StylistSettings.TEAM_MEMBERS,
    title: 'Team Members',
    subtitle: 'Roles and permissions',
    icon: UserRoundCog,
    component: StylistSettingsTeam,
  },
};
