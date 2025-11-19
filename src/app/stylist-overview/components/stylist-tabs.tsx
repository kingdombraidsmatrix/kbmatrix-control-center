import { useNavigate, useParams } from '@tanstack/react-router';
import type { Stylist } from '@/types';
import { StylistOverviewTab } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { StylistDetailsTab } from '@/app/stylist-overview/components/tabs/stylist-details-tab.tsx';
import { StylistTransactionsTab } from '@/app/stylist-overview/components/tabs/stylist-transactions-tab.tsx';
import { StylistBookingsTab } from '@/app/stylist-overview/components/tabs/stylist-bookings-tab.tsx';
import { StylistSettingsTab } from '@/app/stylist-overview/components/tabs/stylist-settings-tab.tsx';

interface StylistTabsProps {
  stylist: Stylist;
}
export function StylistTabs({ stylist }: StylistTabsProps) {
  const { tab = StylistOverviewTab.DETAILS } = useParams({
    from: '/_auth/stylists/$stylistId/{-$tab}/{-$section}',
  });
  const navigate = useNavigate({ from: '/stylists/$stylistId/{-$tab}/{-$section}' });

  return (
    <div>
      <Tabs
        defaultValue={tab}
        value={tab}
        onValueChange={(value) =>
          navigate({
            params: { tab: value as StylistOverviewTab, section: undefined },
            replace: true,
          })
        }
      >
        <TabsList>
          <TabsTrigger value={StylistOverviewTab.DETAILS}>Overview</TabsTrigger>
          <TabsTrigger value={StylistOverviewTab.TRANSACTIONS}>Transactions</TabsTrigger>
          <TabsTrigger value={StylistOverviewTab.BOOKINGS}>Bookings</TabsTrigger>
          <TabsTrigger value={StylistOverviewTab.SETTINGS}>Management & Settings</TabsTrigger>
        </TabsList>
        <TabsContent value={StylistOverviewTab.DETAILS}>
          <StylistDetailsTab stylist={stylist} />
        </TabsContent>
        <TabsContent value={StylistOverviewTab.TRANSACTIONS}>
          <StylistTransactionsTab stylist={stylist} />
        </TabsContent>
        <TabsContent value={StylistOverviewTab.BOOKINGS}>
          <StylistBookingsTab stylist={stylist} />
        </TabsContent>
        <TabsContent value={StylistOverviewTab.SETTINGS}>
          <StylistSettingsTab stylist={stylist} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
