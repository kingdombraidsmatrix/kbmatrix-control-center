import type { Stylist } from '@/types';
import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';

export interface StylistSettingsComponent {
  data: Stylist;
}

export interface SettingsMenuProps {
  id: StylistSettings;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  component: FC<StylistSettingsComponent>;
}

export enum StylistSettings {
  SUBSCRIPTIONS = 'subscriptions',
  BALANCES = 'balances',
  SERVICES = 'services',
  TEAM_MEMBERS = 'team-members',
}
