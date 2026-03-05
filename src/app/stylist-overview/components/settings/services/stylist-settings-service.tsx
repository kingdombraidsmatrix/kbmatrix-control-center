import type { StylistSettingsComponent } from '@/app/stylist-overview/types.ts';
import { PageHeader } from '@/components/page-header';
import { StylistServiceCategories } from '@/app/stylist-overview/components/settings/services/categories.tsx';
import { StylistServices } from '@/app/stylist-overview/components/settings/services/services.tsx';

export function StylistSettingsService({ data: stylist }: StylistSettingsComponent) {
  return (
    <div className="grid gap-6">
      <PageHeader title="Services & Categories" />

      <StylistServiceCategories stylistId={stylist.id} />

      <StylistServices stylistId={stylist.id} />
    </div>
  );
}
