import { Check, FileSearch, Ghost, Loader2, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { useDebounce } from '@/hooks/use-debounce.ts';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { cn } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';

export interface Option {
  label?: string;
  value: string | number;
}

interface MultiSelectProps {
  control: Control<any, any, any>;
  onSearch: (query: string) => Promise<Array<Option>>;
  defaultSelectedOptions?: Map<string | number, Option>;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}
export function MultiSelect({
  onSearch,
  name,
  label,
  placeholder,
  className,
  defaultSelectedOptions,
}: MultiSelectProps) {
  const { setValue } = useFormContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Array<Option>>([]);
  const [selectedOptions, setSelectedOptions] = useState<Map<Option['value'], Option>>(new Map());

  const [inputSize, setInputSize] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      onSearch(debouncedQuery)
        .then(setOptions)
        .finally(() => setLoading(false));
    } else {
      setOptions([]);
    }
  }, [onSearch, debouncedQuery]);

  useEffect(() => {
    const observeTarget = inputRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setInputSize(entry.contentRect.width);
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('Initializing...', defaultSelectedOptions);
    if (defaultSelectedOptions) {
      setSelectedOptions(defaultSelectedOptions);
      setValue(name, new Set(defaultSelectedOptions.keys()));
    }
  }, [defaultSelectedOptions, name, setValue]);

  const handleSelect = useCallback(
    (option: Option) => {
      setSelectedOptions((prev) => {
        const newMap = new Map(prev);
        if (newMap.has(option.value)) {
          newMap.delete(option.value);
        } else {
          newMap.set(option.value, option);
        }
        setValue(name, new Set(newMap.keys()), {
          shouldTouch: true,
          shouldValidate: true,
          shouldDirty: true,
        });
        return newMap;
      });
    },
    [setValue],
  );

  return (
    <div className={cn('grid gap-2', className)}>
      <Label>{label}</Label>
      <Popover modal>
        <PopoverTrigger asChild>
          <Input
            ref={inputRef}
            value={selectedOptions.size > 0 ? `${selectedOptions.size} selected` : placeholder}
            className="text-left"
          />
        </PopoverTrigger>
        <PopoverContent style={{ width: `${inputSize}px` }}>
          <Command shouldFilter={false}>
            <CommandInput value={query} onValueChange={setQuery} placeholder={`Search`} />
            {loading ? (
              <div className="py-4 flex items-center justify-center">
                <Loader2 className="animate-spin size-4" />
              </div>
            ) : query ? (
              options.length ? (
                <CommandGroup>
                  <CommandList>
                    {options.map((opt) => (
                      <CommandItem key={opt.value} onSelect={() => handleSelect(opt)}>
                        <span>{opt.label}</span>
                        {selectedOptions.has(opt.value) && <Check className="ml-auto" />}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              ) : (
                <div className="p-6 flex flex-col gap-4 items-center justify-center">
                  <Ghost className="text-muted-foreground size-8" />
                  <p className="text-sm">No results</p>
                </div>
              )
            ) : (
              <div className="p-6 flex flex-col gap-4 items-center justify-center">
                <FileSearch className="text-muted-foreground size-8" />
                <p className="text-sm">Start typing to search</p>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
      {selectedOptions.size > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {[...Array.from(selectedOptions.values())].map((item) => (
            <Badge key={item.value} className="p-0">
              <span className="max-w-40 truncate block py-0.5 pl-2">{item.label}</span>
              <button
                type="button"
                className="hover:bg-destructive/10 text-destructive cursor-pointer px-1 self-stretch"
                onClick={() => handleSelect(item)}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
