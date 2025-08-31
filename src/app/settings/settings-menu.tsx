import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { SettingsMenu } from '@/app/settings/settings.types.ts';
import { settingsMenuItems } from '@/app/settings/settings.constants.ts';
import { cn } from '@/lib/utils.ts';

export function SettingsMenu() {
  return (
    <div className="space-y-1">
      {settingsMenuItems.map((item) => (
        <MenuItem {...item} key={item.key} />
      ))}
    </div>
  );
}

function MenuItem({ title, subtitle, path, icon: Icon }: SettingsMenu) {
  const { pathname } = useLocation();

  const active = useMemo(() => {
    return pathname.startsWith(path);
  }, [pathname, path]);

  return (
    <Link
      to={path}
      className={cn(
        'flex gap-4 p-4 rounded-lg bg-accent border border-transparent hover:border-zinc-200 transition-all duration-200',
        active && 'bg-primary/10 !border-primary/40',
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
