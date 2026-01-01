import { FilterIcon } from 'lucide-react';
import type { FilterConfig } from '@/components/filter';
import type { Table } from '@tanstack/table-core';
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
  config: FilterConfig;
  table: Table<any>;
}
export function Filter({ className, config, table }: FilterProps) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" size="icon">
            <FilterIcon />
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
            >
              Reset Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
