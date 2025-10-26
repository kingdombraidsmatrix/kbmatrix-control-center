export enum SettingsType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
}

export type SettingsValue = string | number;

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
