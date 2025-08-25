import { BadgePercent, Bolt, Earth, Layers2, ListChecks } from 'lucide-react';
import type { SettingsMenu } from '@/app/settings/settings.types.ts';

export const settingsMenuItems: Array<SettingsMenu> = [
  {
    key: 'configuration',
    title: 'Configuration',
    subtitle: 'Set app config variables',
    icon: Bolt,
    path: '/settings/configuration',
  },
  {
    key: 'providers',
    title: 'Providers',
    subtitle: 'Manage external providers for payment, etc.',
    icon: Layers2,
    path: '/settings/providers',
  },
  {
    key: 'supported-countries',
    title: 'Supported Countries',
    subtitle: 'Manage countries for the platform',
    icon: Earth,
    path: '/settings/countries',
  },
  {
    key: 'subscription-plans',
    title: 'Subscription Plans',
    icon: BadgePercent,
    path: '/settings/plans',
  },
  {
    key: 'service-categories',
    title: 'Service Categories',
    subtitle: 'Manage global service categories available for all users and stylists',
    icon: ListChecks,
    path: '/settings/service-categories',
  },
];
