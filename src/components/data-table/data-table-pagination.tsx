import * as React from 'react';
import type { Table as TanTable } from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props<TData> = {
  table: TanTable<TData>;
  /** Optional if you want to display "Page X of Y" correctly on server-side */
  totalRows?: number;
  /** Only needed for server-side to compute last page */
  pageSizeOptions?: Array<number>;
  maxPageButtons?: number;
};

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50],
  maxPageButtons = 5,
}: Props<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const computedTotalPages = table.getPageCount();

  const current = pageIndex + 1;
  const total = computedTotalPages;

  // Build compact page list: [ ... 3 4 [5] 6 7 ... ]
  const pages: Array<number | 'ellipsis'> = React.useMemo(() => {
    if (!total || total <= maxPageButtons) {
      return Array.from({ length: total || 1 }, (_, i) => i + 1);
    }
    const half = Math.floor(maxPageButtons / 2);
    const start = Math.max(1, current - half);
    const end = Math.min(total, start + maxPageButtons - 1);
    const normalizedStart = Math.max(1, Math.min(start, total - maxPageButtons + 1));

    const list: Array<number | 'ellipsis'> = [];
    if (normalizedStart > 1) list.push(1, 'ellipsis');
    for (let p = normalizedStart; p <= end; p++) list.push(p);
    if (end < total) list.push('ellipsis', total);
    return list;
  }, [current, total, maxPageButtons]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-xs text-muted-foreground">Rows per page</span>
        <Select value={String(pageSize)} onValueChange={(v) => table.setPageSize(Number(v))}>
          <SelectTrigger className="h-8 w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">{table.getRowCount()} items</span>
      </div>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {pages.map((p, i) =>
            p === 'ellipsis' ? (
              <PaginationItem key={`e-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === current} onClick={() => table.setPageIndex(p - 1)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              aria-disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
