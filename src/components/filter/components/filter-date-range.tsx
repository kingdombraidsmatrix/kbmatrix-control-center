import { ChevronDownIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { endOfDay, startOfDay } from 'date-fns';
import { formatDateRange } from 'little-date';
import type { Column } from '@tanstack/react-table';
import type { FilterDateRange } from '@/components/filter';
import type { DateRange } from 'react-day-picker';
import { Label } from '@/components/ui/label.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';

interface FilterDateRangeProps extends FilterDateRange {
  startColumn?: Column<unknown>;
  endColumn?: Column<unknown>;
}
export function FilterDateRangeComponent({ name, startColumn, endColumn }: FilterDateRangeProps) {
  const [open, setOpen] = useState(false);

  const onChange = useCallback(
    (newValue: DateRange) => {
      if (!startColumn || !endColumn) return;

      startColumn.setFilterValue(newValue.from ? startOfDay(newValue.from) : undefined);
      endColumn.setFilterValue(newValue.to ? endOfDay(newValue.to) : undefined);
    },
    [startColumn, endColumn],
  );

  if (!startColumn || !endColumn) {
    return null;
  }

  const dateRange: DateRange = {
    from: startColumn.getFilterValue() as Date | undefined,
    to: endColumn.getFilterValue() as Date | undefined,
  };

  const formattedDateRange =
    dateRange.from && dateRange.to ? formatDateRange(dateRange.from, dateRange.to) : undefined;

  return (
    <div className="space-y-2">
      <Label>{name}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full h-10 justify-between font-normal">
            {formattedDateRange || 'Select date range'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onChange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
