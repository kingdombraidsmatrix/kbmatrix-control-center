import type { LinkProps } from '@tanstack/react-router';

export interface BreadcrumbItem {
  title: string;
  url?: LinkProps['to'];
}
