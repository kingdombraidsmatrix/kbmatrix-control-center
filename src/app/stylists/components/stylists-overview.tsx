import { Briefcase, BriefcaseBusiness, CircleX } from 'lucide-react';
import { StatCard } from '@/components/stat-card';

export function StylistsOverview() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="New Stylists"
        subtitle="This Month"
        color="emerald"
        icon={BriefcaseBusiness}
        value={46283}
      />
      <StatCard
        title="Active Stylists"
        subtitle="Users actively making bookings"
        icon={Briefcase}
        value={82342}
      />
      <StatCard
        title="Inactive Stylists"
        subtitle="Disabled/Suspended/Deleted Users"
        color="rose"
        icon={CircleX}
        value={2637}
      />
    </div>
  );
}
