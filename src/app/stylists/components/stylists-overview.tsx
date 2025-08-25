import { Briefcase, BriefcaseBusiness, CircleX } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { useGetStylistsOverview } from '@/services/stylists/use-get-stylists-overview.ts';

export function StylistsOverview() {
  const { data, isLoading } = useGetStylistsOverview();

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="New Stylists"
        subtitle="This Month"
        color="emerald"
        icon={BriefcaseBusiness}
        value={data?.newStylists}
        isLoading={isLoading}
      />
      <StatCard
        title="Active Stylists"
        subtitle="Users actively making bookings"
        icon={Briefcase}
        value={data?.activeStylists}
        isLoading={isLoading}
      />
      <StatCard
        title="Inactive Stylists"
        subtitle="Disabled/Suspended/Deleted Users"
        color="rose"
        icon={CircleX}
        value={data?.inactiveStylists}
        isLoading={isLoading}
      />
    </div>
  );
}
