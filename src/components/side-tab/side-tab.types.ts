import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';
import type { LinkProps } from '@tanstack/react-router';

export interface SideTabMenuProps<TData> {
  items: Array<SideTabMenuItemProps<TData>>;
  activeTab?: string;
  pageId: LinkProps['from'];
}

export interface SideTabMenuItemProps<TData = void> {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  component: FC<{ data: TData }>;
}
