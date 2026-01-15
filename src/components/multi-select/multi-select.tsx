import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { FilterOption } from '@/components/multi-select/types.ts';
import { Label } from '@/components/ui/label.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { cn } from '@/lib/utils.ts';

interface MultiSelectProps {
  options: Array<FilterOption>;
  value: Set<string> | null;
  onChange: (value: Set<string>) => void;
  maxDisplayValues?: number;
  label?: string;
}
export function MultiSelect({
  options,
  value,
  onChange,
  maxDisplayValues = 3,
  label,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const values = value || new Set<string>();

  const handleChange = useCallback(
    (itemValue: string) => {
      if (values.has(itemValue)) {
        values.delete(itemValue);
        onChange(values);
      } else {
        values.add(itemValue);
        onChange(values);
      }
    },
    [values, onChange],
  );

  const optionsMap = useMemo(
    () =>
      options.reduce<Record<string, FilterOption>>((agg, curr) => {
        agg[curr.value] = curr;
        return agg;
      }, {}),
    [options],
  );

  const selectedOptions = Array.from(values)
    .slice(0, maxDisplayValues)
    .map((v) => optionsMap[v]);

  return (
    <div className="space-y-2">
      {!!label && <Label>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-auto min-h-10"
            ref={triggerRef}
          >
            <span className="flex-1 text-left flex gap-1 flex-wrap">
              {values.size === 0 ? (
                `Select ${label?.toLowerCase() || 'options'}`
              ) : (
                <>
                  {selectedOptions.map((item) => (
                    <Badge key={item.value} variant="outline">
                      <span className="block max-w-32 truncate">{item.label}</span>
                      <button
                        title={`Remove ${item.label}`}
                        className="cursor-pointer text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleChange(item.value);
                        }}
                      >
                        <X />
                      </button>
                    </Badge>
                  ))}
                  {values.size > maxDisplayValues && (
                    <Badge variant="secondary">+{values.size - maxDisplayValues}</Badge>
                  )}
                </>
              )}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: `${triggerRef.current?.clientWidth || 200}px` }}
        >
          <Command>
            <CommandInput
              placeholder={`Search ${label?.toLowerCase() || 'options'}`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} value={option.value} onSelect={handleChange}>
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        values.has(option.value) ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
