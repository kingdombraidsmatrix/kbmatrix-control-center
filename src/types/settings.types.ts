import type { Fee } from '@/types/plans.ts';

export enum SettingsType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  FEE = 'FEE',
}

export type SettingsValue = string | number | boolean | Fee;

export interface Settings {
  key: string;
  value: SettingsValue;
  type: SettingsType;
  title: string;
  description: string;
}

export interface UpdateSettingsRequest {
  key: string;
  value: SettingsValue;
}
