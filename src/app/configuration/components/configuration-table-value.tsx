import type { Settings } from '@/types';
import type {Fee} from '@/types/plans.ts';
import { SettingsType } from '@/types';
import { Badge as ShadBadge } from '@/components/ui/badge.tsx';
import { Badge, BadgeContext } from '@/components/badge';
import {  FeeType } from '@/types/plans.ts';
import { formatMoney } from '@/lib/utils.ts';

interface ConfigurationTableValueProps {
  settings: Settings;
}
export function ConfigurationTableValue({ settings }: ConfigurationTableValueProps) {
  if (settings.type === SettingsType.BOOLEAN) {
    return <Badge context={BadgeContext.BOOLEAN} value={settings.value as boolean} />;
  }

  if (settings.type === SettingsType.FEE) {
    const value = settings.value as Fee;
    const amount =
      value.feeType === FeeType.PERCENTAGE
        ? `${value.amount} %`
        : formatMoney(value.amount, value.currencyCode);
    return (
      <span>
        <ShadBadge variant="secondary">
          Type: <span className="font-bold">{value.feeType}</span>
        </ShadBadge>{' '}
        <ShadBadge variant="secondary">
          Amount: <span className="font-bold">{amount}</span>
        </ShadBadge>{' '}
        <ShadBadge variant="secondary">
          Capped: <span className="font-bold">{value.capped ? 'true' : 'false'}</span>
        </ShadBadge>{' '}
        {value.capped && (
          <ShadBadge variant="secondary">
            Capped Amount:{' '}
            <span className="font-bold">{formatMoney(value.cappedAmount, value.currencyCode)}</span>
          </ShadBadge>
        )}
      </span>
    );
  }

  if (settings.type === SettingsType.NUMBER) {
    return <span className="text-blue-600">{settings.value as number}</span>;
  }

  return <span className="text-emerald-600">{settings.value as string}</span>;
}
