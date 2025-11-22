import type { StylistSettingsComponent } from '@/app/stylist-overview/types.ts';

export function StylistSettingsService({ stylist }: StylistSettingsComponent) {
  return (
    <div>
      <h4>Services & Categories</h4>
      <p>{stylist.name}</p>
    </div>
  );
}
