import type { Stylist } from '@/types';

export interface StylistSettingsComponent {
  data: Stylist;
}

export enum StylistSettings {
  SUBSCRIPTIONS = 'subscriptions',
  BALANCES = 'balances',
  SERVICES = 'services',
  TEAM_MEMBERS = 'team-members',
}
