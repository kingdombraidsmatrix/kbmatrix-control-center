import { z } from 'zod';
import { SettingsType } from '@/types';
import { DynamicInput } from '@/components/dynamic-input';
import { FeeType } from '@/types/plans.ts';

export const ConfigurationField = {
  [SettingsType.NUMBER]: DynamicInput.NUMBER,
  [SettingsType.STRING]: DynamicInput.STRING,
  [SettingsType.BOOLEAN]: DynamicInput.BOOLEAN,
  [SettingsType.FEE]: DynamicInput.FEE,
};

export const ConfigurationValidation = {
  [SettingsType.NUMBER]: z.coerce.number(),
  [SettingsType.STRING]: z.string(),
  [SettingsType.BOOLEAN]: z.coerce.boolean(),
  [SettingsType.FEE]: z.object({
    feeType: z.nativeEnum(FeeType).default(FeeType.PERCENTAGE),
    amount: z.coerce.number(),
    capped: z.boolean().optional().default(false),
    cappedAmount: z.coerce.number(),
    currencyCode: z.string(),
  }),
}
