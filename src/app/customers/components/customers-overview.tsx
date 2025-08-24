import { UserPlus, UserStar, UserX2 } from 'lucide-react'
import { StatCard } from '@/components/stat-card'

export function CustomersOverview() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="New Customers"
        subtitle="This Month"
        color="emerald"
        icon={UserPlus}
        value={46283}
      />
      <StatCard
        title="Active Customers"
        subtitle="Users actively making bookings"
        icon={UserStar}
        value={82342}
      />
      <StatCard
        title="Inactive Customers"
        subtitle="Disabled/Suspended/Deleted Users"
        color="rose"
        icon={UserX2}
        value={2637}
      />
    </div>
  )
}
