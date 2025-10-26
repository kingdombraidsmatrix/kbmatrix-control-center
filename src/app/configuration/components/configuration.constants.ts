import { SettingsType } from '@/types';
import { DynamicInput } from '@/components/dynamic-input';

export const ConfigurationField = {
  [SettingsType.NUMBER]: DynamicInput.NUMBER,
  [SettingsType.STRING]: DynamicInput.STRING,
};
