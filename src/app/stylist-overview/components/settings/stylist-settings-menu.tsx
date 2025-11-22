import { Link, useParams } from '@tanstack/react-router';
import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import type {SettingsMenuProps} from '@/app/stylist-overview/types.ts';
import {  StylistSettings } from '@/app/stylist-overview/types.ts';
import { cn } from '@/lib/utils.ts';
import { settingsMenuItems } from '@/app/stylist-overview/components/settings/stylist-settings.constant.tsx';

export function SettingsMenu() {
  return (
    <div className="space-y-1">
      {Object.values(settingsMenuItems).map((item) => (
        <MenuItem {...item} key={item.id} />
      ))}
    </div>
  );
}

function MenuItem({ id, title, subtitle, icon: Icon }: SettingsMenuProps) {
  const { section = StylistSettings.SUBSCRIPTIONS, ...params } = useParams({
    from: '/_auth/stylists/$stylistId/{-$tab}/{-$section}',
  });

  const active = useMemo(() => {
    return id === section;
  }, [id, section]);

  return (
    <Link
      to="/stylists/$stylistId/{-$tab}/{-$section}"
      params={{ ...params, section: id }}
      className={cn(
        'flex gap-4 p-4 border-l-4 rounded-r-2xl border-transparent hover:bg-accent transition-all duration-200',
        active && '!border-primary/40 text-primary bg-accent',
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
