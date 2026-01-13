import { useParams } from '@tanstack/react-router';
import type { Stylist } from '@/types';
import { settingsMenuItems } from '@/app/stylist-overview/components/settings/stylist-settings.constant.tsx';
import { StylistSettings } from '@/app/stylist-overview/types.ts';
import { SideTab } from '@/components/side-tab';

interface StylistSettingsTabProps {
  stylist: Stylist;
}
export function StylistSettingsTab({ stylist }: StylistSettingsTabProps) {
  const { section = StylistSettings.SUBSCRIPTIONS } = useParams({
    from: '/_auth/stylists/$stylistId/{-$tab}/{-$section}',
  });

  return (
    <SideTab
      data={stylist}
      items={settingsMenuItems}
      activeTab={section}
      pageId="/stylists/$stylistId/{-$tab}/{-$section}"
    />
  );
}
