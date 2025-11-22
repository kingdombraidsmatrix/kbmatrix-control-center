import type { StylistSettingsComponent } from '@/app/stylist-overview/types.ts';

export function StylistSettingsTeam({ stylist }: StylistSettingsComponent) {
  return (
    <div>
      <h4>Team Members</h4>
      <p>{stylist.name}</p>
    </div>
  );
}
