import { useParams } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import type { BreadcrumbItem } from '@/components/breadcrumb';
import { BackButton } from '@/components/back-button';
import { Breadcrumb } from '@/components/breadcrumb';
import { useGetStylistService } from '@/services/stylists';
import { StylistHeader } from '@/app/stylist-overview/components/stylist-header.tsx';
import { StylistTabs } from '@/app/stylist-overview/components/stylist-tabs.tsx';

export function StylistOverviewPage() {
  const { stylistId } = useParams({ from: '/_auth/stylists/$stylistId' });
  const { isLoading, data, error } = useGetStylistService(stylistId);

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
    <div className="grid gap-y-6">
      <div className="flex gap-2 items-center">
        <BackButton to="/stylists" />
        <Breadcrumb items={breadcrumbs} />
      </div>

      {isLoading ? (
        <div className="flex gap-2">
          <Loader2 />
          <p>Loading...</p>
        </div>
      ) : !data || error ? (
        <div className="flex gap-2">
          <p>No data</p>
        </div>
      ) : (
        <div>
          <StylistHeader stylist={data} />
          <StylistTabs stylist={data} />
        </div>
      )}
    </div>
  );
}
