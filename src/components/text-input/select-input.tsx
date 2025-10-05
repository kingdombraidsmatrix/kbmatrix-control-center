import type { Control } from 'react-hook-form';
import type { SelectProps } from '@radix-ui/react-select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

interface TextInputProps extends React.ComponentProps<React.FC<SelectProps>> {
  control: Control<any, any, any>;
  name: string;
  description?: string;
  label?: string;
  placeholder?: string;
  options: Array<{ label: React.ReactNode; value: string }>;
}
export function SelectInput({
  control,
  name,
  description,
  label,
  placeholder,
  options,
  ...props
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <Select
            {...props}
            {...field}
            onValueChange={props.disabled ? undefined : field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
