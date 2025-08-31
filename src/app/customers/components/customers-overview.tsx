import { UserPlus, UserStar, UserX2, Users2 } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { useGetCustomersOverview } from '@/services/customers';

export function CustomersOverview() {
  const { data, isLoading } = useGetCustomersOverview();

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="New Customers"
        subtitle="This Month"
        color="emerald"
        icon={UserPlus}
        value={data?.newUsers}
        isLoading={isLoading}
      />
      <StatCard
        title="Active Customers"
        subtitle="Users actively making bookings"
        icon={UserStar}
        value={data?.activeUsers}
        isLoading={isLoading}
      />
      <StatCard
        title="Inactive Customers"
        subtitle="Disabled/Suspended/Deleted Users"
        color="rose"
        icon={UserX2}
        value={data?.inactiveUsers}
        isLoading={isLoading}
      />
      <StatCard
        title="All Customers"
        subtitle="All time"
        color="amber"
        icon={Users2}
        value={data?.allUsers}
        isLoading={isLoading}
      />
    </div>
  );
}
