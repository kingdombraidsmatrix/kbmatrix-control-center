import { useCallback, useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { TextInput } from '@/components/text-input';

interface FreeTrialFieldProps {
  form: UseFormReturn<PlanRequest>;
}
export function FreeTrialField({ form }: FreeTrialFieldProps) {
  const trialDays = form.watch('trialDays');

  const [hasFreeTrial, setHasFreeTrial] = useState(false);

  const toggleFreeTrial = useCallback(
    (checked: boolean) => {
      setHasFreeTrial(checked);
      if (!checked) {
        form.setValue('trialDays', 0);
      }
    },
    [form],
  );

  useEffect(() => {
    if ((trialDays || 0) > 0) {
      setHasFreeTrial(true);
    }
  }, [trialDays]);

  return (
    <Item variant="muted" className="items-start">
      <ItemContent>
        <ItemTitle>Free trial?</ItemTitle>
        <ItemDescription>Should this plan offer free trial?</ItemDescription>

        {hasFreeTrial && (
          <div className="pt-6">
            <TextInput
              control={form.control}
              name="trialDays"
              label="Number of trial days"
              placeholder="Number of trial days"
              type="number"
              min={0}
            />
          </div>
        )}
      </ItemContent>
      <ItemActions>
        <Switch checked={hasFreeTrial} onCheckedChange={toggleFreeTrial} />
      </ItemActions>
    </Item>
  );
}
