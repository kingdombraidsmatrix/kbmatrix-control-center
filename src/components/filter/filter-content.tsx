import { useCallback, useRef, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { FilterConfig, FilterSelect, FilterText } from '@/components/filter/types.ts';
import type { Table } from '@tanstack/table-core';
import type { Column } from '@tanstack/react-table';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { FilterDateRangeComponent } from '@/components/filter/components/filter-date-range.tsx';
import { MultiSelect } from '@/components/multi-select';

interface FilterContentProps {
  config: FilterConfig;
  table: Table<unknown>;
}
export function FilterContent({ config, table }: FilterContentProps) {
  return (
    <div className="space-y-6 px-4">
      {config.map((item, index) => {
        if ('columnKey' in item) {
          const column = table.getColumn(item.columnKey);

          if (!column || !column.getIsVisible()) return null;

          if (item.type === 'text') {
            return <FilterTextComponent key={index} column={column} {...item} />;
          }

          if (item.type === 'multi-select') {
            return <FilterMultiSelectComponent key={index} column={column} {...item} />;
          }

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (item.type === 'single-select') {
            return <FilterSingleSelectComponent key={index} column={column} {...item} />;
          }
        }

        if (item.type === 'date-range') {
          return (
            <FilterDateRangeComponent
              key={index}
              startColumn={table.getColumn(item.startColumnKey)}
              endColumn={table.getColumn(item.endColumnKey)}
              {...item}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

interface ExtendedFilterItemProps {
  column: Column<unknown>;
}
function FilterTextComponent({ column, name }: FilterText & ExtendedFilterItemProps) {
  const value = column.getFilterValue() as string;
  const onChange = useCallback(
    (newValue: string) => {
      column.setFilterValue(newValue);
    },
    [column],
  );

  return (
    <div className="space-y-2">
      <Label>{name}</Label>
      <Input
        className="h-10"
        placeholder={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function FilterMultiSelectComponent({
  name,
  options,
  column,
}: FilterSelect & ExtendedFilterItemProps) {
  const values = column.getFilterValue() as Set<string> | null;

  return (
    <MultiSelect options={options} label={name} value={values} onChange={column.setFilterValue} />
  );
}

function FilterSingleSelectComponent({
  name,
  options,
  column,
}: FilterSelect & ExtendedFilterItemProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const value = column.getFilterValue() as string;

  const onChange = useCallback(
    (itemValue: string) => {
      if (value === itemValue) {
        column.setFilterValue(undefined);
      } else {
        column.setFilterValue(itemValue);
      }
    },
    [column, value],
  );

  const selectedOption = options.find((item) => item.value === value);

  return (
    <div className="space-y-2">
      <Label>{name}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-auto min-h-10"
            ref={triggerRef}
          >
            <span className="flex-1 text-left flex gap-1 flex-wrap">
              {selectedOption ? selectedOption.label : `Select ${name}`}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: `${triggerRef.current?.clientWidth || 200}px` }}
        >
          <Command>
            <CommandInput placeholder={`Search ${name.toLowerCase()}`} className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} value={option.value} onSelect={onChange}>
                    {option.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === option.value ? 'opacity-100' : 'opacity-0',
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
