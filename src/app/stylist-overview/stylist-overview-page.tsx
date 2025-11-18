import type { BreadcrumbItem } from '@/components/breadcrumb';
import { BackButton } from '@/components/back-button';
import { Breadcrumb } from '@/components/breadcrumb';

export function StylistOverviewPage() {
  const breadcrumbs: Array<BreadcrumbItem> = [
    {
      title: 'Stylists',
      url: '/stylists',
    },
    {
      title: 'Stylist Overview',
    },
  ];

  return (
    <div>
      <div className="flex gap-2 items-center">
        <BackButton to="/stylists" />
        <Breadcrumb items={breadcrumbs} />
      </div>


    </div>
  );
}
