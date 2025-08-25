import { ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
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
  return (
    <Link
      to={path}
      className="flex gap-4 p-4 rounded-lg bg-accent border border-transparent hover:border-zinc-200"
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
