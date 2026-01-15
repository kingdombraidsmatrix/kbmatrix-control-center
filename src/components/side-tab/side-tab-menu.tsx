import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import type {
  SideTabMenuItemProps,
  SideTabMenuProps,
} from '@/components/side-tab/side-tab.types.ts';
import { cn } from '@/lib/utils.ts';

export function SideTabMenu<TData>({ items, activeTab, ...props }: SideTabMenuProps<TData>) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <SideTabMenuItem isActive={activeTab === item.id} {...props} {...item} key={item.id} />
      ))}
    </div>
  );
}

function SideTabMenuItem<TData>({
  id,
  title,
  subtitle,
  icon: Icon,
  isActive,
  pageId,
}: SideTabMenuItemProps<TData> &
  Omit<SideTabMenuProps<TData>, 'items' | 'activeTab'> & { isActive: boolean }) {
  return (
    <Link
      from={pageId}
      to={pageId as any}
      params={{ section: id }}
      className={cn(
        'flex gap-4 p-4 border-l-4 rounded-r-2xl border-transparent hover:bg-accent transition-all duration-200',
        isActive && '!border-primary/40 text-primary bg-accent',
      )}
    >
      <Icon className="text-muted-foreground" />
      <div className={cn('flex-1', !subtitle && 'self-center')}>
        <p className="font-semibold text-accent-foreground leading-none">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight className="self-center text-muted-foreground size-5" />
    </Link>
  );
}
