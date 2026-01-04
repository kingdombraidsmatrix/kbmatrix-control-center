import { FilterIcon } from 'lucide-react';
import { useMemo } from 'react';
import type { FilterConfig } from '@/components/filter';
import type { Table } from '@tanstack/table-core';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { Button } from '@/components/ui/button.tsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';
import { FilterContent } from '@/components/filter/filter-content.tsx';

interface FilterProps {
  className?: string;
  columnFiltersState?: ColumnFiltersState;
  config: FilterConfig;
  table: Table<any>;
}
export function Filter({ className, config, table, columnFiltersState }: FilterProps) {
  const hasFilters = useMemo(
    () => columnFiltersState && columnFiltersState.some((f) => !!f.value),
    [columnFiltersState],
  );

  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon" className="relative">
            <FilterIcon />
            {hasFilters && (
              <div className="absolute size-2 bg-primary rounded-full top-0 right-0 ring-4 ring-white" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
            <SheetDescription>Apply one or more filters for refined results</SheetDescription>
          </SheetHeader>
          <FilterContent config={config} table={table} />
          <SheetFooter>
            <Button
              type="button"
              variant="destructive-alt"
              onClick={() => table.resetColumnFilters()}
              disabled={!hasFilters}
            >
              Reset Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
