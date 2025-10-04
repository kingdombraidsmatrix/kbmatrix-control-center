import { useCallback, useState } from 'react';
import { Loader2 } from 'lucide-react';
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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group.tsx';
import { useSelectedCurrency } from '@/app/plan-create/hooks/use-selected-currency.ts';

interface DiscountFieldProps {
  form: UseFormReturn<PlanRequest>;
}
export function DiscountField({ form }: DiscountFieldProps) {
  const { selectedCurrency } = useSelectedCurrency(form);

  const [hasDiscount, setHasDiscount] = useState<boolean>(false);

  const toggleDiscount = useCallback(
    (checked: boolean) => {
      setHasDiscount(checked);
      form.setValue('hasDiscount', checked);

      if (!checked) {
        form.setValue('discountMonthlyPrice', 0);
        form.setValue('discountAnnualPrice', 0);
      }
    },
    [form],
  );

  return (
    <Item variant="muted" className="items-start">
      <ItemContent>
        <ItemTitle>Discount?</ItemTitle>
        <ItemDescription>Should this plan offer discount?</ItemDescription>

        {hasDiscount && (
          <div className="grid grid-cols-2 gap-4 pt-6">
            <FormField
              control={form.control}
              name="discountMonthlyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Monthly Price</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>
                          {selectedCurrency?.symbol || <Loader2 className="size-4 animate-spin" />}
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Discount Monthly Price"
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
              name="discountAnnualPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Annual Price</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>
                          {selectedCurrency?.symbol || <Loader2 className="size-4 animate-spin" />}
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Discount Annual Price"
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
        )}
      </ItemContent>
      <ItemActions>
        <Switch checked={hasDiscount} onCheckedChange={toggleDiscount} />
      </ItemActions>
    </Item>
  );
}
