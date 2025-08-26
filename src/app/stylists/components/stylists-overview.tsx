import { Briefcase, BriefcaseBusiness, Building, CircleX } from 'lucide-react';
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
        subtitle="Stylists not taking bookings"
        color="rose"
        icon={CircleX}
        value={data?.inactiveStylists}
        isLoading={isLoading}
      />
      <StatCard
        title="All Stylists"
        subtitle="All time"
        color="amber"
        icon={Building}
        value={data?.allStylists}
        isLoading={isLoading}
      />
    </div>
  );
}
