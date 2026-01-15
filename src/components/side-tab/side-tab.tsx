import { useMemo } from 'react';
import type { SideTabMenuProps } from '@/components/side-tab/side-tab.types.ts';
import { SideTabMenu } from '@/components/side-tab/side-tab-menu.tsx';

interface SideTabProps<TData> extends SideTabMenuProps<TData> {
  data?: TData;
}
export function SideTab<TData>({ items, activeTab, data, pageId }: SideTabProps<TData>) {
  const resolvedActiveTab = activeTab || items[0].id;

  const activeComponent = useMemo(() => {
    const activeItem = items.find((item) => item.id === resolvedActiveTab);
    if (activeItem) {
      return <activeItem.component data={data as TData} />;
    }
    return null;
  }, [items, activeTab, data]);

  return (
    <div className="grid grid-cols-[minmax(0,_20rem)_minmax(0,_1fr)] mt-8 gap-6">
      <SideTabMenu activeTab={resolvedActiveTab} items={items} pageId={pageId} />
      <div>{activeComponent}</div>
    </div>
  );
}
