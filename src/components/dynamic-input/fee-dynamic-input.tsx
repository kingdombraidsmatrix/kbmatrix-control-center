import { AlertCircle, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import type { DynamicInputProps } from '@/components/dynamic-input/dynamic-input.types.ts';
import { FeeType } from '@/types/plans.ts';
import { Alert, AlertTitle } from '@/components/ui/alert.tsx';
import { SelectInput } from '@/components/text-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { useSelectedCurrency } from '@/app/plan-create/hooks/use-selected-currency.ts';

export function FeeDynamicInput({ form, name }: DynamicInputProps) {
  const { watch, setValue } = form;
  const selectedType: FeeType = watch(`${name}.feeType` as any);
  const capped: boolean = watch(`${name}.capped` as any);

  const { selectedCurrency, isLoading } = useSelectedCurrency(form);

  useEffect(() => {
    setValue(`${name}.currencyCode` as any, selectedCurrency?.code);
  }, [selectedCurrency, setValue]);

  useEffect(() => {
    if (selectedType === FeeType.FLAT) {
      setValue(`${name}.capped` as any, false);
    }
  }, [selectedType, setValue]);

  useEffect(() => {
    if (!capped) {
      setValue(`${name}.cappedAmount` as any, 0);
    }
  }, [capped, setValue]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center w-full">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (!selectedCurrency) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>A valid country should be selected first</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <SelectInput
        control={form.control}
        name={`${name}.feeType`}
        label="Fee Type"
        options={[
          { label: 'Percentage', value: FeeType.PERCENTAGE },
          { label: 'Flat', value: FeeType.FLAT },
        ]}
      />

      <FormField
        control={form.control}
        name={`${name}.amount` as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <InputGroup>
                {selectedType === FeeType.FLAT && (
                  <InputGroupAddon>
                    <InputGroupText>{selectedCurrency.symbol}</InputGroupText>
                  </InputGroupAddon>
                )}
                <InputGroupInput
                  placeholder="Amount"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min={0}
                  {...field}
                />
                {selectedType === FeeType.PERCENTAGE && (
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedType === FeeType.PERCENTAGE && (
        <FormField
          control={form.control}
          name={`${name}.capped` as any}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Capped?</FormLabel>
              <FormControl>
                <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {capped && (
        <FormField
          control={form.control}
          name={`${name}.cappedAmount` as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cap Amount</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>{selectedCurrency.symbol}</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Cap Amount"
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
      )}
    </div>
  );
}
