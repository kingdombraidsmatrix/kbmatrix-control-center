import { Loader2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group.tsx';
import { useSelectedCurrency } from '@/app/plan-create/hooks/use-selected-currency.ts';

interface PriceFieldProps {
  form: UseFormReturn<PlanRequest>;
}
export function PriceField({ form }: PriceFieldProps) {
  const { selectedCurrency } = useSelectedCurrency(form);

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="monthlyPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Price</FormLabel>
            <FormControl>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    {selectedCurrency?.symbol || <Loader2 className="size-4 animate-spin" />}
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Monthly Price"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min={0}
                  {...field}
                />
              </InputGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="annualPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Yearly Price</FormLabel>
            <FormControl>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>
                    {selectedCurrency?.symbol || <Loader2 className="size-4 animate-spin" />}
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Yearly Price"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min={0}
                  {...field}
                />
              </InputGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
