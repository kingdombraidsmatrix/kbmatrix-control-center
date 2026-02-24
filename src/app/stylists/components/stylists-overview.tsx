import { Briefcase, BriefcaseBusiness, Building, CircleX, SquareChartGantt } from 'lucide-react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { StatCard } from '@/components/stat-card';
import { useGetStylistsOverview } from '@/services/stylists/use-get-stylists-overview.ts';
import { StylistStatus } from '@/types';

export function StylistsOverview() {
  const { data, isLoading } = useGetStylistsOverview();
  const navigate = useNavigate();
  const {
    search: { filter },
  } = useLocation();

  return (
    <div className="grid grid-cols-5 gap-4">
      <StatCard
        title="In Review"
        subtitle="Stylists that are in review, waiting to be approved"
        color="emerald"
        icon={SquareChartGantt}
        value={data?.inReviewStylists}
        isLoading={isLoading}
        onClick={() =>
          navigate({ to: '/stylists', search: { filter: { status: StylistStatus.IN_REVIEW } } })
        }
        isActive={filter?.status === StylistStatus.IN_REVIEW}
      />
      <StatCard
        title="Active Stylists"
        subtitle="Users actively making bookings"
        icon={Briefcase}
        value={data?.activeStylists}
        isLoading={isLoading}
        onClick={() =>
          navigate({ to: '/stylists', search: { filter: { status: StylistStatus.ACTIVE } } })
        }
        isActive={filter?.status === StylistStatus.ACTIVE}
      />
      <StatCard
        title="New Stylists"
        subtitle="This Month"
        color="emerald"
        icon={BriefcaseBusiness}
        value={data?.newStylists}
        isLoading={isLoading}
      />
      <StatCard
        title="Inactive Stylists"
        subtitle="Stylists not taking bookings"
        color="rose"
        icon={CircleX}
        value={data?.inactiveStylists}
        isLoading={isLoading}
        onClick={() =>
          navigate({ to: '/stylists', search: { filter: { status: StylistStatus.DISABLED } } })
        }
        isActive={filter?.status === StylistStatus.DISABLED}
      />
      <StatCard
        title="All Stylists"
        subtitle="All time"
        color="amber"
        icon={Building}
        value={data?.allStylists}
        isLoading={isLoading}
        onClick={() => navigate({ to: '/stylists', search: { filter: undefined } })}
      />
    </div>
  );
}
