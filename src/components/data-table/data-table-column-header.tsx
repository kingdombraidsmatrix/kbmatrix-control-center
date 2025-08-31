import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { Column } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Props<TData, TValue>) {
  const sorted = column.getIsSorted(); // "asc" | "desc" | false
  const Icon = sorted === 'asc' ? ChevronUp : sorted === 'desc' ? ChevronDown : ChevronsUpDown;

  return (
    <Button
      variant="link"
      className={cn('h-8 px-0! text-foreground', className)}
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      <span className="mr-0">{title}</span>
      <Icon className="size-3" strokeWidth={2.2} />
    </Button>
  );
}
