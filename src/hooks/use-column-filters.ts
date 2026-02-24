import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import type { ColumnFiltersState, Updater } from '@tanstack/react-table';

interface UseColumnFiltersOptions {
  urlSync?: boolean;
}
export function useColumnFilters({ urlSync }: UseColumnFiltersOptions = {}) {
  const {
    search: { filter },
  } = useLocation();
  const navigate = useNavigate();

  const mapToFilters = useCallback(
    (obj: object = {}) => Object.entries(obj).map(([key, value]) => ({ id: key, value })),
    [],
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    urlSync
      ? () => {
          return mapToFilters(filter);
        }
      : [],
  );

  useEffect(() => {
    if (urlSync) {
      setColumnFilters(mapToFilters(filter));
    }
  }, [urlSync, mapToFilters, filter]);

  const handleChange = useCallback(
    (updater: Updater<ColumnFiltersState>) => {
      const resolvedFilters = typeof updater === 'function' ? updater(columnFilters) : updater;

      setColumnFilters(resolvedFilters);

      if (urlSync) {
        navigate({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          search: (prev) => ({
            ...prev,
            filter: resolvedFilters.length
              ? resolvedFilters.reduce<Record<string, unknown>>((agg, curr) => {
                  agg[curr.id] = curr.value;
                  return agg;
                }, {})
              : undefined,
          }),
          replace: true,
          resetScroll: false,
        });
      }
    },
    [urlSync, navigate, columnFilters, setColumnFilters],
  );

  return { columnFilters, setColumnFilters: handleChange };
}
