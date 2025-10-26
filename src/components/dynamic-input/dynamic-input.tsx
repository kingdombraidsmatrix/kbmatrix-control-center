import type { DynamicInputProps } from '@/components/dynamic-input/dynamic-input.types.ts';
import { TextInput } from '@/components/text-input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { Switch } from '@/components/ui/switch.tsx';

export function NumberTextInput({ form, name, placeholder, label }: DynamicInputProps) {
  return (
    <TextInput
      control={form.control}
      name={name}
      placeholder={placeholder}
      type="number"
      min={0}
      label={label}
    />
  );
}

export function StringTextInput({ form, name, placeholder, label }: DynamicInputProps) {
  return <TextInput control={form.control} name={name} placeholder={placeholder} label={label} />;
}

export function BooleanInput({ form, name }: DynamicInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Switch checked={!!field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
