import { useCallback, useRef, useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge.tsx';

interface FilterContentProps {
  config: FilterConfig;
  table: Table<unknown>;
}
export function FilterContent({ config, table }: FilterContentProps) {
  return (
    <div className="space-y-6 px-4">
      {config.map((item, index) => {
        const column = table.getColumn(item.columnKey);
        if (!column) return null;

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
        value={value}
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
  const MAX_DISPLAY_ITEMS = 2;

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const values = (column.getFilterValue() as Set<string> | null) || new Set<string>();

  const onChange = useCallback(
    (itemValue: string) => {
      if (values.has(itemValue)) {
        values.delete(itemValue);
        column.setFilterValue(values);
      } else {
        values.add(itemValue);
        column.setFilterValue(values);
      }
    },
    [values],
  );

  const selectedOptions = options
    .filter((item) => values.has(item.value))
    .slice(0, MAX_DISPLAY_ITEMS);

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
              {values.size === 0 ? (
                `Select ${name}`
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
                          onChange(item.value);
                        }}
                      >
                        <X />
                      </button>
                    </Badge>
                  ))}
                  {values.size > MAX_DISPLAY_ITEMS && (
                    <Badge variant="secondary">+{values.size - MAX_DISPLAY_ITEMS}</Badge>
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
      column.setFilterValue(itemValue);
    },
    [column],
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
