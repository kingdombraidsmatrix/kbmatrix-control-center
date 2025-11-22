import { useMemo } from 'react';
import { useParams } from '@tanstack/react-router';
import type { Stylist } from '@/types';
import { SettingsMenu } from '@/app/stylist-overview/components/settings/stylist-settings-menu.tsx';
import { settingsMenuItems } from '@/app/stylist-overview/components/settings/stylist-settings.constant.tsx';
import { StylistSettings } from '@/app/stylist-overview/types.ts';

interface StylistSettingsTabProps {
  stylist: Stylist;
}
export function StylistSettingsTab({ stylist }: StylistSettingsTabProps) {
  const { section = StylistSettings.SUBSCRIPTIONS } = useParams({
    from: '/_auth/stylists/$stylistId/{-$tab}/{-$section}',
  });

  const ActiveComponent = useMemo(
    () => settingsMenuItems[section as StylistSettings].component,
    [section],
  );

  return (
    <div className="grid grid-cols-[minmax(0,_20rem)_minmax(0,_1fr)] mt-8 gap-6">
      <SettingsMenu />
      <div>
        <ActiveComponent stylist={stylist} />
      </div>
    </div>
  );
}
