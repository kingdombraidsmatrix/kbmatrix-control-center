import type { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Textarea as NTextarea } from '@/components/ui/textarea.tsx';

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  control: Control<any, any, any>;
  name: string;
  description?: string;
  label?: string;
}
export function Textarea({ control, name, description, label, ...props }: TextAreaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <NTextarea {...props} {...field} />
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
