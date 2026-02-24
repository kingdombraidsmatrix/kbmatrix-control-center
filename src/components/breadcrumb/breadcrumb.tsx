import { Link } from '@tanstack/react-router';
import { Fragment } from 'react';
import type { BreadcrumbItem } from '@/components/breadcrumb/types.ts';
import {
  BreadcrumbItem as BreadcrumbItemComponent,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as ShadBreadcrumb,
} from '@/components/ui/breadcrumb';

interface BreadcrumbProps {
  items: Array<BreadcrumbItem>;
}
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ShadBreadcrumb>
      <BreadcrumbList>
        {[{ title: 'Dashboard', url: '/' }, ...items].map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItemComponent key={index}>
              {item.url ? (
                <BreadcrumbLink asChild>
                  <Link to={item.url}>{item.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItemComponent>
            {index < items.length && <BreadcrumbSeparator key={`${index}-separator`} />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </ShadBreadcrumb>
  );
}
